// Renders the site favicon/PWA/logo icons into frontend/public from the
// brand mark (same artwork as m-logo.svg), so browsers, Android/iOS home
// screens and Google's search results all have proper raster sizes.
// Run from backend/:  node scripts/site-icons.mjs
import { chromium } from "playwright";
import { fileURLToPath } from "node:url";

const svg = `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="r" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FF2A33" />
      <stop offset="55%" stop-color="#E50914" />
      <stop offset="100%" stop-color="#A3060E" />
    </linearGradient>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fff" stop-opacity=".38" />
      <stop offset="45%" stop-color="#fff" stop-opacity="0" />
    </linearGradient>
    <clipPath id="c"><path d="M13,8 H23 L32,32 L41,8 H51 V56 H42 V30 L32,50 L22,30 V56 H13 Z" /></clipPath>
  </defs>
  <rect width="64" height="64" rx="14" fill="#0B0B0E" />
  <polygon points="8,12 13,8 13,56 8,52" fill="#6E040A" />
  <polygon points="56,12 51,8 51,56 56,52" fill="#6E040A" />
  <path d="M13,8 H23 L32,32 L41,8 H51 V56 H42 V30 L32,50 L22,30 V56 H13 Z" fill="url(#r)" />
  <rect width="64" height="64" fill="url(#g)" clip-path="url(#c)" />
</svg>`;

const targets = [
  { file: "icon-512.png", size: 512 },
  { file: "icon-192.png", size: 192 },
  { file: "apple-touch-icon.png", size: 180 },
  { file: "favicon-48.png", size: 48 },
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 512, height: 512 } });
for (const t of targets) {
  const out = fileURLToPath(new URL(`../../frontend/public/${t.file}`, import.meta.url));
  await page.setViewportSize({ width: t.size, height: t.size });
  await page.setContent(
    `<!doctype html><html><head><style>
       html, body { margin: 0; width: 100%; height: 100%; background: transparent; }
       svg { display: block; width: 100vw; height: 100vh; }
     </style></head><body>${svg}</body></html>`
  );
  await page.screenshot({ path: out, omitBackground: true });
  console.log(`wrote ${t.file} (${t.size}x${t.size})`);
}
await browser.close();
