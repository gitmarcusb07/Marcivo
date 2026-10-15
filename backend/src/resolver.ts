import axios from "axios";
import * as cheerio from "cheerio";
import { LITE } from "./lite.js";

// Optimized resolver: fast HTTP path first, persistent Playwright only when needed.
// Validation rejects tracking pixels, theme assets and intermediate hosts.

const TRACKING_HOSTS = ["google-analytics.com", "analytics.google.com", "googletagmanager.com", "doubleclick.net", "googlesyndication.com", "adexchangerapid.com", "turnhub.net", "worncalmy.cfd", "motionsbackbar.qpon"];

function isTracking(u: string) {
  try {
    const a = new URL(u);
    const h = (a.hostname || "").toLowerCase();
    if (TRACKING_HOSTS.some((t) => h === t || h.endsWith("." + t))) return true;
    if (a.pathname.split("/").map((s) => s.toLowerCase()).includes("collect")) return true;
    return false;
  } catch { return true; }
}

function isAsset(u: string) {
  const l = (u || "").toLowerCase();
  if (!l) return false;
  if (l.includes("/images/site.webm")) return true;
  const assetDirs = ["/images/", "/img/", "/assets/", "/static/", "/theme/"];
  const exts = [".webm", ".mp4", ".mkv", ".m3u8"];
  if (assetDirs.some((d) => l.includes(d)) && exts.some((e) => l.includes(e))) {
    // allow real CDN files; block only theme-ish names
    if (/(logo|background|header|footer|placeholder|spinner|loader|banner|site\.webm)/.test(l)) return true;
  }
  return false;
}

function isDirect(u: string) {
  if (!u || isAsset(u) || isTracking(u)) return false;
  const l = u.toLowerCase();
  return l.includes(".mp4") || l.includes(".mkv") || l.includes(".webm") || l.includes(".m3u8")
    || l.includes("video-downloads.googleusercontent.com") || l.includes(".googlevideo.com")
    || (l.includes("cloudflarestorage.com/") && l.includes("x-amz-"));
}

// fastdl.zip wraps the real file URL: dl.php?link=<direct>. Unwrap it.
function unwrapFastdl(href: string): string | null {
  try {
    const u = new URL(href);
    if (!u.hostname.toLowerCase().includes("fastdl")) return null;
    const inner = u.searchParams.get("link");
    if (inner && inner.startsWith("http") && isDirect(inner)) return inner;
    return null;
  } catch { return null; }
}

function vcloudDomains(): string[] {
  return (process.env.WATCH_VCLOUD_DOMAINS || "nexdrive.fit,vcloud.fit").split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
}

function isNonFinal(u: string) {
  try {
    const h = (new URL(u).hostname || "").toLowerCase();
    if (h.includes("pixeldrain")) return true;
    return vcloudDomains().some((d) => h === d || h.endsWith("." + d));
  } catch { return true; }
}

export type JobStatus = "working" | "ready" | "failed";
export interface Job {
  id: string; status: JobStatus; url: string; error: string; created: number;
  /** pipeline milestone for "Preparing video…" UX: queued|fast-path|bridge|browser|validating */
  stage: string;
  /** stable source host only — never a full URL (no tokens in logs/API). */
  source: string;
  /** whether the playable URL honors Range requests (seekable timeline). */
  seekable?: boolean;
}

const jobs = new Map<string, Job>();

// --- Temporary stream cache (in-process TTL, no permanent storage) ---
// Playable URLs are temporary (~3h observed), so entries expire via a
// conservative configurable TTL that stays well under source expiry.
interface StreamEntry { url: string; resolvedAt: number; expiresAt: number; }
const streamCache = new Map<string, StreamEntry>();
// sourceUrl -> in-flight job (request deduplication: many watchers, one resolver).
const inflight = new Map<string, Job>();

function streamTtlMs() { return Math.max(300, parseInt(process.env.STREAM_CACHE_TTL || "7200", 10)) * 1000; }
function refreshThresholdMs() { return Math.max(0, parseInt(process.env.STREAM_REFRESH_THRESHOLD || "900", 10)) * 1000; }
function resolverTimeoutMs(background = false) {
  // vcloud/nexdrive countdowns need ~60-90s of python bridge time; a 60s bg
  // budget killed first attempts and forced full retries (75s fail + retry).
  // Reservation protects taps, so background can safely take its time.
  if (background) return Math.max(30, parseInt(process.env.RESOLVER_BG_TIMEOUT || "120", 10)) * 1000;
  return Math.max(30, parseInt(process.env.RESOLVER_TIMEOUT || "150", 10)) * 1000;
}
/** Speed-first default: 3 parallel resolves (2 bg + 1 reserved for taps). */
function maxConcurrency() { return Math.max(1, parseInt(process.env.RESOLVER_MAX_CONCURRENCY || "3", 10)); }

/** Dedup/cache key: trailing-slash + case-insensitive host. Fixes two
    parallel jobs for the same page (the log's double vegamovies job). */
function normKey(u: string): string {
  try {
    const a = new URL(u);
    a.hostname = a.hostname.toLowerCase();
    a.hash = "";
    let s = a.toString();
    if (s.endsWith("/")) s = s.slice(0, -1);
    return s;
  } catch { return (u || "").replace(/\/$/, ""); }
}

// --- Lightweight metrics (counts + timings only, never URLs) ---
const metrics = {
  startedAt: Date.now(),
  cacheHits: 0, cacheMisses: 0, deduped: 0,
  resolved: 0, failed: 0, timedOut: 0,
  totalResolveMs: 0, maxResolveMs: 0,
  preResolved: 0,
};
export function getMetrics() {
  const n = metrics.resolved || 1;
  return {
    uptimeSec: Math.round((Date.now() - metrics.startedAt) / 1000),
    cacheHits: metrics.cacheHits, cacheMisses: metrics.cacheMisses,
    cacheHitRate: Math.round((metrics.cacheHits / Math.max(1, metrics.cacheHits + metrics.cacheMisses)) * 100) / 100,
    dedupedJobs: metrics.deduped,
    resolved: metrics.resolved, failed: metrics.failed, timedOut: metrics.timedOut,
    avgResolveMs: Math.round(metrics.totalResolveMs / n), maxResolveMs: metrics.maxResolveMs,
    avgQueueWaitMs: Math.round(totalQueueWaitMs / Math.max(1, metrics.resolved + metrics.failed)),
    maxQueueWaitMs,
    queuedJobs: waiters.length, activeJobs: activeCount,
    preResolved: metrics.preResolved,
    cacheEntries: streamCache.size, inflightJobs: inflight.size,
  };
}

/** Host-only identifier for logs (never log full temporary URLs/tokens). */
export function hostOf(u: string): string {
  try { return new URL(u).hostname.toLowerCase(); } catch { return "invalid-url"; }
}

// --- Bounded scheduler: at most N resolutions at once; 1 slot reserved for taps ---
// Background pre-resolves may only occupy maxConcurrency-1 slots, so a user
// tap never queues behind 2x165s background jobs (the 3-4min bug).
interface Waiter { run: () => void; priority: number; enqueuedAt: number; }
let activeCount = 0;
const waiters: Waiter[] = [];
// Queue-wait instrumentation (counts only, never URLs).
let totalQueueWaitMs = 0;
let maxQueueWaitMs = 0;
function schedule<T>(fn: () => Promise<T>, priority: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const enqueuedAt = Date.now();
    const run = () => {
      const wait = Date.now() - enqueuedAt;
      totalQueueWaitMs += wait;
      maxQueueWaitMs = Math.max(maxQueueWaitMs, wait);
      activeCount++;
      fn().then(resolve, reject).finally(() => {
        activeCount--;
        pump();
      });
    };
    waiters.push({ run, priority, enqueuedAt });
    pump();
  });
}
function pump() {
  const cap = Math.max(1, maxConcurrency());
  // Background cap leaves 1 slot free for user taps (when cap>=2).
  const bgCap = cap >= 2 ? cap - 1 : cap;
  while (waiters.length) {
    let best = 0;
    for (let i = 1; i < waiters.length; i++) {
      const a = waiters[i], b = waiters[best];
      if (a.priority > b.priority || (a.priority === b.priority && a.enqueuedAt < b.enqueuedAt)) best = i;
    }
    const cand = waiters[best];
    const isUser = cand.priority >= 1;
    const limit = isUser ? cap : bgCap;
    if (activeCount >= limit) break;
    waiters.splice(best, 1);
    cand.run();
  }
}

function withTimeout<T>(p: Promise<T>, ms: number, msg: string): Promise<T> {
  let t: ReturnType<typeof setTimeout>;
  const timeout = new Promise<T>((_, rej) => { t = setTimeout(() => rej(new Error(msg)), ms); });
  return Promise.race([p.finally(() => clearTimeout(t!)), timeout]);
}

// Dead-on-arrival check: Range-fetch the first byte. A link that can't serve
// bytes would otherwise open a black player on the phone with no message.
// Also records Accept-Ranges so the player knows if seeking will work
// (non-range links restart from 0 on seek — routed via proxy fallback).
async function validateStream(url: string): Promise<{ ok: boolean; seekable: boolean }> {
  try {
    const ctl = new AbortController();
    const t = setTimeout(() => ctl.abort(), 10000);
    let ok = false;
    let seekable = false;
    try {
      const r = await fetch(url, {
        signal: ctl.signal,
        headers: {
          Range: "bytes=0-0",
          "User-Agent": process.env.SITE_USER_AGENT || "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
          Connection: "close",
        },
        redirect: "follow",
      });
      ok = r.status === 200 || r.status === 206;
      const ar = String(r.headers.get("accept-ranges") || "").toLowerCase();
      const cr = String(r.headers.get("content-range") || "");
      seekable = r.status === 206 || ar.includes("bytes") || cr.startsWith("bytes");
      try { await r.arrayBuffer(); } catch {}
    } finally {
      clearTimeout(t);
    }
    console.log(`[resolve] validate ${ok ? "OK" : "DEAD"} seekable=${seekable ? "yes" : "no"}: ${hostOf(url)}`);
    return { ok, seekable };
  } catch {
    console.log(`[resolve] validate DEAD (error): ${hostOf(url)}`);
    return { ok: false, seekable: false };
  }
}

import { spawn } from "child_process";

export function getJob(id: string) { return jobs.get(id); }

// Proven bot resolver (plugins/video_watch.py) via CLI bridge.
// Primary path: handles vcloud countdowns, ad-trap clicks, popups, retries.
function pythonResolve(sourceUrl: string, timeoutMs = 420000): Promise<string | null> {
  const py = process.env.RESOLVER_PYTHON || "python";
  const botDir = process.env.RESOLVER_BOT_DIR || "C:\\AutoFilter TG Bot";
  return new Promise((resolve) => {
    console.log(`[resolve] python bridge: ${hostOf(sourceUrl)}`);
    const child = spawn(py, ["resolve_cli.py", sourceUrl], { cwd: botDir, timeout: timeoutMs });
    let out = "";
    let done = false;
    const finish = (v: string | null) => { if (!done) { done = true; resolve(v); } };
    child.stdout?.on("data", (d: Buffer) => { out += d.toString(); });
    child.on("error", (e) => { console.log(`[resolve] python spawn failed: ${String(e).slice(0, 120)}`); finish(null); });
    const timer = setTimeout(() => { try { child.kill(); } catch {} finish(null); }, timeoutMs + 10000);
    child.on("close", () => {
      clearTimeout(timer);
      const line = out.split(/\r?\n/).map((s) => s.trim()).find((s) => s.startsWith("http"));
      if (line && isDirect(line) && !isNonFinal(line) && !isTracking(line) && !isAsset(line)) {
        console.log(`[resolve] python bridge hit`);
        finish(line);
      } else {
        finish(null);
      }
    });
  });
}

// --- persistent browser (lazy singleton) ---
let browserPromise: Promise<any> | null = null;
async function getBrowser() {
  if (LITE) throw new Error("browser lanes disabled in lite mode");
  if (!browserPromise) {
    browserPromise = (async () => {
      const { chromium } = await import("playwright");
      const b = await chromium.launch({ headless: (process.env.WATCH_HEADLESS || "true").toLowerCase() !== "false" });
      return b;
    })().catch((e) => { browserPromise = null; throw e; });
  }
  return browserPromise;
}

/** Cheap first lane (~10s): s3/fsl anchors, fastdl-unwrap, then any direct
    anchor on the content page. Wins instantly for direct/fastdl links without
    spawning python or driving a full browser flow. */
async function fastHttpPath(contentUrl: string): Promise<string | null> {
  try {
    const r = await axios.get(contentUrl, {
      timeout: 12000,
      headers: { "User-Agent": process.env.SITE_USER_AGENT || "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
      maxRedirects: 5,
      validateStatus: () => true,
    });
    if (r.status >= 400 || typeof r.data !== "string") return null;
    const $ = cheerio.load(r.data);
    const s3 = $("a#s3[href]").attr("href") || $("a#fsl[href]").attr("href");
    if (s3 && s3.startsWith("http") && isDirect(s3) && !isNonFinal(s3)) return s3;
    const hrefs: string[] = [];
    $("a[href]").each((_, el) => {
      if (hrefs.length >= 300) return false;
      hrefs.push($(el).attr("href") || "");
    });
    for (const h of hrefs) {
      let abs = "";
      try { abs = new URL(h, contentUrl).toString(); } catch { continue; }
      const unwrapped = unwrapFastdl(abs);
      if (unwrapped) return unwrapped;
    }
    for (const h of hrefs) {
      let abs = "";
      try { abs = new URL(h, contentUrl).toString(); } catch { continue; }
      if (abs.startsWith("http") && isDirect(abs) && !isNonFinal(abs) && !isTracking(abs)) return abs;
    }
    return null;
  } catch { return null; }
}

/** Own G-Direct lane (~45s budget, pure HTTP, no browser): reverse-engineered
    from the Vega/Rog page flow —
      content page → nexdrive/genxfm "Download Now" links
      → intermediate page → "G-Direct [Instant]" (fastdl.zip/embed?download=)
      → embed HTML contains dl.php?link=<direct file URL> inline.
    Two axios GETs resolve in ~6s when the path is healthy. Falls through to
    the bot bridge on any miss (JS-only pages, login hosts, layout change). */
async function gdirectResolve(contentUrl: string, job?: Job): Promise<string | null> {
  const UA = process.env.SITE_USER_AGENT || "Mozilla/5.0 (Windows NT 10.0; Win64; x64)";
  const t0 = Date.now();
  const budget = Math.max(20000, Math.min(60000, parseInt(process.env.RESOLVER_GDIRECT_BUDGET || "45000", 10)));
  const dead = () => (job as any)?.cancelled === true || Date.now() - t0 > budget;
  const get = async (u: string): Promise<string | null> => {
    try {
      const r = await axios.get(u, {
        timeout: 12000,
        headers: { "User-Agent": UA, Accept: "text/html,application/xhtml+xml,*/*" },
        maxRedirects: 5,
        validateStatus: () => true,
      });
      if (r.status >= 400 || typeof r.data !== "string") return null;
      return r.data;
    } catch { return null; }
  };
  const absolutize = (h: string, base: string): string => {
    try { return new URL(h, base).toString(); } catch { return ""; }
  };
  // 0. The content URL itself may already be a fastdl/dl.php link.
  const direct0 = unwrapFastdl(contentUrl);
  if (direct0) return direct0;
  // 1. Content page → host links (G-Direct fastdl first, then nexdrive pages).
  const html = await get(contentUrl);
  if (!html || dead()) return null;
  const $ = cheerio.load(html);
  const fastdlFirst: string[] = [];
  const interFirst: string[] = [];
  const seen = new Set<string>();
  $("a[href]").each((_, el) => {
    const abs = absolutize($(el).attr("href") || "", contentUrl);
    if (!abs.startsWith("http") || seen.has(abs)) return;
    seen.add(abs);
    const l = abs.toLowerCase();
    if (l.includes("fastdl.zip") || l.includes("dl.php")) fastdlFirst.push(abs);
    else if (l.includes("nexdrive") || l.includes("genxfm") || l.includes("vcloud")) interFirst.push(abs);
  });
  // 2. Direct fastdl links on the content page (skip the intermediate hop).
  for (const f of fastdlFirst.slice(0, 3)) {
    if (dead()) return null;
    const inner = unwrapFastdl(f);
    if (inner) return inner;
    if (/\/embed\?download=/i.test(f)) {
      const em = await get(f);
      if (em) {
        const m = em.match(/dl\.php\?link=(https?[^"'\s<>\\]+)/i);
        if (m) {
          try {
            const inner2 = decodeURIComponent(m[1]);
            if (isDirect(inner2) && !isNonFinal(inner2)) return inner2;
          } catch {}
        }
      }
    }
  }
  // 3. Intermediate pages → G-Direct [Instant] anchor → embed → direct URL.
  for (const ih of interFirst.slice(0, 3)) {
    if (dead()) return null;
    const im = await get(ih);
    if (!im) continue;
    const $$ = cheerio.load(im);
    let gdir = "";
    $$("a[href]").each((_, el) => {
      if (gdir) return false;
      const t = ($$(el).text() || "").toLowerCase();
      const h = absolutize($$(el).attr("href") || "", ih);
      if (!h) return;
      if (/g-direct|instant/.test(t) && h.toLowerCase().includes("fastdl")) gdir = h;
    });
    // Fallback: any fastdl/dl.php anchor even without the label.
    if (!gdir) {
      $$("a[href]").each((_, el) => {
        if (gdir) return false;
        const h = absolutize($$(el).attr("href") || "", ih);
        if (h && (h.toLowerCase().includes("fastdl.zip") || h.toLowerCase().includes("dl.php"))) gdir = h;
      });
    }
    if (!gdir) continue;
    const inner = unwrapFastdl(gdir);
    if (inner) return inner;
    const em = await get(gdir);
    if (!em || dead()) continue;
    const m = em.match(/dl\.php\?link=(https?[^"'\s<>\\]+)/i);
    if (m) {
      try {
        const inner2 = decodeURIComponent(m[1]);
        if (isDirect(inner2) && !isNonFinal(inner2) && !isTracking(inner2)) return inner2;
      } catch {}
    }
  }
  return null;
}

/** Light browser lane (~25s budget): single page load, one generate click,
    s3/fsl/fastdl/direct scan. No nexdrive option expansion — the full flow
    stays as last resort. Races the python bridge so the faster lane wins. */
async function playwrightFast(contentUrl: string, budgetMs = 25000, job?: Job): Promise<string | null> {
  const t0 = Date.now();
  let context: any = null;
  try {
    const browser = await getBrowser();
    const navTimeout = Math.max(5, parseInt(process.env.WATCH_NAV_TIMEOUT || "15", 10)) * 1000;
    context = await browser.newContext({
      userAgent: process.env.SITE_USER_AGENT || "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    });
    await context.route("**/*", (route: any) => {
      const t = route.request().resourceType();
      const u = route.request().url();
      if (t === "image" || t === "font" || t === "media" || isTracking(u)) return route.abort();
      return route.continue();
    });
    const page = await context.newPage();
    await page.goto(contentUrl, { waitUntil: "domcontentloaded", timeout: navTimeout }).catch(() => {});
    const gen = page.locator("#download, button:has-text(\"Generate Download Link\")").first();
    if (await gen.count().catch(() => 0)) {
      await gen.click({ timeout: 5000 }).catch(() => {});
      await page.waitForTimeout(1500);
    }
    const scan = async (): Promise<string | null> => {
      const s3 = await page.locator("a#s3[href]").first().getAttribute("href").catch(() => null);
      const fsl = await page.locator("a#fsl[href]").first().getAttribute("href").catch(() => null);
      for (const cand of [s3, fsl]) {
        if (cand && cand.startsWith("http") && isDirect(cand) && !isNonFinal(cand) && !isTracking(cand)) return cand;
      }
      try {
        const hrefs: string[] = await page.locator("a[href]").evaluateAll(
          (els: any[]) => els.map((e: any) => e.getAttribute("href") || "").slice(0, 300)).catch(() => []);
        for (const h of hrefs) {
          let abs = "";
          try { abs = new URL(h, page.url()).toString(); } catch { continue; }
          const unwrapped = unwrapFastdl(abs);
          if (unwrapped) return unwrapped;
        }
        for (const h of hrefs) {
          let abs = "";
          try { abs = new URL(h, page.url()).toString(); } catch { continue; }
          if (abs.startsWith("http") && isDirect(abs) && !isNonFinal(abs) && !isTracking(abs)) return abs;
        }
      } catch {}
      return null;
    };
    const found = await scan();
    if (found) return found;
    const deadline = Math.min(Date.now() + budgetMs, t0 + budgetMs);
    while (Date.now() < deadline) {
      if ((job as any)?.cancelled) return null;
      const hit = await scan();
      if (hit) return hit;
      await page.waitForTimeout(750);
    }
    return null;
  } catch { return null; }
  finally { await context?.close().catch(() => {}); }
}

async function playwrightResolve(contentUrl: string, job?: Job): Promise<string> {
  // Hard internal deadline: this flow polls option pages and must never run
  // 10 minutes detached after the job already timed out (it once logged
  // ms=630614). Cancelled flag stops orphaned work after job timeout/fail.
  const deadline = Date.now() + Math.max(60000, parseInt(process.env.RESOLVER_BROWSER_BUDGET || "150", 10) * 1000);
  const dead = () => (job as any)?.cancelled === true || Date.now() > deadline;
  const browser = await getBrowser();
  const navTimeout = Math.max(5, parseInt(process.env.WATCH_NAV_TIMEOUT || "15", 10)) * 1000;
  const context = await browser.newContext({
    userAgent: process.env.SITE_USER_AGENT || "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
  });
  // block waste: images/fonts/ads
  await context.route("**/*", (route: any) => {
    const t = route.request().resourceType();
    const u = route.request().url();
    if (t === "image" || t === "font" || t === "media" || isTracking(u)) return route.abort();
    return route.continue();
  });
  let netHit: string | null = null;
  context.on("response", (res: any) => {
    try { if (!netHit && isDirect(res.url())) netHit = res.url(); } catch {}
  });
  const page = await context.newPage();
  const tag = `[resolve ${hostOf(contentUrl)}]`;
  try {
    await page.goto(contentUrl, { waitUntil: "domcontentloaded", timeout: navTimeout });
    console.log(`${tag} content loaded`);
    // 1. host hrefs by domain (DOM order, deduped)
    const doms = vcloudDomains();
    const hrefs: string[] = await page.locator("a[href]").evaluateAll((els: any[]) => els.map((e: any) => e.getAttribute("href") || "").slice(0, 1000)).catch(() => []);
    // Gather every vcloud/nexdrive href on the content page (in DOM order).
    const targetUrls: string[] = [];
    for (const h of hrefs) {
      try {
        const abs = new URL(h, page.url()).toString();
        if (doms.some((d) => abs.toLowerCase().includes(d)) && !targetUrls.includes(abs)) targetUrls.push(abs);
      } catch {}
    }
    console.log(`${tag} host-options=${targetUrls.length}`);

    const isNex = (u: string) => { const l = u.toLowerCase(); return l.includes("nexdrive") || l.includes("genxfm"); };

    // Try generate→poll on the current page. Returns playable URL or null.
    const tryGenerate = async (budgetMs: number): Promise<string | null> => {
      const scanAnchors = async (): Promise<string | null> => {
        // s3/fsl first (highest confidence), then any direct anchor incl.
        // fastdl-wrapped links.
        const s3 = await page.locator("a#s3[href]").first().getAttribute("href").catch(() => null);
        const fsl = await page.locator("a#fsl[href]").first().getAttribute("href").catch(() => null);
        const cands: (string | null)[] = [s3, fsl];
        try {
          const hrefs: string[] = await page.locator("a[href]").evaluateAll(
            (els: any[]) => els.map((e: any) => e.getAttribute("href") || "").slice(0, 300)).catch(() => []);
          for (const h of hrefs) {
            const unwrapped = unwrapFastdl(h.startsWith("http") ? h : (() => { try { return new URL(h, page.url()).toString(); } catch { return ""; } })());
            if (unwrapped) { cands.push(unwrapped); break; }
          }
          for (const h of hrefs.slice(0, 300)) {
            let abs = "";
            try { abs = new URL(h, page.url()).toString(); } catch { continue; }
            if (abs.startsWith("http") && isDirect(abs) && !isNonFinal(abs) && !isTracking(abs)) { cands.push(abs); break; }
          }
        } catch {}
        for (const cand of cands) {
          if (cand && cand.startsWith("http") && isDirect(cand) && !isNonFinal(cand) && !isTracking(cand)) return cand;
        }
        return null;
      };
      const gen = page.locator("#download, button:has-text(\"Generate Download Link\")").first();
      if (await gen.count().catch(() => 0)) {
        await gen.click({ timeout: 5000 }).catch(() => {});
        await page.waitForTimeout(1500);
      }
      const found = await scanAnchors();
      if (found) return found;
      const deadline = Date.now() + budgetMs;
      while (Date.now() < deadline) {
        const hit = await scanAnchors();
        if (hit) return hit;
        if (netHit && isDirect(netHit) && !isNonFinal(netHit)) return netHit;
        await page.waitForTimeout(500);
      }
      return netHit && isDirect(netHit) && !isNonFinal(netHit) ? netHit : null;
    };

    // Expand one host URL: nexdrive intermediates expose per-host option
    // links (v-cloud, g-direct, filepress, dropgalaxy, …). Try each in order.
    const expandOptions = async (hostUrl: string): Promise<string[]> => {
      await page.goto(hostUrl, { waitUntil: "domcontentloaded", timeout: navTimeout }).catch(() => {});
      await page.waitForTimeout(3000);
      if (!isNex(page.url())) return [page.url()];
      const opt = await page.locator("a[href]").evaluateAll((els: any[]) =>
        els.map((e: any) => ({ h: e.getAttribute("href") || "", t: (e.innerText || "").toLowerCase().trim().slice(0, 60) })).slice(0, 500)
      ).catch(() => []);
      const seen = new Set<string>();
      const ranked: { url: string; score: number }[] = [];
      for (const o of opt as any[]) {
        let abs = "";
        try { abs = new URL(o.h, page.url()).toString(); } catch { continue; }
        if (!abs.startsWith("http") || seen.has(abs) || abs === page.url()) continue;
        if (isTracking(abs) || isAsset(abs)) continue;
        seen.add(abs);
        const t = o.t || "";
        let score = 0;
        if (/v-?cloud|resumable/.test(t)) score = 3;
        else if (/g-?direct|instant|drive|download|watch|server\s*[12]/.test(t)) score = 2;
        else if (t.length > 1 && t.length < 40) score = 1;
        if (score > 0) ranked.push({ url: abs, score });
      }
      ranked.sort((a, b) => b.score - a.score);
      const out = ranked.slice(0, 4).map((r) => r.url);
      console.log(`${tag} nexdrive options=${out.length}`);
      return out.length ? out : [page.url()];
    };

    let tried = 0;
    for (const hostUrl of targetUrls.slice(0, 3)) {
      if (dead()) throw new Error("cancelled");
      const options = await expandOptions(hostUrl);
      for (const optUrl of options) {
        if (dead()) throw new Error("cancelled");
        if (optUrl !== page.url()) {
          await page.goto(optUrl, { waitUntil: "domcontentloaded", timeout: navTimeout }).catch(() => {});
          await page.waitForTimeout(2500);
        }
        console.log(`${tag} trying (${++tried})`);
        const hit = await tryGenerate(15000);
        if (hit) return hit;
      }
      if (tried >= 5) break;
    }
    if (netHit && isDirect(netHit) && !isNonFinal(netHit)) return netHit;
    throw new Error("No playable URL found (site may have changed markup)");
  } finally {
    await context.close().catch(() => {});
  }
}

// Internal pipeline with per-stage timings (counts/hosts only in logs).
// Own fast lanes first (pure HTTP, ~seconds), bot bridge + full browser as
// fallbacks. Every lane's URL is validated; a dead link falls through to the
// next lane instead of failing the whole job (fixes "all qualities dead"
// when G-Direct hands back expired file links).
async function runPipeline(sourceUrl: string, job: Job, background = false, skipFast = false): Promise<string> {
  if ((process.env.WATCH_ENABLED || "true").toLowerCase() !== "true") throw new Error("WATCH_ENABLED=false");
  const t00 = Date.now();
  const elapsed = () => Date.now() - t00;
  // Validate one candidate: ok → adopt it; dead/invalid → fall through.
  const consider = async (label: string, u: string | null): Promise<boolean> => {
    if (!u || isTracking(u) || isAsset(u) || isNonFinal(u) || (job as any).cancelled) {
      if (u) console.log(`[resolve] stage ${label} rejected: ${hostOf(sourceUrl)} ms=${elapsed()}`);
      return false;
    }
    job.stage = "validating";
    const v = await validateStream(u);
    if (!v.ok) {
      console.log(`[resolve] stage ${label} dead-link, trying next lane: ${hostOf(sourceUrl)} ms=${elapsed()}`);
      return false;
    }
    job.seekable = v.seekable;
    job.stage = "ready";
    return true;
  };
  // Seekable-upgrade jobs skip the HTTP lanes on purpose: G-Direct files are
  // fast but never honor Range, so they go straight to the bridge whose
  // vcloud/R2 links are seekable.
  if (!skipFast) {
    job.stage = "fast-path";
    let fastUrl = await fastHttpPath(sourceUrl);
    if (fastUrl) {
      console.log(`[resolve] stage fast-path hit: ${hostOf(sourceUrl)} ms=${elapsed()}`);
      if (await consider("fast-path", fastUrl)) return fastUrl;
    }
  }
  let finalUrl: string | null = null;
  if (!skipFast && !(job as any).cancelled) {
    job.stage = "gdirect";
    try { finalUrl = await gdirectResolve(sourceUrl, job); }
    catch { finalUrl = null; }
    console.log(`[resolve] stage gdirect ${finalUrl ? "hit" : "miss"}: ${hostOf(sourceUrl)} ms=${elapsed()}`);
    if (finalUrl && (await consider("gdirect", finalUrl))) return finalUrl;
    finalUrl = null;
  }
  // LITE: the seekable upgrade needs the python/bridge lanes — fail fast so
  // the player keeps playing the direct URL it already has (Watch treats a
  // failed upgrade as "no upgrade", never as an error).
  if (LITE && skipFast) throw new Error("seekable upgrade unavailable in lite mode");
  if (!skipFast && !(job as any).cancelled) {
    job.stage = "browser-fast";
    const fastBudget = Math.max(15000, Math.min(40000, parseInt(process.env.RESOLVER_FAST_BUDGET || "25000", 10)));
    try { finalUrl = LITE ? null : await playwrightFast(sourceUrl, fastBudget, job); }
    catch { finalUrl = null; }
    console.log(`[resolve] stage browser-fast ${finalUrl ? "hit" : "miss"}: ${hostOf(sourceUrl)} ms=${elapsed()}`);
    if (finalUrl && (await consider("browser-fast", finalUrl))) return finalUrl;
    finalUrl = null;
  }
  if (!LITE && !(job as any).cancelled) {
    job.stage = "bridge";
    finalUrl = await pythonResolve(sourceUrl, Math.min(420000, resolverTimeoutMs(background)));
    console.log(`[resolve] stage bridge ${finalUrl ? "hit" : "miss"}: ${hostOf(sourceUrl)} ms=${elapsed()}`);
    if (finalUrl && (await consider("bridge", finalUrl))) return finalUrl;
    finalUrl = null;
  }
  if (!LITE && !(job as any).cancelled) {
    job.stage = "browser";
    try { finalUrl = await playwrightResolve(sourceUrl, job); }
    catch (e: any) {
      if (String(e?.message || e).includes("cancelled")) throw e;
      console.log(`[resolve] built-in flow missed: ${String(e?.message || e).slice(0, 120)}`);
    }
    console.log(`[resolve] stage browser ${finalUrl ? "hit" : "miss"}: ${hostOf(sourceUrl)} ms=${elapsed()}`);
    if (finalUrl && (await consider("browser", finalUrl))) return finalUrl;
    finalUrl = null;
  }
  if ((job as any).cancelled) throw new Error("cancelled");
  throw new Error("Stream link is dead — try another version");
}

function readyJob(url: string, source: string): Job {
  return { id: "cache-" + Math.random().toString(36).slice(2, 10), status: "ready", url, error: "", created: Date.now(), stage: "cache", source };
}

export function enqueueResolve(sourceUrl: string, opts: { background?: boolean; skipFast?: boolean; fresh?: boolean } = {}): Job {
  const now = Date.now();
  const source = hostOf(sourceUrl);
  const key = normKey(sourceUrl);
  // 1. Temporary cache lookup (conservative TTL, well under source expiry).
  // fresh=true (seekable upgrade) bypasses the read — the cached entry is
  // the unseekable fast link we're trying to replace (the write below
  // overwrites it, so future taps get the seekable URL directly).
  const hit = opts.fresh ? undefined : streamCache.get(key) || streamCache.get(sourceUrl);
  if (hit) {
    const remaining = hit.expiresAt - now;
    if (remaining > refreshThresholdMs()) {
      metrics.cacheHits++;
      console.log(`[resolve] cache HIT: ${source} expires_in=${Math.round(remaining / 1000)}s`);
      return readyJob(hit.url, source);
    }
    if (remaining > 0) {
      // Stale-while-refresh: still usable → return now, refresh behind.
      metrics.cacheHits++;
      console.log(`[resolve] cache STALE (refresh in bg): ${source} expires_in=${Math.round(remaining / 1000)}s`);
      if (!inflight.has(key)) enqueueFresh(sourceUrl, true);
      return readyJob(hit.url, source);
    }
    streamCache.delete(key);
    streamCache.delete(sourceUrl);
  }
  metrics.cacheMisses++;
  // 2. Deduplication: an identical resolution already running → share it.
  const existing = inflight.get(key) || inflight.get(sourceUrl);
  if (existing && existing.status === "working") {
    metrics.deduped++;
    console.log(`[resolve] dedup: sharing in-flight job for ${source}`);
    return existing;
  }
  return enqueueFresh(sourceUrl, !!opts.background, !!opts.skipFast);
}

function enqueueFresh(sourceUrl: string, background: boolean, skipFast = false): Job {
  const source = hostOf(sourceUrl);
  const key = normKey(sourceUrl);
  const id = Math.random().toString(36).slice(2, 10);
  const job: Job = { id, status: "working", url: "", error: "", created: Date.now(), stage: "queued", source };
  jobs.set(id, job);
  inflight.set(key, job);
  const t0 = Date.now();
  // User taps use the reserved slot (priority 1); background pre-resolves
  // share the remaining pool so the laptop is never flooded with browsers.
  schedule(async () => {
    const queueWait = Date.now() - t0;
    try {
      const url = await withTimeout(
        runPipeline(sourceUrl, job, background, skipFast),
        resolverTimeoutMs(background) + 15000,
        "Resolution timed out — try another version"
      );
      streamCache.set(key, { url, resolvedAt: Date.now(), expiresAt: Date.now() + streamTtlMs() });
      job.status = "ready"; job.url = url; job.stage = "ready";
      metrics.resolved++;
      if (background) metrics.preResolved++;
      const ms = Date.now() - t0;
      metrics.totalResolveMs += ms;
      metrics.maxResolveMs = Math.max(metrics.maxResolveMs, ms);
      console.log(`[resolve] READY: ${source} duration_ms=${ms} queue_ms=${queueWait} expires_in=${Math.round(streamTtlMs() / 1000)}s${background ? " (pre-resolved)" : ""}${skipFast ? " (seekable-upgrade)" : ""}`);
    } catch (e: any) {
      const msg = String(e?.message || e).slice(0, 300);
      job.status = "failed"; job.error = msg; job.stage = "failed";
      // Stop orphaned browser/python work still running detached after the
      // timeout — it burned laptop CPU for 10+ minutes in production logs.
      (job as any).cancelled = true;
      metrics.failed++;
      if (/timed out/i.test(msg)) metrics.timedOut++;
      console.log(`[resolve] FAILED: ${source} duration_ms=${Date.now() - t0} queue_ms=${queueWait} error=${msg.slice(0, 120)}`);
    } finally {
      if (inflight.get(key) === job) inflight.delete(key);
      if (inflight.get(sourceUrl) === job) inflight.delete(sourceUrl);
    }
  }, background ? 0 : 1).catch(() => {});
  // TTL cleanup
  for (const [k, j] of jobs) if (Date.now() - j.created > 15 * 60 * 1000) jobs.delete(k);
  for (const [k, e] of streamCache) if (e.expiresAt <= Date.now()) streamCache.delete(k);
  return job;
}

// Background pre-resolution: resolve top search results ahead of the tap.
// Never blocks the caller; bounded by PRE_RESOLVE_LIMIT + scheduler cap.
export function preResolve(sourceUrls: string[]): void {
  const limit = Math.max(0, parseInt(process.env.PRE_RESOLVE_LIMIT || "2", 10));
  const seen = new Set<string>();
  let n = 0;
  for (const u of sourceUrls || []) {
    if (typeof u !== "string" || !u.startsWith("http")) continue;
    if (seen.has(u)) continue;
    seen.add(u);
    if (n++ >= limit) break;
    try {
      const hit = streamCache.get(u);
      if (hit && hit.expiresAt - Date.now() > refreshThresholdMs()) continue;
      if (inflight.has(u)) continue;
      enqueueFresh(u, true);
    } catch {}
  }
}
