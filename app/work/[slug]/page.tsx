import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllWorks, getWorkBySlug } from "@/content/projects";
import { profile } from "@/content/profile";
import { PlateFrame } from "@/components/primitives/PlateFrame";
import { SkeletonImage } from "@/components/primitives/SkeletonImage";
import { generateProjectJsonLd } from "@/lib/seo";

interface CaseStudyProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllWorks().map((w) => ({
    slug: w.slug,
  }));
}

export async function generateMetadata({ params }: CaseStudyProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getWorkBySlug(slug);
  if (!project) return { title: "Not Found" };

  return {
    title: `${project.title} — ${profile.name}`,
    description: project.description,
    alternates: {
      canonical: `https://nishantunavane.qzz.io/work/${slug}`,
    },
    openGraph: {
      title: `${project.title} — ${profile.name}`,
      description: project.description,
      images: [
        project.image ||
          "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/04-act3-temple/a3-temple-plate.webp",
      ],
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyProps) {
  const { slug } = await params;
  const allWorks = getAllWorks();
  const project = allWorks.find((w) => w.slug === slug);

  if (!project) {
    notFound();
  }

  const currentIndex = allWorks.findIndex((w) => w.slug === slug);
  const nextProject = allWorks[(currentIndex + 1) % allWorks.length];
  const projectJsonLd = generateProjectJsonLd(project);
  const showSubtitle =
    project.subtitle &&
    project.subtitle.toLowerCase() !== project.category.toLowerCase();

  return (
    <article className="min-h-screen pt-28 sm:pt-36 pb-20 sm:pb-28 px-6 md:px-12 bg-paper text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="max-w-[1440px] mx-auto flex flex-col gap-12 lg:gap-16">
        {/* Top Utility Strip */}
        <div className="flex items-center justify-between border-b border-hairline pb-4">
          <Link
            href="/projects"
            className="meta-label text-ink hover:text-ink-soft transition-colors inline-flex items-center gap-2 py-2 pr-3 min-h-[44px]"
          >
            <span aria-hidden="true">←</span>
            <span>ALL PROJECTS</span>
          </Link>
          <span className="font-serif text-xl sm:text-2xl text-muted tabular-nums">
            {project.index}
          </span>
        </div>

        {/* 2026 Swiss Split: Left Content Stream + Right Sticky Spec Sheet */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Content Stream */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            <header className="flex flex-col gap-5">
              <h1 className="display-xl text-ink font-normal leading-[0.96]">
                {project.title}
              </h1>
              {showSubtitle && (
                <p className="font-serif text-2xl sm:text-3xl text-ink-soft leading-snug">
                  {project.subtitle}
                </p>
              )}
              <div className="w-full h-[1px] bg-hairline my-1" />
              <p className="body-editorial text-body text-base sm:text-lg leading-[1.7] max-w-[62ch]">
                {project.description}
              </p>
            </header>

            {/* Frameless Artwork / Product Plate */}
            {project.image && (
              <div className="w-full max-w-[560px]">
                <PlateFrame>
                  <div className="relative w-full aspect-[3/4] overflow-hidden">
                    <SkeletonImage
                      src={project.image}
                      alt={`${project.title} visual showcase`}
                      fill
                      sizes="(max-width: 768px) 100vw, 560px"
                      className="object-contain"
                      priority
                    />
                  </div>
                </PlateFrame>
              </div>
            )}

            {/* Verified Highlights (when present) */}
            {project.proof.length > 0 && (
              <section
                aria-label="Verified highlights"
                className="flex flex-col gap-4 pt-4"
              >
                <span className="meta-label text-muted">VERIFIED HIGHLIGHTS</span>
                <div className="border-t border-hairline divide-y divide-hairline">
                  {project.proof.map((item, idx) => (
                    <div
                      key={idx}
                      className="py-4 flex items-baseline gap-6"
                    >
                      <span className="font-mono text-xs text-muted tabular-nums">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="text-base sm:text-lg text-ink font-medium">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Sticky Engineering Spec Sheet */}
          <aside className="lg:col-span-5 lg:sticky lg:top-28 self-start flex flex-col gap-8 border-t-2 border-ink bg-paper-soft p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-hairline pb-4">
              <span className="meta-label text-ink font-semibold">
                SPECIFICATION
              </span>
              <span className="font-mono text-xs text-muted tabular-nums">
                NO. {project.index}
              </span>
            </div>

            <dl className="divide-y divide-hairline text-sm">
              <div className="py-3.5 flex items-baseline justify-between gap-4">
                <dt className="meta-label text-muted shrink-0">DISCIPLINE</dt>
                <dd className="font-mono text-xs sm:text-sm text-ink text-right font-medium">
                  {project.category}
                </dd>
              </div>
              {project.metrics && project.metrics !== project.category && (
                <div className="py-3.5 flex items-baseline justify-between gap-4">
                  <dt className="meta-label text-muted shrink-0">PROOF</dt>
                  <dd className="font-mono text-xs sm:text-sm text-ink text-right font-medium">
                    {project.metrics}
                  </dd>
                </div>
              )}
              <div className="py-3.5 flex items-baseline justify-between gap-4">
                <dt className="meta-label text-muted shrink-0">AUTHOR</dt>
                <dd className="font-mono text-xs sm:text-sm text-ink text-right">
                  {profile.name}
                </dd>
              </div>
            </dl>

            {/* Stack */}
            <div className="flex flex-col gap-3 pt-2 border-t border-hairline">
              <span className="meta-label text-muted">STACK & TOOLING</span>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 text-xs font-mono border border-hairline bg-paper text-ink"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Primary Actions */}
            <div className="flex flex-col gap-3 pt-4 border-t border-hairline">
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between px-6 py-3 rounded-pill bg-ink text-on-ink text-sm font-semibold hover:bg-ink-soft transition-colors min-h-[44px]"
                >
                  <span>Launch Live System</span>
                  <span aria-hidden="true">↗</span>
                </a>
              )}
              {project.links.marketplace && (
                <a
                  href={project.links.marketplace}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between px-6 py-3 rounded-pill bg-ink text-on-ink text-sm font-semibold hover:bg-ink-soft transition-colors min-h-[44px]"
                >
                  <span>VS Code Marketplace</span>
                  <span aria-hidden="true">↗</span>
                </a>
              )}
              {project.links.repo && (
                <a
                  href={project.links.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between px-6 py-3 rounded-pill border border-hairline-strong hover:border-ink text-ink text-sm font-semibold transition-colors hover:bg-paper min-h-[44px]"
                >
                  <span>GitHub Repository</span>
                  <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          </aside>
        </div>

        {/* Sequential Pagination */}
        <nav
          aria-label="Project pagination"
          className="pt-10 border-t border-hairline flex items-center justify-between gap-4"
        >
          <Link
            href="/projects"
            className="meta-label text-muted hover:text-ink transition-colors py-2 pr-3 min-h-[44px] inline-flex items-center gap-1.5"
          >
            <span aria-hidden="true">←</span>
            <span>ALL PROJECTS</span>
          </Link>
          <Link
            href={`/work/${nextProject.slug}`}
            className="flex items-center gap-4 group text-right py-2 pl-3 min-h-[44px]"
          >
            <div className="flex flex-col">
              <span className="meta-label text-muted">NEXT WORK</span>
              <span className="font-serif text-xl sm:text-2xl text-ink group-hover:text-ink-soft transition-colors">
                {nextProject.title}
              </span>
            </div>
            <span className="w-11 h-11 md:w-9 md:h-9 rounded-full border border-hairline-strong flex items-center justify-center text-ink group-hover:border-ink group-hover:bg-ink group-hover:text-on-ink transition-all">
              →
            </span>
          </Link>
        </nav>
      </div>
    </article>
  );
}
