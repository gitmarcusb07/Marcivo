import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../lib/api";
import { SearchBar, Row } from "../components/ui";
import AdSlot from "../ads/AdSlot";
import AdBand from "../ads/AdBand";
import Seo, { breadcrumbLd, faqLd } from "../seo/Seo";

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

const SEO: Record<string, { title: string; description: string; blurb: string; intro: string; faq: { q: string; a: string }[] }> = {
  movies: {
    title: "Movies — Watch Movies Online Free | Marcivo",
    description: "Browse movies on Marcivo — popular films, top rated picks, now playing and coming soon. Every title lines up its available versions so you can press play.",
    blurb: "Popular, top rated, now playing and coming soon — open any title to see every version available right now.",
    intro: "The movie hub shows what everyone is watching: this week's popular films, the top rated classics, what's in theatres now and what's landing soon. Open any movie and its page lines up the versions that exist at this moment — 480p to 2160p, each with audio tracks and file size. No account, no app: search by name or browse the rows below, and the player opens in your browser.",
    faq: [
      { q: "Can I watch movies online free on Marcivo?", a: "Yes — Marcivo is free and needs no account. It finds every available version of a movie on indexed sources; you pick one and press play in your browser." },
      { q: "How often are new movies added?", a: "The rows refresh daily from TMDB (popular, top rated, now playing, coming soon), and each movie page updates the moment a source carries a version of it." },
      { q: "Why do some movies have more versions than others?", a: "Blockbusters get released by more sources in more qualities. Each page lists only the versions that actually exist — no placeholders." },
      { q: "Can I download a movie instead of streaming?", a: "Often, yes — many versions are direct video files you can save from your browser. The download guide walks through it step by step." },
    ],
  },
  series: {
    title: "Web Series — Watch TV Series Online Free | Marcivo",
    description: "Watch web series and TV shows online — popular series, top rated shows and what's airing now, each with its available versions lined up.",
    blurb: "Popular and top rated web series, plus what's airing right now.",
    intro: "Every show that matters, in one place: what's popular, what's top rated, what's airing today and what's currently running. Open a series to get its seasons and episodes (powered by TMDB), then pick any episode and see the versions available for it — quality and audio included. Free, no account, works on mobile.",
    faq: [
      { q: "Can I watch TV series online free on Marcivo?", a: "Yes — free to use, no account needed. Pick a show, choose the season and episode, and press play in your browser." },
      { q: "Do episodes work like movies?", a: "Exactly — each episode has its own versions list with quality and audio details, so you can switch versions without losing your place in the story." },
      { q: "Will I lose my progress?", a: "Marcivo remembers the shows you were watching (stored in your browser) and offers a quick way back into the next episode." },
      { q: "Can I download episodes?", a: "Many episode versions are direct video files you can save from your browser — the download guide covers the details." },
    ],
  },
  hollywood: {
    title: "Hollywood Movies & Series — Watch Online | Marcivo",
    description: "Hollywood movies and series in English — browse what's available now, with every version of each title lined up on its page.",
    blurb: "English-language movies and series — what's available right now.",
    intro: "Hollywood, end to end: this year's biggest English-language releases, the series everyone is talking about, and the classics that keep their place. Every title opens into a page with its full version list — quality, audio and size included — so you can go straight from \"what should I watch\" to pressing play. Free, no account, works on mobile.",
    faq: [
      { q: "How do I watch Hollywood movies online free?", a: "Browse the rows below or search a title by name — open its page, pick one of the available versions and press play. No sign-up involved." },
      { q: "Do Hollywood shows include all seasons?", a: "Series pages list every season available on TMDB, with each episode opening into its own versions list." },
      { q: "Are these in English?", a: "This hub focuses on English-original titles. Hindi-dubbed versions of many international hits live in the Bollywood hub." },
      { q: "Can I download instead of streaming?", a: "Often — many versions are direct files you can save. The download guide walks through it." },
    ],
  },
  bollywood: {
    title: "Bollywood & Hindi Movies — Watch Online | Marcivo",
    description: "Bollywood and Hindi movies and series — browse what's available now, with every version of each title lined up on its page.",
    blurb: "Hindi-language movies and series — what's available right now.",
    intro: "Bollywood and Hindi cinema, all in one hub — the latest releases, the biggest hits and the timeless ones, plus Hindi-dubbed versions of international titles where sources carry them. Open any movie and every available version is lined up with quality, audio and size, from 480p up to 2160p. Search by name or browse the rows, then press play — free, no account.",
    faq: [
      { q: "How do I watch Bollywood movies online free?", a: "Search any film or browse the rows below — open the title, choose a version (480p–2160p) and play it in your browser. No account needed." },
      { q: "Are Hindi dubbed versions available?", a: "Many international titles carry Hindi dual-audio versions — the language is noted on each version button when the source provides it." },
      { q: "Do new releases appear quickly?", a: "The hub pulls the latest Hindi-origin releases from TMDB daily, and pages light up with versions as soon as a source carries them." },
      { q: "Can I download a Hindi movie?", a: "Many versions are direct video files — open a title, pick the version and save it from your browser. More in the download guide." },
    ],
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
        jsonLd={[
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: TITLES[cat] || cat, path: `/category/${cat}` },
          ]),
          ...(SEO[cat]?.faq ? [faqLd(SEO[cat].faq)] : []),
        ]}
      />
      <SearchBar placeholder="Search movies, series..." />
      <div className="flex items-center gap-3 mt-4 mb-1">
        <button onClick={() => nav(-1)} className="text-muted">←</button>
        <h1 className="font-display text-3xl">{TITLES[cat] || cat}</h1>
      </div>
      {SEO[cat]?.blurb && <p className="text-sm text-muted">{SEO[cat].blurb}</p>}
      {SEO[cat]?.intro && <p className="text-sm text-gray-300 mt-2 max-w-3xl">{SEO[cat].intro}</p>}
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
        <Row key={row.title} title={row.title} items={row.items} onPick={(it: any) => nav(`/detail/${it.kind}/${it.id}`, { state: { cat } })} />
      ))}

      {SEO[cat]?.faq && (
        <>
          <h2 className="font-display text-2xl mt-8">Frequently asked questions</h2>
          <div className="grid gap-2 mt-3">
            {SEO[cat].faq.map((f) => (
              <details key={f.q} className="bg-card border border-white/10 rounded-xl px-4 py-3">
                <summary className="font-semibold text-sm cursor-pointer">{f.q}</summary>
                <p className="text-sm text-gray-300 mt-2">{f.a}</p>
              </details>
            ))}
          </div>
        </>
      )}

      <h2 className="font-display text-2xl mt-8">Keep exploring</h2>
      <div className="flex flex-wrap gap-2 mt-3">
        <Link to="/free-movies" className="px-5 py-2.5 rounded-full bg-card border border-white/10 font-semibold text-sm hover:border-white/30">Free movies &amp; shows</Link>
        <Link to="/download-movies" className="px-5 py-2.5 rounded-full bg-card border border-white/10 font-semibold text-sm hover:border-white/30">Download movies &amp; series</Link>
        <Link to="/watch-free" className="px-5 py-2.5 rounded-full bg-card border border-white/10 font-semibold text-sm hover:border-white/30">How to watch free</Link>
        <Link to="/upcoming" className="px-5 py-2.5 rounded-full bg-card border border-white/10 font-semibold text-sm hover:border-white/30">Upcoming releases</Link>
      </div>

      {/* Remaining units — this page must carry the full ad set. */}
      <AdBand slots={["search_mid", "search_sidebar", "home_tall", "status_banner", "home_native"]} className="mt-8" />
    </div>
  );
}
