"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { profile } from "@/content/profile";
import { PlateFrame } from "@/components/primitives/PlateFrame";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function Act01Arrival() {
  const containerRef = useRef<HTMLElement>(null);
  const skyRef = useRef<HTMLDivElement>(null);
  const cloudsFarRef = useRef<HTMLDivElement>(null);
  const heronRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const portraitWrapperRef = useRef<HTMLDivElement>(null);
  const introTlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Entrance timeline: Line-by-line clip wipe for Instrument Serif headline
      introTlRef.current = gsap.timeline({
        paused: true,
      });
      const introTl = introTlRef.current;

      if (line1Ref.current && line2Ref.current) {
        introTl
          .fromTo(
            line1Ref.current,
            { yPercent: 120, rotateX: 25, opacity: 0 },
            {
              yPercent: 0,
              rotateX: 0,
              opacity: 1,
              duration: 1.1,
              ease: "power4.out",
            }
          )
          .fromTo(
            line2Ref.current,
            { yPercent: 120, rotateX: 25, opacity: 0 },
            {
              yPercent: 0,
              rotateX: 0,
              opacity: 1,
              duration: 1.1,
              ease: "power4.out",
            },
            "-=0.85"
          );
      }

      if (subRef.current) {
        introTl.fromTo(
          subRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.6"
        );
      }

      if (ctasRef.current) {
        introTl.fromTo(
          ctasRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          "-=0.5"
        );
      }

      if (portraitWrapperRef.current) {
        introTl.fromTo(
          portraitWrapperRef.current,
          { opacity: 0, y: 28, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 1.0, ease: "power3.out" },
          "-=0.6"
        );
      }

      // 2. Scroll-driven multiplane camera choreography
      const mm = gsap.matchMedia();

      // Mobile
      mm.add("(max-width: 767px)", () => {
        if (skyRef.current) {
          gsap.to(skyRef.current, {
            scale: 1.1,
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 0.8,
            },
          });
        }
        if (cloudsFarRef.current) {
          gsap.to(cloudsFarRef.current, {
            yPercent: -12,
            xPercent: 4,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 0.8,
            },
          });
        }
        if (contentRef.current) {
          gsap.to(contentRef.current, {
            y: -30,
            opacity: 0.25,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "30% top",
              end: "bottom top",
              scrub: 0.8,
            },
          });
        }
      });

      // Desktop
      mm.add("(min-width: 768px)", () => {
        if (skyRef.current) {
          gsap.to(skyRef.current, {
            scale: 1.18,
            yPercent: 14,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 0.8,
            },
          });
        }
        if (cloudsFarRef.current) {
          gsap.to(cloudsFarRef.current, {
            yPercent: -28,
            xPercent: 12,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 0.8,
            },
          });
        }
        if (heronRef.current) {
          gsap.to(heronRef.current, {
            xPercent: 45,
            yPercent: -35,
            rotate: 8,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 0.8,
            },
          });
        }
        if (contentRef.current) {
          gsap.to(contentRef.current, {
            y: -70,
            opacity: 0.15,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "35% top",
              end: "bottom top",
              scrub: 0.8,
            },
          });
        }
      });
    }, containerRef);

    // Handoff from Preloader
    const handleFlightStart = () => {
      introTlRef.current?.play();
    };

    window.addEventListener("preloader-flight-start", handleFlightStart);
    window.addEventListener("preloader-docked", handleFlightStart);

    return () => {
      window.removeEventListener("preloader-flight-start", handleFlightStart);
      window.removeEventListener("preloader-docked", handleFlightStart);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="arrival"
      ref={containerRef}
      className="relative min-h-[100svh] w-full bg-paper-static overflow-hidden flex flex-col justify-between pt-[88px] pb-16"
      style={{
        backgroundColor: "#FBF8F2",
        // Enforce static tokens for hero section — immune to any dynamic musical color changes
        ["--color-paper" as string]: "#FBF8F2",
        ["--color-paper-soft" as string]: "#FBF8F2",
        ["--color-paper-edge" as string]: "#E7DFCE",
        ["--color-hairline" as string]: "#DED6C6",
        ["--color-hairline-strong" as string]: "#C9BEA8",
        ["--color-ink" as string]: "#1A1815",
        ["--color-ink-soft" as string]: "#3D3931",
        ["--color-on-ink" as string]: "#FBF8F2",
        ["--color-body" as string]: "#4A463D",
        ["--color-muted" as string]: "#8A8375",
      }}
      aria-label="Act 01: Arrival"
    >
      {/* Background Constable painted sky plate */}
      <div
        ref={skyRef}
        className="absolute inset-0 -top-16 -bottom-16 w-full h-[120%] pointer-events-none z-0 scale-[1.04] will-change-transform"
      >
        <Image
          src="https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/02-act1-arrival/a1-sky-plate.webp"
          alt="John Constable atmospheric sky study with warm horizon and luminous cloud banks"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top opacity-95"
        />
      </div>

      {/* Cloud layer: Far (bottom-left) */}
      <div
        ref={cloudsFarRef}
        className="absolute -bottom-8 -left-12 w-[320px] sm:w-[480px] md:w-[650px] h-[200px] sm:h-[300px] md:h-[380px] pointer-events-none z-10 opacity-80 will-change-transform"
        aria-hidden="true"
      >
        <Image
          src="https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/02-act1-arrival/a1-clouds-far.webp"
          alt=""
          fill
          sizes="(max-width: 768px) 480px, 650px"
          className="object-contain"
        />
      </div>

      {/* Heron floating top right */}
      <div
        ref={heronRef}
        className="absolute top-20 md:top-28 right-6 md:right-[12%] w-16 h-16 sm:w-20 sm:h-20 md:w-32 md:h-32 pointer-events-none z-10 opacity-85 will-change-transform"
        aria-hidden="true"
      >
        <Image
          src="https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/02-act1-arrival/a1-heron.webp"
          alt=""
          fill
          sizes="(max-width: 768px) 80px, 128px"
          className="object-contain"
        />
      </div>

      {/* Content Container: Asymmetric 12-column layout */}
      <div
        ref={contentRef}
        className="relative z-20 max-w-[1440px] mx-auto w-full px-6 md:px-12 flex-1 flex flex-col justify-end"
      >
        {/* Main Content Grid: H1 baseline lands at ~65% */}
        <div className="pt-20 md:pt-32 lg:pt-36 pb-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          {/* Main Title & Subtitle */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <h1 className="display-mega text-ink font-normal leading-[0.92]">
              <span className="block overflow-hidden pb-1">
                <span ref={line1Ref} className="block will-change-transform">
                  Software,
                </span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span ref={line2Ref} className="block will-change-transform">
                  made by <em className="italic font-serif">hand.</em>
                </span>
              </span>
            </h1>

            <p
              ref={subRef}
              className="body-editorial text-body text-lg md:text-xl max-w-[58ch] leading-relaxed"
            >
              Full-stack developer and agentic systems engineer. I build interfaces,
              developer tools, and the coding agents that use them.
            </p>

            {/* CTAs and Footnote */}
            <div
              ref={ctasRef}
              className="flex flex-wrap items-center gap-4 sm:gap-5 pt-2"
            >
              <a
                href="#work"
                className="inline-flex items-center justify-center px-6 py-3 rounded-pill bg-[#1A1815] text-[#FBF8F2] font-medium text-[0.875rem] hover:bg-[#3D3931] transition-all min-h-[44px] shadow-sm group"
              >
                <span>View the work</span>
                <span
                  className="ml-2 font-serif text-sm transition-transform duration-standard group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  →
                </span>
              </a>

              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-5 py-3 rounded-pill border border-[#C9BEA8] hover:border-[#1A1815] bg-transparent text-[#1A1815] font-medium text-[0.875rem] transition-all hover:bg-[#FBF8F2] min-h-[44px]"
              >
                <span>Résumé</span>
                <span className="ml-1 text-xs" aria-hidden="true">
                  ↗
                </span>
              </a>

              <div className="w-full sm:w-auto mt-2 sm:mt-0 flex flex-wrap sm:flex-nowrap items-baseline gap-2">
                <span className="meta-label text-muted text-[0.6875rem] whitespace-nowrap">
                  ( 2027 )
                </span>
                <span className="meta-label text-ink-soft text-[0.6875rem] tracking-[0.16em]">
                  Currently building Custom-PI · 10,340 downloads across shipped tools
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Optical Prism Portrait Plate */}
          <div
            ref={portraitWrapperRef}
            className="lg:col-span-5 flex justify-center lg:justify-end pb-2 pt-6 lg:pt-0 will-change-transform"
          >
            <div className="w-full max-w-[320px] sm:max-w-[360px] md:max-w-[400px] lg:max-w-[430px]">
              <PlateFrame aspectRatio="3/4" className="[&>div]:!bg-[#E7DFCE] [&>div]:!border-[#C9BEA8]">
                <Image
                  src="https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/02-act1-arrival/hero-slit-portrait.webp"
                  alt="Optical prism slit-scan portrait of Nishant Unavane with quote: Not every unanswered question needs an immediate answer, some clarity takes living."
                  fill
                  priority
                  sizes="(max-width: 768px) 360px, 430px"
                  className="object-cover"
                />
              </PlateFrame>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
