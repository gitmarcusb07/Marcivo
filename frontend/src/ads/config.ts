// ─────────────────────────────────────────────────────────────────────────────
// MARCIVO AD CONFIG — this is the ONLY file you edit to manage ads.
//
// HOW TO ADD / SWAP A UNIT
//   Each slot below has a `code` field. Paste the network's snippet for that
//   unit into `code` verbatim — the whole thing, <script> tags and all.
//   AdSlot re-creates the script tags for real, so the ad actually renders
//   (dropping a snippet in via innerHTML would NOT run the scripts).
//
//   Turn a single slot off with `on: false`. Turn the whole system off with
//   VITE_ADS_ENABLED=0. No layout shift either way: every slot reserves its
//   height up front.
//
// SIZE MAP — which banner goes where (match the px box to the unit size):
//   728x90  leaderboard   → header (all pages) + footer (all pages)
//   468x60  banner        → home mid, category mid
//   300x250 rectangle    → detail below, search mid
//   320x50  mobile banner → status page
//   160x300 skyscraper    → search sidebar
//   160x600 tall skyscraper → detail sidebar
//
// WHY /watch/ IS AD-FREE
//   Ad networks routinely flag video/player pages. The player stays clean;
//   every other page carries ads.
// ─────────────────────────────────────────────────────────────────────────────

/** Master switch. VITE_ADS_ENABLED=0 kills every ad with zero layout shift. */
export const ADS_ON = import.meta.env.VITE_ADS_ENABLED !== "0";

/**
 * Site-wide network loader URL. Leave "" — this network hands out per-unit
 * snippets that each carry their own loader, so nothing global is needed.
 */
export const LOADER_SRC = import.meta.env.VITE_AD_LOADER_SRC || "";

/**
 * Every slot name the site can render. Add a name here to add a new slot.
 * (A union type keeps `SLOTS[name]` fully typed at every call site.)
 */
export type SlotName =
  | "header"
  | "home_mid"
  | "home_native"
  | "home_tall"
  | "category_mid"
  | "search_mid"
  | "search_sidebar"
  | "detail_below"
  | "detail_sidebar"
  | "status_banner"
  | "footer";

export interface Slot {
  /** Set false to hide just this slot. */
  on: boolean;
  /** Reserved box height in px — the space is held even before the ad fills. */
  height: number;
  /** Paste the network's unit snippet here (see HOW TO ADD above). */
  code: string;
  /** Human label, only shown in dev preview when `code` is empty. */
  label: string;
}

const slot = (on: boolean, height: number, label: string, code = ""): Slot => ({
  on,
  height,
  code,
  label,
});

/**
 * Adsterra hands each unit a two-part snippet: a config <script> that sets the
 * global `atOptions`, then a loader <script src=...>. They only work in that
 * order and they share the global `atOptions`, so the banner helper rebuilds
 * the pair in order. Each snippet is pasted verbatim into its slot below.
 */
const banner = (key: string, width: number, height: number): string =>
  `<script>\n  atOptions = {\n    'key' : '${key}',\n    'format' : 'iframe',\n    'height' : ${height},\n    'width' : ${width},\n    'params' : {}\n  };\n</script>\n<script src="https://bancadeltempoidea.org/22/${key}"></script>`;

/**
 * Native Banner differs from the banners: no atOptions, just an async loader
 * plus the container div it fills. Put the container first so it exists before
 * the external script can execute (mountSnippet waits for external scripts).
 */
const native = (key: string): string =>
  `<div id="container-${key}"></div>\n<script async="async" data-cfasync="false" src="https://bancadeltempoidea.org/21/${key}"></script>`;

// The six banner units Adsterra approved for marcivo.teraplayer.in.
const U = {
  b728: "43b766b0835d4c7a5e30aa2d13c3f30a", // 728x90  leaderboard
  b468: "8f21288d9718f362dced49e190c88326", // 468x60  banner
  b300: "383152ba333f863e6926a5f77eef0f90", // 300x250 rectangle
  b160x300: "7cf528556da300cc500ab8f9ead22dff", // 160x300 skyscraper
  b160x600: "4226127ec737d1de5cef772a9232785c", // 160x600 tall skyscraper
  b320: "4ef4f0b0935ec684339cf9385d358dc4", // 320x50  mobile banner
  native: "de668932bebe103b63ba4e82327428aa", // native banner (4:1)
};

export const SLOTS: Record<SlotName, Slot> = {
  // Leaderboard under the navbar — the highest-viewed unit on the site.
  header: slot(true, 100, "Header leaderboard 728x90", banner(U.b728, 728, 90)),

  // Home, between the trending hero and the first poster row.
  home_mid: slot(true, 100, "Home mid banner 468x60", banner(U.b468, 468, 60)),

  // Home native banner (4:1 widget) under the poster rows.
  home_native: slot(true, 170, "Home native banner (4:1)", native(U.native)),

  // Home sidebar skyscraper, beside the poster rows.
  home_tall: slot(true, 620, "Home tall skyscraper 160x600", banner(U.b160x600, 160, 600)),

  // Category / browse pages (Movies, Series, Hollywood, Bollywood).
  category_mid: slot(true, 100, "Category banner 468x60", banner(U.b468, 468, 60)),

  // Search results, under the search bar.
  search_mid: slot(true, 270, "Search rectangle 300x250", banner(U.b300, 300, 250)),

  // Search sidebar skyscraper.
  search_sidebar: slot(true, 320, "Search skyscraper 160x300", banner(U.b160x300, 160, 300)),

  // Detail page, under the "Available versions" list.
  detail_below: slot(true, 270, "Detail rectangle 300x250", banner(U.b300, 300, 250)),

  // Detail page sidebar, beside the poster.
  detail_sidebar: slot(true, 620, "Detail tall skyscraper 160x600", banner(U.b160x600, 160, 600)),

  // Status page banner.
  status_banner: slot(true, 70, "Status mobile banner 320x50", banner(U.b320, 320, 50)),

  // Footer banner, site-wide.
  footer: slot(true, 100, "Footer leaderboard 728x90", banner(U.b728, 728, 90)),
};

/** The watch/player page carries no ads: ad networks routinely flag video pages. */
export const AD_FREE_PATHS = [/^\/watch(\/|$)/];

/**
 * Smartlink — a monetised URL rather than a banner. Rendered as a normal
 * hyperlink so it never fights the banners for attention. Set `href` to ""
 * to hide it.
 */
export const SMARTLINK = {
  on: true,
  href: "https://directyp.org/4/fc0dd4b54c04ab68608a74812af26351",
  label: "Watch free — no sign-up",
};

/**
 * Page-wide units. These are injected once into <head>/<body>, NOT as React
 * slots, because the network needs them at those exact spots:
 *   POPUNDER   — one per page, fires on the first click anywhere.
 *   SOCIAL BAR — a sticky bar pinned to the bottom of the viewport.
 *   NATIVE BANNER — a script plus a container div the script fills.
 * Each `code` is pasted verbatim into index.html; keeping the markup here
 * documents which snippet belongs to which unit.
 */
export const GLOBAL_ADS = {
  popunder: {
    on: true,
    // Injected after document.body exists; never inserted as a blocking head script.
    code: `<script data-cfasync="false" src="https://aarems.org/1/27d26b3ba6949ebe07b45fb0eb3b808f"></script>`,
  },
  socialBar: {
    on: true,
    // Injected once after document.body exists.
    code: `<script data-cfasync="false" src="https://bancadeltempoidea.org/14/c97d04e3a9a8c98c6e7855a54ae9d1b8"></script>`,
  },
  nativeBanner: {
    // This exact native unit is already used by SLOTS.home_native.
    // Keep this global copy disabled to prevent loading the same unit twice.
    on: false,
    code: `<script async="async" data-cfasync="false" src="https://bancadeltempoidea.org/21/de668932bebe103b63ba4e82327428aa"></script><div id="container-de668932bebe103b63ba4e82327428aa"></div>`,
  },
};

