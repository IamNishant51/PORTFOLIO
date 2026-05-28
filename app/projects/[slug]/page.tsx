import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { getProjectBySlug, getProjectSlugs } from "@/lib/projects-data";
import Navbar from "@/app/components/layout/Navbar";
import Cursor from "@/app/components/Cursor";

export async function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} | Nishant Unavane`,
    description: project.tagline,
    openGraph: { title: project.title, description: project.tagline },
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return <div className="min-h-screen flex items-center justify-center" style={{ color: "var(--color-muted-ash)" }}>Project not found</div>;

  return (
    <main className="min-h-screen" style={{ background: "var(--bg)", color: "var(--fg)" }}>
      <div className="fixed inset-0 pointer-events-none select-none z-[0]" style={{ backgroundImage: "url('/ASSETS/JAPNESE-BAMBOO-IMAGE.svg')", backgroundRepeat: "no-repeat", backgroundPosition: "center center", backgroundSize: "cover", opacity: 0.065 }} aria-hidden="true" />
      <Cursor />
      <Navbar />
      <article className="relative z-10 pt-28 md:pt-36 pb-24">
        <div className="section-container max-w-3xl">
          <Link href="/projects" className="inline-flex items-center gap-2 mb-10 text-mono" style={{ color: "rgba(240,237,230,0.4)" }}>
            <ArrowLeft className="w-6 h-6" /> Back to Projects
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-mono" style={{ color: "var(--accent)" }}>Case Study</span>
            <span className="w-8 h-px" style={{ background: "var(--accent)" }} />
          </div>

          <h1 className="text-h1 mb-3" style={{ color: "var(--fg)" }}>{project.title}</h1>
          <p className="text-subheading mb-10" style={{ color: "var(--color-muted-ash)" }}>{project.tagline}</p>

          <div className="flex flex-wrap gap-2 mb-12">
            {project.tech.map((t) => (
              <span key={t} className="px-3 py-1 text-mono" style={{ border: "1px solid var(--border-mid)", color: "var(--accent)" }}>{t}</span>
            ))}
          </div>

          <section className="mb-16">
            <h2 className="text-heading mb-4" style={{ color: "var(--fg)" }}>Overview</h2>
            <p className="text-body leading-relaxed" style={{ color: "var(--color-muted-ash)" }}>{project.overview}</p>
          </section>

          <section className="mb-16">
            <h2 className="text-heading mb-6" style={{ color: "var(--fg)" }}>Features</h2>
            <ul className="space-y-3">
              {project.features.map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-body" style={{ color: "var(--color-muted-ash)" }}>
                  <span className="mt-2 w-1.5 h-1.5 flex-shrink-0" style={{ background: "var(--accent)" }} />
                  {f}
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-16">
            <h2 className="text-heading mb-6" style={{ color: "var(--fg)" }}>Challenges</h2>
            <ul className="space-y-3">
              {project.challenges.map((c, i) => (
                <li key={i} className="flex items-start gap-3 text-body" style={{ color: "var(--color-muted-ash)" }}>
                  <span className="mt-2 w-1.5 h-1.5 flex-shrink-0" style={{ background: "var(--color-muted-ash)" }} />
                  {c}
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-16">
            <h2 className="text-heading mb-6" style={{ color: "var(--fg)" }}>Learnings</h2>
            <ul className="space-y-3">
              {project.learnings.map((l, i) => (
                <li key={i} className="flex items-start gap-3 text-body" style={{ color: "var(--color-muted-ash)" }}>
                  <span className="mt-2 w-1.5 h-1.5 flex-shrink-0" style={{ background: "var(--accent)" }} />
                  {l}
                </li>
              ))}
            </ul>
          </section>

          <div className="flex flex-wrap gap-4 pt-8" style={{ borderTop: "1px solid var(--border)" }}>
            {project.links.map((link) => (
              <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 text-mono" style={{ border: "1px solid var(--border-mid)", color: "var(--fg)" }}>
                {link.label} <ExternalLink className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </article>
    </main>
  );
}
