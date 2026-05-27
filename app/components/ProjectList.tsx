"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

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
                x: e.clientX - 140,
                y: e.clientY - 140,
                duration: 0.55,
                ease: "power2.out",
            });
        };
        window.addEventListener("mousemove", move);
        return () => window.removeEventListener("mousemove", move);
    }, []);

    useEffect(() => {
        if (!revealRef.current) return;
        if (hovered !== null && !selected) {
            gsap.to(revealRef.current, { scale: 1, opacity: 1, duration: 0.35, ease: "power2.out" });
        } else {
            gsap.to(revealRef.current, { scale: 0, opacity: 0, duration: 0.25 });
        }
    }, [hovered, selected]);

    /* ── Modal ── */
    useEffect(() => {
        if (selected && modalRef.current) {
            const isMobile = window.innerWidth < 768;
            scrollYRef.current = window.scrollY;
            if (!isMobile) {
                document.body.style.position = "fixed";
                document.body.style.top = `-${scrollYRef.current}px`;
                document.body.style.left = "0";
                document.body.style.right = "0";
                document.body.style.overflow = "hidden";
            }
            gsap.fromTo(modalRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
            gsap.fromTo(
                modalRef.current.querySelector(".modal-inner"),
                { y: 60, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, ease: "power3.out", delay: 0.1 }
            );
        }
    }, [selected]);

    const closeModal = () => {
        if (!modalRef.current) return;
        gsap.to(modalRef.current, {
            opacity: 0,
            duration: 0.25,
            onComplete: () => {
                const isMobile = window.innerWidth < 768;
                if (!isMobile) {
                    document.body.style.position = "";
                    document.body.style.top = "";
                    document.body.style.left = "";
                    document.body.style.right = "";
                    document.body.style.overflow = "";
                    window.scrollTo(0, scrollYRef.current);
                }
                setSelected(null);
            },
        });
    };

    /* ── Scroll reveal for list items ── */
    useEffect(() => {
        const ctx = gsap.context(() => {
            /* Heading */
            gsap.fromTo(headingRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1, ease: "power4.out",
                    scrollTrigger: { trigger: headingRef.current, start: "top 85%", once: true },
                }
            );

            /* List items */
            if (listRef.current) {
                gsap.fromTo(Array.from(listRef.current.children),
                    { y: 40, opacity: 0 },
                    {
                        y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power3.out",
                        scrollTrigger: { trigger: listRef.current, start: "top 85%", once: true },
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
            className="relative py-24 md:py-32 lg:py-40 overflow-hidden"
            style={{ background: "var(--bg)" }}
        >
            {/* Top border */}
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "var(--border-hi)" }} />

            <div className="section-container">
                {/* ── Section label ── */}
                <div className="flex items-center gap-4 mb-12">
                    <span className="text-caption" style={{ color: "var(--accent)" }}>03</span>
                    <span className="w-12 h-px" style={{ background: "var(--accent)" }} />
                    <span className="text-caption" style={{ color: "var(--color-muted-ash)" }}>Work</span>
                </div>

                {/* ── Heading ── */}
                <div ref={headingRef} className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-16 md:mb-20">
                    <h2 className="text-heading-lg" style={{ color: "var(--fg)" }}>
                        Selected<br />
                        <span style={{ color: "var(--accent)" }}>Projects</span>
                    </h2>
                    <p className="text-body max-w-xs" style={{ color: "var(--color-muted-ash)" }}>
                        Featured work and experiments
                    </p>
                </div>

                {/* ── Project list ── */}
                <ul ref={listRef} className="space-y-0">
                    {projects.map((project) => (
                        <li
                            key={project.id}
                            className="group relative cursor-pointer"
                            style={{ borderBottom: "1px solid var(--border-hi)" }}
                            onMouseEnter={() => setHovered(project.id)}
                            onMouseLeave={() => setHovered(null)}
                            onClick={() => setSelected(project)}
                        >
                            <div
                                className="py-6 md:py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-all duration-300"
                                style={{
                                    paddingLeft: hovered === project.id ? "1.5rem" : "0",
                                }}
                            >
                                {/* Left */}
                                <div className="flex items-baseline gap-4 md:gap-8">
                                    <span
                                        className="text-caption flex-shrink-0"
                                        style={{ color: hovered === project.id ? "var(--accent)" : "var(--color-muted-ash)" }}
                                    >
                                        {project.index}
                                    </span>
                                    <h3
                                        className="text-heading font-medium"
                                        style={{
                                            color: hovered === project.id ? "var(--accent)" : "var(--fg)",
                                            letterSpacing: "-0.025em",
                                            transition: "color 0.3s ease !important",
                                        }}
                                    >
                                        {project.title}
                                    </h3>
                                </div>

                                {/* Right */}
                                <div className="flex items-center gap-4 ml-10 sm:ml-0">
                                    <span className="text-caption" style={{ color: "var(--color-muted-ash)" }}>
                                        {project.category}
                                    </span>
                                    <span className="text-caption" style={{ color: "var(--color-muted-ash)" }}>
                                        {project.year}
                                    </span>
                                    <div
                                        className="w-8 h-8 flex items-center justify-center flex-shrink-0"
                                        style={{
                                            border: "1px solid",
                                            borderColor: hovered === project.id ? "var(--accent)" : "var(--border-hi)",
                                            color: hovered === project.id ? "var(--accent)" : "var(--color-muted-ash)",
                                            transform: hovered === project.id ? "rotate(45deg)" : "rotate(0deg)",
                                            transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1), border-color 0.3s ease, color 0.3s ease !important",
                                        }}
                                    >
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* ── Floating image reveal (desktop) ── */}
            <div
                ref={revealRef}
                className="fixed top-0 left-0 w-[280px] h-[280px] pointer-events-none z-30 overflow-hidden opacity-0 scale-0 hidden md:block"
                style={{ border: "1px solid var(--border-hi)" }}
            >
                {projects.map((p) => (
                    <div
                        key={p.id}
                        className="absolute inset-0"
                        style={{ opacity: hovered === p.id ? 1 : 0, transition: "opacity 0.3s ease !important" }}
                    >
                        <Image src={p.src} alt={p.title} fill sizes="280px" className="object-cover" />
                        <div
                            className="absolute inset-0"
                            style={{ background: "linear-gradient(to top, rgba(12,12,11,0.6) 0%, transparent 50%)" }}
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
                >
                    <div
                        className="absolute inset-0"
                        style={{ background: "rgba(12,12,11,0.85)", backdropFilter: "blur(20px)" }}
                    />
                    <div
                        className="modal-inner relative w-full sm:w-[95%] max-w-3xl max-h-[85vh] flex flex-col overflow-hidden"
                        style={{
                            background: "var(--bg)",
                            border: "1px solid var(--border-hi)",
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close */}
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center"
                            style={{ border: "1px solid var(--border-hi)", color: "var(--fg)" }}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Scrollable */}
                        <div className="flex-1 overflow-y-auto">
                            {/* Image */}
                            <div className="relative w-full h-48 sm:h-64 md:h-72 flex-shrink-0">
                                <Image
                                    src={selected.src}
                                    alt={selected.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 768px"
                                    className="object-cover"
                                />
                                <div
                                    className="absolute inset-0"
                                    style={{ background: "linear-gradient(to top, var(--void-2,#12121A) 0%, transparent 60%)" }}
                                />
                            </div>

                            {/* Info */}
                            <div className="p-6 md:p-10">
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="text-caption" style={{ color: "var(--accent)" }}>{selected.index}</span>
                                    <span className="text-caption" style={{ color: "var(--color-muted-ash)" }}>{selected.category}</span>
                                    <span className="text-caption" style={{ color: "var(--color-muted-ash)" }}>{selected.year}</span>
                                </div>
                                <h3 className="text-heading-lg mb-6" style={{ color: "var(--fg)" }}>{selected.title}</h3>
                                <p className="text-body mb-8" style={{ color: "var(--color-muted-ash)" }}>{selected.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {selected.technologies.map((t) => (
                                        <span
                                            key={t}
                                            className="px-3 py-1 text-caption badge-neutral"
                                            style={{ color: "var(--fg)" }}
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* CTA */}
                        <div
                            className="flex-shrink-0 p-6 md:p-8"
                            style={{ borderTop: "1px solid var(--border-hi)" }}
                        >
                            <a
                                href={selected.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-ghost-primary group flex items-center justify-center gap-3 w-full py-4 font-medium text-sm tracking-wide"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                                <span>View on GitHub</span>
                                <svg
                                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
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
