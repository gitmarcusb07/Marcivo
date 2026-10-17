# Adding ads (Adstra / Adsterra)

Marcivo has five named ad slots already placed in the layout. You paste your
network's code in **one file** — `frontend/src/ads/config.ts` — and redeploy.
No layout file needs touching.

## The slots

| Slot | Where it shows | Default height |
|---|---|---|
| `header` | Under the navbar — every page except the player | 100px |
| `home_mid` | Home, between the trending hero and the poster rows | 110px |
| `category_mid` | Category pages (Movies / Series / Hollywood / Bollywood) | 110px |
| `detail_below` | Detail page, under "Available versions" | 110px |
| `footer` | Above the site footer — every page | 100px |

The player page (`/watch/...`) is deliberately ad-free: ad networks routinely
flag video pages, and an overlay on the player drives users away.

Every slot reserves a fixed-height box, so switching ads on or off never
shifts the page or breaks the layout. With no code pasted, a slot renders
nothing at all.

## Where to paste the code

Open `frontend/src/ads/config.ts`. Each slot looks like this:

```ts
header: slot(true, 100, "Leaderboard — under the navbar (all pages)"),
```

Paste the unit snippet the network gives you into the fourth argument:

```ts
header: slot(true, 100, "Leaderboard", `
  <script>
    atOptions = { key: "abcdef1234", format: "iframe", height: 90, width: 728 };
  </script>
  <script src="https://www.highperformanceformat.com/abcdef1234/invoke.js"></script>
`),
```

Two things the code handles for you, which are the usual reasons an ad "does
nothing" when pasted into React:

- `<script>` tags inside a pasted snippet are **re-created as real script
  elements**, so they actually execute (browsers ignore scripts injected as
  plain HTML).
- If your network gives one site-wide loader tag, put its URL in
  `VITE_AD_LOADER_SRC` in `frontend/.env` instead — it is injected once into
  `<head>` before any slot fills.

## Turning ads on / off

`frontend/.env`:

```
VITE_ADS_ENABLED=1     # 1 = show ads, 0 = hide every slot (no layout gap)
VITE_AD_LOADER_SRC=    # optional site-wide loader URL
```

Per-slot, set the first argument of any `slot(...)` to `false` to hide just
that one.

**Env values are baked into the JS bundle at build time.** After changing
either file you must redeploy (or hit "Retry build" in Cloudflare Pages) —
editing the env var alone does nothing to a live site.

## Before you paste real code

Run `npm run dev` in `frontend/`. Every slot renders a dashed box labelled
"AD SLOT — …", so you can check the placement and spacing first. Those
preview boxes never ship: they only exist in dev, and vanish the moment real
code is pasted.

## Ad networks and a new site

Adstra and Adsterra both review sites before serving paid ads, and both care
about traffic + content. On a brand-new domain you may see:

- **blank slots for the first day or two** — normal, the crawler hasn't run yet;
- **low fill rate** — a new site with little traffic often gets public-service
  or house ads first. The slots still render, they just fill with something
  cheap until volume builds.

Keep `VITE_ADS_ENABLED=1` and the slots in place either way — the layout is
already sized for them.
