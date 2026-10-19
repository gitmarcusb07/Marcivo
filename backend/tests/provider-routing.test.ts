// Exclusive-provider routing + Cinegram/Cinejoy unit tests (no network).
// Run: npx tsx tests/provider-routing.test.ts
import { strict as assert } from "assert";
import { exclusiveSiteId, providerSiteIds, isCatalogExact, contentId, groupByContent } from "../src/identity.js";
import { cinegramEmbedUrlFromHtml, cinejoyWatchUrlFromSource, isCinejoy, resolveKey } from "../src/resolver.js";
import { siteConfigs, buildSearchUrl, describeFetchFailure, describeFetchError, extractCardResults, cinejoySlug, cinejoyResultsFromTmdb, searchSites } from "../src/siteSearch.js";

let n = 0;
const t = (name: string, fn: () => void) => { fn(); n++; console.log(`ok ${n} - ${name}`); };

function withEnv(vars: Record<string, string | undefined>, fn: () => void) {
  const saved = new Map<string, string | undefined>();
  for (const k of Object.keys(vars)) {
    saved.set(k, process.env[k]);
    const v = vars[k];
    if (v === undefined) delete process.env[k];
    else process.env[k] = v;
  }
  try { fn(); } finally {
    for (const [k, v] of saved) { if (v === undefined) delete process.env[k]; else process.env[k] = v; }
  }
}

// --- 1/2/5: every movie/series search routes to the single provider only ---
t("default (unset) → movie/series/unknown pin to site 4 (Cinegram)", () => {
  withEnv({ EXCLUSIVE_SITE: undefined, HOLLYWOOD_SITES: "1", BOLLYWOOD_SITES: "2" }, () => {
    assert.equal(exclusiveSiteId(), 4);
    assert.deepEqual(providerSiteIds("movie"), [4]);
    assert.deepEqual(providerSiteIds("unknown"), [4]);
  });
});

t("exclusive mode never selects Vega/Rog — not even for origin titles", () => {
  withEnv({ EXCLUSIVE_SITE: undefined, HOLLYWOOD_SITES: "1", BOLLYWOOD_SITES: "2" }, () => {
    assert.deepEqual(providerSiteIds("movie", "hollywood"), [4]);
    assert.deepEqual(providerSiteIds("movie", "bollywood"), [4]);
  });
});

t("anime keeps its own pool (PirateXPlay/Gokuhd) in exclusive mode", () => {
  withEnv({ EXCLUSIVE_SITE: undefined }, () => {
    assert.deepEqual(providerSiteIds("anime"), [5, 3]);
    assert.deepEqual(providerSiteIds("anime", "hollywood"), [5, 3]);
  });
});

// --- Restore path: a deliberate config change brings legacy routing back,
// with Cinejoy (SITE7) as the default-FIRST provider for movies/series ---
t("EXCLUSIVE_SITE=0 restores legacy routing with Cinejoy first", () => {
  withEnv({ EXCLUSIVE_SITE: "0", HOLLYWOOD_SITES: "1", BOLLYWOOD_SITES: "2" }, () => {
    assert.equal(exclusiveSiteId(), 0);
    assert.deepEqual(providerSiteIds("movie"), [7, 4, 1, 2, 6]);
    assert.deepEqual(providerSiteIds("unknown"), [7, 4, 5, 1, 2, 3, 6]);
    assert.deepEqual(providerSiteIds("movie", "hollywood"), [7, 1]); // Cinejoy first, origin fallback intact
    assert.deepEqual(providerSiteIds("movie", "bollywood"), [7, 2]);
    assert.deepEqual(providerSiteIds("anime"), [5, 3]); // anime pool untouched
  });
});

t("EXCLUSIVE_SITE is re-pointable; empty/invalid values disable it", () => {
  withEnv({ EXCLUSIVE_SITE: "2" }, () => assert.deepEqual(providerSiteIds("movie"), [2]));
  withEnv({ EXCLUSIVE_SITE: "" }, () => assert.equal(exclusiveSiteId(), 0));
  withEnv({ EXCLUSIVE_SITE: "x" }, () => assert.equal(exclusiveSiteId(), 0));
  withEnv({ EXCLUSIVE_SITE: "9" }, () => assert.equal(exclusiveSiteId(), 0));
});

// --- 3: movie playback builds the source's own public embed ---
const MOVIE_HTML = `<html><body><script>$.get('/ajax/cinemov.php', {"t": '27205'}, function(x){ $('#p').html(x); });</script></body></html>`;
const SOFT404_HTML = `<html><body><script>$.get('/ajax/cinemov.php', {"t": '0'}, function(x){});</script></body></html>`;
const SERIES_HTML = `<html><body>
  <a class="ep" href="/watch/1396-1-1/" data-tmdbid="1396" data-season="1" data-episode="1">E1</a>
  <a class="ep" href="/watch/1396-1-2/" data-tmdbid="1396" data-season="1" data-episode="2">E2</a>
  <a class="ep" href="/watch/1396-2-1/" data-tmdbid="1396" data-season="2" data-episode="1">S2E1</a>
</body></html>`;

t("movie page → embed from the page's own TMDB id (slug is cosmetic)", () => {
  assert.equal(cinegramEmbedUrlFromHtml(MOVIE_HTML, "/movie/51737-interstellar"), "https://ythd.org/embed/27205");
});

t("soft-404 (t: '0') is rejected — never /embed/0", () => {
  assert.throws(() => cinegramEmbedUrlFromHtml(SOFT404_HTML, "/movie/51737-interstellar"));
});

// --- 4: S1E2 resolves to Cinegram's exact S1E2 embed ---
t("series S1E2 → /embed/<tmdb>/1-2/ and S2E1 → /2-1/", () => {
  assert.equal(cinegramEmbedUrlFromHtml(SERIES_HTML, "/tv/9488-breaking-bad", 1, 2), "https://ythd.org/embed/1396/1-2/");
  assert.equal(cinegramEmbedUrlFromHtml(SERIES_HTML, "/tv/9488-breaking-bad", 2, 1), "https://ythd.org/embed/1396/2-1/");
});

t("series without S/E → first listed episode; unlisted episode → clear error", () => {
  assert.equal(cinegramEmbedUrlFromHtml(SERIES_HTML, "/tv/9488-breaking-bad"), "https://ythd.org/embed/1396/1-1/");
  assert.throws(() => cinegramEmbedUrlFromHtml(SERIES_HTML, "/tv/9488-breaking-bad", 99, 1), /isn't listed on Cinegram/);
});

t("series page without episode anchors → layout error", () => {
  assert.throws(() => cinegramEmbedUrlFromHtml("<html></html>", "/tv/9488-breaking-bad", 1, 1), /No episode list/);
});

// --- 3/7: Detail exact-mode matching for catalog-style (yearless) titles ---
t("catalog-exact: plain provider titles match; spin-offs/extras never", () => {
  assert.ok(isCatalogExact("Inception online free", "Inception"));
  assert.ok(isCatalogExact("The Matrix online free", "The Matrix"));
  assert.ok(isCatalogExact("Dune: Part Two online free", "Dune: Part Two"));
  assert.ok(!isCatalogExact("Inception: The Cobol Job online free", "Inception"));
  assert.ok(!isCatalogExact("Interstellar Ella online free", "Interstellar"));
  assert.ok(!isCatalogExact("Dune 1984 online free", "Dune"));
});

// --- 2 (preserved): episode-scoped cache keys, other hosts untouched ---
t("cinegram episode keys are S/E-scoped; other hosts keep whole-page keys", () => {
  withEnv({ WATCH_CINEGRAM_HOSTS: "cinegram.tv" }, () => {
    const url = "https://cinegram.tv/tv/9488-breaking-bad";
    assert.notEqual(resolveKey(url, 1, 1), resolveKey(url, 1, 2));
    assert.equal(resolveKey(url, 1, 2), resolveKey(url, 1, 2));
    const vega = "https://vegamovies.gallery/download-breaking-bad-s01";
    assert.equal(resolveKey(vega, 1, 2), resolveKey(vega));
  });
});

// --- 2: SITE4 env (EXCLUSIVE_SITE / SITE4_NAME / SITE4_BASE_URL) is read right ---
t("SITE4 env reads correctly and builds the Cinegram search URL", () => {
  withEnv({
    SITE4_BASE_URL: "https://cinegram.tv/",
    SITE4_SEARCH_PATH: "/index.php?menu=search&query={query}",
    SITE4_NAME: "Cinegram",
  }, () => {
    const cfg = siteConfigs().find((s) => s.id === 4) as any;
    assert.ok(cfg, "site 4 must be configured");
    assert.equal(cfg.name, "Cinegram");
    assert.equal(cfg.base_url, "https://cinegram.tv");
    const u = new URL(buildSearchUrl(cfg.base_url, cfg.search_path, "Breaking Bad"));
    assert.equal(u.origin + u.pathname, "https://cinegram.tv/index.php");
    assert.equal(u.searchParams.get("menu"), "search");
    assert.equal(u.searchParams.get("query"), "Breaking Bad");
  });
});

// --- Search fix: failed fetches explain themselves (HTTP status / CF block /
// timeout) instead of a generic "unavailable", and never dump raw HTML. ---
t("fetch diagnostics are meaningful and never dump raw HTML", () => {
  const cf = describeFetchFailure(
    403,
    "<html><head><title>Access denied | cinegram.tv used Cloudflare to restrict access</title></head><body><script>x()</script></body></html>",
    "challenge",
  );
  assert.ok(cf.startsWith("HTTP 403 (Cloudflare challenge): "), cf);
  assert.ok(/Access denied/.test(cf));
  assert.ok(!/[<>]/.test(cf));
  assert.equal(describeFetchFailure(521, ""), "HTTP 521");
  assert.equal(describeFetchError({ code: "ECONNABORTED", message: "timeout of 15000ms exceeded" }), "ECONNABORTED: timeout of 15000ms exceeded");
  assert.equal(describeFetchError({ code: "ENOTFOUND" }), "ENOTFOUND");
});

// --- BoredFlix (SITE6): additional provider — config-gated, never exclusive ---
t("BoredFlix joins movie+unknown pools last; exclusive mode ignores it", () => {
  withEnv({ EXCLUSIVE_SITE: "0", SITE6_BASE_URL: "https://boredflix.mobi" }, () => {
    assert.deepEqual(providerSiteIds("movie"), [7, 4, 1, 2, 6]);
    assert.deepEqual(providerSiteIds("unknown"), [7, 4, 5, 1, 2, 3, 6]);
  });
  withEnv({ EXCLUSIVE_SITE: undefined, SITE6_BASE_URL: "https://boredflix.mobi" }, () => {
    assert.deepEqual(providerSiteIds("movie"), [4]); // default flow: Cinegram only
    assert.deepEqual(providerSiteIds("anime"), [5, 3]); // anime pool untouched
  });
  withEnv({ EXCLUSIVE_SITE: "0", SITE6_BASE_URL: "https://boredflix.mobi" }, () => {
    assert.deepEqual(providerSiteIds("movie", "hollywood"), [7, 1]); // origin fallback intact, Cinejoy first
    assert.deepEqual(providerSiteIds("movie", "bollywood"), [7, 2]);
  });
});

t("SITE6 env reads correctly; an empty base disables the slot", () => {
  withEnv({
    SITE6_BASE_URL: "https://boredflix.mobi",
    SITE6_SEARCH_PATH: "/?s={query}",
    SITE6_NAME: "BoredFlix",
  }, () => {
    const cfg = siteConfigs().find((s) => s.id === 6) as any;
    assert.ok(cfg, "site 6 must be configured");
    assert.equal(cfg.name, "BoredFlix");
    assert.equal(cfg.base_url, "https://boredflix.mobi");
    const u = new URL(buildSearchUrl(cfg.base_url, cfg.search_path, "pushpa"));
    assert.equal(u.origin + u.pathname, "https://boredflix.mobi/");
    assert.equal(u.searchParams.get("s"), "pushpa");
  });
  withEnv({ SITE6_BASE_URL: "" }, () => {
    assert.equal(siteConfigs().find((s) => s.id === 6), undefined);
  });
});

t("BoredFlix URL construction encodes spaces, punctuation, non-English", () => {
  assert.equal(buildSearchUrl("https://boredflix.mobi", "/?s={query}", "pushpa"), "https://boredflix.mobi/?s=pushpa");
  const u1 = new URL(buildSearchUrl("https://boredflix.mobi", "/?s={query}", "Dune: Part Two"));
  assert.equal(u1.searchParams.get("s"), "Dune: Part Two");
  assert.ok(/s=Dune%3A(?:%20|\+)Part(?:%20|\+)Two/.test(u1.search), u1.search);
  const u2 = new URL(buildSearchUrl("https://boredflix.mobi", "/?s={query}", "君の名は。"));
  assert.equal(u2.searchParams.get("s"), "君の名は。");
  const u3 = new URL(buildSearchUrl("https://boredflix.mobi", "/?s={query}", "Amélie & Co."));
  assert.equal(u3.searchParams.get("s"), "Amélie & Co.");
});

// --- Card-grid parsing — fixture mirrors BoredFlix's verified live DOM ---
const CARD_PAGE = `<html><body><main><div class="container"><aside class="main"><section>
  <div class="filmlist movies items active">
    <div class="item post-3427 post type-post status-publish format-standard hentry">
      <div class="quality">HD</div>
      <div class="poster"><a href="https://boredflix.mobi/pushpa-2-the-rule/"><img class="lazyload" loading="lazy" src="data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAgA0JaQAA3AA/vv9UAA=" data-src="https://image.tmdb.org/t/p/w600_and_h900_bestv2/1T21FblunT0y8fz7YaW8JMYgUKm.jpg" alt="Pushpa 2 – The Rule"></a></div>
      <div class="meta"><div> <span>2024</span> <span class="type">Movie</span> <span>198 min</span></div><a href="https://boredflix.mobi/pushpa-2-the-rule/">Pushpa 2 – The Rule</a></div>
    </div>
    <div class="item post-11778">
      <div class="poster"><a href="https://boredflix.mobi/breaking-bad/"><img src="data:image/webp;base64,AAA" data-src="https://image.tmdb.org/t/p/w600_and_h900_bestv2/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg" alt="Breaking Bad"></a></div>
      <div class="meta"><div> <span>2008</span> <span class="type">SS 5</span> <span>EP 16</span></div><a href="https://boredflix.mobi/breaking-bad/">Breaking Bad</a></div>
    </div>
  </div></section></aside>
  <aside class="sidebar"><section class="mb-5"><div class="body">
    <div class="item post-999">
      <div class="poster"><a href="https://boredflix.mobi/pushpa-the-rise/"><img data-src="https://img.example/sidebar.jpg" alt="Pushpa: The Rise"></a></div>
      <div class="meta"><div><span>2021</span> <span class="type">Movie</span></div><a href="https://boredflix.mobi/pushpa-the-rise/">Pushpa: The Rise</a></div>
    </div>
  </div></section></aside>
</div></main></body></html>`;

t("BoredFlix cards parse to title/url/poster/year/type (sidebar carousels excluded)", () => {
  const rows = extractCardResults(CARD_PAGE, "https://boredflix.mobi", "pushpa");
  assert.equal(rows.length, 1); // the sidebar carousel card must not leak in
  const r: any = rows[0];
  assert.equal(r.title, "Pushpa 2 – The Rule");
  assert.equal(r.url, "https://boredflix.mobi/pushpa-2-the-rule/");
  assert.equal(r.poster, "https://image.tmdb.org/t/p/w600_and_h900_bestv2/1T21FblunT0y8fz7YaW8JMYgUKm.jpg");
  assert.equal(r.year, "2024");
  assert.equal(r.kind, "movie");

  const series: any[] = extractCardResults(CARD_PAGE, "https://boredflix.mobi", "breaking bad");
  assert.equal(series.length, 1);
  assert.equal(series[0].kind, "series"); // "SS 5" marker — a bare title would say movie
  assert.equal(series[0].year, "2008");
  assert.equal(series[0].poster, "https://image.tmdb.org/t/p/w600_and_h900_bestv2/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg");
});

t("BoredFlix parsing handles missing posters, empty/malformed HTML, junk links", () => {
  assert.deepEqual(extractCardResults(CARD_PAGE, "https://boredflix.mobi", "xqzzt"), []);
  assert.deepEqual(extractCardResults("<div class='item'><div class='poster'><img", "https://boredflix.mobi", "pushpa"), []);
  assert.deepEqual(extractCardResults("", "https://boredflix.mobi", "pushpa"), []);
  const noPoster = `<aside class="main"><div class="item"><div class="poster"></div><div class="meta"><div><span>2026</span><span class="type">Movie</span></div><a href="https://boredflix.mobi/on-the-sea/">On the Sea</a></div></div></aside>`;
  const rows = extractCardResults(noPoster, "https://boredflix.mobi", "on the sea");
  assert.equal(rows.length, 1);
  assert.equal((rows[0] as any).poster, "");
  const offHost = `<aside class="main"><div class="item"><div class="poster"></div><div class="meta"><div><span>2024</span><span class="type">Movie</span></div><a href="https://evil.example/pushpa/">Pushpa</a></div></div></aside>`;
  assert.deepEqual(extractCardResults(offHost, "https://boredflix.mobi", "pushpa"), []);
});

// --- Cinejoy (SITE7): default-first provider in multi mode, never exclusive.
// Its search page is a client-side app querying TMDB in the browser, so the
// backend adapter mirrors that client (TMDB search → Cinejoy page URLs).
t("Cinejoy first for movie/series; an explicit EXCLUSIVE_SITE is never overridden", () => {
  withEnv({ EXCLUSIVE_SITE: "4" }, () => {
    assert.deepEqual(providerSiteIds("movie"), [4]); // configured exclusive provider wins
    assert.deepEqual(providerSiteIds("movie", "hollywood"), [4]);
    assert.deepEqual(providerSiteIds("unknown"), [4]);
  });
  withEnv({ EXCLUSIVE_SITE: "7" }, () => {
    assert.deepEqual(providerSiteIds("movie"), [7]); // Cinejoy CAN be the exclusive provider
  });
  withEnv({ EXCLUSIVE_SITE: "0" }, () => {
    assert.deepEqual(providerSiteIds("movie"), [7, 4, 1, 2, 6]);
    assert.deepEqual(providerSiteIds("unknown"), [7, 4, 5, 1, 2, 3, 6]);
    assert.deepEqual(providerSiteIds("anime"), [5, 3]); // anime untouched
  });
});

t("duplicate titles: Cinejoy sorts first in the merged source list", () => {
  const cid = contentId("movie", "Dune", "2021");
  const flat: any[] = [
    { content_id: cid, result_id: "4:a", title: "Dune (2021)", year: "2021", type: "movie", site_id: 4, site_name: "Cinegram", url: "https://cinegram.tv/dune", match: 70 },
    { content_id: cid, result_id: "7:b", title: "Dune (2021)", year: "2021", type: "movie", site_id: 7, site_name: "Cinejoy", url: "https://cinejoy.pk/movie/438631-dune-2021", match: 70 },
  ];
  const g = groupByContent(flat, "movie");
  assert.equal(g.length, 1);
  assert.deepEqual(g[0].sources.map((s) => s.site_id), [7, 4]);
  assert.equal(g[0].result_id, "7:b"); // preferred source = the Cinejoy card
});

t("SITE7 env reads correctly and builds the Cinejoy search URL", () => {
  withEnv({
    SITE7_BASE_URL: "https://cinejoy.pk/",
    SITE7_SEARCH_PATH: "/search?q={query}",
    SITE7_NAME: "Cinejoy",
  }, () => {
    const cfg = siteConfigs().find((s) => s.id === 7) as any;
    assert.ok(cfg, "site 7 must be configured");
    assert.equal(cfg.name, "Cinejoy");
    assert.equal(cfg.base_url, "https://cinejoy.pk");
    const u = new URL(buildSearchUrl(cfg.base_url, cfg.search_path, "Pushpa 2"));
    assert.equal(u.origin + u.pathname, "https://cinejoy.pk/search");
    assert.equal(u.searchParams.get("q"), "Pushpa 2");
  });
  withEnv({ SITE7_BASE_URL: "" }, () => {
    assert.equal(siteConfigs().find((s) => s.id === 7), undefined);
  });
});

t("Cinejoy search URL construction encodes spaces, punctuation, non-English", () => {
  assert.equal(buildSearchUrl("https://cinejoy.pk", "/search?q={query}", "pushpa"), "https://cinejoy.pk/search?q=pushpa");
  const u1 = new URL(buildSearchUrl("https://cinejoy.pk", "/search?q={query}", "Dune: Part Two"));
  assert.equal(u1.searchParams.get("q"), "Dune: Part Two");
  assert.ok(/q=Dune%3A(?:%20|\+)Part(?:%20|\+)Two/.test(u1.search), u1.search);
  const u2 = new URL(buildSearchUrl("https://cinejoy.pk", "/search?q={query}", "君の名は。"));
  assert.equal(u2.searchParams.get("q"), "君の名は。");
  const u3 = new URL(buildSearchUrl("https://cinejoy.pk", "/search?q={query}", "Amélie & Co."));
  assert.equal(u3.searchParams.get("q"), "Amélie & Co.");
});

t("Cinejoy TMDB mapping: movie/tv URLs, slug, poster/year, junk dropped", () => {
  const site = { id: 7, name: "Cinejoy", base_url: "https://cinejoy.pk" };
  const items = [
    { id: 1020818, kind: "movie", title: "Pushpa 2: The Rule", year: "2024", poster: "https://image.tmdb.org/t/p/w500/x.jpg", overview: "…" },
    { id: 37854, kind: "tv", title: "One Piece", year: "1999", poster: "https://image.tmdb.org/t/p/w500/op.jpg" },
    { id: 1020818, kind: "movie", title: "Pushpa 2: The Rule", year: "2024" }, // duplicate id → deduped
    { id: 0, kind: "movie", title: "Broken", year: "2020" }, // no valid id
    { id: 9, kind: "person", title: "Someone" }, // people never surface
    { id: 11, kind: "movie", title: "", year: "2020" }, // no title
    { id: 12, kind: "movie", title: "No Year Movie", year: "", poster: "not-a-url" },
  ];
  const rows = cinejoyResultsFromTmdb(items as any, site, "pushpa", 10);
  assert.equal(rows.length, 3);
  assert.equal(rows[0].url, "https://cinejoy.pk/movie/1020818-pushpa-2-the-rule-2024");
  assert.equal(rows[0].kind, "movie");
  assert.equal(rows[0].poster, "https://image.tmdb.org/t/p/w500/x.jpg");
  assert.equal(rows[0].year, "2024");
  assert.equal(rows[0].site_id, 7);
  assert.equal(rows[0].site_name, "Cinejoy");
  assert.ok(rows[0].score > 0);
  assert.equal(rows[1].url, "https://cinejoy.pk/series/37854-one-piece-1999");
  assert.equal(rows[1].kind, "series");
  assert.equal(rows[2].url, "https://cinejoy.pk/movie/12-no-year-movie");
  assert.equal(rows[2].poster, "");
  assert.equal(rows[2].year, "");
  assert.equal(cinejoySlug("Amélie & Co."), "amelie-co");
});

t("Cinejoy page → watch URL: movies, episodes, slug-cosmetic, passthrough", () => {
  assert.equal(cinejoyWatchUrlFromSource("https://cinejoy.pk/movie/969681-spider-man-brand-new-day-2026"), "https://cinejoy.pk/watch/movie/969681");
  assert.equal(cinejoyWatchUrlFromSource("https://cinejoy.pk/movie/969681"), "https://cinejoy.pk/watch/movie/969681");
  assert.equal(cinejoyWatchUrlFromSource("https://cinejoy.pk/series/37854-one-piece-1999", 1, 1), "https://cinejoy.pk/watch/tv/37854/1/1");
  assert.equal(cinejoyWatchUrlFromSource("https://cinejoy.pk/series/37854-one-piece-1999", 2, 5), "https://cinejoy.pk/watch/tv/37854/2/5");
  assert.equal(cinejoyWatchUrlFromSource("https://cinejoy.pk/series/37854-one-piece-1999"), "https://cinejoy.pk/watch/tv/37854/1/1"); // site default: S1E1
  assert.equal(cinejoyWatchUrlFromSource("https://cinejoy.pk/watch/tv/1399-game-of-thrones/1/2"), "https://cinejoy.pk/watch/tv/1399/1/2");
  assert.equal(cinejoyWatchUrlFromSource("https://cinejoy.pk/watch/movie/969681"), "https://cinejoy.pk/watch/movie/969681");
  assert.equal(cinejoyWatchUrlFromSource("https://cinejoy.pk/lists"), null);
  assert.equal(cinejoyWatchUrlFromSource("not a url"), null);
});

t("cinejoy episode keys are S/E-scoped; non-cinejoy hosts untouched", () => {
  withEnv({ WATCH_CINEJOY_HOSTS: "cinejoy.pk" }, () => {
    assert.ok(isCinejoy("https://cinejoy.pk/series/37854-one-piece-1999"));
    assert.ok(isCinejoy("https://www.cinejoy.pk/movie/969681-x"));
    assert.ok(!isCinejoy("https://cinegram.tv/tv/9488-breaking-bad"));
    const url = "https://cinejoy.pk/series/37854-one-piece-1999";
    assert.notEqual(resolveKey(url, 1, 1), resolveKey(url, 1, 2));
    assert.equal(resolveKey(url, 1, 2), resolveKey(url, 1, 2));
    const movie = "https://cinejoy.pk/movie/969681-spider-man-brand-new-day-2026";
    assert.equal(resolveKey(movie), resolveKey(movie));
    const vega = "https://vegamovies.gallery/download-breaking-bad-s01";
    assert.equal(resolveKey(vega, 1, 2), resolveKey(vega));
  });
});

async function withEnvAsync(vars: Record<string, string | undefined>, fn: () => Promise<any>) {
  const saved = new Map<string, string | undefined>();
  for (const k of Object.keys(vars)) {
    saved.set(k, process.env[k]);
    const v = vars[k];
    if (v === undefined) delete process.env[k];
    else process.env[k] = v;
  }
  try { return await fn(); } finally {
    for (const [k, v] of saved) { if (v === undefined) delete process.env[k]; else process.env[k] = v; }
  }
}

// --- Async error paths: named statuses, graceful (no network) ---
{
  const nb: any = await withEnvAsync({ SITE6_BASE_URL: undefined }, () => searchSites("pushpa", [6], undefined, { group: "movie" }));
  assert.equal(nb.status, "not_configured");
  console.log(`ok ${++n} - unconfigured BoredFlix slot → not_configured (graceful)`);
  const dis: any = await withEnvAsync({ SITE_SEARCH_ENABLED: "false" }, () => searchSites("pushpa", [6], undefined, { group: "movie" }));
  assert.equal(dis.status, "disabled");
  console.log(`ok ${++n} - SITE_SEARCH_ENABLED=false → disabled (graceful)`);

  // Cinejoy fallback: no TMDB key → the Cinejoy slot degrades to a concrete,
  // self-diagnosing "unavailable" (never a generic failure, never throws).
  const noKey: any = await withEnvAsync(
    { SITE7_BASE_URL: "https://cinejoy.pk", SITE7_NAME: "Cinejoy", TMDB_API_KEY: undefined },
    () => searchSites("cinejoy-no-key-fixture", [7], undefined, { group: "movie" }),
  );
  assert.equal(noKey.status, "unavailable");
  assert.ok(/TMDB_API_KEY not set/.test(String(noKey.error || "")), JSON.stringify(noKey));
  assert.ok(
    Array.isArray(noKey.per_site) && noKey.per_site.some((p: any) => p.site === "Cinejoy" && p.status === "unavailable"),
    JSON.stringify(noKey.per_site),
  );
  console.log(`ok ${++n} - Cinejoy without TMDB key → unavailable with concrete reason (graceful)`);

  const noCfg: any = await withEnvAsync({ SITE7_BASE_URL: undefined }, () => searchSites("pushpa", [7], undefined, { group: "movie" }));
  assert.equal(noCfg.status, "not_configured");
  console.log(`ok ${++n} - unconfigured Cinejoy slot → not_configured (graceful)`);

  // LITE deployments have the browser lanes off; a configured Cinejoy must
  // still degrade gracefully — search included — instead of surfacing cards
  // that could never play.
  const lite: any = await withEnvAsync(
    { SITE7_BASE_URL: "https://cinejoy.pk", SITE7_NAME: "Cinejoy", TMDB_API_KEY: "test-key", LITE_MODE: "1" },
    () => searchSites("cinejoy-lite-fixture", [7], undefined, { group: "movie" }),
  );
  assert.equal(lite.status, "unavailable");
  assert.ok(/lite mode/.test(String(lite.error || "")), JSON.stringify(lite));
  console.log(`ok ${++n} - LITE deployment → Cinejoy unavailable (browser lanes off, graceful)`);
}

console.log(`\nAll ${n} provider-routing tests passed.`);
