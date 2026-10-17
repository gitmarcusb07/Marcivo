import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ADS_ON, AD_FREE_PATHS, GLOBAL_ADS } from "./config";

// Module-level guard prevents duplicate script insertion during React StrictMode
// effect replay and route changes. These ad-network scripts are page-global.
const injectedGlobalAds = new Set<string>();

function injectGlobalScript(name: "popunder" | "socialBar", html: string) {
  if (!document.body || injectedGlobalAds.has(name)) return;

  // Do not duplicate a script if it was already inserted by another mount.
  if (document.querySelector(`script[data-marcivo-global-ad="${name}"]`)) {
    injectedGlobalAds.add(name);
    return;
  }

  const template = document.createElement("template");
  template.innerHTML = html.trim();
  const source = template.content.querySelector("script[src]");
  if (!source) {
    console.error(`[MARCIVO ADS] Missing external script for ${name}.`);
    return;
  }

  const script = document.createElement("script");
  for (const attribute of Array.from(source.attributes)) {
    script.setAttribute(attribute.name, attribute.value);
  }

  // Mark before append so a quick React remount cannot inject it twice.
  script.dataset.marcivoGlobalAd = name;
  script.async = true;
  injectedGlobalAds.add(name);
  script.addEventListener(
    "error",
    () => {
      console.error(`[MARCIVO ADS] Global ${name} script failed to load.`);
      // Keep the guard: automatically retrying third-party ad scripts can
      // create duplicate side effects if the network partially initialized.
    },
    { once: true },
  );

  document.body.appendChild(script);
}

export default function GlobalAds() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!ADS_ON || AD_FREE_PATHS.some((pattern) => pattern.test(pathname))) {
      return;
    }

    const start = () => {
      if (!document.body) return;

      if (GLOBAL_ADS.popunder.on) {
        injectGlobalScript("popunder", GLOBAL_ADS.popunder.code);
      }
      if (GLOBAL_ADS.socialBar.on) {
        injectGlobalScript("socialBar", GLOBAL_ADS.socialBar.code);
      }
    };

    // React normally mounts after body exists; this is a defensive fallback.
    if (document.body) {
      start();
    } else {
      document.addEventListener("DOMContentLoaded", start, { once: true });
    }

    return () => {
      document.removeEventListener("DOMContentLoaded", start);
    };
  }, [pathname]);

  return null;
}
