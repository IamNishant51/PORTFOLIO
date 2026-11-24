"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap, ScrollTrigger } from "./gsap";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

let activeLenis: Lenis | null = null;
let pendingSectionId: string | null = null;

export function getLenis(): Lenis | null {
  return activeLenis;
}

export function setPendingSection(id: string | null): void {
  pendingSectionId = id;
}

export function scrollToSection(id: string): void {
  const el = document.getElementById(id);
  if (!el) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (activeLenis && !prefersReducedMotion) {
    activeLenis.scrollTo(el, {
      offset: -80,
      duration: 0.85,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    return;
  }

  const top = el.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({
    top: Math.max(0, top),
    behavior: prefersReducedMotion ? "auto" : "smooth",
  });
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();
  const isFirstRouteRef = useRef(true);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      lerp: 0.125,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 1.25,
      touchMultiplier: 1.5,
      autoResize: true,
      stopInertiaOnNavigate: true,
    });
    lenisRef.current = lenis;
    activeLenis = lenis;
    window.__lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Smooth scroll intercept for same-page anchor links (#studio, /#work, etc.)
    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement | null)?.closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || !href.includes("#")) return;

      const url = new URL(anchor.href, window.location.origin);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname) {
        return;
      }
      const hash = url.hash;
      if (hash.length <= 1) return;

      const el = document.querySelector(hash);
      if (el instanceof HTMLElement) {
        e.preventDefault();
        lenis.scrollTo(el, {
          offset: -80,
          duration: 0.85,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      }
    };
    document.addEventListener("click", handleAnchorClick);

    const onFontsReady = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };
    if (document.fonts) {
      document.fonts.ready.then(onFontsReady);
    }

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
      if (activeLenis === lenis) {
        activeLenis = null;
      }
      delete window.__lenis;
    };
  }, []);

  // Re-sync Lenis dimensions & GSAP ScrollTrigger on every Next.js route transition
  useEffect(() => {
    const lenis = lenisRef.current;
    const pendingId = pendingSectionId;

    if (isFirstRouteRef.current) {
      isFirstRouteRef.current = false;
      return;
    }

    const runSync = () => {
      lenis?.resize();
      if (pendingId && pathname === "/") {
        pendingSectionId = null;
        scrollToSection(pendingId);
      } else {
        const hash = window.location.hash;
        if (hash && hash.length > 1) {
          const target = document.querySelector(hash);
          if (target instanceof HTMLElement) {
            lenis?.scrollTo(target, {
              offset: -80,
              duration: 0.85,
              easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
          }
        } else {
          lenis?.scrollTo(0, { immediate: true });
        }
      }
      ScrollTrigger.refresh();
    };

    const rafId = requestAnimationFrame(() => {
      // Allow client sub-sections one extra frame if navigating back to /
      if (pendingId && !document.getElementById(pendingId)) {
        requestAnimationFrame(runSync);
        return;
      }
      runSync();
    });

    return () => cancelAnimationFrame(rafId);
  }, [pathname]);

  return <>{children}</>;
}
