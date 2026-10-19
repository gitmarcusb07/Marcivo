import { Link } from "react-router-dom";
import { CreditToggle } from "./SiteNav";

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4 items-start">
        <div>
          <div className="font-display brand-loop text-2xl tracking-[0.18em]">MARCIVO</div>
          <p className="text-xs text-muted mt-2 max-w-xs">
            Movies, web series and anime in one place. Browse the catalogue, pick a version, press play.
          </p>
        </div>

        <nav className="text-sm">
          <div className="text-xs uppercase tracking-[0.2em] text-muted mb-2">Browse</div>
          <ul className="grid gap-1.5 text-gray-300">
            <li><Link to="/category/movies" className="hover:text-white">Movies</Link></li>
            <li><Link to="/category/series" className="hover:text-white">Web Series</Link></li>
            <li><Link to="/category/hollywood" className="hover:text-white">Hollywood</Link></li>
            <li><Link to="/category/bollywood" className="hover:text-white">Bollywood</Link></li>
            <li><Link to="/?tab=anime" className="hover:text-white">Anime</Link></li>
          </ul>
        </nav>

        <nav className="text-sm">
          <div className="text-xs uppercase tracking-[0.2em] text-muted mb-2">Free &amp; Guides</div>
          <ul className="grid gap-1.5 text-gray-300">
            <li><Link to="/watch-free" className="hover:text-white">How to Watch Free</Link></li>
            <li><Link to="/free-movies" className="hover:text-white">Free Movies &amp; Shows</Link></li>
            <li><Link to="/download-movies" className="hover:text-white">Download Movies</Link></li>
            <li><Link to="/upcoming" className="hover:text-white">Upcoming Movies</Link></li>
            <li><Link to="/upcoming/shows" className="hover:text-white">Upcoming Series</Link></li>
            <li><Link to="/upcoming/anime" className="hover:text-white">Upcoming Anime</Link></li>
          </ul>
        </nav>

        <div className="text-sm">
          <div className="text-xs uppercase tracking-[0.2em] text-muted mb-2">Site</div>
          <ul className="grid gap-1.5 text-gray-300">
            <li><Link to="/search" className="hover:text-white">Search</Link></li>
            <li><Link to="/status" className="hover:text-white">Status</Link></li>
          </ul>
          <div className="mt-4"><CreditToggle /></div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 pb-8 text-[11px] text-muted">
        © {new Date().getFullYear()} Marcivo. This site does not host any files — it only links to media indexed from third-party sources.
      </div>
    </footer>
  );
}
