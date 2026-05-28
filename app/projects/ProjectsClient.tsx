"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Filter } from "lucide-react";
import ProjectCard from "@/app/components/projects/ProjectCard";
import type { Project } from "@/lib/github";
import GitBranch from "../components/ui/svg/GitBranch";

export default function ProjectsClient({ initialProjects }: { initialProjects: Project[] }) {
  const [activeLanguage, setActiveLanguage] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"stars" | "updated" | "name">("stars");

  const languages = useMemo(
    () => Array.from(new Set(initialProjects.map((p) => p.language).filter(Boolean))) as string[],
    [initialProjects]
  );

  const filtered = useMemo(() => {
    let result = [...initialProjects];
    if (activeLanguage) result = result.filter((p) => p.language === activeLanguage);
    if (sortBy === "stars") result.sort((a, b) => b.stars - a.stars);
    if (sortBy === "name") result.sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === "updated") result.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    return result;
  }, [activeLanguage, sortBy, initialProjects]);

  return (
    <>
      {/* Header */}
      <section
        className="relative z-10 pt-28 md:pt-36 pb-16 md:pb-20"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div className="section-container">
          <Link
            href="/"
            className="inline-flex items-center gap-2 mb-10 text-mono"
            style={{ color: "rgba(240,237,230,0.4)" }}
          >
            <ArrowLeft className="w-6 h-6" />
            Back to Home
          </Link>

          <div className="flex items-center gap-4 mb-8">
            <span className="text-mono" style={{ color: "var(--accent)" }}>Archive</span>
            <span className="w-8 h-px" style={{ background: "var(--accent)" }} />
          </div>

          <h1 className="text-h1 mb-4 flex items-center gap-4" style={{ color: "var(--fg)" }}>
            <span>
              All <span style={{ color: "var(--accent)" }}>Projects</span>
            </span>
            <GitBranch size={56} />
          </h1>
          <p className="text-body" style={{ color: "var(--color-muted-ash)" }}>
            {filtered.length} {filtered.length === 1 ? "project" : "projects"}
            {activeLanguage && ` in ${activeLanguage}`}
          </p>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 mt-10">
            <Filter className="w-4 h-4" style={{ color: "var(--color-muted-ash)" }} />
            {[null, ...languages].map((lang) => (
              <button
                key={lang ?? "all"}
                onClick={() => setActiveLanguage(lang)}
                className="px-4 py-2 text-mono"
                style={{
                  background: activeLanguage === lang ? "var(--accent)" : "transparent",
                  color: activeLanguage === lang ? "#000" : "var(--color-muted-ash)",
                  border: "1px solid",
                  borderColor: activeLanguage === lang ? "var(--accent)" : "var(--border-mid)",
                }}
              >
                {lang ?? "All"}
              </button>
            ))}
            <div className="ml-auto flex items-center gap-2">
              <span className="text-mono" style={{ color: "var(--color-muted-ash)" }}>Sort:</span>
              {(["stars", "updated", "name"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSortBy(s)}
                  className="text-mono px-2 py-1"
                  style={{ color: sortBy === s ? "var(--accent)" : "var(--color-muted-ash)" }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 md:py-24">
        <div className="section-container">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-body mb-6" style={{ color: "var(--color-muted-ash)" }}>
                No projects found for this filter.
              </p>
              <button
                onClick={() => setActiveLanguage(null)}
                className="px-8 py-4 font-bold text-sm uppercase tracking-widest"
                style={{ background: "var(--accent)", color: "#000" }}
              >
                Clear Filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filtered.map((project) => (
                <ProjectCard key={project.id} project={project} variant="grid" />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
