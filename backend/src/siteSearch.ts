import axios from "axios";
import * as cheerio from "cheerio";
import {
  normalizeQuery, parseMeta, contentId, resultId, matchScore,
  priorityRank, groupForPriority, ContentGroup, groupByContent,
  sourceTypeFor, sourceNameFor, ContentItem, isExactVersion,
} from "./identity.js";

// Marcivo site search core:
// build URL -> fetch HTML/JSON -> score -> dedupe -> per-site + total limits -> TTL cache.

export interface SiteResult {
  title: string;
  url: string;
  score: number;
  site_id: number;
  site_name: string;
  /** movie vs series guessed from title tags (Season / Web Series / Episode…). */
  kind: "movie" | "series";
  /** content type incl. anime when the search ran in the anime group. */
  type?: "movie" | "series" | "anime";
  /** content identity: type + normalized title + year (+season+episode). Same
       content on different sites shares a content_id; different years,
       types, seasons or episodes never collide. */
  content_id?: string;
  /** stable per-source-page identity: site + hash of source URL. */
  result_id?: string;
  /** year parsed from the title, when present. */
  year?: string;
  /** 0-100 match vs the normalized query (title + year + type + season). */
  match?: number;
  /** content origin mapped from site: 1 Vegamovies=hollywood, 2 RogMovies=bollywood. */
  origin: "hollywood" | "bollywood" | "mixed";
  // --- §14 normalized result schema (single contract for all adapters) ---
  /** lowercased adapter name, e.g. "prmovies". */
  source?: string;
  /** streaming vs download orientation from central config. */
  source_type?: "streaming" | "download";
  /** 1 = highest priority within the active group. */
  source_priority?: number;
  /** per-source-page id (same as result_id). */
  source_result_id?: string;
  original_title?: string;
  language?: string[];
  country?: string;
  season?: number;
  episode?: number;
  /** never copied from an unrelated result — empty means "use metadata poster". */
  poster?: string;
  backdrop?: string;
  description?: string;
  /** exact page URL on the source (alias of url). */
  source_url?: string;
  match_score?: number;
  /** single quality for expanded variant rows (480p/720p/1080p/…). */
  quality?: string;
}

// --- §16/17 exact-identity registry -------------------------------------
// Every normalized result is registered here so /api/resolve and
// /api/result/:id can serve THAT specific source page without a fresh
// generic title search (which caused wrong-result bugs).
interface RegistryEntry {
  result_id: string;
  content_id: string;
  site_id: number;
  site_name: string;
  title: string;
  type: string;
  year: string;
  url: string;
  expires: number;
}
const resultRegistry = new Map<string, RegistryEntry>();
const REGISTRY_TTL_MS = 24 * 3600 * 1000;

export function lookupResult(resultId: string): RegistryEntry | null {
  const hit = resultRegistry.get(resultId);
  if (!hit) return null;
  if (hit.expires <= Date.now()) { resultRegistry.delete(resultId); return null; }
  return hit;
}

export function registerResults(list: SiteResult[]): void {
  try {
    const now = Date.now();
    for (const r of list) {
      if (!r.result_id || !r.url) continue;
      resultRegistry.set(String(r.result_id), {
        result_id: String(r.result_id),
        content_id: String(r.content_id || ""),
        site_id: r.site_id,
        site_name: r.site_name,
        title: r.title,
        type: String(r.type || r.kind || "movie"),
        year: String(r.year || ""),
        url: r.url,
        expires: now + REGISTRY_TTL_MS,
      });
    }
    if (resultRegistry.size > 5000) {
      // Evict expired first, then oldest.
      for (const [k, v] of resultRegistry) {
        if (v.expires <= now) resultRegistry.delete(k);
        if (resultRegistry.size <= 4000) break;
      }
    }
  } catch {}
}

/** §39 adapter validation: every result must carry its own identity. */
function validateResult(r: SiteResult): boolean {
  if (!r.title || !String(r.title).trim()) return false;
  if (!r.site_id || !r.site_name) return false;
  if (!r.url || !String(r.url).startsWith("http")) return false;
  if (!r.result_id) return false;
  const t = String(r.type || r.kind || "");
  if (!["movie", "series", "anime"].includes(t)) return false;
  return true;
}

function guessKind(title: string): "movie" | "series" {
  return /season\s*\d|web[\s-]*series|complete|episode\s*\d|series\s*\(/i.test(title || "") ? "series" : "movie";
}

function originFor(siteId: number): SiteResult["origin"] {
  if (siteId === 1) return "hollywood";
  if (siteId === 2) return "bollywood";
  return "mixed";
}

interface SiteCfg {
  id: number;
  base_url: string;
  search_path: string;
  name: string;
  /** Require a year/quality tag in result titles (SITE{n}_STRICT_TITLE). */
  strict_title: boolean;
}

const cache = new Map<string, { expires: number; value: any }>();

function clean(t: string) {
  return (t || "").replace(/\s+/g, " ").trim();
}

function tokens(t: string): Set<string> {
  const m = (t || "").toLowerCase().match(/[a-z0-9]+/g) || [];
  return new Set(m.filter((x) => x.length >= 2));
}

function score(title: string, query: string, url = "") {
  const t = clean(title).toLowerCase();
  const q = clean(query).toLowerCase();
  if (!t) return 0;
  let s = 0;
  if (t === q) s += 100;
  if (q && t.includes(q)) s += 40;
  const qt = tokens(q);
  const tt = tokens(t);
  let inter = 0;
  qt.forEach((x) => { if (tt.has(x)) inter++; });
  s += inter * 12;
  if (q && url.toLowerCase().includes(q.replace(/ /g, "-"))) s += 5;
  return s;
}

const SKIP = ["/login", "/signin", "/signup", "/register", "/privacy", "/terms", "/contact", "/about", "/wp-admin", "/feed", "/author/", "/tag/", "/category/", "/page/", "/search", "/sitemap",
  // Article/blog clones (fake PRMovies mirror serves these instead of content).
  "/blog/", "/article", "/news/", "/box-office", "/collection/", "/report/", "/verdict/", "/trailer/", "/review/", "/biography", "/net-worth", "/cast/", "/wiki/"];
export const ARTICLE_TITLE = /box office|verdict|biography|net worth|trailer|review|collection \d{4} report|read more$/i;

function allowedUrl(u: string, base: string) {
  try {
    const a = new URL(u);
    const b = new URL(base);
    if (!["http:", "https:"].includes(a.protocol)) return false;
    if (a.hostname.toLowerCase() !== b.hostname.toLowerCase()) return false;
    const p = (a.pathname || "/").toLowerCase();
    return !SKIP.some((s) => p.includes(s));
  } catch { return false; }
}

function normalise(href: string, base: string): string | null {
  if (!href) return null;
  const h = href.trim();
  if (h.startsWith("javascript:") || h.startsWith("mailto:") || h.startsWith("tel:") || h.startsWith("#")) return null;
  try {
    const u = new URL(h, base.endsWith("/") ? base : base + "/");
    u.hash = "";
    const out = u.toString();
    return allowedUrl(out, base) ? out : null;
  } catch { return null; }
}

function siteConfigs(): SiteCfg[] {
  const defaults: Record<number, string> = {
    1: "/?s={query}",
    2: "/ts-search.php?q={query}&page=1",
    3: "/search.php?q={query}&page=1",
    4: "/?s={query}",
    5: "/?s={query}",
    6: "/ts-search.php?q={query}&page=1",
    7: "/ts-search.php?q={query}&page=1",
    8: "/ts-search.php?q={query}&page=1",
  };
  const out: SiteCfg[] = [];
  for (let i = 1; i <= 8; i++) {
    const b = (process.env[`SITE${i}_BASE_URL`] || "").trim().replace(/\/$/, "");
    const p = (process.env[`SITE${i}_SEARCH_PATH`] || defaults[i]).trim();
    const n = (process.env[`SITE${i}_NAME`] || `Site ${i}`).trim();
    const strict = (process.env[`SITE${i}_STRICT_TITLE`] || "").trim().toLowerCase() === "true";
    if (b && p) out.push({ id: i, base_url: b, search_path: p, name: n, strict_title: strict });
  }
  return out;
}

function buildSearchUrl(base: string, path: string, q: string) {
  const enc = encodeURIComponent(q);
  let p = path;
  if (p.includes("{query}")) p = p.replace("{query}", enc);
  else if (p.includes("{query_encoded}")) p = p.replace("{query_encoded}", enc);
  return new URL(p.replace(/^\//, ""), base.endsWith("/") ? base : base + "/").toString();
}

/** Content signals: real movie/series pages carry a year, quality tag or
    season marker. Blog clones (fake PRMovies) serve articles without any. */
export const CONTENT_SIGNAL = /\b((?:19|20)\d{2})\b|480p|720p|1080p|2160p|4k|blu-?ray|web-?dl|webrip|hdrip|hdts|hdtc|hdcam|dvdrip|season\s*\d|s\d+\s*e\d+|episode\s*\d+|complete|web[\s-]*series/i;

function extractHtml(html: string, base: string, q: string, strictTitle = false) {
  const $ = cheerio.load(html);
  const seen = new Set<string>();
  const cands: SiteResult[] = [];
  let anchors = $("article a[href], .post a[href], .entry a[href], .movie a[href], .item a[href], .card a[href], main a[href]");
  if (!anchors.length) anchors = $("a[href]");
  anchors.each((_, el) => {
    const rawHref = $(el).attr("href") || "";
    // Pagination / nav links (NEXT, », page numbers) match only via their
    // URL (e.g. ?s=query&paged=2) — never real content. Drop them.
    if (/[?&](paged?|page)=\d+/i.test(rawHref)) return;
    const href = normalise(rawHref, base);
    if (!href || seen.has(href)) return;
    let title = clean($(el).attr("title") || $(el).attr("aria-label") || $(el).text());
    if (title.length < 2) {
      // Thumbnail/overlay anchors with no text (e.g. anime sites): fall back
      // to inner img alt, then nearby headings inside the same card.
      const imgAlt = clean($(el).find("img").attr("alt") || $(el).find("img").attr("title") || "");
      const card = $(el).closest("article,.post,.item,.card,main");
      const near = clean(card.find("h2,h3,h4,.title,.name,.post-title").first().text() || "");
      title = imgAlt.length >= 2 ? imgAlt : near;
    }
    if (title.length < 2 || title.length > 300) return;
    if (/^(next|prev|previous|»|«|›|‹|\d+|read more(\.\.\.)?|more)$/i.test(title)) return;
    // Blog-clone articles (fake PRMovies): never real playable content.
    if (ARTICLE_TITLE.test(title)) return;
    // Optional per-site hardening (SITE{n}_STRICT_TITLE=true): require a
    // content signal (year/quality) so blog-clone articles can never surface
    // as versions. Off by default — real sites (e.g. the PRMovies slot after
    // it was swapped) often have bare titles like "Inception online free".
    if (strictTitle && !CONTENT_SIGNAL.test(title)) return;
    const s = score(title, q, href);
    if (s <= 0) return;
    seen.add(href);
    cands.push({ title, url: href, score: s, site_id: 0, site_name: "", kind: "movie", origin: "mixed" });
  });
  return cands;
}

function walkJson(v: any, base: string, q: string, out: SiteResult[]) {
  if (Array.isArray(v)) { v.forEach((x) => walkJson(x, base, q, out)); return; }
  if (v && typeof v === "object") {
    const doc = (v as any).document;
    if (doc && typeof doc === "object") {
      const title = doc.post_title || doc.title || doc.name;
      const url = doc.permalink || doc.url || doc.link || doc.href;
      if (typeof title === "string" && typeof url === "string") {
        const n = normalise(url, base);
        if (n) out.push({ title: clean(title), url: n, score: Math.max(score(title, q, n), 1), site_id: 0, site_name: "", kind: "movie", origin: "mixed" });
      }
    }
    const t = (v as any).title || (v as any).name || (v as any).post_title;
    const u = (v as any).url || (v as any).link || (v as any).permalink || (v as any).href;
    if (typeof t === "string" && typeof u === "string") {
      const n = normalise(u, base);
      if (n) { const s = score(t, q, n); if (s > 0) out.push({ title: clean(t), url: n, score: s, site_id: 0, site_name: "", kind: "movie", origin: "mixed" }); }
    }
    for (const k of Object.keys(v)) walkJson((v as any)[k], base, q, out);
  }
}

async function searchOne(site: SiteCfg, q: string) {
  const url = buildSearchUrl(site.base_url, site.search_path, q);
  const timeout = Math.max(5, parseInt(process.env.SITE_TIMEOUT || "15", 10)) * 1000;
  try {
    const r = await axios.get(url, {
      timeout,
      headers: {
        "User-Agent": process.env.SITE_USER_AGENT || "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        Accept: "text/html,application/xhtml+xml,application/json;q=0.9,*/*;q=0.8",
      },
      maxRedirects: 5,
      validateStatus: () => true,
    });
    if (r.status >= 400) return { status: "unavailable" as const, results: [] as SiteResult[] };
    const body = typeof r.data === "string" ? r.data : JSON.stringify(r.data);
    let results: SiteResult[] = [];
    const ct = String(r.headers["content-type"] || "");
    const looksJson = body.trimStart().startsWith("{") || body.trimStart().startsWith("[");
    if (ct.includes("json") || looksJson) {
      try { const out: SiteResult[] = []; walkJson(JSON.parse(body), site.base_url, q, out); results = out; } catch { results = []; }
    }
    if (!results.length && typeof r.data === "string") results = extractHtml(r.data, site.base_url, q, site.strict_title);
    const perSite = Math.max(1, parseInt(process.env.SITE_MAX_RESULTS_PER_SITE || "8", 10));
    const best = new Map<string, SiteResult>();
    for (const it of results) {
      const old = best.get(it.url);
      if (!old || it.score > old.score) best.set(it.url, it);
    }
    const list = [...best.values()].sort((a, b) => b.score - a.score || a.title.localeCompare(b.title)).slice(0, perSite);
    list.forEach((x) => { x.site_id = site.id; x.site_name = site.name; x.kind = guessKind(x.title); x.origin = originFor(site.id); });
    return { status: "ok" as const, results: list };
  } catch {
    return { status: "unavailable" as const, results: [] as SiteResult[] };
  }
}

export interface SearchOpts {
  /** Content group: constrains type labeling + priority ranking. */
  group?: ContentGroup;
  /** Development-only detailed trace (§44). Never enabled in prod by default. */
  debug?: boolean;
}

export interface DebugRow {
  raw_title: string;
  normalized: string;
  content_id: string;
  result_id: string;
  source: string;
  match: number;
  dedup: string;
  rank: number;
}

export async function searchSites(rawQuery: string, onlySiteIds?: number[], prioritySites?: number[], opts: SearchOpts = {}) {
  const q = clean(rawQuery);
  if (!q) return { status: "empty", results: [] };
  if ((process.env.SITE_SEARCH_ENABLED || "true").toLowerCase() !== "true") return { status: "disabled", results: [] };
  let sites = siteConfigs();
  if (onlySiteIds && onlySiteIds.length) sites = sites.filter((s) => onlySiteIds.includes(s.id));
  if (!sites.length) return { status: "not_configured", results: [] };
  const group: ContentGroup = opts.group || "unknown";
  // Priority: explicit override, else the group's central order
  // (streaming first, then download fallbacks).
  const prio = (prioritySites || []).filter((id) => sites.some((s) => s.id === id));
  const rankOf = (siteId: number) => {
    if (prio.length) {
      const i = prio.indexOf(siteId);
      return i >= 0 ? i : 999;
    }
    return priorityRank(group, siteId);
  };
  const nq = normalizeQuery(q);

  const ttl = Math.max(0, parseInt(process.env.SITE_SEARCH_CACHE || "600", 10)) * 1000;
  const ck = q.toLowerCase() + "|sites=" + sites.map((s) => s.id).join(",") + "|prio=" + prio.join(",") + "|g=" + group;
  const hit = cache.get(ck);
  if (hit && hit.expires > Date.now()) {
    try { registerResults(((hit.value as any)?.results || []) as SiteResult[]); } catch {}
    // Debug is derived (§44) — attach on demand even for cached payloads.
    if (opts.debug && !(hit.value as any)?.debug && Array.isArray((hit.value as any)?.results)) {
      try {
        (hit.value as any).debug = ((hit.value as any).results as SiteResult[]).map((r, i) => ({
          raw_title: String(r.title).slice(0, 120),
          normalized: String(r.content_id || "").slice(0, 120),
          content_id: String(r.content_id || ""),
          result_id: String(r.result_id || ""),
          source: String(r.source || r.site_name),
          match: r.match || 0,
          dedup: `site|content collapse kept best match`,
          rank: i + 1,
        }));
      } catch {}
    }
    return hit.value;
  }

  const settled = await Promise.all(sites.map((s) => searchOne(s, q)));
  const perSite = sites.map((s, i) => ({
    site: s.name,
    status: (settled[i] as any)?.status || "unavailable",
    count: ((settled[i] as any)?.results || []).length,
  }));
  const available = settled.filter((r) => r.status !== "unavailable").length;
  if (!available) {
    const v = { status: "unavailable", results: [], site_count: sites.length, per_site: perSite };
    return v;
  }
  // URL dedupe first (identical pages), keeping the better score.
  const best = new Map<string, SiteResult>();
  for (const r of settled) for (const it of (r as any).results || []) {
    const k = it.url.replace(/\/$/, "");
    const old = best.get(k);
    if (!old || it.score > old.score) best.set(k, it);
  }
  // Identity enrichment (§11-14): every raw result keeps its own identity.
  // Nothing is merged across different content (different years, types,
  // seasons or episodes always keep separate rows); same content_id on the
  // SAME site collapses to the best match. Each result carries its own
  // title/year/type/poster/source_url — never reused from another result.
  const byContentSite = new Map<string, SiteResult>();
  for (const it of best.values()) {
    const meta = parseMeta(it.title);
    const type = group === "anime" ? "anime" : it.kind;
    it.type = type;
    it.year = meta.year || "";
    it.result_id = resultId(it.site_id, it.url);
    it.content_id = contentId(type, it.title, meta.year, meta.season, meta.episode);
    it.match = matchScore(nq, it.title, { year: meta.year, type, season: meta.season });
    // §14 full normalized schema — same contract for every adapter.
    it.source = sourceNameFor(it.site_id).toLowerCase();
    it.source_type = sourceTypeFor(it.site_id);
    it.source_priority = rankOf(it.site_id);
    it.source_result_id = it.result_id;
    it.original_title = it.title;
    it.language = [];
    it.country = "";
    it.season = meta.season;
    it.episode = meta.episode;
    // Source pages rarely expose a reliable poster: leave empty so the UI
    // falls back to the metadata (TMDB/AniList) poster. Never copy a poster
    // from an unrelated search result.
    if (typeof it.poster !== "string") it.poster = "";
    if (typeof it.backdrop !== "string") it.backdrop = "";
    if (typeof it.description !== "string") it.description = "";
    it.source_url = it.url;
    it.match_score = it.match;
    if (!validateResult(it)) continue;
    const k = `${it.site_id}|${it.content_id}`;
    const old = byContentSite.get(k);
    if (!old || (it.match || 0) > (old.match || 0)) byContentSite.set(k, it);
    else if ((it.match || 0) === (old.match || 0) && it.score > old.score) byContentSite.set(k, it);
  }
  const normalized = byContentSite.size;
  const total = Math.max(1, parseInt(process.env.SITE_MAX_RESULTS_TOTAL || "24", 10));
  // Rank (§22/§34): query match first (exact > loose, right year wins),
  // then correct content type, then source priority (streaming first), then
  // raw site score. Priority never hides a better-matching result.
  const results = [...byContentSite.values()]
    .sort((a, b) =>
      (b.match || 0) - (a.match || 0) ||
      rankOf(a.site_id) - rankOf(b.site_id) ||
      b.score - a.score ||
      a.title.localeCompare(b.title)
    )
    .slice(0, total);
  // §24/25 fallback model: one content card with ordered sources[].
  const grouped: ContentItem[] = groupByContent(results, group);
  // Register exact identities so Watch can resolve result_id without re-search.
  registerResults(results);
  // §44 debug trace (dev only, never log playback URLs).
  let debug: DebugRow[] | undefined;
  if (opts.debug) {
    debug = results.map((r, i) => ({
      raw_title: String(r.title).slice(0, 120),
      normalized: String(r.content_id || "").slice(0, 120),
      content_id: String(r.content_id || ""),
      result_id: String(r.result_id || ""),
      source: String(r.source || r.site_name),
      match: r.match || 0,
      dedup: `site|content collapse kept best match`,
      rank: i + 1,
    }));
  }
  const val: any = { status: "ok", results, grouped, site_count: sites.length, available_sites: available, per_site: perSite };
  if (debug) val.debug = debug;
  // Cache stores the full payload (registry re-populated on cache hit too).
  cache.set(ck, { expires: Date.now() + ttl, value: val });
  try { registerResults((val.results || []) as SiteResult[]); } catch {}
  return val;
}

// --- Exact-version expansion ---------------------------------------------
// Vegamovies-style content pages list the SAME movie once per quality
// (480p / 720p / 1080p Download Now blocks). Search only returns the single
// content page, so exact mode fetches it and fans out one row per quality —
// the app then shows one button per quality, exactly like the site.

const VARIANT_HOSTS = /nexdrive|genxfm|vcloud|fastdl|dl\.php|gdtot|dropgalaxy|filepress|hubdrive|megaop/i;
const QUALITY_RE = /\b(2160p|1080p|720p|480p|360p|4K)\b/i;

function parseQuality(t: string): string {
  const m = String(t || "").match(QUALITY_RE);
  return m ? m[1].toUpperCase() : "";
}

/** Nearest descriptive text for a variant anchor. Vega-style pages put each
    quality in its own block: <h5>Title 480p …</h5> then
    <p><a><button>Download Now</button></a></p> — so climb to the wrapping
    paragraph first, then read the heading above it. Bounded so page chrome
    never leaks in. */
function nearbyVariantTitle($: any, el: any): string {
  const e = $(el);
  const wrap = e.closest("p");
  if (wrap.length) {
    const prev = clean(wrap.prevAll("h1,h2,h3,h4,h5,p").first().text());
    if (prev.length >= 10) return prev.slice(0, 200);
  }
  const prev = clean(e.prevAll("h1,h2,h3,h4,h5,p").first().text());
  if (prev.length >= 10) return prev.slice(0, 200);
  const par = clean(e.parent().text());
  if (par.length >= 10 && par.length <= 300) return par.slice(0, 200);
  const head = clean(e.closest("article,section,div").find("h1,h2,h3,h4,h5").first().text());
  if (head.length >= 10) return head.slice(0, 200);
  return "";
}

export async function expandOne(
  base: SiteResult,
  query: { title: string; year?: string; type?: string; season?: number }
): Promise<SiteResult[]> {
  let html: string;
  try {
    const r = await axios.get(base.url, {
      timeout: 12000,
      headers: { "User-Agent": process.env.SITE_USER_AGENT || "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
      maxRedirects: 5,
      validateStatus: () => true,
    });
    if (r.status >= 400 || typeof r.data !== "string") return [];
    html = r.data;
  } catch { return []; }
  const $ = cheerio.load(html);
  const out: SiteResult[] = [];
  const seenUrl = new Set<string>();
  const seenQ = new Set<string>();
  $("a[href]").each((_, el) => {
    const raw = $(el).attr("href") || "";
    if (!VARIANT_HOSTS.test(raw)) return;
    let abs = "";
    try { abs = new URL(raw, base.url).toString(); } catch { return; }
    if (seenUrl.has(abs)) return;
    seenUrl.add(abs);
    const vt = nearbyVariantTitle($, el);
    const quality = parseQuality(vt) || parseQuality(base.title);
    const title = vt.length >= 10 ? vt : `${base.title} ${quality}`.trim();
    const meta = parseMeta(title);
    const year = meta.year || base.year || "";
    const type = String(base.type || base.kind || "movie");
    if (!isExactVersion(title, year, type, query)) return;
    if (quality && seenQ.has(quality)) return;
    if (quality) seenQ.add(quality);
    const rid = resultId(base.site_id, abs);
    const cid = contentId(type, title, year || undefined, meta.season, meta.episode);
    out.push({
      ...base,
      title, url: abs, source_url: abs,
      year, result_id: rid, source_result_id: rid, content_id: cid,
      quality: quality || "HD",
    });
  });
  return out;
}

/**
 * Exact mode fan-out: for each exact-matched content page (cap: first 3),
 * fetch the page and emit one row per quality variant. Returns expanded rows
 * (registered for resolve); falls back to the base rows when no page yields
 * variants (unparseable layout — still playable via generic resolution).
 */
export async function expandExactVariants(
  rows: SiteResult[],
  query: { title: string; year?: string; type?: string; season?: number }
): Promise<{ rows: SiteResult[]; expanded: boolean }> {
  const limit = Math.max(1, Math.min(3, parseInt(process.env.EXACT_EXPAND_LIMIT || "3", 10)));
  const settled = await Promise.all(rows.slice(0, limit).map((b) => expandOne(b, query)));
  const flat = settled.flat();
  // Dedupe identical variant URLs, keep first per quality.
  const byUrl = new Map<string, SiteResult>();
  for (const r of flat) {
    if (!byUrl.has(r.url)) byUrl.set(r.url, r);
  }
  const expanded = [...byUrl.values()].sort((a, b) =>
    (b.match || 0) - (a.match || 0) ||
    (b.score || 0) - (a.score || 0) ||
    a.title.localeCompare(b.title)
  );
  if (!expanded.length) return { rows, expanded: false };
  registerResults(expanded);
  return { rows: expanded, expanded: true };
}
