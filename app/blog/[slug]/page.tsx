import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getPostBySlug, getBlogSlugs } from "@/lib/blog-data";
import Navbar from "@/app/components/layout/Navbar";
import Cursor from "@/app/components/Cursor";

export async function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} | Nishant Unavane`,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return <div className="min-h-screen flex items-center justify-center" style={{ color: "var(--color-muted-ash)" }}>Post not found</div>;

  return (
    <main className="min-h-screen" style={{ background: "var(--bg)", color: "var(--fg)" }}>
      <div className="fixed inset-0 pointer-events-none select-none z-[0]" style={{ backgroundImage: "url('/ASSETS/JAPNESE-BAMBOO-IMAGE.svg')", backgroundRepeat: "no-repeat", backgroundPosition: "center center", backgroundSize: "cover", opacity: 0.065 }} aria-hidden="true" />
      <Cursor />
      <Navbar />
      <article className="relative z-10 pt-28 md:pt-36 pb-24">
        <div className="section-container max-w-3xl">
          <Link href="/blog" className="inline-flex items-center gap-2 mb-10 text-mono" style={{ color: "rgba(240,237,230,0.4)" }}>
            <ArrowLeft className="w-6 h-6" /> Back to Blog
          </Link>

          <div className="flex items-center gap-3 text-mono mb-4" style={{ color: "var(--color-muted-ash)" }}>
            <span>{post.date}</span>
            <span className="w-1 h-1 rounded-full" style={{ background: "var(--color-muted-ash)" }} />
            <span>{post.readTime}</span>
          </div>

          <h1 className="text-h1 mb-6" style={{ color: "var(--fg)" }}>{post.title}</h1>

          <div className="flex flex-wrap gap-2 mb-12">
            {post.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 text-mono" style={{ border: "1px solid var(--border-mid)", color: "var(--accent)" }}>{tag}</span>
            ))}
          </div>

          <div className="space-y-5 text-body leading-relaxed" style={{ color: "var(--color-muted-ash)" }}>
            {post.content.map((paragraph, i) => {
              if (paragraph.startsWith("## ")) {
                return <h2 key={i} className="text-heading pt-6" style={{ color: "var(--fg)" }}>{paragraph.replace("## ", "")}</h2>;
              }
              if (paragraph.startsWith("- **")) {
                const match = paragraph.match(/- \*\*(.+?)\*\*(?: — (.+))?/);
                if (match) {
                  return (
                    <p key={i}>
                      <strong style={{ color: "var(--fg)" }}>{match[1]}</strong>
                      {match[2] ? <span> — {match[2]}</span> : null}
                    </p>
                  );
                }
              }
              if (paragraph === "") return <div key={i} className="h-4" />;
              return <p key={i}>{paragraph}</p>;
            })}
          </div>

          <div className="mt-16 pt-8" style={{ borderTop: "1px solid var(--border)" }}>
            <Link href="/blog" className="inline-flex items-center gap-2 text-mono" style={{ color: "var(--accent)" }}>
              <ArrowLeft className="w-4 h-4" /> Back to all posts
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
