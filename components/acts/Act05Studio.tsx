"use client";

import { useEffect, useRef } from "react";
import { profile } from "@/content/profile";
import { methodSteps } from "@/content/method";
import { timeline } from "@/content/timeline";
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
          { opacity: 0, y: 50, scale: 0.96 },
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

      // 3. Timeline items sequential slide
      if (timelineContainerRef.current) {
        const items = timelineContainerRef.current.children;
        gsap.fromTo(
          items,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            stagger: 0.14,
            duration: 0.7,
            ease: "power2.out",
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

        {/* Studio Method: 4 steps in asymmetric grid */}
        <div className="flex flex-col gap-8 pt-6 sm:pt-8">
          <div className="meta-label text-muted tracking-[0.2em]">
            METHOD · FOUR STEPS
          </div>
          <div
            ref={methodContainerRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
          >
            {methodSteps.map((step) => (
              <div
                key={step.step}
                className="group flex flex-col justify-between gap-4 p-6 sm:p-7 lg:p-8 border-t border-hairline bg-paper-soft/90 backdrop-blur-md shadow-sm hover:bg-paper hover:border-terracotta/40 transition-all duration-calm hover:-translate-y-1 rounded-xs"
              >
                <div className="flex flex-col gap-3">
                  <span className="font-serif text-3xl sm:text-4xl text-ink/80 tabular-nums group-hover:text-terracotta transition-colors">
                    {step.step}
                  </span>
                  <h3 className="title-ui text-ink font-medium text-lg">
                    {step.title}
                  </h3>
                  <p className="body-sm text-body leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Record / Timeline: 3 entries in balanced grid */}
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
            className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
          >
            {timeline.map((entry, idx) => (
              <div
                key={idx}
                className="group flex flex-col justify-between gap-4 p-6 sm:p-7 lg:p-8 border-t border-hairline bg-paper-soft/90 backdrop-blur-md shadow-sm hover:bg-paper hover:border-terracotta/40 transition-all duration-calm hover:-translate-y-1 rounded-xs"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="meta-label text-terracotta text-xs font-semibold">
                      {entry.years}
                    </span>
                    <span className="font-mono text-xs text-muted">
                      0{idx + 1}
                    </span>
                  </div>
                  <h4 className="font-serif text-2xl text-ink group-hover:translate-x-1 transition-transform">
                    {entry.title}
                  </h4>
                  <p className="body-sm text-body leading-relaxed">
                    {entry.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
