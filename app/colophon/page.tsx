import type { Metadata } from "next";
import Link from "next/link";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "Colophon — Nishant Unavane Portfolio 2027",
  description:
    "Typography, palette tokens, architecture, and craftsmanship principles behind the 2027 edition of Nishant Unavane's portfolio.",
};

export default function ColophonPage() {
  return (
    <article className="min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-24 px-5 sm:px-6 md:px-12 bg-paper text-ink">
      <div className="max-w-[1000px] mx-auto flex flex-col gap-12 sm:gap-16">
        {/* Header */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between meta-label">
            <Link
              href="/"
              className="text-ink hover:text-terracotta transition-colors flex items-center gap-1.5 py-2 pr-3 min-h-[44px]"
            >
              <span>←</span>
              <span>HOME</span>
            </Link>
            <span>COLOPHON · 2027 EDITION</span>
          </div>
          <div className="w-full h-[1px] bg-hairline" />
        </div>

        {/* Title */}
        <div className="flex flex-col gap-4">
          <h1 className="display-xl text-ink font-normal leading-[0.96]">
            How this site was <em className="italic font-serif">made.</em>
          </h1>
          <p className="body-editorial text-body text-lg">
            A light-theme, neo-classical editorial portfolio engineered as a continuous
            walk across an estate.
          </p>
        </div>

        {/* Design Laws */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-hairline pt-10">
          <div className="flex flex-col gap-4">
            <span className="meta-label text-muted">TYPOGRAPHY</span>
            <div className="flex flex-col gap-3">
              <div>
                <h3 className="font-serif text-2xl text-ink">Instrument Serif</h3>
                <p className="body-sm text-body">
                  Set at 400 weight for all display titles. Never bold. High contrast,
                  condensed, old-style italic.
                </p>
              </div>
              <div>
                <h3 className="title-ui text-ink">Geist Sans</h3>
                <p className="body-sm text-body">
                  Neutral geometric system sans for body copy and navigation.
                </p>
              </div>
              <div>
                <h3 className="meta-label text-ink">Geist Mono</h3>
                <p className="body-sm text-body">
                  Uppercase metadata labels, coordinates, and technology tokens.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <span className="meta-label text-muted">COLOR & MATERIAL</span>
            <div className="flex flex-col gap-3">
              <p className="body-sm text-body">
                The canvas is warm paper (<code className="font-mono text-xs">#F6F2E9</code>)
                and warm ink (<code className="font-mono text-xs">#1A1815</code>).
              </p>
              <p className="body-sm text-body">
                Color voltage comes entirely from hand-painted plates. Exactly one accent hue
                exists: Terracotta (<code className="font-mono text-xs">#C05B3C</code>),
                limited to at most two occurrences per viewport.
              </p>
              <p className="body-sm text-body">
                Exactly one dark band exists across the entire site: Act 05 (The Studio) in
                deep navy (<code className="font-mono text-xs">#1F2C3D</code>).
              </p>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="border-t border-hairline pt-10 flex flex-col gap-6">
          <span className="meta-label text-muted">LOCKED STACK</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {[
              "Next.js 15 (App Router)",
              "React 19",
              "TypeScript Strict",
              "Tailwind CSS v4",
              "GSAP 3.12 + ScrollTrigger",
              "Lenis Smooth Scroll",
              "next/image + sharp",
              "View Transitions API",
            ].map((tech, idx) => (
              <div
                key={idx}
                className="p-4 border border-hairline bg-paper-soft rounded-xs text-xs font-mono text-ink-soft break-words"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>

        {/* Craft Rules */}
        <div className="border-t border-hairline pt-10 flex flex-col gap-4">
          <span className="meta-label text-muted">PERFORMANCE & ACCESSIBILITY</span>
          <p className="body-editorial text-body">
            Gated on <code className="font-mono text-xs">prefers-reduced-motion</code> at
            init. Every image uses explicit dimensions and modern WebP compression. The
            entire page remains legible and functional with JavaScript disabled and images
            blocked.
          </p>
          <p className="meta-label text-muted text-xs pt-4">{profile.copyright}</p>
        </div>
      </div>
    </article>
  );
}
