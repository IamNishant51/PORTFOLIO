"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Filter } from "lucide-react";
import ProjectCard from "@/app/components/projects/ProjectCard";
import type { Project } from "@/lib/github";

const fallbackProjects: Project[] = [
  {
    id: 1, name: "Ollama-Agent-vs-code-extension", description: "A powerful VS Code extension integrating Ollama AI models.", url: "https://github.com/IamNishant51/Ollama-Agent-vs-code-extension", stars: 12, forks: 3, language: "TypeScript", topics: ["vs-code", "ai", "ollama"], updatedAt: "", createdAt: "",
  },
  {
    id: 2, name: "GIT-HUB-ACTIVITY-DASHBOARD-Vscode-extension", description: "Track GitHub contributions within VS Code.", url: "https://github.com/IamNishant51/GIT-HUB-ACTIVITY-DASHBOARD-Vscode-extension", stars: 8, forks: 2, language: "TypeScript", topics: ["vs-code", "github"], updatedAt: "", createdAt: "",
  },
  {
    id: 3, name: "CODE-RUNNER-vscode-extension", description: "Execute code in 40+ languages with one click.", url: "https://github.com/IamNishant51/CODE-RUNNER-vscode-extension", stars: 15, forks: 4, language: "TypeScript", topics: ["vs-code", "code-runner"], updatedAt: "", createdAt: "",
  },
  {
    id: 4, name: "API-TESTING-vs-code-extension-", description: "REST API testing tool built into VS Code.", url: "https://github.com/IamNishant51/API-TESTING-vs-code-extension-", stars: 6, forks: 1, language: "TypeScript", topics: ["vs-code", "api"], updatedAt: "", createdAt: "",
  },
  {
    id: 5, name: "portfolio", description: "Personal portfolio website built with Next.js and Three.js.", url: "https://github.com/IamNishant51/PORTFOLIO", stars: 5, forks: 1, language: "TypeScript", topics: ["nextjs", "threejs", "portfolio"], updatedAt: "", createdAt: "",
  },
  {
    id: 6, name: "claude-code-helper", description: "VS Code extension for AI-powered code assistance.", url: "https://github.com/IamNishant51", stars: 3, forks: 0, language: "TypeScript", topics: ["vs-code", "ai"], updatedAt: "", createdAt: "",
  },
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [filtered, setFiltered] = useState<Project[]>(fallbackProjects);
  const [loading, setLoading] = useState(true);
  const [activeLanguage, setActiveLanguage] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"stars" | "updated" | "name">("stars");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const mod = await import("@/lib/github");
        const all = await mod.getGithubProjects();
        if (all.length > 0) {
          setProjects(all);
          setFiltered(all);
        }
      } catch {
        // fallback
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const languages = Array.from(
    new Set(projects.map((p) => p.language).filter(Boolean))
  ) as string[];

  useEffect(() => {
    let result = [...projects];
    if (activeLanguage) {
      result = result.filter((p) => p.language === activeLanguage);
    }
    switch (sortBy) {
      case "stars":
        result.sort((a, b) => b.stars - a.stars);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "updated":
        result.sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
        break;
    }
    setFiltered(result);
  }, [activeLanguage, sortBy, projects]);

  return (
    <main className="min-h-screen bg-white bg-white text-black text-black">
      <section id="projects" className="pt-20 sm:pt-24 md:pt-28 lg:pt-36 pb-16 sm:pb-20 md:pb-24 lg:pb-32 px-4 sm:px-6 md:px-8 lg:px-16 border-b border-black/10 border-black/10">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 mb-8 text-sm md:text-base text-black/60 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6">
            <div>
              <span className="text-xs md:text-sm font-mono uppercase tracking-[0.3em] text-black/50 mb-2 block">
                Archive
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight mb-4">
                All Projects
              </h1>
              <p className="text-sm md:text-base text-black/50 text-black/50 max-w-2xl">
                {filtered.length} {filtered.length === 1 ? "project" : "projects"}
                {activeLanguage && ` in ${activeLanguage}`}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 mt-8">
            <Filter className="w-4 h-4 text-black/40 text-black/40" />
            <button
              onClick={() => setActiveLanguage(null)}
              className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider border transition-all duration-300 ${
                !activeLanguage
                  ? "bg-black text-white border-black"
                  : "border-black/20 text-black/60 hover:border-black hover:text-black"
              }`}
            >
              All
            </button>
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setActiveLanguage(lang)}
                className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider border transition-all duration-300 ${
                  activeLanguage === lang
                    ? "bg-black text-white border-black"
                    : "border-black/20 text-black/60 hover:border-black hover:text-black"
                }`}
              >
                {lang}
              </button>
            ))}
            <div className="ml-auto flex items-center gap-2 text-xs text-black/40 text-black/40">
              <span>Sort:</span>
              {(["stars", "updated", "name"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSortBy(s)}
                  className={`uppercase tracking-wider px-2 py-1 transition-colors ${
                    sortBy === s ? "text-black" : "hover:text-black/70"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="h-[200px] sm:h-[240px] bg-white/5 border border-white/10 animate-pulse"
                />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-black/50">No projects found for this filter.</p>
              <button
                onClick={() => setActiveLanguage(null)}
                className="mt-4 px-6 py-3 bg-black text-white font-bold uppercase text-sm tracking-wider hover:bg-black/90 transition-all"
              >
                Clear Filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
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
