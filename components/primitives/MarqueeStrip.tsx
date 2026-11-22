"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface MarqueeStripProps {
  items: string[];
}

export function MarqueeStrip({ items }: MarqueeStripProps) {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let xPos = 0;
    let speed = 0.8;
    let targetSpeed = 0.8;

    const onScrollUpdate = (self: ScrollTrigger) => {
      const v = self.getVelocity();
      targetSpeed = 0.8 + Math.abs(v) * 0.0035;
    };

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: onScrollUpdate,
    });

    let rafId: number;
    const ticker = () => {
      // Lerp speed back to resting 0.8
      speed += (targetSpeed - speed) * 0.08;
      targetSpeed += (0.8 - targetSpeed) * 0.04;

      xPos -= speed;
      if (trackRef.current) {
        // Half-width reset
        if (xPos <= -50) {
          xPos = 0;
        }
        trackRef.current.style.transform = `translate3d(${xPos}%, 0, 0)`;
      }
      rafId = requestAnimationFrame(ticker);
    };
    rafId = requestAnimationFrame(ticker);

    return () => {
      cancelAnimationFrame(rafId);
      st.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full py-4 bg-paper-edge border-y border-hairline overflow-hidden select-none"
      aria-label="Technologies and competencies"
    >
      {/* Visually hidden accessible real list */}
      <ul className="sr-only">
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>

      {/* Animated kinetic marquee strip with scroll velocity physics */}
      <div
        className="flex whitespace-nowrap overflow-hidden group"
        aria-hidden="true"
      >
        <div
          ref={trackRef}
          className="flex items-center gap-6 will-change-transform"
        >
          {items.concat(items).concat(items).map((item, idx) => (
            <div key={idx} className="flex items-center gap-6">
              <span className="meta-label text-ink-soft tracking-[0.2em] font-medium text-[0.75rem]">
                {item}
              </span>
              <span className="text-terracotta text-xs" aria-hidden="true">
                ✦
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
