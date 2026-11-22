"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { projects } from "@/content/projects";
import { ActHeader } from "@/components/primitives/ActHeader";
import { ProjectRow } from "@/components/primitives/ProjectRow";
import { PlateFrame } from "@/components/primitives/PlateFrame";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function Act03Temple() {
  const featured = projects[0]; // Custom-PI
  const sectionRef = useRef<HTMLElement>(null);
  const featuredCardRef = useRef<HTMLDivElement>(null);
  const rowsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Featured Custom-PI Card Entrance
      if (featuredCardRef.current) {
        gsap.fromTo(
          featuredCardRef.current,
          { opacity: 0, y: 50, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: featuredCardRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative min-h-[100svh] w-full py-32 md:py-40 lg:py-48 bg-paper-soft overflow-hidden"
      aria-label="Act 03: Selected Work"
    >
      <div className="relative z-20 max-w-[1440px] mx-auto w-full px-6 md:px-12 flex flex-col gap-16 md:gap-20">
        <ActHeader
          actNumber="03"
          label="SELECTED WORK"
          headlineRegular="Four things I built, "
          headlineItalic="and still"
          headlineSuffix=" maintain."
          sub="Flagship autonomous coding systems, memory infrastructure, and VS Code extensions."
        />

        {/* Featured Flagship Highlight: Custom-PI framed inside museum plate */}
        {featured && (
          <div
            ref={featuredCardRef}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-paper/95 backdrop-blur-md border border-hairline p-7 sm:p-9 md:p-11 lg:p-12 rounded-xs shadow-sm will-change-transform"
          >
            <div className="lg:col-span-6 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="meta-label text-terracotta font-semibold">
                  FLAGSHIP SYSTEM
                </span>
                <span className="meta-label text-muted">· {featured.category}</span>
              </div>
              <h3 className="display-lg text-ink font-normal">{featured.title}</h3>
              <p className="font-serif italic text-xl text-ink-soft">
                {featured.subtitle}
              </p>
              <p className="body-editorial text-body text-[0.9375rem] leading-relaxed">
                {featured.description}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {featured.proof.map((p, idx) => (
                  <span
                    key={idx}
                    className="meta-label text-[0.6875rem] px-2.5 py-1 bg-paper-edge border border-hairline text-ink-soft rounded-xs"
                  >
                    ✓ {p}
                  </span>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-5 pt-3">
                <a
                  href={featured.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-pill bg-ink text-on-ink text-sm font-medium hover:bg-ink-soft transition-colors min-h-[44px] shadow-sm group"
                >
                  <span>Launch Custom-PI</span>
                  <span
                    className="transition-transform duration-standard group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </a>
                <a
                  href={featured.links.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="meta-label text-ink hover:text-terracotta transition-colors py-2 px-2 inline-flex items-center justify-center min-h-[44px]"
                >
                  VIEW REPOSITORY ↗
                </a>
              </div>
            </div>

            {/* Custom-PI Architecture Plate Study */}
            <div className="lg:col-span-6 w-full flex justify-center items-center min-w-0">
              <div className="w-full max-w-[460px] min-w-0">
                <PlateFrame caption="PLATE 03 — ARCHITECTURAL STUDY · CUSTOM-PI AUTONOMOUS RUNTIME">
                  <div className="relative w-full aspect-[2/3] overflow-hidden group rounded-xs bg-paper-edge shadow-inner">
                    <Image
                      src={featured.image || "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/04-act3-temple/a3-custom-pi-plate.webp"}
                      alt="Classical architectural plate detailing the Custom-PI autonomous agent runtime architecture"
                      fill
                      sizes="(max-width: 1024px) 100vw, 460px"
                      className="object-contain p-2 transition-transform duration-slow group-hover:scale-102"
                    />
                  </div>
                </PlateFrame>
              </div>
            </div>
          </div>
        )}

        {/* Editorial Project Rows Header */}
        <div className="flex items-center justify-between pt-4 border-b border-hairline pb-3">
          <span className="meta-label text-ink-soft tracking-[0.2em]">
            CATALOGUE · ALL FOUR SYSTEMS
          </span>
          <span className="meta-label text-muted text-[0.6875rem]">
            01 — 04
          </span>
        </div>

        {/* Editorial Project Rows */}
        <div ref={rowsContainerRef} className="flex flex-col -mt-4">
          {projects.map((project) => (
            <ProjectRow
              key={project.id}
              project={project}
              fallbackPlate="https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/04-act3-temple/a3-temple-plate.webp"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
