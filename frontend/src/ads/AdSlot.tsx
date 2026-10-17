import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { ADS_ON, AD_FREE_PATHS, LOADER_SRC, SLOTS, type SlotName } from "./config";

// The network loader (<script src=...>) is injected into <head> exactly once
// per page load, and only when at least one visible slot has code to fill it.
let loaderRequested = false;
function ensureLoader() {
  if (loaderRequested || !LOADER_SRC) return;
  loaderRequested = true;
  const s = document.createElement("script");
  s.src = LOADER_SRC;
  s.async = true;
  document.head.appendChild(s);
}

/**
 * Ad networks hand you a snippet containing <script> tags. Dropping that into
 * innerHTML does NOT run the scripts (browsers ignore script tags injected
 * that way), so we split the snippet: markup goes in as HTML, scripts are
 * re-created as real <script> elements in order. That is what makes an
 * Adsterra unit actually render.
 */
function mountSnippet(host: HTMLElement, html: string) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  host.innerHTML = "";
  doc.body.childNodes.forEach((node) => {
    if (node.nodeName === "SCRIPT") {
      const old = node as HTMLScriptElement;
      const s = document.createElement("script");
      for (const a of Array.from(old.attributes)) s.setAttribute(a.name, a.value);
      s.text = old.text;
      host.appendChild(s);
    } else {
      host.appendChild(node);
    }
  });
}

interface Props {
  name: SlotName;
  /** Extra classes for the wrapper (spacing, alignment). */
  className?: string;
}

/**
 * One named ad box. Renders nothing at all when the ad system is off, the slot
 * is switched off, the current page is ad-free (the player), or no code has
 * been pasted for this slot yet — so the layout never grows an empty gap.
 */
export default function AdSlot({ name, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [preview, setPreview] = useState(false);
  // Router context: re-renders on every navigation, so an ad mounted on the
  // home page is torn down the moment the player page takes over.
  const { pathname } = useLocation();

  const cfg = SLOTS[name];
  const adFree = AD_FREE_PATHS.some((re) => re.test(pathname));
  const code = (cfg?.code || "").trim();
  const active = ADS_ON && cfg?.on && !adFree && !!code;

  useEffect(() => {
    if (!active || !ref.current || ref.current.dataset.mounted) return;
    ref.current.dataset.mounted = "1";
    ensureLoader();
    mountSnippet(ref.current, code);
    setPreview(false);
  }, [active, code]);

  // Dev-only: show the reserved box so slots are easy to place before the
  // network has approved the site and handed over real code.
  useEffect(() => {
    setPreview(import.meta.env.DEV && ADS_ON && cfg?.on && !adFree && !code);
  }, [cfg, adFree, code]);

  if (!ADS_ON || !cfg?.on || adFree) return null;
  if (!code && !preview) return null;

  return (
    <div className={`ad-slot ${className}`} data-ad-slot={name}>
      <div className="ad-slot-label">{preview ? `AD SLOT — ${cfg.label} (paste code in src/ads/config.ts)` : "Advertisement"}</div>
      <div ref={ref} className="ad-slot-body" style={{ minHeight: cfg.height }} />
    </div>
  );
}
