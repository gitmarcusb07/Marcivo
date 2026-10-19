// Exclusive-provider routing + Cinegram embed/cache unit tests (no network).
// Run: npx tsx tests/provider-routing.test.ts
import { strict as assert } from "assert";
import { exclusiveSiteId, providerSiteIds, isCatalogExact } from "../src/identity.js";
import { cinegramEmbedUrlFromHtml, resolveKey } from "../src/resolver.js";

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

// --- Restore path: a deliberate config change brings the old routing back ---
t("EXCLUSIVE_SITE=0 restores legacy routing (other integrations intact)", () => {
  withEnv({ EXCLUSIVE_SITE: "0", HOLLYWOOD_SITES: "1", BOLLYWOOD_SITES: "2" }, () => {
    assert.equal(exclusiveSiteId(), 0);
    assert.deepEqual(providerSiteIds("movie"), [4, 1, 2]);
    assert.deepEqual(providerSiteIds("movie", "hollywood"), [1]);
    assert.deepEqual(providerSiteIds("movie", "bollywood"), [2]);
    assert.deepEqual(providerSiteIds("anime"), [5, 3]);
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

console.log(`\nAll ${n} provider-routing tests passed.`);
