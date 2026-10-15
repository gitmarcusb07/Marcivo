import { spawn } from "child_process";
import * as crypto from "crypto";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";

// Marcivo native audio-switching engine (app-owned, no bot dependency):
// media URL -> ffprobe (detect video + ALL audio tracks) ->
// ffmpeg (multi-quality video ladder + every audio track, event/VOD HLS) ->
// HLS_CACHE/<sid>/{master.m3u8, stream_*.m3u8, seg_*_*.ts} ->
// hls.js player with language + quality buttons.
// Quality-preserving: video CRF 22 / veryfast, audio stream-copy when
// already AAC/MP3 else 256k AAC — no video or audio downgrade.
// Only multi-audio sources convert; single-audio plays direct.

const LANG_LABELS: Record<string, [string, string]> = {
  hin: ["Hindi", "🇮🇳"], hi: ["Hindi", "🇮🇳"],
  eng: ["English", "🇬🇧"], en: ["English", "🇬🇧"],
  tam: ["Tamil", "🇮🇳"], ta: ["Tamil", "🇮🇳"],
  tel: ["Telugu", "🇮🇳"], te: ["Telugu", "🇮🇳"],
  mal: ["Malayalam", "🇮🇳"], ml: ["Malayalam", "🇮🇳"],
  kan: ["Kannada", "🇮🇳"], kn: ["Kannada", "🇮🇳"],
  ben: ["Bengali", "🇮🇳"], bn: ["Bengali", "🇮🇳"],
  mar: ["Marathi", "🇮🇳"], mr: ["Marathi", "🇮🇳"],
  guj: ["Gujarati", "🇮🇳"], gu: ["Gujarati", "🇮🇳"],
  pan: ["Punjabi", "🇮🇳"], pa: ["Punjabi", "🇮🇳"],
  urd: ["Urdu", "🇵🇰"], ur: ["Urdu", "🇵🇰"],
  spa: ["Spanish", "🇪🇸"], es: ["Spanish", "🇪🇸"],
  fre: ["French", "🇫🇷"], fra: ["French", "🇫🇷"], fr: ["French", "🇫🇷"],
  ger: ["German", "🇩🇪"], deu: ["German", "🇩🇪"], de: ["German", "🇩🇪"],
  ita: ["Italian", "🇮🇹"], it: ["Italian", "🇮🇹"],
  por: ["Portuguese", "🇵🇹"], pt: ["Portuguese", "🇵🇹"],
  rus: ["Russian", "🇷🇺"], ru: ["Russian", "🇷🇺"],
  ara: ["Arabic", "🇸🇦"], ar: ["Arabic", "🇸🇦"],
  jpn: ["Japanese", "🇯🇵"], ja: ["Japanese", "🇯🇵"],
  kor: ["Korean", "🇰🇷"], ko: ["Korean", "🇰🇷"],
  zho: ["Chinese", "🇨🇳"], chi: ["Chinese", "🇨🇳"], zh: ["Chinese", "🇨🇳"],
  und: ["Audio", "🎵"],
};

const SID_RE = /^[0-9a-f]{24}$/;
const PLAYLIST_RE = /^(master|stream_\d+)\.m3u8$/;
const SEGMENT_RE = /^seg_\d+_\d+\.ts$/;

export interface AudioTrack { index: number; codec: string; channels: number; code: string; label: string; flag: string; default: boolean; }
export interface VideoInfo { index: number; width: number; height: number; codec: string; bitrate: number; }

export function sessionIdFor(mediaUrl: string) {
  return crypto.createHash("sha256").update(mediaUrl, "utf8").digest("hex").slice(0, 24);
}

function labelFor(code: string, title = ""): [string, string, string] {
  const c = (code || "").trim().toLowerCase();
  if (LANG_LABELS[c]) return [LANG_LABELS[c][0], LANG_LABELS[c][1], c];
  if (title) return [title.slice(0, 24), "🎵", c || "und"];
  if (c) return [c.toUpperCase(), "🎵", c];
  return ["Audio", "🎵", "und"];
}

function redact(text: string, secret = "") {
  let out = String(text || "");
  try {
    if (secret) out = out.split(secret).join("<media-url>");
    out = out.replace(/https?:\/\/[^\s"'<>]*\?[^\s"'<>]*/g, "<url-with-query>");
  } catch {}
  return out;
}

function runCmd(bin: string, args: string[], timeoutMs: number, cwd?: string): Promise<{ rc: number | null; out: Buffer; err: Buffer }> {
  return new Promise((resolve) => {
    let child: ReturnType<typeof spawn>;
    try {
      child = spawn(bin, args, { cwd, windowsHide: true });
    } catch {
      resolve({ rc: null, out: Buffer.alloc(0), err: Buffer.alloc(0) });
      return;
    }
    const out: Buffer[] = [];
    const err: Buffer[] = [];
    child.stdout?.on("data", (d: Buffer) => out.push(d));
    child.stderr?.on("data", (d: Buffer) => err.push(d));
    const timer = setTimeout(() => { try { child.kill(); } catch {} resolve({ rc: -1, out: Buffer.concat(out), err: Buffer.concat(err) }); }, timeoutMs);
    child.on("error", () => { clearTimeout(timer); resolve({ rc: null, out: Buffer.alloc(0), err: Buffer.alloc(0) }); });
    child.on("close", (rc) => { clearTimeout(timer); resolve({ rc, out: Buffer.concat(out), err: Buffer.concat(err) }); });
  });
}

interface Session {
  sid: string; url: string; status: string; audios: AudioTrack[]; videos: VideoInfo[];
  variantHeights: number[];
  error: string; complete: boolean; dir: string; lastAccess: number; converting: boolean;
}

export class HLSManager {
  private cacheDir: string;
  private segmentTime: number;
  private sessionTtl: number;
  private maxJobs: number;
  private running = 0;
  private convertTimeout: number;
  private progressive: boolean;
  private sessions = new Map<string, Session>();
  private sweepTimer: NodeJS.Timeout | null = null;

  constructor(opts: { cacheDir?: string; segmentTime?: number; sessionTtl?: number; maxJobs?: number; convertTimeout?: number; progressive?: boolean } = {}) {
    this.cacheDir = path.resolve(opts.cacheDir || "./HLS_CACHE");
    this.segmentTime = Math.max(2, opts.segmentTime || 4);
    this.sessionTtl = Math.max(60, opts.sessionTtl || 21600);
    this.maxJobs = Math.max(1, opts.maxJobs || 1);
    this.convertTimeout = Math.max(60, opts.convertTimeout || 7200) * 1000;
    this.progressive = opts.progressive !== false;
    try { fs.mkdirSync(this.cacheDir, { recursive: true }); } catch {}
  }

  startup() {
    try {
      for (const name of fs.readdirSync(this.cacheDir)) {
        const p = path.join(this.cacheDir, name);
        try {
          if (SID_RE.test(name) && fs.statSync(p).isDirectory() && Date.now() - fs.statSync(p).mtimeMs > this.sessionTtl * 1000) {
            fs.rmSync(p, { recursive: true, force: true });
          }
        } catch {}
      }
    } catch {}
    this.sweepTimer = setInterval(() => this.sweep(), 600000);
    if ((this.sweepTimer as any).unref) (this.sweepTimer as any).unref();
  }

  shutdown() {
    if (this.sweepTimer) clearInterval(this.sweepTimer);
    this.sweepTimer = null;
  }

  private sweep() {
    const now = Date.now();
    for (const [sid, s] of this.sessions) {
      if (now - s.lastAccess > this.sessionTtl * 1000 && !s.converting) {
        try { fs.rmSync(s.dir, { recursive: true, force: true }); } catch {}
        this.sessions.delete(sid);
      }
    }
  }

  sessionDir(sid: string): string | null {
    if (!sid || !SID_RE.test(sid)) return null;
    const d = path.resolve(path.join(this.cacheDir, sid));
    if (!d.startsWith(this.cacheDir + path.sep) && d !== path.join(this.cacheDir, sid)) return null;
    try { if (!fs.statSync(d).isDirectory()) return null; } catch { return null; }
    return d;
  }

  allowedFile(name: string) { return PLAYLIST_RE.test(name || "") || SEGMENT_RE.test(name || ""); }

  touch(sid: string) { const s = this.sessions.get(sid); if (s) s.lastAccess = Date.now(); }

  private async probe(mediaUrl: string, timeoutMs = 25000): Promise<any[]> {
    const { rc, out, err } = await runCmd("ffprobe", ["-v", "error", "-print_format", "json", "-show_streams", mediaUrl], timeoutMs);
    if (rc === null) throw new Error("FFprobe executable not found");
    if (rc !== 0) throw new Error("FFprobe failed: " + redact(err.slice(0, 300).toString("utf8"), mediaUrl));
    try {
      return (JSON.parse(out.toString("utf8") || "{}").streams || []) as any[];
    } catch (e: any) {
      throw new Error("FFprobe bad JSON: " + String(e?.message || e));
    }
  }

  private audioTracks(streams: any[]): AudioTrack[] {
    const tracks: AudioTrack[] = [];
    for (const s of streams) {
      try {
        if (String(s.codec_type || "").toLowerCase() !== "audio") continue;
        const tags = s.tags || {};
        const code = String(tags.language || "und").trim().toLowerCase();
        const title = String(tags.title || "").trim();
        const [label, flag, norm] = labelFor(code, title);
        tracks.push({ index: s.index, codec: s.codec_name || "", channels: s.channels || 2, code: norm, label, flag, default: !!(s.disposition || {}).default });
      } catch {}
    }
    if (tracks.length && !tracks.some((t) => t.default)) tracks[0].default = true;
    return tracks;
  }

  private videoStreams(streams: any[]): VideoInfo[] {
    const out: VideoInfo[] = [];
    for (const s of streams) {
      try {
        if (String(s.codec_type || "").toLowerCase() !== "video") continue;
        const w = parseInt(s.width || "0", 10), h = parseInt(s.height || "0", 10);
        if (w <= 0 || h <= 0) continue;
        out.push({ index: s.index, width: w, height: h, codec: s.codec_name || "", bitrate: parseInt(s.bit_rate || "0", 10) || 0 });
      } catch {}
    }
    out.sort((a, b) => a.height - b.height);
    return out;
  }

  private progressPct(s: Session): number | null {
    try {
      const text = fs.readFileSync(path.join(s.dir, "progress.log"), "utf8");
      const m = text.match(/out_time_ms=(\d+)/g);
      if (!m || !m.length) return null;
      const ms = parseInt(m[m.length - 1].split("=")[1], 10) / 1000;
      // Estimate total from source duration when probed (best effort).
      const total = (s as any).durationSec || 0;
      if (!total || total <= 0) return null;
      return Math.max(0, Math.min(99, Math.round((ms / total) * 100)));
    } catch { return null; }
  }

  statusPayload(sid: string, s: Session): any {
    const heights = s.variantHeights && s.variantHeights.length
      ? s.variantHeights
      : (s.videos || []).map((v) => v.height);
    const videos = heights.map((h) => ({ height: h, width: 0, label: `${h}p` }));
    if (s.status === "ready") {
      return { status: "ready", sid, audios: s.audios, videos, master: `/hls/${sid}/master.m3u8`, error: "", partial: !s.complete, complete: s.complete, progress: s.complete ? 100 : this.progressPct(s) };
    }
    if (s.status === "probing" || s.status === "converting") {
      if (s.status === "converting" && this.progressive && this.publishMaster(s.dir, s.audios, s.variantHeights)) {
        s.status = "ready";
        console.log(`[hls] progressive ready ${sid} (${s.audios.length} audios)`);
        return this.statusPayload(sid, s);
      }
      return { status: s.status, sid, audios: s.audios, videos, master: "", error: "", progress: this.progressPct(s) };
    }
    return { status: s.status, sid, audios: [], videos, master: "", error: s.error };
  }

  async status(mediaUrl: string): Promise<any> {
    const sid = sessionIdFor(mediaUrl);
    let s = this.sessions.get(sid);
    if (s) { s.lastAccess = Date.now(); return this.statusPayload(sid, s); }
    s = { sid, url: mediaUrl, status: "probing", audios: [], videos: [], variantHeights: [], error: "", complete: false, dir: path.join(this.cacheDir, sid), lastAccess: Date.now(), converting: false };
    this.sessions.set(sid, s);
    let streams: any[];
    try {
      streams = await this.probe(mediaUrl);
    } catch (e: any) {
      s.status = "failed"; s.error = redact(String(e?.message || e), mediaUrl).slice(0, 300);
      return { status: "failed", sid, audios: [], master: "", error: s.error };
    }
    if (!streams.some((x) => String(x.codec_type || "").toLowerCase() === "video")) {
      s.status = "unsupported"; s.error = "No video stream found";
      return { status: "unsupported", sid, audios: [], master: "", error: s.error };
    }
    s.audios = this.audioTracks(streams);
    s.videos = this.videoStreams(streams);
    try {
      let best = 0;
      for (const st of streams) {
        const dd = parseFloat(st.duration || "0");
        if (dd > best) best = dd;
      }
      (s as any).durationSec = best;
    } catch {}
    if (s.audios.length < 2) {
      s.status = "single";
      return { status: "single", sid, audios: s.audios, master: "", error: "" };
    }
    try {
      for (const f of fs.readdirSync(s.dir)) if (f.endsWith(".m3u8") || f.endsWith(".ts")) { try { fs.unlinkSync(path.join(s.dir, f)); } catch {} }
    } catch {}
    s.status = "converting";
    this.convert(s).catch(() => {});
    return { status: "converting", sid, audios: s.audios, master: "", error: "" };
  }

  private publishMaster(d: string, audios: AudioTrack[], variantHeights: number[], complete = false): boolean {
    const nVideo = variantHeights.length, nAudio = audios.length;
    if (!nVideo) return false;
    for (let i = 0; i < nVideo + nAudio; i++) {
      try {
        const text = fs.readFileSync(path.join(d, `stream_${i}.m3u8`), "utf8");
        if (!text.startsWith("#EXTM3U") || !text.includes("#EXTINF")) return false;
      } catch { return false; }
    }
    const out = ["#EXTM3U", "#EXT-X-VERSION:3"];
    audios.forEach((a, k) => {
      const ai = nVideo + k;
      const def = a.default ? "YES" : "NO";
      out.push(`#EXT-X-MEDIA:TYPE=AUDIO,GROUP-ID="audio",NAME="${a.label}",LANGUAGE="${a.code}",DEFAULT=${def},AUTOSELECT=${def},CHANNELS="${a.channels}",URI="stream_${ai}.m3u8"`);
    });
    for (let i = 0; i < nVideo; i++) {
      const h = variantHeights[i];
      out.push(`#EXT-X-STREAM-INF:RESOLUTION=${Math.round((h * 16) / 9)}x${h},AUDIO="audio"`, `stream_${i}.m3u8`);
    }
    try {
      const tmp = path.join(d, "master.m3u8.tmp");
      fs.writeFileSync(tmp, out.join("\n") + "\n");
      fs.renameSync(tmp, path.join(d, "master.m3u8"));
      return true;
    } catch { return false; }
  }

  private async convert(s: Session): Promise<void> {
    if (this.running >= this.maxJobs) {
      // Simple back-pressure: wait for a slot.
      while (this.running >= this.maxJobs) await new Promise((r) => setTimeout(r, 2000));
    }
    this.running++;
    s.converting = true;
    const sid = s.sid;
    try {
      if (s.status !== "converting") return;
      fs.mkdirSync(s.dir, { recursive: true });
      const videos = s.videos, audios = s.audios;
      if (!videos.length) { s.status = "failed"; s.error = "No video streams to convert"; return; }
      const srcH = videos[videos.length - 1].height, srcW = videos[videos.length - 1].width;
      // Ladder capped at 1080p (laptop-friendly); every variant re-encoded so
      // the filter graph is always valid (no copy-with-filter edge cases).
      const targets = [...new Set([360, 480, 720, 1080].filter((h) => h <= srcH))].sort((a, b) => a - b);
      if (!targets.length) targets.push(Math.min(srcH, 720));
      s.variantHeights = targets;
      console.log(`[hls] ${sid}: source=${srcW}x${srcH} targets=${targets.join(",")}`);
      const nA = audios.length;
      const aArgs: string[] = [];
      audios.forEach((a, i) => {
        const codec = (a.codec || "").toLowerCase();
        if (["aac", "mp3", "mp2"].includes(codec)) aArgs.push(`-c:a:${i}`, "copy");
        else aArgs.push(`-c:a:${i}`, "aac", `-b:a:${i}`, "256k", `-ac:${i}`, String(a.channels || 2));
      });
      const filterParts: string[] = [`[0:v]split=${targets.length}${targets.map((_, i) => `[v${i}]`).join("")}`];
      targets.forEach((h, i) => {
        let w = Math.round((h * srcW) / srcH);
        if (w % 2) w++;
        filterParts.push(`[v${i}]scale=${w}:${h}[vo${i}]`);
      });
      const plType = this.progressive ? "event" : "vod";
      // Video-only variants + audio-only renditions (EXT-X-MEDIA group).
      // NOTE: attaching audios inside video variants (v:0,a:0) does NOT emit
      // separate audio playlists on modern ffmpeg — list them separately.
      const vsm = targets.map((_, i) => `v:${i}`).concat(audios.map((_, a) => `a:${a}`)).join(" ");
      const vArgs: string[] = [];
      targets.forEach((_, i) => {
        vArgs.push(`-c:v:${i}`, "libx264", "-preset", "veryfast", "-crf", "22");
      });
      const maps: string[] = [];
      targets.forEach((_, i) => maps.push("-map", `[vo${i}]`));
      const final = ["ffmpeg", "-y", "-hide_banner", "-loglevel", "warning", "-i", s.url]
        .concat(maps)
        .concat(Array.from({ length: nA }, (_, a) => ["-map", `0:a:${a}`]).flat())
        .concat(["-filter_complex", filterParts.join(";"), "-force_key_frames", `expr:gte(t,n_forced*${this.segmentTime})`,
          "-progress", "progress.log",
          "-f", "hls", "-hls_time", String(this.segmentTime), "-hls_playlist_type", plType,
          "-hls_segment_filename", "seg_%v_%d.ts", "-master_pl_name", "ffmaster.m3u8",
          "-var_stream_map", vsm])
        .concat(vArgs, aArgs, ["stream_%v.m3u8"]);
      console.log(`[hls] ${sid}: ffmpeg start (${targets.length} qualities, ${nA} audios)`);
      const { rc, err } = await runCmd(final[0], final.slice(1), this.convertTimeout, s.dir);
      if (rc !== 0) {
        s.status = "failed";
        s.error = ("FFmpeg failed: " + redact(err.slice(-500).toString("utf8"), s.url)).slice(0, 300);
        console.log(`[hls] ${sid}: failed rc=${rc}`);
        return;
      }
      if (!this.publishMaster(s.dir, audios, s.variantHeights, true) && String(s.status) !== "ready") {
        s.status = "failed"; s.error = "HLS playlists not generated"; return;
      }
      s.status = "ready"; s.complete = true; s.lastAccess = Date.now();
      console.log(`[hls] ${sid}: complete`);
    } catch (e: any) {
      s.status = "failed"; s.error = redact(String(e?.message || e), s.url).slice(0, 300);
    } finally {
      s.converting = false;
      this.running = Math.max(0, this.running - 1);
    }
  }
}

export const LANG_MAP_JS: Record<string, [string, string]> = (() => {
  const o: Record<string, [string, string]> = {};
  for (const [k, v] of Object.entries(LANG_LABELS)) o[k] = v;
  return o;
})();
