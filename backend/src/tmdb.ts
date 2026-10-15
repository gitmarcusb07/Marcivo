import { getJson, withParams } from "./http.js";

const BASE = (process.env.TMDB_BASE || "https://api.themoviedb.org/3").replace(/\/$/, "");
const IMG = (process.env.TMDB_IMAGE || "https://image.tmdb.org/t/p/w500").replace(/\/$/, "");
const BACKDROP = "https://image.tmdb.org/t/p/w1280";

function key() {
  return process.env.TMDB_API_KEY || "";
}

export interface MediaItem {
  id: string;
  kind: "movie" | "tv";
  title: string;
  poster: string;
  backdrop: string;
  year: string;
  rating: number | null;
  overview: string;
  genres: string[];
  /** ISO-639 original language (en/hi/...) — drives Hollywood/Bollywood
      source routing without extra API calls. */
  lang: string;
  /** Small card thumbnail (~4x lighter than poster — grids on slow data). */
  thumb: string;
}

let genreCache: { movie: Map<number, string>; tv: Map<number, string> } | null = null;
async function genreMaps() {
  if (genreCache) return genreCache;
  try {
    const [m, t] = await Promise.all([
      get("/genre/movie/list").catch(() => ({ genres: [] })),
      get("/genre/tv/list").catch(() => ({ genres: [] })),
    ]);
    genreCache = {
      movie: new Map(((m.genres || []) as any[]).map((g: any) => [g.id, g.name])),
      tv: new Map(((t.genres || []) as any[]).map((g: any) => [g.id, g.name])),
    };
  } catch {
    genreCache = { movie: new Map(), tv: new Map() };
  }
  return genreCache!;
}

/** w342 card thumbnail derived from the configured poster size. */
function thumbOf(posterPath: string): string {
  if (!posterPath) return "";
  const base = IMG.replace(/\/w\d+$/, "");
  return `${base}/w342${posterPath}`;
}

function norm(m: any, kind: "movie" | "tv"): MediaItem {
  const title = m.title || m.name || "Untitled";
  return {
    id: String(m.id),
    kind,
    title,
    poster: m.poster_path ? `${IMG}${m.poster_path}` : "",
    thumb: m.poster_path ? thumbOf(m.poster_path) : "",
    backdrop: (m.backdrop_path ? `${BACKDROP}${m.backdrop_path}` : "") || "",
    year: ((m.release_date || m.first_air_date || "") as string).slice(0, 4),
    rating: typeof m.vote_average === "number" ? Math.round(m.vote_average * 10) / 10 : null,
    overview: (m.overview || "").slice(0, 400),
    genres: [],
    lang: String(m.original_language || ""),
  };
}

async function withGenres(items: MediaItem[], raw: any[], kind: "movie" | "tv") {
  const maps = await genreMaps().catch(() => null);
  if (!maps) return items;
  const map = kind === "tv" ? maps.tv : maps.movie;
  const byId = new Map(items.map((i) => [i.id, i]));
  for (const r of raw || []) {
    const it = byId.get(String(r.id));
    if (it) it.genres = ((r.genre_ids || []) as number[]).map((g) => map.get(g)).filter(Boolean).slice(0, 3) as string[];
  }
  return items;
}

async function get(path: string, params: Record<string, string> = {}) {
  const k = key();
  if (!k) throw new Error("TMDB_API_KEY missing in backend .env");
  const url = withParams(`${BASE}${path}`, { api_key: k, language: "en-US", ...params });
  return getJson(url, { label: `tmdb${path}` });
}

// In-memory TTL cache — same endpoints, same shapes, just served faster on
// repeat opens (detail/seasons/episodes appear instantly on revisit).
// No architecture change: plain Map, process-local.
const ttlCache = new Map<string, { expires: number; value: any }>();
function cacheGet<T>(k: string): T | null {
  const hit = ttlCache.get(k);
  if (hit && hit.expires > Date.now()) return hit.value as T;
  if (hit) ttlCache.delete(k);
  return null;
}
function cacheSet(k: string, value: any, ttlSec: number) {
  try {
    ttlCache.set(k, { expires: Date.now() + Math.max(30, ttlSec) * 1000, value });
    if (ttlCache.size > 500) {
      const first = ttlCache.keys().next().value;
      if (first) ttlCache.delete(first);
    }
  } catch {}
}

export async function tmdbHome() {
  const ck = "home";
  const hit = cacheGet<any>(ck);
  if (hit) return hit;
  // Independent sections: one failing endpoint must not kill the whole home.
  const [trend, movPop, tvPop, movTop] = await Promise.allSettled([
    get("/trending/all/week"),
    get("/movie/popular"),
    get("/tv/popular"),
    get("/movie/top_rated"),
  ]);
  const val = (r: PromiseSettledResult<any>) => (r.status === "fulfilled" ? r.value : null);
  const t = val(trend), mp = val(movPop), tp = val(tvPop), mt = val(movTop);
  for (const [name, r] of [["trending", trend], ["movie/popular", movPop], ["tv/popular", tvPop], ["movie/top_rated", movTop]] as const) {
    if (r.status === "rejected") console.error(`[tmdb] home section failed: ${name}: ${String(r.reason?.message || r.reason).slice(0, 160)}`);
  }
  const pick = (data: any, kind: "movie" | "tv") => ((data?.results || []) as any[]).slice(0, 20).map((m: any) => norm(m, kind));
  // trending mixes movie+tv+person; keep only movie/tv
  const trending = (((t?.results || []) as any[])
    .filter((m) => m.media_type === "movie" || m.media_type === "tv")
    .slice(0, 20)
    .map((m) => norm(m, m.media_type === "tv" ? "tv" : "movie")));
  const out = {
    trending,
    moviesPopular: pick(mp, "movie"),
    seriesPopular: pick(tp, "tv"),
    moviesTop: pick(mt, "movie"),
  };
  cacheSet(ck, out, 180);
  return out;
}

export async function tmdbSearch(q: string) {
  const ck = "search:" + q.toLowerCase().trim();
  const hit = cacheGet<any[]>(ck);
  if (hit) return hit;
  // "Runner 2026" -> query=Runner + year=2026 (TMDB chokes on years in text).
  const m = q.match(/\b((?:19|20)\d{2})\b/);
  const year = m ? m[1] : "";
  const cleanQ = q.replace(/\b(?:19|20)\d{2}\b/g, " ").replace(/\s+/g, " ").trim() || q;
  const params: Record<string, string> = { query: cleanQ, include_adult: "false", page: "1" };
  if (year) params.year = year;
  const data = await get("/search/multi", params);
  let list = ((data.results || []) as any[]).filter((x) => x.media_type === "movie" || x.media_type === "tv");
  if (!list.length && year) {
    // Fallback: plain text search without the year filter.
    const d2 = await get("/search/multi", { query: cleanQ, include_adult: "false", page: "1" }).catch(() => null);
    if (d2) list = ((d2.results || []) as any[]).filter((x) => x.media_type === "movie" || x.media_type === "tv");
  }
  const out = list.slice(0, 20).map((x) => norm(x, x.media_type === "tv" ? "tv" : "movie"));
  cacheSet(ck, out, 300);
  return out;
}

export async function tmdbDetail(kind: "movie" | "tv", id: string) {
  const ck = `detail:${kind}:${id}`;
  const hit = cacheGet<any>(ck);
  if (hit) return hit;
  const data = await get(`/${kind}/${id}`, { append_to_response: "credits,similar" });
  const item = norm({ ...data, release_date: data.release_date, first_air_date: data.first_air_date }, kind);
  const cast = ((data.credits?.cast || []) as any[]).slice(0, 8).map((c) => c.name).filter(Boolean);
  const similar = (((data.similar?.results || []) as any[]).slice(0, 12)).map((m: any) => norm(m, kind));
  const seasons = kind === "tv" ? (((data.seasons || []) as any[]).map((s: any) => ({
    n: s.season_number,
    name: s.name || (s.season_number === 0 ? "Specials" : `Season ${s.season_number}`),
    episodes: s.episode_count ?? null,
    poster: s.poster_path ? `${IMG}${s.poster_path}` : "",
  }))) : [];
  const out = { ...item, genres: ((data.genres || []) as any[]).map((g) => g.name), cast, similar, seasons };
  cacheSet(ck, out, 600);
  return out;
}

export async function tmdbSeason(tvId: string, season: number) {
  const ck = `season:${tvId}:${season}`;
  const hit = cacheGet<any>(ck);
  if (hit) return hit;
  const data = await get(`/tv/${tvId}/season/${season}`);
  const episodes = ((data.episodes || []) as any[]).map((e: any) => ({
    n: e.episode_number,
    name: e.name || `Episode ${e.episode_number}`,
    overview: (e.overview || "").slice(0, 300),
    still: e.still_path ? `${IMG}${e.still_path}` : "",
    runtime: e.runtime ?? null,
    airDate: (e.air_date || "").slice(0, 10),
  }));
  const out = { season, name: data.name || `Season ${season}`, episodes };
  cacheSet(ck, out, 600);
  return out;
}

async function discover(kind: "movie" | "tv", params: Record<string, string>, limit = 20) {
  const path = kind === "tv" ? "/discover/tv" : "/discover/movie";
  const data = await get(path, { sort_by: "popularity.desc", ...params });
  const raw = ((data.results || []) as any[]).slice(0, limit);
  const items = raw.map((m: any) => norm(m, kind));
  return withGenres(items, raw, kind);
}

// Home showcase: trending-week hero (top 10 movies) + popular 2026 + new releases.
export async function tmdbShowcase() {
  const ck = "showcase";
  const hit = cacheGet<any>(ck);
  if (hit) return hit;
  const [trend, pop, now] = await Promise.allSettled([
    get("/trending/movie/week"),
    get("/discover/movie", { primary_release_year: "2026", sort_by: "popularity.desc", "vote_count.gte": "10" }),
    get("/movie/now_playing", { region: "US" }),
  ]);
  const val = (r: PromiseSettledResult<any>) => (r.status === "fulfilled" ? r.value : null);
  const t = val(trend), p = val(pop), n = val(now);
  const tRaw = (((t?.results || []) as any[]).filter((m) => m.media_type !== "person")).slice(0, 10);
  const trendingWeek = await withGenres(tRaw.map((m: any) => norm(m, "movie")), tRaw, "movie");
  const pRaw = ((p?.results || []) as any[]).slice(0, 20);
  const popular2026 = await withGenres(pRaw.map((m: any) => norm(m, "movie")), pRaw, "movie");
  const nRaw = ((n?.results || []) as any[]).slice(0, 20);
  const newReleases = await withGenres(nRaw.map((m: any) => norm(m, "movie")), nRaw, "movie");
  const out = { trendingWeek, popular2026, newReleases };
  cacheSet(ck, out, 180);
  return out;
}

export type BrowseCat = "movies" | "series" | "hollywood" | "bollywood";
export interface BrowseRow { title: string; items: MediaItem[]; }

// Dedicated category pages. Hollywood = English-origin, Bollywood = Hindi-origin.
export async function tmdbBrowse(cat: BrowseCat): Promise<{ cat: BrowseCat; title: string; rows: BrowseRow[] }> {
  const ck = `browse:${cat}`;
  const hit = cacheGet<any>(ck);
  if (hit) return hit;
  const rows: BrowseRow[] = [];
  if (cat === "movies") {
    const [pop, top, now, up] = await Promise.allSettled([
      get("/discover/movie", { primary_release_year: "2026", sort_by: "popularity.desc", "vote_count.gte": "10" }),
      get("/movie/top_rated"),
      get("/movie/now_playing", { region: "US" }),
      get("/movie/upcoming", { region: "US" }),
    ]);
    const specs: [string, PromiseSettledResult<any>][] = [
      ["Popular Movies 2026", pop], ["Top Rated Movies", top], ["Now Playing", now], ["Coming Soon", up],
    ];
    for (const [title, r] of specs) {
      const raw = (((r.status === "fulfilled" ? r.value?.results : []) || []) as any[]).slice(0, 20);
      rows.push({ title, items: await withGenres(raw.map((m: any) => norm(m, "movie")), raw, "movie") });
    }
    const out = { cat, title: "Movies", rows };
    cacheSet(ck, out, 300);
    return out;
  }
  if (cat === "series") {
    const [pop, top, air, onair] = await Promise.allSettled([
      get("/tv/popular"), get("/tv/top_rated"), get("/tv/airing_today"), get("/tv/on_the_air"),
    ]);
    const specs: [string, PromiseSettledResult<any>][] = [
      ["Popular Web Series", pop], ["Top Rated Series", top], ["Airing Today", air], ["Currently Airing", onair],
    ];
    for (const [title, r] of specs) {
      const raw = (((r.status === "fulfilled" ? r.value?.results : []) || []) as any[]).slice(0, 20);
      rows.push({ title, items: await withGenres(raw.map((m: any) => norm(m, "tv")), raw, "tv") });
    }
    const out = { cat, title: "Web Series", rows };
    cacheSet(ck, out, 300);
    return out;
  }
  if (cat === "hollywood") {
    const [mov, tv] = await Promise.allSettled([
      discover("movie", { with_original_language: "en", "vote_count.gte": "20" }),
      discover("tv", { with_original_language: "en", "vote_count.gte": "20" }),
    ]);
    rows.push({ title: "Hollywood Movies", items: mov.status === "fulfilled" ? mov.value : [] });
    rows.push({ title: "Hollywood Series", items: tv.status === "fulfilled" ? tv.value : [] });
    const out = { cat, title: "Hollywood", rows };
    cacheSet(ck, out, 300);
    return out;
  }
  const [mov, tv] = await Promise.allSettled([
    discover("movie", { with_original_language: "hi", "vote_count.gte": "3" }),
    discover("tv", { with_original_language: "hi", "vote_count.gte": "3" }),
  ]);
  rows.push({ title: "Bollywood Movies", items: mov.status === "fulfilled" ? mov.value : [] });
  rows.push({ title: "Bollywood Series", items: tv.status === "fulfilled" ? tv.value : [] });
  const outB = { cat, title: "Bollywood", rows };
  cacheSet(ck, outB, 300);
  return outB;
}
