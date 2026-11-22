"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface ActHeaderProps {
  actNumber?: string;
  label?: string;
  coordinates?: string;
  headlineRegular: string;
  headlineItalic: string;
  headlineSuffix?: string;
  sub?: string;
  className?: string;
}

export function ActHeader({
  headlineRegular,
  headlineItalic,
  headlineSuffix = "",
  sub,
  className = "",
}: ActHeaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
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
    <div ref={containerRef} className={`flex flex-col gap-6 ${className}`}>
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
