"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";

export interface PlateTrackItem {
  src: string;
  coverSrc: string;
  alt: string;
  title: string;
  subtitle: string;
  songTitle: string;
  artist: string;
  album: string;
  audioSrc: string;
}

interface SpotifyPlatePlayerProps {
  tracks: PlateTrackItem[];
  activeIdx: number;
  onTrackChange: (newIdx: number, autoPlay?: boolean) => void;
  onPlayStateChange?: (isPlaying: boolean) => void;
  isFocusOpen: boolean;
  onToggleFocus: () => void;
  isFlipped?: boolean;
  onToggleFlip?: () => void;
}

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

export function SpotifyPlatePlayer({
  tracks,
  activeIdx,
  onTrackChange,
  onPlayStateChange,
  isFocusOpen,
  onToggleFocus,
  isFlipped = false,
  onToggleFlip,
}: SpotifyPlatePlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [repeatMode, setRepeatMode] = useState<"off" | "all" | "one">("all");
  const [likedMap, setLikedMap] = useState<Record<number, boolean>>({});

  const onPlayStateChangeRef = useRef(onPlayStateChange);
  useEffect(() => {
    onPlayStateChangeRef.current = onPlayStateChange;
  });

  const currentTrack = tracks[activeIdx] || tracks[0];

  // Handle track source update
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const currentSrc = audio.src;
    if (!currentSrc.endsWith(currentTrack.audioSrc)) {
      audio.src = currentTrack.audioSrc;
      setCurrentTime(0);

      if (isPlaying) {
        audio.load();
        audio
          .play()
          .catch(() => {
            setIsPlaying(false);
          });
      }
    }
  }, [currentTrack.audioSrc, isPlaying]);

  // Audio element listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = isMuted ? 0 : volume;

    const onLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const onPlay = () => {
      setIsPlaying(true);
      onPlayStateChangeRef.current?.(true);
    };
    const onPause = () => {
      setIsPlaying(false);
      onPlayStateChangeRef.current?.(false);
    };

    const onEnded = () => {
      if (repeatMode === "one") {
        audio.currentTime = 0;
        audio.play().catch(() => setIsPlaying(false));
      } else if (repeatMode === "all") {
        let nextIdx = (activeIdx + 1) % tracks.length;
        if (isShuffling && tracks.length > 1) {
          let rand = Math.floor(Math.random() * tracks.length);
          while (rand === activeIdx) {
            rand = Math.floor(Math.random() * tracks.length);
          }
          nextIdx = rand;
        }
        onTrackChange(nextIdx, true);
      } else {
        setIsPlaying(false);
        setCurrentTime(0);
      }
    };

    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, [volume, isMuted, repeatMode, isShuffling, activeIdx, tracks.length, onTrackChange]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    }
  }, [isPlaying]);

  const handlePrev = useCallback(() => {
    const audio = audioRef.current;
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0;
      setCurrentTime(0);
      return;
    }
    const prevIdx = (activeIdx - 1 + tracks.length) % tracks.length;
    onTrackChange(prevIdx, isPlaying);
  }, [activeIdx, tracks.length, onTrackChange, isPlaying]);

  const handleNext = useCallback(() => {
    let nextIdx = (activeIdx + 1) % tracks.length;
    if (isShuffling && tracks.length > 1) {
      let rand = Math.floor(Math.random() * tracks.length);
      while (rand === activeIdx) {
        rand = Math.floor(Math.random() * tracks.length);
      }
      nextIdx = rand;
    }
    onTrackChange(nextIdx, isPlaying);
  }, [activeIdx, tracks.length, isShuffling, onTrackChange, isPlaying]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    setCurrentTime(seekTime);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    setIsMuted(newVol === 0);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      if (audioRef.current) audioRef.current.volume = volume || 0.8;
    } else {
      setIsMuted(true);
      if (audioRef.current) audioRef.current.volume = 0;
    }
  };

  const toggleLike = () => {
    setLikedMap((prev) => ({
      ...prev,
      [activeIdx]: !prev[activeIdx],
    }));
  };

  const cycleRepeat = () => {
    if (repeatMode === "off") setRepeatMode("all");
    else if (repeatMode === "all") setRepeatMode("one");
    else setRepeatMode("off");
  };

  const isLiked = !!likedMap[activeIdx];
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className="w-full rounded-xs border border-hairline-strong bg-paper-edge shadow-[0_4px_24px_rgba(26,24,21,0.06)] px-4 sm:px-6 py-4 flex flex-col gap-3 select-none transition-all duration-300"
      role="region"
      aria-label="Spotify Archival Audio Player"
    >
      <audio ref={audioRef} preload="none" />

      {/* Main 3-Column Spotify Controller Layout */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Column: Track Details & Artwork */}
        <div className="flex items-center gap-3.5 w-full md:w-1/3 min-w-0">
          {/* Plate Artwork / Song Cover Thumbnail with flip indicator */}
          <div
            onClick={onToggleFlip || onToggleFocus}
            className="relative w-12 h-14 sm:w-14 sm:h-16 flex-shrink-0 rounded-xs overflow-hidden border border-hairline-strong bg-paper cursor-pointer group shadow-xs hover:border-terracotta transition-colors"
            title={onToggleFlip ? "Click to flip between artwork and song cover" : "Click to toggle focused lens"}
          >
            <Image
              src={isFlipped ? currentTrack.coverSrc : currentTrack.src}
              alt={isFlipped ? `${currentTrack.songTitle} Cover` : currentTrack.alt}
              fill
              sizes="64px"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {isPlaying && (
              <div className="absolute inset-0 bg-ink/20 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-terracotta animate-ping" />
              </div>
            )}
            {/* Flip badge on thumbnail */}
            {onToggleFlip && (
              <span className="absolute bottom-0.5 right-0.5 px-1 py-0.2 bg-paper/90 text-[0.5rem] font-mono text-ink rounded-xs">
                ⟳
              </span>
            )}
          </div>

          {/* Song & Artist Names */}
          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="font-serif text-base sm:text-lg text-ink font-normal leading-tight truncate">
                {currentTrack.songTitle}
              </span>
              {/* Equalizer Waveform Bars when playing */}
              {isPlaying && (
                <div
                  className="flex items-end gap-0.5 h-3 flex-shrink-0"
                  aria-label="Playing audio"
                >
                  <span className="w-0.5 h-3 bg-terracotta animate-pulse" />
                  <span
                    className="w-0.5 h-2 bg-terracotta animate-pulse"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="w-0.5 h-3 bg-terracotta animate-pulse"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              )}
            </div>

            <span className="font-sans text-[0.75rem] text-muted truncate">
              {currentTrack.artist}
            </span>

            <div className="flex items-center gap-1.5 text-[0.625rem] font-mono text-muted/80 mt-0.5">
              <span className="text-terracotta font-semibold">
                PLATE 0{activeIdx + 1}
              </span>
              <span>·</span>
              <span className="truncate">{currentTrack.title}</span>
            </div>
          </div>

          {/* Spotify Heart / Like Button */}
          <button
            type="button"
            onClick={toggleLike}
            className={`p-1.5 rounded-full hover:bg-paper-soft transition-colors cursor-pointer focus-visible:outline-ink ${
              isLiked ? "text-terracotta" : "text-muted hover:text-ink"
            }`}
            aria-label={isLiked ? "Remove from liked songs" : "Save to liked songs"}
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill={isLiked ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth={isLiked ? "0" : "1.75"}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </button>
        </div>

        {/* Center Column: Spotify Controls & Scrubber */}
        <div className="flex flex-col items-center gap-2 w-full md:w-5/12 max-w-[500px]">
          {/* Control Buttons Row */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Shuffle Button */}
            <button
              type="button"
              onClick={() => setIsShuffling(!isShuffling)}
              className={`p-1.5 rounded-full hover:bg-paper-soft transition-colors cursor-pointer relative ${
                isShuffling ? "text-terracotta font-bold" : "text-muted hover:text-ink"
              }`}
              title={isShuffling ? "Disable shuffle" : "Enable shuffle"}
              aria-label="Shuffle playback"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
              </svg>
              {isShuffling && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-terracotta" />
              )}
            </button>

            {/* Prev Track Button */}
            <button
              type="button"
              onClick={handlePrev}
              className="p-2 text-ink hover:text-terracotta transition-colors cursor-pointer active:scale-95 focus-visible:outline-ink"
              aria-label="Previous track & plate"
              title="Previous song (or restart)"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
              </svg>
            </button>

            {/* Master Play / Pause Button (Spotify Circular Button) */}
            <button
              type="button"
              onClick={togglePlay}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-ink text-paper hover:bg-terracotta hover:text-white transition-all duration-200 flex items-center justify-center cursor-pointer shadow-md active:scale-95 focus-visible:outline-ink focus-visible:outline-2"
              aria-label={isPlaying ? "Pause audio and exit focus" : "Play audio and enter focus lens"}
              title={isPlaying ? "Pause song" : "Play song & focus plate"}
            >
              {isPlaying ? (
                <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 sm:w-5 sm:h-5 translate-x-0.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            {/* Next Track Button */}
            <button
              type="button"
              onClick={handleNext}
              className="p-2 text-ink hover:text-terracotta transition-colors cursor-pointer active:scale-95 focus-visible:outline-ink"
              aria-label="Next track & plate"
              title="Next song & plate"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
              </svg>
            </button>

            {/* Repeat Button */}
            <button
              type="button"
              onClick={cycleRepeat}
              className={`p-1.5 rounded-full hover:bg-paper-soft transition-colors cursor-pointer relative ${
                repeatMode !== "off" ? "text-terracotta font-bold" : "text-muted hover:text-ink"
              }`}
              title={`Repeat: ${repeatMode}`}
              aria-label="Repeat mode"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 2l4 4-4 4M3 11V9a4 4 0 014-4h14M7 22l-4-4 4-4M21 13v2a4 4 0 01-4 4H3" />
              </svg>
              {repeatMode === "one" && (
                <span className="absolute -top-1 right-0 text-[0.5625rem] font-bold font-mono text-terracotta">
                  1
                </span>
              )}
              {repeatMode === "all" && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-terracotta" />
              )}
            </button>
          </div>

          {/* Scrubber Progress Bar Row */}
          <div className="flex items-center gap-2.5 w-full font-mono text-[0.6875rem] text-muted">
            <span className="w-9 text-right tabular-nums">{formatTime(currentTime)}</span>
            <div className="relative flex-1 flex items-center group cursor-pointer h-5">
              {/* Background Track */}
              <div className="w-full h-1 bg-hairline-strong rounded-full overflow-hidden">
                <div
                  className="h-full bg-ink group-hover:bg-terracotta transition-all duration-100"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              {/* Scrubber Range Input */}
              <input
                type="range"
                min="0"
                max={duration || 100}
                step="0.1"
                value={currentTime}
                onChange={handleSeek}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                aria-label="Seek audio position"
              />
            </div>
            <span className="w-9 text-left tabular-nums">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Right Column: Volume & Flip Cover Toggle */}
        <div className="flex items-center justify-end gap-3 w-full md:w-1/3">
          {/* Volume Control */}
          <div className="flex items-center gap-2 text-muted">
            <button
              type="button"
              onClick={toggleMute}
              className="p-1 hover:text-ink transition-colors cursor-pointer"
              aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            >
              {isMuted || volume === 0 ? (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L21.75 14.25M21.75 9.75L17.25 14.25M15.536 8.464a5 5 0 010 7.072M12 6.75L7.5 10.5H3v3h4.5L12 17.25V6.75z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M12 6.75L7.5 10.5H3v3h4.5L12 17.25V6.75z" />
                </svg>
              )}
            </button>
            <div className="relative w-16 sm:w-20 h-1 bg-hairline-strong rounded-full overflow-hidden group">
              <div
                className="h-full bg-ink group-hover:bg-terracotta transition-colors"
                style={{ width: `${isMuted ? 0 : volume * 100}%` }}
              />
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                aria-label="Adjust volume"
              />
            </div>
          </div>

          <div className="h-4 w-[1px] bg-hairline hidden sm:block" />

          {/* Flip Card Toggle Button */}
          {onToggleFlip && (
            <button
              type="button"
              onClick={onToggleFlip}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[0.625rem] font-mono tracking-wider transition-all cursor-pointer focus-visible:outline-ink active:scale-95 ${
                isFlipped
                  ? "border-terracotta bg-terracotta/15 text-terracotta font-semibold"
                  : "border-hairline-strong bg-paper text-ink hover:border-terracotta hover:text-terracotta"
              }`}
              title={isFlipped ? "Flip back to Nishant's artwork plate" : "Spin and flip card to reveal song album cover"}
              aria-label={isFlipped ? "Flip back to Nishant's artwork plate" : "Flip card to song album cover"}
            >
              <span className={`transition-transform duration-500 ${isFlipped ? "rotate-180" : ""}`}>⟳</span>
              <span>{isFlipped ? "ARTWORK" : "ALBUM COVER"}</span>
            </button>
          )}

          {/* Optical Focus Lens Toggle Button */}
          <button
            type="button"
            onClick={onToggleFocus}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[0.625rem] font-mono tracking-wider transition-all cursor-pointer focus-visible:outline-ink active:scale-95 ${
              isFocusOpen
                ? "border-terracotta bg-terracotta/15 text-terracotta font-semibold"
                : "border-hairline-strong bg-paper text-ink hover:border-terracotta hover:text-terracotta"
            }`}
            title={isFocusOpen ? "Exit focused lens and reveal all plates" : "Center active plate in optical focus"}
            aria-label={isFocusOpen ? "Exit focus lens" : "Enter focus lens"}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                isFocusOpen ? "bg-terracotta animate-ping" : "bg-muted"
              }`}
            />
            <span>{isFocusOpen ? "EXIT FOCUS" : "FOCUS LENS"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
