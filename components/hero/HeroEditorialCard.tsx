"use client";

import Image from "next/image";

export function HeroEditorialCard() {
  return (
    <div
      id="hero-card-target"
      className="relative w-[290px] sm:w-[340px] md:w-[380px] lg:w-[410px] aspect-[1/1.42] rounded-3xl overflow-hidden border border-hairline-strong/80 shadow-[0_16px_50px_rgba(26,24,21,0.12)] bg-paper-soft select-none transition-transform duration-500 hover:-translate-y-1"
      aria-label="Editorial poster of Nishant Unavane"
    >
      {/* Ticket Perforations / Dashed Inset Borders */}
      <div className="absolute inset-y-4 left-3 w-[1px] border-l-2 border-dashed border-ink/20 pointer-events-none" />
      <div className="absolute inset-y-4 right-3 w-[1px] border-r-2 border-dashed border-ink/20 pointer-events-none" />

      {/* Top Header Tag & Monogram Stamp */}
      <div className="absolute top-5 inset-x-7 flex items-center justify-between z-10">
        <span className="font-mono text-[0.6875rem] tracking-[0.24em] uppercase text-ink-soft font-semibold">
          EST. 2027
        </span>

        {/* Graphic stamp icon */}
        <div className="w-8 h-8 rounded-full border border-ink/30 flex items-center justify-center bg-paper text-ink font-mono text-[0.6875rem] font-bold shadow-xs">
          <span>NJ</span>
        </div>
      </div>

      {/* Big Standout Display Typography: CRAFT with Terracotta T */}
      <div className="absolute top-10 inset-x-0 flex justify-center items-center pointer-events-none z-10">
        <h2 className="font-serif display-mega font-bold tracking-tight text-ink leading-none">
          CRAF<span className="text-terracotta inline-block">T</span>
        </h2>
      </div>

      {/* Left Side Metadata: Experience & Downloads */}
      <div className="absolute left-6 top-[38%] flex flex-col gap-1 z-20 pointer-events-none font-mono">
        <span className="text-[0.6875rem] uppercase tracking-wider text-muted font-medium">
          METRICS
        </span>
        <span className="text-xs sm:text-sm font-bold text-ink leading-tight">
          10.3K+
        </span>
        <span className="text-[0.6875rem] tracking-wider uppercase text-ink-soft font-medium leading-none">
          DOWNLOADS
        </span>
        <span className="text-xs sm:text-sm font-bold text-ink mt-2 leading-tight">
          4+ YRS
        </span>
        <span className="text-[0.6875rem] tracking-wider uppercase text-ink-soft font-medium leading-none">
          EXPERIENCE
        </span>
      </div>

      {/* Right Side Metadata: Role & Focus */}
      <div className="absolute right-6 top-[34%] flex flex-col items-end gap-1.5 z-20 pointer-events-none font-mono text-right">
        {/* Subtle directional doodle arrow in terracotta */}
        <svg
          className="w-6 h-6 text-terracotta -rotate-45 mb-1"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>

        <span className="text-[0.6875rem] uppercase tracking-wider text-muted font-medium">
          CREATOR
        </span>
        <span className="text-xs sm:text-sm font-bold text-ink uppercase tracking-wide leading-tight">
          NISHANT
          <br />
          UNAVANE
        </span>
        <span className="text-[0.6875rem] tracking-wider uppercase text-ink-soft font-medium mt-1">
          FULL-STACK &
          <br />
          AI AGENTS
        </span>
      </div>

      {/* Terracotta Silhouette Aura Layer behind Nishant */}
      <div className="absolute inset-0 pointer-events-none z-10 translate-x-2.5 translate-y-2 opacity-95">
        <Image
          src="/assets/02-act1-arrival/hero-silhouette-terracotta.webp"
          alt=""
          fill
          sizes="(max-width: 768px) 340px, 410px"
          className="object-contain object-bottom scale-[1.02]"
          aria-hidden="true"
        />
      </div>

      {/* Foreground Cutout Photo */}
      <div className="absolute inset-0 pointer-events-none z-20">
        <Image
          src="/assets/02-act1-arrival/hero-portrait.webp"
          alt="Portrait of Nishant Unavane"
          fill
          priority
          sizes="(max-width: 768px) 340px, 410px"
          className="object-contain object-bottom scale-[1.02]"
        />
      </div>

      {/* Bottom Tag */}
      <div className="absolute bottom-3 inset-x-6 flex items-center justify-between z-30 font-mono text-[0.6875rem] tracking-[0.2em] uppercase text-muted">
        <span>PUNE, IN</span>
        <span className="text-terracotta font-semibold">18°N 73°E</span>
      </div>
    </div>
  );
}
