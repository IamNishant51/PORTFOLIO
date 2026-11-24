"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { profile } from "@/content/profile";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { PlateFrame } from "@/components/primitives/PlateFrame";

const Lanyard = dynamic(() => import("@/components/ui/Lanyard"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center opacity-30">
      <span className="meta-label text-xs">LOADING ARTIFACT...</span>
    </div>
  ),
});

export function Act06Horizon() {
  const containerRef = useRef<HTMLElement>(null);
  const plateRef = useRef<HTMLDivElement>(null);
  const birdsRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const lanyardTriggerRef = useRef<HTMLDivElement>(null);
  const [lanyardActive, setLanyardActive] = useState(false);

  useEffect(() => {
    const el = lanyardTriggerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setLanyardActive(true);
          observer.disconnect();
        }
      },
      { rootMargin: "350px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // 1. Background footer plate zoom.
      // Mobile uses a gentler zoom: the tall phone footer already crops the
      // plate hard, so a desktop-strength zoom would leave only a sliver.
      // Desktop only. The plate zoom and the birds flight run on the
      // full-bleed desktop plate; on mobile the footer is paper with a
      // framed horizon plate instead (see below), so there is no
      // background plate or birds to animate there.
      mm.add("(min-width: 768px)", () => {
        if (plateRef.current) {
          gsap.to(plateRef.current, {
            scale: 1.18,
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom bottom",
              scrub: 0.8,
            },
          });
        }

        // 2. Birds flight path across the sky
        if (birdsRef.current) {
          gsap.to(birdsRef.current, {
            xPercent: 35,
            yPercent: -18,
            rotate: -4,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom bottom",
              scrub: 0.8,
            },
          });
        }
      });

      // 4. Headline reveal
      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headlineRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      id="contact"
      ref={containerRef}
      className="relative min-h-[100svh] w-full pt-16 sm:pt-20 md:pt-24 pb-[max(2rem,env(safe-area-inset-bottom))] sm:pb-[max(2.5rem,env(safe-area-inset-bottom))] md:pb-[max(3rem,env(safe-area-inset-bottom))] bg-paper-static overflow-hidden flex flex-col justify-between"
      aria-label="Act 06: The Horizon and Footer"
    >
      {/* Background footer plate — desktop only. The 16:9 artwork cannot
          crop to a phone portrait without losing the columns (edges) or
          the peak (centre), so on mobile the footer is clean paper with
          the whole scene framed as a plate at the bottom (see below). */}
      <div
        ref={plateRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-35 z-0 scale-[1.04] will-change-transform hidden md:block"
      >
        <Image
          src="https://ik.imagekit.io/9pfz6g8ri/footer.png"
          alt="Classical stone columns framing a bright mountain valley under a blue sky with doves and wildflowers"
          fill
          sizes="100vw"
          className="object-cover object-bottom"
        />
      </div>

      {/* Birds drifting in flight — desktop only, they belong to the sky */}
      <div
        ref={birdsRef}
        className="absolute right-4 sm:right-16 top-16 md:top-24 w-24 h-18 sm:w-32 sm:h-24 md:w-36 md:h-28 pointer-events-none z-10 opacity-80 will-change-transform hidden md:block"
        aria-hidden="true"
      >
        <Image
          src="https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/07-act6-horizon/a6-birds.webp"
          alt=""
          fill
          sizes="144px"
          className="object-contain"
        />
      </div>

      {/* Main Closing Section */}
      <div className="relative z-20 max-w-[1440px] mx-auto w-full px-6 md:px-12 flex flex-col gap-6 md:gap-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Invitation Copy */}
          <div className="lg:col-span-7 flex flex-col justify-between self-stretch">
            <div className="flex flex-col gap-4 sm:gap-5">
              <h2
                ref={headlineRef}
                className="display-xl text-ink font-normal leading-[0.96] will-change-transform"
              >
                Let&apos;s make something
                <br />
                <em className="italic font-serif">worth keeping.</em>
              </h2>
            </div>

            {/* Email & Links */}
            <div className="flex flex-col gap-4 sm:gap-5 pt-8 sm:pt-10 md:pt-12">
              <div>
                <a
                  href={`mailto:${profile.email}`}
                  className="font-serif text-[1.375rem] min-[400px]:text-2xl sm:text-3xl md:text-4xl lg:display-lg text-ink hover:text-ink-soft underline decoration-hairline-strong underline-offset-8 break-words inline-block hover:translate-x-1 transition-all duration-hoverIn"
                  aria-label={`Send email to ${profile.email}`}
                >
                  {profile.email}
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-3 sm:gap-6 pt-1">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="meta-label text-ink hover:text-terracotta transition-colors text-xs font-semibold py-2 px-2.5 -my-1 -mx-1 inline-flex items-center min-h-[44px]"
                >
                  GITHUB ↗
                </a>
                <span className="text-hairline-strong hidden sm:inline">/</span>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="meta-label text-ink hover:text-terracotta transition-colors text-xs font-semibold py-2 px-2.5 -my-1 -mx-1 inline-flex items-center min-h-[44px]"
                >
                  LINKEDIN ↗
                </a>
                <span className="text-hairline-strong hidden sm:inline">/</span>
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="meta-label text-ink hover:text-terracotta transition-colors text-xs font-semibold py-2 px-2.5 -my-1 -mx-1 inline-flex items-center min-h-[44px]"
                >
                  RÉSUMÉ ↗
                </a>
              </div>
            </div>
          </div>

          {/* Right: Interactive 3D Lanyard Card */}
          <div ref={lanyardTriggerRef} className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] h-[360px] sm:h-[400px] md:h-[440px] lg:h-[460px] relative">
              {lanyardActive ? (
                <Lanyard
                  frontImage="https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/02-act1-arrival/hero-editorial-pass.webp"
                  backImage="https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/02-act1-arrival/hero-spiderman.webp"
                  imageFit="cover"
                  finish="metallic"
                  cardColor="#14181F"
                  strapColor="#11161F"
                  metal="silver"
                  gravity={1}
                  damping={0.55}
                  elasticity={0.48}
                  breeze={0.32}
                  size={0.6}
                  strapLength={0.42}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center border border-hairline-strong bg-paper-edge/30 rounded-xs gap-2">
                  <span className="meta-label text-muted text-xs font-mono">EDITORIAL PASS ARTIFACT</span>
                  <span className="text-[0.625rem] text-muted font-mono tracking-widest">( VIP ACCESS )</span>
                </div>
              )}
            </div>
            <p className="meta-label text-muted text-[0.625rem] tracking-wider mt-1 text-center select-none">
              ( EDITORIAL METALLIC PASS · DRAG TO SWING · CLICK TO REVEAL SPIDER-MAN )
            </p>
          </div>
        </div>
      </div>

      {/* 3-Column Editorial Footer */}
      <div className="relative z-20 max-w-[1440px] mx-auto w-full px-6 md:px-12 mt-8 sm:mt-12 md:mt-14 pt-6 sm:pt-8 border-t border-hairline">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-[0.875rem]">
          {/* Col 1: Identity */}
          <div className="flex flex-col gap-2">
            <span className="meta-label text-muted">IDENTITY</span>
            <p className="font-serif text-lg text-ink">{profile.name}</p>
            <p className="body-sm text-ink-soft font-medium">{profile.location}</p>
            <p className="body-sm text-body">{profile.status}</p>
          </div>

          {/* Col 2: Navigate */}
          <div className="flex flex-col gap-2">
            <span className="meta-label text-muted">NAVIGATE</span>
            <nav className="flex flex-col gap-1.5 font-medium" aria-label="Footer navigation">
              <a href="#arrival" className="text-ink hover:text-ink-soft transition-colors py-1.5">
                Arrival (Hero)
              </a>
              <a href="#work" className="text-ink hover:text-ink-soft transition-colors py-1.5">
                Selected Work
              </a>
              <a href="#studio" className="text-ink hover:text-ink-soft transition-colors py-1.5">
                The Studio
              </a>
            </nav>
          </div>

          {/* Col 3: Elsewhere */}
          <div className="flex flex-col justify-between gap-4">
            <div className="flex flex-col gap-2">
              <span className="meta-label text-muted">ELSEWHERE</span>
              <div className="flex flex-col gap-1.5 font-medium">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink hover:text-ink-soft transition-colors py-1.5"
                >
                  GitHub Profile ↗
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink hover:text-ink-soft transition-colors py-1.5"
                >
                  LinkedIn Profile ↗
                </a>
                <Link href="/colophon" className="text-ink hover:text-ink-soft transition-colors py-1.5">
                  Site Colophon
                </Link>
              </div>
            </div>
            <p className="meta-label text-muted text-[0.625rem]">
              {profile.copyright}
            </p>
          </div>
        </div>
      </div>

      {/* Mobile horizon plate — the whole scene, framed. A phone portrait
          cannot crop the 16:9 artwork without losing the columns or the
          peak, so on mobile the image is shown whole in a museum plate
          instead of as a washed-out background wash. */}
      <div className="relative z-20 mx-auto w-full max-w-[1440px] px-6 mt-10 block md:hidden">
        <PlateFrame
          caption="PLATE 06 — THE HORIZON · COLUMNS OVER THE VALLEY"
          aspectRatio="16/9"
        >
          <div className="relative w-full h-full overflow-hidden">
            <Image
              src="https://ik.imagekit.io/9pfz6g8ri/footer.png"
              alt="Classical stone columns framing a bright mountain valley under a blue sky with doves and wildflowers"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </PlateFrame>
      </div>
    </footer>
  );
}
