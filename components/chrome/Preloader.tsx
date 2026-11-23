"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

const COLUMNS = [
  { id: "01", name: "SYSTEMS", label: "NISHANT UNAVANE" },
  { id: "02", name: "INTERFACES", label: "PUNE, IN" },
  { id: "03", name: "COGNITION", label: "18°31'N 73°51'E" },
  { id: "04", name: "2027", label: "STUDIO ARCHIVE" },
];

export function Preloader() {
  const pathname = usePathname();
  const [complete, setComplete] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [percent, setPercent] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<(HTMLDivElement | null)[]>([]);
  const titleLine1Ref = useRef<HTMLHeadingElement>(null);
  const titleLine2Ref = useRef<HTMLHeadingElement>(null);
  const apertureRef = useRef<HTMLDivElement>(null);
  const apertureImgRef = useRef<HTMLDivElement>(null);
  const tensReelRef = useRef<HTMLDivElement>(null);
  const onesReelRef = useRef<HTMLDivElement>(null);
  const archCurveRef = useRef<SVGPathElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const completedRef = useRef(false);

  useEffect(() => {
    // Only run on homepage landing
    if (pathname !== "/") {
      setHidden(true);
      setComplete(true);
      document.body.style.overflow = "";
      return;
    }

    // Return visits in the same session skip the full ~3.3s show.
    // A first visit in a session still plays the whole preloader.
    try {
      if (sessionStorage.getItem("preloader-seen")) {
        setHidden(true);
        setComplete(true);
        document.body.style.overflow = "";
        return;
      }
    } catch {}

    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
    document.body.style.overflow = "hidden";

    // Setup subtle luxury tick audio
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
        if (audioCtxRef.current.state === "suspended") {
          audioCtxRef.current.resume().catch(() => {});
        }
      }
    } catch {}

    const playLuxuryClick = (pitch = 1) => {
      const ctx = audioCtxRef.current;
      if (!ctx || ctx.state !== "running") return;
      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime((720 + Math.random() * 160) * pitch, ctx.currentTime);
        gain.gain.setValueAtTime(0.02, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.035);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.04);
      } catch {}
    };

    let isCancelled = false;

    // Master Exit: The Architectural Colonnade Reveal
    const triggerArchitecturalExit = () => {
      if (completedRef.current) return;
      completedRef.current = true;
      try {
        sessionStorage.setItem("preloader-seen", "1");
      } catch {}
      document.body.style.overflow = "";

      // Dispatch hero handoff right as the shutters start opening
      window.dispatchEvent(new CustomEvent("preloader-flight-start"));
      window.dispatchEvent(new CustomEvent("preloader-docked"));

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          onComplete: () => {
            setComplete(true);
            setHidden(true);
          },
        });

        // 1. Text and Aperture ascend with clip-path wipe
        tl.to(
          [titleLine1Ref.current, titleLine2Ref.current],
          {
            yPercent: -130,
            opacity: 0,
            duration: 0.55,
            stagger: 0.06,
            ease: "power3.in",
          },
          0
        );

        tl.to(
          apertureRef.current,
          {
            scale: 1.12,
            opacity: 0,
            duration: 0.5,
            ease: "power2.in",
          },
          0.05
        );

        // 2. Parabolic elastic arch curve pulls upward
        if (archCurveRef.current) {
          tl.to(
            archCurveRef.current,
            {
              attr: { d: "M 0 0 Q 50 -35 100 0 L 100 100 L 0 100 Z" },
              duration: 0.45,
              ease: "power2.in",
            },
            0.15
          );
        }

        // 3. Staggered vertical Colonnade shutter opening (from center columns to edges!)
        const validCols = columnsRef.current.filter(Boolean);
        tl.to(
          validCols,
          {
            yPercent: -100,
            duration: 0.95,
            stagger: {
              amount: 0.28,
              from: "center",
              ease: "power2.inOut",
            },
            ease: "power4.inOut",
          },
          0.2
        );

        // 4. Final container fade
        if (containerRef.current) {
          tl.to(
            containerRef.current,
            {
              opacity: 0,
              duration: 0.25,
            },
            "-=0.2"
          );
        }
      });

      return () => ctx.revert();
    };

    // Master Entrance Timeline
    const masterTl = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    // 1. Text reveals rising up from overflow hidden masks
    masterTl.fromTo(
      [titleLine1Ref.current, titleLine2Ref.current],
      { yPercent: 130, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.12, ease: "power4.out" },
      0.1
    );

    // 2. Central optical aperture rises & zooms slowly
    masterTl.fromTo(
      apertureRef.current,
      { scale: 0.88, opacity: 0, y: 30 },
      { scale: 1, opacity: 1, y: 0, duration: 1.2, ease: "power3.out" },
      0.2
    );

    if (apertureImgRef.current) {
      masterTl.fromTo(
        apertureImgRef.current,
        { scale: 1.2 },
        { scale: 1.0, duration: 2.2, ease: "power1.out" },
        0.2
      );
    }

    // 3. Odometer Roll Animation
    const counterObj = { val: 0 };
    let lastTick = 0;

    const countTween = gsap.to(counterObj, {
      val: 100,
      duration: 2.1,
      ease: "power2.inOut",
      onUpdate: () => {
        if (isCancelled || completedRef.current) return;
        const currentInt = Math.floor(counterObj.val);
        setPercent(currentInt);

        // Calculate odometer translateY
        const tens = Math.floor(currentInt / 10);
        const ones = currentInt % 10;

        if (tensReelRef.current) {
          tensReelRef.current.style.transform = `translateY(-${(tens / 11) * 100}%)`;
        }
        if (onesReelRef.current) {
          onesReelRef.current.style.transform = `translateY(-${(ones / 10) * 100}%)`;
        }

        // Subtle audio click every 12 counts
        if (currentInt - lastTick >= 12) {
          lastTick = currentInt;
          playLuxuryClick(1.0 + currentInt / 200);
        }
      },
      onComplete: () => {
        if (isCancelled || completedRef.current) return;
        setPercent(100);
        if (tensReelRef.current) tensReelRef.current.style.transform = `translateY(-${(10 / 11) * 100}%)`;
        if (onesReelRef.current) onesReelRef.current.style.transform = `translateY(-0%)`;
        setTimeout(triggerArchitecturalExit, 160);
      },
    });

    // Hard fallback safety timer (3.5s max)
    const safetyTimeout = setTimeout(triggerArchitecturalExit, 3500);

    // Escape key listener for immediate skip
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        countTween.kill();
        masterTl.kill();
        triggerArchitecturalExit();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      isCancelled = true;
      clearTimeout(safetyTimeout);
      countTween.kill();
      masterTl.kill();
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [pathname]);

  if (pathname !== "/" || hidden) return null;

  return (
    <aside
      ref={containerRef}
      onClick={() => {
        if (!completedRef.current) {
          completedRef.current = true;
          try {
            sessionStorage.setItem("preloader-seen", "1");
          } catch {}
          document.body.style.overflow = "";
          window.dispatchEvent(new CustomEvent("preloader-flight-start"));
          window.dispatchEvent(new CustomEvent("preloader-docked"));
          const validCols = columnsRef.current.filter(Boolean);
          gsap.to(validCols, {
            yPercent: -100,
            duration: 0.65,
            stagger: { amount: 0.18, from: "center" },
            ease: "power4.inOut",
            onComplete: () => {
              setComplete(true);
              setHidden(true);
            },
          });
        }
      }}
      className={`fixed inset-0 z-[100] w-screen h-[100dvh] overflow-hidden select-none cursor-pointer bg-transparent ${
        complete ? "pointer-events-none" : "pointer-events-auto"
      }`}
      aria-label="Architectural Colonnade Preloader"
    >
      {/* 4 Architectural Colonnade Columns (The structural shutters that part into the sky) */}
      <div className="absolute inset-0 w-full h-full flex pointer-events-none">
        {COLUMNS.map((col, idx) => (
          <div
            key={col.id}
            ref={(el) => {
              columnsRef.current[idx] = el;
            }}
            className="relative w-1/4 h-full bg-paper border-r border-hairline/60 last:border-r-0 flex flex-col justify-between p-4 sm:p-6 md:p-8 will-change-transform"
          >
            {/* Column Top Architectural Stamp (No overlap, clean responsive) */}
            <div className="flex items-center justify-between font-mono text-[0.6875rem] text-muted tracking-widest">
              <span className="text-terracotta font-semibold">[ {col.id} ]</span>
              <span className="hidden sm:inline text-ink font-medium">{col.name}</span>
            </div>

            {/* Column Bottom Architectural Stamp */}
            <div className="flex items-center justify-between font-mono text-[0.6875rem] text-muted tracking-widest border-t border-hairline/40 pt-3">
              <span className="text-ink font-medium truncate max-w-[90%]">{col.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Parabolic Bottom Curve SVG (Liquid tension pull at exit) */}
      <svg
        className="absolute bottom-0 left-0 w-full h-20 sm:h-28 pointer-events-none fill-paper z-20"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          ref={archCurveRef}
          d="M 0 0 Q 50 0 100 0 L 100 100 L 0 100 Z"
        />
      </svg>

      {/* Floating Kinetic Center Content Layer */}
      <div className="relative z-30 w-full h-full max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16 flex flex-col justify-between py-8 sm:py-10 pointer-events-none">
        {/* Top spacer (keeps grid pure) */}
        <div className="h-6" />

        {/* Central Stage: Kinetic Display Typography & Optical Slit Aperture */}
        <div className="flex flex-col items-center justify-center gap-5 sm:gap-7 my-auto">
          {/* Kinetic Masked Title Line 1 */}
          <div className="overflow-hidden">
            <h1
              ref={titleLine1Ref}
              className="font-serif text-4xl sm:text-6xl md:text-8xl text-ink font-normal leading-[0.92] tracking-tight will-change-transform text-center"
            >
              Software,
            </h1>
          </div>

          {/* Optical Slit-Scan Museum Aperture */}
          <div
            ref={apertureRef}
            className="relative w-28 sm:w-36 md:w-44 h-40 sm:h-52 md:h-64 rounded-xs border border-terracotta/40 bg-paper-edge p-1 shadow-[0_16px_40px_rgba(26,24,21,0.12)] overflow-hidden will-change-transform"
          >
            <div
              ref={apertureImgRef}
              className="relative w-full h-full overflow-hidden rounded-[1px] bg-ink"
            >
              <Image
                src="https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/02-act1-arrival/hero-slit-portrait.webp"
                alt="Optical slit portrait of Nishant Unavane"
                fill
                priority
                sizes="(max-width: 640px) 144px, 176px"
                className="object-cover"
              />
              {/* Subtle glass reflection highlight */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/15 pointer-events-none" />
            </div>

            {/* Aperture Bottom Index Badge */}
            <div className="absolute bottom-1.5 left-1.5 right-1.5 bg-paper/95 backdrop-blur-xs border border-hairline px-2 py-0.5 flex items-center justify-between z-10">
              <span className="font-mono text-[0.6875rem] text-ink font-semibold tracking-wider">
                PORTRAIT 01
              </span>
              <span className="font-mono text-[0.6875rem] text-terracotta font-bold">
                PRISM
              </span>
            </div>
          </div>

          {/* Kinetic Masked Title Line 2 */}
          <div className="overflow-hidden">
            <h2
              ref={titleLine2Ref}
              className="font-serif text-4xl sm:text-6xl md:text-8xl text-ink font-normal leading-[0.92] tracking-tight will-change-transform text-center"
            >
              made by <em className="italic font-serif text-terracotta">hand.</em>
            </h2>
          </div>
        </div>

        {/* Bottom Horizon: Mechanical Slot Odometer Counter + Escape Key */}
        <div className="flex items-end justify-between border-t border-hairline/70 pt-4">
          {/* Mechanical Odometer Counter */}
          <div className="flex items-baseline gap-1.5">
            {/* Digit Reels Window */}
            <div className="flex items-baseline font-serif text-5xl sm:text-7xl md:text-8xl text-ink font-normal leading-none tracking-tight h-[1em] overflow-hidden">
              {/* Tens Reel (0-10) */}
              <div
                ref={tensReelRef}
                className="flex flex-col will-change-transform transition-transform duration-75 ease-out"
              >
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((d) => (
                  <span key={d} className="h-[1em] flex items-center justify-center">
                    {d === 10 ? "10" : d}
                  </span>
                ))}
              </div>

              {/* Ones Reel (0-9) */}
              <div
                ref={onesReelRef}
                className="flex flex-col will-change-transform transition-transform duration-75 ease-out"
              >
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => (
                  <span key={d} className="h-[1em] flex items-center justify-center">
                    {d}
                  </span>
                ))}
              </div>
            </div>

            <span className="font-mono text-terracotta text-sm sm:text-base font-semibold">
              %
            </span>
          </div>

          {/* Interactive Affordance & Authorial Stamp */}
          <div className="flex flex-col items-end gap-1 font-mono text-[0.6875rem] text-muted">
            <span className="text-ink font-semibold tracking-wider">
              {percent < 100 ? "CALIBRATING APPARATUS..." : "EXHIBITION UNVEILING"}
            </span>
            <span className="text-muted/70 tracking-widest">
              [ ESC OR CLICK TO SKIP ↗ ]
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
