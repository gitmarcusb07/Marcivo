import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { api, findVersion, CAT_SITES, isLite } from "../lib/api";
import { prettyVersion } from "../lib/format";
import { addToList } from "../store/continueWatching";
import TeraPlayer from "../components/TeraPlayer";

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
  const [d, setD] = useState<any>(null);
  const [stage, setStage] = useState(0);
  const [statusLine, setStatusLine] = useState("");
  const [video, setVideo] = useState("");
  const [versionTitle, setVersionTitle] = useState(labelParam);
  const [hlsMaster, setHlsMaster] = useState<string | null>(null);
  const [hlsAudios, setHlsAudios] = useState<any[]>([]);
  const [hlsQualities, setHlsQualities] = useState<any[]>([]);
  const [hlsNote, setHlsNote] = useState("");
  const [err, setErr] = useState("");
  const [fatal, setFatal] = useState("");
  const [busy, setBusy] = useState(false);
  const [lastIdentity, setLastIdentity] = useState<{ result_id: string; content_id: string; url: string; title: string; alts: { result_id: string; url: string }[] } | null>(null);
  const [exactTitle, setExactTitle] = useState("");
  const timer = useRef<any>(null);
  const hlsTimer = useRef<any>(null);
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

  // Cache-first resolve: the backend returns {status:"ready",url} instantly
  // on a pre-resolved cache hit; otherwise poll the (possibly shared)
  // in-flight job every 2s. Server fails jobs fast (~150s cap), so the
  // client gives up with a clear message instead of hanging for minutes.
  // §16/48: prefers result_id (exact source page); never title-searches.
  async function resolveOne(ident: { result_id?: string; content_id?: string; url?: string }): Promise<{ url: string; seekable?: boolean }> {
    const r = ident.result_id
      ? await api.resolveById(ident.result_id, ident.content_id)
      : await api.resolve(ident.url || "");
    // Non-seekable upstreams restart from 0 on seek — route them through the
    // Range-capable proxy upfront so the timeline just works. A seekable
    // upgrade swaps in later when the bridge delivers one.
    // LITE deployments have no proxy (route answers 501) — play direct.
    const viaProxy = (u: string, seekable: any) => ({ url: seekable === false && !isLite() ? api.streamUrl(u) : u, seekable });
    if (r.status === "ready" && r.url) return viaProxy(r.url, (r as any).seekable);
    const jobId = r.jobId;
    for (let i = 0; i < 90; i++) {
      await new Promise((r2) => setTimeout(r2, 2000));
      const j = await api.job(jobId);
      if (j.status === "ready") {
        if (!j.url) throw new Error("Empty stream result — try another version");
        return viaProxy(j.url as string, (j as any).seekable);
      }
      if (j.status === "failed") throw new Error(j.error || "Resolve failed — try another version");
    }
    throw new Error("Taking too long — try another version");
  }

  /** First-ready wins with staggered starts: the preferred source goes first
      alone (usually an instant cache HIT); alternates join the race after 12s
      only if nobody won yet. Firing all 3 at once filled every server slot
      and slowed the primary down. Losers keep warming the cache in bg. */
  function resolveIdentity(ident: { result_id?: string; content_id?: string; url?: string }, alts: { result_id?: string; content_id?: string; url?: string }[] = []): Promise<{ url: string; seekable?: boolean }> {
    const first = (ident.result_id || ident.url) ? [ident] : [];
    const rest = alts.filter((a) => a.result_id || a.url);
    return new Promise<{ url: string; seekable?: boolean }>((resolve, reject) => {
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
      const launch = (a: { result_id?: string; content_id?: string; url?: string }) => {
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
  const hlsDelay = useRef<any>(null);
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
  async function startFromSource(sourceUrl: string, vTitle: string, opts?: { result_id?: string; content_id?: string; alts?: { result_id: string; url: string }[] }) {
    const ident = {
      result_id: opts?.result_id || "",
      content_id: opts?.content_id || "",
      url: sourceUrl,
      title: vTitle,
      alts: opts?.alts || [],
    };
    setBusy(true); setErr(""); setFatal(""); setVideo("");
    setLastIdentity(ident);
    // Use the clicked result directly — never a stale selectedMovie.
    setVersionTitle(vTitle);
    setStage(0);
    timer.current = setInterval(() => setStage((s) => Math.min(s + 1, STAGES.length - 1)), 5000);
    const primary = { result_id: ident.result_id, content_id: ident.content_id, url: ident.url };
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
      const url = got.url;
      clearInterval(timer.current);
      setStatusLine("");
      videoUrlRef.current = url;
      hlsAsked.current = false;
      setUpgradeUrl(null);
      setHlsMaster(null); setHlsAudios([]); setHlsQualities([]); setHlsNote("");
      setVideo(url);
      addToList("continue", `${kind}:${id}`);
      // Non-seekable fast file? Upgrade it behind the scenes.
      if (got.seekable === false && sourceUrl) {
        watchUpgrade(sourceUrl, url);
      }
      // Engine starts after playback is rolling (never fights resolutions).
      clearTimeout(hlsDelay.current);
      hlsDelay.current = setTimeout(() => {
        try { if (videoUrlRef.current === url) watchHls(url); } catch {}
      }, 12000);
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
  const rawHeader = d?.title || exactTitle || labelParam || "Watch";
  // Site titles are "Download X (2021) BluRay ... 480p [550MB] | ..." — show
  // the clean title, never the raw file-listing string.
  const pvHead = prettyVersion(rawHeader);
  const headerTitle = pvHead.title || rawHeader;
  const headerBadges = pvHead.badges;

  return (
    <div className="max-w-5xl mx-auto px-4 pb-10">
      <div className="flex gap-4 items-start">
        {d?.poster && <img src={d.poster} alt={headerTitle} className="w-24 rounded-lg bg-card" />}
        <div className="min-w-0">
          <h1 className="font-display text-2xl break-words">{headerTitle}</h1>
          {!!headerBadges.length && (
            <div className="flex flex-wrap gap-1 mt-1">
              {headerBadges.map((b) => (
                <span key={b} className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-gray-200">{b}</span>
              ))}
            </div>
          )}
          <p className="text-xs text-muted break-words">{epParam ? `${epParam} • ` : ""}{prettyVersion(versionTitle || exactTitle).title}</p>
        </div>
      </div>

      {!video && !hasSource && epParam && (
        <button
          onClick={() => { epStarted.current = false; startFromEpisode(); }}
          disabled={busy || !d}
          className="mt-4 w-full md:w-auto px-8 py-3 rounded-xl bg-netflix font-bold disabled:opacity-50"
        >{busy ? "Fetching…" : `▶ Play ${epParam}`}</button>
      )}
      {!video && hasSource && (
        <button
          onClick={() => startFromSource(srcParam, labelParam || exactTitle, { result_id: resultIdParam, content_id: contentIdParam, alts: parseAlts() })}
          disabled={busy}
          className="mt-4 w-full md:w-auto px-8 py-3 rounded-xl bg-netflix font-bold disabled:opacity-50"
        >{busy ? "Fetching…" : "▶ Watch"}</button>
      )}
      {!hasSource && !epParam && <p className="text-muted text-sm mt-2">No source selected. Go back to Detail → pick a version or episode.</p>}

      {!video && !busy && !err && epChoice && (
        <div className="mt-4">
          <div className="text-sm text-muted">Choose quality for S{epChoice.s}E{epChoice.e}</div>
          <div className="grid gap-2 mt-2">
            {epChoice.variants.map((v: any) => (
              <button
                key={v.result_id || v.url}
                onClick={() => startFromSource(v.url, `${d?.title || ""} • S${epChoice.s}E${epChoice.e} — ${String(v.title || "").slice(0, 80)}`, {
                  result_id: v.result_id,
                  content_id: v.content_id,
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

      {busy && (
        <div className="mt-4 bg-card border border-white/10 rounded-xl p-4">
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
                else if (lastIdentity) startFromSource(lastIdentity.url, lastIdentity.title, { result_id: lastIdentity.result_id, content_id: lastIdentity.content_id, alts: lastIdentity.alts });
                else if (hasSource) startFromSource(srcParam, labelParam || exactTitle, { result_id: resultIdParam, content_id: contentIdParam, alts: parseAlts() });
              }}
              className="px-5 py-2 rounded-lg bg-netflix font-bold text-sm"
            >↻ Retry</button>
            <button onClick={() => nav(-1)} className="px-5 py-2 rounded-lg bg-white/10 font-bold text-sm">← Other versions</button>
          </div>
        </div>
      )}

      {video && !fatal && (
        <>
          <div className="mt-4">
            <TeraPlayer
              title={versionTitle}
              directUrl={video}
              hlsMaster={hlsMaster}
              hlsAudios={hlsAudios}
              hlsQualities={hlsQualities}
              resumeKey={`${kind}:${id}`}
              autoPlay
              onBack={() => nav(-1)}
              onFatal={(m) => setFatal(m)}
              onNeedHls={() => { if (videoUrlRef.current) watchHls(videoUrlRef.current); }}
              upgradeUrl={upgradeUrl}
            />
          </div>
          {hlsNote && <p className="text-xs text-amber-300/90 mt-2">🎧 {hlsNote}</p>}
        </>
      )}
      {fatal && (
        <div className="mt-3 bg-card border border-netflix/50 rounded-xl p-4">
          <p className="text-red-400 text-sm">⚠️ {fatal}</p>
          <button onClick={() => nav(-1)} className="mt-3 px-5 py-2 rounded-lg bg-netflix font-bold text-sm">← Other versions</button>
        </div>
      )}
    </div>
  );
}
