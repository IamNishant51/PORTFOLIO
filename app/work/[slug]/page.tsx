import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { PlateFrame } from "@/components/primitives/PlateFrame";
import { generateProjectJsonLd } from "@/lib/seo";

interface CaseStudyProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: CaseStudyProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Not Found" };

  return {
    title: `${project.title} — ${project.subtitle}`,
    description: project.description,
    openGraph: {
      title: `${project.title} — ${project.subtitle}`,
      description: project.description,
      images: [project.image || "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/04-act3-temple/a3-temple-plate.webp"],
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const projectJsonLd = generateProjectJsonLd(project);

  return (
    <article className="min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-24 px-5 sm:px-6 md:px-12 bg-paper text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />

      <div className="max-w-[1200px] mx-auto flex flex-col gap-12 sm:gap-16">
        {/* Breadcrumb & Meta */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between meta-label">
            <Link
              href="/projects"
              className="text-ink hover:text-terracotta transition-colors flex items-center gap-1.5 py-2 pr-3 min-h-[44px]"
            >
              <span>←</span>
              <span>BACK TO ALL PROJECTS</span>
            </Link>
            <span className="hidden sm:inline">
              PROJECT {project.index} / 04 · {project.category}
            </span>
          </div>
          <div className="w-full h-[1px] bg-hairline" />
        </div>

        {/* Hero Title and Subtitle */}
        <div className="flex flex-col gap-4 sm:gap-6">
          <span className="font-serif text-4xl sm:text-5xl md:text-6xl text-ink-soft">
            {project.index}
          </span>
          <h1 className="display-xl text-ink font-normal leading-[0.96]">
            {project.title}
          </h1>
          <p className="font-serif italic text-xl sm:text-2xl md:text-3xl text-ink-soft">
            {project.subtitle}
          </p>
        </div>

        {/* 40-60 word definitional paragraph for Answer Engines */}
        <div className="p-5 sm:p-8 border-l-2 border-hairline-strong bg-paper-soft">
          <p className="body-editorial text-ink text-base sm:text-lg leading-relaxed max-w-[62ch]">
            {project.description}
          </p>
        </div>

        {/* Key Metrics and Technology Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 border-y border-hairline py-6 sm:py-8">
          <div className="flex flex-col gap-3">
            <span className="meta-label text-muted">VERIFIED PROOF & METRICS</span>
            <ul className="flex flex-col gap-1.5 text-ink-soft font-mono text-sm">
              {project.proof.map((p, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="text-terracotta font-serif">✦</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <span className="meta-label text-muted">ENGINEERING STACK</span>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-xs font-mono rounded-xs border border-hairline bg-paper-edge text-ink"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Artwork Framing Plate */}
        <div className="w-full py-4 flex justify-center">
          <div className="w-full max-w-[620px]">
            <PlateFrame
              caption={`PLATE 03 — ARCHITECTURAL CASE STUDY: ${project.title.toUpperCase()}`}
            >
              <div className="relative w-full aspect-[2/3] overflow-hidden rounded-xs bg-paper-edge shadow-inner">
                <Image
                  src={project.image || "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/04-act3-temple/a3-temple-plate.webp"}
                  alt={`Architectural study plate representing ${project.title}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 620px"
                  className="object-contain p-2"
                  priority
                />
              </div>
            </PlateFrame>
          </div>
        </div>

        {/* Links and Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-6 pt-4">
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-pill bg-ink text-on-ink text-sm font-medium hover:bg-ink-soft transition-colors min-h-[44px]"
            >
              <span>Launch Live System</span>
              <span aria-hidden="true">↗</span>
            </a>
          )}
          {project.links.repo && (
            <a
              href={project.links.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-pill border border-hairline-strong hover:border-ink text-ink text-sm font-medium transition-colors hover:bg-paper-soft min-h-[44px]"
            >
              <span>GitHub Repository</span>
              <span aria-hidden="true">↗</span>
            </a>
          )}
          {project.links.marketplace && (
            <a
              href={project.links.marketplace}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-pill border border-hairline-strong hover:border-ink text-ink text-sm font-medium transition-colors hover:bg-paper-soft min-h-[44px]"
            >
              <span>VS Code Marketplace</span>
              <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>

        {/* Next Project Pagination */}
        <div className="pt-12 sm:pt-16 mt-8 border-t border-hairline flex items-center justify-between">
          <Link
            href="/projects"
            className="meta-label text-muted hover:text-ink transition-colors py-2 pr-3 min-h-[44px] flex items-center"
          >
            ← ALL PROJECTS
          </Link>
          <Link
            href={`/work/${nextProject.slug}`}
            className="flex items-center gap-3 group text-right py-2 pl-3 min-h-[44px]"
          >
            <div className="flex flex-col">
              <span className="meta-label text-muted">NEXT WORK</span>
              <span className="font-serif text-xl sm:text-2xl text-ink group-hover:text-terracotta transition-colors">
                {nextProject.title}
              </span>
            </div>
            <span className="w-11 h-11 md:w-8 md:h-8 rounded-full border border-hairline flex items-center justify-center text-ink group-hover:border-ink group-hover:bg-ink group-hover:text-on-ink transition-all">
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
