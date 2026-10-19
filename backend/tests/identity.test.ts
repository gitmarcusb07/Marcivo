// Identity/classification/ranking unit tests (no network).
// Run: npx tsx tests/identity.test.ts
import { strict as assert } from "assert";
import {
  normalizeQuery, normalizeTitle, parseMeta, contentId, resultId,
  titleSimilarity, matchScore, classify, groupForClass, groupSiteIds,
  priorityRank, SOURCE_GROUPS, SOURCE_PRIORITY, CONTENT_SOURCES,
  groupByContent, contentSlug,
} from "../src/identity.js";
import { ARTICLE_TITLE, CONTENT_SIGNAL } from "../src/siteSearch.js";
import { originOf, originSiteIds, isExactVersion } from "../src/identity.js";

let n = 0;
const t = (name: string, fn: () => void) => { fn(); n++; console.log(`ok ${n} - ${name}`); };

// --- query normalization: year/season/episode preserved, noise stripped ---
t("normalize ' Dune 2021 ' keeps year", () => {
  const q = normalizeQuery(" Dune ");
  assert.equal(q.query, "dune");
  assert.equal(q.year, undefined);
  const q2 = normalizeQuery("Dune 2021");
  assert.equal(q2.query, "dune");
  assert.equal(q2.year, "2021");
});

t("Dune 1984 vs Dune 2021 stay distinguishable", () => {
  const a = normalizeQuery("Dune 1984");
  const b = normalizeQuery("Dune 2021");
  assert.equal(a.query, "dune");
  assert.equal(b.query, "dune");
  assert.notEqual(a.year, b.year);
  assert.notEqual(
    contentId("movie", "Dune", a.year),
    contentId("movie", "Dune", b.year)
  );
});

t("season/episode extraction", () => {
  const q = normalizeQuery("Stranger Things Season 4");
  assert.equal(q.query, "stranger things");
  assert.equal(q.season, 4);
  const e = normalizeQuery("One Piece episode 1122");
  assert.equal(e.query, "one piece");
  assert.equal(e.episode, 1122);
  const se = normalizeQuery("Show S01E03");
  assert.equal(se.season, 1);
  assert.equal(se.episode, 3);
});

// --- Test 1/6: classification from metadata stubs ---
t("Dune classifies MOVIE, no anime sources", () => {
  const tmdb = [{ kind: "movie", title: "Dune", year: "2021" }];
  assert.equal(classify(normalizeQuery("Dune"), tmdb, []), "movie");
  assert.deepEqual(groupSiteIds(groupForClass("movie")), [4, 1, 2, 6]);
});

t("Stranger Things classifies SERIES, movie pool", () => {
  const tmdb = [{ kind: "tv", title: "Stranger Things", year: "2016" }];
  assert.equal(classify(normalizeQuery("Stranger Things"), tmdb, []), "series");
  assert.deepEqual(groupSiteIds(groupForClass("series")), [4, 1, 2, 6]);
});

// --- Test 4/5: anime classification + anime-only pool, priority order ---
t("One Piece classifies ANIME, pirate first", () => {
  const anime = [{ title: "One Piece", year: "1999" }];
  assert.equal(classify(normalizeQuery("One Piece"), [], anime), "anime");
  assert.deepEqual(groupSiteIds("anime"), [5, 3]);
});

t("Naruto classifies ANIME even with TMDB noise", () => {
  const tmdb = [{ kind: "tv", title: "Naruto Shippuden Spin-off", year: "2012" }];
  const anime = [{ title: "Naruto", year: "2002", format: "TV" }];
  assert.equal(classify(normalizeQuery("Naruto"), tmdb, anime), "anime");
});

t("Dune ignores non-watchable anime entries, classifies MOVIE", () => {
  const tmdb = [{ kind: "movie", title: "Dune", year: "2021" }];
  const anime = [{ title: "DUNE", year: "2017", format: "MUSIC" }];
  assert.equal(classify(normalizeQuery("Dune"), tmdb, anime), "movie");
});

t("exact tie: series-like anime wins, film defers to catalog", () => {
  const opAnime = [{ title: "One Piece", year: "1999", format: "TV" }];
  const opTmdb = [{ kind: "tv", title: "One Piece", year: "2023" }];
  assert.equal(classify(normalizeQuery("One Piece"), opTmdb, opAnime), "anime");
  const ynAnime = [{ title: "Your Name", year: "2016", format: "MOVIE" }];
  const ynTmdb = [{ kind: "movie", title: "Your Name", year: "2016" }];
  assert.equal(classify(normalizeQuery("Your Name"), ynTmdb, ynAnime), "movie");
});

t("unknown query searches every group", () => {
  assert.equal(classify(normalizeQuery("xqzzt"), [], []), "unknown");
  assert.deepEqual(groupSiteIds("unknown"), [4, 5, 1, 2, 3, 6]);
});

// --- Test 2/3: year-aware content identity ---
t("Dune 1984 / 2021 / Part Two are three content ids", () => {
  const ids = new Set([
    contentId("movie", "Dune", "1984"),
    contentId("movie", "Dune", "2021"),
    contentId("movie", "Dune Part Two", "2024"),
  ]);
  assert.equal(ids.size, 3);
});

// --- Test 7: same movie, different sources → same content, distinct results ---
t("same movie across sources shares content_id, not result_id", () => {
  const c1 = contentId("movie", "Dune", "2021");
  const c2 = contentId("movie", "Dune (2021) BluRay", "2021");
  assert.equal(c1, c2);
  const r1 = resultId(4, "https://prmovies.org.in/dune-2021/");
  const r2 = resultId(1, "https://vegamovies.gallery/dune-2021/");
  assert.notEqual(r1, r2);
  assert.equal(resultId(4, "https://prmovies.org.in/dune-2021/"), r1); // deterministic
});

// --- Test 8: similar titles stay separate ---
t("different movies never merge", () => {
  assert.notEqual(contentId("movie", "Dune", "2021"), contentId("movie", "Dune", "1984"));
  assert.notEqual(contentId("movie", "Dune", "2021"), contentId("series", "Dune", "2021"));
  assert.notEqual(
    contentId("movie", "Resident Evil", "2002"),
    contentId("movie", "Resident Evil", "2026")
  );
});

// --- Test 9/10: match scoring prefers exact + year over loose matches ---
t("exact year match outranks loose match", () => {
  const q = normalizeQuery("Dune 1984");
  const exact = matchScore(q, "Download Dune (1984) BluRay 1080p", { year: "1984", type: "movie", queryType: "movie" });
  const wrong = matchScore(q, "Download Dune (2021) BluRay 1080p", { year: "2021", type: "movie", queryType: "movie" });
  assert.ok(exact > wrong, `${exact} should beat ${wrong}`);
});

t("central priority config: streaming first, never reversed", () => {
  const m = SOURCE_GROUPS.movie;
  assert.deepEqual(m.map((s) => s.name), ["PRMovies", "Vegamovies", "RogMovies", "BoredFlix"]);
  assert.equal(m[0].type, "streaming");
  const a = SOURCE_GROUPS.anime;
  assert.deepEqual(a.map((s) => s.name), ["PirateXPlay", "Gokuhd"]);
  assert.equal(a[0].type, "streaming");
  assert.ok(priorityRank("movie", 4) < priorityRank("movie", 1));
  assert.ok(priorityRank("anime", 5) < priorityRank("anime", 3));
  assert.equal(priorityRank("anime", 1), 999); // movie source sorts last in anime group
  // BoredFlix appends last: it never displaces an existing source, and it is
  // not part of the anime pool.
  assert.equal(m[3].type, "streaming");
  assert.ok(priorityRank("movie", 2) < priorityRank("movie", 6));
  assert.equal(priorityRank("anime", 6), 999);
});

t("title similarity sane", () => {
  assert.equal(titleSimilarity("Dune", "Dune"), 1);
  assert.ok(titleSimilarity("Naruto", "Naruto Shippuden") >= 0.5);
  assert.ok(titleSimilarity("Dune", "Oppenheimer") < 0.5);
  assert.equal(normalizeTitle("Dune: Part Two (2024)"), "dune part two 2024");
  assert.deepEqual(parseMeta("Show S02E05 BluRay"), { season: 2, episode: 5 });
});

// --- §2/§42 central config aliases stay in sync ---
t("CONTENT_SOURCES + SOURCE_PRIORITY mirror SOURCE_GROUPS", () => {
  assert.deepEqual(CONTENT_SOURCES.movie_series.map((s) => s.name), ["prmovies", "vegamovies", "rogmovies", "boredflix"]);
  assert.equal(CONTENT_SOURCES.movie_series[0].type, "streaming");
  assert.equal(CONTENT_SOURCES.movie_series[3].type, "streaming");
  assert.deepEqual(CONTENT_SOURCES.anime.map((s) => s.name), ["piratepixels", "gokuhd"]);
  assert.deepEqual(Object.keys(SOURCE_PRIORITY.movie).sort(), ["boredflix", "prmovies", "rogmovies", "vegamovies"]);
  assert.deepEqual(Object.keys(SOURCE_PRIORITY.series).sort(), ["boredflix", "prmovies", "rogmovies", "vegamovies"]);
  assert.ok(SOURCE_PRIORITY.movie.prmovies < SOURCE_PRIORITY.movie.vegamovies);
  assert.ok(SOURCE_PRIORITY.movie.rogmovies < SOURCE_PRIORITY.movie.boredflix); // new slot appends last
  assert.ok(SOURCE_PRIORITY.anime.piratepixels < SOURCE_PRIORITY.anime.gokuhd);
});

// --- §18/§28 episode participates in identity ---
t("season/episode change content identity", () => {
  assert.notEqual(contentId("series", "Show", "2020", 1), contentId("series", "Show", "2020", 2));
  assert.notEqual(contentId("series", "Show", "2020", 1, 3), contentId("series", "Show", "2020", 1, 4));
  assert.notEqual(contentId("series", "Show", "2020", 1), contentId("series", "Show", "2020", 1, 1));
  // Backward compat: no season/episode still works.
  assert.equal(contentId("movie", "Dune", "2021"), "movie:dune:2021");
});

// --- Test 7: same movie across sources → ONE content card, ordered sources ---
t("groupByContent: same movie, 3 sources → 1 card, PRMovies first", () => {
  const flat: any[] = [
    { content_id: contentId("movie", "Dune", "2021"), result_id: "1:aaa", title: "Dune (2021)", year: "2021", type: "movie", site_id: 1, site_name: "Vegamovies", url: "https://v/dune", match: 80 },
    { content_id: contentId("movie", "Dune", "2021"), result_id: "4:bbb", title: "Dune (2021)", year: "2021", type: "movie", site_id: 4, site_name: "PRMovies", url: "https://p/dune", match: 75 },
    { content_id: contentId("movie", "Dune", "2021"), result_id: "2:ccc", title: "Dune (2021)", year: "2021", type: "movie", site_id: 2, site_name: "RogMovies", url: "https://r/dune", match: 70 },
  ];
  const g = groupByContent(flat, "movie");
  assert.equal(g.length, 1);
  assert.equal(g[0].content_id, contentId("movie", "Dune", "2021"));
  assert.deepEqual(g[0].sources.map((s) => s.site_id), [4, 1, 2]);
  assert.equal(g[0].result_id, "4:bbb"); // preferred source anchors the card
});

// --- Test 8: different years/types never merge ---
t("groupByContent: Dune 1984/2021/Part Two stay 3 cards", () => {
  const flat: any[] = [
    { content_id: contentId("movie", "Dune", "1984"), result_id: "4:a", title: "Dune (1984)", year: "1984", type: "movie", site_id: 4, site_name: "PRMovies", url: "https://p/a", match: 60 },
    { content_id: contentId("movie", "Dune", "2021"), result_id: "1:b", title: "Dune (2021)", year: "2021", type: "movie", site_id: 1, site_name: "Vegamovies", url: "https://v/b", match: 90 },
    { content_id: contentId("movie", "Dune Part Two", "2024"), result_id: "2:c", title: "Dune Part Two (2024)", year: "2024", type: "movie", site_id: 2, site_name: "RogMovies", url: "https://r/c", match: 70 },
    { content_id: contentId("series", "Dune", "2021"), result_id: "4:d", title: "Dune (2021)", year: "2021", type: "series", site_id: 4, site_name: "PRMovies", url: "https://p/d", match: 65 },
  ];
  const g = groupByContent(flat, "movie");
  assert.equal(g.length, 4);
  // Best match first — priority must NOT hide the exact VegaMovies 2021 hit.
  assert.equal(g[0].content_id, contentId("movie", "Dune", "2021"));
});

// --- Test 9: card keys are stable content identities (no index reuse) ---
t("grouped cards carry stable result_id per content, posters never leak", () => {
  const flat: any[] = [
    { content_id: contentId("movie", "Alpha", "2020"), result_id: "4:a1", title: "Alpha (2020)", year: "2020", type: "movie", site_id: 4, site_name: "PRMovies", url: "https://p/a1", match: 90, poster: "PA" },
    { content_id: contentId("movie", "Beta", "2021"), result_id: "1:b1", title: "Beta (2021)", year: "2021", type: "movie", site_id: 1, site_name: "Vegamovies", url: "https://v/b1", match: 85, poster: "PB" },
  ];
  const g = groupByContent(flat, "movie");
  assert.notEqual(g[0].result_id, g[1].result_id);
  assert.notEqual(g[0].poster, g[1].poster);
  // Clicking card #2 addresses ITS result_id, never card #1's.
  assert.equal(g[1].sources[0].result_id, "1:b1");
});

// --- Anime pool: priority preserved inside the group ---
t("groupByContent anime: PirateXPlay before Gokuhd", () => {
  const flat: any[] = [
    { content_id: contentId("anime", "One Piece", "1999"), result_id: "3:g", title: "One Piece", year: "1999", type: "anime", site_id: 3, site_name: "Gokuhd", url: "https://g/op", match: 90 },
    { content_id: contentId("anime", "One Piece", "1999"), result_id: "5:p", title: "One Piece", year: "1999", type: "anime", site_id: 5, site_name: "PirateXPlay", url: "https://p/op", match: 88 },
  ];
  const g = groupByContent(flat, "anime");
  assert.equal(g.length, 1);
  assert.deepEqual(g[0].sources.map((s) => s.site_id), [5, 3]);
});

// --- Query with year keeps distinguishability end-to-end ---
t("Dune 1984 query prefers 1984 content card", () => {
  const q = normalizeQuery("Dune 1984");
  const s84 = matchScore(q, "Download Dune (1984) BluRay", { year: "1984", type: "movie", queryType: "movie" });
  const s21 = matchScore(q, "Download Dune (2021) BluRay", { year: "2021", type: "movie", queryType: "movie" });
  assert.ok(s84 > s21);
  assert.notEqual(contentSlug("Dune (1984) BluRay"), contentSlug("Dune Part Two"));
});

t("blog-clone articles never pass as content", () => {
  // Article titles are rejected by ARTICLE_TITLE first (they may contain a
  // year, so CONTENT_SIGNAL alone can't catch them — the extractor checks
  // ARTICLE_TITLE before the site-4 content-signal gate).
  assert.ok(ARTICLE_TITLE.test("Bollywood Box Office Collection 2025 Report & Verdict India"));
  assert.ok(ARTICLE_TITLE.test("Read More"));
  assert.ok(!ARTICLE_TITLE.test("Download Dune (2021) BluRay Dual Audio 480p"));
  assert.ok(CONTENT_SIGNAL.test("Download Dune (2021) BluRay 480p"));
  assert.ok(CONTENT_SIGNAL.test("Show Season 2 Complete"));
  assert.ok(!CONTENT_SIGNAL.test("Read More"));
});

t("origin routing: Hollywood->Vegamovies only, Bollywood->RogMovies only", () => {
  assert.equal(originOf([{ title: "Dune", lang: "en" }]), "hollywood");
  assert.equal(originOf([{ title: "3 Idiots", lang: "hi" }]), "bollywood");
  assert.equal(originOf([]), "");
  assert.equal(originOf([{ title: "X" }]), "");
  assert.deepEqual(originSiteIds("hollywood"), [1]);
  assert.deepEqual(originSiteIds("bollywood"), [2]);
  assert.deepEqual(originSiteIds(""), []);
});

t("exact versions: Dune 2021 keeps its qualities, drops everything else", () => {
  const q = { title: "Dune", year: "2021", type: "movie" };
  assert.ok(isExactVersion("Download Dune (2021) BluRay Dual Audio 480p", "2021", "movie", q));
  assert.ok(isExactVersion("Download Dune (2021) BluRay 720p", "2021", "movie", q));
  assert.ok(isExactVersion("Download Dune (2021) BluRay 1080p", "2021", "movie", q));
  assert.ok(!isExactVersion("Download Dune (1984) Dual Audio", "1984", "movie", q));
  assert.ok(!isExactVersion("Download Devil in Dune (2021) Dual Audio", "2021", "movie", q));
  assert.ok(!isExactVersion("Download Dune (2021) Web Series", "2021", "series", q));
  assert.ok(!isExactVersion("Download Dune BluRay", "", "movie", q));
  assert.ok(isExactVersion("Download Dune 2 (2024) BluRay", "2024", "movie", { title: "Dune: Part Two", year: "2024", type: "movie" }));
  assert.ok(!isExactVersion("Download Dune (2021) BluRay", "2021", "movie", { title: "Dune", year: "2021", type: "anime" }));
  assert.ok(isExactVersion("Download Spider-Man: Brand New Day (2026) PREHD Dual Audio {Hindi-English} 480p [470MB]", "2026", "movie", { title: "Spider-Man: Brand New Day", year: "2026", type: "movie" }));
  assert.ok(isExactVersion("Download Resident Evil (2026) {Hindi-English} 720p HDTC x264 [1.1GB]", "2026", "movie", { title: "Resident Evil", year: "2026", type: "movie" }));
});

t("series exact: season packs match any season year, never other shows", () => {
  const q = { title: "Reacher", type: "tv" };
  assert.ok(isExactVersion("Download Reacher (2022) Season 1 720p", "2022", "series", q));
  assert.ok(isExactVersion("Download Reacher Season 4 (2025) Hindi 720p", "2025", "series", q));
  assert.ok(isExactVersion("Reacher [Season 1] Single Episodes 720p x264", "2022", "series", { title: "Reacher", type: "tv", season: 1 }));
  assert.ok(!isExactVersion("Reacher [Season 2] Single Episodes 720p", "2023", "series", { title: "Reacher", type: "tv", season: 1 }));
  assert.ok(!isExactVersion("Download Jack Reacher (2012) BluRay 720p", "2012", "movie", q));
});

console.log(`\nAll ${n} identity tests passed.`);
