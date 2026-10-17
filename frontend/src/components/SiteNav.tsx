import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const IG_URL = "https://instagram.com/ig__marcus";

// Header credit: alternates every 5s between "Developed by Marcus" and the
// Instagram badge. Click opens the profile in a new tab. Visibility is
// controlled by the caller; `center` centers the content (mobile strip).
export function CreditToggle({
  className = "",
  center = false,
}: {
  className?: string;
  center?: boolean;
}) {
  const [ig, setIg] = useState(false);
  useEffect(() => {
    const t = setInterval(() => setIg((v) => !v), 5000);
    return () => clearInterval(t);
  }, []);
  return (
    <a
      href={IG_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative block h-6 w-40 overflow-hidden ${className}`}
      aria-label="Developer Instagram"
    >
      <span
        key={ig ? "ig" : "dev"}
        className={`credit-flip absolute inset-0 flex items-center gap-1.5 text-xs font-bold tracking-wide ${
          center ? "justify-center" : "justify-end"
        }`}
      >
        {ig ? (
          <>
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="url(#iggrad)" strokeWidth="2">
              <defs>
                <linearGradient id="iggrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#feda75" />
                  <stop offset="50%" stopColor="#d62976" />
                  <stop offset="100%" stopColor="#962fbf" />
                </linearGradient>
              </defs>
              <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
              <circle cx="12" cy="12" r="4.2" />
              <circle cx="17.4" cy="6.6" r="1.3" fill="url(#iggrad)" stroke="none" />
            </svg>
            <span className="bg-gradient-to-r from-[#feda75] via-[#d62976] to-[#962fbf] bg-clip-text text-transparent">ig__marcus</span>
          </>
        ) : (
          <span className="bg-gradient-to-r from-red-500 via-netflix to-amber-400 bg-clip-text text-transparent">
            Developed by Marcus
          </span>
        )}
      </span>
    </a>
  );
}

const LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/category/movies", label: "Movies" },
  { to: "/category/series", label: "Series" },
  { to: "/?tab=anime", label: "Anime", anime: true },
  { to: "/free-movies", label: "Free Movies" },
  { to: "/upcoming", label: "Upcoming", prefix: true },
  { to: "/search", label: "Search" },
  { to: "/status", label: "Status" },
];

// Website navbar: sticky, wordmark left, section links right. The link row
// scrolls horizontally on phones instead of hiding behind a hamburger, so
// every section stays one tap away.
export default function SiteNav() {
  const loc = useLocation();
  const isAnime = loc.pathname === "/" && new URLSearchParams(loc.search).get("tab") === "anime";
  const isMoviesHome = loc.pathname === "/" && !isAnime;

  return (
    <header className="site-nav sticky top-0 z-40 border-b border-white/10 bg-black/85 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-4">
        <Link to="/" className="shrink-0" aria-label="Marcivo home">
          <span className="font-display brand-loop text-3xl tracking-[0.18em]">MARCIVO</span>
        </Link>

        <nav className="flex-1 min-w-0 overflow-x-auto no-scrollbar">
          <ul className="flex items-center gap-1 text-sm font-semibold">
            {LINKS.map((l) => {
              const active = l.anime
                ? isAnime
                : l.to === "/"
                  ? isMoviesHome
                  : "prefix" in l && l.prefix
                    ? loc.pathname.startsWith(l.to)
                    : loc.pathname === l.to;
              return (
                <li key={l.label}>
                  <NavLink
                    to={l.to}
                    className={`block px-3 py-2 rounded-lg whitespace-nowrap transition-colors ${
                      active ? "text-white bg-white/10" : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >{l.label}</NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <CreditToggle className="hidden lg:block" />
      </div>

      {/* Mobile credit strip — the same alternating "Developed by Marcus" /
          Instagram badge, visible on phones where the top row has no room. */}
      <div className="lg:hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 h-7 flex items-center justify-center">
          <CreditToggle center />
        </div>
      </div>
    </header>
  );
}
