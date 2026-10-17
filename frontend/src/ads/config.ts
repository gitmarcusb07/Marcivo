// ─────────────────────────────────────────────────────────────────────────────
// MARCIVO AD CONFIG — this is the ONLY file you edit to turn ads on.
//
// How it works (Adstra / Adsterra / any network that hands you a JS tag):
//
//   1. NETWORK LOADER — most networks give you one site-wide <script src="...">
//      tag (Adsterra calls it the "header code"). Paste its URL into
//      VITE_AD_LOADER_SRC in frontend/.env (or hardcode it in LOADER_SRC below).
//      It is injected once, in <head>, before any slot renders.
//
//   2. AD UNIT SNIPPETS — for each unit the network gives you a block that
//      looks like:
//          <script>
//            atOptions = { key: "abcdef", format: "iframe", height: 90, width: 728, ... };
//          </script>
//          <script src="https://www.highperformanceformat.com/abcdef/invoke.js"></script>
//      Paste that whole block into the matching slot's `code` below, verbatim.
//
//   3. Everything renders inside a fixed-height box, so turning ads on or off
//      never shifts the page layout.
//
// Ads stay hidden until you set VITE_ADS_ENABLED=1 in frontend/.env (or flip
// ADS_ON below), then redeploy.
// ─────────────────────────────────────────────────────────────────────────────

/** Master switch. VITE_ADS_ENABLED=0 kills every ad with zero layout shift. */
export const ADS_ON = import.meta.env.VITE_ADS_ENABLED !== "0";

/**
 * Site-wide network loader URL, e.g.
 *   https://www.high_performanceformat.com/XXXXXXXX/invoke.js
 * Leave "" if your network only gives you per-unit snippets (paste those in
 * the slots below — the loader is injected automatically from the snippet).
 */
export const LOADER_SRC = import.meta.env.VITE_AD_LOADER_SRC || "";

export type SlotName = "header" | "home_mid" | "category_mid" | "detail_below" | "footer";

export interface Slot {
  /** Set false to hide just this slot. */
  on: boolean;
  /** Reserved box height in px — the space is held even before the ad fills. */
  height: number;
  /** Paste the network's unit snippet here (see step 2 above). */
  code: string;
  /** Human label, only shown in dev preview when `code` is empty. */
  label: string;
}

const slot = (on: boolean, height: number, label: string, code = ""): Slot => ({ on, height, code, label });

export const SLOTS: Record<SlotName, Slot> = {
  // Leaderboard under the navbar — the highest-viewed unit on the site.
  header: slot(true, 100, "Leaderboard — under the navbar (all pages)"),

  // Home, between the trending hero and the first poster row.
  home_mid: slot(true, 110, "Home — between hero and rows"),

  // Category / browse pages (Movies, Series, Hollywood, Bollywood).
  category_mid: slot(true, 110, "Category pages — under the pills"),

  // Detail page, under the "Available versions" list.
  detail_below: slot(true, 110, "Detail — under the version list"),

  // Footer banner, site-wide.
  footer: slot(true, 100, "Footer banner (all pages)"),
};

/** The watch/player page carries no ads: ad networks routinely flag video pages. */
export const AD_FREE_PATHS = [/^\/watch(\/|$)/];
