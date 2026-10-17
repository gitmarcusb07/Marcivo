import { useLocation } from "react-router-dom";
import { ADS_ON, AD_FREE_PATHS, SMARTLINK } from "./config";

/**
 * A smartlink is a plain monetised URL, not a banner — the network wants it as
 * a normal <a href>. Rendered as a small text button so it never competes with
 * the banners for the eye. Hidden on the player page like every other ad.
 */
export default function SmartLink({ className = "" }: { className?: string }) {
  const { pathname } = useLocation();
  const adFree = AD_FREE_PATHS.some((re) => re.test(pathname));

  if (!ADS_ON || !SMARTLINK.on || !SMARTLINK.href || adFree) return null;

  return (
    <div className={`ad-slot ${className}`} data-ad-slot="smartlink">
      <a
        href={SMARTLINK.href}
        target="_blank"
        rel="sponsored noopener noreferrer"
        className="inline-block px-5 py-2 rounded-full bg-netflix/15 border border-netflix/40 text-netflix text-sm font-bold hover:bg-netflix/25 transition-colors"
      >
        {SMARTLINK.label} →
      </a>
    </div>
  );
}
