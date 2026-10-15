import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { api } from "../lib/api";

export function SearchBar({ initial = "", placeholder = "SEARCH" }: { initial?: string; placeholder?: string }) {
  const nav = useNavigate();
  const [q, setQ] = useState(initial);
  const [sugs, setSugs] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const deb = useRef<any>(null);

  // Live suggestions, Google/Netflix style: debounced as you type.
  // Covers TMDB + AniList + all site indexes so titles like "Runner 2026"
  // appear even when only Vegamovies has them.
  useEffect(() => {
    clearTimeout(deb.current);
    const query = q.trim();
    if (query.length < 2) { setSugs([]); return; }
    deb.current = setTimeout(async () => {
      try {
        const r = await api.search(query);
        const catalog = [...(r.tmdb || []), ...(r.anime || [])];
        const siteHits = ((r.sites || []) as any[]).map((s: any) => ({
          _site: true,
          title: s.title,
          url: s.url,
          site_name: s.site_name,
          kind: s.kind,
          result_id: s.result_id,
          content_id: s.content_id,
        }));
        // Prefer catalog matches, fill remaining slots with site-only hits.
        // Dedupe by title+year (never title alone — Dune 1984 ≠ Dune 2021).
        const keyOf = (m: any) => `${String(m.title || "").toLowerCase()}|${String(m.year || (m as any).content_id || "").toLowerCase()}`;
        const merged = [...catalog.slice(0, 6)];
        for (const h of siteHits) {
          if (merged.length >= 7) break;
          if (!merged.some((m: any) => keyOf(m) === keyOf(h))) merged.push(h);
        }
        setSugs(merged.slice(0, 7));
        setOpen(true);
      } catch {}
    }, 350);
    return () => clearTimeout(deb.current);
  }, [q]);

  const go = (text: string) => {
    setOpen(false);
    if (text.trim()) nav(`/search?q=${encodeURIComponent(text.trim())}`);
  };

  return (
    <div className="relative sticky top-0 z-20">
      <form
        className="bg-searchbar/95 backdrop-blur border border-netflix/60 rounded-full flex items-center gap-3 px-4 py-3"
        onSubmit={(e) => { e.preventDefault(); go(q); }}
      >
        <span className="text-xl">🔍</span>
        <span className="w-px h-6 bg-white/15" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => { if (sugs.length) setOpen(true); }}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none tracking-widest font-semibold placeholder:text-gray-400 text-gray-100"
        />
      </form>
      {open && sugs.length > 0 && (
        <div className="absolute left-0 right-0 mt-1 bg-[#1c1c1e] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
          {sugs.map((it: any, idx: number) => (
            <button
              key={it._site ? it.result_id || `site-${idx}-${it.url}` : `${it.kind}-${it.id}`}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                setOpen(false);
                if (it._site) go(q);
                else nav(`/detail/${it.kind}/${it.id}`);
              }}
              className="w-full flex items-center gap-3 px-3 py-2 text-left active:bg-white/10"
            >
              {(it.thumb || it.poster)
                ? <img src={it.thumb || it.poster} alt="" loading="lazy" decoding="async" className="w-8 rounded" />
                : <div className="w-8 h-11 rounded bg-card flex items-center justify-center text-xs">{it._site ? "🌐" : "🎬"}</div>}
              <div className="min-w-0">
                <div className="text-sm font-semibold truncate">{it.title}</div>
                <div className="text-[11px] text-muted">{it._site ? `${it.site_name || "Site"} • tap to see versions` : [it.kind, it.year, it.rating ? `★ ${it.rating}` : ""].filter(Boolean).join(" • ")}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function Card({ item, onClick }: { item: any; onClick?: () => void }) {
  const img = item.thumb || item.poster;
  return (
    <button onClick={onClick} className="w-28 md:w-36 shrink-0 text-left group">
      <div className="aspect-[2/3] rounded-lg overflow-hidden bg-card">
        {img ? (
          <img src={img} alt={item.title} loading="lazy" decoding="async" className="w-full h-full object-cover group-active:scale-95 transition" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted text-xs p-2 text-center">{item.title}</div>
        )}
      </div>
      <div className="mt-1 text-xs font-semibold truncate">{item.title}</div>
      <div className="text-[11px] text-muted">{[item.year, item.rating ? `★ ${item.rating}` : ""].filter(Boolean).join(" • ")}</div>
    </button>
  );
}

export function Row({ title, items, onPick }: { title: string; items: any[]; onPick: (it: any) => void }) {
  if (!items?.length) return null;
  return (
    <section className="mt-5">
      <h2 className="font-display text-xl md:text-2xl mb-2">{title}</h2>
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
        {items.map((it) => (
          <Card key={`${it.kind}-${it.id}`} item={it} onClick={() => onPick(it)} />
        ))}
      </div>
    </section>
  );
}

export function RowSkeleton({ title }: { title: string }) {
  return (
    <section className="mt-5">
      <h2 className="font-display text-xl mb-2">{title}</h2>
      <div className="flex gap-3 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="w-28 md:w-36 shrink-0">
            <div className="skeleton aspect-[2/3]" />
            <div className="skeleton h-3 mt-2" />
          </div>
        ))}
      </div>
    </section>
  );
}
