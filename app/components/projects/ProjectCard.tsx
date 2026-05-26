"use client";
import React, { useRef } from "react";
import { Star, GitFork, ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/github";

interface ProjectCardProps {
  project: Project;
  variant?: "featured-large" | "featured" | "grid";
}


export default function ProjectCard({ project, variant = "grid" }: ProjectCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const langColor = "#000";

  const heightClass = variant === "featured-large"
    ? "h-[360px] sm:h-[420px] md:h-[480px]"
    : variant === "featured"
      ? "h-[300px] sm:h-[340px] md:h-[380px]"
      : "h-[240px] sm:h-[280px]";

  const titleClass = variant === "featured-large"
    ? "text-2xl sm:text-3xl md:text-4xl"
    : variant === "featured"
      ? "text-xl sm:text-2xl md:text-3xl"
      : "text-base sm:text-lg";

  const maxTopics = variant === "featured-large" ? 4 : variant === "featured" ? 3 : 2;

  return (
    <a
      ref={cardRef}
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative block bg-white/70 border border-black/15
        hover:border-black transition-[transform,border-color] duration-300 overflow-hidden ${heightClass} flex flex-col justify-between
        hover:translate-x-[1px] hover:translate-y-[1px]`}
    >
      {/* Screenshot area */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/5 via-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.7) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.7) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Noise grain on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.04] mix-blend-overlay pointer-events-none transition-opacity duration-500"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Top bar */}
      <div className="relative z-10 w-full flex justify-between items-start p-4 md:p-6">
        <div
          className="flex items-center gap-2 px-3 py-1 text-[10px] sm:text-small font-mono uppercase tracking-wider"
          style={{ color: langColor }}
        >
          <span className="w-1.5 h-1.5 bg-current" />
          {project.language || "Code"}
        </div>
        <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 opacity-40 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-black" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full p-4 md:p-6 space-y-2">
        <h3 className={`font-normal leading-tight tracking-tight text-black ${titleClass}`}>
          {project.name.replace(/-/g, " ")}
        </h3>
        <p className="text-xs sm:text-sm opacity-60 text-black line-clamp-2">
          {project.description || "No description provided."}
        </p>

        {project.topics.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {project.topics.slice(0, maxTopics).map((topic) => (
              <span
                key={topic}
                className="px-2 py-0.5 text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-black border border-black/20"
              >
                {topic}
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-4 sm:gap-6 opacity-40 group-hover:opacity-100 transition-opacity duration-300 font-mono text-[10px] sm:text-xs text-black mt-4">
          <span className="flex items-center gap-1 sm:gap-2">
            <Star size={12} className="sm:w-[14px] sm:h-[14px] text-black/60" /> {project.stars}
          </span>
          <span className="flex items-center gap-1 sm:gap-2">
            <GitFork size={12} className="sm:w-[14px] sm:h-[14px]" /> {project.forks}
          </span>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </a>
  );
}
