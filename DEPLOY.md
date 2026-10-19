# Deploying Marcivo as a website (free, no credit card)

Two pieces:

| Piece | Host | Plan limits |
|---|---|---|
| `backend/` (Express API) | **Render** — Hobby free web service | 0.1 vCPU, 512 MB RAM, sleeps after 15 min idle, ~60 s cold start, 750 instance-hours/mo |
| `frontend/` (Vite/React site) | **Cloudflare** — Worker with static assets | Unlimited bandwidth, no sleep |

Live URLs:
- `https://marcivo-backend.onrender.com` — API
- `https://marcivo.teraplayer.in` — the website
- `https://marcivo.pages.dev` — spare deployment in the other Cloudflare account

## Why LITE_MODE exists

The full local build (Playwright/Chromium fallback, python bot bridge, ffmpeg
HLS, video proxying) needs a real server. The free Render instance can't host
any of that, so `LITE_MODE=1` runs a reduced profile:

| Feature | Full (local) | LITE (deployed) |
|---|---|---|
| Home/search/detail (TMDB + AniList) | ✅ | ✅ |
| Site search + HTTP resolve lanes (fast-path, G-Direct) | ✅ | ✅ |
| Playwright browser fallback | ✅ | ❌ (skip — try another version) |
| Python bot bridge | ✅ | ❌ |
| Seekable upgrade | ✅ | ❌ (plays direct; seek restarts on some links) |
| Multi-audio / quality HLS | ✅ | ❌ (default audio only) |
| Video proxy retry | ✅ | ❌ (video streams straight from the source) |

Local dev is unchanged: `LITE_MODE` off, everything works as before.

## 1. Backend → Render (already done)

1. **New → Blueprint** → point at this repo. It reads `render.yaml` and
   creates `marcivo-backend`.
2. Environment tab — fill the `sync: false` vars from `backend/.env.example`:
   - `TMDB_API_KEY` (required)
   - `FRONTEND_ORIGIN` — comma-separated, **no trailing slashes**:
     `https://marcivo.pages.dev,https://watch.yourdomain.com`
   - `SITE1..5_BASE_URL` / `SITE1..5_SEARCH_PATH`
3. Check `https://marcivo-backend.onrender.com/health` →
   `{"ok":true,...,"lite":true}`.

## 2. Frontend → Cloudflare (Worker with static assets)

**Workers & Pages → Create → Connect a repository** → `gitmarcus07/Marcivo`, then:

- Build command: `cd frontend && npm install && npm run build`
- Deploy command: `npx wrangler deploy`
- Preview command: `npx wrangler pages dev dist` *(only used if preview builds are on)*
- Enable Preview builds: off
- Environment variables (Production **and** Preview):
  - `VITE_API` = `https://marcivo-backend.onrender.com`
  - `VITE_ADS_ENABLED` = `1`

The repo's **root `wrangler.toml`** does the rest: it points the Worker at
`./frontend/dist` and sets `not_found_handling = "single-page-application"`,
so deep links (`/detail/movie/603`, `/watch/...`) return `index.html` and
React Router takes over. That replaces the old `public/_redirects` rule,
which Workers' asset server rejects as an infinite loop — the file is gone on
purpose, don't re-add it.

The site is live at the `marcivo.<workers.dev>` URL Cloudflare assigns — that
URL keeps working even after you attach your own domain.

> Git integration needs one-time permission for the repo. Prefer no Git
> connection? Deploy straight from your machine instead:
> ```
> cd frontend && npm run build && cd ..
> npx wrangler deploy
> ```
> (the **root** `wrangler.toml` is what the deploy reads — `frontend/wrangler.toml`
> is only for the legacy Pages flavor.)

## 3. Add your own subdomain

Your live domain is **`marcivo.teraplayer.in`**. Two hard rules learned the
hard way:

- **The domain must live in the same Cloudflare account as the project.**
  `teraplayer.in` is in the `Tgbot9878` account (the one with the tunnel and
  the Marcivo project) — keep it there. Moving it to another account breaks
  `api.teraplayer.in`, because a Cloudflare Tunnel is bound to the account
  that created it (Error 1033).
- Nameservers for `teraplayer.in` stay at `ricardo` / `rosa`.

With that in place:

1. **Workers & Pages → `marcivo` → Domains → Set up a custom domain**
2. Pick `teraplayer.in`, type `marcivo` → activates `marcivo.teraplayer.in`
3. Cloudflare creates the DNS record and issues TLS itself — no CNAME to copy
4. Render → `marcivo-backend` → Environment → **`FRONTEND_ORIGIN`**:
   ```
   https://marcivo.teraplayer.in,https://marcivo.pages.dev
   ```
   (comma separated, no trailing slashes) → Save. The API only answers CORS
   requests from origins on that list; skipping this is the #1 reason "the
   site loads but nothing fetches" after adding a domain.
5. Update the canonical URL in `frontend/index.html`
   (`<link rel="canonical">` and `og:url`) to `https://marcivo.teraplayer.in/`,
   then redeploy so search engines index the real address.

## 4. Ads

Five ad slots are already placed (header, home, category, detail, footer).
Paste your Adstra/Adsterra code into `frontend/src/ads/config.ts` and
redeploy — see [ADS.md](ADS.md).

## 5. SEO surfaces

- **Worker head pre-render** (`worker.js` + `run_worker_first` in
  `wrangler.toml`): `/free-movies`, `/watch-free`, `/upcoming*`,
  `/category/*` and `/detail/*` return the SPA shell with title, description,
  canonical and OG tags pre-filled, so crawlers and social scrapers that
  don't run JavaScript read the right page. Detail meta comes from the
  backend detail API — edge-cached 6 h with a 2.5 s timeout, so a cold
  Render instance just gets the plain shell.
- **Copy lives twice**: the Worker's `seoPages()` map and each page's
  `<Seo>` component must stay in sync when copy changes.
- **`/sitemap.xml`** is generated by the backend and edge-cached by the
  Worker, which falls back to a static core list if the backend is down.
  **`/robots.txt`** is served by the Worker (disallows `/watch/` and `/api/`).
- **Social image**: `frontend/public/og.png` (1200×630) is the default
  `og:image`/`twitter:image`; detail pages swap in the title's poster.
  Regenerate it after brand-copy changes: `cd backend && node scripts/og-image.mjs`.
  Favicon/PWA icons (`icon-192/512`, `apple-touch-icon`, `favicon-48`)
  regenerate with `node scripts/site-icons.mjs`.

## Gotchas

- **Cold start**: Render sleeps after 15 min idle; the first request takes
  ~60 s. The frontend already waits up to 90 s and shows the real error while
  it wakes.
- **Bandwidth**: LITE mode never proxies video bytes through Render, so the
  5 GB/mo cap doesn't apply — the player streams from the source directly.
- **CORS**: backend allows only the origins in `FRONTEND_ORIGIN`. New domain
  = new entry in that list, plus a Render restart.
- **Env changes need a rebuild**: `VITE_*` values are compiled into the JS
  bundle. Saving an env var in Pages does nothing until the next build —
  trigger one with **Retry deployment** or any push.
- **Cinejoy (site 7) is off by design in LITE**: its stream URL exists only
  inside the site's own obfuscated player, so playback needs the Playwright
  lanes, and the search slot self-disables under LITE (no unplayable cards).
  To enable it on a bigger instance: `LITE_MODE=0`, set `SITE7_*`, install
  Chromium in the build (`npm ci && npx playwright install chromium`) with
  `PLAYWRIGHT_BROWSERS_PATH=/opt/render/project/.cache/playwright` — native
  builds don't keep `~/.cache`.
- **A version that won't play**: that source needs a browser lane
  (Playwright), which LITE can't run — pick another quality; HTTP-lane
  sources play fine.
- **The Android app is gone**: `frontend/android/` and the Capacitor config
  were removed when this became a website. They're still in git history if
  you ever want the APK back.
