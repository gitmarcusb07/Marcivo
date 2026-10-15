# Marcivo — personal Netflix-style app (local use)

## Run (same WiFi for phone)
1. Backend:
   ```
   cd backend
   copy .env.example .env   # fill TMDB_API_KEY + SITE1-4 from bot .env
   npm install
   npx playwright install chromium
   npm run dev              # 0.0.0.0:3001
   ```
2. Frontend (new terminal):
   ```
   cd frontend
   copy .env.example .env   # set VITE_API=http://<laptop-ip>:3001
   npm install
   npm run dev              # 0.0.0.0:5173
   ```
3. Phone: open `http://<laptop-ip>:5173` (allow 3001/5173 in Windows Firewall).

## Flow
Home (tabs Movies/Anime) → Detail (TMDB/AniList + Available versions from /api/site-search)
→ Watch (Watch button → POST /api/resolve → poll → autoplay video).

## Notes
- TMDB key stays server-side in backend .env.
- AniList needs no key (GraphQL https://graphql.anilist.co).
- Resolver: fast HTTP path first, persistent Playwright fallback, 6h cache.
