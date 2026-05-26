"use client";

import { useRef, useEffect, useState, useCallback, createContext, useContext, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { EASE } from "@/lib/motion";

interface TransitionContextValue {
  navigate: (href: string) => void;
  isTransitioning: boolean;
}

const TransitionContext = createContext<TransitionContextValue>({
  navigate: () => {},
  isTransitioning: false,
});

export function usePageTransition() {
  return useContext(TransitionContext);
}

export default function TransitionLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  const playReveal = useCallback(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    gsap.set(overlay, {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      display: "block",
    });
    gsap.to(overlay, {
      clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
      duration: 0.5,
      ease: EASE.power4.inOut,
      delay: 0.1,
      onComplete: () => {
        gsap.set(overlay, { display: "none" });
      },
    });
  }, []);

  const navigate = useCallback(
    (href: string) => {
      if (href === pathname || isTransitioning) return;

      setIsTransitioning(true);
      const overlay = overlayRef.current;

      if (overlay) {
        gsap.set(overlay, {
          clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
          display: "block",
        });

        gsap.to(overlay, {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 0.5,
          ease: EASE.power4.inOut,
          onComplete: () => {
            router.push(href);
          },
        });
      } else {
        router.push(href);
      }
    },
    [pathname, isTransitioning, router]
  );

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    playReveal();
    const timer = setTimeout(() => setIsTransitioning(false), 600);
    return () => clearTimeout(timer);
  }, [pathname, playReveal]);

  return (
    <TransitionContext.Provider value={{ navigate, isTransitioning }}>
      <div className="relative">
        {children}
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[99999] bg-black pointer-events-none"
          style={{ display: "none", clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" }}
        />
      </div>
    </TransitionContext.Provider>
  );
}
