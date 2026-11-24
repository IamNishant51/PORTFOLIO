"use client";

import { useState } from "react";
import { aboutData } from "@/content/about";
import { Reveal } from "@/components/primitives/Reveal";

export function AboutMetrics() {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const handleCopy = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2400);
  };

  return (
    <section className="relative w-full py-20 sm:py-28 bg-paper">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 flex flex-col gap-16">
        {/* Section Header */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between meta-label text-[0.6875rem]">
            <span className="text-terracotta tracking-[0.22em]">
              INDEX · AUDIT & METRICS
            </span>
            <span className="text-muted font-mono">VERIFIED DATA</span>
          </div>
          <div className="w-full h-[1px] bg-hairline" />
        </div>

        {/* 4 Quantitative Stat Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {aboutData.metrics.map((m, idx) => (
            <Reveal key={m.label} delay={idx * 0.08}>
              <div className="flex flex-col p-6 bg-paper-edge border border-hairline-strong rounded-xs gap-3 shadow-[0_2px_12px_rgba(26,24,21,0.03)] h-full justify-between">
                <span className="meta-label text-muted text-[0.6875rem]">{m.label}</span>
                <div className="font-serif text-5xl sm:text-6xl text-ink font-normal leading-none my-2">
                  {m.value}
                </div>
                <p className="body-sm text-body text-[0.8125rem] leading-snug border-t border-hairline pt-3">
                  {m.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Contact & Correspondence Terminal */}
        <Reveal delay={0.2}>
          <div className="p-5 sm:p-12 bg-paper-edge border border-hairline-strong rounded-xs flex flex-col lg:flex-row lg:items-center justify-between gap-8 shadow-[0_8px_32px_rgba(26,24,21,0.05)]">
            <div className="flex flex-col gap-3 max-w-[540px]">
              <span className="meta-label text-terracotta text-[0.75rem] tracking-[0.2em]">
                DIRECT CORRESPONDENCE
              </span>
              <h3 className="display-lg text-ink font-normal leading-[0.98]">
                Open for <em className="font-serif">collaboration.</em>
              </h3>
              <p className="body-editorial text-body text-base">
                For agent systems engineering, full-stack architectures, or technical leadership.
                Based in Pune, India, working across global time zones.
              </p>
            </div>

            <div className="flex flex-col gap-4 font-mono text-[0.8125rem]">
              {/* Primary Email Pill */}
              <div className="flex items-center justify-between gap-4 p-3 bg-paper border border-hairline-strong rounded-xs">
                <div className="flex flex-col min-w-0">
                  <span className="meta-label text-[0.625rem] text-muted">PRIMARY GMAIL</span>
                  <span className="text-ink font-medium select-all break-all">
                    {aboutData.emails.primary}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(aboutData.emails.primary)}
                  className="px-3 py-1.5 border border-hairline-strong rounded-full text-[0.6875rem] hover:border-ink hover:bg-paper-soft transition-colors cursor-pointer shrink-0"
                >
                  {copiedEmail === aboutData.emails.primary ? "COPIED ✓" : "COPY"}
                </button>
              </div>

              {/* Secondary Email Pill */}
              <div className="flex items-center justify-between gap-4 p-3 bg-paper border border-hairline-strong rounded-xs">
                <div className="flex flex-col min-w-0">
                  <span className="meta-label text-[0.625rem] text-muted">SECONDARY GMAIL</span>
                  <span className="text-ink select-all break-all">
                    {aboutData.emails.secondary}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(aboutData.emails.secondary)}
                  className="px-3 py-1.5 border border-hairline-strong rounded-full text-[0.6875rem] hover:border-ink hover:bg-paper-soft transition-colors cursor-pointer shrink-0"
                >
                  {copiedEmail === aboutData.emails.secondary ? "COPIED ✓" : "COPY"}
                </button>
              </div>

              {/* Profiles Row */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 meta-label text-[0.75rem]">
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
                <span className="text-hairline-strong">·</span>
                <a
                  href={aboutData.socials.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-terracotta hover:underline font-semibold"
                >
                  PORTFOLIO ↗
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
