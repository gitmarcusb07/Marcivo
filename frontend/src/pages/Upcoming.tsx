import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import { SearchBar } from "../components/ui";
import AdBand from "../ads/AdBand";
import Seo, { SITE_URL, breadcrumbLd, faqLd } from "../seo/Seo";

const Y = new Date().getFullYear();

export type UpcomingSection = "movies" | "shows" | "anime";

const META: Record<UpcomingSection, {
  type: string;
  fallbackKind: string;
  path: string;
  h1: string;
  title: string;
  description: string;
  intro: string;
  faq: { q: string; a: string }[];
}> = {
  movies: {
    type: "movie",
    fallbackKind: "movie",
    path: "/upcoming",
    h1: `Upcoming Movies ${Y}`,
    title: `Upcoming Movies ${Y} — Release Dates & Where to Watch | Marcivo`,
    description: `The most anticipated upcoming movies of ${Y} and beyond — release dates for every film on the way, and where to watch each one the day it lands.`,
    intro: `Everything on the way to the big screen and streaming: upcoming movies with release dates as they stand today. The moment a film lands, its Marcivo page lines up every available version — open it from this list and press play.`,
    faq: [
      {
        q: "When do upcoming movies become watchable on Marcivo?",
        a: "As soon as a movie is out and any indexed source lists it, its title page shows playable versions with quality and audio details. Until then the page shows release information only.",
      },
      {
        q: "Where can I watch a movie when it releases?",
        a: "Open the film from this list — its page has every version that exists at that moment, from 480p up to 2160p. No account needed.",
      },
      {
        q: "Do release dates change?",
        a: "Often. Studios move dates for marketing and production reasons, so treat this list as a guide and double-check the title's own page closer to release.",
      },
    ],
  },
  shows: {
    type: "tv",
    fallbackKind: "tv",
    path: "/upcoming/shows",
    h1: `Upcoming Web Series & TV Shows ${Y}`,
    title: `Upcoming Web Series & TV Shows ${Y} — Release Dates | Marcivo`,
    description: `New and upcoming web series and TV shows — premiere dates for the biggest ${Y} releases, and where to watch them the moment the first episode drops.`,
    intro: `New seasons, fresh premieres and brand-new shows still on the way: the web series and TV shows worth marking on your calendar, with dates as they stand today. When an episode airs, its Marcivo page lists the versions that are up.`,
    faq: [
      {
        q: "When do new episodes appear?",
        a: "Series pages list available episodes (S1E3 style) as soon as sources carry them — usually within hours of an episode airing, sometimes the same day.",
      },
      {
        q: "Can I follow a show before it premieres?",
        a: "Yes — open the show from this list and add it to My List on its page, then come back after the premiere to grab the first episode.",
      },
      {
        q: "Which shows are airing right now?",
        a: "Our Web Series category tracks what's currently available, and the home page shows what's popular this week across movies and series.",
      },
    ],
  },
  anime: {
    type: "anime",
    fallbackKind: "anime",
    path: "/upcoming/anime",
    h1: `Upcoming Anime ${Y}`,
    title: `Upcoming Anime ${Y} — Release Schedule & Where to Watch | Marcivo`,
    description: `Upcoming anime of ${Y} — the season's most anticipated new series and movies with release dates, and where to watch them the moment they air.`,
    intro: `The most anticipated new anime on the way — seasonal TV series and films, ranked by the community's excitement, with dates and seasons as announced. When an episode airs, its Marcivo page lines up the versions that are up.`,
    faq: [
      {
        q: "When do new anime episodes air on Marcivo?",
        a: "Episode links appear on the title's page as soon as sources carry them — often the same day an episode airs in Japan, sub first, with dubs following weeks later.",
      },
      {
        q: "Sub or dub — what's available?",
        a: "Whatever each source offers for that title. Audio and quality badges on every version show exactly what you're getting before you press play.",
      },
      {
        q: "Where can I watch anime that's airing now?",
        a: "The anime home (Top Anime and Seasonal rows) covers what's available immediately — use the Anime tab at the top of the home page.",
      },
    ],
  },
};

const CHIPS: { to: string; label: string }[] = [
  { to: "/free-movies", label: "Free movies & shows" },
  { to: "/watch-free", label: "How to watch free" },
  { to: "/upcoming", label: "Upcoming movies" },
  { to: "/upcoming/shows", label: "Upcoming series" },
  { to: "/upcoming/anime", label: "Upcoming anime" },
];

function dateLabel(it: any): string {
  if (it.date) {
    try {
      return new Date(`${it.date}T00:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    } catch { /* fall through */ }
  }
  return it.seasonLabel || it.year || "Date TBA";
}

export default function Upcoming({ section }: { section: UpcomingSection }) {
  const meta = META[section];
  const nav = useNavigate();
  const [items, setItems] = useState<any[] | null>(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    let alive = true;
    setItems(null);
    setErr("");
    api.upcoming(meta.type)
      .then((r) => { if (alive) setItems(Array.isArray(r?.items) ? r.items : []); })
      .catch((e) => { if (alive) { setItems([]); setErr(String(e?.message || e)); } });
    return () => { alive = false; };
  }, [meta.type]);

  const list = items || [];
  const ld = [
    breadcrumbLd([
      { name: "Home", path: "/" },
      { name: "Upcoming", path: "/upcoming" },
      ...(meta.path !== "/upcoming" ? [{ name: meta.h1, path: meta.path }] : []),
    ]),
    faqLd(meta.faq),
    ...(list.length
      ? [{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: meta.h1,
          itemListElement: list.slice(0, 20).map((it: any, i: number) => ({
            "@type": "ListItem",
            position: i + 1,
            name: it.title,
            url: `${SITE_URL}/detail/${it.kind || meta.fallbackKind}/${it.id}`,
          })),
        }]
      : []),
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 pb-16">
      <Seo title={meta.title} description={meta.description} path={meta.path} jsonLd={ld} />
      <SearchBar placeholder="Search movies, series..." />

      <h1 className="font-display text-3xl md:text-4xl mt-5">{meta.h1}</h1>
      <p className="text-gray-200 mt-3 max-w-3xl text-sm md:text-base">{meta.intro}</p>

      <div className="flex flex-wrap gap-2 mt-4">
        {CHIPS.filter((c) => c.to !== meta.path).map((c) => (
          <Link key={c.to} to={c.to} className="px-4 py-2 rounded-full bg-card border border-white/10 text-xs font-semibold hover:border-white/30">
            {c.label}
          </Link>
        ))}
      </div>

      {!items && !err && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mt-6">
          {Array.from({ length: 12 }).map((_, i) => <div key={i} className="skeleton aspect-[2/3]" />)}
        </div>
      )}

      {err && !items?.length && (
        <div className="mt-6 bg-card border border-netflix/50 rounded-xl p-4">
          <p className="text-red-400 text-sm">⚠️ Couldn't load the release list right now — the backend may be waking up.</p>
          <button onClick={() => window.location.reload()} className="mt-3 px-5 py-2 rounded-lg bg-netflix font-bold text-sm">↻ Retry</button>
        </div>
      )}

      {!!list.length && (
        <div data-upcoming-grid className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mt-6">
          {list.map((it: any) => (
            <button
              key={`${it.kind || meta.fallbackKind}-${it.id}`}
              onClick={() => nav(`/detail/${it.kind || meta.fallbackKind}/${it.id}`)}
              className="w-full text-left group"
            >
              <div className="aspect-[2/3] rounded-xl overflow-hidden bg-card border border-white/10 group-hover:border-white/30">
                {(it.thumb || it.poster) && (
                  <img
                    src={it.thumb || it.poster}
                    alt={it.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="mt-1.5 text-sm font-semibold truncate">{it.title}</div>
              <div className="text-xs font-bold text-netflix">{dateLabel(it)}</div>
            </button>
          ))}
        </div>
      )}

      <div className="mt-8 bg-card border border-netflix/40 rounded-xl p-4 text-sm text-gray-200">
        <span className="font-bold text-netflix">When it drops, watch it here:</span> open any title above the moment it
        releases — its page lines up every available version, and you press play in the browser. New to Marcivo? Read
        the{" "}
        <Link to="/watch-free" className="underline hover:text-white">free watching guide</Link>.
      </div>

      {/* Full ad set on this page too. */}
      <AdBand slots={["home_mid", "search_mid", "search_sidebar", "home_tall", "status_banner", "home_native"]} className="mt-8" />

      <h2 className="font-display text-2xl mt-8">
        {section === "movies" ? "Upcoming movies — FAQ" : section === "shows" ? "Upcoming shows — FAQ" : "Upcoming anime — FAQ"}
      </h2>
      <div className="grid gap-2 mt-3">
        {meta.faq.map((f) => (
          <details key={f.q} className="bg-card border border-white/10 rounded-xl px-4 py-3">
            <summary className="font-semibold text-sm cursor-pointer">{f.q}</summary>
            <p className="text-sm text-gray-300 mt-2">{f.a}</p>
          </details>
        ))}
      </div>

      <p className="text-xs text-muted mt-8">
        Release dates come from public movie and anime databases and can change — always double-check on the title's
        page. Marcivo does not host any files.
      </p>
    </div>
  );
}
