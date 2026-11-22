"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export function Cursor() {
  const [visible, setVisible] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isProject, setIsProject] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Disable on coarse pointers, touch, or reduced motion
    const isCoarse = window.matchMedia("(pointer: coarse), (hover: none)").matches;
    const isNotFine = !window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isCoarse || isNotFine || prefersReducedMotion) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const projectArticle = target.closest("article");
      const interactive = target.closest("a, button, [role='button']");

      if (projectArticle) {
        setIsProject(true);
        setIsHovered(true);
        setCursorText("VIEW");
      } else if (interactive) {
        setIsProject(false);
        setIsHovered(true);
        setCursorText("");
      } else {
        setIsProject(false);
        setIsHovered(false);
        setCursorText("");
      }
    };

    const onMouseLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    // Smooth lerping loop for the outer ring
    let animationFrameId: number;
    const loop = () => {
      const lerpFactor = 0.18;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerpFactor;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerpFactor;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      animationFrameId = requestAnimationFrame(loop);
    };
    animationFrameId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="custom-cursor-element pointer-events-none fixed inset-0 z-50 overflow-hidden"
      aria-hidden="true"
    >
      {/* Precision 6px ink dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2 h-2 rounded-full bg-ink -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-opacity duration-quick ${
          isProject ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Trailing 32px / 64px Morphing Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 flex items-center justify-center rounded-full pointer-events-none transition-all duration-300 ${
          isProject
            ? "w-16 h-16 bg-paper-edge/90 border border-terracotta text-ink shadow-lg scale-100"
            : isHovered
            ? "w-12 h-12 bg-paper-soft/50 border border-ink/80 scale-100"
            : "w-8 h-8 bg-transparent border border-ink/40 scale-100"
        }`}
      >
        {isProject && (
          <span
            ref={textRef}
            className="meta-label text-[0.625rem] text-terracotta font-semibold tracking-[0.2em]"
          >
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
}
