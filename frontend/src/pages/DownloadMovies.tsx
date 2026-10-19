import { Link } from "react-router-dom";
import { SearchBar } from "../components/ui";
import AdBand from "../ads/AdBand";
import Seo, { breadcrumbLd, faqLd } from "../seo/Seo";

const Y = new Date().getFullYear();

const TITLE = "Download Movies & Web Series — Every Available Version | Marcivo";
const DESCRIPTION =
  "Looking for movies to download? Marcivo finds every available version of a title — compare quality, audio and size, then save or stream it in your browser. Free, no account needed.";

const STEPS = [
  { h: "Search the title", p: "Type any movie, web series or anime into the search bar — results carry posters and years so you land on the right title, not a remake." },
  { h: "Compare the versions", p: "Every title page lists the versions that actually exist: 480p, 720p, 1080p and 2160p where available, each with audio tracks and file size noted." },
  { h: "Save or stream", p: "Pick a version. Direct video files open in the player — use your browser's save option to keep them, or just press play and stream." },
];

const FACTS = [
  { h: "Quality", p: "Typically 480p, 720p and 1080p — big releases add 2160p. Every version shows its quality before you open it." },
  { h: "Audio", p: "Original and dubbed tracks where the source carries them (e.g. Hindi dual-audio), noted next to each version." },
  { h: "Size", p: "File sizes are listed per version, so you know what a download costs before it starts." },
];

const FAQ = [
  {
    q: "Can I download movies for free on Marcivo?",
    a: "Marcivo is free to use — it finds the versions that exist on indexed sources. Many of those are direct video files you can save from your browser; versions that stream only play in the built-in player instead.",
  },
  {
    q: "What quality can I download in?",
    a: "Whatever the sources carry — usually 480p, 720p and 1080p, with 2160p for recent blockbusters. Each version shows quality, audio and size up front, so you can pick the right one.",
  },
  {
    q: "Do downloads work on mobile?",
    a: "Yes — the site runs in mobile browsers, and saved videos land wherever your browser stores downloads. For very large files, a desktop browser is usually smoother.",
  },
  {
    q: "Why does a title show no versions?",
    a: "That means no indexed source carries a copy yet — common for just-announced titles. The upcoming pages track releases so you can check back the week they land.",
  },
  {
    q: "Is downloading legal?",
    a: "Marcivo doesn't host any files; it links to media indexed from third-party sources. What you may download depends on your local law — check the rules where you live.",
  },
];

const jsonLd = [
  breadcrumbLd([
    { name: "Home", path: "/" },
    { name: "Download Movies", path: "/download-movies" },
  ]),
  faqLd(FAQ),
];

export default function DownloadMovies() {
  return (
    <div className="max-w-4xl mx-auto px-4 pb-16">
      <Seo title={TITLE} description={DESCRIPTION} path="/download-movies" jsonLd={jsonLd} />
      <SearchBar placeholder="Search movies, series..." />

      <h1 className="font-display text-3xl md:text-4xl mt-5">Download Movies and Web Series Online</h1>
      <p className="text-sm text-muted mt-1">Every available version • Quality &amp; size up front • Free, no account • Updated for {Y}</p>

      <p className="text-gray-200 mt-4 max-w-3xl">
        Looking for a movie to download? The hard part isn't playing it — it's finding a version that actually works.
        Marcivo solves that: search any title and its page lines up every version that exists right now, with quality,
        audio and file size. Pick one and it opens in the player — direct video files can be saved from your browser,
        everything else streams instantly. No account, no install, nothing to download first.
      </p>

      <h2 className="font-display text-2xl mt-8">How to download a movie on Marcivo</h2>
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

      <h2 className="font-display text-2xl mt-8">What every version shows you</h2>
      <div className="grid gap-3 sm:grid-cols-3 mt-3">
        {FACTS.map((f) => (
          <div key={f.h} className="bg-card border border-white/10 rounded-xl p-4">
            <div className="font-bold text-sm">{f.h}</div>
            <p className="text-xs text-gray-300 mt-1">{f.p}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 bg-card border border-netflix/40 rounded-xl p-4 text-sm text-gray-200">
        <span className="font-bold text-netflix">Heads-up:</span> Marcivo doesn't host files — it links to media indexed
        from third-party sources. If a version stops working, open the title again: the list refreshes, so another
        version usually plays.
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

      <h2 className="font-display text-2xl mt-8">Start looking</h2>
      <div className="flex flex-wrap gap-2 mt-3">
        <Link to="/free-movies" className="px-5 py-2.5 rounded-full bg-netflix font-bold text-sm">Free movies &amp; shows</Link>
        <Link to="/category/movies" className="px-5 py-2.5 rounded-full bg-card border border-white/10 font-semibold text-sm hover:border-white/30">Browse movies</Link>
        <Link to="/category/series" className="px-5 py-2.5 rounded-full bg-card border border-white/10 font-semibold text-sm hover:border-white/30">Browse web series</Link>
        <Link to="/watch-free" className="px-5 py-2.5 rounded-full bg-card border border-white/10 font-semibold text-sm hover:border-white/30">How to watch free</Link>
        <Link to="/upcoming" className="px-5 py-2.5 rounded-full bg-card border border-white/10 font-semibold text-sm hover:border-white/30">Coming soon</Link>
      </div>

      {/* Full ad set — this page must carry the same units as the others. */}
      <AdBand slots={["home_mid", "search_mid", "search_sidebar", "home_tall", "status_banner", "home_native"]} className="mt-8" />

      <p className="text-xs text-muted mt-8">
        Marcivo does not host any files — it links to media indexed from third-party sources. Availability and legality
        vary by region; always respect the rights of content owners.
      </p>
    </div>
  );
}
