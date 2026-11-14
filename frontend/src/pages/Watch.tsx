import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { api, findVersion, CAT_SITES, isLite, edgeStreamUrl, type QualitiesResp } from "../lib/api";
import { prettyVersion } from "../lib/format";
import { addToList } from "../store/continueWatching";
import TeraPlayer from "../components/TeraPlayer";
import AdBand from "../ads/AdBand";
import Seo from "../seo/Seo";

const STAGES = ["Finding best server…", "Opening page…", "Generating link…", "Fetching playable URL…"];

export default function Watch() {
  const { kind = "", id = "" } = useParams();
  const nav = useNavigate();
  const [sp] = useSearchParams();
  const srcParam = sp.get("src") || "";
  const resultIdParam = sp.get("result_id") || "";
  const contentIdParam = sp.get("content_id") || "";
  const altsParam = sp.get("alts") || "";
  const epParam = sp.get("ep") || ""; // e.g. S1E3
  const cat = sp.get("cat") || "";
  const labelParam = sp.get("t") || "";
  // Requested episode scope (e.g. S1E3) — forwarded to resolve so
  // whole-series source pages can select that exact episode at resolve time.
  const epSE = (() => { const m = epParam.match(/S(\d+)E(\d+)/i); return m ? { season: parseInt(m[1], 10), episode: parseInt(m[2], 10) } : {}; })();
  const [d, setD] = useState<any>(null);
  const [stage, setStage] = useState(0);
  const [statusLine, setStatusLine] = useState("");
  const [video, setVideo] = useState("");
  const [embedUrl, setEmbedUrl] = useState("");
  const [versionTitle, setVersionTitle] = useState(labelParam);
  const [hlsMaster, setHlsMaster] = useState<string | null>(null);
  const [hlsAudios, setHlsAudios] = useState<any[]>([]);
  const [hlsQualities, setHlsQualities] = useState<any[]>([]);
  const [hlsNote, setHlsNote] = useState("");
  const [err, setErr] = useState("");
  const [fatal, setFatal] = useState("");
  const [busy, setBusy] = useState(false);
  const [lastIdentity, setLastIdentity] = useState<{ result_id: string; content_id: string; url: string; title: string; season?: number; episode?: number; alts: { result_id: string; url: string }[] } | null>(null);
  const [exactTitle, setExactTitle] = useState("");
  const timer = useRef<any>(null);
  const hlsTimer = useRef<any>(null);
  const hlsDelay = useRef<any>(null);
  const videoUrlRef = useRef("");
  const hlsAsked = useRef(false);

  useEffect(() => {
    if (id && id !== "0") api.detail(kind, id).then(setD).catch(() => {});
    return () => { clearInterval(timer.current); clearInterval(hlsTimer.current); clearTimeout(hlsDelay.current); };
  }, [kind, id]);

  // Exact-identity header for site-only watches (id=0): show the clicked
  // result's title instead of a stale/empty value. Never re-search by title.
  useEffect(() => {
    if (resultIdParam) {
      api.lookupResult(resultIdParam).then((r: any) => {
        if (r?.result?.title) setExactTitle(String(r.result.title).slice(0, 120));
      }).catch(() => {});
    }
  }, [resultIdParam]);

  // One rule for every direct file URL the player gets: unseekable files
  // go through the Range-capable proxy (Cloudflare /edge/stream in LITE,
  // Render /api/stream otherwise) so seeking works. Used by resolveOne
  // AND by quality swaps below.
  const playable = (u: string, seekable: boolean | null | undefined) =>
    seekable === false ? (isLite() ? edgeStreamUrl(u) : api.streamUrl(u)) : u;

  // Per-quality options for the playing title (quality + sibling-audio
  // menus in the player). Fetched once per title, only for direct-file
  // plays; a failed fetch leaves the menus as they are today.
  const [qData, setQData] = useState<QualitiesResp | null>(null);
  const [qActive, setQActive] = useState(0); // resolver plays option 0 by default
  const qFor = useRef<string | null>(null);

  const loadQualities = useCallback((src: string | null | undefined) => {
    if (!src || qFor.current === src) return;
    qFor.current = src;
    api.qualities(src)
      .then((r) => { if (qFor.current === src && r?.options?.length) setQData(r); })
      .catch(() => {}); // silent: menus stay as today
  }, []);

  const pickDirect = useCallback(async (index: number): Promise<string> => {
    const src = qFor.current;
    if (!src) throw new Error("no source");
    const r = await api.qualitySource(src, index);
    return playable(r.url, r.seekable);
  }, []);

  // Pending quality/audio pick: chosen before playback starts (picker tap
  // or ?q=/ ?a= URL params) and applied when the resolve finishes. The ref
  // is the source of truth inside the in-flight resolve (state is async).
  const [pendingPick, setPendingPickState] = useState<number | null>(() => {
    const n = parseInt(sp.get("q") || "", 10);
    return Number.isFinite(n) && n >= 0 ? n : null;
  });
  const pendingPickRef = useRef<number | null>(pendingPick);
  const setPendingPick = useCallback((i: number | null) => {
    pendingPickRef.current = i;
    setPendingPickState(i);
  }, []);

  const bestAudioIndex = useCallback((audio: string, nearHeight = 720): number | null => {
    const want = audio.trim().toLowerCase();
    let best: QualitiesResp["options"][number] | null = null;
    for (const o of qData?.options ?? []) {
      if ((o.audio || "").trim().toLowerCase() !== want) continue;
      if (!best || Math.abs((o.height || 0) - nearHeight) < Math.abs((best.height || 0) - nearHeight)) best = o;
    }
    return best ? best.index : null;
  }, [qData]);

  // `a` URL param (audio label) -> first option with that audio, once qualities arrive.
  const audioParamDone = useRef(false);
  useEffect(() => {
    if (audioParamDone.current || !qData?.options?.length) return;
    audioParamDone.current = true;
    const want = (sp.get("a") || "").trim().toLowerCase();
    if (!want || pendingPickRef.current !== null) return;
    const o = qData.options.find((x) => (x.audio || "").trim().toLowerCase() === want);
    if (o) setPendingPick(o.index);
  }, [qData, sp, setPendingPick]);

  const switchToEmbed = useCallback(() => {
    if (!qData?.embedUrl) return;
    clearTimeout(hlsDelay.current);
    clearInterval(hlsTimer.current);
    videoUrlRef.current = "";
    setHlsMaster(null); setHlsAudios([]); setHlsQualities([]); setHlsNote("");
    setVideo("");
    setEmbedUrl(qData.embedUrl);
  }, [qData]);

  // Embed → direct file (picker tap while the source player is showing).
  // Plain function (not useCallback) so it always sees current state.
  const [switching, setSwitching] = useState(false);
  const [switchingIdx, setSwitchingIdx] = useState<number | null>(null);
  const [switchErr, setSwitchErr] = useState("");
  const switchingRef = useRef(false);
  const switchToDirect = async (index: number) => {
    if (switchingRef.current || !embedUrl || !qFor.current) return;
    const src = qFor.current;
    switchingRef.current = true;
    setSwitching(true);
    setSwitchingIdx(index);
    setSwitchErr("");
    try {
      const r = await api.qualitySource(src, index);
      const url = playable(r.url, r.seekable);
      if (!url) throw new Error("no url");
      videoUrlRef.current = url;
      hlsAsked.current = false;
      setUpgradeUrl(null);
      setEmbedUrl("");
      setVideo(url);
      setQActive(index);
      setPendingPick(null);
      if (r.seekable === false && lastIdentity?.url) watchUpgrade(lastIdentity.url, url);
      clearTimeout(hlsDelay.current);
      if (!/\.m3u8(\?|#|$)/i.test(url)) {
        hlsDelay.current = setTimeout(() => { try { if (videoUrlRef.current === url) watchHls(url); } catch {} }, 12000);
      }
    } catch {
      setSwitchErr("Couldn't switch right now — still playing the source player.");
    } finally {
      switchingRef.current = false;
      setSwitching(false);
      setSwitchingIdx(null);
    }
  };

  // Cache-first resolve: the backend returns {status:"ready",url} instantly
  // on a pre-resolved cache hit; otherwise poll the (possibly shared)
  // in-flight job every 2s. Server fails jobs fast (~150s cap), so the
  // client gives up with a clear message instead of hanging for minutes.
  // §16/48: prefers result_id (exact source page); never title-searches.
  async function resolveOne(ident: { result_id?: string; content_id?: string; url?: string; season?: number; episode?: number }): Promise<{ url: string; seekable?: boolean; embed?: boolean }> {
    const se = ident.season || ident.episode ? { season: ident.season, episode: ident.episode } : undefined;
    const r = ident.result_id
      ? await api.resolveById(ident.result_id, ident.content_id, se)
      : await api.resolve(ident.url || "", se);
    // Embed results are the source's own player session (iframe) — served
    // as-is: no proxy, no Range concerns. Files: non-seekable upstreams
    // restart from 0 on seek — route them through the Range-capable proxy
    // upfront so the timeline just works (see `playable` above). A
    // seekable upgrade swaps in later when the bridge delivers one.
    const map = (u: string, seekable: any, embed?: boolean) =>
      embed ? { url: u, embed: true } : { url: playable(u, seekable), seekable };
    if (r.status === "ready" && r.url) return map(r.url, (r as any).seekable, (r as any).embed);
    const jobId = r.jobId;
    for (let i = 0; i < 90; i++) {
      await new Promise((r2) => setTimeout(r2, 2000));
      const j = await api.job(jobId);
      if (j.status === "ready") {
        if (!j.url) throw new Error("Empty stream result — try another version");
        return map(j.url as string, (j as any).seekable, (j as any).embed);
      }
      if (j.status === "failed") throw new Error(j.error || "Resolve failed — try another version");
    }
    throw new Error("Taking too long — try another version");
  }

  /** First-ready wins with staggered starts: the preferred source goes first
      alone (usually an instant cache HIT); alternates join the race after 12s
      only if nobody won yet. Firing all 3 at once filled every server slot
      and slowed the primary down. Losers keep warming the cache in bg. */
  function resolveIdentity(ident: { result_id?: string; content_id?: string; url?: string; season?: number; episode?: number }, alts: { result_id?: string; content_id?: string; url?: string }[] = []): Promise<{ url: string; seekable?: boolean; embed?: boolean }> {
    const first = (ident.result_id || ident.url) ? [ident] : [];
    const rest = alts.filter((a) => a.result_id || a.url);
    return new Promise<{ url: string; seekable?: boolean; embed?: boolean }>((resolve, reject) => {
      let settled = false;
      let pending = 0;
      let lastErr: any = new Error("No source selected");
      let timer: any = null;
      const finish = (ok: boolean, v?: any) => {
        if (settled) return;
        settled = true;
        if (timer) clearTimeout(timer);
        if (ok) resolve(v);
        else reject(v);
      };
      const launch = (a: { result_id?: string; content_id?: string; url?: string; season?: number; episode?: number }) => {
        pending++;
        resolveOne(a).then((v) => {
          pending--;
          if (!settled) finish(true, v);
        }).catch((e) => {
          pending--;
          lastErr = e;
          if (pending === 0 && !settled) finish(false, lastErr);
        });
      };
      if (!first.length && !rest.length) { reject(lastErr); return; }
      first.forEach(launch);
      if (rest.length) {
        timer = setTimeout(() => {
          if (!settled) {
            setStatusLine((s) => s || "Preferred is slow — racing alternates…");
            rest.forEach(launch);
          }
        }, 12000);
      }
    });
  }

  // Seekable upgrade: the fast lanes play instantly but never honor Range.
  // In the background, re-resolve past them to a seekable bridge link and
  // swap it in at the current position (cache upgrades too, so replays
  // start seekable immediately).
  const [upgradeUrl, setUpgradeUrl] = useState<string | null>(null);
  async function watchUpgrade(sourceUrl: string, playingUrl: string) {
    try {
      const r = await api.resolveUpgrade(sourceUrl);
      const poll = async (): Promise<{ url: string; seekable?: boolean } | null> => {
        if (r.status === "ready" && r.url) return { url: r.url, seekable: (r as any).seekable };
        for (let i = 0; i < 90; i++) {
          await new Promise((r2) => setTimeout(r2, 2000));
          if (videoUrlRef.current !== playingUrl) return null;
          const j = await api.job(r.jobId);
          if (j.status === "ready") {
            if (!j.url) return null;
            return { url: j.url as string, seekable: (j as any).seekable };
          }
          if (j.status === "failed") return null;
        }
        return null;
      };
      const got = await poll();
      if (got && got.seekable !== false && got.url !== playingUrl && videoUrlRef.current === playingUrl) {
        setUpgradeUrl(got.url);
      }
    } catch {}
  }

  // Audio engine starts shortly AFTER playback begins (resolves are done by
  // then, so no CPU fight) plus immediately on 🌐 tap. Once ready: Hindi /
  // English switching, quality ladder, and a seekable timeline even for
  // non-seekable direct links.
  function watchHls(mediaUrl: string) {
    if (hlsAsked.current && mediaUrl === videoUrlRef.current) return;
    hlsAsked.current = true;
    clearInterval(hlsTimer.current);
    const tick = async () => {
      try {
        const s = await api.hlsStatus(mediaUrl);
        if (s.status === "ready" && s.master) {
          clearInterval(hlsTimer.current);
          setHlsMaster(api.hlsFile(s.master));
          setHlsAudios(s.audios || []);
          setHlsQualities(s.videos || []);
          setHlsNote(s.partial ? "More quality levels still preparing…" : "");
        } else if (s.status === "converting" || s.status === "probing") {
          const names = (s.audios || []).map((a: any) => `${a.flag || ""} ${a.label || ""}`.trim()).filter(Boolean).join(" • ");
          const pct = typeof s.progress === "number" ? ` ${s.progress}%` : "";
          setHlsNote(`Preparing audio tracks${names ? `: ${names}` : "…"}${pct} — switching appears automatically`);
        } else if (s.status === "failed" || s.status === "unsupported" || s.status === "single") {
          clearInterval(hlsTimer.current);
          if (s.status !== "single") setHlsNote("Multi-audio prep unavailable for this link — playing default audio.");
          else setHlsNote("");
        }
      } catch {}
    };
    tick();
    hlsTimer.current = setInterval(tick, 2500);
  }

  function parseAlts(): { result_id: string; url: string; title?: string }[] {
    try {
      const a = altsParam ? JSON.parse(altsParam) : [];
      return Array.isArray(a) ? a.filter((x: any) => x && (x.url || x.result_id)) : [];
    } catch { return []; }
  }



  // §26 watch source selection: preferred source first, then legitimate
  // fallbacks in priority order. Uses the clicked item directly (no stale
  // global selected-item state).
  async function startFromSource(sourceUrl: string, vTitle: string, opts?: { result_id?: string; content_id?: string; alts?: { result_id: string; url: string }[]; season?: number; episode?: number }) {
    const ident = {
      result_id: opts?.result_id || "",
      content_id: opts?.content_id || "",
      url: sourceUrl,
      title: vTitle,
      season: opts?.season,
      episode: opts?.episode,
      alts: opts?.alts || [],
    };
    setBusy(true); setErr(""); setFatal(""); setVideo(""); setEmbedUrl("");
    setLastIdentity(ident);
    setQData(null); setQActive(0); qFor.current = null;
    // Qualities fetch runs IN PARALLEL with the resolve (not after playback
    // starts), for embed and direct plays alike — the pickers need it early.
    loadQualities(sourceUrl);
    // Use the clicked result directly — never a stale selectedMovie.
    setVersionTitle(vTitle);
    setStage(0);
    timer.current = setInterval(() => setStage((s) => Math.min(s + 1, STAGES.length - 1)), 5000);
    const primary = { result_id: ident.result_id, content_id: ident.content_id, url: ident.url, season: ident.season, episode: ident.episode };
    const attempts = [{ result_id: ident.result_id, content_id: ident.content_id, url: ident.url }, ...ident.alts]
      .filter((a) => a.result_id || (a as any).url);
    if (!attempts.length) {
      clearInterval(timer.current);
      setErr("No source selected. Go back to Detail → pick a version or episode.");
      setBusy(false);
      return;
    }
    if (attempts.length > 1) setStatusLine(`Racing ${attempts.length} sources — fastest wins…`);
    try {
      const got = await resolveIdentity(primary, ident.alts);
      let url = got.url;
      let isEmbed = !!got.embed;
      const pend = pendingPickRef.current;
      if (pend !== null && !got.embed) {
        // Viewer chose a quality/audio while resolving: play that file directly.
        // Only when the source has no player of its own — when it does, the
        // source's embed plays first (the pick is dropped; the viewer can
        // still switch to any direct quality from the picker rail).
        try {
          url = await pickDirect(pend);
          isEmbed = false;
          setQActive(pend);
        } catch {
          url = got.url; // never block playback: fall back to the default
          isEmbed = !!got.embed;
        }
      }
      setPendingPick(null);
      clearInterval(timer.current);
      setStatusLine("");
      videoUrlRef.current = url;
      hlsAsked.current = false;
      setUpgradeUrl(null);
      setHlsMaster(null); setHlsAudios([]); setHlsQualities([]); setHlsNote("");
      if (isEmbed) {
        // Source's own player (iframe) — nothing to proxy or upgrade.
        setEmbedUrl(url);
        setVideo("");
      } else {
        setEmbedUrl("");
        setVideo(url);
      }
      addToList("continue", `${kind}:${id}`);
      if (!isEmbed) {
        // Non-seekable fast file? Upgrade it behind the scenes.
        if (got.seekable === false && sourceUrl) {
          watchUpgrade(sourceUrl, url);
        }
        // (Qualities already loading since startFromSource began.)
        // Engine starts after playback is rolling (never fights resolutions).
        // HLS sources already carry their own quality ladder (the player
        // attaches hls.js) — the file prober/converter doesn't apply.
        clearTimeout(hlsDelay.current);
        if (!/\.m3u8(\?|#|$)/i.test(url)) {
          hlsDelay.current = setTimeout(() => {
            try { if (videoUrlRef.current === url) watchHls(url); } catch {}
          }, 12000);
        }
      }
    } catch (e: any) {
      clearInterval(timer.current);
      setStatusLine("");
      setErr(String(e?.message || e));
    } finally {
      setBusy(false);
    }
  }

  // Episode quality choice (choose mode): variants of the season pack.
  const [epChoice, setEpChoice] = useState<{ s: number; e: number; base: any; variants: any[] } | null>(null);

  function qualityLabel(title: string) {
    const m = String(title || "").match(/\b(2160p|1080p|720p|480p|360p|4K)\b/i);
    return m ? m[1].toUpperCase() : "HD";
  }

  async function startFromEpisode() {
    // S1E3 -> find that season's exact page, fan out its quality variants,
    // let the user pick one (movies get this choice on the detail page;
    // episodes get it here). findVersion validates season/episode so we
    // never resolve a generic title as the wrong episode (§28/§48).
    const m = epParam.match(/S(\d+)E(\d+)/i);
    if (!m || !d) return;
    const s = parseInt(m[1], 10), e = parseInt(m[2], 10);
    setBusy(true); setErr(""); setFatal(""); setVideo("");
    setEpChoice(null);
    setStatusLine(`Looking for Season ${s} Episode ${e}…`);
    try {
      const found = await findVersion(d.title, s, e, CAT_SITES[cat]);
      if (!found) throw new Error(`No versions found for S${s}E${e}. Try another episode.`);
      const base = found.result;
      let variants: any[] = [];
      try {
        if (base.result_id) {
          const v = await api.variants(base.result_id, { title: d.title, type: kind, season: s });
          variants = (v?.variants || []).filter((x: any) => x.url || x.result_id);
        }
      } catch {}
      // Distinct qualities → choice UI; otherwise play directly (old path).
      const quals = new Set(variants.map((x: any) => qualityLabel(x.title)));
      if (variants.length >= 2 && quals.size >= 2) {
        setEpChoice({ s, e, base, variants: variants.slice(0, 6) });
        setStatusLine("");
      } else {
        await startFromSource(base.url || base.source_url, `${d.title} • S${s}E${e} — ${String(base.title || "").slice(0, 80)}`, {
          result_id: base.result_id,
          content_id: base.content_id,
          season: s,
          episode: e,
        });
      }
    } catch (e2: any) {
      setErr(String(e2.message || e2));
    } finally {
      setBusy(false);
      setStatusLine("");
    }
  }

  const hasSource = !!(srcParam || resultIdParam);
  // Auto-start episode flow once details are in.
  const epStarted = useRef(false);
  useEffect(() => {
    if (epParam && !hasSource && d && !epStarted.current) {
      epStarted.current = true;
      startFromEpisode();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [epParam, hasSource, d]);
  // Auto-start the chosen source on mount (Marcus 2026-11-14: the version
  // was already picked on Detail — no second ▶ Watch tap). Once only; the
  // ref guard is StrictMode-safe. Episode flow (no source) is unaffected.
  const srcStarted = useRef(false);
  useEffect(() => {
    if (hasSource && !srcStarted.current) {
      srcStarted.current = true;
      startFromSource(srcParam, labelParam || exactTitle, { result_id: resultIdParam, content_id: contentIdParam, alts: parseAlts(), ...epSE });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasSource]);
  const rawHeader = d?.title || exactTitle || labelParam || "Watch";
  // Site titles are "Download X (2021) BluRay ... 480p [550MB] | ..." — show
  // the clean title, never the raw file-listing string.
  const pvHead = prettyVersion(rawHeader);
  const headerTitle = pvHead.title || rawHeader;
  const headerBadges = pvHead.badges;

  return (
    <div className="max-w-5xl mx-auto px-4 pb-10">
      <Seo
        title={headerTitle && headerTitle !== "Watch" ? `Watch ${headerTitle} Online | Marcivo`.slice(0, 70) : "Watch — Marcivo"}
        description="Pick a version and the player opens right in your browser — no account, no install."
        robots="noindex,follow"
      />
      <div className="mt-2 flex gap-4 items-start rounded-2xl border border-white/10 hero-glow px-4 py-4">
        {d?.poster && <img src={d.poster} alt={headerTitle} className="w-24 rounded-lg bg-card ring-1 ring-white/20 shadow-xl" />}
        <div className="min-w-0">
          <h1 className="font-display text-3xl md:text-4xl break-words">{headerTitle}</h1>
          {!!headerBadges.length && (
            <div className="flex flex-wrap gap-1 mt-1">
              {headerBadges.map((b) => (
                <span key={b} className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-gray-200">{b}</span>
              ))}
            </div>
          )}
          <p className="text-xs text-muted break-words">{(video || embedUrl) ? (<><span className="text-netflix font-bold">▶ NOW PLAYING</span>{" • "}</>) : null}{epParam ? `${epParam} • ` : ""}{prettyVersion(versionTitle || exactTitle).title}</p>
        </div>
      </div>

      {!video && !embedUrl && !hasSource && epParam && (
        <button
          onClick={() => { epStarted.current = false; startFromEpisode(); }}
          disabled={busy || !d}
          className="mt-4 w-full md:w-auto px-8 py-3 rounded-xl bg-netflix font-bold disabled:opacity-50"
        >{busy ? "Fetching…" : `▶ Play ${epParam}`}</button>
      )}
      {hasSource && err && (
        <button
          onClick={() => startFromSource(srcParam, labelParam || exactTitle, { result_id: resultIdParam, content_id: contentIdParam, alts: parseAlts(), ...epSE })}
          disabled={busy}
          className="mt-4 w-full md:w-auto px-8 py-3 rounded-xl bg-netflix font-bold disabled:opacity-50"
        >{busy ? "Fetching…" : "↻ Retry"}</button>
      )}
      {!hasSource && !epParam && <p className="text-muted text-sm mt-2">No source selected. Go back to Detail → pick a version or episode.</p>}

      {!video && !embedUrl && !busy && !err && epChoice && (
        <div className="mt-4">
          <div className="text-sm text-muted">Choose quality for S{epChoice.s}E{epChoice.e}</div>
          <div className="grid gap-2 mt-2">
            {epChoice.variants.map((v: any) => (
              <button
                key={v.result_id || v.url}
                onClick={() => startFromSource(v.url, `${d?.title || ""} • S${epChoice.s}E${epChoice.e} — ${String(v.title || "").slice(0, 80)}`, {
                  result_id: v.result_id,
                  content_id: v.content_id,
                  season: epChoice.s,
                  episode: epChoice.e,
                })}
                className="text-left bg-card border border-netflix/30 rounded-xl px-4 py-3 active:border-netflix flex items-center gap-3"
              >
                <span className="shrink-0 px-3 py-1.5 rounded-lg bg-netflix font-black text-sm tracking-wide">{qualityLabel(v.title)}</span>
                <span className="min-w-0 flex-1">
                  <span className="font-semibold text-sm block truncate">{prettyVersion(v.title).title}</span>
                  <span className="text-xs text-muted mt-1 block">{v.site_name || ""} • tap to play</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {(video || embedUrl || busy || err || switchErr || (qData?.options?.length ?? 0) > 0) && (
      <div className="mt-4 rounded-2xl border border-white/10 bg-black/40 overflow-hidden">
      {!!video && !!qData?.embedUrl && (
        <div className="px-4 py-3 border-b border-white/5">
          <button type="button" className="px-4 py-1.5 rounded-full font-semibold border border-white/20" onClick={switchToEmbed}>🌐 Source player</button>
        </div>
      )}
      {!!switchErr && !!embedUrl && !video && (
        <div role="alert" className="text-red-400 text-sm px-4 py-2">{switchErr}</div>
      )}
      {!!qData?.options?.length && !video && (() => {
        const opts = qData?.options ?? [];
        const cur = opts.find((o) => o.index === (pendingPick ?? qActive));
        const audios = Array.from(new Set(opts.map((o) => (o.audio || "").trim()).filter((x): x is string => !!x)));
        const chip = (on: boolean) =>
          `px-4 py-1.5 rounded-full font-semibold border ${on ? "bg-netflix border-netflix" : "border-white/20"}`;
        return (
          <div className="px-4 py-3 border-b border-white/5">
            <div className="font-display text-lg tracking-wide mb-1">Choose quality &amp; audio</div>
            <div className="text-xs text-muted mb-3">Only the real options for this file are listed — pick one before or during play.</div>
            <div className="text-sm text-white/70 mb-2">Quality</div>
            <div className="flex flex-wrap gap-2">
              {opts.map((o) => (
                <button key={o.index} type="button" className={chip(o.index === (pendingPick ?? qActive))}
                  disabled={switching}
                  onClick={() => { if (embedUrl) void switchToDirect(o.index); else setPendingPick(o.index); }}>
                  {switchingIdx === o.index ? "Switching…" : o.label}
                </button>
              ))}
            </div>
            {audios.length > 0 && (
              <>
                <div className="text-sm text-white/70 mt-3 mb-2">Audio</div>
                {audios.length === 1 ? (
                  <div className="text-sm">
                    <span className="font-semibold">{audios[0]}</span>
                    <span className="text-white/60"> — This file plays its default audio track only.</span>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {audios.map((a) => (
                      <button key={a} type="button" className={chip(cur?.audio === a)}
                        disabled={switching}
                        onClick={() => { const i = bestAudioIndex(a, 720); if (i === null) return; if (embedUrl) void switchToDirect(i); else setPendingPick(i); }}>
                        {a}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        );
      })()}
      {busy && (
        <div className="px-4 py-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border-2 border-white/20 border-t-netflix rounded-full animate-spin" />
            <div className="font-semibold">{statusLine || STAGES[stage]}</div>
          </div>
          <p className="text-xs text-muted mt-2">Hang tight — most links take under a minute, some take a few minutes. Autoplay starts when ready. Keep this screen open.</p>
          <div className="skeleton h-40 mt-3" />
        </div>
      )}
      {err && (
        <div className="mt-3 bg-card border border-netflix/50 rounded-xl p-4">
          <p className="text-red-400 text-sm">⚠️ {err}</p>
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => {
                if (epParam && !hasSource) { epStarted.current = false; startFromEpisode(); }
                else if (lastIdentity) startFromSource(lastIdentity.url, lastIdentity.title, { result_id: lastIdentity.result_id, content_id: lastIdentity.content_id, alts: lastIdentity.alts, season: lastIdentity.season, episode: lastIdentity.episode });
                else if (hasSource) startFromSource(srcParam, labelParam || exactTitle, { result_id: resultIdParam, content_id: contentIdParam, alts: parseAlts(), ...epSE });
              }}
              className="px-5 py-2 rounded-lg bg-netflix font-bold text-sm"
            >↻ Retry</button>
            <button onClick={() => nav(-1)} className="px-5 py-2 rounded-lg bg-white/10 font-bold text-sm">← Other versions</button>
          </div>
        </div>
      )}

      {embedUrl && !fatal && (
        <>
          <div className="relative w-full overflow-hidden bg-black" style={{ aspectRatio: "16 / 9" }}>
            <iframe
              src={embedUrl}
              title={versionTitle || "Player"}
              className="absolute inset-0 w-full h-full"
              referrerPolicy="origin"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              frameBorder={0}
            />
            {/* Vegamovies encodes burn their own logo into the top of the
                frame. The video itself can't be edited (it plays in the
                source's player), so cover that strip with our own brand bar
                instead. pointer-events-none so player controls still work.
                Normal view only: in fullscreen the source's player takes
                over the frame and its logo can reappear. */}
            {(lastIdentity?.result_id || "").startsWith("1:") && (
              <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex h-[7%] min-h-[30px] items-center justify-center bg-black">
                <span className="text-[11px] font-bold tracking-[0.35em] text-white/85">MARCIVO</span>
              </div>
            )}
          </div>
        </>
      )}
      {video && !fatal && (
        <>
          <div className="mt-4">
            <TeraPlayer
              title={headerTitle || versionTitle}
              poster={d?.poster ?? null}
              metaLine={epParam || null}
              audioLine={qData?.options?.find((o) => o.index === qActive)?.audio ?? qData?.audioHint ?? null}
              directUrl={video}
              hlsMaster={hlsMaster}
              hlsAudios={hlsAudios}
              hlsQualities={hlsQualities}
              directOptions={qData?.options ?? null}
              directActive={qActive}
              directEmbedUrl={qData?.embedUrl ?? null}
              directAudioHint={qData?.audioHint ?? null}
              onPickDirect={pickDirect}
              onDirectActive={setQActive}
              onSwitchToEmbed={switchToEmbed}
              onNote={setHlsNote}
              resumeKey={`${kind}:${id}`}
              autoPlay
              onBack={() => nav(-1)}
              onFatal={(m) => setFatal(m)}
              onNeedHls={() => { if (videoUrlRef.current) watchHls(videoUrlRef.current); }}
              upgradeUrl={upgradeUrl}
            />
          </div>
          {hlsNote && <p className="text-xs text-amber-300/90 mt-2 px-4 pb-3">🎧 {hlsNote}</p>}
        </>
      )}
      </div>
      )}
      {fatal && (
        <div className="mt-3 bg-card border border-netflix/50 rounded-xl p-4">
          <p className="text-red-400 text-sm">⚠️ {fatal}</p>
          <button onClick={() => nav(-1)} className="mt-3 px-5 py-2 rounded-lg bg-netflix font-bold text-sm">← Other versions</button>
        </div>
      )}

      {/* Full ad set — banners sit below the player, never over it. */}
      <AdBand slots={["home_mid", "search_mid", "search_sidebar", "home_tall", "status_banner", "home_native"]} className="mt-8" />
    </div>
  );
}
