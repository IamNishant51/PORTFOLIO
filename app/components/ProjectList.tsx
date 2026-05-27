"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import GuitarString from "./ui/GuitarString";
import GitBranch from "./ui/svg/GitBranch";

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        id: 1,
        title: "Ollama Agent",
        category: "VS Code Extension",
        index: "01",
        src: "https://ik.imagekit.io/9pfz6g8ri/avatars/ollama.jpg",
        link: "https://github.com/IamNishant51/Ollama-Agent-vs-code-extension",
        description:
            "A powerful VS Code extension that integrates Ollama AI models directly into your development workflow. Chat with AI, generate code, and get intelligent suggestions without leaving your editor.",
        technologies: ["TypeScript", "VS Code API", "Ollama", "AI/ML"],
        year: "2024",
    },
    {
        id: 2,
        title: "GitHub Activity Dashboard",
        category: "VS Code Extension",
        index: "02",
        src: "https://ik.imagekit.io/9pfz6g8ri/avatars/github.jpg",
        link: "https://github.com/IamNishant51/GIT-HUB-ACTIVITY-DASHBOARD-Vscode-extension",
        description:
            "Track your GitHub contributions, view recent activity, and monitor repository stats all within VS Code. A beautiful dashboard to keep you motivated and informed.",
        technologies: ["TypeScript", "GitHub API", "VS Code API", "Chart.js"],
        year: "2024",
    },
    {
        id: 3,
        title: "Code Runner",
        category: "VS Code Extension",
        index: "03",
        src: "https://ik.imagekit.io/9pfz6g8ri/avatars/code_runner.jpg",
        link: "https://github.com/IamNishant51/CODE-RUNNER-vscode-extension",
        description:
            "Execute code snippets in multiple programming languages with a single click. Supports 40+ languages with customizable run configurations and output formatting.",
        technologies: ["TypeScript", "Node.js", "VS Code API", "Shell"],
        year: "2023",
    },
    {
        id: 4,
        title: "API Testing",
        category: "VS Code Extension",
        index: "04",
        src: "https://ik.imagekit.io/9pfz6g8ri/avatars/API.jpg",
        link: "https://github.com/IamNishant51/API-TESTING-vs-code-extension-",
        description:
            "A lightweight REST API testing tool built into VS Code. Create, save, and organize API requests with support for environments, variables, and response visualization.",
        technologies: ["TypeScript", "VS Code API", "REST", "HTTP"],
        year: "2023",
    },
];

type Project = (typeof projects)[0];

export default function ProjectList() {
    const sectionRef = useRef<HTMLElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const revealRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);

    const [hovered, setHovered] = useState<number | null>(null);
    const [selected, setSelected] = useState<Project | null>(null);
    const scrollYRef = useRef(0);

    /* ── Mouse-following image reveal ── */
    useEffect(() => {
        const move = (e: MouseEvent) => {
            if (!revealRef.current) return;
            gsap.to(revealRef.current, {
                x: e.clientX - 80,
                y: e.clientY - 80,
                duration: 0.5,
                ease: "power2.out",
            });
        };
        window.addEventListener("mousemove", move);
        return () => window.removeEventListener("mousemove", move);
    }, []);

    useEffect(() => {
        if (!revealRef.current) return;
        if (hovered !== null && !selected) {
            gsap.to(revealRef.current, { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" });
        } else {
            gsap.to(revealRef.current, { scale: 0, opacity: 0, duration: 0.22 });
        }
    }, [hovered, selected]);

    /* ── Modal open/close ── */
    useEffect(() => {
        if (selected && modalRef.current) {
            scrollYRef.current = window.scrollY;
            document.body.style.position = "fixed";
            document.body.style.top = `-${scrollYRef.current}px`;
            document.body.style.left = "0";
            document.body.style.right = "0";
            document.body.style.overflow = "hidden";

            gsap.fromTo(modalRef.current, { opacity: 0 }, { opacity: 1, duration: 0.28 });
            gsap.fromTo(
                modalRef.current.querySelector(".modal-inner"),
                { y: 48, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.45, ease: "power3.out", delay: 0.08 }
            );
        }
    }, [selected]);

    const closeModal = () => {
        if (!modalRef.current) return;
        gsap.to(modalRef.current, {
            opacity: 0,
            duration: 0.22,
            onComplete: () => {
                document.body.style.position = "";
                document.body.style.top = "";
                document.body.style.left = "";
                document.body.style.right = "";
                document.body.style.overflow = "";
                window.scrollTo(0, scrollYRef.current);
                setSelected(null);
            },
        });
    };

    /* Close on Escape key */
    useEffect(() => {
        if (!selected) return;
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal(); };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [selected]);

    /* ── Scroll reveal ── */
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(headingRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1, ease: "power4.out",
                    scrollTrigger: { trigger: headingRef.current, start: "top 88%", once: true },
                }
            );

            if (listRef.current) {
                gsap.fromTo(Array.from(listRef.current.children),
                    { y: 36, opacity: 0 },
                    {
                        y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power3.out",
                        scrollTrigger: { trigger: listRef.current, start: "top 88%", once: true },
                    }
                );
            }
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="projects"
            className="relative overflow-hidden"
            style={{ background: "var(--bg)", borderTop: "1px solid var(--border-hi)" }}
        >
            {/* ── Bamboo background ─────────────────────────────────────────────
                Renders FIRST in DOM so it paints behind all sibling content.
                No explicit zIndex needed — later siblings are naturally on top.
                inset-0 fills the whole section; backgroundPosition bottom keeps
                the roots anchored to the floor so stalks grow upward.
            ─────────────────────────────────────────────────────────────────── */}
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
            <div className="section-container section-py relative z-10">
                {/* ── Section label ── */}
                <div className="section-label">
                    <span className="section-label-num">03</span>
                    <span className="section-label-line" />
                    <span className="section-label-text">Work</span>
                </div>

                <div ref={headingRef} className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14 md:mb-20">
                    <div>
                        <h2 className="text-heading-lg flex items-center gap-4" style={{ color: "var(--fg)" }}>
                            <span>
                                Selected<br />
                                <span style={{ color: "var(--accent)" }}>Projects</span>
                            </span>
                            <GitBranch size={56} />
                        </h2>
                    </div>
                    <div className="flex flex-col gap-4 sm:items-end">
                        <p className="text-body max-w-xs sm:text-right" style={{ color: "var(--color-muted-ash)" }}>
                            Featured work and experiments
                        </p>
                        <a
                            href="/projects"
                            className="btn-ghost-primary inline-flex items-center gap-2"
                        >
                            <span>All Projects</span>
                            <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* ── Project list ── */}
                <ul ref={listRef} className="space-y-0" role="list">
                    {projects.map((project) => (
                        <li
                            key={project.id}
                            className="group relative cursor-pointer"
                            data-cursor="view"
                            onMouseEnter={() => setHovered(project.id)}
                            onMouseLeave={() => setHovered(null)}
                            onClick={() => setSelected(project)}
                            role="button"
                            tabIndex={0}
                            aria-label={`View ${project.title} details`}
                            onKeyDown={(e) => e.key === "Enter" && setSelected(project)}
                        >
                            <div
                                className="py-5 md:py-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                            >
                                {/* Left */}
                                <div className="flex items-baseline gap-4 md:gap-7">
                                    <span
                                        className="text-mono flex-shrink-0"
                                        style={{ color: hovered === project.id ? "var(--accent)" : "var(--color-muted-ash)" }}
                                    >
                                        {project.index}
                                    </span>
                                    <h3
                                        className="text-heading"
                                        style={{
                                            color: hovered === project.id ? "var(--accent)" : "var(--fg)",
                                            transition: "color 0.3s ease !important",
                                        }}
                                    >
                                        {project.title}
                                    </h3>
                                </div>

                                {/* Right */}
                                <div className="flex items-center gap-4 ml-10 sm:ml-0">
                                    <span className="text-mono hidden sm:block" style={{ color: "var(--color-muted-ash)" }}>
                                        {project.category}
                                    </span>
                                    <span className="text-mono" style={{ color: "var(--color-muted-ash)" }}>
                                        {project.year}
                                    </span>
                                    <div
                                        className="w-8 h-8 flex items-center justify-center flex-shrink-0"
                                        style={{
                                            border: "1px solid",
                                            borderColor: hovered === project.id ? "var(--accent)" : "var(--border-hi)",
                                            color: hovered === project.id ? "var(--accent)" : "var(--color-muted-ash)",
                                            transform: hovered === project.id ? "rotate(45deg)" : "rotate(0deg)",
                                            transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.3s ease, color 0.3s ease !important",
                                        }}
                                        aria-hidden="true"
                                    >
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <GuitarString index={project.index} onClick={() => setSelected(project)} />
                        </li>
                    ))}
                </ul>
            </div>

            {/* ── Floating image reveal (desktop only) ── */}
            <div
                ref={revealRef}
                className="fixed top-0 left-0 pointer-events-none z-30 overflow-hidden opacity-0 hidden md:block"
                style={{
                    width: "160px",
                    height: "160px",
                    border: "1px solid var(--border-hi)",
                }}
                aria-hidden="true"
            >
                {projects.map((p) => (
                    <div
                        key={p.id}
                        className="absolute inset-0"
                        style={{ opacity: hovered === p.id ? 1 : 0, transition: "opacity 0.28s ease !important" }}
                    >
                        <Image src={p.src} alt={p.title} fill sizes="160px" className="object-cover" />
                        <div
                            className="absolute inset-0"
                            style={{ background: "linear-gradient(to top, rgba(12,12,11,0.55) 0%, transparent 55%)" }}
                        />
                    </div>
                ))}
            </div>

            {/* ── Modal ── */}
            {selected && (
                <div
                    ref={modalRef}
                    className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
                    onClick={closeModal}
                    role="dialog"
                    aria-modal="true"
                    aria-label={selected.title}
                >
                    <div
                        className="absolute inset-0"
                        style={{ background: "rgba(12,12,11,0.82)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
                    />
                    <div
                        className="modal-inner relative w-full sm:w-[95%] max-w-3xl flex flex-col overflow-hidden"
                        style={{
                            background: "var(--bg)",
                            border: "1px solid var(--border-hi)",
                            maxHeight: "min(90svh, 90vh)",
                            paddingBottom: "env(safe-area-inset-bottom)",
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close */}
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 z-10 flex items-center justify-center"
                            style={{
                                width: "40px", height: "40px",
                                border: "1px solid var(--border-hi)",
                                color: "var(--fg)",
                                background: "var(--bg)",
                                cursor: "pointer",
                            }}
                            aria-label="Close modal"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Scrollable content */}
                        <div className="flex-1 overflow-y-auto">
                            {/* Image */}
                            <div className="relative w-full" style={{ height: "clamp(180px, 35vw, 280px)", flexShrink: 0 }}>
                                <Image
                                    src={selected.src}
                                    alt={selected.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 768px"
                                    className="object-cover"
                                />
                                <div
                                    className="absolute inset-0"
                                    style={{ background: "linear-gradient(to top, var(--bg) 0%, transparent 55%)" }}
                                />
                            </div>

                            {/* Info */}
                            <div className="p-6 md:p-10">
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="text-mono" style={{ color: "var(--accent)" }}>{selected.index}</span>
                                    <span className="text-mono" style={{ color: "var(--color-muted-ash)" }}>{selected.category}</span>
                                    <span className="text-mono" style={{ color: "var(--color-muted-ash)" }}>{selected.year}</span>
                                </div>
                                <h3 className="text-heading-lg mb-5" style={{ color: "var(--fg)" }}>{selected.title}</h3>
                                <p className="text-body mb-7" style={{ color: "var(--color-muted-ash)", lineHeight: "1.65" }}>{selected.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {selected.technologies.map((t) => (
                                        <span
                                            key={t}
                                            className="px-3 py-1.5 text-mono"
                                            style={{
                                                color: "var(--fg)",
                                                border: "1px solid var(--border-hi)",
                                            }}
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* CTA */}
                        <div
                            className="flex-shrink-0 p-5 md:p-7"
                            style={{ borderTop: "1px solid var(--border-hi)" }}
                        >
                            <a
                                href={selected.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-ghost-primary group flex items-center justify-center gap-3 w-full py-3"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                                <span>View on GitHub</span>
                                <svg
                                    className="w-4 h-4"
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    style={{ transition: "transform 0.3s ease !important" }}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
