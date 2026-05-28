import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/app/components/layout/Navbar";
import Cursor from "@/app/components/Cursor";
import { blogPosts } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "Blog | Nishant Unavane",
  description: "Thoughts on web development, VS Code extensions, and building in public.",
  openGraph: { title: "Blog | Nishant Unavane", description: "Thoughts on web development, VS Code extensions, and building in public." },
};

export default function BlogPage() {
  return (
    <main className="min-h-screen" style={{ background: "var(--bg)", color: "var(--fg)" }}>
      <div className="fixed inset-0 pointer-events-none select-none z-[0]" style={{ backgroundImage: "url('/ASSETS/JAPNESE-BAMBOO-IMAGE.svg')", backgroundRepeat: "no-repeat", backgroundPosition: "center center", backgroundSize: "cover", opacity: 0.065 }} aria-hidden="true" />
      <Cursor />
      <Navbar />
      <div className="relative z-10 pt-28 md:pt-36 pb-24">
        <div className="section-container max-w-3xl">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-mono" style={{ color: "var(--accent)" }}>Writing</span>
            <span className="w-8 h-px" style={{ background: "var(--accent)" }} />
          </div>

          <h1 className="text-h1 mb-4" style={{ color: "var(--fg)" }}>
            <span style={{ color: "var(--accent)" }}>Blog</span>
          </h1>
          <p className="text-body mb-16" style={{ color: "var(--color-muted-ash)" }}>
            Thoughts on web development, VS Code extensions, and building in public.
          </p>

          <div className="space-y-12">
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                <article className="py-6" style={{ borderBottom: "1px solid var(--border)" }}>
                  <div className="flex items-center gap-3 text-mono mb-3" style={{ color: "var(--color-muted-ash)" }}>
                    <span>{post.date}</span>
                    <span className="w-1 h-1 rounded-full" style={{ background: "var(--color-muted-ash)" }} />
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="text-heading mb-2 group-hover:opacity-70 transition-opacity" style={{ color: "var(--fg)" }}>{post.title}</h2>
                  <p className="text-body mb-3" style={{ color: "var(--color-muted-ash)" }}>{post.excerpt}</p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 text-mono" style={{ border: "1px solid var(--border-mid)", color: "var(--accent)" }}>{tag}</span>
                    ))}
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
