"use client";

import { aboutData } from "@/content/about";
import { Reveal } from "@/components/primitives/Reveal";

export function AboutBio() {
  return (
    <section className="relative w-full py-20 sm:py-28 border-b border-hairline bg-paper">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 flex flex-col gap-16">
        {/* Section Header */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between meta-label text-[0.6875rem]">
            <span className="text-terracotta tracking-[0.22em]">
              TRAJECTORY · PHILOSOPHY
            </span>
            <span className="text-muted font-mono">2022 — 2027</span>
          </div>
          <div className="w-full h-[1px] bg-hairline" />
        </div>

        {/* Narrative & Timeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: The Narrative (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <Reveal>
              <h2 className="display-xl text-ink font-normal leading-[0.96]">
                Code as <em className="italic font-serif">printmaking.</em>
              </h2>
            </Reveal>

            <div className="flex flex-col gap-6 body-editorial text-body text-lg leading-relaxed max-w-[62ch]">
              {aboutData.bioParagraphs.map((para, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <p>{para}</p>
                </Reveal>
              ))}
            </div>

            {/* Quote Callout */}
            <Reveal delay={0.24}>
              <div className="p-6 bg-paper-edge border-l-2 border-terracotta border-hairline border-t border-r border-b rounded-xs">
                <blockquote className="font-serif italic text-xl text-ink leading-snug">
                  &ldquo;A local model on your own machine that answers in twelve milliseconds with
                  zero egress beats a massive cloud model that lags, telemetry-tracks, and breaks when
                  the Wi-Fi wavers.&rdquo;
                </blockquote>
                <cite className="block meta-label text-[0.6875rem] text-muted mt-3 font-mono not-italic">
                  — NISHANT UNAVANE · NOTES ON AGENTIC ARCHITECTURES
                </cite>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Engineering Principles (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <span className="meta-label text-[0.6875rem] text-muted tracking-[0.2em]">
              CORE ENGINEERING TENETS
            </span>

            <div className="flex flex-col gap-4">
              {aboutData.principles.map((p, idx) => (
                <Reveal key={p.index} delay={idx * 0.1}>
                  <div className="flex flex-col p-6 bg-paper-edge border border-hairline-strong rounded-xs gap-2 shadow-[0_2px_12px_rgba(26,24,21,0.03)] hover:border-terracotta/60 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="meta-label font-mono text-terracotta text-[0.75rem] font-bold">
                        {p.index}
                      </span>
                      <span className="meta-label text-muted text-[0.625rem]">PRINCIPLE</span>
                    </div>
                    <h3 className="font-serif text-2xl text-ink">{p.title}</h3>
                    <p className="body-sm text-body text-[0.875rem] leading-relaxed">
                      {p.statement}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
