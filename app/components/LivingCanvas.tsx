"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { reducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export default function LivingCanvas() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion || !ref.current) return;

    const el = ref.current;
    const state = { hue: 0 };

    gsap.to(state, {
      hue: 360,
      duration: 120,
      ease: "none",
      repeat: -1,
      onUpdate: () => {
        el.style.background = [
          "radial-gradient(",
          `ellipse 70% 60% at 50% 0%,`,
          `rgba(255,255,255,0.025) 0%,`,
          "transparent 70%",
          ")"
        ].join(" ");
      },
    });

    ScrollTrigger.create({
      onUpdate: (self) => {
        const progress = self.progress;
        const opacity = 0.02 + progress * 0.04;
        el.style.opacity = String(opacity);
      },
    });
  }, []);

  return (
    <div
      ref={ref}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.03 }}
      aria-hidden="true"
    />
  );
}
