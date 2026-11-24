"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { capabilities } from "@/content/capabilities";
import { ActHeader } from "@/components/primitives/ActHeader";
import { PlateFrame } from "@/components/primitives/PlateFrame";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
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
      // 1. 4 Disciplines cards staggered entrance
      if (cardsContainerRef.current) {
        const cards = cardsContainerRef.current.children;
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 40,
            scale: 0.98,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.12,
            duration: 0.85,
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
          headlineRegular="Four columns "
          headlineItalic="hold"
          headlineSuffix=" it up."
          sub="Every project I ship sits on the same four disciplines."
        />

        {/* 4 Architectural Discipline Columns */}
        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7 pt-2"
        >
          {capabilities.map((item, idx) => (
            <Card
              key={item.numeral}
              className="group relative flex flex-col justify-between overflow-hidden border border-hairline bg-paper-soft/75 hover:bg-paper hover:border-hairline-strong transition-all duration-calm hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(26,24,21,0.06)] rounded-xs"
            >
              {/* Subtle top architectural highlight */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-transparent group-hover:bg-terracotta/80 transition-colors duration-calm" />

              <div>
                <CardHeader className="p-7 sm:p-8 pb-4 flex flex-col gap-5">
                  <div className="flex items-baseline justify-between border-b border-hairline/60 pb-3">
                    <span className="font-serif text-3xl sm:text-4xl text-ink/80 group-hover:text-terracotta transition-colors duration-calm tabular-nums">
                      {item.numeral}
                    </span>
                    <span className="meta-label text-muted text-[0.625rem] tracking-[0.2em] group-hover:text-ink-soft transition-colors">
                      COLUMN · 0{idx + 1}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1.5 pt-1">
                    <CardTitle className="font-serif text-2xl sm:text-3xl font-normal text-ink group-hover:translate-x-0.5 transition-transform duration-calm">
                      {item.discipline}
                    </CardTitle>
                    <CardDescription className="meta-label text-[0.6875rem] text-terracotta/90 tracking-[0.14em] font-medium leading-relaxed">
                      {item.technologies}
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="px-7 sm:px-8 py-2">
                  <p className="body-editorial text-body text-[0.9375rem] leading-[1.65]">
                    {item.line}
                  </p>
                </CardContent>
              </div>

              <CardFooter className="px-7 sm:px-8 pt-4 pb-6 mt-4 border-t border-hairline/60 flex items-center justify-between text-muted">
                <span className="meta-label text-[0.625rem] tracking-[0.18em]">
                  DISCIPLINE
                </span>
                <span className="font-serif text-sm text-muted group-hover:text-terracotta group-hover:translate-x-1 transition-all duration-calm">
                  →
                </span>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Bottom study frame */}
        <div ref={capitalPlateRef} className="flex justify-end pt-4 will-change-transform">
          <div className="w-full sm:w-72">
            <PlateFrame caption="PLATE 02 — CAPITAL STUDY · 1920×1080">
              <div className="relative w-full h-36 overflow-hidden group">
                <Image
                  src="https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/03-act2-colonnade/a2-engraving-detail.webp"
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
