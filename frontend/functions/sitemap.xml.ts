
export async function onRequest(): Promise<Response> {
  try {
    const response = await fetch(
      "https://marcivo-backend.onrender.com/sitemap.xml"
    );

    if (!response.ok) {
      return new Response("Unable to load sitemap", {
        status: 502,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }

    const xml = await response.text();

    return new Response(xml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Sitemap proxy failed:", error);

    return new Response("Unable to load sitemap", {
      status: 502,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}
