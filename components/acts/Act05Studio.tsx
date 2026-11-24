"use client";

import { useEffect, useRef } from "react";
import { profile } from "@/content/profile";
import { methodSteps } from "@/content/method";
import { timeline } from "@/content/timeline";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function Act05Studio() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsContainerRef = useRef<HTMLDivElement>(null);
  const methodContainerRef = useRef<HTMLDivElement>(null);
  const timelineContainerRef = useRef<HTMLDivElement>(null);

  const stat0Ref = useRef<HTMLSpanElement>(null);
  const stat1Ref = useRef<HTMLSpanElement>(null);
  const stat2Ref = useRef<HTMLSpanElement>(null);
  const stat3Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Animated Counter tweens for stats
      const statsRefs = [stat0Ref, stat1Ref, stat2Ref, stat3Ref];
      const statsTargets = [
        { val: 10340, format: (n: number) => Math.round(n).toLocaleString() },
        { val: 4458, format: (n: number) => Math.round(n).toLocaleString() },
        { val: 3, format: (n: number) => Math.round(n).toString() },
        { val: 100, format: (n: number) => Math.round(n) + "%" },
      ];

      ScrollTrigger.create({
        trigger: statsContainerRef.current,
        start: "top 82%",
        onEnter: () => {
          statsTargets.forEach((item, idx) => {
            const targetEl = statsRefs[idx]?.current;
            if (!targetEl) return;
            const obj = { count: 0 };
            gsap.to(obj, {
              count: item.val,
              duration: 1.8,
              ease: "power2.out",
              onUpdate: () => {
                targetEl.textContent = item.format(obj.count);
              },
            });
          });
        },
        once: true,
      });

      // 2. Staggered Method Steps entrance
      if (methodContainerRef.current) {
        const cards = methodContainerRef.current.children;
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.12,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: methodContainerRef.current,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 3. Timeline items sequential entrance
      if (timelineContainerRef.current) {
        const items = timelineContainerRef.current.children;
        gsap.fromTo(
          items,
          { opacity: 0, y: 40, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.14,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: timelineContainerRef.current,
              start: "top 85%",
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
      id="studio"
      ref={sectionRef}
      className="relative min-h-[100svh] w-full py-28 sm:py-36 md:py-44 bg-paper text-ink overflow-hidden"
      aria-label="Act 05: The Studio"
    >
      <div className="relative z-20 max-w-[1440px] mx-auto w-full px-6 md:px-12 flex flex-col gap-16 md:gap-20">
        {/* Header */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="display-xl text-ink font-normal">
              How the work <em className="italic font-serif">gets made.</em>
            </h2>
            <p className="body-editorial text-body text-lg max-w-[62ch]">
              {profile.positioning}
            </p>
          </div>
        </div>

        {/* 4 Animated Stats figures */}
        <div
          ref={statsContainerRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-2"
        >
          <div className="flex flex-col gap-2 pt-4 border-t border-hairline">
            <span
              ref={stat0Ref}
              className="numeral text-ink tracking-tight tabular-nums"
            >
              10,340
            </span>
            <span className="meta-label text-muted text-[0.6875rem]">
              COMMUNITY DOWNLOADS
            </span>
          </div>

          <div className="flex flex-col gap-2 pt-4 border-t border-hairline">
            <span
              ref={stat1Ref}
              className="numeral text-ink tracking-tight tabular-nums"
            >
              4,458
            </span>
            <span className="meta-label text-muted text-[0.6875rem]">
              NPM DOWNLOADS
            </span>
          </div>

          <div className="flex flex-col gap-2 pt-4 border-t border-hairline">
            <span
              ref={stat2Ref}
              className="numeral text-ink tracking-tight tabular-nums"
            >
              3
            </span>
            <span className="meta-label text-muted text-[0.6875rem]">
              SHIPPED TOOLS MAINTAINED
            </span>
          </div>

          <div className="flex flex-col gap-2 pt-4 border-t border-hairline">
            <span
              ref={stat3Ref}
              className="numeral text-ink tracking-tight tabular-nums"
            >
              100%
            </span>
            <span className="meta-label text-muted text-[0.6875rem]">
              OWNERSHIP FROM DB TO MOTION
            </span>
          </div>
        </div>

        {/* Studio Method: 4 steps in grid using shadcn Card */}
        <div className="flex flex-col gap-8 pt-6 sm:pt-8">
          <div className="meta-label text-muted tracking-[0.2em]">
            METHOD · FOUR STEPS
          </div>
          <div
            ref={methodContainerRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7"
          >
            {methodSteps.map((step, idx) => (
              <Card
                key={step.step}
                className="group relative flex flex-col justify-between overflow-hidden border border-hairline bg-paper-soft/75 hover:bg-paper hover:border-hairline-strong transition-all duration-calm hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(26,24,21,0.06)] rounded-xs"
              >
                {/* Subtle top architectural highlight */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-transparent group-hover:bg-terracotta/80 transition-colors duration-calm" />

                <div>
                  <CardHeader className="p-6 sm:p-7 pb-3 flex flex-col gap-4">
                    <div className="flex items-baseline justify-between border-b border-hairline/60 pb-3">
                      <span className="font-serif text-3xl sm:text-4xl text-ink/80 group-hover:text-terracotta transition-colors duration-calm tabular-nums">
                        {step.step}
                      </span>
                      <span className="meta-label text-muted text-[0.625rem] tracking-[0.2em]">
                        PHASE · 0{idx + 1}
                      </span>
                    </div>
                    <CardTitle className="font-serif text-xl sm:text-2xl font-normal text-ink leading-snug group-hover:translate-x-0.5 transition-transform duration-calm">
                      {step.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="px-6 sm:px-7 py-2">
                    <p className="body-sm text-body leading-relaxed">
                      {step.body}
                    </p>
                  </CardContent>
                </div>

                <CardFooter className="px-6 sm:px-7 pt-3 pb-5 mt-3 border-t border-hairline/60 flex items-center justify-between text-muted">
                  <span className="meta-label text-[0.625rem] tracking-[0.16em]">
                    PRACTICE
                  </span>
                  <span className="font-mono text-xs text-muted/80">
                    0{idx + 1} / 04
                  </span>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Record / Timeline: 3 entries in balanced grid using shadcn Card */}
        <div className="flex flex-col gap-8 pt-6 sm:pt-8">
          <div className="flex items-center justify-between border-b border-hairline pb-3">
            <span className="meta-label text-muted tracking-[0.2em]">
              RECORD · TIMELINE
            </span>
            <span className="meta-label text-muted text-[0.6875rem]">
              2022 — PRESENT
            </span>
          </div>

          <div
            ref={timelineContainerRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7"
          >
            {timeline.map((entry, idx) => (
              <Card
                key={idx}
                className="group relative flex flex-col justify-between overflow-hidden border border-hairline bg-paper-soft/75 hover:bg-paper hover:border-hairline-strong transition-all duration-calm hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(26,24,21,0.06)] rounded-xs"
              >
                {/* Subtle top architectural highlight */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-transparent group-hover:bg-terracotta/80 transition-colors duration-calm" />

                <div>
                  <CardHeader className="p-6 sm:p-7 pb-3 flex flex-col gap-4">
                    <div className="flex items-baseline justify-between border-b border-hairline/60 pb-3">
                      <span className="meta-label text-terracotta text-xs font-semibold tracking-wider">
                        {entry.years}
                      </span>
                      <span className="font-mono text-xs text-muted">
                        0{idx + 1}
                      </span>
                    </div>
                    <CardTitle className="font-serif text-2xl text-ink font-normal leading-snug group-hover:translate-x-0.5 transition-transform duration-calm">
                      {entry.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="px-6 sm:px-7 py-2">
                    <p className="body-sm text-body leading-relaxed">
                      {entry.body}
                    </p>
                  </CardContent>
                </div>

                <CardFooter className="px-6 sm:px-7 pt-3 pb-5 mt-3 border-t border-hairline/60 flex items-center justify-between text-muted">
                  <span className="meta-label text-[0.625rem] tracking-[0.16em]">
                    EXPERIENCE
                  </span>
                  <span className="font-serif text-sm text-muted group-hover:text-terracotta group-hover:translate-x-1 transition-all duration-calm">
                    →
                  </span>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
