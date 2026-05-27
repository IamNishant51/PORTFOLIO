"use client";
import React from "react";
import { Star, GitFork, ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/github";

interface ProjectCardProps {
  project: Project;
  variant?: "featured-large" | "featured" | "grid";
}

export default function ProjectCard({ project, variant = "grid" }: ProjectCardProps) {
  const heightClass =
    variant === "featured-large"
      ? "min-h-[360px]"
      : variant === "featured"
        ? "min-h-[300px]"
        : "min-h-[220px]";

  const titleClass =
    variant === "featured-large"
      ? "text-2xl md:text-3xl"
      : variant === "featured"
        ? "text-xl md:text-2xl"
        : "text-base md:text-lg";

  const maxTopics = variant === "featured-large" ? 4 : variant === "featured" ? 3 : 2;

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex flex-col justify-between p-6 overflow-hidden ${heightClass}`}
      style={{
        background: "rgba(240,237,230,0.02)",
        border: "1px solid var(--border)",
        transition: "border-color 0.3s ease, background 0.3s ease !important",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border-hi)";
        (e.currentTarget as HTMLElement).style.background = "rgba(240,237,230,0.04)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
        (e.currentTarget as HTMLElement).style.background = "rgba(240,237,230,0.02)";
      }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between mb-4">
        <div
          className="flex items-center gap-2 text-mono"
          style={{ color: "var(--accent)" }}
        >
          <span className="w-1.5 h-1.5" style={{ background: "var(--accent)" }} />
          {project.language || "Code"}
        </div>
        <ArrowUpRight
          className="w-4 h-4 flex-shrink-0 opacity-30 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          style={{ color: "var(--fg)" }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 space-y-3">
        <h3
          className={`font-semibold leading-tight uppercase ${titleClass}`}
          style={{ color: "var(--fg)" }}
        >
          {project.name.replace(/-/g, " ")}
        </h3>
        <p className="text-small line-clamp-2" style={{ color: "var(--color-muted-ash)" }}>
          {project.description || "No description provided."}
        </p>

        {project.topics.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.topics.slice(0, maxTopics).map((topic) => (
              <span
                key={topic}
                className="px-2 py-0.5 text-mono"
                style={{
                  border: "1px solid var(--border-mid)",
                  color: "var(--color-muted-ash)",
                }}
              >
                {topic}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Stats */}
      <div
        className="flex flex-wrap gap-4 mt-4 pt-4 text-mono opacity-40 group-hover:opacity-100 transition-opacity duration-300"
        style={{ borderTop: "1px solid var(--border)", color: "var(--color-muted-ash)" }}
      >
        <span className="flex items-center gap-1.5">
          <Star className="flex-shrink-0" size={12} /> {project.stars}
        </span>
        <span className="flex items-center gap-1.5">
          <GitFork className="flex-shrink-0" size={12} /> {project.forks}
        </span>
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px origin-left scale-x-0 group-hover:scale-x-100"
        style={{
          background: "var(--accent)",
          transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1) !important",
        }}
      />
    </a>
  );
}
