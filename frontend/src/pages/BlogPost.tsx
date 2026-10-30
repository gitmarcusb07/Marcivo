import { Link, useParams } from "react-router-dom";
import Seo from "../seo/Seo";
import NotFound from "./NotFound";
import { getPostBySlug } from "../blog/posts";
import type { BlogSection } from "../blog/posts";

function renderSection(section: BlogSection, index: number) {
  switch (section.type) {
    case "h2":
      return (
        <h2 key={index} className="font-display text-2xl mt-8">
          {section.text}
        </h2>
      );
    case "h3":
      return (
        <h3 key={index} className="font-display text-xl mt-6">
          {section.text}
        </h3>
      );
    case "list":
      return (
        <ul key={index} className="list-disc pl-6 mt-3 space-y-2 text-gray-200">
          {(section.items as string[] | undefined)?.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    case "steps":
      return (
        <ol key={index} className="list-decimal pl-6 mt-3 space-y-2 text-gray-200">
          {(section.items as string[] | undefined)?.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      );
    case "faq":
      return (
        <div key={index} className="mt-6 space-y-4">
          {(section.items as { q: string; a: string }[] | undefined)?.map((item, i) => (
            <div key={i}>
              <h3 className="font-semibold">{item.q}</h3>
              <p className="text-gray-300 mt-1">{item.a}</p>
            </div>
          ))}
        </div>
      );
    case "p":
    default:
      return (
        <p key={index} className="text-gray-200 mt-4 leading-relaxed">
          {section.text}
        </p>
      );
  }
}

export default function BlogPost() {
  const { slug = "" } = useParams();
  const post = getPostBySlug(slug);

  if (!post) return <NotFound />;

  return (
    <div className="max-w-3xl mx-auto px-4 pb-16">
      <Seo
        title={`${post.title} — Marcivo`}
        description={post.description}
        image={post.image}
      />
      <div className="text-xs text-muted mt-6">
        {post.date}
        {post.category ? ` • ${post.category}` : ""}
      </div>
      <h1 className="font-display text-3xl mt-2">{post.title}</h1>
      {post.image && (
        <img
          src={post.image}
          alt={post.imageAlt || post.title}
          className="w-full aspect-video object-cover rounded-xl mt-5"
        />
      )}
      <div>{post.sections.map((section, i) => renderSection(section, i))}</div>

      <div className="bg-card border border-white/10 rounded-xl p-5 mt-10">
        <h2 className="font-display text-xl">Find it on Marcivo</h2>
        <p className="text-sm text-gray-300 mt-2">
          Search Marcivo for movies, web series and anime — every title lines up its available versions in one place.
        </p>
        <Link
          to="/"
          className="inline-block mt-4 px-5 py-2.5 rounded-full bg-netflix font-semibold text-sm"
        >
          Go to Marcivo home
        </Link>
      </div>
    </div>
  );
}
