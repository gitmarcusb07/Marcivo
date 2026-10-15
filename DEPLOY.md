# Deploying Marcivo for free (no credit card)

Two pieces, both on free tiers that don't ask for a card:

| Piece | Host | Plan limits |
|---|---|---|
| `backend/` (Express) | **Render** — Hobby free web service | 0.1 vCPU, 512 MB RAM, spins down after 15 min idle, ~60 s cold start, 750 instance-hours/mo |
| `frontend/` (Vite/React) | **Cloudflare Pages** | Unlimited bandwidth, no sleep |

## Why LITE_MODE exists

The full app (Playwright/Chromium fallback, python bot bridge, ffmpeg HLS,
video proxying) needs a real server. The free tier can't host any of that, so
`LITE_MODE=1` runs a reduced profile:

| Feature | Full (local) | LITE (deployed) |
|---|---|---|
| Home/search/detail (TMDB + AniList) | ✅ | ✅ |
| Site search + HTTP resolve lanes (fast-path, G-Direct) | ✅ | ✅ |
| Playwright browser fallback | ✅ | ❌ (skipped — try another version) |
| Python bot bridge | ✅ | ❌ |
| Seekable upgrade | ✅ | ❌ (plays direct, seek restarts on some links) |
| Multi-audio / quality HLS | ✅ | ❌ (default audio only) |
| Video proxy retry | ✅ | ❌ (video streams directly from the source) |

Local dev is unchanged: `LITE_MODE` is unset/off, everything works as before.

## 1. Backend → Render

1. Push this repo to GitHub (Render connects to Git).
2. Render dashboard → **New → Blueprint** → pick the repo. It reads
   `render.yaml` (root of the repo) and creates `marcivo-backend`.
3. In the service's **Environment** tab, fill the `sync: false` vars from
   `backend/.env.example`:
   - `TMDB_API_KEY` (required)
   - `FRONTEND_ORIGIN` = your Pages URL, e.g. `https://marcivo.pages.dev` (no trailing slash)
   - `SITE1..5_BASE_URL` / `SITE1..5_SEARCH_PATH` (copy from `backend/.env.example`)
4. Deploy. Check `<your-app>.onrender.com/health` → `{"ok":true,...,"lite":true}`.

Notes:
- First deploy is slow (npm ci); subsequent ones ~2-3 min.
- The service sleeps after 15 min idle. First request wakes it (~60 s) —
  the app already polls resolves every 2 s, so just tap Watch and wait once.
- Sleep wipes the local filesystem. Fine here: LITE mode has no `HLS_CACHE`,
  and all resolver state is in-memory cache anyway (worst case: re-resolve).

## 2. Frontend → Cloudflare Pages

1. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
2. Build settings:
   - Framework preset: **Vite**
   - Build command: `cd frontend && npm install && npm run build`
   - Build output directory: `frontend/dist`
3. Environment variables (build-time):
   - `VITE_API` = `https://<your-app>.onrender.com` (no trailing slash)
4. Deploy. `frontend/public/_redirects` is already in place so router paths
   (`/watch/...`, `/detail/...`) survive reloads.

After the first Pages deploy, go back to Render and set `FRONTEND_ORIGIN` to
the final Pages URL (it changes if you rename the project).

## 3. Update the Android app (optional)

`frontend/android/` (Capacitor) bakes `VITE_API` at build time. To point the
app at the deployed backend: set `frontend/.env` → `VITE_API=https://<your-app>.onrender.com`,
then rebuild the bundle (`npm run build` + `npx cap sync`).

## Gotchas

- **Bandwidth**: LITE mode never proxies video bytes through Render, so the
  5 GB/mo concern doesn't apply — the player streams from the source directly.
  Metadata/search traffic is tiny.
- **CORS**: backend allows only `FRONTEND_ORIGIN`. If the frontend fetch
  fails with a CORS error right after deploy, re-check that var.
- **Rebuild on env change**: `VITE_API` is compiled into the JS bundle —
  changing it means a Pages rebuild, not just an env save.
- **If a version won't play**: that site needs a browser lane (Playwright).
  LITE can't run it — pick another quality/version; HTTP-lane sources play fine.
