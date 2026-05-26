"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Applies scroll-driven letter-spacing animation to headings.
 * Headings tighten as user scrolls down, loosen on scroll up.
 * Returns a ref to attach to any heading element.
 */
export function useScrollTypography() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        letterSpacing: "-0.06em",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "top 30%",
          scrub: true,
        },
      });

      gsap.to(el, {
        letterSpacing: "-0.02em",
        scrollTrigger: {
          trigger: el,
          start: "top 30%",
          end: "bottom 20%",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return ref;
}
