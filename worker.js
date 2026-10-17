
const BACKEND = "https://marcivo-backend.onrender.com";

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

    // Serve the existing frontend.
    return env.ASSETS.fetch(request);
  },
};
