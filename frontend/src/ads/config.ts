
/**
 * MARCIVO AD CONFIG
 * This is the only file you edit to manage ad slots.
 *
 * Popunder and Social Bar are loaded directly from index.html.
 * Their GLOBAL_ADS switches are false below to prevent duplicate injection.
 *
 * WHY /watch/ IS AD-FREE
 * The player page stays clean; other pages can carry ads.
 */

export const ADS_ON = import.meta.env.VITE_ADS_ENABLED !== "0";

export const LOADER_SRC = import.meta.env.VITE_AD_LOADER_SRC || "";

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
  on: boolean;
  height: number;
  code: string;
  label: string;
}

const slot = (
  on: boolean,
  height: number,
  label: string,
  code = "",
): Slot => ({
  on,
  height,
  code,
  label,
});

/**
 * Adsterra banner snippets use atOptions followed by the loader.
 * Keep these two scripts in order.
 */
const banner = (
  key: string,
  width: number,
  height: number,
): string =>
  `<script>
    atOptions = {
      'key': '${key}',
      'format': 'iframe',
      'height': ${height},
      'width': ${width},
      'params': {}
    };
  </script>
  <script src="https://bancadeltempoidea.org/22/${key}"></script>`;

/**
 * Native banner: container first, then the external script.
 */
const native = (key: string): string =>
  `<div id="container-${key}"></div>
  <script async="async" data-cfasync="false"
    src="https://bancadeltempoidea.org/21/${key}">
  </script>`;

// Adsterra units approved for marcivo.teraplayer.in.
const U = {
  b728: "43b766b0835d4c7a5e30aa2d13c3f30a", // 728x90
  b468: "8f21288d9718f362dced49e190c88326", // 468x60
  b300: "383152ba333f863e6926a5f77eef0f90", // 300x250
  b160x300: "7cf528556da300cc500ab8f9ead22dff", // 160x300
  b160x600: "4226127ec737d1de5cef772a9232785c", // 160x600
  b320: "4ef4f0b0935ec684339cf9385d358dc4", // 320x50
  native: "de668932bebe103b63ba4e82327428aa", // Native 4:1
};

export const SLOTS: Record<SlotName, Slot> = {
  // Header leaderboard
  header: slot(
    true,
    100,
    "Header leaderboard 728x90",
    banner(U.b728, 728, 90),
  ),

  // Home page banner
  home_mid: slot(
    true,
    100,
    "Home mid banner 468x60",
    banner(U.b468, 468, 60),
  ),

  // Home native banner
  home_native: slot(
    true,
    170,
    "Home native banner (4:1)",
    native(U.native),
  ),

  // Home tall skyscraper
  home_tall: slot(
    true,
    620,
    "Home tall skyscraper 160x600",
    banner(U.b160x600, 160, 600),
  ),

  // Category and browse pages
  category_mid: slot(
    true,
    100,
    "Category banner 468x60",
    banner(U.b468, 468, 60),
  ),

  // Search results rectangle
  search_mid: slot(
    true,
    270,
    "Search rectangle 300x250",
    banner(U.b300, 300, 250),
  ),

  // Search sidebar
  search_sidebar: slot(
    true,
    320,
    "Search skyscraper 160x300",
    banner(U.b160x300, 160, 300),
  ),

  // Detail page rectangle
  detail_below: slot(
    true,
    270,
    "Detail rectangle 300x250",
    banner(U.b300, 300, 250),
  ),

  // Detail page sidebar
  detail_sidebar: slot(
    true,
    620,
    "Detail tall skyscraper 160x600",
    banner(U.b160x600, 160, 600),
  ),

  // Status page mobile banner
  status_banner: slot(
    true,
    70,
    "Status mobile banner 320x50",
    banner(U.b320, 320, 50),
  ),

  // Footer leaderboard
  footer: slot(
    true,
    100,
    "Footer leaderboard 728x90",
    banner(U.b728, 728, 90),
  ),
};

/** The watch/player page carries no ad slots. */
export const AD_FREE_PATHS = [/^\/watch(\/|$)/];

/**
 * Smartlink
 * Set on: false or href: "" to hide it.
 */
export const SMARTLINK = {
  on: true,
  href:
    "https://directyp.org/4/fc0dd4b54c04ab68608a74812af26351",
  label: "Watch free — no sign-up",
};

/**
 * Global ad snippets.
 *
 * IMPORTANT:
 * Popunder and Social Bar are managed in frontend/index.html.
 * Keep these switches false so GlobalAds.tsx does not inject them again.
 *
 * The native banner is already loaded through SLOTS.home_native,
 * so its global copy also stays disabled.
 */
export const GLOBAL_ADS = {
  popunder: {
    on: false,
    code: `<script data-cfasync="false" src="https://aarems.org/1/27d26b3ba6949ebe07b45fb0eb3b808f"></script>`,
  },

  socialBar: {
    on: false,
    code: `<script data-cfasync="false" src="https://bancadeltempoidea.org/14/c97d04e3a9a8c98c6e7855a54ae9d1b8"></script>`,
  },

  nativeBanner: {
    on: false,
    code: `<script async="async" data-cfasync="false" src="https://bancadeltempoidea.org/21/de668932bebe103b63ba4e82327428aa"></script><div id="container-de668932bebe103b63ba4e82327428aa"></div>`,
  },
};
