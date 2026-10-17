import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import SearchPage from "./pages/SearchPage";
import Detail from "./pages/Detail";
import Watch from "./pages/Watch";
import CategoryPage from "./pages/CategoryPage";
import StatusPage from "./pages/StatusPage";
import SiteNav from "./components/SiteNav";
import SiteFooter from "./components/SiteFooter";
import AdSlot from "./ads/AdSlot";

const TITLES: Record<string, string> = {
  "/": "Marcivo — Watch Movies, Series & Anime Online",
  "/search": "Search — Marcivo",
  "/status": "Status — Marcivo",
  "/category/movies": "Movies — Marcivo",
  "/category/series": "Web Series — Marcivo",
  "/category/hollywood": "Hollywood — Marcivo",
  "/category/bollywood": "Bollywood — Marcivo",
};

// Browser tab title per route (React Router doesn't change it on its own).
function DocumentTitle() {
  const loc = useLocation();
  useEffect(() => {
    const seg = loc.pathname.split("/")[1] || "";
    document.title = TITLES[loc.pathname] || (seg ? `${seg[0].toUpperCase()}${seg.slice(1)} — Marcivo` : TITLES["/"]);
  }, [loc.pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <DocumentTitle />
      <div className="min-h-screen flex flex-col">
        <SiteNav />
        {/* Leaderboard under the navbar — hidden on the player page. */}
        <AdSlot name="header" className="max-w-7xl mx-auto px-4 w-full" />
        <main className="flex-1 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/category/:cat" element={<CategoryPage />} />
            <Route path="/detail/:kind/:id" element={<Detail />} />
            <Route path="/watch/:kind/:id" element={<Watch />} />
            <Route path="/status" element={<StatusPage />} />
          </Routes>
        </main>
        <AdSlot name="footer" className="max-w-7xl mx-auto px-4 w-full" />
        <SiteFooter />
      </div>
    </BrowserRouter>
  );
}
