"use client";

import React, { useEffect, useRef, useState } from "react";

interface MagnetProps {
  children: React.ReactNode;
  padding?: number;
  disabled?: boolean;
  magnetStrength?: number;
  className?: string;
}

/**
 * React Bits Magnet micro-interaction: subtly pulls interactive elements
 * toward fine pointers and resets on leave. Respects reduced-motion.
 */
export function Magnet({
  children,
  padding = 48,
  disabled = false,
  magnetStrength = 4,
  className = "",
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (disabled) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(pointer: fine)").matches
    ) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = Math.abs(cx - e.clientX);
      const dy = Math.abs(cy - e.clientY);

      if (dx < rect.width / 2 + padding && dy < rect.height / 2 + padding) {
        setIsActive(true);
        setPos({
          x: (e.clientX - cx) / magnetStrength,
          y: (e.clientY - cy) / magnetStrength,
        });
      } else {
        setIsActive(false);
        setPos({ x: 0, y: 0 });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [padding, disabled, magnetStrength]);

  return (
    <div ref={ref} className={`inline-block ${className}`}>
      <div
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
          transition: isActive
            ? "transform 0.2s cubic-bezier(0.22, 1, 0.36, 1)"
            : "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {children}
      </div>
    </div>
  );
}
