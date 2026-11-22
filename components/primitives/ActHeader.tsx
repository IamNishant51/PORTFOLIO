"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface ActHeaderProps {
  actNumber: string; // e.g. "02"
  label: string; // e.g. "THE FOUNDATION"
  coordinates?: string; // e.g. "18°31'12\"N 73°51'22\"E"
  headlineRegular: string; // e.g. "Four columns "
  headlineItalic: string; // e.g. "hold"
  headlineSuffix?: string; // e.g. " it up."
  sub?: string;
  className?: string;
}

export function ActHeader({
  actNumber,
  label,
  coordinates,
  headlineRegular,
  headlineItalic,
  headlineSuffix = "",
  sub,
  className = "",
}: ActHeaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hairlineRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      // Hairline draws across
      if (hairlineRef.current) {
        gsap.fromTo(
          hairlineRef.current,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Title reveals smoothly
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.1,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Subtitle
      if (subRef.current) {
        gsap.fromTo(
          subRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.2,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={`flex flex-col gap-8 ${className}`}>
      {/* Meta row with 1px hairline rule */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between meta-label">
          <span>
            ACT {actNumber} / 06 · {label}
          </span>
          {coordinates && (
            <span className="hidden sm:inline text-muted/80">{coordinates}</span>
          )}
        </div>
        <div ref={hairlineRef} className="w-full h-[1px] bg-hairline" />
      </div>

      {/* Display headline: display-xl with one italic word */}
      <div className="flex flex-col gap-4">
        <h2 ref={titleRef} className="display-xl text-ink font-normal will-change-transform">
          {headlineRegular}
          <em className="italic font-serif">{headlineItalic}</em>
          {headlineSuffix}
        </h2>
        {sub && (
          <p ref={subRef} className="body-editorial text-body will-change-transform">
            {sub}
          </p>
        )}
      </div>
    </div>
  );
}
