// MARCIVO red-M mark (matches the app logo: glossy red "M" with dark
// side folds on a black rounded tile).
export default function MLogo({ className = "w-9 h-9" }: { className?: string }) {
  const M = "M13,8 H23 L32,32 L41,8 H51 V56 H42 V30 L32,50 L22,30 V56 H13 Z";
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="Marcivo logo">
      <defs>
        <linearGradient id="mlogo-red" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FF2A33" />
          <stop offset="55%" stopColor="#E50914" />
          <stop offset="100%" stopColor="#A3060E" />
        </linearGradient>
        <linearGradient id="mlogo-gloss" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.38" />
          <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <clipPath id="mlogo-clip">
          <path d={M} />
        </clipPath>
      </defs>
      <rect x="0" y="0" width="64" height="64" rx="14" fill="#0B0B0E" />
      {/* side folds */}
      <polygon points="8,12 13,8 13,56 8,52" fill="#6E040A" />
      <polygon points="56,12 51,8 51,56 56,52" fill="#6E040A" />
      {/* M ribbon */}
      <path d={M} fill="url(#mlogo-red)" />
      {/* top gloss */}
      <rect x="0" y="0" width="64" height="64" fill="url(#mlogo-gloss)" clipPath="url(#mlogo-clip)" />
    </svg>
  );
}
