"use client";

import React, { useCallback, createContext, useContext, useState, useEffect, useRef, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";

interface TransitionContextValue {
  navigate: (href: string) => void;
  isTransitioning: boolean;
}

const TransitionContext = createContext<TransitionContextValue>({
  navigate: () => { },
  isTransitioning: false,
});

export function usePageTransition() {
  return useContext(TransitionContext);
}

export default function TransitionLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const [isTransitioning, setIsTransitioning] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const prevPathname = useRef(pathname);

  useEffect(() => {
    gsap.set(panelRef.current, { y: "100%" });
  }, []);

  /* Reveal on route change */
  useEffect(() => {
    if (pathname !== prevPathname.current) {
      prevPathname.current = pathname;
      gsap.to(panelRef.current, {
        y: "100%",
        duration: 0.45,
        ease: "power3.inOut",
        onComplete: () => {
          setIsTransitioning(false);
          gsap.set(panelRef.current, { y: "100%" });
        },
      });
    }
  }, [pathname]);

  const navigate = useCallback(
    (href: string) => {
      if (href === pathname || isTransitioning) return;
      setIsTransitioning(true);

      gsap.fromTo(panelRef.current,
        { y: "100%" },
        {
          y: "0%",
          duration: 0.35,
          ease: "power3.inOut",
          onComplete: () => router.push(href),
        }
      );
    },
    [pathname, router, isTransitioning]
  );

  return (
    <TransitionContext.Provider value={{ navigate, isTransitioning }}>
      <div
        ref={panelRef}
        className="fixed inset-0 z-[999999] pointer-events-none"
        style={{
          background: "#0c0c0b",
          transform: "translateY(100%)",
          willChange: "transform",
        }}
        aria-hidden="true"
      />
      <div className="relative">{children}</div>
    </TransitionContext.Provider>
  );
}
