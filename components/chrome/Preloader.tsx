"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap";

export function Preloader() {
  const pathname = usePathname();
  const [complete, setComplete] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [count, setCount] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run intro preloader on the home landing page
    if (pathname !== "/") {
      setHidden(true);
      setComplete(true);
      document.body.style.overflow = "";
      return;
    }

    // Skip if already seen in this session or reduced motion
    const alreadySeen =
      typeof window !== "undefined" &&
      sessionStorage.getItem("portfolio_intro_seen") === "true";
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (alreadySeen || prefersReducedMotion) {
      setHidden(true);
      setComplete(true);
      document.body.style.overflow = "";
      window.dispatchEvent(new CustomEvent("preloader-flight-start"));
      window.dispatchEvent(new CustomEvent("preloader-docked"));
      return;
    }

    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
    document.body.style.overflow = "hidden";

    // Counter object for GSAP tween
    const counterObj = { val: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem("portfolio_intro_seen", "true");
        document.body.style.overflow = "";
        setComplete(true);
        window.dispatchEvent(new CustomEvent("preloader-flight-start"));
        window.dispatchEvent(new CustomEvent("preloader-docked"));
        setTimeout(() => setHidden(true), 900);
      },
    });

    // 1. Ticking counter 0 -> 100 in ~1.0s
    tl.to(counterObj, {
      val: 100,
      duration: 1.05,
      ease: "power2.inOut",
      onUpdate: () => {
        setCount(Math.round(counterObj.val));
      },
    });

    // 2. Progress bar fills to 100%
    if (progressLineRef.current) {
      tl.to(
        progressLineRef.current,
        {
          scaleX: 1,
          duration: 1.05,
          ease: "power2.inOut",
        },
        0
      );
    }

    // 3. Counter and meta fade out quickly
    if (counterRef.current) {
      tl.to(
        counterRef.current,
        {
          opacity: 0,
          y: -20,
          duration: 0.35,
          ease: "power2.in",
        },
        "-=0.15"
      );
    }

    // 4. Paper curtain lifts up smoothly with architectural ease
    if (curtainRef.current) {
      tl.to(
        curtainRef.current,
        {
          yPercent: -100,
          duration: 0.85,
          ease: "power4.inOut",
        },
        "-=0.05"
      );
    }

    // Skip handler
    const handleSkip = () => {
      tl.kill();
      sessionStorage.setItem("portfolio_intro_seen", "true");
      document.body.style.overflow = "";
      setComplete(true);
      setHidden(true);
      window.dispatchEvent(new CustomEvent("preloader-flight-start"));
      window.dispatchEvent(new CustomEvent("preloader-docked"));
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleSkip();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      tl.kill();
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [pathname]);

  if (pathname !== "/" || hidden) return null;

  const formattedCount = String(count).padStart(2, "0");

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-50 overflow-hidden pointer-events-auto transition-opacity duration-300 ${
        complete ? "pointer-events-none" : ""
      }`}
      aria-label="Site loading sequence"
    >
      {/* Background Curtain Veil */}
      <div
        ref={curtainRef}
        className="absolute inset-0 bg-paper flex flex-col justify-between p-6 sm:p-12 z-0 border-b border-hairline will-change-transform shadow-[0_16px_40px_rgba(26,24,21,0.08)]"
      >
        {/* Top Status Row */}
        <div className="flex items-center justify-between meta-label text-[0.6875rem] text-muted">
          <span className="tracking-[0.24em]">NISHANT UNAVANE · 2027</span>
          <span className="font-mono text-terracotta">INITIALIZING ARCHIVE</span>
        </div>

        {/* Centerpiece: Serif Counter with Hairline Progress Track */}
        <div
          ref={counterRef}
          className="flex flex-col items-center justify-center my-auto gap-4 select-none will-change-transform"
        >
          <span className="meta-label text-terracotta text-[0.6875rem] tracking-[0.3em] uppercase">
            EST. 2006 · PUNE, IN
          </span>

          <div className="flex items-baseline gap-1">
            <span className="font-serif text-7xl sm:text-9xl md:text-[11rem] font-normal text-ink leading-none tracking-tight">
              {formattedCount}
            </span>
            <span className="font-serif text-2xl sm:text-4xl text-muted italic">
              %
            </span>
          </div>

          {/* Hairline Progress Track */}
          <div className="w-48 sm:w-64 h-[2px] bg-hairline rounded-full overflow-hidden mt-2 relative">
            <div
              ref={progressLineRef}
              className="absolute inset-0 bg-terracotta origin-left scale-x-0 will-change-transform"
            />
          </div>

          <p className="font-mono text-[0.625rem] text-muted tracking-widest mt-1 uppercase">
            LOADING ASSETS &amp; NEOCLASSICAL PLATES
          </p>
        </div>

        {/* Bottom Skip Prompt & Coordinates */}
        <div className="flex items-center justify-between meta-label text-[0.6875rem] text-muted">
          <span className="font-mono">PUNE, IN · 18°31&apos;N 73°51&apos;E</span>
          <button
            type="button"
            onClick={() => {
              sessionStorage.setItem("portfolio_intro_seen", "true");
              document.body.style.overflow = "";
              setComplete(true);
              setHidden(true);
              window.dispatchEvent(new CustomEvent("preloader-flight-start"));
              window.dispatchEvent(new CustomEvent("preloader-docked"));
            }}
            className="hover:text-ink transition-colors cursor-pointer py-1 px-3 border border-hairline-strong rounded-xs text-[0.625rem] font-mono"
          >
            ESC · SKIP INTRO ↗
          </button>
        </div>
      </div>
    </div>
  );
}
