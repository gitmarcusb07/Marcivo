
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  ADS_ON,
  AD_FREE_PATHS,
  LOADER_SRC,
  SLOTS,
  type SlotName,
} from "./config";

// Inject the optional site-wide loader only once.
let loaderRequested = false;

function ensureLoader() {
  if (loaderRequested || !LOADER_SRC) return;

  loaderRequested = true;

  const script = document.createElement("script");
  script.src = LOADER_SRC;
  script.async = true;
  script.onload = () => {
    console.info("[MARCIVO ADS] Global loader loaded.");
  };
  script.onerror = () => {
    loaderRequested = false;
    console.error("[MARCIVO ADS] Global loader failed:", LOADER_SRC);
  };

  document.head.appendChild(script);
}

// Serialize ad mounts so banner units that use window.atOptions
// do not overwrite one another's configuration before loading.
let mountQueue: Promise<void> = Promise.resolve();

function enqueueMount(task: () => Promise<void>) {
  mountQueue = mountQueue.then(task, task);
}

/**
 * Parse an ad snippet and recreate its scripts as real script elements.
 * HTML inserted through innerHTML alone does not execute script tags.
 */
function mountSnippet(
  host: HTMLElement,
  html: string
): Promise<void> {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const nodes = Array.from(doc.body.childNodes);

  host.replaceChildren();

  const loadScript = (
    old: HTMLScriptElement
  ): Promise<void> => {
    return new Promise((resolve) => {
      const script = document.createElement("script");

      for (const attr of Array.from(old.attributes)) {
        script.setAttribute(attr.name, attr.value);
      }

      let finished = false;

      const finish = () => {
        if (finished) return;
        finished = true;
        resolve();
      };

      if (old.src) {
        // Preserve ordering between scripts in this snippet.
        script.async = false;
        script.addEventListener("load", finish, { once: true });
        script.addEventListener("error", finish, { once: true });
        setTimeout(finish, 10000);
      }

      script.textContent = old.textContent;

      host.appendChild(script);

      if (!old.src) {
        finish();
      }
    });
  };

  return nodes.reduce<Promise<void>>(
    (promise, node) =>
      promise.then(async () => {
        if (node.nodeName === "SCRIPT") {
          await loadScript(node as HTMLScriptElement);
        } else {
          host.appendChild(node.cloneNode(true));
        }
      }),
    Promise.resolve()
  );
}

interface Props {
  name: SlotName;
  className?: string;
}

export default function AdSlot({
  name,
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [preview, setPreview] = useState(false);
  const { pathname } = useLocation();

  const cfg = SLOTS[name];
  const adFree = AD_FREE_PATHS.some((re) =>
    re.test(pathname)
  );

  const code = (cfg?.code || "").trim();
  const active =
    ADS_ON && !!cfg?.on && !adFree && !!code;

  useEffect(() => {
    if (!active || !ref.current) return;

    const host = ref.current;

    // Do not mount the same slot twice.
    if (host.dataset.mounted === "1") return;

    host.dataset.mounted = "1";

    ensureLoader();

    enqueueMount(async () => {
      // The user may have navigated away while waiting in the queue.
      if (!host.isConnected) {
        delete host.dataset.mounted;
        return;
      }

      try {
        console.info("[MARCIVO ADS] Mounting slot:", name);

        await mountSnippet(host, code);

        const scripts = Array.from(
          host.querySelectorAll("script")
        ).map((script) => script.src || "[inline script]");

        console.info("[MARCIVO ADS] Mount completed:", {
          slot: name,
          scripts,
          container: host.querySelector('[id^="container-"]')?.id,
        });

        // A native snippet has an external loader and a container.
        // An empty script list indicates that mounting did not complete
        // as expected for a script-based slot.
        if (!host.querySelector("script[src]")) {
          delete host.dataset.mounted;
          console.error(
            "[MARCIVO ADS] No external script was mounted:",
            name
          );
        }
      } catch (error) {
        delete host.dataset.mounted;
        console.error(
          "[MARCIVO ADS] Mount failed:",
          name,
          error
        );
      }
    });

    setPreview(false);
  }, [active, code, name]);

  // Show empty-slot previews only during local development.
  useEffect(() => {
    setPreview(
      import.meta.env.DEV &&
        ADS_ON &&
        !!cfg?.on &&
        !adFree &&
        !code
    );
  }, [cfg, adFree, code]);

  if (!ADS_ON || !cfg?.on || adFree) {
    return null;
  }

  if (!code && !preview) {
    return null;
  }

  return (
    <div
      className={`ad-slot ${className}`}
      data-ad-slot={name}
    >
      <div className="ad-slot-label">
        {preview
          ? `AD SLOT — ${cfg.label} (paste code in src/ads/config.ts)`
          : "Advertisement"}
      </div>

      <div
        ref={ref}
        className="ad-slot-body"
        style={{ minHeight: cfg.height }}
      />
    </div>
  );
}
