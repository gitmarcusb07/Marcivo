/**
 * Type declarations for ./posts.js. Marcivo's build runs `tsc --noEmit`
 * with strict mode and no allowJs, so importing the plain-JS posts file
 * from .tsx pages needs this declaration — it changes no runtime code
 * and no ad code. Keep the shapes in sync with posts.js.
 */
export interface BlogFaqItem {
  q: string;
  a: string;
}

export interface BlogSection {
  type: "p" | "h2" | "h3" | "list" | "steps" | "faq";
  text?: string;
  items?: string[] | BlogFaqItem[];
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  date: string;
  category: string;
  image?: string;
  imageAlt?: string;
  sections: BlogSection[];
}

export declare const posts: BlogPost[];
export declare function getAllPosts(): BlogPost[];
export declare function getPostBySlug(slug: string): BlogPost | undefined;
