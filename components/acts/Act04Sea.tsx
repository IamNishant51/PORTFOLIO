"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { experiments } from "@/content/experiments";
import { ActHeader } from "@/components/primitives/ActHeader";
import { gsap } from "@/lib/gsap";

const Grainient = dynamic(() => import("@/components/ui/Grainient"), {
  ssr: false,
});

export function Act04Sea() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      // Staggered card entrance on scroll
      if (cardsRef.current) {
        const items = cardsRef.current.children;
        gsap.fromTo(
          items,
          { opacity: 0, y: 70, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.15,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="sea"
      ref={containerRef}
      className="relative min-h-[100svh] w-full py-32 md:py-40 lg:py-48 bg-paper overflow-hidden flex flex-col justify-center"
      aria-label="Act 04: The Sea"
    >
      <div className="relative z-20 max-w-[1440px] mx-auto w-full px-6 md:px-12 flex flex-col gap-16 md:gap-20">
        <ActHeader
          headlineRegular="Smaller "
          headlineItalic="boats."
          headlineSuffix=""
          sub="Side projects, tools and experiments that didn't need to become companies."
        />

        {/* 6 Experiments Cards: Staggered asymmetric layout.
            The full catalogue (28) lives on /projects — the homepage shows
            the first six and links to the rest. */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 pt-6">
          {experiments.slice(0, 6).map((item, idx) => (
            <article
              key={item.title}
              className={`group relative overflow-hidden flex flex-col justify-between p-6 sm:p-7 md:p-8 lg:p-9 rounded-xs border border-hairline bg-paper/85 backdrop-blur-md shadow-[0_4px_24px_rgba(26,24,21,0.04)] ${
                idx === 1 ? "md:translate-y-6" : idx === 2 ? "md:translate-y-12" : ""
              }`}
            >
              {/* Grainient ambient canvas */}
              <div className="absolute inset-0 pointer-events-none opacity-25 group-hover:opacity-75 transition-opacity duration-calm">
                <Grainient
                  colors={["#FBF8F2", "#EFE9DC", "#E5DEC9", "#D8C6A6", "#C05B3C"]}
                  flow={0.6}
                  silk={0.35}
                  grainAmount={0.06}
                  speed={0.4}
                />
              </div>

              <div className="relative z-10 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="meta-label text-terracotta text-xs font-semibold">
                    ( {String(idx + 1).padStart(2, "0")} )
                  </span>
                  <span className="meta-label text-muted text-[0.625rem]">
                    {item.tag}
                  </span>
                </div>

                <h3 className="display-md text-ink font-normal">{item.title}</h3>

                {item.image && (
                  <div className="relative w-full aspect-[2/3] sm:aspect-[3/4] my-3 rounded-xs overflow-hidden border border-hairline bg-paper-edge shadow-xs">
                    <Image
                      src={item.image}
                      alt={`${item.title} preview`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                      className="object-contain p-2"
                    />
                  </div>
                )}

                <p className="body-editorial text-body text-[0.9375rem] leading-relaxed">
                  {item.line}
                </p>
              </div>

              <div className="relative z-10 pt-6 md:pt-8 flex justify-end">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 meta-label text-ink hover:text-terracotta transition-colors group/link py-2.5 px-3 -my-2 -mx-3 min-h-[44px]"
                  aria-label={`Explore ${item.title}`}
                >
                  <span>EXPLORE</span>
                  <span
                    className="transition-transform duration-standard group-hover/link:translate-x-1"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Full catalogue link */}
        <div className="flex justify-center pt-2">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 meta-label text-ink hover:text-terracotta transition-colors py-2 px-3 min-h-[44px]"
          >
            <span>VIEW ALL {experiments.length} FIELD EXPERIMENTS</span>
            <span className="font-serif text-sm" aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
