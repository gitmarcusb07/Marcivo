const BACKEND = "https://marcivo-backend.onrender.com";

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
  };
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Serve robots.txt as plain text.
    if (url.pathname === "/robots.txt") {
      return new Response(
        "User-agent: *\nAllow: /\nSitemap: https://marcivo.teraplayer.in/sitemap.xml\n",
        {
          status: 200,
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        }
      );
    }

    // Serve the dynamic sitemap from the backend.
    if (url.pathname === "/sitemap.xml") {
      const response = await fetch(`${BACKEND}/sitemap.xml`);

      return new Response(response.body, {
        status: response.status,
        headers: {
          "Content-Type": "application/xml; charset=utf-8",
          "Cache-Control": "public, max-age=3600",
        },
      });
    }

    // Proxy backend API requests.
    if (url.pathname.startsWith("/api/") || url.pathname === "/health") {
      const backendUrl = new URL(url.pathname + url.search, BACKEND);
      return fetch(new Request(backendUrl, request));
    }

    // Pre-render <head> for the content pages (run_worker_first covers the
    // exact paths). Non-JS crawlers get the right title/description/canonical
    // up front; the SPA still boots client-side exactly as before.
    const seo = seoPages()[url.pathname];
    if (seo && (request.method === "GET" || request.method === "HEAD")) {
      // Fetch the SPA shell (the assets layer redirects /index.html → /).
      const page = await env.ASSETS.fetch(new Request(new URL("/", url), request));
      if (page.ok) {
        const canonical = `https://marcivo.teraplayer.in${url.pathname}`;
        return new HTMLRewriter()
          .on("title", { element(el) { el.setInnerContent(seo.title); } })
          .on('meta[name="description"]', { element(el) { el.setAttribute("content", seo.description); } })
          .on('meta[property="og:title"]', { element(el) { el.setAttribute("content", seo.title); } })
          .on('meta[property="og:description"]', { element(el) { el.setAttribute("content", seo.description); } })
          .on('meta[property="og:url"]', { element(el) { el.setAttribute("content", canonical); } })
          .on('link[rel="canonical"]', { element(el) { el.setAttribute("href", canonical); } })
          .transform(page);
      }
    }

    // Serve the existing frontend.
    return env.ASSETS.fetch(request);
  },
};
