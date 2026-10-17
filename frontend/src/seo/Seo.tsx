import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Public production origin — every canonical/OG URL is absolute. */
export const SITE_URL = "https://marcivo.teraplayer.in";

const DEFAULT_IMAGE = "/m-logo.svg";

export interface SeoProps {
  title: string;
  description: string;
  /** Canonical path override; defaults to the current location's pathname. */
  path?: string;
  /** Absolute or root-relative image; defaults to the Marcivo logo. */
  image?: string;
  type?: string;
  /** robots meta; defaults to fully indexable. Reviewer pages pass noindex. */
  robots?: string;
  /** One schema.org object or a list of them (mixed types are fine). */
  jsonLd?: object | object[];
}

function abs(u: string) {
  if (/^https?:\/\//i.test(u)) return u;
  return `${SITE_URL}${u.startsWith("/") ? "" : "/"}${u}`;
}

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let node = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!node) {
    node = document.createElement("meta");
    node.setAttribute(attr, key);
    document.head.appendChild(node);
  }
  node.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let node = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!node) {
    node = document.createElement("link");
    node.setAttribute("rel", rel);
    document.head.appendChild(node);
  }
  node.setAttribute("href", href);
}

/**
 * Per-route document head: title, description, canonical, Open Graph,
 * Twitter card, robots and JSON-LD. Every route renders one — the last
 * mounted page wins, so SPA navigation keeps the head in sync. Purely
 * client-side; the Worker pre-renders the same values for the static
 * content pages so non-JS crawlers read them too.
 */
export default function Seo({
  title,
  description,
  path,
  image = DEFAULT_IMAGE,
  type = "website",
  robots = "index,follow,max-image-preview:large",
  jsonLd,
}: SeoProps) {
  const loc = useLocation();
  const canonical = `${SITE_URL}${path ?? loc.pathname}`;
  const ld = jsonLd ? JSON.stringify(jsonLd) : "";

  useEffect(() => {
    document.title = title;
    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", robots);
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:site_name", "Marcivo");
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", canonical);
    upsertMeta("property", "og:image", abs(image));
    upsertMeta("name", "twitter:card", image !== DEFAULT_IMAGE ? "summary_large_image" : "summary");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertLink("canonical", canonical);

    let script = document.getElementById("seo-jsonld") as HTMLScriptElement | null;
    if (ld) {
      if (!script) {
        script = document.createElement("script");
        script.id = "seo-jsonld";
        script.type = "application/ld+json";
        document.head.appendChild(script);
      }
      script.textContent = ld;
    } else if (script) {
      script.remove();
    }

    return () => {
      document.getElementById("seo-jsonld")?.remove();
    };
  }, [title, description, canonical, image, type, robots, ld]);

  return null;
}

/** BreadcrumbList helper — Home → …crumbs, in order. */
export function breadcrumbLd(crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.path}`,
    })),
  };
}

/** FAQPage helper — pass visible Q&A pairs so the markup always matches. */
export function faqLd(faq: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
