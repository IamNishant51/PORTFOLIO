import { useRef, useCallback } from "react";
import gsap from "gsap";
import { reducedMotion } from "@/lib/motion";

export function useMagnetic(strength = 0.25) {
  const ref = useRef<HTMLElement>(null);

  const onMove = useCallback((e: MouseEvent) => {
    if (reducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    gsap.to(ref.current, { x, y, duration: 0.3, ease: "power2.out" });
  }, [strength]);

  const onLeave = useCallback(() => {
    if (!ref.current) return;
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
  }, []);

  const bind = {
    ref,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
  };

  return bind;
}
