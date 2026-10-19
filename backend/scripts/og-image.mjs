// Renders frontend/public/og.png (1200×630) — the social-preview card used
// by og:image / twitter:image. Run from backend/:  node scripts/og-image.mjs
// Needs Playwright's Chromium (already a backend dependency).
import { chromium } from "playwright";
import { fileURLToPath } from "node:url";

const out = fileURLToPath(new URL("../../frontend/public/og.png", import.meta.url));

const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 1200px; height: 630px; overflow: hidden; }
  body { background: #0B0B0E; color: #fff; font-family: Inter, "Segoe UI", Arial, sans-serif; }
  .stage { position: relative; width: 1200px; height: 630px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 24px; }
  .glow-a { position: absolute; left: 50%; top: -420px; width: 1200px; height: 900px; transform: translateX(-50%); background: radial-gradient(closest-side, rgba(229,9,20,.5), rgba(229,9,20,0) 72%); }
  .glow-b { position: absolute; right: -260px; bottom: -420px; width: 860px; height: 860px; border-radius: 50%; background: radial-gradient(closest-side, rgba(229,9,20,.32), rgba(229,9,20,0)); }
  .mark { width: 104px; height: 104px; border-radius: 26px; background: #101014; border: 1px solid rgba(255,255,255,.14); display: flex; align-items: center; justify-content: center; box-shadow: 0 24px 70px rgba(229,9,20,.35); }
  .mark svg { width: 72px; height: 72px; }
  h1 { font-family: "Bebas Neue", Impact, "Arial Narrow", sans-serif; font-size: 170px; line-height: .88; letter-spacing: 16px; text-indent: 16px; font-weight: 400; }
  .tag { font-size: 30px; color: #C7C7CE; font-weight: 600; letter-spacing: .4px; }
  .pill { margin-top: 8px; background: linear-gradient(180deg, #FF2A33, #D30812); font-size: 25px; font-weight: 700; padding: 16px 38px; border-radius: 999px; box-shadow: 0 18px 50px rgba(229,9,20,.4); }
</style>
</head>
<body>
  <div class="stage">
    <div class="glow-a"></div>
    <div class="glow-b"></div>
    <div class="mark">
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="r" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#FF2A33" />
            <stop offset="55%" stop-color="#E50914" />
            <stop offset="100%" stop-color="#A3060E" />
          </linearGradient>
        </defs>
        <polygon points="8,12 13,8 13,56 8,52" fill="#6E040A" />
        <polygon points="56,12 51,8 51,56 56,52" fill="#6E040A" />
        <path d="M13,8 H23 L32,32 L41,8 H51 V56 H42 V30 L32,50 L22,30 V56 H13 Z" fill="url(#r)" />
      </svg>
    </div>
    <h1>MARCIVO</h1>
    <div class="tag">Movies &middot; Web Series &middot; Anime</div>
    <div class="pill">Every available version — one search. Free. No account needed.</div>
  </div>
</body>
</html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: out });
await browser.close();
console.log(`og.png written -> ${out}`);
