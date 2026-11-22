"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

export function PageTransitionCurtain() {
  const pathname = usePathname();
  const curtainRef = useRef<HTMLDivElement>(null);
  const monogramRef = useRef<HTMLDivElement>(null);
  const isFirstMount = useRef(true);

  useEffect(() => {
    // Skip on first mount so the initial preloader handles arrival
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    if (!curtainRef.current) return;

    const tl = gsap.timeline();
    // Curtain slides down, pauses for instant route render, then sweeps down out of view
    tl.set(curtainRef.current, { yPercent: -100, display: "flex" })
      .to(curtainRef.current, {
        yPercent: 0,
        duration: 0.45,
        ease: "power3.inOut",
      })
      .fromTo(
        monogramRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.25, ease: "power2.out" },
        "-=0.15"
      )
      .to(monogramRef.current, {
        scale: 1.1,
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
        delay: 0.1,
      })
      .to(curtainRef.current, {
        yPercent: 100,
        duration: 0.5,
        ease: "power3.inOut",
      })
      .set(curtainRef.current, { display: "none" });

    return () => {
      tl.kill();
    };
  }, [pathname]);

  return (
    <div
      ref={curtainRef}
      className="fixed inset-0 z-[100] bg-paper border-b-2 border-hairline-strong hidden flex-col items-center justify-center pointer-events-none select-none"
      aria-hidden="true"
    >
      <div
        ref={monogramRef}
        className="flex flex-col items-center gap-3 opacity-0"
      >
        <div className="w-12 h-12 flex items-center justify-center border border-hairline-strong rounded-xs bg-paper-edge shadow-md">
          <Image
            src="https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/09-brand/monogram.svg"
            alt=""
            width={24}
            height={24}
            className="w-6 h-6"
          />
        </div>
        <span className="meta-label tracking-[0.24em] text-ink font-semibold text-xs">
          NISHANT UNAVANE · 2027
        </span>
      </div>
    </div>
  );
}
