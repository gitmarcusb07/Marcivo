import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import Home from "./pages/Home";
import SiteNav from "./components/SiteNav";
import SiteFooter from "./components/SiteFooter";
import AdSlot from "./ads/AdSlot";
import GlobalAds from "./ads/GlobalAds";
import SmartLink from "./ads/SmartLink";

// Route-level code splitting: the shell (nav/footer/ads) + home stay in the
// initial bundle; everything else loads on demand. Smaller JS = faster LCP.
const SearchPage = lazy(() => import("./pages/SearchPage"));
const Detail = lazy(() => import("./pages/Detail"));
const Watch = lazy(() => import("./pages/Watch"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const StatusPage = lazy(() => import("./pages/StatusPage"));
const WatchFree = lazy(() => import("./pages/WatchFree"));
const FreeMovies = lazy(() => import("./pages/FreeMovies"));
const DownloadMovies = lazy(() => import("./pages/DownloadMovies"));
const Upcoming = lazy(() => import("./pages/Upcoming"));
const NotFound = lazy(() => import("./pages/NotFound"));

const TITLES: Record<string, string> = {
  "/": "Marcivo — Watch Movies Online Free | Movies, Series & Anime",
  "/search": "Search — Marcivo",
  "/status": "Status — Marcivo",
  "/category/movies": "Movies — Marcivo",
  "/category/series": "Web Series — Marcivo",
  "/category/hollywood": "Hollywood — Marcivo",
  "/category/bollywood": "Bollywood — Marcivo",
  "/free-movies": "Free Movies & Shows — Watch Movies Online Free | Marcivo",
  "/download-movies": "Download Movies & Web Series — Every Available Version | Marcivo",
  "/watch-free": "How to Watch Movies Online Free | Marcivo",
  "/upcoming": "Upcoming Movies — Marcivo",
  "/upcoming/shows": "Upcoming Web Series & TV Shows — Marcivo",
  "/upcoming/anime": "Upcoming Anime — Marcivo",
};

// Browser tab title fallback per route — pages override with their full
// <Seo> head right after mount (React Router doesn't change it on its own).
function DocumentTitle() {
  const loc = useLocation();
  useEffect(() => {
    // Detail.tsx sets title-specific metadata after its API response arrives.
    if (loc.pathname.startsWith("/detail/")) return;
    const seg = loc.pathname.split("/")[1] || "";
    document.title = TITLES[loc.pathname] || (seg ? `${seg[0].toUpperCase()}${seg.slice(1)} — Marcivo` : TITLES["/"]);
  }, [loc.pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <DocumentTitle />
      <GlobalAds />
      <div className="min-h-screen flex flex-col">
        <SiteNav />
        {/* Leaderboard under the navbar — hidden on the player page. */}
        <AdSlot name="header" className="max-w-7xl mx-auto px-4 w-full" />
        <main className="flex-1 w-full">
          <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-10"><div className="skeleton h-48" /></div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/category/:cat" element={<CategoryPage />} />
              <Route path="/detail/:kind/:id" element={<Detail />} />
              <Route path="/watch/:kind/:id" element={<Watch />} />
              <Route path="/free-movies" element={<FreeMovies />} />
              <Route path="/download-movies" element={<DownloadMovies />} />
              <Route path="/watch-free" element={<WatchFree />} />
              <Route path="/upcoming" element={<Upcoming section="movies" />} />
              <Route path="/upcoming/shows" element={<Upcoming section="shows" />} />
              <Route path="/upcoming/anime" element={<Upcoming section="anime" />} />
              <Route path="/status" element={<StatusPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        {/* Smartlink sits above the footer banner on every non-player page. */}
        <SmartLink className="max-w-7xl mx-auto px-4 w-full" />
        <AdSlot name="footer" className="max-w-7xl mx-auto px-4 w-full" />
        <SiteFooter />
      </div>
    </BrowserRouter>
  );
}
