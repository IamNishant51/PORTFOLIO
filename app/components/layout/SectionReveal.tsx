"use client";

import { useRef, useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE, DURATION } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

type RevealDirection = "up" | "down" | "left" | "right" | "scale" | "none";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  direction?: RevealDirection;
  distance?: number;
  duration?: number;
  delay?: number;
  start?: string;
  end?: string;
  stagger?: boolean;
  staggerAmount?: number;
  once?: boolean;
}

const directionConfig: Record<
  RevealDirection,
  { from: gsap.TweenVars; to: gsap.TweenVars }
> = {
  up: { from: { y: 60, opacity: 0 }, to: { y: 0, opacity: 1 } },
  down: { from: { y: -60, opacity: 0 }, to: { y: 0, opacity: 1 } },
  left: { from: { x: -80, opacity: 0 }, to: { x: 0, opacity: 1 } },
  right: { from: { x: 80, opacity: 0 }, to: { x: 0, opacity: 1 } },
  scale: { from: { scale: 0.85, opacity: 0 }, to: { scale: 1, opacity: 1 } },
  none: { from: { opacity: 0 }, to: { opacity: 1 } },
};

export default function SectionReveal({
  children,
  className = "",
  direction = "up",
  distance = 60,
  duration = DURATION.slow,
  delay = 0,
  start = "top 85%",
  end = "bottom 20%",
  stagger = false,
  staggerAmount = 0.08,
  once = true,
}: SectionRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const config = directionConfig[direction];
    const fromVars = { ...config.from };
    if (direction === "up" || direction === "down") {
      fromVars.y = (config.from.y as number) * (distance / 60);
    }
    if (direction === "left" || direction === "right") {
      fromVars.x = (config.from.x as number) * (distance / 60);
    }

    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduceMotion) {
        gsap.set(stagger ? el.children : el, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          clearProps: "transform",
        });
        return;
      }

      if (stagger) {
        const targets = Array.from(el.children);
        const animation = gsap.fromTo(
          targets,
          fromVars,
          {
            ...config.to,
            duration,
            delay,
            stagger: staggerAmount,
            ease: EASE.power3.out,
            paused: true,
            immediateRender: false,
          }
        );

        ScrollTrigger.create({
          trigger: el,
          start,
          end,
          ...(once ? { once: true } : {}),
          animation,
        });
      } else {
        ScrollTrigger.create({
          trigger: el,
          start,
          end,
          ...(once ? { once: true } : {}),
          animation: gsap.fromTo(el, fromVars, {
            ...config.to,
            duration,
            delay,
            ease: EASE.power3.out,
          }),
        });
      }
    });

    return () => ctx.revert();
  }, [direction, distance, duration, delay, start, end, stagger, staggerAmount, once]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
