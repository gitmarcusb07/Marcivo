import { Link } from "react-router-dom";
import Seo from "../seo/Seo";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/free-movies", label: "Free movies & shows" },
  { to: "/category/movies", label: "Movies" },
  { to: "/category/series", label: "Web Series" },
  { to: "/?tab=anime", label: "Anime" },
  { to: "/upcoming", label: "Upcoming" },
  { to: "/search", label: "Search" },
];

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 pb-16 text-center">
      <Seo
        title="Page not found — Marcivo"
        description="This page doesn't exist. Browse movies, web series and anime on Marcivo instead."
        robots="noindex,follow"
      />
      <h1 className="font-display text-5xl mt-10">404</h1>
      <p className="text-gray-300 mt-3">
        That page doesn't exist — it may have moved, or the link was mistyped. The catalogue is still one tap away:
      </p>
      <div className="flex flex-wrap gap-2 justify-center mt-5">
        {LINKS.map((l) => (
          <Link key={l.to + l.label} to={l.to} className="px-5 py-2.5 rounded-full bg-card border border-white/10 font-semibold text-sm hover:border-white/30">
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
