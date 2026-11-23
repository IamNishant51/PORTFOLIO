"use client";

import Link from "next/link";
import ScrollExpand from "@/components/ui/ScrollExpand";

export function LandingProjectsSection() {
  const sectionTitle = (
    <div className="pointer-events-auto">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 px-7 py-3 rounded-pill border border-hairline-strong bg-paper/95 backdrop-blur-md text-ink hover:border-terracotta hover:text-terracotta shadow-md transition-all font-mono text-xs font-bold uppercase tracking-wider active:scale-95"
      >
        <span>ALL PROJECTS</span>
        <span className="font-serif text-sm">→</span>
      </Link>
    </div>
  );

  return (
    <section
      id="work"
      className="relative w-full bg-paper-static overflow-visible scroll-mt-20 sm:scroll-mt-24"
      aria-label="Act 03: Selected Work & Projects"
    >
      <ScrollExpand
        src="https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/08-project-shots/all-projects.webp"
        mobileSrc="https://ik.imagekit.io/9pfz6g8ri/projects-for-mobile-devices.png?tr=w-828,q-80,f-webp"
        alt="All Projects Built by Nishant Unavane"
        title={sectionTitle}
        scrollHint="SCROLL TO EXPAND · CLICK TO ENTER"
        useWindowScroll
        startWidth={58}
        mobileStartWidth={88}
        startHeight={64}
        mobileStartHeight={70}
        startRadius={16}
        endRadius={0}
        mediaZoom={1.15}
        scrollDistance={1.2}
        holdDistance={0.35}
        overlayScrim={0}
      >
        <div className="pointer-events-auto">
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
