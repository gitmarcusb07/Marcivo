# Marcivo — movie, series & anime website

A Netflix-style **website**: browse trending movies, web series and anime,
see every available version of a title, press play. React + Vite frontend on
Cloudflare Pages, Express API on Render, TMDB + AniList metadata, site index
search + resolver for playable versions.

## Run it locally

```bash
# 1. API  (port 3001)
cd backend
copy .env.example .env     # fill TMDB_API_KEY + SITE1..5
npm install
npx playwright install chromium
npm run dev

# 2. Site  (port 5173) — new terminal
cd frontend
copy .env.example .env     # VITE_API=http://localhost:3001
npm install
npm run dev
```

Open http://localhost:5173.

## Flow

Home (Movies / Anime) → Detail (TMDB / AniList + *Available versions* from
`/api/site-search`) → Watch (pick a version → `POST /api/resolve` → poll →
autoplay).

Routes: `/` · `/category/:cat` · `/search` · `/detail/:kind/:id` ·
`/watch/:kind/:id` · `/status`

## Ads

Five named slots (header, home, category, detail, footer) are placed and
sized already. Paste your Adstra/Adsterra snippet into
`frontend/src/ads/config.ts`, set `VITE_ADS_ENABLED=1`, redeploy.
Full walkthrough: [ADS.md](ADS.md).

## Deploy

Website on Cloudflare Pages (`marcivo.pages.dev` + your own subdomain), API on
Render. Step-by-step: [DEPLOY.md](DEPLOY.md).

## Notes

- TMDB key stays server-side in `backend/.env`.
- AniList needs no key (GraphQL https://graphql.anilist.co).
- Resolver: fast HTTP path first, persistent Playwright fallback, 6h cache.
- This was an Android app (Capacitor) before; the app shell, splash screen and
  `frontend/android/` were removed when it became a website. Still in git
  history if needed.
