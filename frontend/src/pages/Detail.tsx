import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { api, CAT_SITES, watchUrl, prewarm } from "../lib/api";
import { prettyVersion } from "../lib/format";
import { toggleInList, getList } from "../store/continueWatching";

export default function Detail() {
  const { kind = "", id = "" } = useParams();
  const [sp] = useSearchParams();
  const cat = sp.get("cat") || "";
  const nav = useNavigate();
  const [d, setD] = useState<any>(null);
  const [sites, setSites] = useState<any>(null);
  const [sitesScope, setSitesScope] = useState("");
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [season, setSeason] = useState<number | null>(null);
  const [seasonData, setSeasonData] = useState<any>(null);
  const [seasonLoading, setSeasonLoading] = useState(false);

  const loadVersions = useCallback((title: string, scopeLabel: string, meta?: { year?: string; type?: string; lang?: string }) => {
    setSites(null);
    setSitesScope(scopeLabel);
    // Source-group routing: anime → PirateXPlay/Gokuhd only; Hollywood →
    // Vegamovies only; Bollywood → RogMovies only; otherwise the movie pool.
    // The TMDB original language connects even uncategorized pages to their
    // relevant site (en → Vegamovies, hi → RogMovies).
    // Exact mode: the backend keeps ONLY versions of this title+year+kind —
    // every quality (480p/720p/1080p) as its own button, no other movies.
    const isAnime = kind === "anime";
    let sites = isAnime ? CAT_SITES.anime : CAT_SITES[cat];
    if (!sites && !isAnime) {
      sites = meta?.lang === "hi" ? CAT_SITES.bollywood : meta?.lang === "en" ? CAT_SITES.hollywood : [4, 1, 2];
    }
    const priority = isAnime ? "anime" : "movie";
    api.siteSearch(title, { sites, priority, year: meta?.year, type: meta?.type, exact: true }).then(setSites).catch(() => setSites({ status: "unavailable", results: [] }));
  }, [cat, kind]);

  useEffect(() => {
    setLoading(true);
    api.detail(kind, id)
      .then((x) => {
        setD(x);
        setSaved(getList("mylist").includes(`${kind}:${id}`));
        // Exact versions of the clicked title only: TMDB/AniList gives us
        // the true title+year+kind (+language for site routing), so the
        // backend drops every other movie.
        loadVersions(x.title, x.title, { year: x.year, type: x.kind, lang: x.lang });
        const seasons = (x.seasons || []).filter((s: any) => s.n > 0);
        if (x.kind === "tv" && seasons.length) setSeason(seasons[0].n);
      })
      .catch(() => setD(null))
      .finally(() => setLoading(false));
  }, [kind, id, cat, loadVersions]);

  // Episodes for the chosen season (TMDB).
  useEffect(() => {
    if (kind !== "tv" || season === null) return;
    setSeasonLoading(true);
    api.tvSeason(id, season).then(setSeasonData).catch(() => setSeasonData(null)).finally(() => setSeasonLoading(false));
  }, [kind, id, season]);


  if (loading) return <div className="max-w-5xl mx-auto p-3"><div className="skeleton h-72" /><div className="skeleton h-6 mt-3" /></div>;
  if (!d) return <div className="p-6">Failed to load. <button className="underline" onClick={() => nav(-1)}>Back</button></div>;

  return (
    <div className="max-w-5xl mx-auto p-3 pb-24">
      <button onClick={() => nav(-1)} className="text-muted text-sm">← Back</button>
      <div className="mt-2 flex flex-col md:flex-row gap-4">
        <img src={d.poster} alt={d.title} className="w-40 md:w-56 rounded-xl bg-card" />
        <div className="flex-1">
          <h1 className="font-display text-3xl">{d.title}</h1>
          <div className="text-muted text-sm mt-1">{[d.year, d.rating ? `★ ${d.rating}` : "", (d.genres || []).join(", ")].filter(Boolean).join(" • ")}</div>
          <p className="text-sm mt-3 text-gray-200">{d.overview}</p>
          {d.cast?.length > 0 && <p className="text-xs text-muted mt-2">Cast: {d.cast.join(", ")}</p>}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => { const n = toggleInList("mylist", `${kind}:${id}`); setSaved(n.includes(`${kind}:${id}`)); }}
              className={`px-4 py-2 rounded-lg border ${saved ? "bg-netflix border-netflix" : "bg-card border-white/15"}`}
            >{saved ? "✓ My List" : "+ My List"}</button>
          </div>
        </div>
      </div>

      {/* Seasons & Episodes (series only) */}
      {d.kind === "tv" && (d.seasons || []).filter((s: any) => s.n > 0).length > 0 && (
        <>
          <h2 className="font-display text-2xl mt-6">Seasons & Episodes</h2>
          <div className="flex gap-2 mt-2 overflow-x-auto no-scrollbar">
            {(d.seasons || []).filter((s: any) => s.n > 0).map((s: any) => (
              <button
                key={s.n}
                onClick={() => setSeason(s.n)}
                className={`px-5 py-2 rounded-full font-semibold whitespace-nowrap border ${
                  season === s.n ? "bg-netflix border-netflix" : "bg-card border-white/10 text-gray-200"
                }`}
              >S{s.n}{s.episodes ? ` • ${s.episodes}E` : ""}</button>
            ))}
          </div>
          {seasonLoading && <div className="skeleton h-24 mt-3" />}
          {!seasonLoading && (seasonData?.episodes || []).map((e: any) => (
            <button
              key={e.n}
              onClick={() => nav(`/watch/${kind}/${id}?ep=S${season}E${e.n}&cat=${cat}&t=${encodeURIComponent(d.title)}`)}
              className="w-full text-left flex gap-3 mt-3 bg-card border border-white/10 rounded-xl p-2 active:border-netflix"
            >
              {e.still ? (
                <img src={e.still} alt="" className="w-28 rounded-lg object-cover" />
              ) : (
                <div className="w-28 rounded-lg bg-black/50 flex items-center justify-center text-muted font-display text-xl">E{e.n}</div>
              )}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold truncate">E{e.n} • {e.name}</div>
                {e.overview ? <div className="text-xs text-muted mt-1 line-clamp-2">{e.overview}</div> : null}
                <div className="mt-2 inline-block px-4 py-1.5 rounded-full bg-netflix text-xs font-bold">▶ Play E{e.n}</div>
              </div>
            </button>
          ))}
        </>
      )}

      {/* Exact versions of this title — one button per quality, like the site */}
      <h2 className="font-display text-2xl mt-6">Available versions{sitesScope && sitesScope !== d.title ? ` — ${sitesScope}` : ""}</h2>
      {!sites && <div className="skeleton h-12 mt-2" />}
      {sites && sites.status !== "ok" && <p className="text-muted text-sm mt-2">Site search: {sites.status}. Check backend .env sites.</p>}
      {sites?.results?.length === 0 && sites.status === "ok" && (
        <p className="text-muted text-sm mt-2">
          {sites?.exact ? `Not available on ${(sites.exact.sites || []).join(", ") || "your sites"} yet.` : "No versions found on your sites."}
        </p>
      )}
      <div className="grid gap-2 mt-2">
        {(sites?.results || []).map((r: any) => {
          const pv = prettyVersion(r.title);
          const qm = String(r.quality || r.title || "").match(/\b(2160p|1080p|720p|480p|360p|4K)\b/i);
          const quality = (r.quality || (qm ? qm[1].toUpperCase() : "")).slice(0, 6);
          // Sibling versions ride along so Watch can fall back silently.
          const siblings = (sites?.results || [])
            .filter((s: any) => s.result_id && s.result_id !== r.result_id)
            .slice(0, 5)
            .map((s: any) => ({ result_id: s.result_id, url: s.source_url || s.url, title: s.title }));
          return (
            <button
              key={r.result_id || `${r.site_id}-${r.url}`}
              onClick={() => nav(watchUrl(kind, id, { ...r, _alts: siblings }))}
              onMouseEnter={() => prewarm(r)}
              onFocus={() => prewarm(r)}
              className="text-left bg-card border border-netflix/30 rounded-xl px-4 py-3 active:border-netflix flex items-center gap-3"
            >
              {!!quality && (
                <span className="shrink-0 px-3 py-1.5 rounded-lg bg-netflix font-black text-sm tracking-wide">{quality}</span>
              )}
              <span className="min-w-0 flex-1">
                <span className="font-semibold text-sm block truncate">{r.kind === "series" ? "📺" : "🎬"} {pv.title}</span>
                {!!pv.badges.length && (
                  <span className="flex flex-wrap gap-1 mt-1.5">
                    {pv.badges.map((b, j) => (
                      <span key={`${r.result_id}-badge-${j}`} className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-gray-200">{b}</span>
                    ))}
                  </span>
                )}
                <span className="text-xs text-muted mt-1 block">{r.site_name}{r.origin && r.origin !== "mixed" ? ` • ${r.origin}` : ""} • tap to play</span>
              </span>
            </button>
          );
        })}
      </div>

      {!!d.similar?.length && (
        <>
          <h2 className="font-display text-2xl mt-6">More like this</h2>
          <div className="flex gap-3 overflow-x-auto no-scrollbar mt-2">
            {d.similar.map((s: any) => (
              <button key={`${s.kind}-${s.id}`} onClick={() => nav(`/detail/${s.kind}/${s.id}`)} className="w-28 shrink-0 text-left">
                <div className="aspect-[2/3] bg-card rounded-lg overflow-hidden">{(s.thumb || s.poster) && <img src={s.thumb || s.poster} loading="lazy" decoding="async" className="w-full h-full object-cover" />}</div>
                <div className="text-xs mt-1 truncate">{s.title}</div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
