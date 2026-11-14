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
    // Language signal from TMDB/AniList original language — only data the
    // page already carries. This is what title-specific searches actually
    // contain ("Hindi movie", "Hindi dubbed"), unlike the generic title.
    const langMap = { hi: "Hindi", en: "English", ja: "Japanese", es: "Spanish", ko: "Korean", fr: "French", ta: "Tamil", te: "Telugu", ml: "Malayalam", bn: "Bengali", mr: "Marathi", pa: "Punjabi", ur: "Urdu" };
    const langLabel = langMap[String(d?.lang || "").toLowerCase()] || "";
    const langPrefix = langLabel ? `${langLabel} ` : "";
    const description = (langLabel ? `${langLabel} ${label.toLowerCase()}: ` : "") + (overview || `Release info, cast and every available version of ${name} on Marcivo — free to use, no account needed.`);
    const poster = typeof d?.poster === "string" && /^https:\/\//i.test(d.poster) ? d.poster : "";
    const isMovie = kind === "movie" || (kind === "anime" && String(d?.format || "").toUpperCase() === "MOVIE");
    const genres = Array.isArray(d?.genres) ? d.genres.filter((g) => typeof g === "string").slice(0, 8) : [];
    const cast = Array.isArray(d?.cast) ? d.cast.filter((c) => typeof c === "string").slice(0, 8) : [];
    return {
      title: `${name}${year} — ${langPrefix}${label} Info, Cast & Where to Watch | Marcivo`,
      description: description.slice(0, 300),
      canonical: `${SITE}/detail/${kind}/${encodeURIComponent(id)}`,
      image: poster || DEFAULT_OG,
      ogType: isMovie ? "video.movie" : "video.tv_show",
      // Summary body for crawlers (fix 2) — same data as the head, no
      // invented claims. Qualities are NOT included here: the worker never
      // loads the versions list, so it cannot know them.
      name,
      year: String(d?.year || ""),
      label,
      langLabel,
      overview,
      genres,
      cast,
    };
  } catch {
    return null;
  }
}


// Server-rendered summary in the shell body for crawlers that do not run
// JavaScript (fix 2). The React app replaces this content on hydration for
// real users, so it never changes what a visitor sees — it only gives a
// non-JS crawler a real body instead of an empty <div id="root">.
// Only data already returned by the detail API is used; nothing invented.
function escHtml(s) {
  return String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function injectSummary(page, meta) {
  const bits = [`<section data-crawler-summary="true">`, `<h1>${escHtml(meta.name)}</h1>`];
  const metaLine = [meta.year, meta.langLabel, meta.label, ...(meta.genres || [])].filter(Boolean).join(" • ");
  if (metaLine) bits.push(`<p>${escHtml(metaLine)}</p>`);
  if (meta.image && meta.image !== DEFAULT_OG) bits.push(`<img src="${escHtml(meta.image)}" alt="${escHtml(meta.name)}" />`);
  if (meta.overview) bits.push(`<p>${escHtml(meta.overview)}</p>`);
  if (meta.cast && meta.cast.length) bits.push(`<p>Cast: ${escHtml(meta.cast.join(", "))}</p>`);
  bits.push(`</section>`);
  const rw = new HTMLRewriter().on("body", {
    element(el) { el.append(bits.join(""), { html: true }); },
  });
  return rw.transform(page);
}

// Same-origin, Range-capable media proxy: /edge/stream?url=<media URL>.
// Direct-file hosts such as G-Direct answer 200 and ignore Range, so a
// seek restarts the video from 0. This route emulates 206 by discarding
// bytes up to the requested offset, then piping the rest natively (no
// per-chunk JS after the skip). Never buffers more than SKIP_CHUNK.
// Used by the player in LITE mode for unseekable direct files — the Render
// /api/stream proxy is disabled there (501) to protect its bandwidth cap,
// and this Worker (same domain, free tier, no metered egress) is the free
// replacement. Embed plays never touch it.
const STREAM_MAX_URL_LEN = 4096; // matches the cap in backend/src/stream.ts
const STREAM_SKIP_CHUNK = 1 << 20; // 1 MiB BYOB reads
const STREAM_PASS = ["content-type", "content-length", "content-range", "accept-ranges", "etag", "last-modified"];

function streamErr(status, msg, extra = {}) {
  return new Response(msg, {
    status,
    headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "text/plain; charset=utf-8", ...extra },
  });
}

function streamTarget(raw, self) {
  if (!raw || raw.length > STREAM_MAX_URL_LEN) return null;
  let u;
  try { u = new URL(raw); } catch { return null; }
  if (u.protocol !== "http:" && u.protocol !== "https:") return null;
  if (u.host === self.host) return null; // no self-proxy loops
  return u;
}

// Single byte-range only. null => ignore header (absent / multi / garbled) => full 200.
function streamParseRange(h, total) {
  if (!h) return null;
  const m = /^bytes=(\d*)-(\d*)$/.exec(h.trim());
  if (!m || (m[1] === "" && m[2] === "")) return null;
  if (total === 0) return "unsat";
  if (m[1] === "") {                       // suffix: bytes=-N
    const n = Number(m[2]);
    if (n === 0) return "unsat";
    return { start: Math.max(0, total - n), end: total - 1 };
  }
  const start = Number(m[1]);
  // Open-ended range past EOF must be "unsat" — check it BEFORE end < start,
  // or bytes=N- with N >= total would wrongly fall through as "ignore".
  if (start >= total) return "unsat";
  let end = m[2] === "" ? total - 1 : Number(m[2]);
  if (end < start) return null;            // invalid => ignore (RFC 9110)
  if (end >= total) end = total - 1;
  return { start, end };
}

function streamBaseHeaders(up) {
  const h = new Headers();
  for (const k of STREAM_PASS) { const v = up.headers.get(k); if (v !== null) h.set(k, v); }
  h.set("Content-Disposition", "inline");
  h.set("Cache-Control", "private, max-age=300");
  h.set("Access-Control-Allow-Origin", "*");
  return h;
}

async function streamPump(body, sink, start, len, toEof) {
  const reader = body.getReader({ mode: "byob" });
  let writer = null;
  try {
    // 1) discard [0, start) — the only per-chunk JS on the hot path
    let buf = new ArrayBuffer(STREAM_SKIP_CHUNK);
    let left = start;
    while (left > 0) {
      const n = Math.min(STREAM_SKIP_CHUNK, left);
      const { value, done } = await reader.readAtLeast(n, new Uint8Array(buf, 0, n));
      if (done || !value || value.byteLength < n) throw new Error("upstream ended during skip");
      buf = value.buffer;
      left -= n;
    }
    // 2a) open-ended range (normal browser case: bytes=N-): native pipe, zero JS per chunk
    if (toEof) {
      reader.releaseLock();
      await body.pipeTo(sink);
      return;
    }
    // 2b) closed range: copy exactly len bytes, then stop upstream
    writer = sink.getWriter();
    let rem = len;
    while (rem > 0) {
      const n = Math.min(STREAM_SKIP_CHUNK, rem);
      const { value, done } = await reader.readAtLeast(n, new Uint8Array(new ArrayBuffer(n)));
      if (done || !value || value.byteLength < n) throw new Error("upstream ended early");
      await writer.write(value);
      rem -= n;
    }
    await writer.close();
    await reader.cancel();
  } catch (e) {
    try { await reader.cancel(e); } catch {}
    try { writer ? await writer.abort(e) : await sink.abort(e); } catch {}
  }
}

async function streamMedia(request, ctx) {
  if (request.method !== "GET" && request.method !== "HEAD") return streamErr(405, "method not allowed", { Allow: "GET, HEAD" });
  const head = request.method === "HEAD";

  const self = new URL(request.url);
  const t = streamTarget(self.searchParams.get("url"), self);
  if (!t) return streamErr(400, "invalid url");

  const range = request.headers.get("range");
  const fwd = new Headers();
  if (range) fwd.set("Range", range);
  fwd.set(
    "User-Agent",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
  );

  let up;
  try {
    up = await fetch(t.toString(), { method: head ? "HEAD" : "GET", headers: fwd, redirect: "follow" });
  } catch {
    return streamErr(502, "upstream fetch failed");
  }

  const expose = { "Access-Control-Expose-Headers": "Content-Range, Content-Length, Accept-Ranges" };

  if (up.status === 416) {
    if (up.body) { try { await up.body.cancel(); } catch {} }
    return streamErr(416, "range not satisfiable", {
      "Content-Range": up.headers.get("content-range") ?? "bytes */*",
      ...expose,
    });
  }

  if (!up.ok) {
    if (up.body) { try { await up.body.cancel(); } catch {} }
    return streamErr(502, `upstream status ${up.status}`);
  }

  const h = streamBaseHeaders(up);
  for (const [k, v] of Object.entries(expose)) h.set(k, v);

  if (up.status === 206) {
    const cr = up.headers.get("content-range");
    const cl = up.headers.get("content-length");
    if (cr) h.set("Content-Range", cr);
    if (cl) h.set("Content-Length", cl);
    h.set("Accept-Ranges", "bytes");
    if (head) {
      if (up.body) { try { await up.body.cancel(); } catch {} }
      return new Response(null, { status: 206, headers: h });
    }
    return new Response(up.body, { status: 206, headers: h });
  }

  const clRaw = up.headers.get("content-length");
  const total = clRaw !== null && /^\d+$/.test(clRaw) ? Number(clRaw) : NaN;
  const known = Number.isSafeInteger(total) && total > 0;
  const r = range && known ? streamParseRange(range, total) : null;

  if (r === "unsat") {
    if (up.body) { try { await up.body.cancel(); } catch {} }
    return streamErr(416, "range not satisfiable", { "Content-Range": `bytes */${total}`, ...expose });
  }

  if (r) {
    const len = r.end - r.start + 1;
    h.set("Content-Range", `bytes ${r.start}-${r.end}/${total}`);
    h.set("Content-Length", String(len));
    h.set("Accept-Ranges", "bytes");
    if (head) {
      if (up.body) { try { await up.body.cancel(); } catch {} }
      return new Response(null, { status: 206, headers: h });
    }
    if (!up.body) return streamErr(502, "upstream returned no body");
    const { readable, writable } = new FixedLengthStream(len);
    ctx.waitUntil(streamPump(up.body, writable, r.start, len, r.end === total - 1).catch(() => {}));
    return new Response(readable, { status: 206, headers: h });
  }

  if (known) {
    h.set("Content-Length", String(total));
    h.set("Accept-Ranges", "bytes");
  }
  if (head) {
    if (up.body) { try { await up.body.cancel(); } catch {} }
    return new Response(null, { status: 200, headers: h });
  }
  return new Response(up.body, { status: 200, headers: h });
}

export default {
  async fetch(request, env, ctx) {
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

    // Range-capable media proxy for unseekable direct files (see streamMedia
    // above). The player routes LITE-mode direct plays here so seeking works.
    if (url.pathname === "/edge/stream") {
      return streamMedia(request, ctx);
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
      if (meta && page.ok) return injectSummary(injectHead(page, meta), meta);
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

