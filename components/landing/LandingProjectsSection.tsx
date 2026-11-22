"use client";

import Link from "next/link";
import ScrollExpand from "@/components/ui/ScrollExpand";

export function LandingProjectsSection() {
  const sectionTitle = (
    <div className="flex flex-col items-center text-center gap-3.5 max-w-2xl px-6 py-6 sm:px-8 sm:py-7 rounded-xs bg-paper/90 backdrop-blur-sm border border-hairline/80 shadow-[0_4px_24px_rgba(26,24,21,0.06)] pointer-events-auto">
      <div className="meta-label text-terracotta tracking-[0.2em] font-mono text-xs">
        ACT 03 / 06 · SELECTED WORK & EXPERIMENTS
      </div>
      <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-ink leading-[1.05] tracking-tight">
        A Collection of <em className="italic">Selected</em> Works.
      </h2>
      <p className="body-editorial text-ink-soft text-sm sm:text-base max-w-[50ch] leading-relaxed">
        Four autonomous coding systems, memory infrastructure, and focused developer tools.
      </p>
      <Link
        href="/projects"
        className="mt-1 inline-flex items-center gap-2 px-6 py-2.5 rounded-pill border border-hairline-strong bg-paper text-ink hover:border-terracotta hover:text-terracotta hover:bg-paper-soft transition-colors font-mono text-xs font-semibold uppercase tracking-wider cursor-pointer active:scale-95"
      >
        <span>ALL PROJECTS</span>
        <span className="font-serif text-sm">→</span>
      </Link>
    </div>
  );

  return (
    <section
      id="work"
      className="relative w-full bg-paper-soft overflow-visible scroll-mt-20 sm:scroll-mt-24"
      aria-label="Act 03: Selected Work & Projects"
    >
      <ScrollExpand
        src="/assets/08-project-shots/all-projects.webp"
        alt="All Projects Built by Nishant Unavane"
        title={sectionTitle}
        scrollHint="SCROLL TO EXPAND · CLICK TO ENTER"
        useWindowScroll
        linkHref="/projects"
        startWidth={58}
        startHeight={64}
        startRadius={16}
        endRadius={0}
        mediaZoom={1.2}
        scrollDistance={1.2}
        holdDistance={0.35}
        overlayScrim={0}
      >
        <div className="pointer-events-auto mt-48 sm:mt-64">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-pill border border-hairline-strong bg-paper/95 backdrop-blur-md text-ink hover:border-terracotta hover:text-terracotta shadow-md transition-all font-mono text-xs font-bold uppercase tracking-wider active:scale-95"
          >
            <span>ALL PROJECTS</span>
            <span className="font-serif text-sm">→</span>
          </Link>
        </div>
      </ScrollExpand>
    </section>
  );
}
