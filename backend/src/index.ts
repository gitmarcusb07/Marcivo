import "dotenv/config";
import * as dns from "node:dns";
// api.themoviedb.org's IPv6 path is broken on some networks (ECONNRESET
// while IPv4 works fine). Prefer IPv4 process-wide so TMDB/AniList/site
// fetches don't die on the dead v6 path and classification keeps working.
try { dns.setDefaultResultOrder("ipv4first"); } catch {}
import express from "express";
import cors from "cors";
import { tmdbHome, tmdbSearch, tmdbDetail, tmdbShowcase, tmdbBrowse, tmdbSeason, tmdbUpcoming, tmdbDiscoverIds, BrowseCat } from "./tmdb.js";
import { anilistHome, anilistSearch, anilistDetail, anilistUpcoming } from "./anilist.js";
import { searchSites, lookupResult, expandExactVariants, expandOne, registerResults } from "./siteSearch.js";
import {
  normalizeQuery, classify, groupForClass, groupForPriority, groupSiteIds,
  originOf, exclusiveSiteId, providerSiteIds, isExactVersion, isCatalogExact,
  sourceNameFor, logSearch, ContentGroup,
} from "./identity.js";
import { enqueueResolve, getJob, preResolve, getMetrics } from "./resolver.js";
import { streamProxy } from "./stream.js";
import { HLSManager } from "./hls.js";
import { LITE } from "./lite.js";
import * as fs from "fs";
import * as path from "path";
const SEO_SITE_URL = "https://marcivo.teraplayer.in";

const hls = new HLSManager({
  cacheDir: process.env.HLS_CACHE_DIR || "./HLS_CACHE",
  segmentTime: parseInt(process.env.HLS_SEGMENT_TIME || "4", 10),
  sessionTtl: parseInt(process.env.HLS_SESSION_TTL || "21600", 10),
  maxJobs: parseInt(process.env.HLS_MAX_CONCURRENT_JOBS || "1", 10),
  convertTimeout: parseInt(process.env.HLS_CONVERT_TIMEOUT || "7200", 10),
  progressive: (process.env.HLS_PROGRESSIVE || "true").toLowerCase() !== "false",
});
// LITE: no ffmpeg on the free tier — skip the sweeper entirely.
if (!LITE) {
  hls.startup();
  process.on("SIGINT", () => hls.shutdown());
  process.on("SIGTERM", () => hls.shutdown());
}

const app = express();
app.use(cors({ origin: (process.env.FRONTEND_ORIGIN || "*") === "*" ? "*" : (process.env.FRONTEND_ORIGIN || "").split(",") }));
app.use(express.json({ limit: "256kb" }));

const BUILD = "2026-10-19-seo2";

app.get("/health", (_req, res) => res.json({ ok: true, time: new Date().toISOString(), build: BUILD, lite: LITE }));

async function generateSitemapXml(): Promise<string> {
  try {
    const urls = new Set<string>([
      `${SEO_SITE_URL}/`,
      `${SEO_SITE_URL}/free-movies`,
      `${SEO_SITE_URL}/download-movies`,
      `${SEO_SITE_URL}/watch-free`,
      `${SEO_SITE_URL}/upcoming`,
      `${SEO_SITE_URL}/upcoming/shows`,
      `${SEO_SITE_URL}/upcoming/anime`,
      `${SEO_SITE_URL}/category/movies`,
      `${SEO_SITE_URL}/category/series`,
      `${SEO_SITE_URL}/category/hollywood`,
      `${SEO_SITE_URL}/category/bollywood`,
      `${SEO_SITE_URL}/blog`,
      `${SEO_SITE_URL}/blog/isro-nvs-03-launch-gslv-f18-navic-success`,
      `${SEO_SITE_URL}/blog/pubg-netflix-live-action-series-donald-glover`,
      `${SEO_SITE_URL}/blog/eetha-trailer-shraddha-kapoor-vithabai-december-4`,
      `${SEO_SITE_URL}/blog/new-ott-releases-this-weekend-october-30-2026`,
      `${SEO_SITE_URL}/blog/patrick-stewart-dies-86-star-trek-picard-xmen-professor-x`,
      `${SEO_SITE_URL}/blog/watch-terabox-video-online-without-app`,
      `${SEO_SITE_URL}/blog/elder-scrolls-vi-sentinel-reported-title-hammerfell-november`,
      `${SEO_SITE_URL}/blog/cyclone-arnab-odisha-floods-october-30-2026`,
    ]);

    // Fetch real catalog titles from TMDB.
    const categories: BrowseCat[] = [
      "movies",
      "series",
      "hollywood",
      "bollywood",
    ];

    const results = await Promise.allSettled(
      categories.map((category) => tmdbBrowse(category))
    );

    for (const result of results) {
      if (result.status !== "fulfilled") continue;

      for (const row of result.value.rows) {
        for (const item of row.items) {
          if (!item.id || !["movie", "tv"].includes(item.kind)) continue;

          urls.add(
            `${SEO_SITE_URL}/detail/${item.kind}/${encodeURIComponent(item.id)}`
          );
        }
      }
    }

    // Deeper coverage: pages of most-popular titles beyond the browse rows,
    // so more detail pages are discoverable (the Set above dedupes).
    const [popMovie, popTv] = await Promise.allSettled([
      tmdbDiscoverIds("movie", [1, 2, 3, 4, 5, 6]),
      tmdbDiscoverIds("tv", [1, 2, 3, 4, 5, 6]),
    ]);
    if (popMovie.status === "fulfilled") {
      for (const id of popMovie.value) urls.add(`${SEO_SITE_URL}/detail/movie/${encodeURIComponent(id)}`);
    }
    if (popTv.status === "fulfilled") {
      for (const id of popTv.value) urls.add(`${SEO_SITE_URL}/detail/tv/${encodeURIComponent(id)}`);
    }

    // Extra detail-page coverage: titles that are on the way (their pages rank
    // the moment they release) and the anime catalogue (TMDB browse has none).
    const addItems = (items: any[], fallbackKind?: string) => {
      for (const item of items || []) {
        const kind = fallbackKind || String(item?.kind || "");
        const id = String(item?.id || "");
        if (!id || !["movie", "tv", "anime"].includes(kind)) continue;
        urls.add(`${SEO_SITE_URL}/detail/${kind}/${encodeURIComponent(id)}`);
      }
    };
    const [upMov, upTv, upAnime, animeHome, home] = await Promise.allSettled([
      tmdbUpcoming("movie"),
      tmdbUpcoming("tv"),
      anilistUpcoming(),
      anilistHome(),
      tmdbHome(),
    ]);
    if (upMov.status === "fulfilled") addItems(upMov.value);
    if (upTv.status === "fulfilled") addItems(upTv.value);
    if (upAnime.status === "fulfilled") addItems(upAnime.value);
    if (animeHome.status === "fulfilled") {
      addItems(animeHome.value.top);
      addItems(animeHome.value.seasonal);
    }
    if (home.status === "fulfilled") {
      addItems(home.value.trending);
      addItems(home.value.moviesPopular);
      addItems(home.value.seriesPopular);
      addItems(home.value.moviesTop);
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...urls]
  .map(
    (url) =>
      `  <url><loc>${url}</loc></url>`
  )
  .join("\n")}
</urlset>`;

    return xml;
  } catch (error) {
    console.error("[SEO] Sitemap generation failed:", error);
    throw error;
  }
}

// Sitemap cache: the full generation makes many TMDB/AniList calls and the
// free Render instance cold-starts slowly, so a fresh generation routinely
// exceeded the Cloudflare Worker's 10s sitemap timeout and Google only ever
// saw the 11-URL fallback. Serve the last good sitemap immediately and
// refresh it in the background instead of blocking crawlers on generation.
let sitemapCache: string | null = null;
let sitemapCacheAt = 0;
let sitemapGenerating = false;
const SITEMAP_TTL_MS = 6 * 60 * 60 * 1000;
function refreshSitemapInBackground() {
  if (sitemapGenerating) return;
  sitemapGenerating = true;
  generateSitemapXml()
    .then((xml) => { sitemapCache = xml; sitemapCacheAt = Date.now(); })
    .catch((e) => console.error("[SEO] Background sitemap refresh failed:", e))
    .finally(() => { sitemapGenerating = false; });
}
// Warm the cache at startup so the first crawler request after a cold start
// does not have to wait for a full generation.
refreshSitemapInBackground();

app.get("/sitemap.xml", async (_req, res) => {
  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  if (sitemapCache) {
    // Serve stale immediately; refresh in background if older than TTL.
    if (Date.now() - sitemapCacheAt > SITEMAP_TTL_MS) refreshSitemapInBackground();
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.send(sitemapCache);
    return;
  }
  if (sitemapGenerating) {
    // Generation is already running (startup warm-up); do not start a
    // second one and do not 500 — the core list is valid, if incomplete.
    res.setHeader("Cache-Control", "public, max-age=60");
    res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${["/", "/free-movies", "/download-movies", "/watch-free", "/upcoming", "/upcoming/shows", "/upcoming/anime", "/category/movies", "/category/series", "/category/hollywood", "/category/bollywood"].map((p) => `  <url><loc>${SEO_SITE_URL}${p}</loc></url>`).join("\n")}
</urlset>`);
    return;
  }
  try {
    const xml = await generateSitemapXml();
    sitemapCache = xml; sitemapCacheAt = Date.now();
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.send(xml);
  } catch {
    res.status(500).type("text/plain").send("Could not generate sitemap");
  }
});


app.get("/api/health/sites", async (_req, res) => {
  const r = await searchSites("test").catch((e) => ({ status: "error", error: String(e).slice(0, 200) }));
  res.json(r);
});

app.get("/api/home", async (req, res) => {
  try {
    const tab = String(req.query.tab || "mixed");
    if (tab === "anime") {
      const a = await anilistHome();
      return res.json({ tab, anime: a });
    }
    if (tab === "movies") {
      const [m, showcase] = await Promise.all([
        tmdbHome(),
        tmdbShowcase().catch(() => ({ trendingWeek: [], popular2026: [], newReleases: [] })),
      ]);
      return res.json({ tab, tmdb: m, showcase });
    }
    const [m, a] = await Promise.all([
      tmdbHome().catch((e) => ({ trending: [], moviesPopular: [], seriesPopular: [], moviesTop: [], _error: String(e?.message || e).slice(0, 160) })),
      anilistHome().catch(() => ({ top: [], seasonal: [] })),
    ]);
    res.json({ tab: "mixed", tmdb: m, anime: a });
  } catch (e: any) {
    res.status(500).json({ error: String(e?.message || e).slice(0, 300) });
  }
});

// Titles on the way — powers the /upcoming, /upcoming/shows and
// /upcoming/anime SEO pages (and their sitemap entries).
app.get("/api/upcoming", async (req, res) => {
  const type = String(req.query.type || "movie").toLowerCase();
  try {
    if (type === "anime") return res.json({ type, items: await anilistUpcoming() });
    if (type === "tv" || type === "series") return res.json({ type: "tv", items: await tmdbUpcoming("tv") });
    if (type === "movie") return res.json({ type: "movie", items: await tmdbUpcoming("movie") });
    res.status(400).json({ error: "type must be movie|tv|anime" });
  } catch (e: any) {
    res.status(500).json({ type, items: [], error: String(e?.message || e).slice(0, 300) });
  }
});

app.get("/api/search", async (req, res) => {
  const q = String(req.query.q || "").trim();
  if (!q) return res.json({ results: [] });
  const debug = String(req.query.debug || "") === "1";
  try {
    // Phase 1: metadata (TMDB movie/series + AniList anime) doubles as the
    // classifier — zero extra API cost. Phase 2 searches only the matching
    // source group (anime → PirateXPlay/Gokuhd, else PRMovies/Vega/Rog).
    const nq = normalizeQuery(q);
    const [tmdb, anime] = await Promise.all([
      tmdbSearch(q).catch(() => []),
      anilistSearch(q).catch(() => []),
    ]);
    const cls = classify(nq, tmdb, anime);
    const group: ContentGroup = groupForClass(cls);
    // Provider routing: the default exclusive mode pins EVERY movie/series
    // query to the single configured provider site — origin routing
    // (Hollywood→Vegamovies) and shared group pools are bypassed. Anime
    // keeps its own pool. (EXCLUSIVE_SITE=0 restores legacy routing.)
    const origin = cls === "anime" ? "" : originOf(tmdb);
    const siteIds = providerSiteIds(group, origin as any);
    const sites = await searchSites(q, siteIds, undefined, { group, debug })
      .catch(() => ({ status: "unavailable", results: [] }));
    const list = (sites as any)?.results || [];
    const grouped = (sites as any)?.grouped || [];
    try { if ((sites as any)?.status === "ok") preResolve(list.map((r: any) => r.url)); } catch {}
    logSearch(q, nq, cls, group, ((sites as any)?.per_site || []), list.length, grouped.length || list.length,
      (grouped.length ? grouped : list).map((r: any) => `${r.title || ""}`.slice(0, 60)));
    const exId = exclusiveSiteId();
    const out: any = {
      query: q, tmdb, anime, sites: list, grouped,
      siteStatus: (sites as any)?.status || "unavailable", classification: cls, group,
      provider: exId ? sourceNameFor(exId) : "",
      // Specific failure reason when the provider is unreachable (HTTP
      // status / Cloudflare block / timeout) — never a generic message.
      providerError: String((sites as any)?.error || ""),
    };
    if (debug && (sites as any)?.debug) out.debug = (sites as any).debug;
    res.json(out);
  } catch (e: any) {
    res.status(500).json({ error: String(e?.message || e).slice(0, 300) });
  }
});

app.get("/api/detail/:kind/:id", async (req, res) => {
  const { kind, id } = req.params;
  try {
    if (kind === "anime") return res.json(await anilistDetail(id));
    if (kind === "movie" || kind === "tv") return res.json(await tmdbDetail(kind, id));
    res.status(400).json({ error: "kind must be movie|tv|anime" });
  } catch (e: any) {
    res.status(500).json({ error: String(e?.message || e).slice(0, 300) });
  }
});

app.get("/api/tv/:id/season/:n", async (req, res) => {
  try {
    res.json(await tmdbSeason(req.params.id, parseInt(req.params.n, 10)));
  } catch (e: any) {
    res.status(500).json({ error: String(e?.message || e).slice(0, 300) });
  }
});

app.get("/api/browse/:cat", async (req, res) => {
  const cat = String(req.params.cat || "") as BrowseCat;
  if (!["movies", "series", "hollywood", "bollywood"].includes(cat)) {
    return res.status(400).json({ error: "cat must be movies|series|hollywood|bollywood" });
  }
  try {
    res.json(await tmdbBrowse(cat));
  } catch (e: any) {
    res.status(500).json({ error: String(e?.message || e).slice(0, 300) });
  }
});

app.get("/api/site-search", async (req, res) => {
  const q = String(req.query.q || "").trim();
  if (!q) return res.json({ status: "empty", results: [] });
  const debug = String(req.query.debug || "") === "1";
  // Explicit site filter (e.g. Hollywood->[4,1]) wins in legacy mode;
  // otherwise the content-group pool applies: anime → PirateXPlay/Gokuhd
  // only, movie → PRMovies/Vega/Rog only. In the default exclusive-provider
  // mode every non-anime query is pinned to the single provider site, so
  // caller-supplied pools can never route the default flow elsewhere.
  let sites = String(req.query.sites || "").split(",").map((s) => parseInt(s.trim(), 10)).filter((n) => n >= 1 && n <= 8);
  const group = groupForPriority(String(req.query.priority || ""));
  if (!sites.length && group) sites = groupSiteIds(group);
  const exSite = exclusiveSiteId();
  if (exSite && group !== "anime") sites = [exSite];
  try {
    let val: any = await searchSites(q, sites.length ? sites : undefined, undefined, group ? { group, debug } : { debug });
    // Exact mode (detail page): the app knows the clicked title+year+kind
    // from TMDB/AniList — keep ONLY versions of that exact movie. Similar
    // names, other years, and other titles are dropped. Exact filtering runs
    // on COPIES: the shared cached payload must never be narrowed, or every
    // later search for the same query would come back empty.
    const exact = String(req.query.exact || "") === "1";
    const exactYear = String(req.query.year || "").trim();
    const exactType = String(req.query.type || "").trim().toLowerCase();
    const copyOf = (src: any) => ({ ...src, results: [...(src?.results || [])], grouped: [...(src?.grouped || [])] });
    if (val?.status === "ok" && exact) {
      const runExact = async (searchQ: string) => {
        const rawV: any = searchQ === q ? val : await searchSites(searchQ, sites.length ? sites : undefined, undefined, group ? { group, debug } : { debug });
        if (rawV?.status !== "ok") return rawV;
        const v: any = copyOf(rawV);
        const raw = (v.results || []).length;
        const kept = (v.results || []).filter((r: any) =>
          isExactVersion(String(r.title || ""), String(r.year || ""), String(r.type || r.kind || ""), { title: q, year: exactYear || undefined, type: exactType || undefined })
          // Catalog sources (the exclusive provider) title pages plainly
          // ("Inception online free") — no year tag, so the year gate above
          // would drop every row. Its own rows compare stripped titles.
          || (exSite && r.site_id === exSite && isCatalogExact(String(r.title || ""), q))
        );
        // Fan out: one button per quality variant on the content page(s),
        // exactly like the site lists them. Falls back to base rows when the
        // page layout yields nothing (still playable).
        let rows = kept;
        let expanded = false;
        try {
          const ex = await expandExactVariants(kept, { title: q, year: exactYear || undefined, type: exactType || undefined });
          if (ex.expanded) {
            rows = ex.rows;
            try { registerResults(ex.rows as any); } catch {}
            expanded = true;
          }
        } catch {}
        v.results = rows;
        const keep = new Set(rows.map((r: any) => r.content_id));
        v.grouped = (v.grouped || []).filter((g: any) => keep.has(g.content_id));
        (v as any)._exact = { before: raw, expanded };
        return v;
      };
      let out: any = await runExact(q);
      // Recall retry: the site's own search can miss long titles — retry once
      // with a shortened query ("Name: Subtitle" → "Name"), still filtered
      // against the FULL title so precision never drops.
      let searched = q;
      if (!(out.results || []).length) {
        const short = q.split(/[:–—\-|(]/)[0].trim().split(/\s+/).slice(0, 4).join(" ");
        if (short && short.toLowerCase() !== q.toLowerCase()) {
          const retry: any = await runExact(short).catch(() => null);
          if (retry && (retry.results || []).length) {
            out = retry;
            searched = short;
            try { registerResults((out.results || []) as any); } catch {}
          }
        }
      }
      const usedIds = sites.length ? sites : [];
      // Respond with a merged COPY — never write narrowed rows back into the
      // shared cached payload (that empties later searches for this query).
      val = copyOf(out);
      val.exact = {
        title: q, year: exactYear, type: exactType,
        before: (out as any)._exact?.before ?? (val.results || []).length,
        after: (val.results || []).length,
        expanded: !!(out as any)._exact?.expanded,
        searched,
        sites: usedIds.map((id) => sourceNameFor(id)),
      };
      delete (val as any)._exact;
      delete (out as any)._exact;
    }
    // Background pre-resolution (never blocks search): top results start
    // resolving now so Watch can hit the temporary cache later.
    try { if (val?.status === "ok") preResolve((val.results || []).map((r: any) => r.url)); } catch {}
    if (val?.status === "ok") {
      logSearch(q, normalizeQuery(q), group === "anime" ? "anime" : group === "movie" ? "movie" : "unknown",
        group || "unknown", val.per_site || [], (val.results || []).length, ((val.grouped || []).length || (val.results || []).length),
        ((val.grouped || val.results || []) as any[]).map((r: any) => `${r.title || ""}`.slice(0, 60)));
    }
    // Name the sole provider (default flow) so the app can show clear
    // empty/failure messages instead of silently switching sources.
    if (exSite && val && typeof val === "object" && !(val as any).provider) (val as any).provider = sourceNameFor(exSite);
    res.json(val);
  } catch (e: any) {
    res.status(500).json({ status: "error", error: String(e?.message || e).slice(0, 300) });
  }
});

// Episode quality fan-out: expand one registered content page into its
// per-quality variants (480p/720p/1080p), validated against the series
// title + season — never another season or show.
app.get("/api/variants", async (req, res) => {
  const rid = String(req.query.result_id || "");
  const hit = lookupResult(rid);
  if (!hit) return res.status(404).json({ error: "result not found/expired — re-run search" });
  const seasonRaw = String(req.query.season || "");
  const season = /^\d{1,2}$/.test(seasonRaw) ? parseInt(seasonRaw, 10) : undefined;
  const q = {
    title: String(req.query.title || hit.title),
    year: String(req.query.year || "") || undefined,
    type: String(req.query.type || hit.type || ""),
    season,
  };
  const base: any = {
    title: hit.title, url: hit.url, source_url: hit.url, score: 0, match: 0,
    site_id: hit.site_id, site_name: hit.site_name, kind: hit.type === "series" ? "series" : "movie",
    type: hit.type, content_id: hit.content_id, result_id: hit.result_id,
    source_result_id: hit.result_id, year: hit.year, origin: "mixed",
    source: String(hit.site_name || "").toLowerCase(),
  };
  try {
    const rows = await expandOne(base, q);
    try { registerResults(rows as any); } catch {}
    res.json({ status: "ok", variants: rows });
  } catch (e: any) {
    res.status(500).json({ status: "error", error: String(e?.message || e).slice(0, 200) });
  }
});

// §16/17 exact-identity lookup: frontend resolves the clicked card without a
// fresh generic title search. Returns the registered source page.
app.get("/api/result/:id", (req, res) => {
  const id = String(req.params.id || "");
  const hit = lookupResult(id);
  if (!hit) return res.status(404).json({ error: "result not found/expired — re-run search" });
  res.json({ status: "ok", result: hit });
});

app.post("/api/resolve", (req, res) => {
  // §16/17/48 — Watch must carry identity. Preferred: { result_id } (exact
  // source page from the registry). Legacy: { sourceUrl }. We NEVER perform
  // a fresh generic title search here — that caused wrong-result bugs.
  let sourceUrl = String(req.body?.sourceUrl || "").trim();
  const resultId = String(req.body?.result_id || req.body?.resultId || "").trim();
  let identity: any = null;
  if (resultId) {
    const hit = lookupResult(resultId);
    if (!hit) return res.status(404).json({ error: "result_id not found/expired — re-run search and tap the card again" });
    sourceUrl = hit.url;
    identity = { result_id: hit.result_id, content_id: hit.content_id, source_result_id: hit.result_id };
  }
  if (!sourceUrl.startsWith("http")) return res.status(400).json({ error: "sourceUrl must be http(s) or provide a valid result_id" });
  // Seekable upgrade: re-resolve past the fast HTTP lanes (whose files never
  // honor Range) to a seekable bridge link, in background. Overwrites the
  // cache entry so later taps get it directly.
  const upgrade = !!req.body?.seekableUpgrade;
  // Optional episode scope (whole-series source pages): the resolver picks
  // that exact episode at playback time; ignored by other sources.
  const season = /^\d{1,2}$/.test(String(req.body?.season ?? "")) ? parseInt(String(req.body.season), 10) : undefined;
  const episode = /^\d{1,3}$/.test(String(req.body?.episode ?? "")) ? parseInt(String(req.body.episode), 10) : undefined;
  // Cache-first + deduped: returns {status:"ready",url} immediately on a
  // cache hit, or the shared in-flight job when resolution is running.
  const job = enqueueResolve(sourceUrl, upgrade
    ? { background: true, skipFast: true, fresh: true }
    : { ...(season ? { season } : {}), ...(episode ? { episode } : {}) });
  const out: any = { jobId: job.id, status: job.status, url: job.url || undefined, stage: (job as any).stage || undefined, seekable: (job as any).seekable };
  if ((job as any).embed) out.embed = true;
  if (identity) { out.result_id = identity.result_id; out.content_id = identity.content_id; }
  res.json(out);
});

app.get("/api/resolve/:id", (req, res) => {
  const j = getJob(req.params.id);
  if (!j) return res.status(404).json({ error: "job not found/expired" });
  res.json(j);
});

// Resolution performance metrics (counts + timings only, never URLs).
app.get("/api/metrics", (_req, res) => {
  res.json(getMetrics());
});

// LITE: video bytes never transit the free instance (bandwidth cap) — the
// frontend plays direct URLs instead and treats this 501 as "no proxy here".
app.get("/api/stream", LITE
  ? (_req, res) => res.status(501).json({ error: "stream proxy disabled (lite mode)" })
  : streamProxy);

// Multi-audio HLS: probe + background convert; player polls until ready.
app.get("/api/hls-status", async (req, res) => {
  const media = String(req.query.url || "").trim();
  if (!media.startsWith("http") || media.length > 4096) return res.status(400).json({ status: "invalid", error: "bad url" });
  if (media.toLowerCase().endsWith(".m3u8")) {
    return res.json({ status: "hls", sid: "", audios: [], master: media, error: "" });
  }
  if (LITE || (process.env.HLS_ENABLED || "true").toLowerCase() === "false") {
    return res.json({ status: "disabled", sid: "", audios: [], master: "", error: "" });
  }
  try {
    res.json(await hls.status(media));
  } catch (e: any) {
    res.json({ status: "failed", sid: "", audios: [], master: "", error: String(e?.message || e).slice(0, 200) });
  }
});

app.get("/hls/:sid/:name", (req, res) => {
  const sid = String(req.params.sid || "");
  const name = String(req.params.name || "");
  const dir = hls.sessionDir(sid);
  if (!dir || !hls.allowedFile(name)) return res.status(404).send("Not found.");
  const p = path.resolve(path.join(dir, name));
  if (!p.startsWith(dir + path.sep) && p !== path.join(dir, name)) return res.status(404).send("Not found.");
  if (!fs.existsSync(p)) return res.status(404).send("Not found.");
  try { hls.touch(sid); } catch {}
  if (name.endsWith(".m3u8")) {
    res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
    try {
      if (fs.readFileSync(p, "utf8").includes("#EXT-X-ENDLIST")) res.setHeader("Cache-Control", "public, max-age=3600");
      else res.setHeader("Cache-Control", "no-cache, no-store");
    } catch {}
  } else {
    res.setHeader("Content-Type", "video/MP2T");
    res.setHeader("Cache-Control", "public, max-age=31536000");
  }
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.sendFile(p);
});

const port = parseInt(process.env.PORT || "3001", 10);
app.listen(port, "0.0.0.0", () => {
  console.log(`Marcivo backend on 0.0.0.0:${port}`);
});
