// Shared JSON GET over node:https with a pinned IPv4 lookup.
// Why: undici fetch honors DNS order only loosely — on networks where the
// api.themoviedb.org IPv6 path is reset mid-TLS (ECONNRESET) it never falls
// back to the working IPv4 addresses. https.request with lookup:{family:4}
// bypasses the dead v6 path entirely. No keep-alive reuse (avoids
// stale-socket ECONNRESET from some CDNs), per-request timeout, retries.
import * as dns from "node:dns";
import * as https from "node:https";
import * as http from "node:http";

const UA = process.env.SITE_USER_AGENT || "Mozilla/5.0 (Windows NT 10.0; Win64; x64)";

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

/** Rotating IPv4 pool: CloudFront A records reset connections flakily —
    cycling addresses per connection beats retrying the same dead node. */
const v4pool = new Map<string, { addrs: string[]; i: number; exp: number }>();
function ipv4Lookup(
  hostname: string,
  opts: dns.LookupOptions,
  cb: (err: NodeJS.ErrnoException | null, address: string | dns.LookupAddress[], family: number) => void
): void {
  const hit = v4pool.get(hostname);
  if (hit && hit.exp > Date.now() && hit.addrs.length) {
    const off = hit.i++ % hit.addrs.length;
    // Same contract as a fresh lookup: array when the caller asked all:true.
    if ((opts as any)?.all) {
      const rot = hit.addrs.slice(off).concat(hit.addrs.slice(0, off));
      cb(null, rot.map((a) => ({ address: a, family: 4 })), 4);
      return;
    }
    cb(null, hit.addrs[off], 4);
    return;
  }
  (dns.lookup as any)(hostname, { ...opts, family: 4, all: true }, (err: any, res: any) => {
    if (!err && res) {
      const arr = (Array.isArray(res) ? res : [res])
        .map((x: any) => (typeof x === "string" ? x : x?.address))
        .filter(Boolean);
      if (arr.length) {
        const prev = v4pool.get(hostname);
        const start = prev && prev.exp > Date.now() ? prev.i : 0;
        v4pool.set(hostname, { addrs: arr, i: start + 1, exp: Date.now() + 60000 });
        // Honor the caller's all:true (Node's autoSelectFamily path): return
        // the full rotated array, not a single string.
        if ((opts as any)?.all) {
          const rot = arr.slice(start % arr.length).concat(arr.slice(0, start % arr.length));
          cb(null, rot.map((a) => ({ address: a, family: 4 })), 4);
          return;
        }
        cb(null, arr[start % arr.length], 4);
        return;
      }
    }
    dns.lookup(hostname, { ...opts, family: 4 }, cb);
  });
}

function once(url: string, timeoutMs: number): Promise<any> {
  return new Promise((resolve, reject) => {
    let u: URL;
    try {
      u = new URL(url);
    } catch {
      reject(new Error("bad url"));
      return;
    }
    const lib = u.protocol === "http:" ? http : https;
    const req = lib.request(
      url,
      {
        method: "GET",
        lookup: ipv4Lookup,
        headers: {
          "User-Agent": UA,
          Accept: "application/json",
          Connection: "close",
        },
      },
      (res) => {
        const status = res.statusCode || 0;
        if (status < 200 || status >= 300) {
          res.resume();
          reject(new Error(`HTTP ${status}`));
          return;
        }
        const chunks: Buffer[] = [];
        res.on("data", (d: Buffer) => chunks.push(d));
        res.on("end", () => {
          try {
            resolve(JSON.parse(Buffer.concat(chunks).toString("utf8")));
          } catch (e: any) {
            reject(new Error(`bad JSON: ${String(e?.message || e).slice(0, 80)}`));
          }
        });
      }
    );
    req.on("error", reject);
    req.setTimeout(timeoutMs, () => {
      try {
        req.destroy(new Error("timeout"));
      } catch {
        reject(new Error("timeout"));
      }
    });
    req.end();
  });
}

export async function getJson(url: string, opts: { timeoutMs?: number; retries?: number; label?: string } = {}): Promise<any> {
  const timeoutMs = opts.timeoutMs ?? 15000;
  // Resets are instant (not timeouts) — extra attempts cost ~1s each and
  // often land on a healthy node thanks to rotation above. Jitter keeps
  // parallel bursts (home page) from retrying in lockstep.
  const retries = opts.retries ?? 6;
  const label = opts.label || url;
  let lastErr: any = null;
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await once(url, timeoutMs);
    } catch (e: any) {
      lastErr = e;
      console.error(`[http] ${label} attempt ${attempt}/${retries} failed: ${String(e?.message || e).slice(0, 160)}`);
      if (attempt < retries) await sleep(500 * attempt + Math.floor(Math.random() * 300));
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error(String(lastErr));
}

export function withParams(base: string, params: Record<string, string>) {
  const u = new URL(base);
  for (const [k, v] of Object.entries(params)) u.searchParams.set(k, v);
  return u.toString();
}
