"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { capabilities } from "@/content/capabilities";
import { ActHeader } from "@/components/primitives/ActHeader";
import { PlateFrame } from "@/components/primitives/PlateFrame";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function Act02Colonnade() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const capitalPlateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      // 1. 4 Disciplines cards staggered 3D entrance
      if (cardsContainerRef.current) {
        const cards = cardsContainerRef.current.children;
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 70,
            rotateX: 25,
            transformPerspective: 1000,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            stagger: 0.12,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsContainerRef.current,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 2. Capital study plate unmask
      if (capitalPlateRef.current) {
        gsap.fromTo(
          capitalPlateRef.current,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: capitalPlateRef.current,
              start: "top 88%",
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
      id="colonnade"
      ref={sectionRef}
      className="relative min-h-[100svh] w-full py-32 md:py-40 lg:py-48 bg-paper overflow-hidden flex flex-col justify-center"
      aria-label="Act 02: The Colonnade"
    >
      {/* Main Content */}
      <div className="relative z-20 max-w-[1440px] mx-auto w-full px-6 md:px-12 flex flex-col gap-16 md:gap-20">
        <ActHeader
          actNumber="02"
          label="THE FOUNDATION"
          coordinates="18°31'12&quot;N 73°51'22&quot;E"
          headlineRegular="Four columns "
          headlineItalic="hold"
          headlineSuffix=" it up."
          sub="Every project I ship sits on the same four disciplines."
        />

        {/* 4 Disciplines Grid with 3D Stagger & Hover physics */}
        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 pt-6 border-b border-hairline lg:border-b-0 shadow-sm"
        >
          {capabilities.map((item) => (
            <div
              key={item.numeral}
              className="group flex flex-col gap-4 p-7 sm:p-8 lg:p-9 border-hairline bg-paper/85 backdrop-blur-md border-t first:border-t-0 md:first:border-t-0 md:[&:nth-child(2)]:border-t-0 md:border-t md:[&:nth-child(even)]:border-l lg:border-t-0 lg:border-l lg:first:border-l-0 transition-all duration-calm hover:bg-paper-soft hover:shadow-lg hover:-translate-y-1"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-serif text-3xl md:text-4xl text-ink group-hover:text-terracotta transition-colors">
                  {item.numeral}
                </span>
                <span className="meta-label text-terracotta text-xs font-semibold">
                  DISCIPLINE
                </span>
              </div>

              <h3 className="display-md text-ink font-normal">{item.discipline}</h3>

              <div className="meta-label text-ink-soft text-[0.6875rem] tracking-[0.16em]">
                {item.technologies}
              </div>

              <p className="body-editorial text-body text-[0.9375rem] leading-[1.65] pt-2">
                {item.line}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom study frame */}
        <div ref={capitalPlateRef} className="flex justify-end pt-4 will-change-transform">
          <div className="w-full sm:w-72">
            <PlateFrame caption="PLATE 02 — CAPITAL STUDY · 1920×1080">
              <div className="relative w-full h-36 overflow-hidden group">
                <Image
                  src="/assets/03-act2-colonnade/a2-engraving-detail.webp"
                  alt="Fine architectural engraving study of a classical column capital"
                  fill
                  sizes="288px"
                  className="object-cover transition-transform duration-slow group-hover:scale-105"
                />
              </div>
            </PlateFrame>
          </div>
        </div>
      </div>
    </section>
  );
}
