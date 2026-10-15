import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Capacitor } from "@capacitor/core";
import { App as CapApp } from "@capacitor/app";
import { Browser } from "@capacitor/browser";
import Home from "./pages/Home";
import SearchPage from "./pages/SearchPage";
import Detail from "./pages/Detail";
import Watch from "./pages/Watch";
import CategoryPage from "./pages/CategoryPage";
import StatusPage from "./pages/StatusPage";
import AnimatedSplash from "./components/AnimatedSplash";

const IG_URL = "https://instagram.com/ig__marcus";

// Header credit: alternates every 5s between "Developed by Marcus" and
// Instagram badge. Tap opens the Instagram profile.
function CreditToggle() {
  const [ig, setIg] = useState(false);
  useEffect(() => {
    const t = setInterval(() => setIg((v) => !v), 5000);
    return () => clearInterval(t);
  }, []);
  async function open() {
    try {
      if (Capacitor.isNativePlatform()) await Browser.open({ url: IG_URL });
      else window.open(IG_URL, "_blank", "noopener");
    } catch {
      window.open(IG_URL, "_blank", "noopener");
    }
  }
  return (
    <button onClick={open} className="relative h-6 w-44 text-right overflow-hidden" aria-label="Developer Instagram">
      <span
        key={ig ? "ig" : "dev"}
        className="credit-flip absolute inset-0 flex items-center justify-end gap-1.5 text-xs font-bold tracking-wide"
      >
        {ig ? (
          <>
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="url(#iggrad)" strokeWidth="2">
              <defs>
                <linearGradient id="iggrad" x1="0" y1="1" x2="1" y2="0">
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
    </button>
  );
}

function BackHandler() {
  const nav = useNavigate();
  const loc = useLocation();

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;
    let alive = true;
    CapApp.addListener("backButton", ({ canGoBack }) => {
      if (!alive) return;
      if (canGoBack) {
        window.history.back();
      } else if (window.location.pathname !== "/") {
        nav("/", { replace: true });
      } else {
        CapApp.exitApp();
      }
    }).then((h) => {
      if (!alive) h.remove();
      else (BackHandler as any)._h = h;
    });
    return () => {
      alive = false;
      (BackHandler as any)._h?.remove?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep document title in sync (also helps task switcher).
  useEffect(() => {
    document.title = loc.pathname === "/" ? "MARCIVO" : `MARCIVO • ${loc.pathname.split("/")[1] || ""}`;
  }, [loc.pathname]);

  return null;
}

function BottomNav() {
  const nav = useNavigate();
  const loc = useLocation();
  // Fullscreen player keeps its own chrome — no bottom bar there.
  if (loc.pathname.startsWith("/watch")) return null;
  const tab = new URLSearchParams(loc.search).get("tab");
  const active = loc.pathname === "/status" ? "status" : tab === "anime" ? "anime" : "movies";
  const btn = (id: string, label: string, onClick: () => void) => (
    <button
      key={id}
      onClick={onClick}
      className={`rounded-xl py-2 text-sm font-bold tracking-wide border flex items-center justify-center gap-1.5 ${active === id ? "bg-netflix border-netflix" : "bg-card border-white/10 text-gray-300"}`}
    >{label}</button>
  );
  return (
    <div className="fixed bottom-0 left-0 right-0 px-3 pt-1 pb-3 bg-gradient-to-t from-black via-black/90 to-transparent">
      <div className="max-w-5xl mx-auto grid grid-cols-3 gap-2">
        {btn("movies", "🎬 MOVIES", () => nav("/?tab=movies"))}
        {btn("anime", "⛩️ ANIME", () => nav("/?tab=anime"))}
        {btn("status", "⚙️ STATUS", () => nav("/status"))}
      </div>
    </div>
  );
}

export default function App() {
  const [splash, setSplash] = useState(true);
  return (
    <BrowserRouter>
      {splash && <AnimatedSplash onDone={() => setSplash(false)} />}
      <BackHandler />
      <header className="max-w-5xl mx-auto px-3 pt-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2" aria-label="Marcivo home">
          <span className="font-display brand-loop text-4xl tracking-[0.18em]">MARCIVO</span>
        </Link>
        <CreditToggle />
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/category/:cat" element={<CategoryPage />} />
        <Route path="/detail/:kind/:id" element={<Detail />} />
        <Route path="/watch/:kind/:id" element={<Watch />} />
        <Route path="/status" element={<StatusPage />} />
      </Routes>
      <BottomNav />
    </BrowserRouter>
  );
}
