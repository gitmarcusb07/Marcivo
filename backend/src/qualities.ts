// Per-quality download options parsed from a source content page, plus the
// lazy per-quality resolve behind /api/quality-source. Pure HTTP only, so
// it works in LITE (no browser, no ffmpeg, no HLS engine). The player uses
// it to offer quality switching for direct-file plays; audio switching
// reuses the same options when a page lists sibling audio variants
// (separate Hindi vs Dual-Audio files). In-file multi-track switching is
// NOT possible here — a plain <video src> never exposes audioTracks —
// so a file only ever plays its default audio track.
import axios from "axios";

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";
const INTER_HOST_RE = /^https?:\/\/[^/]*(nexdrive|genxfm|vcloud)[^/]*\//i;
const ANCHOR_RE = /<a\b[^>]*?href\s*=\s*["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
const RES_RE = /\b(2160|1440|1080|720|576|480|360|240)p\b|\b4k\b/i;
const SIZE_RE = /(\d+(?:\.\d+)?\s*[GM]B)\b/i;
const LANGS = ["Hindi", "English", "Tamil", "Telugu", "Malayalam", "Kannada", "Bengali", "Marathi", "Punjabi", "Gujarati", "Korean", "Japanese", "Spanish", "French"];
const LANG_RE = new RegExp(`\\b(${LANGS.join("|")})\\b`, "gi");
// ISO 639-2 codes as they appear in file metadata (ffprobe language tags).
const ISO_LANG: Record<string, string> = {
  hin: "Hindi", eng: "English", tam: "Tamil", tel: "Telugu", mal: "Malayalam",
  kan: "Kannada", ben: "Bengali", mar: "Marathi", pan: "Punjabi", guj: "Gujarati",
  kor: "Korean", jpn: "Japanese", spa: "Spanish", fre: "French",
};
const ISO_RE = new RegExp(`\\b(${Object.keys(ISO_LANG).join("|")})\\b`, "gi");

export interface QualityOption {
  index: number;
  label: string;        // compact, e.g. "1080p HQ · 6.1GB"
  raw: string;          // full heading/button line from the page
  height: number | null;
  size: string | null;
  audio: string | null; // e.g. "Hindi", "Dual Audio (Hindi + Tamil)"
  interUrls: string[];  // internal only, never sent to clients
}
export type PublicQualityOption = Omit<QualityOption, "interUrls">;

export function stripTags(s: string): string {
  return s
    .replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, " ")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|h\d|li|tr)>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/[ \t]+/g, " ");
}

export function audioLabel(text: string): string | null {
  const t = text.replace(/\s+/g, " ");
  const multi = /multi[\s-]*audio/i.test(t);
  const dual = /dual[\s-]*audio/i.test(t);
  const langs = Array.from(new Set((t.match(LANG_RE) || []).map((l) => l[0].toUpperCase() + l.slice(1).toLowerCase())));
  for (const m of t.match(ISO_RE) || []) {
    const name = ISO_LANG[m.toLowerCase()];
    if (name && !langs.includes(name)) langs.push(name);
  }
  if (multi || dual) return `${multi ? "Multi" : "Dual"} Audio${langs.length ? ` (${langs.join(" + ")})` : ""}`;
  return langs.length ? langs.join(" + ") : null;
}

export function pageAudioHint(html: string): string | null {
  const title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || "";
  const h1 = (html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [])[1] || "";
  return audioLabel(stripTags(`${title} ${h1}`));
}

function compactLabel(line: string): { label: string; height: number | null; size: string | null } {
  const r = line.match(RES_RE);
  const height = r ? (r[1] ? parseInt(r[1], 10) : 2160) : null;
  const size = (line.match(SIZE_RE) || [])[1]?.replace(/\s+/g, "") || null;
  let label = height ? `${height}p` : "Unknown";
  if (/\bHQ\b/i.test(line)) label += " HQ";
  if (/x265|hevc|10\s*bit/i.test(line)) label += " HEVC";
  if (size) label += ` · ${size}`;
  return { label, height, size };
}

/** All quality download buttons (nexdrive/genxfm/vcloud) on a content page, in page order. */
export function extractQualityOptions(html: string, baseUrl: string): QualityOption[] {
  const byKey = new Map<string, QualityOption>();
  let prevEnd = 0;
  let lastLine = "";
  let m: RegExpExecArray | null;
  ANCHOR_RE.lastIndex = 0;
  while ((m = ANCHOR_RE.exec(html))) {
    const between = html.slice(Math.max(prevEnd, m.index - 2000), m.index);
    prevEnd = m.index + m[0].length;
    let href: string;
    try { href = new URL(m[1].replace(/&amp;/g, "&"), baseUrl).toString(); } catch { continue; }
    if (!INTER_HOST_RE.test(href)) continue;
    const text = stripTags(m[2]).replace(/\s+/g, " ").trim();
    const ctx = stripTags(between).split("\n").map((l) => l.replace(/\s+/g, " ").trim()).filter(Boolean);
    const line = RES_RE.test(text) ? text : [...ctx].reverse().find((l) => RES_RE.test(l)) || lastLine;
    if (!line) continue;
    lastLine = line;
    const key = line.toLowerCase();
    const existing = byKey.get(key);
    if (existing) {
      if (!existing.interUrls.includes(href)) existing.interUrls.push(href);
      continue;
    }
    byKey.set(key, { index: byKey.size, raw: line.slice(0, 160), audio: audioLabel(line), interUrls: [href], ...compactLabel(line) });
  }
  return Array.from(byKey.values());
}

export const toPublic = ({ interUrls, ...rest }: QualityOption): PublicQualityOption => rest;

export async function fetchHtml(url: string): Promise<string> {
  const r = await axios.get<string>(url, { timeout: 12000, maxRedirects: 5, responseType: "text", headers: { "User-Agent": UA } });
  return String(r.data);
}

/** true = server honours Range (206), false = ignores it (200), null = unknown. */
export async function probeSeekable(url: string, referer?: string): Promise<boolean | null> {
  try {
    const r = await axios.get(url, {
      headers: { Range: "bytes=0-1", "User-Agent": UA, ...(referer ? { Referer: referer } : {}) },
      responseType: "stream", timeout: 8000, maxRedirects: 5, validateStatus: () => true,
    });
    r.data.destroy();
    return r.status === 206 ? true : r.status === 200 ? false : null;
  } catch { return null; }
}

export function isSafePublicUrl(u: string): boolean {
  try {
    const { protocol, hostname } = new URL(u);
    if (protocol !== "http:" && protocol !== "https:") return false;
    return !/^(localhost|127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|0\.|169\.254\.|\[?::1\]?$)/i.test(hostname);
  } catch { return false; }
}

export class TtlCache<T> {
  private m = new Map<string, { v: T; exp: number }>();
  private inflight = new Map<string, Promise<T>>();
  constructor(private ttlMs: number, private max = 300) {}
  async get(key: string, fn: () => Promise<T>): Promise<T> {
    const hit = this.m.get(key);
    if (hit && hit.exp > Date.now()) return hit.v;
    const running = this.inflight.get(key);
    if (running) return running;
    const p = fn().then((v) => {
      this.m.set(key, { v, exp: Date.now() + this.ttlMs });
      if (this.m.size > this.max) this.m.delete(this.m.keys().next().value as string);
      return v;
    }).finally(() => this.inflight.delete(key));
    this.inflight.set(key, p);
    return p;
  }
}

const hits = new Map<string, number[]>();
export function allowRequest(ip: string, limit = 20, windowMs = 60_000): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < windowMs);
  if (arr.length >= limit) { hits.set(ip, arr); return false; }
  arr.push(now);
  hits.set(ip, arr);
  if (hits.size > 5000) hits.clear();
  return true;
}
