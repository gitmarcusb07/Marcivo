
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  ADS_ON,
  AD_FREE_PATHS,
  LOADER_SRC,
  SLOTS,
  type SlotName,
} from "./config";

// Inject the optional global loader only once.
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
    console.error(
      "[MARCIVO ADS] Global loader failed:",
      LOADER_SRC
    );
  };

  document.head.appendChild(script);
}

// Serialize slots because banner units may share window.atOptions.
let mountQueue: Promise<void> = Promise.resolve();

function enqueueMount(task: () => Promise<void>) {
  mountQueue = mountQueue.then(task, task);
}

/**
 * Insert snippet markup and recreate script elements.
 * Scripts with src are awaited before the next script is inserted.
 */
function mountSnippet(
  host: HTMLElement,
  html: string
): Promise<void> {
  const doc = new DOMParser().parseFromString(
    html,
    "text/html"
  );

  const nodes = Array.from(doc.body.childNodes);
  host.replaceChildren();

  return nodes.reduce<Promise<void>>(
    (chain, node) =>
      chain.then(async () => {
        if (node.nodeName !== "SCRIPT") {
          host.appendChild(node.cloneNode(true));
          return;
        }

        const original = node as HTMLScriptElement;
        const script = document.createElement("script");

        for (const attr of Array.from(original.attributes)) {
          script.setAttribute(attr.name, attr.value);
        }

        if (original.src) {
          script.async = false;

          await new Promise<void>((resolve) => {
            let finished = false;

            const finish = () => {
              if (finished) return;
              finished = true;
              resolve();
            };

            script.addEventListener("load", finish, {
              once: true,
            });

            script.addEventListener("error", finish, {
              once: true,
            });

            // A stalled request must not block every remaining slot.
            const timeout = window.setTimeout(finish, 10000);

            const originalFinish = finish;
            const settle = () => {
              window.clearTimeout(timeout);
              originalFinish();
            };

            script.addEventListener("load", settle, {
              once: true,
            });

            script.addEventListener("error", settle, {
              once: true,
            });

            script.textContent = original.textContent;
            host.appendChild(script);
          });
        } else {
          script.textContent = original.textContent;
          host.appendChild(script);
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

  const adFree = AD_FREE_PATHS.some((pattern) =>
    pattern.test(pathname)
  );

  const code = (cfg?.code || "").trim();

  const active =
    ADS_ON &&
    !!cfg?.on &&
    !adFree &&
    !!code;

  useEffect(() => {
    const host = ref.current;

    if (!active || !host) return;

    if (host.dataset.mounted === "1") return;

    host.dataset.mounted = "1";

    console.info("[MARCIVO ADS] Slot activation:", {
      name,
      active,
      codeLength: code.length,
      pathname,
      mounted: host.dataset.mounted,
    });

    ensureLoader();

    enqueueMount(async () => {
      // Skip a slot if navigation removed its element.
      if (!host.isConnected) {
        delete host.dataset.mounted;
        return;
      }

      try {
        console.info("[MARCIVO ADS] Mounting slot:", name);

        await mountSnippet(host, code);

        const scripts = Array.from(
          host.querySelectorAll("script")
        ).map((script) => ({
          src: script.src || "[inline script]",
          connected: script.isConnected,
        }));

        console.info("[MARCIVO ADS] Mount completed:", {
          slot: name,
          scripts,
          container:
            host.querySelector('[id^="container-"]')?.id ??
            null,
          html: host.innerHTML,
        });

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
  }, [active, code, name, pathname]);

  // Show placeholders only during local development.
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
