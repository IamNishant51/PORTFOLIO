"use client";

import { useCallback, createContext, useContext, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";

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

  const navigate = useCallback(
    (href: string) => {
      if (href === pathname) return;
      router.push(href);
    },
    [pathname, router]
  );

  return (
    <TransitionContext.Provider value={{ navigate, isTransitioning: false }}>
      <div className="relative">
        {children}
      </div>
    </TransitionContext.Provider>
  );
}
