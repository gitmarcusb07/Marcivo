import { useEffect } from "react";

// Intro splash: play-symbol mark ignites with a light sweep, wordmark
// shimmers, then the whole splash fades. Shown once per app launch.
export function PlayMark({ className = "w-36 h-36" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <defs>
        <radialGradient id="pmglow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e50914" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#e50914" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pmring" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff2a33" />
          <stop offset="100%" stopColor="#96060d" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="url(#pmglow)" />
      <circle cx="32" cy="32" r="19" fill="#16161c" stroke="url(#pmring)" strokeWidth="3" />
      <polygon points="27,22 27,42 43,32" fill="#e50914" />
    </svg>
  );
}

export default function AnimatedSplash({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2800);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="splash-root fixed inset-0 z-50 bg-black flex items-center justify-center">
      <div className="splash-rays" />
      <div className="splash-sweep" />
      <div className="flex flex-col items-center splash-zoom">
        <PlayMark className="w-36 h-36 drop-shadow-[0_0_35px_rgba(229,9,20,0.55)]" />
        <div className="font-display text-4xl tracking-[0.35em] mt-4 tagline-shimmer pl-2">
          MARCIVO
        </div>
      </div>
    </div>
  );
}
