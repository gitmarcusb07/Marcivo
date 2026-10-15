import * as crypto from "crypto";

// ---------------------------------------------------------------------------
// MARCIVO intelligent search: single source of truth for source groups,
// query/title normalization, content identity, match scoring and
// metadata-based classification (TMDB for movie/series, AniList for anime
// as CLASSIFICATION sources — never streaming sources).
// ---------------------------------------------------------------------------

export interface SourceDef {
  id: number;
  /** Must match the SITE{id}_NAME adapter in siteSearch. */
  name: string;
  type: "streaming" | "download";
  priority: number;
}

export type ContentGroup = "movie" | "anime" | "unknown";

/** Movie/series share one pool; anime has its own pool. */
export const SOURCE_GROUPS: Record<ContentGroup, SourceDef[]> = {
  movie: [
    { id: 4, name: "PRMovies", type: "streaming", priority: 1 },
    { id: 1, name: "Vegamovies", type: "download", priority: 2 },
    { id: 2, name: "RogMovies", type: "download", priority: 3 },
  ],
  anime: [
    { id: 5, name: "PirateXPlay", type: "streaming", priority: 1 },
    { id: 3, name: "Gokuhd", type: "download", priority: 2 },
  ],
  unknown: [
    { id: 4, name: "PRMovies", type: "streaming", priority: 1 },
    { id: 5, name: "PirateXPlay", type: "streaming", priority: 2 },
    { id: 1, name: "Vegamovies", type: "download", priority: 3 },
    { id: 2, name: "RogMovies", type: "download", priority: 4 },
    { id: 3, name: "Gokuhd", type: "download", priority: 5 },
  ],
};

/** §2 central source configuration (single source of truth). Alias of SOURCE_GROUPS. */
export const CONTENT_SOURCES: Record<string, { name: string; type: "streaming" | "download"; priority: number }[]> = {
  movie_series: [
    { name: "prmovies", type: "streaming", priority: 1 },
    { name: "vegamovies", type: "download", priority: 2 },
    { name: "rogmovies", type: "download", priority: 3 },
  ],
  anime: [
    { name: "piratepixels", type: "streaming", priority: 1 },
    { name: "gokuhd", type: "download", priority: 2 },
  ],
};

/** §42 final source priority — single source of truth (derived from SOURCE_GROUPS). */
export const SOURCE_PRIORITY: Record<string, Record<string, number>> = {
  movie: { prmovies: 1, vegamovies: 2, rogmovies: 3 },
  series: { prmovies: 1, vegamovies: 2, rogmovies: 3 },
  anime: { piratepixels: 1, gokuhd: 2 },
};

export function groupSiteIds(group: ContentGroup): number[] {
  return SOURCE_GROUPS[group].map((s) => s.id);
}

export type ContentOrigin = "hollywood" | "bollywood" | "";

/** Origin pools (env-overridable): Hollywood goes to Vegamovies only,
    Bollywood to RogMovies only. PRMovies-slot stays in the generic movie
    pool so a revived streaming mirror slots back in with zero code change. */
function envIds(key: string, fallback: number[]): number[] {
  const raw = (process.env[key] || "").trim();
  if (!raw) return fallback;
  const ids = raw.split(",").map((s) => parseInt(s.trim(), 10)).filter((n) => n >= 1 && n <= 8);
  return ids.length ? ids : fallback;
}

export function originSiteIds(origin: ContentOrigin): number[] {
  if (origin === "hollywood") return envIds("HOLLYWOOD_SITES", [1]);
  if (origin === "bollywood") return envIds("BOLLYWOOD_SITES", [2]);
  return [];
}

/** Origin from the top TMDB metadata hit (zero extra API cost). */
export function originOf(tmdb: any[]): ContentOrigin {
  const top = (tmdb || [])[0] as any;
  const lang = String(top?.lang || top?.original_language || "").toLowerCase();
  if (lang === "hi") return "bollywood";
  if (lang === "en") return "hollywood";
  return "";
}

/** Streaming/download orientation for a site id (falls back across groups). */
export function sourceTypeFor(siteId: number): "streaming" | "download" {
  for (const g of Object.values(SOURCE_GROUPS)) {
    const f = g.find((s) => s.id === siteId);
    if (f) return f.type;
  }
  return "download";
}

export function sourceNameFor(siteId: number): string {
  for (const g of Object.values(SOURCE_GROUPS)) {
    const f = g.find((s) => s.id === siteId);
    if (f) return f.name;
  }
  return `Site ${siteId}`;
}

/** Lower = higher priority. Sites outside the group sort last. */
export function priorityRank(group: ContentGroup, siteId: number): number {
  const found = SOURCE_GROUPS[group].find((s) => s.id === siteId);
  return found ? found.priority : 999;
}

/** Legacy ?priority=movie|anime|series|tv → group (null = no constraint). */
export function groupForPriority(p: string): ContentGroup | null {
  const v = (p || "").toLowerCase();
  if (v === "anime") return "anime";
  if (v === "movie" || v === "series" || v === "tv") return "movie";
  return null;
}

// --- Query normalization (keeps year/season/episode/sequel info) ---

export interface NormQuery {
  query: string;
  year?: string;
  season?: number;
  episode?: number;
}

export function normalizeQuery(raw: string): NormQuery {
  let q = (raw || "").replace(/\s+/g, " ").trim().toLowerCase();
  const out: NormQuery = { query: q };
  let m = q.match(/\bs(\d{1,2})e(\d{1,3})\b/);
  if (m) {
    out.season = parseInt(m[1], 10);
    out.episode = parseInt(m[2], 10);
    q = q.replace(m[0], " ");
  }
  m = q.match(/\bseason\s*(\d{1,2})\b/);
  if (m && out.season === undefined) {
    out.season = parseInt(m[1], 10);
    q = q.replace(m[0], " ");
  }
  m = q.match(/\bepisode\s*(\d{1,4})\b/);
  if (m && out.episode === undefined) {
    out.episode = parseInt(m[1], 10);
    q = q.replace(m[0], " ");
  }
  m = q.match(/\b((?:19|20)\d{2})\b/);
  if (m) {
    out.year = m[1];
    q = q.replace(m[0], " ");
  }
  out.query = q.replace(/\s+/g, " ").trim() || out.query;
  return out;
}

export function normalizeTitle(t: string): string {
  return (t || "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function parseMeta(raw: string): { year?: string; season?: number; episode?: number } {
  const out: { year?: string; season?: number; episode?: number } = {};
  const t = raw || "";
  const y = t.match(/\b((?:19|20)\d{2})\b/);
  if (y) out.year = y[1];
  const se = t.match(/\bS(\d{1,2})E(\d{1,3})\b/i) || t.match(/\bseason\s*(\d{1,2})\s*episode\s*(\d{1,3})\b/i);
  if (se) {
    out.season = parseInt(se[1], 10);
    out.episode = parseInt(se[2], 10);
  } else {
    const s = t.match(/\bseason\s*(\d{1,2})\b/i);
    if (s) out.season = parseInt(s[1], 10);
  }
  return out;
}

// --- Identity: content_id (what it is) vs result_id (which source page) ---

// Technical release tags carry no identity (same movie, different site
// suffixes). Sequel/part/season words are KEPT — they change identity.
const NOISE_TOKENS = new Set(
  ("download watch full movie bluray blu ray web dl dl hdts hdtc hdcam hdrip " +
    "dvdrip dvdscr camrip predvdrip hdtv brrip dual audio multi triple single " +
    "hindi english tamil telugu malayalam kannada dubbed org hs esub msub sub " +
    "subs subtitle subtitles hevc x264 x265 xvid aac dd5 1 dd2 0 ddp atoms " +
    "hdts hd unrated extended cut directors netflix amazon prime video hotstar " +
    "zee5 sony liv jio hq line clean PreDvD HDTS HDTC " +
    "prehd pre hd sd v1 v2 v3 10bit 8bit 12bit ac3 dts atmos truehd av1 opus " +
    "imax ts tc cam telesync telecine proper repack rerip uncut hqdvd dvdrip " +
    "10b 2160 1080 720 480 360 264 265 x264 x265 h264 h265").split(" ")
);

export function contentSlug(title: string): string {
  const toks = normalizeTitle(title)
    .split(" ")
    .filter(
      (w) =>
        !NOISE_TOKENS.has(w) &&
        !/^(19|20)\d{2}$/.test(w) &&
        !/^\d{3,4}p$/.test(w) &&
        w !== "4k"
    );
  return toks.join("-").slice(0, 80) || "untitled";
}

export function contentId(
  type: string,
  title: string,
  year?: string,
  season?: number,
  episode?: number
): string {
  const slug = contentSlug(title);
  // §18: year + type + season + episode all participate in identity.
  // Different years / types / seasons / episodes never collide.
  let id = `${type}:${slug}:${year || "noyear"}`;
  if (season !== undefined) id += `:s${season}`;
  if (episode !== undefined) id += `e${episode}`;
  return id;
}

/** §25 internal data model: one CONTENT with metadata + ordered sources. */
export interface ContentSourceRef {
  name: string;
  site_id: number;
  priority: number;
  source_result_id: string;
  result_id: string;
  source_url: string;
  match: number;
}

export interface ContentItem {
  content_id: string;
  result_id: string;
  title: string;
  year: string;
  type: string;
  poster: string;
  match: number;
  sources: ContentSourceRef[];
}

/**
 * §24 source fallback model: collapse same content_id across sites into one
 * content card with sources sorted by priority (§26). Different content
 * (year/type/season/episode) always stays separate. Returns grouped list
 * ordered by best match first, then best source priority.
 */
export function groupByContent<T extends {
  content_id?: string; result_id?: string; title: string; year?: string;
  type?: string; site_id: number; site_name: string; url: string;
  match?: number; poster?: string;
}>(
  flat: T[],
  group: ContentGroup
): ContentItem[] {
  const byContent = new Map<string, T[]>();
  for (const it of flat) {
    const cid = it.content_id || "unknown:untitled:noyear";
    if (!byContent.has(cid)) byContent.set(cid, []);
    byContent.get(cid)!.push(it);
  }
  const out: ContentItem[] = [];
  for (const [cid, rows] of byContent) {
    const sorted = [...rows].sort(
      (a, b) => priorityRank(group, a.site_id) - priorityRank(group, b.site_id) ||
        (b.match || 0) - (a.match || 0)
    );
    const best = [...rows].sort((a, b) => (b.match || 0) - (a.match || 0))[0];
    out.push({
      content_id: cid,
      // result_id of the preferred (highest-priority) source — stable card key.
      result_id: sorted[0]?.result_id || cid,
      title: best?.title || sorted[0]?.title || "Untitled",
      year: String(best?.year || sorted[0]?.year || ""),
      type: String(best?.type || sorted[0]?.type || "movie"),
      // Never copy posters across content: only reuse within the same
      // content_id, otherwise leave empty for metadata fallback.
      poster: String(best?.poster || sorted[0]?.poster || ""),
      match: Math.max(...rows.map((r) => r.match || 0)),
      sources: sorted.map((r) => ({
        name: sourceNameFor(r.site_id).toLowerCase(),
        site_id: r.site_id,
        priority: priorityRank(group, r.site_id),
        source_result_id: String(r.result_id || ""),
        result_id: String(r.result_id || ""),
        source_url: r.url,
        match: r.match || 0,
      })),
    });
  }
  out.sort((a, b) =>
    b.match - a.match ||
    Math.min(...a.sources.map((s) => s.priority)) - Math.min(...b.sources.map((s) => s.priority)) ||
    a.title.localeCompare(b.title)
  );
  return out;
}

export function resultId(siteId: number, url: string): string {
  const h = crypto.createHash("sha1").update(url).digest("hex").slice(0, 10);
  return `${siteId}:${h}`;
}

// --- Match scoring (title similarity + year + type + season) ---

function tokens(s: string): Set<string> {
  return new Set(normalizeTitle(s).split(" ").filter((x) => x.length >= 2));
}

export function titleSimilarity(a: string, b: string): number {
  const ta = tokens(a);
  const tb = tokens(b);
  if (!ta.size || !tb.size) return 0;
  let inter = 0;
  ta.forEach((x) => { if (tb.has(x)) inter++; });
  return inter / Math.max(ta.size, tb.size);
}

export function matchScore(
  q: NormQuery,
  rawSiteTitle: string,
  opts: { year?: string; type?: string; season?: number; queryType?: string } = {}
): number {
  const sim = titleSimilarity(q.query, rawSiteTitle);
  let s = Math.round(sim * 40);
  if (q.year && opts.year) {
    s += q.year === opts.year ? 25 : -15;
  }
  if (q.query && normalizeTitle(q.query) === normalizeTitle(rawSiteTitle)) s += 10;
  if (opts.queryType && opts.type && opts.queryType === opts.type) s += 20;
  if (q.season !== undefined && opts.season !== undefined && q.season === opts.season) s += 10;
  return Math.max(0, Math.min(100, s));
}

// --- Exact-version matching (detail page: the clicked movie, nothing else) ---
//
// The detail page knows the exact TMDB title+year+kind. A site row is a
// version of THAT movie only when:
//   1. its content slug equals the query slug (same movie, any quality), or
//   2. title similarity >= 0.8 ("Dune 2" for "Dune: Part Two"), AND
//   3. the year matches (when the query year is known), AND
//   4. the type matches (movie/tv-series/anime, tv ≡ series).
// Year-gating is what keeps "Dune 1984" and "Devil in Dune" out of Dune 2021.

function typesEqual(a: string, b: string): boolean {
  const n = (t: string) => (t === "tv" ? "series" : t);
  return n(a) === n(b);
}

/** Strip season markers (S01, S01E03, "season" + number) for series matching. */
export function stripSeasonSlug(slug: string): string {
  const toks = slug.split("-").filter(Boolean);
  const out: string[] = [];
  for (let i = 0; i < toks.length; i++) {
    const w = toks[i];
    if (/^s\d{1,2}(e\d{1,3})?$/.test(w)) continue;
    if (w === "season") {
      if (i + 1 < toks.length && /^\d{1,2}$/.test(toks[i + 1])) i++;
      continue;
    }
    out.push(w);
  }
  return out.join("-");
}

// Sites write sequels as numbers ("Dune 2"), catalogs as words
// ("Dune: Part Two"). Normalize both to digits so they compare equal.
const NUM_WORDS: Record<string, string> = {
  one: "1", two: "2", three: "3", four: "4", five: "5",
  six: "6", seven: "7", eight: "8", nine: "9", ten: "10",
};

export function seqSlug(title: string): string {
  return contentSlug(title)
    .split("-")
    .filter((w) => w !== "part")
    .map((w) => NUM_WORDS[w] || w)
    .join("-");
}

// Core title: words up to the first technical token (year, quality, size,
// codec, audio, language...). "Download Dune (2021) BluRay 480p [550MB]" →
// "dune"; size tags like 550MB/1-4gb never leak into identity.
function coreSlug(title: string): string {
  // Bracketed segments carry sizes/years/tags ([550MB], (2021), {Hindi-..}),
  // never title words — strip them before tokenizing.
  const cleaned = String(title || "")
    .replace(/\([^)]*\)/g, " ")
    .replace(/\[[^\]]*\]/g, " ")
    .replace(/\{[^}]*\}/g, " ");
  const toks = normalizeTitle(cleaned).split(" ").filter(Boolean);
  let i = 0;
  while (i < toks.length && (toks[i] === "download" || toks[i] === "watch")) i++;
  const out: string[] = [];
  for (; i < toks.length; i++) {
    const w = toks[i];
    if (
      /^(19|20)\d{2}$/.test(w) ||
      /^\d{3,4}p$/.test(w) ||
      w === "4k" ||
      /^\d+(\.\d+)?(mb|gb)$/.test(w) ||
      /^\d+$/.test(w) && w.length > 2 ||
      NOISE_TOKENS.has(w)
    )
      break;
    out.push(w);
  }
  return out
    .filter((w) => w !== "part")
    .map((w) => NUM_WORDS[w] || w)
    .join("-");
}

export function isExactVersion(
  siteTitle: string,
  siteYear: string,
  siteType: string,
  query: { title: string; year?: string; type?: string; season?: number }
): boolean {
  const qTitle = (query.title || "").trim();
  if (!qTitle) return false;
  if (query.type && siteType && !typesEqual(siteType, query.type)) return false;
  // Episode/series mode: the season tag decides, not the year (season packs
  // carry their own release years). Strict — never resolve another season.
  // Cores compare season-stripped ("Reacher [Season 1] Single Episodes 720p"
  // matches "Reacher" for season 1).
  if (query.season !== undefined) {
    const sm = parseMeta(siteTitle);
    if (sm.season !== undefined && sm.season !== query.season) return false;
    const a = stripSeasonSlug(coreSlug(siteTitle));
    const b = stripSeasonSlug(coreSlug(qTitle));
    return !!b && a === b;
  }
  // Series without a requested season (detail page): same show in any season
  // pack is a valid version — strip season markers and skip the year gate
  // (S4 packs carry the season year, not the series premiere year).
  if (query.type === "tv" || query.type === "series" || siteType === "series") {
    const a = stripSeasonSlug(coreSlug(siteTitle));
    const b = stripSeasonSlug(coreSlug(qTitle));
    if (b && a === b) return true;
  }
  if (query.year) {
    if (!siteYear || siteYear !== query.year) return false;
  }
  if (coreSlug(siteTitle) === coreSlug(qTitle) && coreSlug(qTitle)) return true;
  const sim = titleSimilarity(qTitle, siteTitle);
  if (query.year) return sim >= 0.8;
  return sim >= 0.85;
}

// --- Classification from already-fetched metadata (zero extra API cost) ---

export type ContentClass = "movie" | "series" | "anime" | "unknown";

// AniList formats that are never watchable streams (print/music only).
const NON_WATCHABLE = new Set(["MANGA", "NOVEL", "ONE_SHOT", "MUSIC"]);
// Series-like formats win exact-title ties (One Piece TV anime beats the
// live-action entry); film formats defer to the movie/series catalog.
const SERIES_LIKE = new Set(["TV", "TV_SHORT", "ONA", "OVA", "SPECIAL"]);

export function classify(
  q: NormQuery,
  tmdb: any[],
  anime: any[]
): ContentClass {
  // Tie rank: series-like anime (2) > catalog movie/series (1) > other
  // anime formats (0). So One Piece TV anime beats the live-action entry,
  // while anime films defer to the catalog entry.
  let best: { cls: ContentClass; sim: number; tie: number } = { cls: "unknown", sim: 0, tie: -1 };
  const consider = (cls: ContentClass, title: string, year?: string, seriesLike = false) => {
    let sim = titleSimilarity(q.query, title || "");
    if (q.year && year && String(year) === q.year) sim += 0.3;
    const tie = cls === "anime" ? (seriesLike ? 2 : 0) : 1;
    if (sim < best.sim) return;
    if (sim === best.sim && tie <= best.tie) return;
    best = { cls, sim, tie };
  };
  for (const a of anime || []) {
    const format = String(a?.format || "");
    if (NON_WATCHABLE.has(format)) continue;
    consider("anime", String(a?.title || ""), String(a?.year || ""), SERIES_LIKE.has(format));
  }
  for (const t of tmdb || []) {
    consider(t?.kind === "tv" ? "series" : "movie", String(t?.title || ""), String(t?.year || ""));
  }
  // Conservative threshold: below this we search every group (unknown).
  if (best.sim < 0.5) return "unknown";
  return best.cls;
}

/** Series shares the movie source pool (§8). */
export function groupForClass(cls: ContentClass): ContentGroup {
  if (cls === "anime") return "anime";
  if (cls === "movie" || cls === "series") return "movie";
  return "unknown";
}

// --- Structured search logging (counts only, never URLs) ---

export function logSearch(
  raw: string,
  nq: NormQuery,
  cls: ContentClass,
  group: ContentGroup,
  perSite: { site: string; status: string; count: number }[],
  normalized: number,
  deduped: number,
  finalTitles: string[]
): void {
  try {
    const parts = perSite.map((p) => `${p.site}:${p.count}`).join(" ");
    console.log(
      `[search] q="${raw.slice(0, 60)}" norm="${nq.query.slice(0, 60)}"${nq.year ? ` year=${nq.year}` : ""}${nq.season !== undefined ? ` s=${nq.season}` : ""} class=${cls} group=${group} | ${parts} | norm=${normalized} dedup=${deduped} final=${finalTitles.slice(0, 6).join(" / ").slice(0, 160)}`
    );
  } catch {}
}
