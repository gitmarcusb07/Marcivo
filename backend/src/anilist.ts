// Marcivo native anime provider — AniList GraphQL (https://graphql.anilist.co).
// No API key required. Replaces the old Jikan REST provider.

const ENDPOINT = (process.env.ANILIST_ENDPOINT || "https://graphql.anilist.co").replace(/\/$/, "");

export interface AnimeItem {
  id: string;
  kind: "anime";
  title: string;
  poster: string;
  year: string;
  rating: number | null;
  overview: string;
  /** AniList format (TV, MOVIE, OVA, ONA, MUSIC, MANGA, …) — used to
      ignore non-watchable entries during classification. */
  format: string;
  /** Smaller card thumbnail (large instead of extraLarge). */
  thumb: string;
}

function stripHtml(s: string): string {
  return (s || "").replace(/<br\s*\/?>/gi, " ").replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

function norm(m: any): AnimeItem {
  const title = m?.title?.english || m?.title?.romaji || "Untitled";
  const poster = m?.coverImage?.extraLarge || m?.coverImage?.large || "";
  const year = String(m?.startDate?.year || m?.seasonYear || "");
  const rating =
    typeof m?.averageScore === "number" ? Math.round((m.averageScore / 10) * 10) / 10 : null;
  return {
    id: String(m?.id ?? ""),
    kind: "anime",
    title,
    poster,
    thumb: m?.coverImage?.large || poster,
    year,
    rating,
    overview: stripHtml(String(m?.description || "")).slice(0, 400),
    format: String(m?.format || ""),
  };
}

// Tiny TTL cache (same-process, no arch change) — anime lists rarely change.
const cache = new Map<string, { expires: number; value: any }>();
const TTL_MS = Math.max(60, parseInt(process.env.ANILIST_CACHE || "300", 10)) * 1000;

async function graphql(query: string, variables: Record<string, any> = {}): Promise<any> {
  const UA = process.env.SITE_USER_AGENT || "Mozilla/5.0 (Windows NT 10.0; Win64; x64)";
  const timeoutMs = 15000;
  let lastErr: any = null;
  for (let attempt = 1; attempt <= 3; attempt++) {
    const ctl = new AbortController();
    const t = setTimeout(() => ctl.abort(), timeoutMs);
    try {
      const r = await fetch(ENDPOINT, {
        method: "POST",
        signal: ctl.signal,
        headers: { "Content-Type": "application/json", Accept: "application/json", "User-Agent": UA },
        body: JSON.stringify({ query, variables }),
      });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const data = (await r.json()) as any;
      if (data?.errors?.length) throw new Error(String(data.errors[0]?.message || "AniList error").slice(0, 160));
      return data?.data;
    } catch (e: any) {
      lastErr = e;
      console.error(`[anilist] attempt ${attempt}/3 failed: ${String(e?.message || e).slice(0, 160)}`);
      if (attempt < 3) await new Promise((rr) => setTimeout(rr, 500 * attempt));
    } finally {
      clearTimeout(t);
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error(String(lastErr));
}

const LIST_FIELDS = `
  id
  title { romaji english }
  coverImage { large extraLarge }
  startDate { year }
  seasonYear
  averageScore
  description
  genres
  format
`;

export async function anilistHome(): Promise<{ top: AnimeItem[]; seasonal: AnimeItem[] }> {
  const ck = "home";
  const hit = cache.get(ck);
  if (hit && hit.expires > Date.now()) return hit.value;
  const q = `
    query ($perPage: Int) {
      top: Page(page: 1, perPage: $perPage) {
        media(type: ANIME, sort: [SCORE_DESC]) { ${LIST_FIELDS} }
      }
      seasonal: Page(page: 1, perPage: $perPage) {
        media(type: ANIME, sort: [TRENDING_DESC]) { ${LIST_FIELDS} }
      }
    }`;
  try {
    const data = await graphql(q, { perPage: 20 });
    const out = {
      top: ((data?.top?.media || []) as any[]).map(norm).filter((x) => x.id),
      seasonal: ((data?.seasonal?.media || []) as any[]).map(norm).filter((x) => x.id),
    };
    cache.set(ck, { expires: Date.now() + TTL_MS, value: out });
    return out;
  } catch {
    return { top: [], seasonal: [] };
  }
}

export async function anilistSearch(q: string): Promise<AnimeItem[]> {
  const query = (q || "").trim();
  if (!query) return [];
  const ck = "search:" + query.toLowerCase();
  const hit = cache.get(ck);
  if (hit && hit.expires > Date.now()) return hit.value;
  const gql = `
    query ($search: String, $perPage: Int) {
      Page(page: 1, perPage: $perPage) {
        media(search: $search, type: ANIME, sort: [SEARCH_MATCH]) { ${LIST_FIELDS} }
      }
    }`;
  const data = await graphql(gql, { search: query, perPage: 20 });
  const list = ((data?.Page?.media || []) as any[]).map(norm).filter((x) => x.id);
  cache.set(ck, { expires: Date.now() + TTL_MS, value: list });
  return list;
}

export async function anilistDetail(id: string): Promise<any> {
  const ck = "detail:" + String(id);
  const hit = cache.get(ck);
  if (hit && hit.expires > Date.now()) return hit.value;
  const gql = `
    query ($id: Int) {
      Media(id: $id, type: ANIME) {
        ${LIST_FIELDS}
        episodes
        status
        recommendations(sort: [RATING_DESC], perPage: 12) {
          edges { node { mediaRecommendation {
            id
            title { romaji english }
            coverImage { large extraLarge }
            startDate { year }
            averageScore
            description
          } } }
        }
      }
    }`;
  const data = await graphql(gql, { id: parseInt(String(id), 10) });
  const m = data?.Media || {};
  const item = norm(m);
  const similar: AnimeItem[] = (((m?.recommendations?.edges || []) as any[])
    .map((e: any) => e?.node?.mediaRecommendation)
    .filter(Boolean)
    .map(norm)
    .filter((x) => x.id)).slice(0, 12);
  const out = {
    ...item,
    genres: ((m?.genres || []) as any[]).map(String),
    cast: [] as string[],
    similar,
    episodes: typeof m?.episodes === "number" ? m.episodes : null,
    status: m?.status || "",
  };
  cache.set(ck, { expires: Date.now() + TTL_MS, value: out });
  return out;
}

export interface UpcomingAnimeItem extends AnimeItem {
  /** Full ISO start date when known (YYYY-MM-DD), else "". */
  date: string;
  /** "Fall 2026" / "2026" / "" — season known but not the day. */
  seasonLabel: string;
}

const SEASON_NAMES: Record<string, string> = { WINTER: "Winter", SPRING: "Spring", SUMMER: "Summer", FALL: "Fall" };

const UPCOMING_FIELDS = `
  id
  title { romaji english }
  coverImage { large extraLarge }
  startDate { year month day }
  seasonYear
  season
  averageScore
  description
  genres
  format
`;

// Titles that haven't aired yet — powers the /upcoming/anime page and the
// sitemap's anime coverage ("when it comes, watch it here").
export async function anilistUpcoming(): Promise<UpcomingAnimeItem[]> {
  const ck = "upcoming";
  const hit = cache.get(ck);
  if (hit && hit.expires > Date.now()) return hit.value;
  const gql = `
    query ($perPage: Int) {
      Page(page: 1, perPage: $perPage) {
        media(type: ANIME, status: NOT_YET_RELEASED, sort: [POPULARITY_DESC]) { ${UPCOMING_FIELDS} }
      }
    }`;
  try {
    const data = await graphql(gql, { perPage: 40 });
    const items = ((data?.Page?.media || []) as any[])
      .map((m: any) => {
        const it = norm(m) as UpcomingAnimeItem;
        const sd = m?.startDate || {};
        it.date = sd.year && sd.month && sd.day
          ? `${sd.year}-${String(sd.month).padStart(2, "0")}-${String(sd.day).padStart(2, "0")}`
          : "";
        const season = SEASON_NAMES[String(m?.season || "").toUpperCase()] || "";
        const y = String(m?.seasonYear || sd.year || "");
        it.seasonLabel = season && y ? `${season} ${y}` : y;
        return it;
      })
      .filter((x) => x.id && String(x.format || "").toUpperCase() !== "MUSIC");
    cache.set(ck, { expires: Date.now() + Math.max(TTL_MS, 1800 * 1000), value: items });
    return items;
  } catch {
    return [];
  }
}
