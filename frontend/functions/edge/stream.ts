// Same-origin, Range-capable media proxy (Cloudflare Pages Function, free tier).
// Direct-file hosts such as G-Direct answer 200 and ignore Range. We emulate 206 by
// discarding bytes up to the requested offset, then piping the rest natively
// (no per-chunk JS after the skip). Never buffers more than SKIP_CHUNK.

declare const FixedLengthStream: {
  new (len: number): { readable: ReadableStream<Uint8Array>; writable: WritableStream<Uint8Array> };
};

interface Ctx { request: Request; waitUntil(p: Promise<unknown>): void }

const MAX_URL_LEN = 4096; // matches the cap in backend/src/stream.ts (media.length > 4096)
const SKIP_CHUNK = 1 << 20; // 1 MiB BYOB reads
const PASS = ["content-type", "content-length", "content-range", "accept-ranges", "etag", "last-modified"];

function err(status: number, msg: string, extra: Record<string, string> = {}): Response {
  return new Response(msg, {
    status,
    headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "text/plain; charset=utf-8", ...extra },
  });
}

function target(raw: string | null, self: URL): URL | null {
  if (!raw || raw.length > MAX_URL_LEN) return null;
  let u: URL;
  try { u = new URL(raw); } catch { return null; }
  if (u.protocol !== "http:" && u.protocol !== "https:") return null;
  if (u.host === self.host) return null; // no self-proxy loops
  return u;
}

// Single byte-range only. null => ignore header (absent / multi / garbled) => full 200.
function parseRange(h: string | null, total: number): { start: number; end: number } | "unsat" | null {
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

function baseHeaders(up: Response): Headers {
  const h = new Headers();
  for (const k of PASS) { const v = up.headers.get(k); if (v !== null) h.set(k, v); }
  h.set("Content-Disposition", "inline");
  h.set("Cache-Control", "private, max-age=300");
  h.set("Access-Control-Allow-Origin", "*");
  return h;
}

async function pump(
  body: ReadableStream<Uint8Array>, sink: WritableStream<Uint8Array>,
  start: number, len: number, toEof: boolean,
): Promise<void> {
  const reader = (body as any).getReader({ mode: "byob" });
  let writer: WritableStreamDefaultWriter<Uint8Array> | null = null;
  try {
    // 1) discard [0, start) — the only per-chunk JS on the hot path
    let buf = new ArrayBuffer(SKIP_CHUNK);
    let left = start;
    while (left > 0) {
      const n = Math.min(SKIP_CHUNK, left);
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
      const n = Math.min(SKIP_CHUNK, rem);
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

export const onRequest = async (ctx: Ctx): Promise<Response> => {
  const req = ctx.request;
  if (req.method !== "GET" && req.method !== "HEAD") return err(405, "method not allowed", { Allow: "GET, HEAD" });
  const head = req.method === "HEAD";

  const self = new URL(req.url);
  const t = target(self.searchParams.get("url"), self);
  if (!t) return err(400, "invalid url");

  const range = req.headers.get("range");
  const fwd = new Headers();
  if (range) fwd.set("Range", range);
  fwd.set(
    "User-Agent",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
  );

  let up: Response;
  try {
    up = await fetch(t.toString(), { method: head ? "HEAD" : "GET", headers: fwd, redirect: "follow" });
  } catch {
    return err(502, "upstream fetch failed");
  }

  const expose = { "Access-Control-Expose-Headers": "Content-Range, Content-Length, Accept-Ranges" };

  if (up.status === 416) {
    up.body?.cancel();
    return err(416, "range not satisfiable", {
      "Content-Range": up.headers.get("content-range") ?? "bytes */*",
      ...expose,
    });
  }

  if (!up.ok) {
    up.body?.cancel();
    return err(502, `upstream status ${up.status}`);
  }

  const h = baseHeaders(up);
  for (const [k, v] of Object.entries(expose)) h.set(k, v);

  if (up.status === 206) {
    const cr = up.headers.get("content-range");
    const cl = up.headers.get("content-length");
    if (cr) h.set("Content-Range", cr);
    if (cl) h.set("Content-Length", cl);
    h.set("Accept-Ranges", "bytes");
    if (head) {
      up.body?.cancel();
      return new Response(null, { status: 206, headers: h });
    }
    return new Response(up.body, { status: 206, headers: h });
  }

  const clRaw = up.headers.get("content-length");
  const total = clRaw !== null && /^\d+$/.test(clRaw) ? Number(clRaw) : NaN;
  const known = Number.isSafeInteger(total) && total > 0;
  const r = range && known ? parseRange(range, total) : null;

  if (r === "unsat") {
    up.body?.cancel();
    return err(416, "range not satisfiable", { "Content-Range": `bytes */${total}`, ...expose });
  }

  if (r) {
    const len = r.end - r.start + 1;
    h.set("Content-Range", `bytes ${r.start}-${r.end}/${total}`);
    h.set("Content-Length", String(len));
    h.set("Accept-Ranges", "bytes");
    if (head) {
      up.body?.cancel();
      return new Response(null, { status: 206, headers: h });
    }
    if (!up.body) return err(502, "upstream returned no body");
    const { readable, writable } = new FixedLengthStream(len);
    ctx.waitUntil(pump(up.body, writable, r.start, len, r.end === total - 1).catch(() => {}));
    return new Response(readable, { status: 206, headers: h });
  }

  if (known) {
    h.set("Content-Length", String(total));
    h.set("Accept-Ranges", "bytes");
  }
  if (head) {
    up.body?.cancel();
    return new Response(null, { status: 200, headers: h });
  }
  return new Response(up.body, { status: 200, headers: h });
};