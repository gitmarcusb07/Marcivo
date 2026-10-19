// LITE_MODE: deployed free-tier profile (Render free 0.1 vCPU / 512 MB).
// Disables the three heavyweight lanes that cannot survive there:
//   1. Playwright/Chromium fallbacks   (~400 MB RSS on launch)
//   2. The python bot bridge            (Windows bot dir, not on the host)
//   3. Video proxying (/api/stream)     (streams bytes through the instance)
// The HTTP lanes (fast-path + G-Direct) and TMDB/AniList metadata stay on —
// those are plain axios fetches that fit comfortably in the free plan.
// Off by default: local dev behaves exactly as before.
// Exported as a function too: the Cinejoy search slot evaluates the flag at
// call time (tests flip LITE_MODE; prod env never changes at runtime).
export function liteFlag(v?: string) {
  return ["1", "true", "yes", "on"].includes(String(v || "").trim().toLowerCase());
}
export const LITE = liteFlag(process.env.LITE_MODE);
