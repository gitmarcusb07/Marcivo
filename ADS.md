# Ads — current state (Adsterra)

All ten approved units are wired and deployed on every page. This file is the
reference for what is live, where each unit sits, and how to change it.

**Coverage:** each page renders its own contextual slots (see table) and then
tops up with `<AdBand>` (`frontend/src/ads/AdBand.tsx`) for whichever units it
doesn't already show — so the seven banner/native units plus popunder, social
bar and smartlink load on every route, and no unit ever loads twice on one page.

## What is live

| Slot | Page | Unit | Size |
|---|---|---|---|
| `header` | Every page | Leaderboard | 728x90 |
| `footer` | Every page | Leaderboard | 728x90 |
| `home_mid` | Home | Banner | 468x60 |
| `home_tall` | Home | Tall skyscraper | 160x600 |
| `category_mid` | Movies / Series / Hollywood / Bollywood | Banner | 468x60 |
| `search_mid` | Search | Rectangle | 300x250 |
| `search_sidebar` | Search | Skyscraper | 160x300 |
| `detail_below` | Detail | Rectangle | 300x250 |
| `detail_sidebar` | Detail | Tall skyscraper | 160x600 |
| `status_banner` | Status | Mobile banner | 320x50 |

Plus three units that are page-wide rather than slot-based, all in
`frontend/index.html`:

| Unit | Where in `index.html` | Notes |
|---|---|---|
| Popunder | in `<head>` | Fires on the first click, one per page |
| Social Bar | above `</body>` | Sticky bar pinned to the bottom |
| Native Banner | script + container div | Placed inline in the home content |

The smartlink (`https://directyp.org/4/fc0dd4b54c04ab68608a74812af26351`) renders
as a small "Watch free — no sign-up" button above the footer banner on every
non-player page.

## Where to change anything

`frontend/src/ads/config.ts` — the only file for the ten banner slots.

```ts
header: slot(true, 100, "Header leaderboard 728x90", banner(U.b728, 728, 90)),
//       ^ on/off  ^ reserved height                              ^ key + size
```

Swap a unit by changing the key in the `U` map, or set the first argument to
`false` to hide just that slot. The popunder, social bar and native banner
live in `frontend/index.html` instead.

Two things the mounting code handles for you, which are the usual reasons an
ad "does nothing" when pasted into React:

- `<script>` tags inside a pasted snippet are **re-created as real script
  elements**, so they actually execute (browsers ignore scripts injected as
  plain HTML).
- The two-part snippet (config script, then loader script) is emitted **in
  that order**, because the loader reads `atOptions` as it runs.

## Turning ads on / off

`frontend/.env`:

```
VITE_ADS_ENABLED=1     # 1 = show ads, 0 = hide every slot (no layout gap)
VITE_AD_LOADER_SRC=    # optional site-wide loader URL (unused — see below)
```

Env values are baked into the JS bundle at build time, so after changing one
you must rebuild. Per-slot, flip the first argument of any `slot(...)`.

## The player carries the standard banner set too

`/watch/...` shows the same banner/native set as every other page — placed
below the player, never over it — plus the shell's popunder and social bar.
`AD_FREE_PATHS` in `config.ts` is empty; add a regex there (for example
`/^\/watch(\/|$)/`) to make a page ad-free again.

## Fill rate and a new domain

A fresh domain usually shows blank or house ads for the first day or two while
the crawler runs, then fills properly once traffic builds. Keep the slots in
place either way — the layout already reserves the height, so nothing shifts.
