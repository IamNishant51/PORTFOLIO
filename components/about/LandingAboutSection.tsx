"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import type { FlexCarouselRef } from "@/components/ui/FlexCarousel";
import { Reveal } from "@/components/primitives/Reveal";
import { SpotifyPlatePlayer, PlateTrackItem } from "./SpotifyPlatePlayer";

const FlexCarousel = dynamic(() => import("@/components/ui/FlexCarousel"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-transparent">
      <span className="meta-label text-xs text-muted font-mono animate-pulse">
        CALIBRATING EXHIBITION...
      </span>
    </div>
  ),
});

const carouselItems: PlateTrackItem[] = [
  {
    src: "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/about/plate-01-be-humble.webp",
    coverSrc: "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/about/covers/cover-01-ghalib-hona-hai.webp",
    alt: "Plate I — Be Humble: Ochre paper fold poster with star-visor profile",
    title: "Be Humble",
    subtitle: "PLATE I · 2027 · OCHRE SCREENPRINT & PAPER FOLD",
    songTitle: "Ghalib Hona Hai",
    artist: "Sanjay Leela Bhansali, Armaan Malik",
    album: "Sukoon",
    audioSrc: "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/audio/song-01-ghalib-hona-hai.mp3",
  },
  {
    src: "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/about/plate-02-alternate.webp",
    coverSrc: "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/about/covers/cover-02-highway-to-hell.webp",
    alt: "Plate II — Alternate: Flared neoclassical serif display in deep crimson",
    title: "Alternate",
    subtitle: "PLATE II · 2027 · CRIMSON FLARED SERIF DISPLAY",
    songTitle: "Highway to Hell",
    artist: "AC/DC",
    album: "Highway to Hell",
    audioSrc: "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/audio/song-03-highway-to-hell.mp3",
  },
  {
    src: "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/about/plate-03-the-developer.webp",
    coverSrc: "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/about/covers/cover-03-finding-her.webp",
    alt: "Plate III — The Developer: Lilac field with botanical lily crown and visor bar",
    title: "The Developer",
    subtitle: "PLATE III · 2027 · LILAC BOTANICAL & VISOR BAR",
    songTitle: "Finding Her",
    artist: "Kaushagar Thakur",
    album: "YouTube Original",
    audioSrc: "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/audio/song-02-finding-her.mp3",
  },
  {
    src: "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/about/plate-05-visual-study.webp",
    coverSrc: "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/about/covers/cover-04-madira.webp",
    alt: "Plate IV — Visual Study 2025: Modular letterform mask with technical barcode register",
    title: "Visual Study",
    subtitle: "PLATE IV · 2027 · MODULAR TYPE GRID & BARCODE",
    songTitle: "Madira",
    artist: "Seedhe Maut, Sez on the Beat",
    album: "Nayaab",
    audioSrc: "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/audio/song-06-madira.mp3",
  },
  {
    src: "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/about/plate-06-monochrome-glare.webp",
    coverSrc: "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/about/covers/cover-05-tandavam.webp",
    alt: "Plate V — Optical Monolith: Silver-gelatin portrait with horizontal luminous ocular bar",
    title: "Optical Monolith",
    subtitle: "PLATE V · 2027 · MONOCHROME OCULAR WINDOW",
    songTitle: "Tandavam",
    artist: "Rishabh Rikhiram Sharma",
    album: "Sitar Reverie",
    audioSrc: "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/audio/song-05-tandavam.mp3",
  },
  {
    src: "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/about/plate-07-new-arrivals.webp",
    coverSrc: "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/about/covers/cover-06-unakkul-naane.webp",
    alt: "Plate VI — New Arrivals: Sage & forest botanical contours with outline typography",
    title: "New Arrivals",
    subtitle: "PLATE VI · 2027 · BOTANICAL CONTOURS & PROFILE",
    songTitle: "Unakkul Naane",
    artist: "Pradeep Kumar, Bombay Jayashri",
    album: "Pachaikili Muthucharam",
    audioSrc: "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/audio/song-04-unakkul-naane.mp3",
  },
];

const PLATE_THEMES = [
  // 0: Plate I — Be Humble (Ghalib Hona Hai) -> Golden Ochre
  { bg: "#F8AA06", edge: "#E29900", soft: "#FBBF36", isDark: false },
  // 1: Plate II — Alternate (Highway to Hell) -> Deep Crimson Red
  { bg: "#D01E0F", edge: "#A61507", soft: "#E03222", isDark: true },
  // 2: Plate III — The Developer (Finding Her) -> Dreamy Lilac
  { bg: "#D3BEF9", edge: "#C1A5F5", soft: "#E1D2FC", isDark: false },
  // 3: Plate IV — Visual Study (Madira) -> Deep Burgundy Wine
  { bg: "#681624", edge: "#4D0E19", soft: "#7D1E2F", isDark: true },
  // 4: Plate V — Optical Monolith (Tandavam) -> Obsidian Monochrome
  { bg: "#1A1815", edge: "#2B2823", soft: "#2E2B25", isDark: true },
  // 5: Plate VI — New Arrivals (Unakkul Naane) -> Botanical Warm Gold
  { bg: "#E8B87A", edge: "#D49E58", soft: "#EFC896", isDark: false },
];
const DEFAULT_PAPER = "#FBF8F2";
const DEFAULT_EDGE = "#E7DFCE";

export function LandingAboutSection() {
  const carouselRef = useRef<FlexCarouselRef>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFocusOpen, setIsFocusOpen] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [hasFlipped, setHasFlipped] = useState(false);

  // Dynamic Musical Background Synchronization: Exact primary color of Nishant's active image
  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = document.documentElement;
    const body = document.body;

    if (isPlaying) {
      const theme = PLATE_THEMES[activeIdx] || PLATE_THEMES[0];
      root.style.setProperty("--color-paper", theme.bg);
      root.style.setProperty("--color-paper-soft", theme.soft);
      root.style.setProperty("--color-paper-edge", theme.edge);
      body.style.setProperty("--color-paper", theme.bg);
      body.style.setProperty("--color-paper-soft", theme.soft);
      body.style.setProperty("--color-paper-edge", theme.edge);
      body.style.backgroundColor = theme.bg;
      root.style.backgroundColor = theme.bg;

      if (theme.isDark) {
        root.style.setProperty("--color-ink", "#FBF8F2");
        root.style.setProperty("--color-ink-soft", "#EFE9DC");
        root.style.setProperty("--color-body", "#E7DFCE");
        root.style.setProperty("--color-muted", "#C9BEA8");
        root.style.setProperty("--color-hairline", "rgba(255, 255, 255, 0.2)");
        root.style.setProperty("--color-hairline-strong", "rgba(255, 255, 255, 0.35)");
      } else {
        root.style.setProperty("--color-ink", "#1A1815");
        root.style.setProperty("--color-ink-soft", "#3D3931");
        root.style.setProperty("--color-body", "#4A463D");
        root.style.setProperty("--color-muted", "#6B6559");
        root.style.setProperty("--color-hairline", "rgba(0, 0, 0, 0.15)");
        root.style.setProperty("--color-hairline-strong", "rgba(0, 0, 0, 0.28)");
      }
    } else {
      root.style.setProperty("--color-paper", DEFAULT_PAPER);
      root.style.setProperty("--color-paper-soft", DEFAULT_PAPER);
      root.style.setProperty("--color-paper-edge", DEFAULT_EDGE);
      body.style.removeProperty("--color-paper");
      body.style.removeProperty("--color-paper-soft");
      body.style.removeProperty("--color-paper-edge");
      body.style.backgroundColor = "";
      root.style.backgroundColor = "";
      root.style.removeProperty("--color-ink");
      root.style.removeProperty("--color-ink-soft");
      root.style.removeProperty("--color-body");
      root.style.removeProperty("--color-muted");
      root.style.removeProperty("--color-hairline");
      root.style.removeProperty("--color-hairline-strong");
    }

    return () => {
      root.style.setProperty("--color-paper", DEFAULT_PAPER);
      root.style.setProperty("--color-paper-soft", DEFAULT_PAPER);
      root.style.setProperty("--color-paper-edge", DEFAULT_EDGE);
      body.style.removeProperty("--color-paper");
      body.style.removeProperty("--color-paper-soft");
      body.style.removeProperty("--color-paper-edge");
      body.style.backgroundColor = "";
      root.style.backgroundColor = "";
      root.style.removeProperty("--color-ink");
      root.style.removeProperty("--color-ink-soft");
      root.style.removeProperty("--color-body");
      root.style.removeProperty("--color-muted");
      root.style.removeProperty("--color-hairline");
      root.style.removeProperty("--color-hairline-strong");
    };
  }, [isPlaying, activeIdx]);

  const currentTrack = carouselItems[activeIdx] || carouselItems[0];

  // When user drags/wheels/scrolls the carousel, update song immediately
  const handleCarouselChange = (index: number) => {
    setActiveIdx(index);
    setIsFlipped(false);
    setHasFlipped(false);
    if (isFocusOpen) {
      carouselRef.current?.openFocus(index);
    }
  };

  // When user clicks a card in the carousel:
  // If already in focus, clicking the plate spins & flips it to reveal the album cover!
  const handleCarouselSelect = (index: number) => {
    if (index === activeIdx && isFocusOpen) {
      handleToggleFlip();
      return;
    }
    setActiveIdx(index);
    setIsFlipped(false);
    setHasFlipped(false);
    carouselRef.current?.openFocus(index);
  };

  const handleFocusChange = (open: boolean) => {
    setIsFocusOpen(open);
    if (!open) {
      setIsFlipped(false);
      setHasFlipped(false);
    }
  };

  // Track change from Spotify controls (prev/next/shuffle)
  const handleTrackChange = (newIdx: number) => {
    setActiveIdx(newIdx);
    setIsFlipped(false);
    setHasFlipped(false);
    carouselRef.current?.goTo(newIdx);
    if (isFocusOpen) {
      carouselRef.current?.openFocus(newIdx);
    }
  };

  // Play state change from Spotify player
  const handlePlayStateChange = (playing: boolean) => {
    setIsPlaying(playing);
    if (playing) {
      setIsFocusOpen(true);
      carouselRef.current?.openFocus(activeIdx);
    } else {
      carouselRef.current?.closeFocus();
      setIsFocusOpen(false);
      setIsFlipped(false);
      setHasFlipped(false);
    }
  };

  // Toggle Focus Lens button
  const handleToggleFocus = () => {
    if (isFocusOpen) {
      carouselRef.current?.closeFocus();
      setIsFocusOpen(false);
      setIsFlipped(false);
      setHasFlipped(false);
    } else {
      setIsFocusOpen(true);
      carouselRef.current?.openFocus(activeIdx);
    }
  };

  // Toggle 3D Spin & Flip Card to Album Cover
  const handleToggleFlip = () => {
    if (!isFocusOpen) {
      carouselRef.current?.openFocus(activeIdx);
      setIsFocusOpen(true);
      setTimeout(() => {
        setHasFlipped(true);
        setIsFlipped(true);
      }, 350);
      return;
    }
    setHasFlipped(true);
    setIsFlipped((prev) => !prev);
  };

  return (
    <section
      id="about"
      className="relative w-full py-24 sm:py-32 border-b border-hairline bg-paper scroll-mt-20 overflow-hidden transition-colors duration-700 ease-out"
      style={{
        backgroundColor: isPlaying ? (PLATE_THEMES[activeIdx]?.bg || DEFAULT_PAPER) : undefined,
      }}
      aria-label="About Nishant Unavane — Iconography and Artwork"
    >
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col gap-10 sm:gap-12">
        {/* Section Header */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-2">
            <div className="max-w-[62ch]">
              <Reveal>
                <h2 className="display-xl text-ink font-normal leading-[0.94]">
                  The apparatus of a{" "}
                  <em className="italic font-serif text-terracotta">builder.</em>
                </h2>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="body-editorial text-body mt-3 text-base sm:text-lg">
                  Six distinct artistic poster studies curated by Nishant Unavane, paired with
                  bespoke musical compositions. Scroll through the plates to change tracks, press
                  play to focus, and click the focused artwork to spin and flip into the official album sleeve.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.12}>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-black/30 bg-terracotta text-black font-extrabold font-mono text-[0.8125rem] tracking-wider uppercase hover:bg-terracotta/90 transition-all duration-200 whitespace-nowrap self-start md:self-end group shadow-sm focus-visible:outline-black focus-visible:outline-2"
                aria-label="Read full biography and dossier on the about page"
              >
                <span className="text-black font-extrabold">EXPLORE FULL DOSSIER</span>
                <span
                  className="text-black font-extrabold transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            </Reveal>
          </div>
        </div>

        {/* React Bits FlexCarousel WebGL Exhibition & 3D Album Flip Card */}
        <Reveal delay={0.16}>
          <div className="flex flex-col gap-4">
            {/* Blended Main Div: matches section bg with zero borders or box shadows */}
            <div
              data-lenis-prevent
              className="relative w-full h-[460px] sm:h-[540px] md:h-[620px] bg-transparent overflow-hidden"
            >
              <FlexCarousel
                ref={carouselRef}
                items={carouselItems}
                preset="liquid"
                intro="rise"
                cardHeight={0.48}
                autoSpeed={24}
                gap={14}
                radius={3}
                squeeze={0.16}
                focusOnClick
                captions
                captureWheel={true}
                hideFocusedCard={isFocusOpen && hasFlipped}
                onChange={handleCarouselChange}
                onSelect={handleCarouselSelect}
                onFocusChange={handleFocusChange}
              />

              {/* 3D Spinning Flip Card Overlay (seamlessly aligned with WebGL card, smooth continuous 3D transition) */}
              {isFocusOpen && (
                <div
                  className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
                  aria-hidden={!hasFlipped}
                >
                  <div
                    style={{
                      perspective: "1400px",
                      WebkitPerspective: "1400px",
                    }}
                    className="relative h-[57.2%] sm:h-[62.4%] aspect-[3/4] select-none"
                  >
                    <div
                      onClick={handleToggleFlip}
                      role="button"
                      tabIndex={hasFlipped ? 0 : -1}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleToggleFlip();
                        }
                      }}
                      aria-label={isFlipped ? "Flip back to Nishant's artwork plate" : "Flip to song album cover"}
                      style={{
                        transformStyle: "preserve-3d",
                        WebkitTransformStyle: "preserve-3d",
                        transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                        transition: "transform 0.75s cubic-bezier(0.34, 1.25, 0.64, 1), opacity 0.2s ease-out",
                      }}
                      className={`relative w-full h-full cursor-pointer rounded-xs transition-shadow duration-500 ${
                        isFlipped
                          ? "shadow-[0_28px_70px_rgba(26,24,21,0.28)]"
                          : "shadow-[0_20px_50px_rgba(26,24,21,0.18)]"
                      } ${
                        hasFlipped ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
                      }`}
                    >
                      {/* Front Face: Nishant's Artwork Plate */}
                      <div
                        style={{
                          backfaceVisibility: "hidden",
                          WebkitBackfaceVisibility: "hidden",
                          transform: "rotateY(0deg) translateZ(1px)",
                        }}
                        className="absolute inset-0 w-full h-full bg-paper-edge border border-hairline-strong rounded-xs overflow-hidden"
                      >
                        <Image
                          src={currentTrack.src}
                          alt={currentTrack.alt}
                          fill
                          sizes="(max-width: 768px) 85vw, 500px"
                          className="object-cover"
                          priority
                        />
                        {/* Interactive Flip Badge Pill */}
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-paper/95 backdrop-blur-xs border border-hairline-strong text-[0.625rem] font-mono text-ink group-hover:border-terracotta group-hover:text-terracotta transition-all flex items-center gap-1.5 shadow-sm whitespace-nowrap">
                          <span className="text-terracotta">⟳</span>
                          <span>FLIP TO ALBUM COVER</span>
                        </div>
                      </div>

                      {/* Back Face: Official Song Album Cover Artwork */}
                      <div
                        style={{
                          backfaceVisibility: "hidden",
                          WebkitBackfaceVisibility: "hidden",
                          transform: "rotateY(180deg) translateZ(1px)",
                        }}
                        className="absolute inset-0 w-full h-full bg-ink border border-hairline-strong rounded-xs overflow-hidden flex flex-col justify-between p-3.5 sm:p-4 text-paper"
                      >
                        {/* Header of Album Sleeve */}
                        <div className="flex items-center justify-between text-[0.5625rem] sm:text-[0.625rem] font-mono tracking-widest text-muted border-b border-hairline/20 pb-2">
                          <span className="text-terracotta font-semibold">OFFICIAL ALBUM COVER</span>
                          <span className="truncate max-w-[130px] sm:max-w-none">{currentTrack.album.toUpperCase()}</span>
                        </div>

                        {/* Album Cover Main Artwork */}
                        <div className="relative w-full flex-1 my-2.5 rounded-xs overflow-hidden border border-hairline/25 bg-black/60 shadow-inner">
                          <Image
                            src={currentTrack.coverSrc}
                            alt={`${currentTrack.songTitle} official album cover`}
                            fill
                            sizes="(max-width: 768px) 85vw, 500px"
                            className="object-cover"
                          />
                        </div>

                        {/* Footer of Album Sleeve */}
                        <div className="flex flex-col gap-0.5 pt-1.5 border-t border-hairline/20">
                          <div className="flex items-center justify-between">
                            <span className="font-serif text-base sm:text-lg text-paper leading-tight truncate">
                              {currentTrack.songTitle}
                            </span>
                            <span className="text-[0.5625rem] sm:text-[0.625rem] font-mono text-terracotta whitespace-nowrap">
                              TRACK 0{activeIdx + 1}
                            </span>
                          </div>
                          <span className="text-[0.6875rem] sm:text-[0.75rem] font-sans text-muted truncate">
                            {currentTrack.artist}
                          </span>
                        </div>

                        {/* Interactive Flip Back Badge Pill */}
                        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-paper/95 text-ink border border-hairline-strong text-[0.625rem] font-mono group-hover:border-terracotta group-hover:text-terracotta transition-all flex items-center gap-1.5 shadow-sm whitespace-nowrap">
                          <span className="text-terracotta">⟳</span>
                          <span>FLIP TO ARTWORK</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Spotify Audio Controller Integrated Bar */}
            <SpotifyPlatePlayer
              tracks={carouselItems}
              activeIdx={activeIdx}
              onTrackChange={handleTrackChange}
              onPlayStateChange={handlePlayStateChange}
              isFocusOpen={isFocusOpen}
              onToggleFocus={handleToggleFocus}
              isFlipped={isFlipped}
              onToggleFlip={handleToggleFlip}
            />

            {/* Architectural Navigation & Controls Legend Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 meta-label text-[0.6875rem] text-muted font-mono pt-3 border-t border-hairline">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => carouselRef.current?.prev()}
                  className="inline-flex items-center justify-center gap-1 min-w-[68px] min-h-[36px] px-3.5 py-1.5 rounded-full border border-hairline-strong bg-paper text-ink hover:border-terracotta hover:text-terracotta hover:bg-paper-soft transition-colors cursor-pointer focus-visible:outline-ink focus-visible:outline-2 text-[0.6875rem] active:scale-95"
                  aria-label="Previous plate"
                >
                  <span>←</span>
                  <span>PREV</span>
                </button>
                <button
                  type="button"
                  onClick={() => carouselRef.current?.next()}
                  className="inline-flex items-center justify-center gap-1 min-w-[68px] min-h-[36px] px-3.5 py-1.5 rounded-full border border-hairline-strong bg-paper text-ink hover:border-terracotta hover:text-terracotta hover:bg-paper-soft transition-colors cursor-pointer focus-visible:outline-ink focus-visible:outline-2 text-[0.6875rem] active:scale-95"
                  aria-label="Next plate"
                >
                  <span>NEXT</span>
                  <span>→</span>
                </button>
                <span className="text-muted/70 pl-2 hidden sm:inline">
                  SCROLL / WHEEL CHANGES SONG · CLICK FOCUSED IMAGE TO SPIN & FLIP
                </span>
              </div>
              <div className="flex items-center gap-2 text-muted/60 text-[0.625rem]">
                <span
                  className={`inline-block w-1.5 h-1.5 rounded-full ${
                    isPlaying ? "bg-terracotta animate-ping" : "bg-muted animate-pulse"
                  }`}
                />
                <span>
                  {isPlaying ? (isFlipped ? "ALBUM COVER VIEW" : "PLATE ARTWORK VIEW") : "SPOTIFY SYNC READY"}
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
