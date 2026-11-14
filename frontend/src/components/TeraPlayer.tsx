import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Hls from "hls.js";
import {
  Play, Pause, Volume2, VolumeX, Maximize2, Minimize2, Loader2,
  PictureInPicture2, AlertCircle, Languages, MonitorPlay, Check,
  Share2, ListVideo, Monitor, X, ChevronLeft, ChevronRight,
  EllipsisVertical,
} from "lucide-react";
import { api, isLite, type QualityOption } from "../lib/api";

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
  /** Direct-file quality options for this title (from /api/qualities):
      sibling files per quality/audio. HLS levels take precedence when
      present; these are the fallback for direct plays. */
  directOptions?: QualityOption[] | null;
  directActive?: number;
  directEmbedUrl?: string | null;
  directAudioHint?: string | null;
  /** Lazily resolve ONE picked option to its playable URL (already
      proxied when unseekable). */
  onPickDirect?: (index: number) => Promise<string>;
  onDirectActive?: (index: number) => void;
  onSwitchToEmbed?: () => void;
  onNote?: (msg: string) => void;
  /** Stable id (content_id) so resume survives fresh signed URLs. */
  resumeKey?: string;
  autoPlay?: boolean;
  onBack: () => void;
  onFatal: (msg: string) => void;
  onNeedHls?: () => void;
  /** Seekable-upgrade URL: swapped in at the current position (same content,
      Range-capable file) without resetting playback. */
  upgradeUrl?: string | null;
  /** Poster image for the full-bleed backdrop behind the video. */
  poster?: string | null;
  /** Short meta line under the title, e.g. "S02E03" or "2026". */
  metaLine?: string | null;
  /** Audio/language line under the title, e.g. "English, Hindi" (shown in gold). */
  audioLine?: string | null;
  /** Episode list for series (drives the EPISODES panel + Previous/Next). */
  episodes?: { season: number; episode: number; title: string; runtime?: string; poster?: string | null }[] | null;
  episodeIndex?: number;
  onSelectEpisode?: (season: number, episode: number) => void;
  onPrevEpisode?: () => void;
  onNextEpisode?: () => void;
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

export default function TeraPlayer({ title, directUrl, hlsMaster, hlsAudios, hlsQualities, directOptions, directActive, directEmbedUrl, directAudioHint, onPickDirect, onDirectActive, onSwitchToEmbed, onNote, resumeKey, autoPlay = true, onBack, onFatal, onNeedHls, upgradeUrl, poster, metaLine, audioLine, episodes, episodeIndex, onSelectEpisode, onPrevEpisode, onNextEpisode }: Props) {
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
  const [swapping, setSwapping] = useState(false);
  // Vegamovies-style chrome state.
  const [displayMode, setDisplayMode] = useState<"fit" | "crop" | "stretch">("fit");
  const [panel, setPanel] = useState<"speed" | "screen" | "episodes" | "more" | null>(null);
  const [copied, setCopied] = useState(false);
  // Episodes panel: which season's list is shown (null = the current
  // episode's season). Reset whenever the playing episode changes.
  const [panelSeason, setPanelSeason] = useState<number | null>(null);
  const epSeasons = Array.from(new Set((episodes || []).map((e) => e.season))).sort((a, b) => a - b);
  const shownSeason = panelSeason ?? episodes?.[episodeIndex ?? -1]?.season ?? epSeasons[0];
  useEffect(() => { setPanelSeason(null); }, [episodeIndex]);

  // Position-preserving src swap (generalised form of the upgradeUrl
  // mechanism): swap the playing file at the current position, keeping
  // play/pause state and speed. Used by quality/audio picks.
  const swapSource = useCallback((url: string, at?: number, play?: boolean) =>
    new Promise<void>((resolve, reject) => {
      const v = videoRef.current;
      if (!v) return reject(new Error("no video"));
      const t = at ?? v.currentTime, resume = play ?? !v.paused, rate = v.playbackRate;
      // Big direct files (multi-GB MKV via the /edge/stream proxy) can take
      // well over 20s before loadedmetadata fires — the first play of the
      // same file takes ~60s to start. A short timeout fails the swap and
      // strands the player, so give the new file 75s to load its metadata.
      const done = () => { v.removeEventListener("loadedmetadata", ok); v.removeEventListener("error", bad); clearTimeout(timer); };
      const ok = () => { done(); suppressResumeRef.current = false; try { v.currentTime = t; } catch {} v.playbackRate = rate; if (resume) v.play().catch(() => {}); resolve(); };
      // On timeout/error, do NOT clear suppressResumeRef: the load may still
      // complete late, and a late loadedmetadata with suppress cleared shows
      // the session-resume prompt and stalls playback — exactly the failure
      // the swap is meant to avoid. The prompt stays suppressed for the rest
      // of this page session (a fresh page load resets the ref).
      const bad = () => { done(); reject(new Error("load failed")); };
      const timer = setTimeout(bad, 75000);
      v.addEventListener("loadedmetadata", ok);
      v.addEventListener("error", bad);
      // Suppress the session-resume prompt for this load: the swap itself
      // restores position t and resumes playback — the prompt would pause
      // the video to ask about the same position.
      suppressResumeRef.current = true;
      v.src = url;
      v.load();
    }), []);

  // Direct-file menus apply only while HLS has NOT taken over (HLS levels
  // take precedence when present). In-file audio-track switching is not
  // possible for direct plays — the Audio menu lists the DISTINCT audio
  // values across the sibling files instead.
  const directOn = !hlsRef.current && levels.length === 0 && !!directOptions?.length;
  const activeOpt = directOptions?.find((o) => o.index === (directActive ?? 0)) ?? directOptions?.[0];
  // Quality button label: the real active quality (not a flat "HD"), so a
  // pick is visibly applied. HLS levels keep their Auto/level label.
  const qualityLabel = swapping
    ? "Switching…"
    : levels.length > 1
      ? (activeLevel === -1 ? "Auto" : levels[activeLevel]?.label || "Auto")
      : directOn && activeOpt
        ? (activeOpt.height ? `${activeOpt.height}p` : (activeOpt.label.trim().split(/\s+/)[0] || "HD"))
        : "HD";
  const directAudios = useMemo(
    () => [...new Set((directOptions ?? []).map((o) => o.audio).filter((a): a is string => !!a))],
    [directOptions]);
  const canEmbedSwitch = !!directEmbedUrl && !!onSwitchToEmbed && /dual|multi/i.test(directAudioHint ?? "");

  const pickDirectOpt = useCallback(async (i: number) => {
    setSheet(null);
    const v = videoRef.current;
    if (!v || !onPickDirect || swapping || i === (directActive ?? 0)) return;
    const oldSrc = v.currentSrc || v.src, t = v.currentTime, wasPlaying = !v.paused;
    setSwapping(true);
    try {
      const url = await onPickDirect(i);   // lazy: only the picked option
      // One automatic retry: a first load through the proxy can fail
      // (slow metadata on a big file) and succeed on the second attempt.
      try {
        await swapSource(url, t, wasPlaying);
      } catch {
        await swapSource(url, t, wasPlaying);
      }
      onDirectActive?.(i);
    } catch {
      onNote?.("Couldn't switch right now, so we kept playing the current version.");
      // Restore the old file; the resume prompt stays suppressed (see
      // swapSource) so a late load can't stall playback with a prompt.
      suppressResumeRef.current = true;
      if ((v.currentSrc || v.src) !== oldSrc) await swapSource(oldSrc, t, wasPlaying).catch(() => {});
      if (wasPlaying) v.play().catch(() => {});
    } finally {
      setSwapping(false);
    }
  }, [onPickDirect, onDirectActive, onNote, directActive, swapping, swapSource]);

  const pickDirectAudio = (a: string) => {
    if (!directOptions || a === activeOpt?.audio) return setSheet(null);
    const h = activeOpt?.height ?? 0;
    const best = directOptions.filter((o) => o.audio === a)
      .reduce((b, o) => (Math.abs((o.height ?? 0) - h) < Math.abs((b.height ?? 0) - h) ? o : b));
    pickDirectOpt(best.index); // sibling file with that audio, closest height
  };
  const hideTimer = useRef<any>(null);
  const retriesRef = useRef(0);
  const resumeKeyRef = useRef<string | null>(null);
  // Set while a quality/audio swap is changing the source: swapSource
  // already restores the exact position and resumes playback itself, so
  // the session-resume prompt must not fire for the swapped-in file.
  const suppressResumeRef = useRef(false);
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

  const videoFitClass = displayMode === "crop" ? "object-cover" : displayMode === "stretch" ? "object-fill" : "object-contain";
  const shareLink = useCallback(() => {
    try {
      const url = window.location.href;
      if (navigator.clipboard?.writeText) navigator.clipboard.writeText(url).catch(() => {});
      else {
        const ta = document.createElement("textarea");
        ta.value = url;
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand("copy"); } catch {}
        ta.remove();
      }
    } catch {}
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
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
    const onPause = () => { setPlaying(false); persist(); revealControls(); };
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
      // A quality/audio swap sets suppressResumeRef before changing src:
      // the swap restores the position itself, so never prompt for it.
      if (!suppressResumeRef.current && resumeKeyRef.current && Number.isFinite(v.duration)) {
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
    setPanel(null);
  }

  const progressPct = duration > 0 ? (current / duration) * 100 : 0;

  return (
    <div
      ref={wrapRef}
      className="relative w-full max-w-full bg-black rounded-xl overflow-hidden select-none"
      style={{ aspectRatio: "16/9", maxHeight: "78vh" }}
      onMouseMove={revealControls}
      onTouchStart={revealControls}
    >
      <video
        ref={videoRef}
        poster={poster ?? undefined}
        aria-label={title || "Video player"}
        className={`w-full h-full bg-transparent ${videoFitClass}`}
        playsInline
        preload="metadata"
        onClick={togglePlay}
      />
      {/* Full-bleed poster backdrop (Vegamovies at-rest look). Sits above the
          video so it is visible whenever paused; fades out while playing. */}
      {poster && (
        <div
          className={`pointer-events-none absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${playing ? "opacity-0" : "opacity-100"}`}
          style={{ backgroundImage: `url(${poster})` }}
          aria-hidden
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        </div>
      )}

      {(buffering || swapping) && !playbackError && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-[#f5a623]" />
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
          className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center text-white active:scale-95"
          aria-label={title ? `Play ${title}` : "Play"}
        >
          <Play className="h-10 w-10 fill-white" strokeWidth={0} />
        </button>
      )}

      {/* Top bar: title + meta, MARCIVO wordmark + share. */}
      <div className={`pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-3 bg-gradient-to-b from-black/70 to-transparent px-4 py-3 transition-opacity ${showControls ? "opacity-100" : "opacity-0"}`}>
        <div className="min-w-0">
          {title && <div className="truncate text-sm font-bold text-white sm:text-base">{title}</div>}
          {(metaLine || audioLine) && (
            <div className="mt-0.5 truncate text-xs text-white/70">
              {metaLine && <span>{metaLine}</span>}
              {metaLine && audioLine && <span> · </span>}
              {audioLine && <span className="text-[#f5a623]">{audioLine}</span>}
            </div>
          )}
        </div>
        <div className="pointer-events-auto flex shrink-0 items-center gap-2">
          <span className="text-xs font-bold tracking-[0.3em] text-[#e50914]">MARCIVO</span>
          <button onClick={shareLink} className="flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70" aria-label="Share">
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {copied && (
        <div className="pointer-events-none absolute bottom-24 left-1/2 z-30 -translate-x-1/2 rounded-full bg-black/75 px-4 py-2 text-sm font-semibold text-white shadow-lg">
          Copied
        </div>
      )}

      {/* Bottom chrome: Previous/Next, thin seek line, control bar. */}
      <div className={`absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent pt-8 transition-opacity ${showControls ? "opacity-100" : "opacity-0"}`}>
        {(onPrevEpisode || onNextEpisode) && (
          <div className="mb-2 flex items-center justify-between px-3">
            {onPrevEpisode ? (
              <button onClick={onPrevEpisode} className="flex items-center gap-1 rounded-full bg-black/50 px-3 py-1.5 text-xs font-semibold text-white hover:bg-black/70">
                <ChevronLeft className="h-4 w-4" /> Previous
              </button>
            ) : <span />}
            {onNextEpisode ? (
              <button onClick={onNextEpisode} className="flex items-center gap-1 rounded-full bg-black/50 px-3 py-1.5 text-xs font-semibold text-white hover:bg-black/70">
                Next Episode <ChevronRight className="h-4 w-4" />
              </button>
            ) : <span />}
          </div>
        )}
        {/* Time row (Vegamovies-style): current left, duration right, above the seek line. */}
        <div className="flex items-center justify-between px-3 pb-1 font-mono text-xs text-white/80">
          <span>{fmt(current)}</span>
          <span>{fmt(duration)}</span>
        </div>
        <input
          type="range" min={0} max={duration || 0} step={0.1} value={Math.min(current, duration || 0)}
          onChange={(e) => { const v = videoRef.current; if (v) v.currentTime = Number(e.target.value); }}
          className="tp-range block h-1 w-full hover:h-1.5 focus:h-1.5"
          style={{ background: `linear-gradient(to right, #e50914 0%, #e50914 ${progressPct}%, rgba(255,255,255,0.15) ${progressPct}%, rgba(255,255,255,0.15) 100%)` }}
          aria-label="Seek"
        />
        <div className="flex items-center gap-1 px-2 pb-3 pt-2 text-white sm:px-3">
          <button onClick={togglePlay} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg hover:bg-white/20" aria-label={playing ? "Pause" : "Play"}>
            {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </button>
          <button onClick={toggleMute} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg hover:bg-white/20" aria-label={muted ? "Unmute" : "Mute"}>
            {muted || volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </button>
          <input
            type="range" min={0} max={1} step={0.05} value={muted ? 0 : volume}
            onChange={(e) => changeVolume(Number(e.target.value))}
            className="tp-range w-16 hidden sm:block"
            aria-label="Volume"
          />
          <div className="ml-auto flex items-center gap-1">
            <button onClick={enterPip} className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg hover:bg-white/20 sm:flex" aria-label="Picture in picture">
              <PictureInPicture2 className="h-5 w-5" />
            </button>
            <button onClick={() => { setSheet(null); setPanel(panel === "screen" ? null : "screen"); }} className="hidden h-9 shrink-0 items-center justify-center gap-1 rounded-lg px-2 text-sm font-bold hover:bg-white/20 sm:flex" aria-label="Screen mode">
              <Monitor className="h-4 w-4" /><span>{displayMode === "fit" ? "Fit" : displayMode === "crop" ? "Crop" : "Stretch"}</span>
            </button>
            <button onClick={() => { setSheet(null); setPanel(panel === "speed" ? null : "speed"); }} className="flex h-9 min-w-[3rem] shrink-0 items-center justify-center rounded-lg px-2 text-sm font-bold hover:bg-white/20" aria-label="Playback speed">
              {rate === 1 ? "1×" : `${rate}×`}
            </button>
            {episodes && episodes.length > 0 && (
              <button onClick={() => { setSheet(null); setPanel(panel === "episodes" ? null : "episodes"); }} className="hidden h-9 shrink-0 items-center justify-center gap-1 rounded-lg px-2 text-sm font-bold hover:bg-white/20 sm:flex" aria-label="Episodes">
                <ListVideo className="h-4 w-4" /><span>EPISODES</span>
              </button>
            )}
            <button onClick={() => openSheet("audio")} className="relative hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg hover:bg-white/20 sm:flex" aria-label="Audio tracks">
              <Languages className="h-5 w-5" />
              {tracks.length > 1 && <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-netflix" />}
            </button>
            <button onClick={() => openSheet("quality")} disabled={swapping} aria-busy={swapping} className="flex h-9 min-w-[3.5rem] shrink-0 items-center justify-center gap-1 rounded-lg px-2 text-sm font-bold hover:bg-white/20 disabled:cursor-wait disabled:opacity-70" aria-label="Quality">
              <span className="hidden sm:inline"><MonitorPlay className="h-4 w-4" /></span>{qualityLabel}
            </button>
            <button onClick={() => { setSheet(null); setPanel(panel === "more" ? null : "more"); }} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg hover:bg-white/20 sm:hidden" aria-label="More options">
              <EllipsisVertical className="h-5 w-5" />
            </button>
            <button onClick={enterFullscreen} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg hover:bg-white/20" aria-label="Fullscreen">
              {fullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {swapping && (
        <div className="pointer-events-none absolute inset-0 z-[5] flex items-center justify-center" role="status" aria-live="polite">
          <div className="flex items-center gap-2 rounded-full bg-black/75 px-4 py-2 text-sm font-semibold text-white shadow-lg">
            <Loader2 className="h-4 w-4 animate-spin" />
            Switching quality…
          </div>
        </div>
      )}

      {/* Speed menu (bottom-right dark panel). */}
      {panel === "speed" && (
        <div className="absolute inset-x-3 bottom-24 z-30 rounded-xl border border-white/10 bg-[#1c1c1e] p-3 shadow-2xl sm:left-auto sm:right-3 sm:w-72">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-bold tracking-wide text-white">PLAYBACK SPEED</span>
            <button onClick={() => setPanel(null)} className="flex h-7 w-7 items-center justify-center rounded-full text-white hover:bg-white/10" aria-label="Close"><X className="h-4 w-4" /></button>
          </div>
          {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((v) => (
            <button
              key={v}
              onClick={() => { setSpeed(v); setPanel(null); }}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-base ${rate === v ? "text-[#f5a623]" : "text-gray-200 hover:bg-white/5"}`}
            >
              <span>{v === 1 ? "Normal" : `${v}×`}</span>
              {rate === v && <Check className="h-4 w-4 text-[#f5a623]" />}
            </button>
          ))}
        </div>
      )}

      {/* Screen menu (Display: Fit / Crop / Stretch). */}
      {panel === "screen" && (
        <div className="absolute inset-x-3 bottom-24 z-30 rounded-xl border border-white/10 bg-[#1c1c1e] p-3 shadow-2xl sm:left-auto sm:right-3 sm:w-72">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-bold tracking-wide text-white">SCREEN</span>
            <button onClick={() => setPanel(null)} className="flex h-7 w-7 items-center justify-center rounded-full text-white hover:bg-white/10" aria-label="Close"><X className="h-4 w-4" /></button>
          </div>
          {(["fit", "crop", "stretch"] as const).map((m) => (
            <button
              key={m}
              onClick={() => { setDisplayMode(m); setPanel(null); }}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-base ${displayMode === m ? "text-[#f5a623]" : "text-gray-200 hover:bg-white/5"}`}
            >
              <span>{m === "fit" ? "Fit" : m === "crop" ? "Crop" : "Stretch"}</span>
              {displayMode === m && <Check className="h-4 w-4 text-[#f5a623]" />}
            </button>
          ))}
          <p className="px-3 pt-1 text-xs text-white/50">Fit shows the whole frame · Crop fills the screen · Stretch fills without bars.</p>
        </div>
      )}

      {/* More menu (phones only — the bar hides Screen / Audio / Episodes / PiP below sm). */}
      {panel === "more" && (
        <div className="absolute inset-x-3 bottom-24 z-30 rounded-xl border border-white/10 bg-[#1c1c1e] p-3 shadow-2xl sm:left-auto sm:right-3 sm:w-72">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-bold tracking-wide text-white">MORE</span>
            <button onClick={() => setPanel(null)} className="flex h-7 w-7 items-center justify-center rounded-full text-white hover:bg-white/10" aria-label="Close"><X className="h-4 w-4" /></button>
          </div>
          <button
            onClick={() => setPanel("screen")}
            className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-base text-gray-200 hover:bg-white/5"
          >
            <span className="flex items-center gap-2"><Monitor className="h-4 w-4" /> Screen</span>
            <span className="text-sm text-[#f5a623]">{displayMode === "fit" ? "Fit" : displayMode === "crop" ? "Crop" : "Stretch"}</span>
          </button>
          <button
            onClick={() => openSheet("audio")}
            className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-base text-gray-200 hover:bg-white/5"
          >
            <span className="flex items-center gap-2"><Languages className="h-4 w-4" /> Audio tracks</span>
            {tracks.length > 1 && <span className="text-sm text-white/50">{tracks.length} tracks</span>}
          </button>
          {episodes && episodes.length > 0 && (
            <button
              onClick={() => setPanel("episodes")}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-base text-gray-200 hover:bg-white/5"
            >
              <span className="flex items-center gap-2"><ListVideo className="h-4 w-4" /> Episodes</span>
              <span className="text-sm text-white/50">{episodes.length}</span>
            </button>
          )}
          <button
            onClick={() => { setPanel(null); enterPip(); }}
            className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-base text-gray-200 hover:bg-white/5"
          >
            <span className="flex items-center gap-2"><PictureInPicture2 className="h-4 w-4" /> Picture in picture</span>
          </button>
        </div>
      )}

      {/* Episodes slide-over (series only). */}
      {panel === "episodes" && episodes && episodes.length > 0 && (
        <div className="absolute inset-y-0 right-0 z-30 w-[360px] max-w-[85%] overflow-y-auto border-l border-white/10 bg-[#141416] shadow-2xl">
          <div className="sticky top-0 flex items-center justify-between border-b border-white/10 bg-[#141416] px-4 py-3">
            <span className="text-sm font-bold tracking-wide text-white">EPISODES</span>
            <button onClick={() => setPanel(null)} className="flex h-7 w-7 items-center justify-center rounded-full text-white hover:bg-white/10" aria-label="Close"><X className="h-4 w-4" /></button>
          </div>
          {/* Season pills (multi-season shows) — the list below shows the
              picked season; the current episode's season is the default. */}
          {epSeasons.length > 1 && (
            <div className="flex gap-2 px-3 pt-3 pb-1 overflow-x-auto no-scrollbar">
              {epSeasons.map((s) => (
                <button
                  key={s}
                  onClick={() => setPanelSeason(s)}
                  className={`shrink-0 px-3 py-1 rounded-full text-sm font-bold ${s === shownSeason ? "bg-[#e50914] text-white" : "bg-white/10 text-gray-200"}`}
                >S{s}</button>
              ))}
            </div>
          )}
          <div className="p-3">
            {episodes.map((ep, i) => ({ ep, i })).filter(({ ep }) => ep.season === shownSeason).map(({ ep, i }) => {
              const isCurrent = i === (episodeIndex ?? -1);
              return (
                <button
                  key={`${ep.season}-${ep.episode}`}
                  onClick={() => { setPanel(null); onSelectEpisode?.(ep.season, ep.episode); }}
                  className={`mb-2 flex w-full gap-3 rounded-xl border p-2 text-left ${isCurrent ? "border-[#e50914]/60 bg-[#e50914]/10" : "border-white/10 bg-white/5 hover:bg-white/10"}`}
                >
                  {ep.poster ? (
                    <img src={ep.poster} alt="" className="h-16 w-12 shrink-0 rounded-lg object-cover" />
                  ) : (
                    <div className="flex h-16 w-12 shrink-0 items-center justify-center rounded-lg bg-white/10 text-sm font-bold text-white">E{ep.episode}</div>
                  )}
                  <div className="min-w-0">
                    <div className="truncate text-sm font-bold text-white">S{ep.season}E{ep.episode} · {ep.title}</div>
                    {ep.runtime && <div className="mt-0.5 text-xs text-white/60">{ep.runtime}</div>}
                    {isCurrent && <div className="mt-0.5 text-xs font-bold text-[#f5a623]">Now playing</div>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {sheet && (
        <div className="absolute inset-0 z-20 bg-black/70 flex items-end" onClick={() => setSheet(null)}>
          <div className="w-full bg-[#1c1c1e] rounded-t-2xl p-4 max-h-[70%] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="mb-2 flex items-center justify-between">
              <div className="font-bold text-lg">{sheet === "audio" ? `Audio${tracks.length > 1 ? ` (${tracks.length} tracks)` : ""}` : "Quality"}</div>
              <button onClick={() => setSheet(null)} className="flex h-7 w-7 items-center justify-center rounded-full text-white hover:bg-white/10" aria-label="Close"><X className="h-4 w-4" /></button>
            </div>
            {sheet === "audio" && tracks.length > 1 && tracks.map((t, i) => (
              <button
                key={i}
                onClick={() => pickAudio(i)}
                className={`w-full text-left px-3 py-3 rounded-lg text-base flex items-center justify-between ${i === activeTrack ? "bg-white/10 text-[#f5a623]" : "text-gray-200"}`}
              >
                <span>{t.flag} {t.label}</span>
                {i === activeTrack && <span>✓</span>}
              </button>
            ))}
            {sheet === "audio" && tracks.length <= 1 && directOn && (
              <>
                {(directAudios.length ? directAudios : [directAudioHint ?? "Default"]).map((a) => (
                  <button
                    key={a}
                    onClick={() => (directAudios.length > 1 ? pickDirectAudio(a) : setSheet(null))}
                    className={`w-full text-left px-3 py-3 rounded-lg text-base flex items-center justify-between ${(directAudios.length <= 1 || a === activeOpt?.audio) ? "bg-white/10 text-[#f5a623]" : "text-gray-200"}`}
                  >
                    <span>{a}</span>
                    {(directAudios.length <= 1 || a === activeOpt?.audio) && <span>✓</span>}
                  </button>
                ))}
                {directAudios.length <= 1 && (
                  <p className="text-sm text-muted px-1 py-2">This file plays its default audio track only.</p>
                )}
                {canEmbedSwitch && (
                  <button
                    onClick={() => { setSheet(null); onSwitchToEmbed!(); }}
                    className="w-full text-left px-3 py-3 rounded-lg text-base flex items-center justify-between text-sky-400"
                  >
                    <span>🌐 Switch languages in source player</span>
                  </button>
                )}
              </>
            )}
            {sheet === "audio" && tracks.length <= 1 && !directOn && (
              <p className="text-sm text-muted px-1 py-2">🎧 Checking for more audio tracks — options appear here automatically if this file has them.</p>
            )}
            {sheet === "quality" && levels.length > 1 && (
              <>
                <button
                  onClick={() => pickQuality(-1)}
                  className={`w-full text-left px-3 py-3 rounded-lg text-base flex items-center justify-between ${activeLevel === -1 ? "bg-white/10 text-[#f5a623]" : "text-gray-200"}`}
                >
                  <span>✨ Auto (recommended)</span>
                  {activeLevel === -1 && <span>✓</span>}
                </button>
                {levels.map((l, i) => (
                  <button
                    key={i}
                    onClick={() => pickQuality(i)}
                    className={`w-full text-left px-3 py-3 rounded-lg text-base flex items-center justify-between ${i === activeLevel ? "bg-white/10 text-[#f5a623]" : "text-gray-200"}`}
                  >
                    <span>📺 {l.label}{i === levels.length - 1 ? " • best" : i === 0 ? " • saves data" : ""}</span>
                    {i === activeLevel && <span>✓</span>}
                  </button>
                ))}
              </>
            )}
            {sheet === "quality" && levels.length <= 1 && directOn && directOptions!.map((o) => (
              <button
                key={o.index}
                onClick={() => pickDirectOpt(o.index)}
                className={`w-full text-left px-3 py-3 rounded-lg text-base flex items-center justify-between ${o.index === activeOpt?.index ? "bg-white/10 text-[#f5a623]" : "text-gray-200"}`}
              >
                <span>📺 {o.label}</span>
                {o.index === activeOpt?.index && <span>✓</span>}
              </button>
            ))}
            {sheet === "quality" && levels.length <= 1 && !directOn && (
              <div className="w-full text-left px-3 py-3 rounded-lg text-base flex items-center justify-between bg-white/10 text-[#f5a623]">
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
}
