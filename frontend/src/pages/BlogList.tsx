import { Link } from "react-router-dom";
import Seo from "../seo/Seo";
import { getAllPosts } from "../blog/posts";

export default function BlogList() {
  const posts = getAllPosts();

  return (
    <div className="max-w-7xl mx-auto px-4 pb-16">
      <Seo
        title="Blog — Marcivo"
        description="Marcivo Blog — new OTT releases, movies, series, anime and how-to guides, updated with the same posts as TeraPlayer."
      />
      <h1 className="font-display text-3xl mt-6">Marcivo Blog</h1>
      <p className="text-muted text-sm mt-2">
        New OTT releases, movies, series, anime and how-to guides — the same blogs published on TeraPlayer.
      </p>

      {posts.length === 0 ? (
        <p className="text-muted mt-8">No blog posts yet. Check back soon.</p>
      ) : (
        <div className="grid gap-6 mt-6 md:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="block bg-card border border-white/10 rounded-xl overflow-hidden hover:border-white/30"
            >
              {post.image && (
                <img
                  src={post.image}
                  alt={post.imageAlt || post.title}
                  loading="lazy"
                  className="w-full aspect-video object-cover"
                />
              )}
              <div className="p-4">
                <div className="text-xs text-muted">
                  {post.date}
                  {post.category ? ` • ${post.category}` : ""}
                </div>
                <h2 className="font-display text-xl mt-2">{post.title}</h2>
                <p className="text-sm text-gray-300 mt-2">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
