import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import { SearchBar, Row, RowSkeleton } from "../components/ui";
import Seo, { SITE_URL, breadcrumbLd } from "../seo/Seo";

const Y = new Date().getFullYear();

const TITLE = `Free Movies & Shows — Watch Movies Online Free | Marcivo`;
const DESCRIPTION = `Free movies and shows to watch online — trending films, popular web series and anime in one place. Compare every available version and press play. Free to use, no account needed.`;

const FAQ_HOW = [
  { n: "1", h: "Search or browse", p: "Start from the rows below or search any movie, series or anime by name." },
  { n: "2", h: "Compare versions", p: "Each title lists the versions that exist right now — 480p to 2160p, with audio details." },
  { n: "3", h: "Press play", p: "Pick one and the player opens in your browser. No install, no sign-up, works on mobile." },
];

export default function FreeMovies() {
  const nav = useNavigate();
  const [data, setData] = useState<any>(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    let alive = true;
    api.home("mixed")
      .then((r) => { if (alive) setData(r); })
      .catch((e) => { if (alive) setErr(String(e?.message || e)); });
    return () => { alive = false; };
  }, []);

  const t = data?.tmdb;
  const rows: { title: string; items: any[] }[] = [];
  if (t?.trending?.length) rows.push({ title: "Trending This Week", items: t.trending });
  if (t?.moviesPopular?.length) rows.push({ title: "Popular Movies", items: t.moviesPopular });
  if (t?.seriesPopular?.length) rows.push({ title: "Popular Web Series", items: t.seriesPopular });
  if (t?.moviesTop?.length) rows.push({ title: "Top Rated Movies", items: t.moviesTop });
  if (data?.anime?.top?.length) rows.push({ title: "Top Anime", items: data.anime.top });

  const itemList = rows[0]?.items?.slice(0, 10) || [];
  const ld = [
    breadcrumbLd([
      { name: "Home", path: "/" },
      { name: "Free Movies & Shows", path: "/free-movies" },
    ]),
    ...(itemList.length
      ? [{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Free movies and shows on Marcivo",
          itemListElement: itemList.map((it: any, i: number) => ({
            "@type": "ListItem",
            position: i + 1,
            name: it.title,
            url: `${SITE_URL}/detail/${it.kind}/${it.id}`,
          })),
        }]
      : []),
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 pb-16">
      <Seo title={TITLE} description={DESCRIPTION} path="/free-movies" jsonLd={ld} />
      <SearchBar placeholder="Search movies, series..." />

      <h1 className="font-display text-3xl md:text-4xl mt-5">Free Movies and Shows to Watch Online</h1>
      <p className="text-gray-200 mt-3 max-w-3xl text-sm md:text-base">
        Marcivo collects the movies, web series and anime people are watching right now — and for every title it lines
        up the versions that are actually available, from 480p up to 2160p. Browse the rows below, jump into a series,
        or search anything by name. Free to use, no account, no install.
      </p>

      <div className="grid gap-3 sm:grid-cols-3 mt-5">
        {FAQ_HOW.map((s) => (
          <div key={s.h} className="bg-card border border-white/10 rounded-xl p-4 flex gap-3">
            <span className="shrink-0 w-7 h-7 rounded-full bg-netflix font-black grid place-items-center text-sm">{s.n}</span>
            <div>
              <div className="font-bold text-sm">{s.h}</div>
              <p className="text-xs text-gray-300 mt-1">{s.p}</p>
            </div>
          </div>
        ))}
      </div>

      {!data && !err && (
        <>
          <RowSkeleton title="Loading free movies…" />
          <RowSkeleton title="Loading…" />
          <RowSkeleton title="Loading…" />
        </>
      )}

      {err && (
        <div className="mt-6 bg-card border border-netflix/50 rounded-xl p-4">
          <p className="text-red-400 text-sm">⚠️ Couldn't load the catalogue right now — the backend may be waking up.</p>
          <div className="flex flex-wrap gap-2 mt-3">
            <button onClick={() => window.location.reload()} className="px-5 py-2 rounded-lg bg-netflix font-bold text-sm">↻ Retry</button>
            <Link to="/category/movies" className="px-5 py-2 rounded-lg bg-white/10 font-bold text-sm">Browse movies</Link>
            <Link to="/category/series" className="px-5 py-2 rounded-lg bg-white/10 font-bold text-sm">Browse series</Link>
          </div>
        </div>
      )}

      {rows.map((row) => (
        <Row key={row.title} title={row.title} items={row.items} onPick={(it: any) => nav(`/detail/${it.kind}/${it.id}`)} />
      ))}

      {!!rows.length && (
        <>
          <h2 className="font-display text-2xl mt-8">Keep exploring</h2>
          <div className="flex flex-wrap gap-2 mt-3">
            <Link to="/watch-free" className="px-5 py-2.5 rounded-full bg-card border border-white/10 font-semibold text-sm hover:border-white/30">How to watch free — full guide</Link>
            <Link to="/upcoming" className="px-5 py-2.5 rounded-full bg-card border border-white/10 font-semibold text-sm hover:border-white/30">Upcoming movies</Link>
            <Link to="/upcoming/shows" className="px-5 py-2.5 rounded-full bg-card border border-white/10 font-semibold text-sm hover:border-white/30">Upcoming series</Link>
            <Link to="/upcoming/anime" className="px-5 py-2.5 rounded-full bg-card border border-white/10 font-semibold text-sm hover:border-white/30">Upcoming anime</Link>
            <Link to="/category/hollywood" className="px-5 py-2.5 rounded-full bg-card border border-white/10 font-semibold text-sm hover:border-white/30">Hollywood</Link>
            <Link to="/category/bollywood" className="px-5 py-2.5 rounded-full bg-card border border-white/10 font-semibold text-sm hover:border-white/30">Bollywood</Link>
          </div>
          <p className="text-xs text-muted mt-6">
            Updated for {Y}. Marcivo does not host any files — it links to media indexed from third-party sources.
          </p>
        </>
      )}
    </div>
  );
}
