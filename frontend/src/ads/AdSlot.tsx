
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

// Serialize mounts to avoid overlapping configurations that use
// the shared window.atOptions variable.
let mountQueue: Promise<void> = Promise.resolve();

function enqueueMount(task: () => Promise<void>) {
  mountQueue = mountQueue.then(task, task);
}

/**
 * FIX:
 * Parse snippets with an HTML template instead of DOMParser.
 * DOMParser may move script elements into <head>, causing
 * doc.body.childNodes to omit them.
 *
 * A template preserves the original script/container order.
 */
function mountSnippet(
  host: HTMLElement,
  html: string
): Promise<void> {
  const template = document.createElement("template");
  template.innerHTML = html;

  const nodes = Array.from(template.content.childNodes);

  host.replaceChildren();

  return nodes.reduce<Promise<void>>(
    (chain, node) =>
      chain.then(async () => {
        // Preserve non-script markup, including native ad containers.
        if (node.nodeName !== "SCRIPT") {
          host.appendChild(node.cloneNode(true));
          return;
        }

        const original = node as HTMLScriptElement;
        const script = document.createElement("script");

        // Copy all original script attributes.
        for (const attr of Array.from(original.attributes)) {
          script.setAttribute(attr.name, attr.value);
        }

        script.textContent = original.textContent;

        // Inline configuration scripts execute when appended.
        if (!original.src) {
          host.appendChild(script);
          return;
        }

        // Keep external scripts ordered within this snippet.
        script.async = false;

        await new Promise<void>((resolve) => {
          let finished = false;
          let timeout = 0;

          const finish = () => {
            if (finished) return;

            finished = true;
            window.clearTimeout(timeout);
            resolve();
          };

          timeout = window.setTimeout(finish, 10000);

          script.addEventListener("load", finish, {
            once: true,
          });

          script.addEventListener("error", finish, {
            once: true,
          });

          host.appendChild(script);
        });
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
    if (!active || !ref.current) return;

    const host = ref.current;

    // Prevent duplicate mounting on the same host.
    if (host.dataset.mounted === "1") return;

    host.dataset.mounted = "1";

    ensureLoader();

    enqueueMount(async () => {
      // The component may have unmounted while waiting in the queue.
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

        const container = host.querySelector(
          '[id^="container-"]'
        );

        console.info("[MARCIVO ADS] Mount completed:", {
          slot: name,
          scripts,
          container: container?.id ?? null,
          html: host.innerHTML,
        });

        // A banner/native snippet should contain an external script.
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

  // Show placeholder slots only in local development.
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
