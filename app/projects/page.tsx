import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/content/projects";
import { experiments } from "@/content/experiments";
import { PlateFrame } from "@/components/primitives/PlateFrame";
import { SkeletonImage } from "@/components/primitives/SkeletonImage";

export const metadata: Metadata = {
  title: "Projects & Experiments — Nishant Unavane · Portfolio 2027",
  description:
    `A collection of ${projects.length} flagship autonomous systems, memory infrastructure, and ${experiments.length} developer tools & visual experiments built by Nishant Unavane.`,
  alternates: {
    canonical: "https://nishantunavane.qzz.io/projects",
  },
  openGraph: {
    title: "Projects & Selected Works — Nishant Unavane",
    description:
      "Flagship coding agents, cognitive memory graphs, VS Code context engines, and experimental motion primitives.",
    images: ["https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/08-project-shots/all-projects.webp"],
  },
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-paper text-ink selection:bg-paper-edge selection:text-ink pt-24 sm:pt-32 pb-24">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col gap-16 md:gap-24">
        {/* Navigation Breadcrumb Bar */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between meta-label text-[0.6875rem] text-muted">
            <Link
              href="/#work"
              className="text-ink hover:text-terracotta transition-colors flex items-center gap-1.5 py-1 min-h-[44px]"
            >
              <span>←</span>
              <span>BACK TO PORTFOLIO</span>
            </Link>
            <span className="hidden sm:inline font-mono">
              CATALOGUE RAISONNÉ · {projects.length + experiments.length} REPOSITORIES & SYSTEMS · 2024–2027
            </span>
          </div>
          <div className="w-full h-[1px] bg-hairline" />
        </div>

        {/* Hero Section */}
        <header className="flex flex-col gap-6 max-w-4xl">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.05] tracking-tight">
            A Collection of <em className="font-serif">Selected</em> Works and other Projects.
          </h1>
          <p className="body-editorial text-ink-soft text-lg sm:text-xl md:text-2xl leading-relaxed max-w-[62ch]">
            Four production systems engineered for local-first autonomous agents, cognitive memory graphs, and token-optimized developer tools, alongside nineteen field experiments, tools and side projects.
          </p>

          {/* Quick Stats Summary Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-hairline">
            <div className="flex flex-col gap-1">
              <span className="font-serif text-2xl sm:text-3xl text-ink">
                {String(projects.length).padStart(2, "0")}
              </span>
              <span className="meta-label text-[0.625rem] text-muted font-mono">
                FLAGSHIP SYSTEMS
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-serif text-2xl sm:text-3xl text-ink">
                {String(experiments.length).padStart(2, "0")}
              </span>
              <span className="meta-label text-[0.625rem] text-muted font-mono">
                FIELD EXPERIMENTS
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-serif text-2xl sm:text-3xl text-ink">10,340+</span>
              <span className="meta-label text-[0.625rem] text-muted font-mono">
                COMMUNITY DOWNLOADS
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-serif text-2xl sm:text-3xl text-ink">100%</span>
              <span className="meta-label text-[0.625rem] text-muted font-mono">
                LOCAL-FIRST CAPABLE
              </span>
            </div>
          </div>
        </header>

        {/* Collection Hero Showcase — Pure Frameless Artwork */}
        <div className="relative w-full aspect-[2000/1126] overflow-hidden">
          <SkeletonImage
            src="https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/08-project-shots/all-projects.webp"
            alt="Projects Built by Nishant Unavane"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1440px) 90vw, 1344px"
            className="object-contain sm:object-cover"
          />
        </div>

        {/* Section 01: Flagship Systems Showcase */}
        <section className="flex flex-col gap-12 sm:gap-16 pt-8 border-t border-hairline">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex flex-col gap-2">
              <span className="meta-label text-muted text-[0.6875rem] font-mono tracking-[0.2em]">
                PART I · FLAGSHIP PRODUCTION REPOSITORIES
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal">
                Four systems built, <em className="font-serif">and maintained.</em>
              </h2>
            </div>
            <span className="meta-label text-muted text-xs font-mono">
              PROJECTS 01 — 04
            </span>
          </div>

          {/* Detailed Project Showcases */}
          <div className="flex flex-col gap-16 md:gap-24">
            {projects.map((project, idx) => (
              <article
                key={project.id}
                id={project.slug}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start border border-hairline bg-paper-soft p-6 sm:p-8 md:p-10 rounded-xs shadow-[0_4px_24px_rgba(26,24,21,0.04)]"
              >
                {/* Visual Plate Column: Full vertical artwork without frame */}
                <div className="lg:col-span-5 flex flex-col gap-3">
                  <PlateFrame
                    caption={`PLATE 0${idx + 1} · ${project.title.toUpperCase()} · ${project.category.toUpperCase()}`}
                  >
                    <div className="relative w-full aspect-[2/3] sm:aspect-[3/4] flex items-center justify-center overflow-hidden">
                      {project.image ? (
                        <SkeletonImage
                          src={project.image}
                          alt={`${project.title} — ${project.subtitle}`}
                          fill
                          sizes="(max-width: 1024px) 100vw, 420px"
                          className="object-contain"
                        />
                      ) : (
                        <div className="p-8 text-center meta-label text-muted">
                          {project.title}
                        </div>
                      )}
                    </div>
                  </PlateFrame>
                </div>

                {/* Information Column */}
                <div className="lg:col-span-7 flex flex-col justify-between h-full gap-8">
                  <div className="flex flex-col gap-6">
                    {/* Index & Category Row */}
                    <div className="flex items-center justify-between border-b border-hairline pb-4">
                      <span className="font-serif text-3xl sm:text-4xl text-ink-soft">
                        {project.index}
                      </span>
                      <span className="meta-label text-xs tracking-wider text-muted font-mono uppercase">
                        {project.category}
                      </span>
                    </div>

                    {/* Titles */}
                    <div className="flex flex-col gap-2">
                      <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal leading-tight">
                        {project.title}
                      </h3>
                      <p className="font-serif text-xl sm:text-2xl text-ink-soft">
                        {project.subtitle}
                      </p>
                    </div>

                    {/* Definitional Description */}
                    <p className="body-editorial text-ink text-base sm:text-lg leading-relaxed max-w-[62ch]">
                      {project.description}
                    </p>

                    {/* Verified Proof & Metrics */}
                    <div className="flex flex-col gap-2.5 p-5 bg-paper border border-hairline rounded-xs">
                      <span className="meta-label text-[0.6875rem] text-muted font-mono tracking-wider">
                        VERIFIED PROOF & ARCHITECTURAL HIGHLIGHTS
                      </span>
                      <ul className="flex flex-col gap-1.5">
                        {project.proof.map((p, pIdx) => (
                          <li
                            key={pIdx}
                            className="flex items-center gap-2 font-mono text-xs sm:text-sm text-ink-soft"
                          >
                            <span className="text-terracotta font-serif">✦</span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Stack Tags */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-xs font-mono border border-hairline rounded-xs bg-paper text-ink-soft"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions & Outlinks */}
                  <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-hairline">
                    <Link
                      href={`/work/${project.slug}`}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-paper border border-hairline-strong hover:border-ink hover:bg-paper-deep text-ink text-xs font-mono font-bold tracking-wider uppercase transition-colors"
                    >
                      <span>READ CASE STUDY</span>
                      <span className="font-serif text-sm">→</span>
                    </Link>

                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 border border-hairline rounded-xs bg-paper hover:border-terracotta hover:text-terracotta text-ink text-xs font-mono transition-colors"
                      >
                        <span>LIVE SYSTEM</span>
                        <span className="text-[0.6875rem]">↗</span>
                      </a>
                    )}

                    {project.links.repo && (
                      <a
                        href={project.links.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 border border-hairline rounded-xs bg-paper hover:border-terracotta hover:text-terracotta text-ink text-xs font-mono transition-colors"
                      >
                        <span>SOURCE CODE</span>
                        <span className="text-[0.6875rem]">↗</span>
                      </a>
                    )}

                    {project.links.marketplace && (
                      <a
                        href={project.links.marketplace}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 border border-hairline rounded-xs bg-paper hover:border-terracotta hover:text-terracotta text-ink text-xs font-mono transition-colors"
                      >
                        <span>MARKETPLACE</span>
                        <span className="text-[0.6875rem]">↗</span>
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Section 02: Field Notes & Smaller Boats */}
        <section className="flex flex-col gap-12 sm:gap-16 pt-8 border-t border-hairline">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex flex-col gap-2">
              <span className="meta-label text-muted text-[0.6875rem] font-mono tracking-[0.2em]">
                PART II · FIELD NOTES & EXPERIMENTAL TOOLS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal">
                Smaller <em className="font-serif">boats.</em>
              </h2>
              <p className="body-editorial text-ink-soft text-base sm:text-lg max-w-[62ch]">
                Side projects, tools and experiments that didn&apos;t need to become companies.
              </p>
            </div>
            <span className="meta-label text-muted text-xs font-mono">
              PROJECTS 05 — {String(projects.length + experiments.length).padStart(2, "0")}
            </span>
          </div>

          {/* Experiment Cards with full uncropped vertical poster images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {experiments.map((exp, idx) => (
              <article
                key={exp.title}
                className="flex flex-col justify-between p-6 sm:p-7 rounded-xs border border-hairline bg-paper-soft shadow-[0_4px_24px_rgba(26,24,21,0.03)]"
              >
                <div className="flex flex-col gap-5">
                  {/* Full Vertical Poster Art without frame */}
                  <PlateFrame
                    caption={`PLATE ${String(idx + projects.length + 1).padStart(2, "0")} · ${exp.title.toUpperCase()}`}
                  >
                    <div className="relative w-full aspect-[2/3] sm:aspect-[3/4] flex items-center justify-center overflow-hidden">
                      {exp.image ? (
                        <SkeletonImage
                          src={exp.image}
                          alt={exp.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                          className="object-contain"
                        />
                      ) : (
                        <div className="p-4 text-center meta-label text-muted">
                          {exp.title}
                        </div>
                      )}
                    </div>
                  </PlateFrame>

                  <div className="flex flex-col gap-2">
                    <span className="meta-label text-[0.6875rem] text-muted font-mono uppercase tracking-wider">
                      {exp.tag}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-ink font-normal">
                      {exp.title}
                    </h3>
                    <p className="body-editorial text-ink-soft text-sm sm:text-base leading-relaxed">
                      {exp.line}
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-hairline mt-6">
                  <a
                    href={exp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider font-semibold text-ink hover:text-terracotta transition-colors"
                  >
                    <span>EXPLORE REPOSITORY</span>
                    <span className="font-serif text-sm">↗</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Footer Colophon Strip */}
        <footer className="w-full border-t border-hairline pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 meta-label text-[0.6875rem] text-muted">
            <div className="flex items-center gap-4">
              <Link
                href="/#work"
                className="text-ink hover:text-terracotta transition-colors flex items-center gap-1"
              >
                <span>←</span>
                <span>HOME / SELECTED WORK</span>
              </Link>
              <span aria-hidden="true">·</span>
              <Link href="/about" className="hover:text-ink transition-colors">
                ABOUT
              </Link>
              <span aria-hidden="true">·</span>
              <Link href="/colophon" className="hover:text-ink transition-colors">
                COLOPHON
              </Link>
            </div>
            <div>
              <span>© 2027 NISHANT UNAVANE · PUNE, IN</span>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
