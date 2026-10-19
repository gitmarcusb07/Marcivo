import { useCallback, useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import {
  Play, Pause, Volume2, VolumeX, Maximize2, Minimize2, Loader2,
  Gauge, PictureInPicture2, RotateCcw, RotateCw, AlertCircle, Languages, MonitorPlay,
} from "lucide-react";
import { api, isLite } from "../lib/api";

// Marcivo port of the teraplayer video player (player only — no info card):
// direct + HLS attach with position-preserving upgrade, session resume,
// ±10s seek, volume, speed, PiP, fullscreen, retry recovery, error card.
// PLUS: multi-audio + quality menus driven by Marcivo's HLS engine, native
// video aspect (never stretched), and one proxy retry before giving up.

interface Props {
  title: string;
  directUrl: string;
  hlsMaster: string | null;
  hlsAudios: { label: string; flag: string; code: string }[];
  hlsQualities: { label: string; height: number }[];
  /** Stable id (content_id) so resume survives fresh signed URLs. */
  resumeKey?: string;
  autoPlay?: boolean;
  onBack: () => void;
  onFatal: (msg: string) => void;
  onNeedHls?: () => void;
  /** Seekable-upgrade URL: swapped in at the current position (same content,
      Range-capable file) without resetting playback. */
  upgradeUrl?: string | null;
}

const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2];

function fmt(sec: number) {
  if (!isFinite(sec) || sec < 0) sec = 0;
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = Math.floor(sec % 60);
  const mm = h > 0 ? String(m).padStart(2, "0") : String(m);
  return (h > 0 ? `${h}:` : "") + `${mm}:${String(s).padStart(2, "0")}`;
}

function hashStr(str: string) {
  let h = 5381;
  for (let i = 0; i < str.length; i += 1) h = ((h << 5) + h + str.charCodeAt(i)) >>> 0;
  return h.toString(36);
}

export default function TeraPlayer({ title, directUrl, hlsMaster, hlsAudios, hlsQualities, resumeKey, autoPlay = true, onBack, onFatal, onNeedHls, upgradeUrl }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [buffering, setBuffering] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [rate, setRate] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [playbackError, setPlaybackError] = useState<string | null>(null);
  const [resumePos, setResumePos] = useState<number | null>(null);
  const [reloadToken, setReloadToken] = useState(0);
  const [sheet, setSheet] = useState<"audio" | "quality" | null>(null);
  const [tracks, setTracks] = useState<{ label: string; flag: string }[]>([]);
  const [activeTrack, setActiveTrack] = useState(0);
  const [levels, setLevels] = useState<{ label: string }[]>([]);
  const [activeLevel, setActiveLevel] = useState(-1);
  const [hlsOn, setHlsOn] = useState(false);
  const hideTimer = useRef<any>(null);
  const retriesRef = useRef(0);
  const resumeKeyRef = useRef<string | null>(null);
  const lastSaveRef = useRef(0);
  const proxiedRef = useRef(false);
  const hlsUpgradedRef = useRef(false);
  const lastTimeRef = useRef(0);
  const activeLevelRef = useRef(-1);
  activeLevelRef.current = activeLevel;
  const fatalRef = useRef(onFatal);
  fatalRef.current = onFatal;

  const saveResume = useCallback((pos: number) => {
    if (!resumeKeyRef.current) return;
    try { sessionStorage.setItem(resumeKeyRef.current, JSON.stringify({ t: pos, d: Date.now() })); } catch {}
  }, []);

  const clearResume = useCallback(() => {
    if (!resumeKeyRef.current) return;
    try { sessionStorage.removeItem(resumeKeyRef.current); } catch {}
  }, []);

  const surfaceError = useCallback(() => {
    setBuffering(false);
    setPlaybackError("Video playback couldn't be started.");
  }, []);

  const tryAgain = useCallback(() => {
    setPlaybackError(null);
    setBuffering(true);
    setReloadToken((t) => t + 1);
  }, []);

  const resume = useCallback(() => {
    const v = videoRef.current;
    if (!v || resumePos == null) return;
    v.currentTime = resumePos;
    setResumePos(null);
    v.play().catch(() => {});
  }, [resumePos]);

  const startOver = useCallback(() => {
    clearResume();
    setResumePos(null);
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.play().catch(() => {});
  }, [clearResume]);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  }, []);

  const seek = useCallback((delta: number) => {
    const v = videoRef.current;
    if (!v) return;
    const max = isFinite(v.duration) && v.duration > 0 ? v.duration : (duration > 0 ? duration : Number.MAX_SAFE_INTEGER);
    v.currentTime = Math.max(0, Math.min(max, (v.currentTime || 0) + delta));
  }, [duration]);

  const changeVolume = useCallback((val: number) => {
    const v = videoRef.current;
    if (!v) return;
    v.volume = val;
    v.muted = val === 0;
    setVolume(val);
    setMuted(val === 0);
  }, []);

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }, []);

  const enterFullscreen = useCallback(async () => {
    const el = wrapRef.current as any;
    if (!el) return;
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (el.requestFullscreen) await el.requestFullscreen();
      else if (el.webkitEnterFullscreen) el.webkitEnterFullscreen();
    } catch {}
  }, []);

  const enterPip = useCallback(async () => {
    const v = videoRef.current as any;
    if (!v) return;
    try {
      if ((document as any).pictureInPictureElement) await (document as any).exitPictureInPicture();
      else if (v.requestPictureInPicture) await v.requestPictureInPicture();
    } catch {}
  }, []);

  const setSpeed = useCallback((r: number) => {
    const v = videoRef.current;
    if (!v) return;
    v.playbackRate = r;
    setRate(r);
  }, []);

  const revealControls = useCallback(() => {
    setShowControls(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      if (!videoRef.current?.paused) setShowControls(false);
    }, 2800);
  }, []);

  // Main attach effect: direct source, resume prompt, autoplay.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !directUrl) return;
    let hls: Hls | null = null;
    resumeKeyRef.current = resumeKey || (directUrl ? `tp:resume:${hashStr(directUrl)}` : null);
    appliedUpgrade.current = "";
    retriesRef.current = 0;
    proxiedRef.current = false;
    hlsUpgradedRef.current = false;
    lastTimeRef.current = 0;
    lastSaveRef.current = 0;
    setPlaybackError(null);
    setResumePos(null);
    setTracks([]);
    setLevels([]);
    setActiveLevel(-1);
    setHlsOn(false);
    // Direct .m3u8 source (e.g. Cinejoy): Chrome/Firefox can't play HLS in a
    // native <video>, so attach hls.js here. Safari (no MSE) keeps native
    // playback through v.src below.
    const hlsDirect = /\.m3u8(\?|#|$)/i.test(directUrl || "") && Hls.isSupported();
    let resumePending = false;
    if (resumeKeyRef.current) {
      try {
        const raw = sessionStorage.getItem(resumeKeyRef.current);
        if (raw) {
          const saved = JSON.parse(raw);
          if (saved && typeof saved.t === "number" && saved.t >= 10) resumePending = true;
        }
      } catch {}
    }
    const persist = () => {
      if (v && !v.ended && Number.isFinite(v.currentTime) && v.currentTime > 5) {
        saveResume(v.currentTime);
        lastTimeRef.current = v.currentTime;
      }
    };
    const onPlay = () => setPlaying(true);
    const onPause = () => { setPlaying(false); persist(); };
    const onTime = () => {
      setCurrent(v.currentTime);
      if (v.currentTime > 0) lastTimeRef.current = v.currentTime;
      const now = Date.now();
      if (now - lastSaveRef.current > 4000) { lastSaveRef.current = now; persist(); }
    };
    const onLoaded = () => {
      setDuration(v.duration || 0);
      setBuffering(false);
      // Native aspect — frame follows the file, never stretched.
      try {
        const vw = (v as any).videoWidth || 0, vh = (v as any).videoHeight || 0;
        if (vw > 0 && vh > 0 && wrapRef.current) wrapRef.current.style.aspectRatio = `${vw} / ${vh}`;
      } catch {}
      let hasResume = false;
      if (resumeKeyRef.current && Number.isFinite(v.duration)) {
        try {
          const raw = sessionStorage.getItem(resumeKeyRef.current);
          if (raw) {
            const saved = JSON.parse(raw);
            if (saved && typeof saved.t === "number" && saved.t >= 10 && v.duration > 30 && saved.t < v.duration - 10) {
              hasResume = true;
              setResumePos(saved.t);
            }
          }
        } catch {}
      }
      if (autoPlay && !hasResume) v.play().catch(() => {});
    };
    const onEnded = () => { setPlaying(false); clearResume(); };
    const onWait = () => setBuffering(true);
    const onCanPlay = () => setBuffering(false);
    const onNativeError = () => {
      // hls.js-managed sources recover in their own error handler — a native
      // <video> proxy retry can't fix an MSE stream.
      if (hlsDirect) { surfaceError(); return; }
      // One proxy retry before surfacing (mirrors old player behavior).
      // LITE: no proxy on the backend (501) — surface immediately, no retry.
      if (!proxiedRef.current && directUrl && !isLite()) {
        proxiedRef.current = true;
        const t = lastTimeRef.current || 0;
        v.src = api.streamUrl(directUrl);
        const go = () => {
          try { if (t > 1) v.currentTime = t; } catch {}
          v.play().catch(() => {});
        };
        v.addEventListener("loadedmetadata", go, { once: true });
        v.play().catch(() => {});
        return;
      }
      surfaceError();
    };
    const attemptAutoplay = () => {
      if (!autoPlay || resumePending) return;
      v.play().catch(() => {});
    };
    if (hlsDirect) {
      const dh = new Hls({ enableWorker: true });
      hls = dh;
      hlsRef.current = dh;
      dh.on(Hls.Events.MANIFEST_PARSED, () => {
        setBuffering(false);
        attemptAutoplay();
      });
      dh.on(Hls.Events.ERROR, (_e: any, data: any) => {
        if (!data?.fatal) return;
        if (retriesRef.current < 2) {
          retriesRef.current += 1;
          try {
            if (data.type === Hls.ErrorTypes.NETWORK_ERROR) { dh.startLoad(); return; }
            if (data.type === Hls.ErrorTypes.MEDIA_ERROR) { dh.recoverMediaError(); return; }
          } catch {}
        }
        try { dh.destroy(); } catch {}
        hlsRef.current = null;
        hls = null;
        surfaceError();
      });
      try {
        dh.loadSource(directUrl);
        dh.attachMedia(v);
      } catch {
        hlsRef.current = null;
        hls = null;
        v.src = directUrl || "";
      }
    } else {
      v.src = directUrl || "";
    }
    attemptAutoplay();
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("loadedmetadata", onLoaded);
    v.addEventListener("ended", onEnded);
    v.addEventListener("waiting", onWait);
    v.addEventListener("canplay", onCanPlay);
    v.addEventListener("error", onNativeError);
    return () => {
      persist();
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("loadedmetadata", onLoaded);
      v.removeEventListener("ended", onEnded);
      v.removeEventListener("waiting", onWait);
      v.removeEventListener("canplay", onCanPlay);
      v.removeEventListener("error", onNativeError);
      if (hls) { try { hls.destroy(); } catch {} hls = null; }
      hlsRef.current = null;
      v.removeAttribute("src");
      v.load();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [directUrl, reloadToken]);

  // HLS upgrade: Marcivo engine publishes a multi-audio master later.
  // Attaches in place and resumes the exact position once flowing.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !hlsMaster || hlsRef.current || hlsUpgradedRef.current || !Hls.isSupported()) return;
    const resumeAt = lastTimeRef.current || v.currentTime || 0;
    const hls = new Hls({ enableWorker: true });
    hlsRef.current = hls;
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      const list = (hls.audioTracks || []).map((at: any, i: number) => ({
        label: hlsAudios[i]?.label || at.name || `Audio ${i + 1}`,
        flag: hlsAudios[i]?.flag || "",
      }));
      setTracks(list);
      const lvls = (hls.levels || []).map((l: any, i: number) => ({
        label: hlsQualities[i]?.label || (l.height ? `${l.height}p` : `Q${i + 1}`),
      }));
      setLevels(lvls);
      try {
        const defIdx = Math.max(0, (hls.audioTracks || []).findIndex((at: any) => at.default));
        hls.audioTrack = defIdx;
        setActiveTrack(defIdx);
      } catch {}
      setHlsOn(true);
    });
    hls.on(Hls.Events.FRAG_BUFFERED, () => {
      if (hlsUpgradedRef.current) return;
      hlsUpgradedRef.current = true;
      const at = lastTimeRef.current || resumeAt;
      try { if (at > 1 && Math.abs(v.currentTime - at) > 2) v.currentTime = at; } catch {}
      v.play().catch(() => {});
    });
    hls.on(Hls.Events.AUDIO_TRACK_SWITCHED, (_e: any, data: any) => {
      if (typeof data?.id === "number") setActiveTrack(data.id);
    });
    hls.on(Hls.Events.LEVEL_SWITCHED, (_e: any, data: any) => {
      if (typeof data?.level === "number" && activeLevelRef.current === -1) setActiveLevel(data.level);
    });
    hls.on(Hls.Events.ERROR, (_e: any, data: any) => {
      if (!data?.fatal) return;
      if (retriesRef.current < 2) {
        retriesRef.current += 1;
        try {
          if (data.type === Hls.ErrorTypes.NETWORK_ERROR) { hls.startLoad(); return; }
          if (data.type === Hls.ErrorTypes.MEDIA_ERROR) { hls.recoverMediaError(); return; }
        } catch {}
      }
      try { hls.destroy(); } catch {}
      hlsRef.current = null;
      setHlsOn(false);
    });
    try {
      hls.loadSource(hlsMaster);
      hls.attachMedia(v);
    } catch {
      hlsRef.current = null;
    }
    return () => {};
  }, [hlsMaster, hlsAudios, hlsQualities]);

  const appliedUpgrade = useRef<string>("");
  // Seekable swap: same content, Range-capable file — switch source at the
  // current position. Skipped once HLS has taken over (already seekable).
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !upgradeUrl || appliedUpgrade.current === upgradeUrl) return;
    if (hlsRef.current) return;
    appliedUpgrade.current = upgradeUrl;
    const t = v.currentTime || 0;
    try { lastTimeRef.current = t; } catch {}
    const go = () => {
      try { if (t > 1) v.currentTime = t; } catch {}
      v.play().catch(() => {});
    };
    v.addEventListener("loadedmetadata", go, { once: true });
    try { v.src = upgradeUrl; } catch {}
  }, [upgradeUrl]);

  useEffect(() => {
    const onFs = () => setFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      const tag = (document.activeElement?.tagName || "").toUpperCase();
      if (["INPUT", "TEXTAREA", "SELECT", "BUTTON"].includes(tag)) return;
      const k = e.key.toLowerCase();
      if (k === " " || k === "k") { e.preventDefault(); togglePlay(); }
      else if (k === "arrowleft" || k === "j") seek(-10);
      else if (k === "arrowright" || k === "l") seek(10);
      else if (k === "arrowup") { e.preventDefault(); changeVolume(Math.min(1, volume + 0.1)); }
      else if (k === "arrowdown") { e.preventDefault(); changeVolume(Math.max(0, volume - 0.1)); }
      else if (k === "m") toggleMute();
      else if (k === "f") enterFullscreen();
      else if (k === "p") enterPip();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [togglePlay, seek, changeVolume, toggleMute, enterFullscreen, enterPip, volume]);

  useEffect(() => () => { try { hlsRef.current?.destroy(); } catch {} }, []);

  function pickAudio(i: number) {
    try { if (hlsRef.current) hlsRef.current.audioTrack = i; } catch {}
    setActiveTrack(i);
    setSheet(null);
  }

  function pickQuality(i: number) {
    try {
      const hls = hlsRef.current;
      if (hls) {
        if (i === -1) {
          try { (hls as any).autoLevelEnabled = true; } catch {}
          try { hls.nextLevel = -1; } catch {}
          try { hls.currentLevel = -1; } catch {}
        } else {
          try { (hls as any).autoLevelEnabled = false; } catch {}
          try { hls.nextLevel = i; } catch {}
          try { hls.currentLevel = i; } catch {}
        }
      }
    } catch {}
    setActiveLevel(i);
    setSheet(null);
  }

  function openSheet(s: "audio" | "quality") {
    try { onNeedHls?.(); } catch {}
    setSheet(s);
  }

  const progressPct = duration > 0 ? (current / duration) * 100 : 0;

  return (
    <div
      ref={wrapRef}
      className="relative w-full max-w-full bg-black rounded-xl overflow-hidden select-none"
      style={{ aspectRatio: "16/9", maxHeight: "78vh" }}
      onMouseMove={revealControls}
    >
      <video
        ref={videoRef}
        poster={undefined}
        aria-label={title || "Video player"}
        className="w-full h-full object-contain bg-black"
        playsInline
        preload="metadata"
        onClick={togglePlay}
      />

      {buffering && !playbackError && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-white/80" />
        </div>
      )}

      {resumePos != null && !playbackError && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-card p-4 text-center shadow-2xl">
            <div className="text-sm font-semibold sm:text-base">Resume from {fmt(resumePos)}?</div>
            <p className="mt-1 text-xs text-muted">You were watching this earlier.</p>
            <div className="mt-3 flex gap-2">
              <button onClick={resume} className="flex-1 px-4 py-2 rounded-lg bg-netflix font-bold text-sm">Resume</button>
              <button onClick={startOver} className="flex-1 px-4 py-2 rounded-lg bg-white/10 font-bold text-sm">Restart</button>
            </div>
          </div>
        </div>
      )}

      {playbackError && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 p-4" role="alert">
          <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-card p-4 text-center shadow-2xl">
            <AlertCircle className="mx-auto mb-2 h-7 w-7 text-netflix" />
            <div className="text-sm font-semibold sm:text-base">Video playback couldn't be started.</div>
            <div className="mt-3 flex flex-col gap-2">
              <button onClick={tryAgain} className="w-full px-4 py-2 rounded-lg bg-netflix font-bold text-sm">Retry</button>
              <button onClick={onBack} className="w-full px-4 py-2 rounded-lg bg-white/10 font-bold text-sm">← Other versions</button>
            </div>
          </div>
        </div>
      )}

      {!playing && !buffering && !playbackError && (
        <button
          onClick={(e) => { e.stopPropagation(); togglePlay(); }}
          className="absolute left-1/2 top-1/2 z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 border border-white/20 text-white backdrop-blur-md active:scale-95"
          aria-label={title ? `Play ${title}` : "Play"}
        >
          <Play className="h-6 w-6 fill-white" strokeWidth={0} />
        </button>
      )}

      {title && (
        <div className={`pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-black/70 to-transparent px-4 py-3 text-sm font-medium text-white/90 transition-opacity ${showControls ? "opacity-100" : "opacity-0"}`}>
          <span className="line-clamp-1">{title}</span>
        </div>
      )}

      <div className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent px-3 pb-3 pt-8 transition-opacity ${showControls ? "opacity-100" : "opacity-0"}`}>
        <input
          type="range" min={0} max={duration || 0} step={0.1} value={Math.min(current, duration || 0)}
          onChange={(e) => { const v = videoRef.current; if (v) v.currentTime = Number(e.target.value); }}
          className="tp-range w-full"
          style={{ background: `linear-gradient(to right, #e50914 0%, #e50914 ${progressPct}%, rgba(255,255,255,0.15) ${progressPct}%, rgba(255,255,255,0.15) 100%)` }}
          aria-label="Seek"
        />
        <div className="mt-2 flex items-center gap-1.5 text-white">
          <button onClick={togglePlay} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 hover:bg-white/20" aria-label={playing ? "Pause" : "Play"}>
            {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </button>
          <button onClick={() => seek(-10)} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 hover:bg-white/20" aria-label="Back 10 seconds">
            <RotateCcw className="h-5 w-5" />
          </button>
          <button onClick={() => seek(10)} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 hover:bg-white/20" aria-label="Forward 10 seconds">
            <RotateCw className="h-5 w-5" />
          </button>
          <button onClick={toggleMute} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 hover:bg-white/20" aria-label={muted ? "Unmute" : "Mute"}>
            {muted || volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </button>
          <input
            type="range" min={0} max={1} step={0.05} value={muted ? 0 : volume}
            onChange={(e) => changeVolume(Number(e.target.value))}
            className="tp-range w-16 hidden sm:block"
            aria-label="Volume"
          />
          <div className="ml-1 whitespace-nowrap font-mono text-xs text-white/80">
            {fmt(current)} <span className="text-white/40">/ {fmt(duration)}</span>
          </div>
          <div className="ml-auto flex items-center gap-1">
            <button onClick={cycleRate} className="flex h-9 min-w-[3rem] shrink-0 items-center justify-center rounded-lg bg-white/10 px-2 text-sm font-bold hover:bg-white/20" aria-label="Speed">
              <Gauge className="mr-1 h-4 w-4" />{rate}x
            </button>
            <button onClick={() => openSheet("audio")} className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 hover:bg-white/20" aria-label="Audio tracks">
              <Languages className="h-5 w-5" />
              {tracks.length > 1 && <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-netflix" />}
            </button>
            <button onClick={() => openSheet("quality")} className="flex h-9 min-w-[3.5rem] shrink-0 items-center justify-center rounded-lg bg-white/10 px-2 text-sm font-bold hover:bg-white/20" aria-label="Quality">
              <MonitorPlay className="mr-1 h-4 w-4" />{levels.length > 1 ? (activeLevel === -1 ? "Auto" : levels[activeLevel]?.label || "Auto") : "HD"}
            </button>
            <button onClick={enterPip} className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 sm:flex" aria-label="Picture in picture">
              <PictureInPicture2 className="h-5 w-5" />
            </button>
            <button onClick={enterFullscreen} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 hover:bg-white/20" aria-label="Fullscreen">
              {fullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {sheet && (
        <div className="absolute inset-0 z-20 bg-black/70 flex items-end" onClick={() => setSheet(null)}>
          <div className="w-full bg-[#1c1c1e] rounded-t-2xl p-4 max-h-[70%] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="font-bold text-lg mb-2">{sheet === "audio" ? `Audio${tracks.length > 1 ? ` (${tracks.length} tracks)` : ""}` : "Quality"}</div>
            {sheet === "audio" && tracks.length > 1 && tracks.map((t, i) => (
              <button
                key={i}
                onClick={() => pickAudio(i)}
                className={`w-full text-left px-3 py-3 rounded-lg text-base flex items-center justify-between ${i === activeTrack ? "bg-netflix/20 text-white" : "text-gray-200"}`}
              >
                <span>{t.flag} {t.label}</span>
                {i === activeTrack && <span>✓</span>}
              </button>
            ))}
            {sheet === "audio" && tracks.length <= 1 && (
              <p className="text-sm text-muted px-1 py-2">🎧 Checking for more audio tracks — options appear here automatically if this file has them.</p>
            )}
            {sheet === "quality" && levels.length > 1 && (
              <>
                <button
                  onClick={() => pickQuality(-1)}
                  className={`w-full text-left px-3 py-3 rounded-lg text-base flex items-center justify-between ${activeLevel === -1 ? "bg-netflix/20 text-white" : "text-gray-200"}`}
                >
                  <span>✨ Auto (recommended)</span>
                  {activeLevel === -1 && <span>✓</span>}
                </button>
                {levels.map((l, i) => (
                  <button
                    key={i}
                    onClick={() => pickQuality(i)}
                    className={`w-full text-left px-3 py-3 rounded-lg text-base flex items-center justify-between ${i === activeLevel ? "bg-netflix/20 text-white" : "text-gray-200"}`}
                  >
                    <span>📺 {l.label}{i === levels.length - 1 ? " • best" : i === 0 ? " • saves data" : ""}</span>
                    {i === activeLevel && <span>✓</span>}
                  </button>
                ))}
              </>
            )}
            {sheet === "quality" && levels.length <= 1 && (
              <div className="w-full text-left px-3 py-3 rounded-lg text-base flex items-center justify-between bg-netflix/20 text-white">
                <span>📺 Original quality (direct stream)</span>
                <span>✓</span>
              </div>
            )}
            <button onClick={() => setSheet(null)} className="w-full mt-2 py-3 rounded-lg bg-white/10 font-bold text-base">Close</button>
          </div>
        </div>
      )}
    </div>
  );

  function cycleRate() {
    const next = [1, 1.25, 1.5, 2, 0.5][([1, 1.25, 1.5, 2, 0.5].indexOf(rate) + 1) % 5];
    setSpeed(next);
  }
}
