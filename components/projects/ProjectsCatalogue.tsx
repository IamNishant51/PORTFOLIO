"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Project } from "@/content/projects";
import { SkeletonImage } from "@/components/primitives/SkeletonImage";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Magnet } from "@/components/ui/Magnet";

type FilterKey = "all" | "flagship" | "ai" | "vscode" | "systems";
type ViewMode = "grid" | "index";

interface ProjectsCatalogueProps {
  flagships: Project[];
  experiments: Project[];
}

function classifyWork(item: Project, isFlagship: boolean): Exclude<FilterKey, "all" | "flagship"> {
  const hay = `${item.title} ${item.category} ${item.stack.join(" ")}`.toLowerCase();
  if (hay.includes("vs code") || hay.includes("vscode") || item.slug === "carto" || item.slug === "ollama-agent") {
    return "vscode";
  }
  if (
    hay.includes("agent") ||
    hay.includes("mcp") ||
    hay.includes("memory") ||
    hay.includes("lexis") ||
    hay.includes("klyr") ||
    hay.includes("excel-plugin") ||
    isFlagship
  ) {
    return "ai";
  }
  return "systems";
}

export function ProjectsCatalogue({ flagships, experiments }: ProjectsCatalogueProps) {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [view, setView] = useState<ViewMode>("grid");

  const allItems = useMemo(() => {
    const f = flagships.map((item) => ({
      item,
      isFlagship: true,
      domain: classifyWork(item, true),
    }));
    const e = experiments.map((item) => ({
      item,
      isFlagship: false,
      domain: classifyWork(item, false),
    }));
    return [...f, ...e];
  }, [flagships, experiments]);

  const counts = useMemo(
    () => ({
      all: allItems.length,
      flagship: flagships.length,
      ai: allItems.filter((x) => x.domain === "ai").length,
      vscode: allItems.filter((x) => x.domain === "vscode").length,
      systems: allItems.filter((x) => x.domain === "systems").length,
    }),
    [allItems, flagships.length]
  );

  const visible = useMemo(() => {
    if (filter === "all") return allItems;
    if (filter === "flagship") return allItems.filter((x) => x.isFlagship);
    return allItems.filter((x) => x.domain === filter);
  }, [allItems, filter]);

  const visibleFlagships = visible.filter((x) => x.isFlagship).map((x) => x.item);
  const visibleExperiments = visible.filter((x) => !x.isFlagship).map((x) => x.item);

  const filterTabs: { key: FilterKey; label: string; count: number }[] = [
    { key: "all", label: "ALL", count: counts.all },
    { key: "flagship", label: "FLAGSHIP", count: counts.flagship },
    { key: "ai", label: "AI & AGENTS", count: counts.ai },
    { key: "vscode", label: "VS CODE", count: counts.vscode },
    { key: "systems", label: "3D & SYSTEMS", count: counts.systems },
  ];

  return (
    <div className="flex flex-col gap-14 md:gap-20">
      {/* Sticky-feel Swiss Control Bar: Filter Tabs + View Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-ink/20 pb-5">
        <div
          role="tablist"
          aria-label="Filter projects by discipline"
          className="flex flex-wrap items-center gap-2"
        >
          {filterTabs.map((tab) => {
            const active = filter === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(tab.key)}
                className={`px-3.5 py-2 text-xs font-mono tracking-[0.12em] uppercase transition-colors cursor-pointer min-h-[40px] border ${
                  active
                    ? "bg-ink text-on-ink border-ink font-semibold"
                    : "bg-transparent text-body border-hairline hover:border-ink hover:text-ink"
                }`}
              >
                {tab.label} ({String(tab.count).padStart(2, "0")})
              </button>
            );
          })}
        </div>

        {/* Dual View Mode Toggle: Editorial Grid vs Swiss Index */}
        <div
          role="group"
          aria-label="Layout view mode"
          className="inline-flex items-center self-start lg:self-auto border border-hairline-strong"
        >
          <button
            type="button"
            onClick={() => setView("grid")}
            aria-pressed={view === "grid"}
            className={`px-4 py-2 text-xs font-mono tracking-[0.14em] uppercase transition-colors cursor-pointer min-h-[40px] ${
              view === "grid"
                ? "bg-ink text-on-ink font-semibold"
                : "bg-paper-soft text-muted hover:text-ink"
            }`}
          >
            GRID
          </button>
          <button
            type="button"
            onClick={() => setView("index")}
            aria-pressed={view === "index"}
            className={`px-4 py-2 text-xs font-mono tracking-[0.14em] uppercase transition-colors cursor-pointer min-h-[40px] border-l border-hairline-strong ${
              view === "index"
                ? "bg-ink text-on-ink font-semibold"
                : "bg-paper-soft text-muted hover:text-ink"
            }`}
          >
            INDEX
          </button>
        </div>
      </div>

      {view === "index" ? (
        /* Swiss Tabular Index View */
        <section aria-label="Projects Swiss Index" className="flex flex-col">
          <div className="hidden md:grid grid-cols-12 gap-6 pb-3 border-b border-ink/25 meta-label text-muted">
            <span className="col-span-1">NO.</span>
            <span className="col-span-1">PREVIEW</span>
            <span className="col-span-3">SYSTEM</span>
            <span className="col-span-2">DISCIPLINE</span>
            <span className="col-span-3">SUMMARY</span>
            <span className="col-span-2 text-right">DOSSIER</span>
          </div>
          <div className="divide-y divide-hairline border-b border-hairline">
            {visible.map(({ item }) => (
              <article
                key={item.slug}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 py-5 md:py-6 items-start md:items-center hover:bg-paper-soft/70 transition-colors px-2 -mx-2"
              >
                <span className="hidden md:block md:col-span-1 font-serif text-2xl text-muted tabular-nums">
                  {item.index}
                </span>

                <div className="md:col-span-1 flex items-center gap-4">
                  <span className="md:hidden font-serif text-xl text-muted tabular-nums w-7 shrink-0">
                    {item.index}
                  </span>
                  {item.image && (
                    <Link
                      href={`/work/${item.slug}`}
                      className="relative block w-20 md:w-full max-w-[88px] aspect-[3/4] overflow-hidden shrink-0"
                    >
                      <SkeletonImage
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 80px, 96px"
                        className="object-contain"
                      />
                    </Link>
                  )}
                  <div className="md:hidden flex flex-col gap-1 min-w-0">
                    <Link
                      href={`/work/${item.slug}`}
                      className="font-serif text-2xl text-ink hover:underline underline-offset-4 leading-tight"
                    >
                      {item.title}
                    </Link>
                    <span className="meta-label text-muted">{item.category}</span>
                  </div>
                </div>

                <div className="hidden md:flex md:col-span-3 flex-col gap-1">
                  <Link
                    href={`/work/${item.slug}`}
                    className="font-serif text-2xl lg:text-3xl text-ink hover:underline underline-offset-4 leading-tight"
                  >
                    {item.title}
                  </Link>
                </div>

                <span className="hidden md:block md:col-span-2 font-mono text-xs text-muted uppercase tracking-wider">
                  {item.category}
                </span>

                <p className="md:col-span-3 body-sm text-body leading-relaxed">
                  {item.description}
                </p>

                <div className="md:col-span-2 flex items-center md:justify-end gap-4 pt-1 md:pt-0">
                  <Link
                    href={`/work/${item.slug}`}
                    className="meta-label text-ink font-semibold hover:underline underline-offset-4 py-2 min-h-[40px] inline-flex items-center gap-1"
                  >
                    <span>CASE STUDY</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                  {(item.links.live || item.links.repo || item.links.marketplace) && (
                    <a
                      href={item.links.live || item.links.marketplace || item.links.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="meta-label text-muted hover:text-ink py-2 min-h-[40px] inline-flex items-center"
                      aria-label={`Open ${item.title} external link`}
                    >
                      ↗
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : (
        <div className="flex flex-col gap-20 md:gap-28">
          {/* Part I: Flagship Systems — Asymmetric 12-Col Swiss Spreads */}
          {visibleFlagships.length > 0 && (
            <section className="flex flex-col gap-10 md:gap-14">
              <div className="flex items-baseline justify-between border-b border-hairline pb-4">
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-ink">
                  Selected flagship systems.
                </h2>
                <span className="meta-label text-muted tabular-nums">
                  {String(visibleFlagships.length).padStart(2, "0")} WORKS
                </span>
              </div>

              <div className="flex flex-col gap-12 md:gap-16">
                {visibleFlagships.map((project) => (
                  <Card
                    key={project.id}
                    id={project.slug}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center border border-hairline bg-paper-soft p-6 sm:p-8 lg:p-10 rounded-none shadow-none hover:shadow-none hover:translate-y-0 hover:border-ink/40"
                  >
                    {/* Left: Frameless Aspect Visual */}
                    <div className="lg:col-span-5 relative w-full aspect-[3/4] overflow-hidden">
                      {project.image && (
                        <SkeletonImage
                          src={project.image}
                          alt={`${project.title} — ${project.subtitle}`}
                          fill
                          sizes="(max-width: 1024px) 100vw, 480px"
                          className="object-contain"
                        />
                      )}
                    </div>

                    {/* Right: Editorial Architecture Dossier */}
                    <div className="lg:col-span-7 flex flex-col justify-between gap-8 h-full">
                      <div className="flex flex-col gap-5">
                        <div className="flex items-center justify-between border-b border-hairline pb-3.5">
                          <span className="font-serif text-2xl sm:text-3xl text-muted tabular-nums">
                            {project.index}
                          </span>
                          <span className="meta-label text-muted">
                            {project.category}
                          </span>
                        </div>

                        <div className="flex flex-col gap-2">
                          <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-ink leading-[1.02]">
                            {project.title}
                          </h3>
                          <p className="font-serif text-xl sm:text-2xl text-ink-soft">
                            {project.subtitle}
                          </p>
                        </div>

                        <p className="body-editorial text-body text-base sm:text-lg leading-relaxed max-w-[62ch]">
                          {project.description}
                        </p>

                        {/* Clean Hairline Proof Register */}
                        <div className="border-t border-hairline divide-y divide-hairline">
                          {project.proof.map((p, pIdx) => (
                            <div
                              key={pIdx}
                              className="py-2.5 flex items-baseline gap-4 font-mono text-xs sm:text-sm text-ink-soft"
                            >
                              <span className="text-muted tabular-nums">
                                0{pIdx + 1}
                              </span>
                              <span>{p}</span>
                            </div>
                          ))}
                        </div>

                        {/* Stack */}
                        <div className="flex flex-wrap gap-2 pt-1">
                          {project.stack.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 text-xs font-mono border border-hairline bg-paper text-ink-soft"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-hairline">
                        <Magnet padding={36} magnetStrength={5}>
                          <Link
                            href={`/work/${project.slug}`}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-pill bg-ink text-on-ink hover:bg-ink-soft text-xs font-mono font-semibold tracking-wider uppercase transition-colors min-h-[44px]"
                          >
                            <span>READ CASE STUDY</span>
                            <span aria-hidden="true">→</span>
                          </Link>
                        </Magnet>

                        {project.links.live && (
                          <a
                            href={project.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-5 py-3 rounded-pill border border-hairline-strong hover:border-ink bg-paper text-ink text-xs font-mono font-medium uppercase tracking-wider transition-colors min-h-[44px]"
                          >
                            <span>LIVE SYSTEM</span>
                            <span aria-hidden="true">↗</span>
                          </a>
                        )}

                        {project.links.marketplace && (
                          <a
                            href={project.links.marketplace}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-5 py-3 rounded-pill border border-hairline-strong hover:border-ink bg-paper text-ink text-xs font-mono font-medium uppercase tracking-wider transition-colors min-h-[44px]"
                          >
                            <span>MARKETPLACE</span>
                            <span aria-hidden="true">↗</span>
                          </a>
                        )}

                        {project.links.repo && (
                          <a
                            href={project.links.repo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-3 text-muted hover:text-ink text-xs font-mono uppercase tracking-wider transition-colors min-h-[44px]"
                          >
                            <span>SOURCE</span>
                            <span aria-hidden="true">↗</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Visual Editorial Spread (only when viewing all) */}
          {filter === "all" && (
            <div className="relative w-full aspect-[2000/1126] overflow-hidden">
              <SkeletonImage
                src="https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/08-project-shots/all-projects.webp"
                alt="Projects Built by Nishant Unavane"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1440px) 90vw, 1344px"
                className="object-contain sm:object-cover"
              />
            </div>
          )}

          {/* Part II: Field Notes & Experiments */}
          {visibleExperiments.length > 0 && (
            <section className="flex flex-col gap-10 md:gap-14">
              <div className="flex items-baseline justify-between border-b border-hairline pb-4">
                <div className="flex flex-col gap-2">
                  <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-ink">
                    Smaller boats.
                  </h2>
                  <p className="body-editorial text-body text-base sm:text-lg max-w-[62ch]">
                    Side projects, tools and experiments that didn&apos;t need to become companies.
                  </p>
                </div>
                <span className="meta-label text-muted tabular-nums shrink-0">
                  {String(visibleExperiments.length).padStart(2, "0")} WORKS
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {visibleExperiments.map((exp) => (
                  <Card
                    key={exp.slug}
                    className="rounded-none border border-hairline bg-paper-soft shadow-none hover:shadow-none hover:translate-y-0 hover:border-ink/40"
                  >
                    <div>
                      <CardHeader className="p-6 pb-4 flex flex-col gap-4">
                        <div className="flex items-baseline justify-between border-b border-hairline pb-3">
                          <span className="font-serif text-xl text-muted tabular-nums">
                            {exp.index}
                          </span>
                          <span className="meta-label text-muted">{exp.category}</span>
                        </div>

                        {exp.image && (
                          <div className="relative w-full aspect-[3/4] overflow-hidden">
                            <SkeletonImage
                              src={exp.image}
                              alt={exp.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                              className="object-contain"
                            />
                          </div>
                        )}

                        <CardTitle className="font-serif text-2xl sm:text-3xl font-normal text-ink pt-1">
                          {exp.title}
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="px-6 py-2">
                        <p className="body-sm text-body leading-relaxed">
                          {exp.description}
                        </p>
                      </CardContent>
                    </div>

                    <CardFooter className="px-6 pt-5 pb-6 mt-4 border-t border-hairline flex items-center justify-between gap-3">
                      <Magnet padding={28} magnetStrength={6}>
                        <Link
                          href={`/work/${exp.slug}`}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-pill bg-ink text-on-ink hover:bg-ink-soft text-xs font-mono font-semibold tracking-wider uppercase transition-colors min-h-[40px]"
                        >
                          <span>READ CASE STUDY</span>
                          <span aria-hidden="true">→</span>
                        </Link>
                      </Magnet>
                      {(exp.links.live || exp.links.marketplace || exp.links.repo) && (
                        <a
                          href={exp.links.live || exp.links.marketplace || exp.links.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-wider font-medium text-muted hover:text-ink transition-colors py-2 min-h-[40px]"
                        >
                          <span>EXPLORE</span>
                          <span aria-hidden="true">↗</span>
                        </a>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
