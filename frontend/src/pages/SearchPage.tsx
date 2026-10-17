import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { api, API_BASE, watchUrl, prewarm } from "../lib/api";
import { prettyVersion } from "../lib/format";
import { SearchBar, Card } from "../components/ui";
import AdSlot from "../ads/AdSlot";

export default function SearchPage() {
  const [sp] = useSearchParams();
  const q = sp.get("q") || "";
  const nav = useNavigate();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!q) return;
    setLoading(true);
    api.search(q).then(setData).catch(() => setData(null)).finally(() => setLoading(false));
  }, [q]);

  const all = [...(data?.tmdb || []), ...(data?.anime || [])];
  // §24: prefer grouped content (one card per content_id with sources[]);
  // fall back to flat site rows for older backends.
  const grouped = (data?.grouped || []) as any[];
  const sites = (data?.sites || []) as any[];

  return (
    <div className="max-w-7xl mx-auto px-4 pb-16">
      <div className="flex gap-6 items-start">
        <div className="min-w-0 flex-1">
      <SearchBar initial={q} key={q} />
      {/* Rectangle unit between the search bar and the results grid. */}
      <AdSlot name="search_mid" className="mt-4" />
      <h1 className="font-display text-2xl mt-4">Results for “{q}”</h1>
      {loading && <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3 mt-3">{Array.from({ length: 12 }).map((_, i) => <div key={i} className="skeleton aspect-[2/3]" />)}</div>}
      {!loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3 mt-3">
          {all.map((it: any) => (
            <Card key={`${it.kind}-${it.id}`} item={it} onClick={() => nav(`/detail/${it.kind}/${it.id}`)} />
          ))}
        </div>
      )}
      {!loading && data && (!!grouped.length || !!sites.length) && (
        <>
          <h2 className="font-display text-2xl mt-6">Available versions — PRMovies • PirateXPlay • Vegamovies • RogMovies • Gokuhd</h2>
          <div className="grid gap-2 mt-2">
            {(grouped.length ? grouped : sites.map((r: any) => ({
              content_id: r.content_id || r.result_id || r.url,
              result_id: r.result_id,
              title: r.title,
              type: r.type || r.kind,
              kind: r.kind,
              match: r.match,
              sources: [{
                name: (r.source || r.site_name || "").toLowerCase(),
                site_id: r.site_id,
                priority: r.source_priority ?? 999,
                result_id: r.result_id,
                source_url: r.source_url || r.url,
              }],
            }))).map((g: any) => {
              const pv = prettyVersion(g.title);
              const best = (g.sources || [])[0] || {};
              // Resolve the preferred (highest-priority) source row for exact identity.
              const flat = sites.find((s: any) => s.result_id === best.result_id) || sites.find((s: any) => s.content_id === g.content_id) || {};
              const skind = g.type === "anime" ? "anime" : g.kind === "series" || g.type === "series" ? "tv" : "movie";
              const siblings = sites.filter((s: any) => (s.content_id || s.result_id) === g.content_id && s.result_id !== (best.result_id || flat.result_id));
              const alts = siblings.slice(0, 5).map((s: any) => ({ result_id: s.result_id, url: s.source_url || s.url, title: s.title }));
              const watchTarget = {
                result_id: best.result_id || flat.result_id,
                content_id: g.content_id,
                url: best.source_url || flat.url,
                title: g.title,
                _alts: alts,
              };
              const srcLabel = (g.sources || []).map((s: any) => s.name || `site ${s.site_id}`).filter(Boolean).join(" • ");
              return (
                <button
                  key={g.content_id || g.result_id}
                  onClick={() => nav(watchUrl(skind, "0", watchTarget))}
                  onMouseEnter={() => prewarm({ result_id: best.result_id, url: best.source_url })}
                  onFocus={() => prewarm({ result_id: best.result_id, url: best.source_url })}
                  className="text-left bg-card border border-white/10 rounded-xl px-4 py-3 active:border-netflix"
                >
                  <div className="font-semibold text-sm">{g.kind === "series" || g.type === "series" ? "📺" : "🎬"} {pv.title}</div>
                  {!!pv.badges.length && (
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {pv.badges.map((b, j) => (
                        <span key={`${g.content_id}-badge-${j}`} className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-gray-200">{b}</span>
                      ))}
                    </div>
                  )}
                  <div className="text-xs text-muted mt-1">{srcLabel || (flat.site_name || "Site")} • tap to play{g.sources?.length > 1 ? ` • ${g.sources.length} sources` : ""}</div>
                </button>
              );
            })}
          </div>
        </>
      )}
      {!loading && !data && (
        <div className="mt-4 bg-card border border-netflix/50 rounded-xl p-4">
          <p className="text-red-400 text-sm">⚠️ Cannot reach backend at {API_BASE}. Start it on your laptop and retry.</p>
          <button onClick={() => window.location.reload()} className="mt-3 px-5 py-2 rounded-lg bg-netflix font-bold text-sm">↻ Retry</button>
        </div>
      )}
      {!loading && data && !all.length && !sites.length && <p className="text-muted mt-3">No results. Try another spelling.</p>}
        </div>

        {/* Tall skyscraper rail beside the results. */}
        <aside className="hidden xl:block w-[176px] shrink-0 sticky top-20">
          <AdSlot name="search_sidebar" />
        </aside>
      </div>
    </div>
  );
}
