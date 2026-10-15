import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../lib/api";
import { SearchBar, Row } from "../components/ui";

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
    <div className="max-w-5xl mx-auto p-3 pb-24">
      <SearchBar placeholder="Search movies, series..." />
      <div className="flex items-center gap-3 mt-4 mb-1">
        <button onClick={() => nav(-1)} className="text-muted">←</button>
        <h1 className="font-display text-3xl">{TITLES[cat] || cat}</h1>
      </div>
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
      {loading && <div className="skeleton h-48 mt-4" />}
      {!loading && !data && <p className="text-muted mt-4">Failed to load. Check backend and retry.</p>}
      {(data?.rows || []).map((row: any) => (
        <Row key={row.title} title={row.title} items={row.items} onPick={(it: any) => nav(`/detail/${it.kind}/${it.id}?cat=${cat}`)} />
      ))}
    </div>
  );
}
