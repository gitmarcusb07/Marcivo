// Per-quality option extraction + audio labels (no network).
// Run: npx tsx tests/qualities.test.ts
import { strict as assert } from "assert";
import { extractQualityOptions, audioLabel, pageAudioHint, isSafePublicUrl } from "../src/qualities.js";
import { vegamoviesEmbedUrlFromHtml, isPlaydriveSite, isVegamovies } from "../src/resolver.js";

let n = 0;
const t = (name: string, fn: () => void) => { fn(); n++; console.log(`ok ${n} - ${name}`); };

const ROG = `<html><head><title>Download Vibe (2026) Hindi Full Movie 480p 720p 1080p WEB-DL</title></head><body>
<h1>Vibe (2026) Hindi Full Movie</h1>
<p><a class="maxbutton" href="https://playdrive.vip/e/AQJvat4ACYC2uw">Watch Online</a></p>
<h5>Vibe (2026) Hindi 480p x264 [360MB]</h5><p><a href="https://nexdrive.lol/genxfm1/aaa"><button>Download Now</button></a></p>
<h5>Vibe (2026) Hindi 720p x264 [1.4GB]</h5><p><a href="https://nexdrive.lol/genxfm1/bbb"><button>Download Now</button></a></p>
<h5>Vibe (2026) Hindi 1080p x264 [3.1GB]</h5><p><a href="https://nexdrive.lol/genxfm1/ccc"><button>Download Now</button></a>
<a href="https://vcloud.lol/ccc2">V-Cloud</a></p>
<h5>Vibe (2026) Hindi 1080p HQ H.264 [6.1GB]</h5><p><a href="https://nexdrive.lol/genxfm1/ddd"><button>Download Now</button></a></p>
<p><a href="https://t.me/rogmovies">Join Telegram</a></p></body></html>`;

t("extracts all four RogMovies qualities in page order", () => {
  const o = extractQualityOptions(ROG, "https://rogmovies.autos/download-vibe/");
  assert.deepEqual(o.map((x) => x.label), ["480p · 360MB", "720p · 1.4GB", "1080p · 3.1GB", "1080p HQ · 6.1GB"]);
  assert.deepEqual(o.map((x) => x.height), [480, 720, 1080, 1080]);
  assert.equal(o[0].audio, "Hindi");
  assert.deepEqual(o[2].interUrls, ["https://nexdrive.lol/genxfm1/ccc", "https://vcloud.lol/ccc2"]);
});

t("label taken from button text when present; sibling audio variants distinguished", () => {
  const html = `<a href="https://nexdrive.lol/x/1">Hindi 720p [1GB]</a>
    <a href="https://nexdrive.lol/x/2">Dual Audio [Hindi ORG + Tamil] 720p [1.3GB]</a>`;
  const o = extractQualityOptions(html, "https://rogmovies.autos/p/");
  assert.equal(o.length, 2);
  assert.equal(o[0].audio, "Hindi");
  assert.equal(o[1].audio, "Dual Audio (Hindi + Tamil)");
});

t("audio labels", () => {
  assert.equal(audioLabel("Hindi-English"), "Hindi + English");
  assert.equal(audioLabel("DUAL AUDIO [Hindi ORG + English]"), "Dual Audio (Hindi + English)");
  assert.equal(audioLabel("hin"), "Hindi");
  assert.equal(audioLabel(""), null);
});

t("pageAudioHint", () => {
  const html = "<h1>Sample Title (2026) Hindi-English 480p 720p 1080p</h1>";
  assert.equal(pageAudioHint(html), "Hindi + English");
  assert.equal(pageAudioHint("<h1>Sample Title 1080p</h1>"), null);
});

t("isSafePublicUrl blocks private/loopback/non-http targets", () => {
  assert.equal(isSafePublicUrl("https://example.com/a.mp4"), true);
  assert.equal(isSafePublicUrl("http://127.0.0.1/x"), false);
  assert.equal(isSafePublicUrl("http://10.0.0.5/x"), false);
  assert.equal(isSafePublicUrl("http://192.168.1.2/x"), false);
  assert.equal(isSafePublicUrl("http://169.254.169.254/latest"), false);
  assert.equal(isSafePublicUrl("http://localhost:3000/"), false);
  assert.equal(isSafePublicUrl("file:///etc/passwd"), false);
  assert.equal(isSafePublicUrl("not a url"), false);
});

t("RogMovies page: playdrive embed extracted, site recognised as playdrive", () => {
  assert.equal(vegamoviesEmbedUrlFromHtml(ROG), "https://playdrive.vip/e/AQJvat4ACYC2uw");
  assert.equal(isPlaydriveSite("https://rogmovies.autos/download-vibe-2026-hindi-full-movie-480p-720p-1080p-web-dl/"), true);
  assert.equal(isPlaydriveSite("https://vegamovies.lease/download-x/"), true);
  assert.equal(isVegamovies("https://rogmovies.autos/download-x/"), false);
  assert.equal(isPlaydriveSite("https://example.com/x"), false);
});
