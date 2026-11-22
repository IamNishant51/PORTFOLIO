"use client";

import Image from "next/image";
import { Reveal } from "@/components/primitives/Reveal";
import { PlateFrame } from "@/components/primitives/PlateFrame";

const archivalNotes = [
  {
    badge: "DOSSIER",
    title: "Nishant Unavane",
    detail: "B. 03 Jan 2006 · Pune, Maharashtra · Full-Stack & AI Systems",
  },
  {
    badge: "OPEN SOURCE",
    title: "10,340+ Downloads",
    detail: "Carto Context Engine, Ollama Agent & Atlas MCP Runtime",
  },
  {
    badge: "ENGINEERING SPEC",
    title: "Craft Over Slop",
    detail: "Strict TypeScript, local-first state, form follows intent",
  },
  {
    badge: "CIVIL REGISTER",
    title: "Ref: 2006-01-03",
    detail: "21 Years of Age · Western Ghats · Pune, IN · 18°31' N",
  },
];

export function PaperMosaicSection() {
  return (
    <section
      id="mosaic-portrait"
      className="relative w-full py-20 sm:py-28 border-b border-hairline bg-paper scroll-mt-20 overflow-hidden"
      aria-label="Flagship Paper-Tile Mosaic Portrait Assemblage"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 flex flex-col gap-12 sm:gap-16">
        {/* Section Header */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4 meta-label text-[0.6875rem]">
            <span className="text-terracotta tracking-[0.22em]">
              FLAGSHIP ASSEMBLAGE · PHYSICAL JOINER STUDY
            </span>
            <div className="flex items-center gap-3 text-muted font-mono">
              <span>20 CUT-PAPER TILES</span>
              <span aria-hidden="true">·</span>
              <span>4 ARCHIVAL MEMORANDA</span>
              <span aria-hidden="true">·</span>
              <span className="text-terracotta">100% AUTHENTIC LIKENESS</span>
            </div>
          </div>

          <div className="w-full h-[1px] bg-hairline" />

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-2">
            <div className="max-w-[66ch]">
              <Reveal>
                <h2 className="display-xl text-ink font-normal leading-[0.94]">
                  The mosaic of a{" "}
                  <em className="italic font-serif text-terracotta">practitioner.</em>
                </h2>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="body-editorial text-body mt-3 text-base sm:text-lg">
                  Inspired by physical paper joiners and tactile editorial printmaking. Nishant
                  Unavane&apos;s portrait sliced into 20 photographic paper cards with organic drop
                  shadows, deckled seams, and archival sticky notes documenting verified civil and
                  technical credentials.
                </p>
              </Reveal>
            </div>

            <div className="meta-label text-[0.6875rem] text-muted self-start md:self-end flex flex-col items-start md:items-end gap-1 font-mono">
              <span className="text-ink">PLATE 00 · MASTER STUDY</span>
              <span>1200 × 1600 · ARCHIVAL RAG STOCK</span>
            </div>
          </div>
        </div>

        {/* Centerpiece Showcase: Paper Mosaic Masterplate */}
        <div className="relative mx-auto w-full max-w-[840px] p-4 sm:p-10 bg-paper-edge border border-hairline-strong rounded-xs shadow-[0_8px_32px_rgba(26,24,21,0.05)]">
          {/* Subtle Corner Register Marks */}
          <div
            className="absolute top-2 left-2 text-[0.625rem] text-muted font-mono select-none"
            aria-hidden="true"
          >
            +
          </div>
          <div
            className="absolute top-2 right-2 text-[0.625rem] text-muted font-mono select-none"
            aria-hidden="true"
          >
            +
          </div>
          <div
            className="absolute bottom-2 left-2 text-[0.625rem] text-muted font-mono select-none"
            aria-hidden="true"
          >
            +
          </div>
          <div
            className="absolute bottom-2 right-2 text-[0.625rem] text-muted font-mono select-none"
            aria-hidden="true"
          >
            +
          </div>

          {/* Master Portrait Frame */}
          <PlateFrame
            caption="PLATE 00 · NISHANT UNAVANE · PAPER-TILE MOSAIC ASSEMBLAGE · 2027 ARCHIVES"
            aspectRatio="3/4"
          >
            <Image
              src="https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/about/paper-mosaic-portrait.webp"
              alt="Tactile Paper-Tile Mosaic Portrait of Nishant Unavane with handwritten archival sticky notes"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 840px"
              className="object-contain"
              priority
            />
          </PlateFrame>

          {/* Archival Memoranda Register (Cards below portrait) */}
          <div className="mt-8 pt-6 border-t border-hairline grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {archivalNotes.map((note, idx) => (
              <div
                key={idx}
                className="flex flex-col p-3.5 bg-paper border border-hairline rounded-xs gap-1.5 transition-all hover:border-terracotta/50"
              >
                <span className="font-mono text-[0.5625rem] tracking-[0.14em] text-terracotta uppercase">
                  {note.badge}
                </span>
                <span className="font-serif text-[0.9375rem] text-ink font-bold leading-tight">
                  {note.title}
                </span>
                <span className="font-mono text-[0.6875rem] text-body leading-snug">
                  {note.detail}
                </span>
              </div>
            ))}
          </div>

          {/* Footer Archival Stamp Strip */}
          <div className="mt-6 pt-4 border-t border-hairline flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 meta-label text-[0.6875rem] text-muted">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-terracotta" />
              <span className="font-mono text-ink">REGISTERED ARTIFACT 2027</span>
            </div>
            <div className="font-mono text-[0.625rem]">
              <span>AUTHENTIC PHOTOGRAPHIC TILES · ZERO AI FACIAL MORPHING</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
