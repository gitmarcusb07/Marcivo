import { Link } from "react-router-dom";
import { SearchBar } from "../components/ui";
import Seo, { breadcrumbLd, faqLd } from "../seo/Seo";

const Y = new Date().getFullYear();

const TITLE = `How to Watch Movies Online Free — ${Y} Guide | Marcivo`;
const DESCRIPTION = "How to watch movies online free: where free streaming actually comes from, how to avoid dead links, and how Marcivo lines up every available version of a title so you can press play in one search.";

const SOURCES = [
  {
    h: "Ad-supported streamers",
    p: "Services like Tubi, Pluto TV or Plex run full catalogues for free in supported regions — you pay with ad breaks instead of a subscription.",
  },
  {
    h: "Free trials & rotating catalogues",
    p: "Big platforms (Prime Video, Disney+, Apple TV+) cycle free trials and rotate titles in and out of their free tiers. Great when you're chasing one specific movie.",
  },
  {
    h: "Libraries & public-domain archives",
    p: "Many libraries lend streaming access with just a card, and archives like the Internet Archive host thousands of public-domain films outright.",
  },
  {
    h: "Indexed sources",
    p: "That's what Marcivo searches. Each title you open is checked across public media indexes — every version they list, with quality and audio details, appears on its page.",
  },
];

const STEPS = [
  {
    h: "Search the title",
    p: "Type any movie, web series or anime into the search bar — the live suggestions cover the whole catalogue, so partial names work fine.",
  },
  {
    h: "Compare the versions",
    p: "Each title page lists the versions that exist right now: 480p, 720p, 1080p, 2160p, dual audio, subtitles — whatever that title actually offers.",
  },
  {
    h: "Press play",
    p: "Pick a version and the player opens right here in your browser. No account, no install, no app — it works on phones and desktop alike.",
  },
];

const TIPS = [
  "Go for the 1080p+ badges when your connection is good — drop to 480p if data is tight.",
  "If one version stalls, hit back and pick another. Popular titles usually have several independent sources.",
  "Series pages have per-episode buttons (S1E3 style) so you can jump straight to where you left off.",
  "Keep your browser updated for the smoothest playback on mobile.",
];

const FAQ = [
  {
    q: "Is Marcivo free to use?",
    a: "Yes. Marcivo is free and needs no account. The site is supported by advertising, and every catalogue, search and title page is open to everyone.",
  },
  {
    q: "How does Marcivo find versions of a movie?",
    a: "When you open a title, Marcivo checks public media indexes for that exact film or show — matching title, year and type — and lists every version they carry, without hosting any files itself.",
  },
  {
    q: "Why does a page say no versions found?",
    a: "If none of the indexed sources list the title yet — common for very new or unreleased movies — the page shows release information only. Check the Upcoming pages to see what's on the way and come back after release.",
  },
  {
    q: "Can I watch on my phone?",
    a: "Yes. Marcivo is a website, not an app: it runs in any modern mobile browser, and the player adjusts to your screen. No download or sign-up required.",
  },
  {
    q: "What video quality can I expect?",
    a: "It depends on what each source offers for that title. Quality badges on every version range from 480p up to 2160p (4K), so you can pick the best one your connection handles.",
  },
];

const jsonLd = [
  breadcrumbLd([
    { name: "Home", path: "/" },
    { name: "How to Watch Movies Online Free", path: "/watch-free" },
  ]),
  faqLd(FAQ),
];

export default function WatchFree() {
  return (
    <div className="max-w-4xl mx-auto px-4 pb-16">
      <Seo
        title={TITLE}
        description={DESCRIPTION}
        path="/watch-free"
        jsonLd={jsonLd}
      />
      <SearchBar placeholder="Search movies, series..." />

      <h1 className="font-display text-3xl md:text-4xl mt-5">How to Watch Movies Online Free</h1>
      <p className="text-sm text-muted mt-1">Free to use • No account needed • Updated for {Y}</p>

      <p className="text-gray-200 mt-4 max-w-3xl">
        Everyone wants the same thing: to press play without digging through a dozen pages first. This guide walks
        through how people watch movies and shows online free — the realistic options, the catches to watch out for —
        and how Marcivo fits in: one search that lines up every available version of a title, so you can pick one and
        play.
      </p>

      <h2 className="font-display text-2xl mt-8">Where free movies actually come from</h2>
      <div className="grid gap-3 sm:grid-cols-2 mt-3">
        {SOURCES.map((s) => (
          <div key={s.h} className="bg-card border border-white/10 rounded-xl p-4">
            <div className="font-bold text-sm">{s.h}</div>
            <p className="text-sm text-gray-300 mt-1">{s.p}</p>
          </div>
        ))}
      </div>

      <h2 className="font-display text-2xl mt-8">How to watch free on Marcivo — three steps</h2>
      <ol className="grid gap-3 mt-3">
        {STEPS.map((s, i) => (
          <li key={s.h} className="bg-card border border-white/10 rounded-xl p-4 flex gap-4">
            <span className="shrink-0 w-8 h-8 rounded-full bg-netflix font-black grid place-items-center">{i + 1}</span>
            <div>
              <div className="font-bold text-sm">{s.h}</div>
              <p className="text-sm text-gray-300 mt-1">{s.p}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-5 bg-card border border-netflix/40 rounded-xl p-4 text-sm text-gray-200">
        <span className="font-bold text-netflix">Heads-up:</span> availability varies by title and region. If a movie was
        just announced or no indexed source carries it yet, its page will say no versions found — that's expected, not
        broken. Our{" "}
        <Link to="/upcoming" className="underline hover:text-white">Upcoming pages</Link>{" "}
        track what's on the way so you know when to check back.
      </div>

      <h2 className="font-display text-2xl mt-8">Tips for a clean playback</h2>
      <ul className="grid gap-2 mt-3 text-sm text-gray-300">
        {TIPS.map((t) => (
          <li key={t} className="flex gap-2"><span className="text-netflix">▸</span><span>{t}</span></li>
        ))}
      </ul>

      <h2 className="font-display text-2xl mt-8">Start watching</h2>
      <div className="flex flex-wrap gap-2 mt-3">
        <Link to="/free-movies" className="px-5 py-2.5 rounded-full bg-netflix font-bold text-sm">Free movies & shows</Link>
        <Link to="/category/movies" className="px-5 py-2.5 rounded-full bg-card border border-white/10 font-semibold text-sm hover:border-white/30">Browse movies</Link>
        <Link to="/category/series" className="px-5 py-2.5 rounded-full bg-card border border-white/10 font-semibold text-sm hover:border-white/30">Browse web series</Link>
        <Link to="/?tab=anime" className="px-5 py-2.5 rounded-full bg-card border border-white/10 font-semibold text-sm hover:border-white/30">Browse anime</Link>
        <Link to="/upcoming" className="px-5 py-2.5 rounded-full bg-card border border-white/10 font-semibold text-sm hover:border-white/30">Coming soon</Link>
      </div>

      <h2 className="font-display text-2xl mt-8">Frequently asked questions</h2>
      <div className="grid gap-2 mt-3">
        {FAQ.map((f) => (
          <details key={f.q} className="bg-card border border-white/10 rounded-xl px-4 py-3">
            <summary className="font-semibold text-sm cursor-pointer">{f.q}</summary>
            <p className="text-sm text-gray-300 mt-2">{f.a}</p>
          </details>
        ))}
      </div>

      <p className="text-xs text-muted mt-8">
        Marcivo does not host any files — it links to media indexed from third-party sources. Availability and legality
        vary by region; always respect the rights of content owners.
      </p>
    </div>
  );
}
