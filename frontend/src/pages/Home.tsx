import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { api, API_BASE, backendInfo } from "../lib/api";
import { SearchBar, Row, RowSkeleton } from "../components/ui";
import TrendingHero from "../components/TrendingHero";
import AdSlot from "../ads/AdSlot";
import AdBand from "../ads/AdBand";
import Seo, { SITE_URL } from "../seo/Seo";

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
      setErr(`Cannot reach backend at ${API_BASE}. ${info.error ? `(${info.error})` : ""}`);
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
    <div className="max-w-7xl mx-auto px-4 pb-16">
      <Seo
        title="Marcivo — Watch Movies Online Free | Movies, Series & Anime"
        description="Marcivo lines up trending movies, web series and anime in one place — compare every available version and press play. Free to use, no account needed."
        path="/"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": `${SITE_URL}/#website`,
            name: "Marcivo",
            alternateName: "Marcivo Movies",
            url: `${SITE_URL}/`,
            potentialAction: {
              "@type": "SearchAction",
              target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/search?q={search_term_string}` },
              "query-input": "required name=search_term_string",
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": `${SITE_URL}/#organization`,
            name: "Marcivo",
            url: `${SITE_URL}/`,
            logo: { "@type": "ImageObject", url: `${SITE_URL}/icon-512.png`, width: 512, height: 512 },
          },
        ]}
      />
      <h1 className="sr-only">Watch Movies Online Free — Movies, Web Series and Anime on Marcivo</h1>
      {/* Content column + tall skyscraper rail. The rail is sticky so the ad
          stays in view while the rows scroll past it. */}
      <div className="flex gap-6 items-start">
        <div className="min-w-0 flex-1">
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

          <AdSlot name="home_mid" className="mt-6" />

          <div className="flex items-end justify-between mt-6 mb-2">
            <h2 className="font-display text-2xl">POPULAR MOVIES</h2>
            <button onClick={() => nav("/category/movies")} className="text-sm text-gray-300">See More ›</button>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
            {(showcase.popular2026 || []).map((it: any) => (
              <button key={`pop-${it.id}`} onClick={() => pick(it)} className="w-32 md:w-40 lg:w-44 shrink-0 text-left">
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
              <button key={`new-${it.id}`} onClick={() => pick(it)} className="w-32 md:w-40 lg:w-44 shrink-0 text-left">
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
        <AdSlot name="home_mid" className="mt-6" />
        <Row title="Seasonal Anime" items={anime.seasonal} onPick={pick} />
      </>)}

      {/* Free / upcoming hub links — the SEO content pages, linked site-wide. */}
      {!loading && !err && (
        <div className="mt-6 bg-card border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-300">
          <span className="text-muted">Free &amp; upcoming:</span>{" "}
          <Link to="/watch-free" className="hover:text-white underline decoration-white/30">How to watch movies free</Link>
          {" · "}
          <Link to="/free-movies" className="hover:text-white underline decoration-white/30">Free movies &amp; shows</Link>
          {" · "}
          <Link to="/upcoming" className="hover:text-white underline decoration-white/30">Upcoming movies</Link>
          {" · "}
          <Link to="/upcoming/shows" className="hover:text-white underline decoration-white/30">Upcoming series</Link>
          {" · "}
          <Link to="/upcoming/anime" className="hover:text-white underline decoration-white/30">Upcoming anime</Link>
        </div>
      )}

      {/* Native banner closes out the home content column, on both tabs. */}
      {!loading && !err && <AdSlot name="home_native" className="mt-6" />}

      {/* Remaining units — this page must carry the full ad set. */}
      {!loading && !err && <AdBand slots={["search_mid", "search_sidebar", "status_banner"]} className="mt-8" />}
        </div>

        {/* Tall skyscraper rail — hidden on the player page like all ads. */}
        <aside className="hidden xl:block w-[176px] shrink-0 sticky top-20">
          <AdSlot name="home_tall" />
        </aside>
      </div>
    </div>
  );
}
