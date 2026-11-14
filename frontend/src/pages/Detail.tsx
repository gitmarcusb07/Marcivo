import { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { api, CAT_SITES, watchUrl, prewarm } from "../lib/api";
import { prettyVersion } from "../lib/format";
import { toggleInList, getList } from "../store/continueWatching";
import AdSlot from "../ads/AdSlot";
import AdBand from "../ads/AdBand";
import Seo, { SITE_URL, breadcrumbLd } from "../seo/Seo";

export default function Detail() {
  const { kind = "", id = "" } = useParams();
  const [sp] = useSearchParams();
  // Category context now travels in navigation state, not ?cat= — so
  // category clicks no longer mint ?cat= detail URLs that Google reports
  // as alternate-canonical duplicates. Old ?cat= links still work.
  const locState = useLocation().state as { cat?: string } | null;
  const cat = locState?.cat || sp.get("cat") || "";
  const nav = useNavigate();
  const [d, setD] = useState<any>(null);
  const [sites, setSites] = useState<any>(null);
  // Real per-version quality/audio options (from /api/qualities), keyed by
  // source URL — the ONLY qualities/audios a card may show. Until a
  // version's options load (or the fetch fails), the card shows the
  // title-parsed badges as before.
  const shortQ = (o: { height: number | null; label: string }) => (o.height ? `${o.height}p` : String(o.label || "").split(" ")[0]);
  const [qMap, setQMap] = useState<Record<string, import("../lib/api").QualitiesResp | null>>({});
  const [qInflight] = useState(() => new Set<string>());
  const [qAlive] = useState(() => ({ v: true }));
  useEffect(() => { qAlive.v = true; return () => { qAlive.v = false; }; }, [qAlive]);
  useEffect(() => {
    const list: any[] = sites?.results || [];
    for (const r of list) {
      const u: string = r?.source_url || r?.url || "";
      if (!u || qInflight.has(u) || u in qMap) continue;
      qInflight.add(u);
      api.qualities(u)
        .then((resp) => { if (qAlive.v) setQMap((m) => ({ ...m, [u]: resp && Array.isArray(resp.options) ? resp : null })); })
        .catch(() => { if (qAlive.v) setQMap((m) => ({ ...m, [u]: null })); })
        .finally(() => { qInflight.delete(u); });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sites?.results]);
  const [sitesScope, setSitesScope] = useState("");
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [season, setSeason] = useState<number | null>(null);
  const [seasonData, setSeasonData] = useState<any>(null);
  const [seasonLoading, setSeasonLoading] = useState(false);
  // Short form of the site-search failure reason (e.g. `HTTP 403 (Cloudflare
  // challenge)`) for the versions list message.
  const sitesErrShort = String((sites as any)?.error || "").split(": ")[0].trim();

  const loadVersions = useCallback((title: string, scopeLabel: string, meta?: { year?: string; type?: string; lang?: string }) => {
    setSites(null);
    setSitesScope(scopeLabel);
    // Source-group routing (Marcus 2026-11-14): anime → PirateXPlay/Gokuhd
    // only; every non-anime title checks BOTH Vegamovies + RogMovies, so a
    // version on either site is found. Exact mode: the backend keeps ONLY
    // versions of this title+year+kind — every quality (480p/720p/1080p)
    // as its own button, no other movies.
    const isAnime = kind === "anime";
    let sites = isAnime ? CAT_SITES.anime : CAT_SITES[cat];
    if (!sites && !isAnime) {
      sites = [1, 2];
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

  // Per-title SEO metadata — handed to the shared <Seo> manager at render
  // time. The canonical URL uses the stable public detail route, never
  // query parameters such as ?cat=.
  const seoName = d ? String(d.title || "").trim() : "";
  const seoYear = d?.year ? ` (${d.year})` : "";
  const seoKindLabel = kind === "anime" || d?.kind === "anime" ? "Anime" : d?.kind === "tv" || kind === "tv" ? "TV Series" : "Movie";
  const seoOverview = d ? String(d.overview || "").replace(/\s+/g, " ").trim() : "";
  // Language signal (fix 3): TMDB/AniList original language, same mapping
  // as the worker's detailMeta — keep both in sync.
  const seoLangMap: Record<string, string> = { hi: "Hindi", en: "English", ja: "Japanese", es: "Spanish", ko: "Korean", fr: "French", ta: "Tamil", te: "Telugu", ml: "Malayalam", bn: "Bengali", mr: "Marathi", pa: "Punjabi", ur: "Urdu" };
  const seoLangLabel = d ? (seoLangMap[String(d.lang || "").toLowerCase()] || "") : "";
  // Quality signal (fix 3): ONLY qualities actually present in the loaded
  // versions list — never a hard-coded quality. Updates the head once the
  // versions load, since Seo re-renders with new props.
  const seoQualities = Array.from(new Set((sites?.results || []).map((r: any) => {
    const qm = String(r.quality || r.title || "").match(/\b(2160p|1080p|720p|480p|360p|4K)\b/i);
    return qm ? qm[1].toUpperCase() : "";
  }).filter(Boolean)));
  const seoDescriptionBase = (seoLangLabel ? `${seoLangLabel} ${seoKindLabel.toLowerCase()}: ` : "") + (seoOverview || `Release info, cast and every available version of ${seoName || "this title"} on Marcivo — free to use, no account needed.`);
  const seoDescription = (seoQualities.length ? `${seoDescriptionBase} Available in ${seoQualities.join(", ")}.` : seoDescriptionBase).slice(0, 300);
  const seoPoster = d && typeof d.poster === "string" && /^https:\/\//i.test(d.poster) ? d.poster : undefined;
  const seoSchemaType = seoKindLabel === "Anime" && String(d?.format || "").toUpperCase() === "MOVIE" ? "Movie" : seoKindLabel === "Movie" ? "Movie" : "TVSeries";
  const seoSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": seoSchemaType,
    name: seoName || "Movie or series",
    url: `${SITE_URL}/detail/${encodeURIComponent(kind)}/${encodeURIComponent(id)}`,
    description: seoDescription,
  };
  if (d?.year && /^\d{4}$/.test(String(d.year))) seoSchema.datePublished = String(d.year);
  if (seoPoster) seoSchema.image = seoPoster;
  if (Array.isArray(d?.genres) && d.genres.length) seoSchema.genre = d.genres;
  if (Array.isArray(d?.cast) && d.cast.length) {
    seoSchema.actor = d.cast.slice(0, 10).map((name: string) => ({ "@type": "Person", name }));
  }

  // Episodes for the chosen season (TMDB).
  useEffect(() => {
    if (kind !== "tv" || season === null) return;
    setSeasonLoading(true);
    api.tvSeason(id, season).then(setSeasonData).catch(() => setSeasonData(null)).finally(() => setSeasonLoading(false));
  }, [kind, id, season]);


  if (loading) return <div className="max-w-7xl mx-auto px-4"><div className="skeleton h-72" /><div className="skeleton h-6 mt-3" /></div>;
  if (!d) return <div className="p-6">Failed to load. <button className="underline" onClick={() => nav(-1)}>Back</button></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 pb-16">
      <Seo
        title={`${seoName}${seoYear} — ${seoLangLabel ? `${seoLangLabel} ` : ""}${seoKindLabel} Info, Cast & Where to Watch | Marcivo`}
        description={seoDescription}
        image={seoPoster}
        jsonLd={[
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: seoName || "Title", path: `/detail/${kind}/${id}` },
          ]),
          seoSchema,
        ]}
      />
      <div className="flex items-center justify-between gap-3">
        <button onClick={() => nav(-1)} className="text-muted text-sm shrink-0">← Back</button>
        {/* Visible breadcrumb to match the BreadcrumbList JSON-LD above. */}
        <nav aria-label="Breadcrumb" className="text-xs text-muted flex items-center gap-1.5 min-w-0">
          <Link to="/" className="hover:text-white shrink-0">Home</Link>
          <span aria-hidden="true">›</span>
          <span className="text-gray-300 truncate">{seoName || "Title"}</span>
        </nav>
      </div>
      <div className="relative mt-2 rounded-2xl overflow-hidden hero-glow border border-white/10">
        {d.poster && (<img src={d.poster} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover opacity-25 blur-md scale-110" />)}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="relative flex flex-col md:flex-row gap-4 p-4 md:p-6">
          <img src={d.poster} alt={d.title} className="w-40 md:w-56 rounded-xl bg-card shadow-2xl ring-1 ring-white/20" />
          <div className="flex-1 min-w-0">
            <h1 className="font-display text-4xl md:text-5xl">{d.title}</h1>
            {(d.genres || []).length ? (
              <div className="flex flex-wrap gap-2 mt-2">
                {d.year ? <span className="px-2 py-0.5 rounded-full bg-white/10 text-xs font-semibold">{d.year}</span> : null}
                {d.rating ? <span className="px-2 py-0.5 rounded-full bg-white/10 text-xs font-semibold">★ {d.rating}</span> : null}
                {(d.genres || []).map((g: string) => (
                  <span key={g} className="px-2 py-0.5 rounded-full bg-white/10 text-xs font-semibold">{g}</span>
                ))}
              </div>
            ) : (
              <div className="text-muted text-sm mt-1">{[d.year, d.rating ? `★ ${d.rating}` : "", (d.genres || []).join(", ")].filter(Boolean).join(" • ")}</div>
            )}
            <p className="text-sm mt-3 text-gray-200">{d.overview}</p>
            {d.cast?.length > 0 && <p className="text-xs text-muted mt-2">Cast: {d.cast.join(", ")}</p>}
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => { const n = toggleInList("mylist", `${kind}:${id}`); setSaved(n.includes(`${kind}:${id}`)); }}
                className={`px-4 py-2 rounded-lg border ${saved ? "bg-netflix border-netflix" : "bg-card border-white/15"}`}
              >{saved ? "✓ My List" : "+ My List"}</button>
            </div>
          </div>

          {/* Tall skyscraper rail beside the poster + details. */}
          <aside className="hidden xl:block w-[176px] shrink-0 sticky top-20">
            <AdSlot name="detail_sidebar" />
          </aside>
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

      {/* Episodes (anime — AniList gives a count, one season): a compact
          grid of episode buttons, like the source's own episode browser. */}
      {kind === "anime" && typeof d.episodes === "number" && d.episodes > 0 && (
        <>
          <h2 className="font-display text-2xl mt-6">Episodes — {d.episodes}</h2>
          <div className="flex flex-wrap gap-2 mt-3">
            {Array.from({ length: d.episodes }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => nav(`/watch/${kind}/${id}?ep=S1E${n}&cat=${cat}&t=${encodeURIComponent(d.title)}`)}
                className="px-4 py-2 rounded-lg bg-card border border-white/10 font-bold text-sm active:border-netflix"
              >E{n}</button>
            ))}
          </div>
        </>
      )}

      {/* Exact versions of this title — one button per quality, like the site */}
      <h2 className="font-display text-2xl mt-6">Available versions{sites?.results?.length ? ` — ${sites.results.length} ${sites.results.length === 1 ? "version" : "versions"}` : ""}{sitesScope && sitesScope !== d.title ? ` — ${sitesScope}` : ""}</h2>
      {sites?.results?.length ? (
        <p className="text-xs text-muted mt-1">Tap a quality to play that exact file, or tap an audio to play that language.</p>
      ) : null}
      {!sites && <div className="skeleton h-12 mt-2" />}
      {sites && sites.status !== "ok" && (
        <p className="text-muted text-sm mt-2">
          ⚠️ {sites.provider ? `${sites.provider} search` : "Site search"} is unavailable right now
          {sitesErrShort ? ` — ${sitesErrShort}` : ""}. Try again in a moment.
        </p>
      )}
      {sites?.results?.length === 0 && sites.status === "ok" && (
        <p className="text-muted text-sm mt-2">
          {sites?.exact
            ? `Not available on ${(sites.exact.sites || []).join(", ") || sites.provider || "your sites"} yet.`
            : `No versions found${sites?.provider ? ` on ${sites.provider}` : ""}.`}
        </p>
      )}
      <div className="grid gap-2 mt-2">
        {(sites?.results || []).map((r: any) => {
          const pv = prettyVersion(r.title);
          const qm = String(r.quality || r.title || "").match(/\b(2160p|1080p|720p|480p|360p|4K)\b/i);
          const quality = (r.quality || (qm ? qm[1].toUpperCase() : "")).slice(0, 6);
          const q = qMap[r.source_url || r.url];
          const opts = q?.options?.length ? q.options : null;
          // Sibling versions ride along so Watch can fall back silently.
          const siblings = (sites?.results || [])
            .filter((s: any) => s.result_id && s.result_id !== r.result_id)
            .slice(0, 5)
            .map((s: any) => ({ result_id: s.result_id, url: s.source_url || s.url, title: s.title }));
          const go = (extra: { q?: number; a?: string }) => nav(watchUrl(kind, id, { ...r, _alts: siblings, ...extra }));
          const chip = (key: string, text: string, extra: { q?: number; a?: string }) => (
            <span
              key={key}
              role="button"
              tabIndex={0}
              onClick={(e) => { e.stopPropagation(); go(extra); }}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); e.stopPropagation(); go(extra); } }}
              className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-gray-200 cursor-pointer active:bg-netflix"
            >{text}</span>
          );
          const audios = opts ? Array.from(new Set(opts.map((o) => String(o.audio || "").trim()).filter(Boolean))) : [];
          const badge = opts ? shortQ(opts[0]) : quality;
          return (
            <button
              key={r.result_id || `${r.site_id}-${r.url}`}
              onClick={() => nav(watchUrl(kind, id, { ...r, _alts: siblings }))}
              onMouseEnter={() => prewarm(r)}
              onFocus={() => prewarm(r)}
              onPointerDown={() => prewarm(r)}
              className="text-left bg-card border border-netflix/30 rounded-xl px-4 py-3 active:border-netflix flex items-center gap-3 hover:border-netflix/70 hover:bg-white/5 transition-colors"
            >
              {!!badge && (
                <span className="shrink-0 px-3 py-1.5 rounded-lg bg-netflix font-black text-sm tracking-wide">{badge}</span>
              )}
              <span className="min-w-0 flex-1">
                <span className="font-semibold text-sm block truncate">{r.kind === "series" ? "📺" : "🎬"} {pv.title}</span>
                {opts ? (
                  <>
                    <span className="flex flex-wrap items-center gap-1 mt-1.5">
                      {opts.map((o) => chip(`${r.result_id}-q-${o.index}`, o.label, { q: o.index }))}
                      {audios.length === 1 && <span className="text-[10px] text-gray-300 ml-1">{audios[0]}</span>}
                    </span>
                    {audios.length > 1 && (
                      <span className="flex flex-wrap gap-1 mt-1">
                        {audios.map((a) => chip(`${r.result_id}-a-${a}`, a, { a }))}
                      </span>
                    )}
                  </>
                ) : !!pv.badges.length && (
                  <span className="flex flex-wrap gap-1 mt-1.5">
                    {pv.badges.map((b, j) => (
                      <span key={`${r.result_id}-badge-${j}`} className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-gray-200">{b}</span>
                    ))}
                  </span>
                )}
                <span className="text-xs text-muted mt-1 block">{r.site_name}{r.origin && r.origin !== "mixed" ? ` • ${r.origin}` : ""} • tap a quality to play</span>
              </span>
              <span className="shrink-0 w-9 h-9 rounded-full bg-netflix flex items-center justify-center text-sm font-black" aria-hidden="true">▶</span>
            </button>
          );
        })}
      </div>

      <AdSlot name="detail_below" className="mt-6" />

      {!!d.similar?.length && (
        <>
          <h2 className="font-display text-2xl mt-6">More like this</h2>
          <div className="flex gap-3 overflow-x-auto no-scrollbar mt-2">
            {d.similar.map((s: any) => (
              <button key={`${s.kind}-${s.id}`} onClick={() => nav(`/detail/${s.kind}/${s.id}`)} className="w-32 md:w-36 shrink-0 text-left">
                <div className="aspect-[2/3] bg-card rounded-lg overflow-hidden">{(s.thumb || s.poster) && <img src={s.thumb || s.poster} loading="lazy" decoding="async" className="w-full h-full object-cover" />}</div>
                <div className="text-xs mt-1 truncate">{s.title}</div>
              </button>
            ))}
          </div>
        </>
      )}

      {/* Remaining units — this page must carry the full ad set. */}
      <AdBand slots={["home_mid", "search_sidebar", "status_banner", "home_native"]} className="mt-8" />
    </div>
  );
}
