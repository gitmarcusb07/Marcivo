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
 * WHY SLOTS MOUNT ONE AT A TIME
 *
 * Every banner snippet is two scripts: an inline one that assigns the GLOBAL
 * `window.atOptions`, then a loader that READS `atOptions` when it executes.
 * The inline script runs the instant it is inserted, but a script with `src`
 * only runs once its bytes arrive — which is later, and out of order.
 *
 * So mounting four slots at once did this:
 *   slot A writes atOptions=A, queues loader A
 *   slot B writes atOptions=B          <-- clobbers A
 *   loader A finally runs, reads B     <-- asks for the wrong unit
 * The network gets a config/URL key mismatch and serves nothing: an empty
 * box behind the "ADVERTISEMENT" label.
 *
 * Serialising the mounts — write one config, wait for its loader to actually
 * execute, then write the next — gives each loader the config it was built
 * for. The 5s escape hatch stops one stalled unit from blocking the rest.
 */
let mountQueue: Promise<void> = Promise.resolve();
function enqueueMount(task: () => Promise<void>) {
  mountQueue = mountQueue.then(task, task);
}

/**
 * Ad networks hand you a snippet containing <script> tags. Dropping that into
 * innerHTML does NOT run the scripts (browsers ignore script tags injected
 * that way), so we split the snippet: markup goes in as HTML, scripts are
 * re-created as real <script> elements in order. Resolves once the snippet's
 * `src` script has executed (or failed), so the caller can release the next.
 */
function mountSnippet(host: HTMLElement, html: string): Promise<void> {
  const doc = new DOMParser().parseFromString(html, "text/html");
  host.innerHTML = "";
  let settled: Promise<void> = Promise.resolve();

  doc.body.childNodes.forEach((node) => {
    if (node.nodeName === "SCRIPT") {
      const old = node as HTMLScriptElement;
      const s = document.createElement("script");
      for (const a of Array.from(old.attributes)) s.setAttribute(a.name, a.value);
      s.text = old.text;
      host.appendChild(s); // inline → runs now; with src → starts loading
      if (old.src) {
        settled = new Promise<void>((resolve) => {
          let done = false;
          const finish = () => {
            if (done) return;
            done = true;
            resolve();
          };
          s.addEventListener("load", finish);
          s.addEventListener("error", finish);
          setTimeout(finish, 5000);
        });
      }
    } else {
      host.appendChild(node);
    }
  });

  return settled;
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
    const host = ref.current;
    host.dataset.mounted = "1";
    ensureLoader();
    enqueueMount(async () => {
      // Navigated away while queued behind another unit — nothing to fill.
      if (!host.isConnected) return;
      await mountSnippet(host, code);
    });
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
