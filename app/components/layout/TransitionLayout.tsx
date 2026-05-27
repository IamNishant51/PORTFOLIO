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
  const columnsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  // Track the previous pathname to detect actual route changes
  const prevPathname = useRef(pathname);

  // Initialize columns out of view (at the bottom)
  useEffect(() => {
    gsap.set(columnsRef.current, { y: "100%" });
  }, []);

  // When pathname changes (after router.push completes and the new page mounts)
  useEffect(() => {
    // If we've landed on a new path, trigger the reveal (In) animation
    if (pathname !== prevPathname.current) {
      prevPathname.current = pathname;
      
      // The columns are currently covering the screen (y: 0%).
      // Animate them out through the top (y: "-100%").
      gsap.to(columnsRef.current, {
        y: "-100%",
        duration: 0.85,
        stagger: 0.04,
        ease: "expo.inOut",
        onComplete: () => {
          setIsTransitioning(false);
          // Reset them to the bottom invisibly for the next transition
          gsap.set(columnsRef.current, { y: "100%" });
        }
      });
    }
  }, [pathname]);

  const navigate = useCallback(
    (href: string) => {
      // Prevent transitions to the same page or interrupting an active transition
      if (href === pathname || isTransitioning) return;
      
      setIsTransitioning(true);

      // Animate columns in from the bottom (100% -> 0%)
      gsap.fromTo(columnsRef.current, 
        { y: "100%" },
        {
          y: "0%",
          duration: 0.85,
          stagger: 0.04,
          ease: "expo.inOut",
          onComplete: () => {
            // Once the screen is fully black, safely push the new route
            router.push(href);
          }
        }
      );
    },
    [pathname, router, isTransitioning]
  );

  return (
    <TransitionContext.Provider value={{ navigate, isTransitioning }}>
      {/* 
        The overlay container must be fixed with incredibly high z-index.
        pointer-events-none ensures it doesn't block clicks when inactive.
      */}
      <div 
        className="fixed inset-0 z-[999999] flex pointer-events-none"
        aria-hidden="true"
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            ref={(el) => {
               if (el) columnsRef.current[i] = el;
            }}
            className="h-full bg-[#0c0c0b]"
            style={{ 
              width: "20%", // 5 columns = 100%
              willChange: "transform",
              transform: "translateY(100%)" // start hidden at bottom
            }}
          />
        ))}
      </div>
      <div className="relative">
        {children}
      </div>
    </TransitionContext.Provider>
  );
}
