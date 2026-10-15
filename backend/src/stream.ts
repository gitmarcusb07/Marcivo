import type { Request, Response } from "express";
import axios from "axios";

// Range-capable proxy fallback for direct media URLs.
export async function streamProxy(req: Request, res: Response) {
  const media = String(req.query.url || "").trim();
  if (!media || media.length > 4096) return res.status(400).send("Invalid media URL.");
  let u: URL;
  try { u = new URL(media); } catch { return res.status(400).send("Invalid media URL."); }
  if (!["http:", "https:"].includes(u.protocol)) return res.status(400).send("Invalid media URL.");

  const fwd: Record<string, string> = { "User-Agent": String(req.headers["user-agent"] || "Mozilla/5.0") };
  if (req.headers.range) fwd.Range = String(req.headers.range);

  try {
    const upstream = await axios.get(media, {
      headers: fwd,
      responseType: "stream",
      maxRedirects: 5,
      timeout: 0,
      validateStatus: (s) => s === 200 || s === 206,
    });
    res.status(upstream.status);
    for (const h of ["content-type", "content-length", "content-range", "accept-ranges", "etag", "last-modified"]) {
      const v = upstream.headers[h];
      if (v) res.setHeader(h, String(v));
    }
    res.setHeader("Content-Disposition", `inline; filename="video.mp4"`);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "private, max-age=300");
    (upstream.data as any).pipe(res);
  } catch {
    res.status(502).send("Upstream fetch failed.");
  }
}
