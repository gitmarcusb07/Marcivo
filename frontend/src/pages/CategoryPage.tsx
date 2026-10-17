import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../lib/api";
import { SearchBar, Row } from "../components/ui";
import AdSlot from "../ads/AdSlot";
import Seo, { breadcrumbLd } from "../seo/Seo";

const PILLS = [
  { id: "movies", label: "Movies" },
  { id: "series", label: "Series" },
  { id: "hollywood", label: "Hollywood" },
  { id: "bollywood", label: "Bollywood" },
];

const TITLES: Record<string, string> = {
  movies: "Movies",
  series: "Web Series",
  hollywood: "Hollywood",
  bollywood: "Bollywood",
};

const SEO: Record<string, { title: string; description: string; blurb: string }> = {
  movies: {
    title: "Movies — Watch Movies Online Free | Marcivo",
    description: "Browse movies on Marcivo — popular films, top rated picks, now playing and coming soon. Every title lines up its available versions so you can press play.",
    blurb: "Popular, top rated, now playing and coming soon — open any title to see every version available right now.",
  },
  series: {
    title: "Web Series — Watch TV Series Online Free | Marcivo",
    description: "Watch web series and TV shows online — popular series, top rated shows and what's airing now, each with its available versions lined up.",
    blurb: "Popular and top rated web series, plus what's airing right now.",
  },
  hollywood: {
    title: "Hollywood Movies & Series — Watch Online | Marcivo",
    description: "Hollywood movies and series in English — browse what's available now, with every version of each title lined up on its page.",
    blurb: "English-language movies and series — what's available right now.",
  },
  bollywood: {
    title: "Bollywood & Hindi Movies — Watch Online | Marcivo",
    description: "Bollywood and Hindi movies and series — browse what's available now, with every version of each title lined up on its page.",
    blurb: "Hindi-language movies and series — what's available right now.",
  },
};

export default function CategoryPage() {
  const { cat = "movies" } = useParams();
  const nav = useNavigate();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.browse(cat).then(setData).catch(() => setData(null)).finally(() => setLoading(false));
  }, [cat]);

  return (
    <div className="max-w-7xl mx-auto px-4 pb-16">
      <Seo
        title={SEO[cat]?.title || `${TITLES[cat] || cat} — Marcivo`}
        description={SEO[cat]?.description || `Browse ${TITLES[cat] || cat} on Marcivo — every title with its available versions lined up.`}
        jsonLd={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: TITLES[cat] || cat, path: `/category/${cat}` },
        ])}
      />
      <SearchBar placeholder="Search movies, series..." />
      <div className="flex items-center gap-3 mt-4 mb-1">
        <button onClick={() => nav(-1)} className="text-muted">←</button>
        <h1 className="font-display text-3xl">{TITLES[cat] || cat}</h1>
      </div>
      {SEO[cat]?.blurb && <p className="text-sm text-muted">{SEO[cat].blurb}</p>}
      <div className="flex gap-2 mt-2 overflow-x-auto no-scrollbar">
        {PILLS.map((p) => (
          <button
            key={p.id}
            onClick={() => nav(`/category/${p.id}`)}
            className={`px-6 py-2 rounded-full font-semibold whitespace-nowrap border ${
              p.id === cat ? "bg-netflix border-netflix" : "bg-card border-white/10 text-gray-200"
            }`}
          >{p.label}</button>
        ))}
      </div>
      <AdSlot name="category_mid" className="mt-4" />
      {loading && <div className="skeleton h-48 mt-4" />}
      {!loading && !data && <p className="text-muted mt-4">Failed to load. Check backend and retry.</p>}
      {(data?.rows || []).map((row: any) => (
        <Row key={row.title} title={row.title} items={row.items} onPick={(it: any) => nav(`/detail/${it.kind}/${it.id}?cat=${cat}`)} />
      ))}
    </div>
  );
}
