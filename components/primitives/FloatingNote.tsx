"use client";

import React, { useRef } from "react";
import { gsap } from "@/lib/gsap";

interface FloatingNoteProps {
  glyph?: string; // e.g. "✦" or "§"
  title: string;
  text: string;
  rotation?: number; // e.g. -1.5 or 1.5
  className?: string;
}

export function FloatingNote({
  glyph,
  title,
  text,
  rotation = 1.2,
  className = "",
}: FloatingNoteProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(cardRef.current, {
      rotateY: x * 18,
      rotateX: -y * 18,
      scale: 1.03,
      duration: 0.35,
      ease: "power2.out",
      transformPerspective: 600,
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      scale: 1,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`w-full max-w-[260px] sm:max-w-[280px] p-5 rounded-xl border border-white/80 bg-white/95 md:bg-white/80 backdrop-blur-none md:backdrop-blur-[14px] shadow-[0_24px_60px_-24px_rgba(26,24,21,0.22)] select-none pointer-events-auto transition-shadow duration-standard hover:shadow-[0_32px_70px_-20px_rgba(26,24,21,0.28)] will-change-transform ${className}`}
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        {glyph && (
          <span className="text-terracotta text-sm font-serif leading-none" aria-hidden="true">
            {glyph}
          </span>
        )}
        <span className="meta-label text-ink font-semibold tracking-[0.16em]">
          {title}
        </span>
      </div>
      <p className="body-sm text-ink-soft text-[0.875rem] leading-[1.5]">
        {text}
      </p>
    </div>
  );
}
