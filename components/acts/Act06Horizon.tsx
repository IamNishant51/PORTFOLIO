"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { profile } from "@/content/profile";
import { gsap, ScrollTrigger } from "@/lib/gsap";

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

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Background Caspar David Friedrich horizon plate zoom
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
      className="relative min-h-[100svh] w-full pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-10 md:pb-12 bg-paper overflow-hidden flex flex-col justify-between"
      aria-label="Act 06: The Horizon and Footer"
    >
      {/* Background Caspar David Friedrich golden evening horizon plate */}
      <div
        ref={plateRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-35 z-0 scale-[1.04] will-change-transform"
      >
        <Image
          src="/assets/07-act6-horizon/a6-horizon-plate.webp"
          alt="Caspar David Friedrich golden evening horizon landscape with warm glowing sky"
          fill
          sizes="100vw"
          className="object-cover object-bottom"
        />
      </div>

      {/* Birds drifting in flight */}
      <div
        ref={birdsRef}
        className="absolute right-4 sm:right-16 top-16 md:top-24 w-24 h-18 sm:w-32 sm:h-24 md:w-36 md:h-28 pointer-events-none z-10 opacity-80 will-change-transform"
        aria-hidden="true"
      >
        <Image
          src="/assets/07-act6-horizon/a6-birds.webp"
          alt=""
          fill
          sizes="144px"
          className="object-contain"
        />
      </div>

      {/* Main Closing Section */}
      <div className="relative z-20 max-w-[1440px] mx-auto w-full px-6 md:px-12 flex flex-col gap-6 md:gap-8">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between meta-label">
            <span>ACT 06 / 06 · THE HORIZON</span>
            <span className="hidden sm:inline">INVITATION</span>
          </div>
          <div className="w-full h-[1px] bg-hairline" />
        </div>

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

              <p className="body-editorial text-body text-base sm:text-lg max-w-[54ch]">
                Open to full-stack and creative-engineering roles. Based in Pune,
                working remotely.
              </p>
            </div>

            {/* Email & Links */}
            <div className="flex flex-col gap-4 sm:gap-5 pt-8 sm:pt-10 md:pt-12">
              <div>
                <a
                  href={`mailto:${profile.email}`}
                  className="font-serif text-2xl sm:text-3xl md:text-4xl lg:display-lg text-ink hover:text-terracotta transition-colors duration-hoverIn underline decoration-hairline-strong underline-offset-8 break-all inline-block hover:translate-x-1 transition-transform"
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
                  className="meta-label text-ink hover:text-terracotta transition-colors text-xs font-semibold py-2 px-2.5 -my-1 -mx-1 inline-flex items-center min-h-[40px]"
                >
                  GITHUB ↗
                </a>
                <span className="text-hairline-strong hidden sm:inline">/</span>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="meta-label text-ink hover:text-terracotta transition-colors text-xs font-semibold py-2 px-2.5 -my-1 -mx-1 inline-flex items-center min-h-[40px]"
                >
                  LINKEDIN ↗
                </a>
                <span className="text-hairline-strong hidden sm:inline">/</span>
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="meta-label text-ink hover:text-terracotta transition-colors text-xs font-semibold py-2 px-2.5 -my-1 -mx-1 inline-flex items-center min-h-[40px]"
                >
                  RÉSUMÉ ↗
                </a>
              </div>
            </div>
          </div>

          {/* Right: Interactive 3D Lanyard Card */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] h-[360px] sm:h-[400px] md:h-[440px] lg:h-[460px] relative">
              <Lanyard
                frontImage="/assets/02-act1-arrival/hero-editorial-pass.webp"
                backImage="/assets/02-act1-arrival/hero-spiderman.webp"
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
            </div>
            <p className="meta-label text-muted text-[0.625rem] tracking-wider mt-1 text-center select-none">
              ( EDITORIAL METALLIC PASS · DRAG TO SWING · CLICK TO REVEAL SPIDER-MAN )
            </p>
          </div>
        </div>
      </div>

      {/* 4-Column Editorial Footer */}
      <div className="relative z-20 max-w-[1440px] mx-auto w-full px-6 md:px-12 mt-8 sm:mt-12 md:mt-14 pt-6 sm:pt-8 border-t border-hairline">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-[0.875rem]">
          {/* Col 1: Identity */}
          <div className="flex flex-col gap-2">
            <span className="meta-label text-muted">IDENTITY</span>
            <p className="font-serif text-lg text-ink">{profile.name}</p>
            <p className="body-sm text-body">{profile.location}</p>
            <p className="body-sm text-body">{profile.status}</p>
          </div>

          {/* Col 2: Navigate */}
          <div className="flex flex-col gap-2">
            <span className="meta-label text-muted">NAVIGATE</span>
            <nav className="flex flex-col gap-1.5" aria-label="Footer navigation">
              <a href="#arrival" className="hover:text-terracotta transition-colors py-1">
                Arrival (Hero)
              </a>
              <a href="#colonnade" className="hover:text-terracotta transition-colors py-1">
                Disciplines
              </a>
              <a href="#work" className="hover:text-terracotta transition-colors py-1">
                Selected Work
              </a>
              <a href="#studio" className="hover:text-terracotta transition-colors py-1">
                The Studio
              </a>
            </nav>
          </div>

          {/* Col 3: Elsewhere */}
          <div className="flex flex-col gap-2">
            <span className="meta-label text-muted">ELSEWHERE</span>
            <div className="flex flex-col gap-1.5">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-terracotta transition-colors py-1"
              >
                GitHub Profile ↗
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-terracotta transition-colors py-1"
              >
                LinkedIn Profile ↗
              </a>
              <Link href="/colophon" className="hover:text-terracotta transition-colors py-1">
                Site Colophon
              </Link>
            </div>
          </div>

          {/* Col 4: Colophon & Copyright */}
          <div className="flex flex-col justify-between gap-4">
            <div className="flex flex-col gap-2">
              <span className="meta-label text-muted">COLOPHON</span>
              <p className="body-sm text-body">{profile.colophon}</p>
            </div>
            <p className="meta-label text-muted text-[0.625rem]">
              {profile.copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
