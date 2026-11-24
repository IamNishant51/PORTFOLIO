"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Project } from "@/content/projects";
import { gsap } from "@/lib/gsap";

interface ProjectRowProps {
  project: Project;
  fallbackPlate?: string;
}

export function ProjectRow({
  project,
  fallbackPlate = "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/04-act3-temple/a3-temple-plate.webp",
}: ProjectRowProps) {
  const [isHovered, setIsHovered] = useState(false);
  const rowRef = useRef<HTMLElement>(null);
  const hairlineRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const imageSrc = project.image || fallbackPlate;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      // Hairline draws across from left to right on scroll
      if (hairlineRef.current) {
        gsap.fromTo(
          hairlineRef.current,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: rowRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Content gently floats up
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.1,
            scrollTrigger: {
              trigger: rowRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, rowRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!previewRef.current || !rowRef.current) return;
    const rect = rowRef.current.getBoundingClientRect();
    const offsetY = e.clientY - rect.top - rect.height / 2;
    gsap.to(previewRef.current, {
      y: offsetY * 0.35,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <article
      ref={rowRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className="group relative py-8 md:py-10 transition-colors"
    >
      {/* Scroll-animated hairline */}
      <div
        ref={hairlineRef}
        className="absolute top-0 left-0 right-0 h-[1px] bg-hairline"
      />

      <div
        ref={contentRef}
        className="grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline relative z-10 will-change-transform"
      >
        {/* Index */}
        <div className="md:col-span-1">
          <span className="font-serif text-3xl md:text-4xl text-ink-soft group-hover:text-terracotta transition-colors duration-standard">
            {project.index}
          </span>
        </div>

        {/* Title & Subtitle */}
        <div className="md:col-span-5 flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <Link
              href={`/work/${project.slug}`}
              className="display-lg text-ink group-hover:text-ink hover:underline underline-offset-4 decoration-hairline transition-all duration-standard group-hover:translate-x-2"
            >
              {project.title}
            </Link>
          </div>
          <p className="body-editorial text-body text-[0.9375rem]">
            {project.subtitle}
          </p>

          {/* Mobile Touch Preview Plate */}
          <div className="block md:hidden relative w-full aspect-[2/3] max-w-[280px] mx-auto my-3 rounded-xs border border-hairline-strong overflow-hidden bg-paper-edge shadow-xs">
            <Image
              src={imageSrc}
              alt={`Screenshot preview of ${project.title}`}
              fill
              sizes="(max-width: 768px) 280px, 300px"
              className="object-contain p-2"
            />
            <div className="absolute inset-0 bg-ink/5 mix-blend-multiply pointer-events-none" />
          </div>
        </div>

        {/* Proof / Metrics */}
        <div className="md:col-span-3 flex flex-col gap-1.5">
          <span className="meta-label text-muted text-[0.6875rem]">
            PROOF & METRICS
          </span>
          <div className="flex flex-col gap-1 text-[0.8125rem] text-ink-soft font-mono">
            {project.proof.map((item, idx) => (
              <span key={idx}>· {item}</span>
            ))}
          </div>
        </div>

        {/* Stack & Action Link */}
        <div className="md:col-span-3 flex flex-col justify-between items-start md:items-end gap-4">
          <div className="flex flex-wrap gap-1.5 md:justify-end">
            {project.stack.slice(0, 4).map((tech, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 text-[0.6875rem] font-mono rounded-xs border border-hairline bg-paper-soft text-body"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-4 flex-wrap w-full md:w-auto justify-between md:justify-end">
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              {project.links.repo && (
                <a
                  href={project.links.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="meta-label text-muted hover:text-ink transition-colors py-2.5 px-2 inline-flex items-center min-h-[44px]"
                  aria-label={`${project.title} GitHub repository`}
                >
                  REPO ↗
                </a>
              )}
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="meta-label text-terracotta hover:underline font-semibold py-2.5 px-2 inline-flex items-center min-h-[44px]"
                  aria-label={`${project.title} live demo`}
                >
                  LIVE ↗
                </a>
              )}
              {project.links.marketplace && (
                <a
                  href={project.links.marketplace}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="meta-label text-terracotta hover:underline font-semibold py-2.5 px-2 inline-flex items-center min-h-[44px]"
                  aria-label={`${project.title} marketplace listing`}
                >
                  STORE ↗
                </a>
              )}
            </div>
            <Link
              href={`/work/${project.slug}`}
              className="inline-flex items-center justify-center w-11 h-11 md:w-8 md:h-8 rounded-full border border-hairline-strong group-hover:border-ink group-hover:bg-ink group-hover:text-on-ink transition-all"
              aria-label={`Read case study for ${project.title}`}
            >
              <span className="text-sm transition-transform duration-standard group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Desktop hover thumbnail preview with smooth inertia */}
      <div
        ref={previewRef}
        className={`hidden md:block pointer-events-none absolute right-20 top-1/2 -translate-y-1/2 w-48 aspect-[2/3] z-20 overflow-hidden rounded-xs border border-hairline-strong bg-paper-edge shadow-2xl transition-all duration-calm will-change-transform ${
          isHovered
            ? "opacity-100 translate-x-0 scale-100"
            : "opacity-0 translate-x-12 scale-90 pointer-events-none"
        }`}
      >
        <Image
          src={imageSrc}
          alt=""
          fill
          sizes="200px"
          className="object-contain p-1"
        />
        <div className="absolute inset-0 bg-ink/5 mix-blend-multiply pointer-events-none" />
      </div>
    </article>
  );
}
