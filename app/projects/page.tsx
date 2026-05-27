"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Filter } from "lucide-react";
import ProjectCard from "@/app/components/projects/ProjectCard";
import type { Project } from "@/lib/github";
import GitBranch from "../components/ui/svg/GitBranch";
import Navbar from "../components/layout/Navbar";
import Cursor from "../components/Cursor";

const fallbackProjects: Project[] = [
  { id: 1, name: "Ollama-Agent-vs-code-extension", description: "A powerful VS Code extension integrating Ollama AI models.", url: "https://github.com/IamNishant51/Ollama-Agent-vs-code-extension", stars: 12, forks: 3, language: "TypeScript", topics: ["vs-code", "ai", "ollama"], updatedAt: "", createdAt: "" },
  { id: 2, name: "GIT-HUB-ACTIVITY-DASHBOARD-Vscode-extension", description: "Track GitHub contributions within VS Code.", url: "https://github.com/IamNishant51/GIT-HUB-ACTIVITY-DASHBOARD-Vscode-extension", stars: 8, forks: 2, language: "TypeScript", topics: ["vs-code", "github"], updatedAt: "", createdAt: "" },
  { id: 3, name: "CODE-RUNNER-vscode-extension", description: "Execute code in 40+ languages with one click.", url: "https://github.com/IamNishant51/CODE-RUNNER-vscode-extension", stars: 15, forks: 4, language: "TypeScript", topics: ["vs-code", "code-runner"], updatedAt: "", createdAt: "" },
  { id: 4, name: "API-TESTING-vs-code-extension-", description: "REST API testing tool built into VS Code.", url: "https://github.com/IamNishant51/API-TESTING-vs-code-extension-", stars: 6, forks: 1, language: "TypeScript", topics: ["vs-code", "api"], updatedAt: "", createdAt: "" },
  { id: 5, name: "portfolio", description: "Personal portfolio website built with Next.js and GSAP.", url: "https://github.com/IamNishant51/PORTFOLIO", stars: 5, forks: 1, language: "TypeScript", topics: ["nextjs", "gsap", "portfolio"], updatedAt: "", createdAt: "" },
  { id: 6, name: "claude-code-helper", description: "VS Code extension for AI-powered code assistance.", url: "https://github.com/IamNishant51", stars: 3, forks: 0, language: "TypeScript", topics: ["vs-code", "ai"], updatedAt: "", createdAt: "" },
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [filtered, setFiltered] = useState<Project[]>(fallbackProjects);
  const [loading, setLoading] = useState(true);
  const [activeLanguage, setActiveLanguage] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"stars" | "updated" | "name">("stars");

  useEffect(() => {
    (async () => {
      try {
        const mod = await import("@/lib/github");
        const all = await mod.getGithubProjects();
        if (all.length > 0) { setProjects(all); setFiltered(all); }
      } catch { /* use fallback */ }
      finally { setLoading(false); }
    })();
  }, []);

  const languages = Array.from(new Set(projects.map((p) => p.language).filter(Boolean))) as string[];

  useEffect(() => {
    let result = [...projects];
    if (activeLanguage) result = result.filter((p) => p.language === activeLanguage);
    if (sortBy === "stars") result.sort((a, b) => b.stars - a.stars);
    if (sortBy === "name") result.sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === "updated") result.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    setFiltered(result);
  }, [activeLanguage, sortBy, projects]);

  return (
    <main className="min-h-screen relative overflow-hidden" style={{ background: "var(--bg)", color: "var(--fg)" }}>
      {/* ── Bamboo background — paints first, behind all content ── */}
      <div
        className="absolute inset-0 pointer-events-none select-none"
        style={{
          backgroundImage: "url('/ASSETS/JAPNESE-BAMBOO-IMAGE.svg')",
          backgroundRepeat: "repeat-x",
          backgroundPosition: "bottom center",
          backgroundSize: "auto 90%",
          opacity: 0.065,
        }}
        aria-hidden="true"
      />
      <Cursor />
      <Navbar />
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
            <ArrowLeft className="w-4 h-4" />
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
          <p className="text-body" style={{ color: "rgba(240,237,230,0.4)" }}>
            {filtered.length} {filtered.length === 1 ? "project" : "projects"}
            {activeLanguage && ` in ${activeLanguage}`}
          </p>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 mt-10">
            <Filter className="w-4 h-4" style={{ color: "rgba(240,237,230,0.3)" }} />
            {[null, ...languages].map((lang) => (
              <button
                key={lang ?? "all"}
                onClick={() => setActiveLanguage(lang)}
                className="px-4 py-2 text-mono"
                style={{
                  background: activeLanguage === lang ? "var(--accent)" : "transparent",
                  color: activeLanguage === lang ? "#000" : "rgba(240,237,230,0.5)",
                  border: "1px solid",
                  borderColor: activeLanguage === lang ? "var(--accent)" : "var(--border-mid)",
                }}
              >
                {lang ?? "All"}
              </button>
            ))}
            <div className="ml-auto flex items-center gap-2">
              <span className="text-mono" style={{ color: "rgba(240,237,230,0.3)" }}>Sort:</span>
              {(["stars", "updated", "name"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSortBy(s)}
                  className="text-mono px-2 py-1"
                  style={{ color: sortBy === s ? "var(--accent)" : "rgba(240,237,230,0.35)" }}
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
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="h-48 animate-pulse"
                  style={{ background: "rgba(240,237,230,0.04)", border: "1px solid var(--border)" }}
                />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-body mb-6" style={{ color: "rgba(240,237,230,0.4)" }}>
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
    </main>
  );
}
