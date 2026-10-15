import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { api, API_BASE, backendInfo } from "../lib/api";
import { SearchBar, Row, RowSkeleton } from "../components/ui";
import TrendingHero from "../components/TrendingHero";

type Tab = "movies" | "anime";

const PILLS = [
  { id: "movies", label: "Movies" },
  { id: "series", label: "Series" },
  { id: "hollywood", label: "Hollywood" },
  { id: "bollywood", label: "Bollywood" },
];

export default function Home() {
  const nav = useNavigate();
  const [sp] = useSearchParams();
  const [tab, setTab] = useState<Tab>(sp.get("tab") === "anime" ? "anime" : "movies");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [backend, setBackend] = useState<"checking" | "up" | "down">("checking");

  // Bottom-nav tab switches arrive as ?tab= — follow them.
  useEffect(() => {
    const t = sp.get("tab");
    if (t === "anime" || t === "movies") setTab(t);
  }, [sp]);

  const load = useCallback(async (t: Tab) => {
    setLoading(true); setErr(""); setBackend("checking");
    const info = await backendInfo();
    setBackend(info.ok ? "up" : "down");
    if (!info.ok) {
      setErr(`Cannot reach backend at ${API_BASE}. Start it on your laptop (npm run dev in Marcivo/backend) and keep phone on the same network.`);
      setLoading(false);
      return;
    }
    try {
      setData(await api.home(t));
    } catch (e: any) {
      setErr(String(e.message || e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(tab); }, [tab, load]);

  // Auto-recovery: while backend is down, re-check every 5s.
  useEffect(() => {
    if (backend !== "down") return;
    const t = setInterval(async () => {
      if ((await backendInfo(5000)).ok) load(tab);
    }, 5000);
    return () => clearInterval(t);
  }, [backend, tab, load]);

  const pick = (it: any) => nav(`/detail/${it.kind}/${it.id}`);
  const showcase = data?.showcase;
  const anime = data?.anime;

  return (
    <div className="max-w-5xl mx-auto p-3 pb-24">
      <SearchBar placeholder="Search movies, series..." />

      {tab === "movies" && (
        <div className="flex gap-2 mt-3 overflow-x-auto no-scrollbar">
          {PILLS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => nav(`/category/${p.id}`)}
              className={`px-6 py-2 rounded-full font-semibold whitespace-nowrap border ${
                i === 0 ? "bg-netflix border-netflix" : "bg-card border-white/10 text-gray-200"
              }`}
            >{p.label}</button>
          ))}
        </div>
      )}

      {tab === "movies" && (
        <div className="text-center mt-3 font-display text-xl tracking-[0.2em] tagline-shimmer">
          FOR FAMILY, FRIENDS AND FOES
        </div>
      )}

      {loading && (<><RowSkeleton title="Loading…" /><RowSkeleton title="Loading…" /></>)}
      {err && (
        <div className="mt-4 bg-card border border-netflix/50 rounded-xl p-4">
          <div className="text-red-400 text-sm">⚠️ {err}</div>
          <button onClick={() => load(tab)} className="mt-3 px-5 py-2 rounded-lg bg-netflix font-bold text-sm">↻ Retry</button>
        </div>
      )}

      {!loading && !err && tab === "movies" && showcase && (
        <>
          <div className="mt-3">
            <TrendingHero items={showcase.trendingWeek || []} onWatch={pick} />
          </div>

          <div className="flex items-end justify-between mt-6 mb-2">
            <h2 className="font-display text-2xl">POPULAR MOVIES</h2>
            <button onClick={() => nav("/category/movies")} className="text-sm text-gray-300">See More ›</button>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
            {(showcase.popular2026 || []).map((it: any) => (
              <button key={`pop-${it.id}`} onClick={() => pick(it)} className="w-32 md:w-40 shrink-0 text-left">
                <div className="aspect-[2/3] rounded-xl overflow-hidden bg-card border border-white/10">
                  {(it.thumb || it.poster) && <img src={it.thumb || it.poster} alt={it.title} loading="lazy" decoding="async" className="w-full h-full object-cover" />}
                </div>
                <div className="mt-1 text-sm font-semibold truncate">{it.title}</div>
                <div className="text-xs text-muted">{[it.year, it.rating ? `★ ${it.rating}` : ""].filter(Boolean).join("  •  ")}</div>
              </button>
            ))}
          </div>

          <div className="flex items-end justify-between mt-6 mb-2">
            <h2 className="font-display text-2xl">NEW RELEASES</h2>
            <button onClick={() => nav("/category/movies")} className="text-sm text-gray-300">See More ›</button>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
            {(showcase.newReleases || []).map((it: any) => (
              <button key={`new-${it.id}`} onClick={() => pick(it)} className="w-32 md:w-40 shrink-0 text-left">
                <div className="aspect-[2/3] rounded-xl overflow-hidden bg-card border border-white/10">
                  {(it.thumb || it.poster) && <img src={it.thumb || it.poster} alt={it.title} loading="lazy" decoding="async" className="w-full h-full object-cover" />}
                </div>
                <div className="mt-1 text-sm font-semibold truncate">{it.title}</div>
                <div className="text-xs text-muted">{[it.year, it.rating ? `★ ${it.rating}` : ""].filter(Boolean).join("  •  ")}</div>
              </button>
            ))}
          </div>
        </>
      )}

      {!loading && !err && tab === "anime" && anime && (<>
        <Row title="Top Anime" items={anime.top} onPick={pick} />
        <Row title="Seasonal Anime" items={anime.seasonal} onPick={pick} />
      </>)}

    </div>
  );
}
