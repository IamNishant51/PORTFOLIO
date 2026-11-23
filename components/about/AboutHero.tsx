"use client";

import Link from "next/link";
import { aboutData } from "@/content/about";
import { Reveal } from "@/components/primitives/Reveal";

export function AboutHero() {
  return (
    <section className="relative w-full pt-28 sm:pt-36 pb-16 border-b border-hairline">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 flex flex-col gap-10">
        {/* Top Breadcrumb & Archive Meta */}
        <div className="flex flex-wrap items-center justify-between gap-4 meta-label text-[0.6875rem]">
          <Link
            href="/"
            className="flex items-center gap-2 text-ink hover:text-terracotta transition-colors py-1 group focus-visible:outline-ink focus-visible:outline-2"
            aria-label="Return to portfolio home"
          >
            <span className="transition-transform group-hover:-translate-x-1" aria-hidden="true">
              ←
            </span>
            <span>INDEX / PORTFOLIO</span>
          </Link>
          <div className="flex items-center gap-3 text-muted">
            <span>ARCHIVE DOSSIER 01 / 01</span>
            <span aria-hidden="true">·</span>
            <span className="text-terracotta">CURATED PLATES</span>
          </div>
        </div>

        {/* Hairline Separator */}
        <div className="w-full h-[1px] bg-hairline" />

        {/* Hero Title & Editorial Lead */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-baseline">
          <div className="lg:col-span-8 flex flex-col gap-6">
            <Reveal>
              <span className="meta-label text-terracotta tracking-[0.22em] text-[0.75rem]">
                DOSSIER & BIOGRAPHY
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="display-mega text-ink font-normal leading-[0.92] tracking-tight">
                The mind behind the{" "}
                <em className="italic font-serif text-terracotta">machine.</em>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="body-editorial text-body text-xl sm:text-2xl max-w-[62ch] font-serif italic">
                &ldquo;{aboutData.bioLead}&rdquo;
              </p>
            </Reveal>
          </div>

          {/* Quick Vitals Badge / Archival Stamp */}
          <div className="lg:col-span-4 flex flex-col p-6 bg-paper-edge border border-hairline-strong rounded-xs gap-4 shadow-[0_4px_24px_rgba(26,24,21,0.04)]">
            <div className="flex items-center justify-between meta-label text-muted text-[0.6875rem] border-b border-hairline pb-3">
              <span>CIVIL REGISTER</span>
              <span className="font-mono text-terracotta">REF: 2006-01-03</span>
            </div>

            <div className="flex flex-col gap-3 font-mono text-[0.8125rem]">
              <div className="flex justify-between items-baseline">
                <span className="text-muted text-[0.6875rem]">NAME</span>
                <span className="text-ink font-medium">{aboutData.name}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-muted text-[0.6875rem]">BORN</span>
                <span className="text-ink">
                  {aboutData.dobFormatted} <span className="text-terracotta">({aboutData.age} YRS)</span>
                </span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-muted text-[0.6875rem]">BASE</span>
                <span className="text-ink">{aboutData.location}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-muted text-[0.6875rem]">COORDINATES</span>
                <span className="text-muted text-[0.75rem]">{aboutData.coordinates}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-0.5 sm:gap-2 border-t border-hairline pt-3">
                <span className="text-muted text-[0.6875rem]">PRIMARY MAIL</span>
                <a
                  href={`mailto:${aboutData.emails.primary}`}
                  className="text-terracotta hover:underline break-all"
                >
                  {aboutData.emails.primary}
                </a>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-0.5 sm:gap-2">
                <span className="text-muted text-[0.6875rem]">ALT MAIL</span>
                <a
                  href={`mailto:${aboutData.emails.secondary}`}
                  className="text-ink hover:underline break-all"
                >
                  {aboutData.emails.secondary}
                </a>
              </div>
            </div>

            {/* Social Links Row */}
            <div className="flex items-center gap-3 pt-3 border-t border-hairline text-[0.75rem] meta-label">
              <a
                href={aboutData.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink hover:text-terracotta transition-colors"
              >
                GITHUB ↗
              </a>
              <span className="text-hairline-strong">·</span>
              <a
                href={aboutData.socials.devto}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink hover:text-terracotta transition-colors"
              >
                DEV.TO ↗
              </a>
              <span className="text-hairline-strong">·</span>
              <a
                href={aboutData.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink hover:text-terracotta transition-colors"
              >
                LINKEDIN ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
