const BASE = (import.meta.env.VITE_API || "http://localhost:3001").replace(/\/$/, "");

export interface MediaItem {
  id: string;
  kind: "movie" | "tv" | "anime";
  title: string;
  poster: string;
  year: string;
  rating: number | null;
  overview: string;
}

export const API_BASE = BASE;

// Deployment capabilities, learned once from /health. A LITE backend has no
// stream proxy and no HLS engine — the player must use direct URLs only
// (the proxy route answers 501 there, so routing video through it = dead
// playback). Fire-and-forget at import; /health is sub-second and every
// playback path runs seconds after boot.
let caps = { lite: false };
export function isLite() { return caps.lite; }
export function loadCaps() {
  return fetch(`${BASE}/health`, { signal: AbortSignal.timeout(90000) })
    .then((r) => (r.ok ? r.json() : null))
    .then((h) => { if (h && typeof h.lite === "boolean") caps = { lite: h.lite }; })
    .catch(() => {});
}
loadCaps();

// Session cache: content loads once per app open, then served from memory
// until the app process dies. Dynamic endpoints are never cached.
const sessionCache = new Map<string, any>();
const NO_CACHE = ["/api/resolve", "/api/stream", "/health"];

async function j<T>(path: string, init?: RequestInit, timeoutMs = 60000): Promise<T> {
  const method = (init?.method || "GET").toUpperCase();
  const cacheable = method === "GET" && !NO_CACHE.some((p) => path.startsWith(p));
  if (cacheable && sessionCache.has(path)) return sessionCache.get(path) as T;
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), timeoutMs);
  try {
    const r = await fetch(`${BASE}${path}`, { ...init, signal: ctl.signal });
    if (!r.ok) {
      const txt = await r.text().catch(() => "");
      throw new Error(`API ${r.status}: ${txt.slice(0, 200)}`);
    }
    const data = (await r.json()) as T;
    if (cacheable) sessionCache.set(path, data);
    return data;
  } catch (e: any) {
    if (e?.name === "AbortError") throw new Error(`Request timed out reaching backend (${BASE})`);
    throw e instanceof Error ? e : new Error(String(e));
  } finally {
    clearTimeout(t);
  }
}

export async function checkBackend(timeoutMs = 8000): Promise<boolean> {
  try {
    await j<{ ok: boolean }>(`/health`, undefined, timeoutMs);
    return true;
  } catch {
    return false;
  }
}

// Backend identity (build tag) — tells us which server code the app hits.
// 90s default: the free Render instance sleeps after ~15 min idle and takes
// ~50-60s to wake — an 8s budget made every cold open look "unreachable".
// `error` carries the raw fetch failure (TLS, DNS, CORS, timeout…) so the
// UI can show the real cause instead of a generic "unreachable".
export async function backendInfo(timeoutMs = 90000): Promise<{ ok: boolean; build: string; error: string }> {
  try {
    const r = await j<{ ok: boolean; build?: string }>(`/health`, undefined, timeoutMs);
    return { ok: !!r.ok, build: String((r as any)?.build || "?"), error: "" };
  } catch (e: any) {
    return { ok: false, build: "?", error: String(e?.message || e).slice(0, 300) };
  }
}

export const CAT_SITES: Record<string, number[] | undefined> = {
  hollywood: [1],
  bollywood: [2],
  movies: [4, 1, 2],
  series: [4, 1, 2],
  anime: [5, 3],
};

export type SitePriority = "movie" | "anime" | "";

export interface WatchIdentity {
  result_id?: string;
  content_id?: string;
  sourceUrl?: string;
}

/** Fire-and-forget pre-warm: hovering a version button starts resolution early
    so the tap often hits a ready/in-flight job. Server dedupes (one job per
    URL), so repeated hovers are free. */
const warmed = new Set<string>();
export function prewarm(r: { result_id?: string; url?: string; source_url?: string }) {
  const key = r.result_id || r.url || (r as any).source_url || "";
  if (!key || warmed.has(key)) return;
  warmed.add(key);
  try {
    if (r.result_id) api.resolveById(r.result_id).catch(() => {});
    else {
      const u = r.url || (r as any).source_url || "";
      if (u) api.resolve(u).catch(() => {});
    }
  } catch {}
  // Allow re-warm after 10min (fresh hover = fresh intent).
  setTimeout(() => warmed.delete(key), 600000);
}

/** Build a Watch URL that carries exact identity (§16/17). Never title-only. */
export function watchUrl(kind: string, id: string, r: { result_id?: string; content_id?: string; url?: string; source_url?: string; title?: string }, extra = "") {
  const rid = r.result_id || "";
  const cid = r.content_id || "";
  const src = r.url || (r as any).source_url || "";
  const t = r.title || "";
  // Preferred source first; alternates (same content, other sources — with
  // titles so Watch can offer a quality picker) follow as `alts` (§26).
  const alts = (r as any)._alts as { result_id: string; url: string; title?: string }[] | undefined;
  const altParam = alts?.length ? `&alts=${encodeURIComponent(JSON.stringify(alts.slice(0, 5).map((a) => ({ result_id: a.result_id, url: a.url, title: (a.title || "").slice(0, 120) }))))}` : "";
  return `/watch/${kind}/${id}?result_id=${encodeURIComponent(rid)}&content_id=${encodeURIComponent(cid)}&src=${encodeURIComponent(src)}&t=${encodeURIComponent(t)}${altParam}${extra}`;
}

export const api = {
  home: (tab: string) => j<any>(`/api/home?tab=${encodeURIComponent(tab)}`),
  browse: (cat: string) => j<any>(`/api/browse/${encodeURIComponent(cat)}`),
  /** Titles on the way (movie | tv | anime) — powers the /upcoming pages. */
  upcoming: (type: string) => j<any>(`/api/upcoming?type=${encodeURIComponent(type)}`),
  search: (q: string) => j<any>(`/api/search?q=${encodeURIComponent(q)}`),
  detail: (kind: string, id: string) => j<any>(`/api/detail/${kind}/${id}`),
  tvSeason: (id: string, n: number) => j<any>(`/api/tv/${id}/season/${n}`),
  siteSearch: (q: string, opts?: { sites?: number[]; priority?: SitePriority; year?: string; type?: string; exact?: boolean }) =>
    j<any>(`/api/site-search?q=${encodeURIComponent(q)}${opts?.sites?.length ? `&sites=${opts.sites.join(",")}` : ""}${opts?.priority ? `&priority=${opts.priority}` : ""}${opts?.year ? `&year=${encodeURIComponent(opts.year)}` : ""}${opts?.type ? `&type=${encodeURIComponent(opts.type)}` : ""}${opts?.exact ? `&exact=1` : ""}`),
  /** Exact-identity lookup for the clicked card (no re-search, §48). */
  lookupResult: (resultId: string) => j<any>(`/api/result/${encodeURIComponent(resultId)}`),
  /** Per-quality variants of one registered content page (series seasons). */
  variants: (result_id: string, q: { title?: string; year?: string; type?: string; season?: number }) =>
    j<any>(`/api/variants?result_id=${encodeURIComponent(result_id)}${q.title ? `&title=${encodeURIComponent(q.title)}` : ""}${q.year ? `&year=${encodeURIComponent(q.year)}` : ""}${q.type ? `&type=${encodeURIComponent(q.type)}` : ""}${q.season !== undefined ? `&season=${q.season}` : ""}`),
  // Cache-first: may return {status:"ready",url} immediately (no polling).
  // Optional {season, episode}: whole-series pages resolved for one episode
  // (ignored by sources without episode-scoped playback).
  resolve: (sourceUrl: string, episode?: { season?: number; episode?: number }) =>
    j<{ jobId: string; status: string; url?: string; stage?: string; embed?: boolean }>(`/api/resolve`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sourceUrl, season: episode?.season, episode: episode?.episode }),
    }),
  /** §16 preferred path: resolve THAT specific source result by result_id. */
  resolveById: (result_id: string, content_id?: string, episode?: { season?: number; episode?: number }) =>
    j<{ jobId: string; status: string; url?: string; stage?: string; embed?: boolean }>(`/api/resolve`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ result_id, content_id, season: episode?.season, episode: episode?.episode }),
    }),
  /** Seekable upgrade: re-resolve past the fast lanes to a Range-capable
      link, in background. Overwrites the cache entry when ready. */
  resolveUpgrade: (sourceUrl: string) =>
    j<{ jobId: string; status: string; url?: string; stage?: string; seekable?: boolean }>(`/api/resolve`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sourceUrl, seekableUpgrade: true }),
    }),
  job: (id: string) => j<any>(`/api/resolve/${id}`),
  metrics: () => j<any>(`/api/metrics`),
  streamUrl: (mediaUrl: string) => `${BASE}/api/stream?url=${encodeURIComponent(mediaUrl)}`,
  hlsStatus: (mediaUrl: string) => j<any>(`/api/hls-status?url=${encodeURIComponent(mediaUrl)}`),
  hlsFile: (masterPath: string) => `${BASE}${masterPath}`,
};

// Episode-scoped version finder (§28): all scope queries fire in PARALLEL.
// The most specific query wins, but the picked result MUST match the
// requested season/episode (via content_id :s{S}e{E} or title tags) — never
// a generic title match that would resolve the wrong episode (§48).
export async function findVersion(title: string, s: number, e: number, sites?: number[], priority: SitePriority = "movie") {
  const pad = (n: number) => String(n).padStart(2, "0");
  const queries = [
    `${title} S${pad(s)}E${pad(e)}`,
    `${title} season ${s} episode ${e}`,
    `${title} season ${s}`,
    title,
  ];
  const settled = await Promise.allSettled(queries.map((q) => api.siteSearch(q, { sites, priority })));
  const matchesSE = (r: any) => {
    const cid = String(r?.content_id || "");
    if (cid.includes(`:s${s}e${e}`) || cid.includes(`:s${s}`)) return true;
    const t = String(r?.title || "").toLowerCase();
    if (new RegExp(`\\bs0*${s}e0*${e}\\b`).test(t)) return true;
    if (t.includes(`season ${s}`) && (e == null || t.includes(`episode ${e}`))) return true;
    if (t.includes(`season ${s}`)) return true;
    return false;
  };
  // Pass 1: exact S/E match from the most specific query first.
  for (let i = 0; i < settled.length; i++) {
    const r = settled[i];
    if (r.status !== "fulfilled" || (r.value as any)?.status !== "ok") continue;
    const list = (r.value as any).results || [];
    const exact = list.find(matchesSE);
    if (exact) return { result: exact, query: queries[i] };
    // Only the most specific query may fall back to its top result when no
    // S/E tags exist at all (e.g. anime absolute numbering); broader queries
    // must not resolve a generic title as the episode.
    if (i === 0 && list.length) return { result: list[0], query: queries[i] };
  }
  // Pass 2 (last resort): whole-series pages that carry every episode on one
  // URL (Cinegram /tv/ pages) are valid episode sources even though their
  // titles never carry S/E tags — the resolver selects the requested episode
  // at playback time. Exact S/E matches above always win.
  const isFullSeriesPage = (r: any) => {
    try {
      const u = new URL(String(r?.url || r?.source_url || ""));
      return /(^|\.)cinegram\.tv$/i.test(u.hostname) && /^\/tv\//i.test(u.pathname);
    } catch { return false; }
  };
  for (const r of settled) {
    if (r.status !== "fulfilled" || (r.value as any)?.status !== "ok") continue;
    const list = (r.value as any).results || [];
    const full = list.find(isFullSeriesPage);
    if (full) return { result: full, query: title };
  }
  return null;
}
