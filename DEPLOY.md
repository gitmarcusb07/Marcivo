# Deploying Marcivo as a website (free, no credit card)

Two pieces:

| Piece | Host | Plan limits |
|---|---|---|
| `backend/` (Express API) | **Render** — Hobby free web service | 0.1 vCPU, 512 MB RAM, sleeps after 15 min idle, ~60 s cold start, 750 instance-hours/mo |
| `frontend/` (Vite/React site) | **Cloudflare Pages** | Unlimited bandwidth, no sleep |

Live URLs:
- `https://marcivo-backend.onrender.com` — API
- `https://marcivo.pages.dev` — the website (Pages gives you this automatically)
- plus your own subdomain (below), e.g. `https://watch.yourdomain.com`

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

## 2. Frontend → Cloudflare Pages

**Workers & Pages → Create → Pages → Connect to Git**, then:

- Root directory: `frontend`
- Framework preset: **Vite**
- Build command: `npm install && npm run build`
- Build output directory: `dist`

Environment variables (build-time, both live under Settings → Environment
variables → Production **and** Preview):

| Key | Value |
|---|---|
| `VITE_API` | `https://marcivo-backend.onrender.com` (no trailing slash) |
| `VITE_ADS_ENABLED` | `1` |
| `VITE_AD_LOADER_SRC` | *(optional — network loader URL; slot code goes in `src/ads/config.ts`, see [ADS.md](ADS.md))* |

Deploy. `public/_redirects` already rewrites every path to `index.html`, so
deep links (`/detail/movie/603`, `/watch/...`) survive a browser reload.

The site is live at **`https://marcivo.pages.dev`** immediately.

> Git integration needs one-time permission for the repo. Prefer no Git
> connection? Deploy straight from your machine instead:
> ```
> cd frontend
> npm run build
> npx wrangler pages deploy dist
> ```
> (`frontend/wrangler.toml` already points at the right output folder.)

## 3. Add your own subdomain

You already host two sites on Cloudflare, so your DNS is already there — the
custom domain costs nothing and hides the `pages.dev` name.

1. Cloudflare dashboard → **Workers & Pages** → `marcivo` → **Custom domains**
   → **Set up a custom domain**.
2. Enter the subdomain you want, e.g. `watch.yourdomain.com`
   (pick whichever of your two domains should carry it).
3. Cloudflare creates the DNS record and issues the TLS certificate itself —
   no CNAME to copy, usually live in under a minute.
4. Go back to Render and **add that domain to `FRONTEND_ORIGIN`** (comma
   separated, alongside `https://marcivo.pages.dev`). The API only answers
   CORS requests from origins on that list, and skipping this step is the #1
   reason "the site loads but nothing fetches" after adding a domain.
5. Commit the canonical URL in `frontend/index.html`
   (`<link rel="canonical">` and `og:url`) to your new subdomain, then
   redeploy so search engines index the real address.

`marcivo.pages.dev` keeps working alongside it — both can point at the same
project.

## 4. Ads

Five ad slots are already placed (header, home, category, detail, footer).
Paste your Adstra/Adsterra code into `frontend/src/ads/config.ts` and
redeploy — see [ADS.md](ADS.md).

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
- **A version that won't play**: that source needs a browser lane
  (Playwright), which LITE can't run — pick another quality; HTTP-lane
  sources play fine.
- **The Android app is gone**: `frontend/android/` and the Capacitor config
  were removed when this became a website. They're still in git history if
  you ever want the APK back.
