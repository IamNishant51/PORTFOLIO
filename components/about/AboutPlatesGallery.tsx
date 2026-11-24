"use client";

import { useState, useRef, useEffect } from "react";
import { aboutData, AboutPlate } from "@/content/about";
import { PlateFrame } from "@/components/primitives/PlateFrame";
import { SkeletonImage } from "@/components/primitives/SkeletonImage";
import { Reveal } from "@/components/primitives/Reveal";
import { gsap } from "@/lib/gsap";

export function AboutPlatesGallery() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activePlate = aboutData.plates[activeIdx];
  const inspectorImageRef = useRef<HTMLDivElement>(null);
  const inspectorMetaRef = useRef<HTMLDivElement>(null);

  // GSAP crossfade transition on plate change
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    if (inspectorImageRef.current) {
      gsap.fromTo(
        inspectorImageRef.current,
        { opacity: 0.6, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.45, ease: "power2.out" }
      );
    }
    if (inspectorMetaRef.current) {
      gsap.fromTo(
        inspectorMetaRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
      );
    }
  }, [activeIdx]);

  return (
    <section className="relative w-full py-16 sm:py-24 border-b border-hairline bg-paper">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 flex flex-col gap-10">
        {/* Master Exhibition Showcase: Two-column Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Main Inspector Plate Display (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4" ref={inspectorImageRef}>
            <PlateFrame
              caption={`${activePlate.plate} · ${activePlate.title.toUpperCase()} · ARCHIVES`}
              aspectRatio="3/4"
            >
              <SkeletonImage
                src={activePlate.src}
                alt={`${activePlate.title} — ${activePlate.subtitle}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 720px"
                className="object-cover transition-transform duration-700 hover:scale-[1.02]"
                priority
              />
            </PlateFrame>
          </div>

          {/* Plate Dossier & Filmstrip Selector (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {/* Active Plate Detailed Metadata */}
            <div
              ref={inspectorMetaRef}
              className="flex flex-col p-6 bg-paper-edge border border-hairline-strong rounded-xs gap-4 shadow-[0_4px_24px_rgba(26,24,21,0.04)]"
            >
              <div className="flex items-center justify-between meta-label text-[0.6875rem] border-b border-hairline pb-3">
                <span className="text-terracotta font-mono font-bold">{activePlate.plate}</span>
                <span className="text-muted font-mono">{activePlate.year} EDITION</span>
              </div>

              <div>
                <h3 className="font-serif text-3xl sm:text-4xl text-ink leading-[1.05]">
                  {activePlate.title}
                </h3>
                <p className="font-sans text-[0.875rem] text-terracotta font-medium mt-1">
                  {activePlate.subtitle}
                </p>
              </div>

              <div className="w-full h-[1px] bg-hairline" />

              <div className="flex flex-col gap-2 font-mono text-[0.8125rem]">
                <div className="flex justify-between">
                  <span className="text-muted text-[0.6875rem]">MEDIUM</span>
                  <span className="text-ink text-right text-[0.75rem] max-w-[240px]">
                    {activePlate.medium}
                  </span>
                </div>
                <div className="flex justify-between items-baseline pt-1">
                  <span className="text-muted text-[0.6875rem]">SUBJECT</span>
                  <span className="text-ink text-[0.75rem]">Authentic Photo Cutout</span>
                </div>
              </div>

              <p className="body-sm text-body text-[0.875rem] leading-relaxed pt-2 border-t border-hairline">
                {activePlate.description}
              </p>

              {/* Tag Badges */}
              <div className="flex flex-wrap gap-2 pt-2">
                {activePlate.tags.map((tag) => (
                  <span
                    key={tag}
                    className="meta-label text-[0.625rem] px-2.5 py-1 bg-paper border border-hairline-strong rounded-full text-ink"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Filmstrip / Thumbnail Selector */}
            <div className="flex flex-col gap-3">
              <span className="meta-label text-[0.6875rem] text-muted">
                SELECT PLATE TO INSPECT:
              </span>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-2.5">
                {aboutData.plates.map((plate, idx) => {
                  const isSelected = idx === activeIdx;
                  return (
                    <button
                      key={plate.id}
                      type="button"
                      onClick={() => setActiveIdx(idx)}
                      className={`relative aspect-[3/4] overflow-hidden transition-all cursor-pointer group focus-visible:outline-ink focus-visible:outline-2 ${
                        isSelected
                          ? "opacity-100 scale-[1.03]"
                          : "opacity-65 hover:opacity-100"
                      }`}
                      aria-label={`Select ${plate.plate}: ${plate.title}`}
                    >
                      <SkeletonImage
                        src={plate.src}
                        alt=""
                        fill
                        sizes="120px"
                        className="object-cover"
                      />
                      <span className="absolute bottom-1 left-1 right-1 bg-paper/90 backdrop-blur-xs text-[0.5625rem] font-mono text-center py-0.5 text-ink rounded-xs font-semibold">
                        {plate.plate}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* All 6 Plates Side-by-Side Exhibition Grid */}
        <div className="flex flex-col gap-6 pt-12 border-t border-hairline">
          <div className="flex items-center justify-between meta-label text-[0.6875rem] text-muted">
            <span>COMPLETE CATALOGUE VIEW</span>
            <span>6 PLATES IN REGISTER</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
            {aboutData.plates.map((plate, idx) => (
              <div
                key={plate.id}
                onClick={() => setActiveIdx(idx)}
                className="cursor-pointer group flex flex-col gap-2"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <SkeletonImage
                    src={plate.src}
                    alt={plate.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="meta-label text-terracotta text-[0.625rem]">
                    {plate.plate}
                  </span>
                  <span className="font-serif text-lg text-ink leading-tight group-hover:text-terracotta transition-colors">
                    {plate.title}
                  </span>
                  <span className="meta-label text-muted text-[0.5625rem] truncate mt-0.5">
                    {plate.subtitle}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
