import React from "react";
import type { Metadata } from "next";
import Navbar from "../components/layout/Navbar";
import Cursor from "../components/Cursor";
import ProjectsClient from "./ProjectsClient";
import { getGithubProjects, Project } from "@/lib/github";

export const revalidate = 3600; // revalidate every hour

export const metadata: Metadata = {
  title: "Projects | Nishant Unavane — Full-Stack Developer",
  description:
    "Explore Nishant Unavane's portfolio of web applications, VS Code extensions, and open-source contributions built with React, Next.js, and TypeScript.",
  alternates: {
    canonical: "https://nishantunavane.qzz.io/projects",
  },
  openGraph: {
    title: "Projects | Nishant Unavane — Full-Stack Developer",
    description:
      "Explore my portfolio of web applications, VS Code extensions, and open-source contributions.",
    url: "https://nishantunavane.qzz.io/projects",
  },
};

const fallbackProjects: Project[] = [
  { id: 1, name: "Ollama-Agent-vs-code-extension", description: "A powerful VS Code extension integrating Ollama AI models.", url: "https://github.com/IamNishant51/Ollama-Agent-vs-code-extension", stars: 12, forks: 3, language: "TypeScript", topics: ["vs-code", "ai", "ollama"], updatedAt: "", createdAt: "" },
  { id: 2, name: "GIT-HUB-ACTIVITY-DASHBOARD-Vscode-extension", description: "Track GitHub contributions within VS Code.", url: "https://github.com/IamNishant51/GIT-HUB-ACTIVITY-DASHBOARD-Vscode-extension", stars: 8, forks: 2, language: "TypeScript", topics: ["vs-code", "github"], updatedAt: "", createdAt: "" },
  { id: 3, name: "CODE-RUNNER-vscode-extension", description: "Execute code in 40+ languages with one click.", url: "https://github.com/IamNishant51/CODE-RUNNER-vscode-extension", stars: 15, forks: 4, language: "TypeScript", topics: ["vs-code", "code-runner"], updatedAt: "", createdAt: "" },
  { id: 4, name: "API-TESTING-vs-code-extension-", description: "REST API testing tool built into VS Code.", url: "https://github.com/IamNishant51/API-TESTING-vs-code-extension-", stars: 6, forks: 1, language: "TypeScript", topics: ["vs-code", "api"], updatedAt: "", createdAt: "" },
  { id: 5, name: "portfolio", description: "Personal portfolio website built with Next.js and GSAP.", url: "https://github.com/IamNishant51/PORTFOLIO", stars: 5, forks: 1, language: "TypeScript", topics: ["nextjs", "gsap", "portfolio"], updatedAt: "", createdAt: "" },
  { id: 6, name: "claude-code-helper", description: "VS Code extension for AI-powered code assistance.", url: "https://github.com/IamNishant51", stars: 3, forks: 0, language: "TypeScript", topics: ["vs-code", "ai"], updatedAt: "", createdAt: "" },
];

export default async function ProjectsPage() {
  let projects = fallbackProjects;
  try {
    const fetchedProjects = await getGithubProjects();
    if (fetchedProjects.length > 0) {
      projects = fetchedProjects;
    }
  } catch (error) {
    console.error("Failed to fetch projects, using fallback.", error);
  }

  return (
    <main className="min-h-screen relative overflow-hidden" style={{ background: "var(--bg)", color: "var(--fg)" }}>
      {/* Bamboo background */}
      <div
        className="fixed inset-0 pointer-events-none select-none z-[0]"
        style={{
          backgroundImage: "url('/ASSETS/JAPNESE-BAMBOO-IMAGE.svg')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "cover",
          opacity: 0.065,
        }}
        aria-hidden="true"
      />
      <Cursor />
      <Navbar />
      <ProjectsClient initialProjects={projects} />
    </main>
  );
}
