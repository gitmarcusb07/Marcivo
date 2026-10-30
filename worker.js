const BACKEND = "https://marcivo-backend.onrender.com";
const SITE = "https://marcivo.teraplayer.in";
const DEFAULT_OG = `${SITE}/og.png`;

// Content pages whose <head> is pre-rendered for crawlers and social
// scrapers that don't run JavaScript. Values mirror each page's <Seo>
// component — keep them in sync when copy changes.
function seoPages() {
  const y = new Date().getUTCFullYear();
  return {
    "/free-movies": {
      title: "Free Movies & Shows — Watch Movies Online Free | Marcivo",
      description: "Free movies and shows to watch online — trending films, popular web series and anime in one place. Compare every available version and press play. Free to use, no account needed.",
    },
    "/download-movies": {
      title: "Download Movies & Web Series — Every Available Version | Marcivo",
      description: "Looking for movies to download? Marcivo finds every available version of a title — compare quality, audio and size, then save or stream it in your browser. Free, no account needed.",
    },
    "/watch-free": {
      title: `How to Watch Movies Online Free — ${y} Guide | Marcivo`,
      description: "How to watch movies online free: where free streaming actually comes from, how to avoid dead links, and how Marcivo lines up every available version of a title so you can press play in one search.",
    },
    "/upcoming": {
      title: `Upcoming Movies ${y} — Release Dates & Where to Watch | Marcivo`,
      description: `The most anticipated upcoming movies of ${y} and beyond — release dates for every film on the way, and where to watch each one the day it lands.`,
    },
    "/upcoming/shows": {
      title: `Upcoming Web Series & TV Shows ${y} — Release Dates | Marcivo`,
      description: `New and upcoming web series and TV shows — premiere dates for the biggest ${y} releases, and where to watch them the moment the first episode drops.`,
    },
    "/upcoming/anime": {
      title: `Upcoming Anime ${y} — Release Schedule & Where to Watch | Marcivo`,
      description: `Upcoming anime of ${y} — the season's most anticipated new series and movies with release dates, and where to watch them the moment they air.`,
    },
    // Mirror CategoryPage's SEO map.
    "/category/movies": {
      title: "Movies — Watch Movies Online Free | Marcivo",
      description: "Browse movies on Marcivo — popular films, top rated picks, now playing and coming soon. Every title lines up its available versions so you can press play.",
    },
    "/category/series": {
      title: "Web Series — Watch TV Series Online Free | Marcivo",
      description: "Watch web series and TV shows online — popular series, top rated shows and what's airing now, each with its available versions lined up.",
    },
    "/category/hollywood": {
      title: "Hollywood Movies & Series — Watch Online | Marcivo",
      description: "Hollywood movies and series in English — browse what's available now, with every version of each title lined up on its page.",
    },
    "/category/bollywood": {
      title: "Bollywood & Hindi Movies — Watch Online | Marcivo",
      description: "Bollywood and Hindi movies and series — browse what's available now, with every version of each title lined up on its page.",
    },
  };
}

// Core pages for the sitemap fallback — only used when the backend is
// unreachable (a stale-but-valid sitemap beats a 500 to the crawler).
function fallbackSitemap() {
  const paths = [
    "/",
    "/free-movies",
    "/download-movies",
    "/watch-free",
    "/upcoming",
    "/upcoming/shows",
    "/upcoming/anime",
    "/category/movies",
    "/category/series",
    "/category/hollywood",
    "/category/bollywood",
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${SITE}${p}</loc></url>`).join("\n")}
</urlset>`;
}

// The SPA shell (the assets layer redirects /index.html → /).
function shell(request, url, env) {
  return env.ASSETS.fetch(new Request(new URL("/", url), request));
}

// Rewrite the shared head tags for one page. `spec.image` must be absolute.
function injectHead(page, spec) {
  let rw = new HTMLRewriter()
    .on("title", { element(el) { el.setInnerContent(spec.title); } })
    .on('meta[name="description"]', { element(el) { el.setAttribute("content", spec.description); } })
    .on('meta[property="og:title"]', { element(el) { el.setAttribute("content", spec.title); } })
    .on('meta[property="og:description"]', { element(el) { el.setAttribute("content", spec.description); } })
    .on('meta[property="og:url"]', { element(el) { el.setAttribute("content", spec.canonical); } })
    .on('meta[property="og:image"]', { element(el) { el.setAttribute("content", spec.image); } })
    .on('meta[property="og:image:alt"]', { element(el) { el.setAttribute("content", spec.title); } })
    .on('meta[name="twitter:title"]', { element(el) { el.setAttribute("content", spec.title); } })
    .on('meta[name="twitter:description"]', { element(el) { el.setAttribute("content", spec.description); } })
    .on('meta[name="twitter:image"]', { element(el) { el.setAttribute("content", spec.image); } })
    .on('link[rel="canonical"]', { element(el) { el.setAttribute("href", spec.canonical); } });
  if (spec.ogType) {
    rw = rw.on('meta[property="og:type"]', { element(el) { el.setAttribute("content", spec.ogType); } });
  }
  return rw.transform(page);
}

// Per-title metadata for /detail/…, straight from the backend detail API.
// Edge-cached (free host cold-starts; title/overview/poster barely change).
// Any error or slow response → null → the plain shell is served, exactly as
// before this feature existed.
async function detailMeta(kind, id) {
  try {
    const res = await fetch(`${BACKEND}/api/detail/${kind}/${encodeURIComponent(id)}`, {
      cf: { cacheEverything: true, cacheTtl: 21600 },
      signal: AbortSignal.timeout(2500),
    });
    if (!res.ok) return null;
    const d = await res.json();
    const name = String(d?.title || "").trim();
    if (!name) return null;
    const year = /^\d{4}$/.test(String(d?.year || "")) ? ` (${d.year})` : "";
    const label = kind === "anime" ? "Anime" : kind === "tv" ? "TV Series" : "Movie";
    const overview = String(d?.overview || "").replace(/\s+/g, " ").trim();
    const description = (overview || `Release info, cast and every available version of ${name} on Marcivo — free to use, no account needed.`).slice(0, 300);
    const poster = typeof d?.poster === "string" && /^https:\/\//i.test(d.poster) ? d.poster : "";
    const isMovie = kind === "movie" || (kind === "anime" && String(d?.format || "").toUpperCase() === "MOVIE");
    return {
      title: `${name}${year} — ${label} Info, Cast & Where to Watch | Marcivo`,
      description,
      canonical: `${SITE}/detail/${kind}/${encodeURIComponent(id)}`,
      image: poster || DEFAULT_OG,
      ogType: isMovie ? "video.movie" : "video.tv_show",
    };
  } catch {
    return null;
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const isRead = request.method === "GET" || request.method === "HEAD";

    // Serve robots.txt as plain text.
    if (url.pathname === "/robots.txt") {
      return new Response(
        "User-agent: *\nAllow: /\n\n# Player pages are utility pages, not search landing pages.\nDisallow: /watch/\nDisallow: /api/\n\nSitemap: https://marcivo.teraplayer.in/sitemap.xml\n",
        {
          status: 200,
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        }
      );
    }

    // Serve the dynamic sitemap from the backend, edge-cached; fall back to
    // the core list if the backend is cold or down.
    // The backend now serves a cached sitemap immediately (see backend
    // sitemap cache), but a cold Render instance can still be slow, so:
    // (1) give it 30s instead of 10s, and (2) if it fails, serve the last
    // good sitemap from the edge cache instead of the 11-URL fallback —
    // a stale sitemap with title URLs beats a fresh one without them.
    if (url.pathname === "/sitemap.xml") {
      try {
        const cache = caches.default;
        const cacheKey = new Request(`${SITE}/sitemap.xml`, request);
        const cached = await cache.match(cacheKey);
        try {
          const response = await fetch(`${BACKEND}/sitemap.xml`, {
            cf: { cacheEverything: true, cacheTtl: 21600 },
            signal: AbortSignal.timeout(30000),
          });
          if (response.ok) {
            const toCache = response.clone();
            const headers = new Headers(toCache.headers);
            headers.set("Cache-Control", "public, max-age=3600");
            const cacheable = new Response(toCache.body, { status: 200, headers });
            // Do not let a cache-put failure break the crawler response.
            try { await cache.put(cacheKey, cacheable.clone()); } catch {}
            return cacheable;
          }
        } catch {
          // Backend fetch failed — fall through to the edge cache below.
        }
        if (cached) return cached;
      } catch {
        // fall through to the local fallback
      }
      return new Response(fallbackSitemap(), {
        status: 200,
        headers: {
          "Content-Type": "application/xml; charset=utf-8",
          "Cache-Control": "public, max-age=600",
        },
      });
    }

    // Proxy backend API requests.
    if (url.pathname.startsWith("/api/") || url.pathname === "/health") {
      const backendUrl = new URL(url.pathname + url.search, BACKEND);
      return fetch(new Request(backendUrl, request));
    }

    // Per-title pages: the shell's head gets the title's own meta so shares
    // and non-JS crawlers read it without booting the SPA.
    const detail = url.pathname.match(/^\/detail\/(movie|tv|anime)\/([^/]+)\/?$/);
    if (detail && request.method === "GET") {
      const kind = detail[1];
      let id = detail[2];
      try {
        id = decodeURIComponent(id);
      } catch {
        // Malformed escape — serve the plain shell.
      }
      const pagePromise = shell(request, url, env);
      const meta = /^[\w-]{1,40}$/.test(id) ? await detailMeta(kind, id) : null;
      const page = await pagePromise;
      if (meta && page.ok) return injectHead(page, meta);
      return page;
    }

    // Static content pages (run_worker_first covers the exact paths).
    const seo = seoPages()[url.pathname];
    if (seo && isRead) {
      const page = await shell(request, url, env);
      if (page.ok) {
        return injectHead(page, {
          title: seo.title,
          description: seo.description,
          canonical: `${SITE}${url.pathname}`,
          image: DEFAULT_OG,
        });
      }
    }

    // Serve the existing frontend.
    return env.ASSETS.fetch(request);
  },
};

