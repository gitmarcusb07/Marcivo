import { useCallback, useEffect, useRef, useState } from "react";

export interface HeroItem {
  id: string;
  kind: string;
  title: string;
  backdrop: string;
  poster: string;
  year: string;
  rating: number | null;
  genres: string[];
}

function TitleSplit({ title }: { title: string }) {
  const words = title.split(" ").filter(Boolean);
  const last = words.length > 1 ? words.pop()! : "";
  return (
    <span>
      {words.join(" ").toUpperCase()}
      {last && (
        <span className="text-netflix"> {last.toUpperCase()}</span>
      )}
    </span>
  );
}

export default function TrendingHero({ items, onWatch }: { items: HeroItem[]; onWatch: (it: HeroItem) => void }) {
  const [idx, setIdx] = useState(0);
  const timer = useRef<any>(null);
  const n = items.length;

  const go = useCallback((d: number) => {
    setIdx((i) => (i + d + n) % n);
  }, [n]);

  // 4s auto-rotate, loop; any manual nav restarts the clock.
  useEffect(() => {
    if (n < 2) return;
    clearInterval(timer.current);
    timer.current = setInterval(() => setIdx((i) => (i + 1) % n), 4000);
    return () => clearInterval(timer.current);
  }, [n, idx]);

  if (!n) return null;
  const it = items[idx];
  // w780 backdrop is plenty on phones (w1280 is ~3x the bytes on slow data).
  const bg = String(it.backdrop || "").replace("/w1280/", "/w780/");
  const fg = (it as any).thumb || it.poster;

  return (
    <div>
      <div className="relative rounded-2xl overflow-hidden border border-netflix/40 bg-card">
        {bg ? (
          <img key={it.id} src={bg} alt="" loading="eager" decoding="async" className="absolute inset-0 w-full h-full object-cover object-top" />
        ) : fg ? (
          <img key={it.id} src={fg} alt="" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        <button
          aria-label="Previous"
          onClick={() => go(-1)}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full border border-netflix/70 bg-black/50 text-white text-lg leading-none"
        >‹</button>
        <button
          aria-label="Next"
          onClick={() => go(1)}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full border border-netflix/70 bg-black/50 text-white text-lg leading-none"
        >›</button>

        <div className="relative z-[5] p-4 pt-8 pb-5 max-w-[75%]">
          <div className="text-[11px] tracking-[0.3em] text-gray-300">TRENDING THIS WEEK</div>
          <h2 className="font-display text-4xl leading-[0.95] mt-1">
            <TitleSplit title={it.title} />
          </h2>
          <div className="text-sm text-gray-300 mt-2">
            {[it.year, it.rating ? `${it.rating}` : "", ...(it.genres || [])].filter(Boolean).join("  •  ")}
          </div>
          <button
            onClick={() => onWatch(it)}
            className="mt-3 px-6 py-2.5 rounded-full bg-netflix font-bold flex items-center gap-2"
          >▶ Watch Now</button>
        </div>
      </div>
      <div className="flex justify-center gap-2 mt-2">
        {items.slice(0, 10).map((_, i) => (
          <button
            key={i}
            aria-label={`Slide ${i + 1}`}
            onClick={() => setIdx(i)}
            className={`h-2 rounded-full transition-all ${i === idx ? "w-5 bg-netflix" : "w-2 bg-white/25"}`}
          />
        ))}
      </div>
    </div>
  );
}
