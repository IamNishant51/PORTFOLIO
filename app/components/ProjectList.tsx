"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

const projects = [
    {
        id: 1,
        title: "Ollama Agent",
        category: "VS Code Extension",
        src: "https://ik.imagekit.io/9pfz6g8ri/avatars/ollama.jpg",
        link: "https://github.com/IamNishant51/Ollama-Agent-vs-code-extension",
        description: "A powerful VS Code extension that integrates Ollama AI models directly into your development workflow. Chat with AI, generate code, and get intelligent suggestions without leaving your editor.",
        technologies: ["TypeScript", "VS Code API", "Ollama", "AI/ML"]
    },
    {
        id: 2,
        title: "GitHub Activity Dashboard",
        category: "VS Code Extension",
        src: "https://ik.imagekit.io/9pfz6g8ri/avatars/github.jpg",
        link: "https://github.com/IamNishant51/GIT-HUB-ACTIVITY-DASHBOARD-Vscode-extension",
        description: "Track your GitHub contributions, view recent activity, and monitor repository stats all within VS Code. A beautiful dashboard to keep you motivated and informed.",
        technologies: ["TypeScript", "GitHub API", "VS Code API", "Chart.js"]
    },
    {
        id: 3,
        title: "Code Runner",
        category: "VS Code Extension",
        src: "https://ik.imagekit.io/9pfz6g8ri/avatars/code_runner.jpg",
        link: "https://github.com/IamNishant51/CODE-RUNNER-vscode-extension",
        description: "Execute code snippets in multiple programming languages with a single click. Supports 40+ languages with customizable run configurations and output formatting.",
        technologies: ["TypeScript", "Node.js", "VS Code API", "Shell"]
    },
    {
        id: 4,
        title: "API Testing",
        category: "VS Code Extension",
        src: "https://ik.imagekit.io/9pfz6g8ri/avatars/API.jpg",
        link: "https://github.com/IamNishant51/API-TESTING-vs-code-extension-",
        description: "A lightweight REST API testing tool built into VS Code. Create, save, and organize API requests with support for environments, variables, and response visualization.",
        technologies: ["TypeScript", "VS Code API", "REST", "HTTP"]
    },
];

type Project = typeof projects[0];

const ProjectList = () => {
    const [hoveredProject, setHoveredProject] = useState<number | null>(null);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const revealRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const scrollYRef = useRef<number>(0);

    useEffect(() => {
        // Move the reveal image container with mouse
        const moveReveal = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            if (revealRef.current) {
                // Center the image on the cursor by offsetting by half the size (250/2 = 125)
                gsap.to(revealRef.current, {
                    x: clientX - 125,
                    y: clientY - 125,
                    duration: 0.5,
                    ease: "power2.out"
                });
            }
        };

        window.addEventListener("mousemove", moveReveal);
        return () => window.removeEventListener("mousemove", moveReveal);
    }, []);

    useEffect(() => {
        // Show/Hide image based on hover state
        if (hoveredProject !== null && revealRef.current && !selectedProject) {
            gsap.to(revealRef.current, { scale: 1, opacity: 1, duration: 0.3 });
        } else if (revealRef.current) {
            gsap.to(revealRef.current, { scale: 0, opacity: 0, duration: 0.3 });
        }
    }, [hoveredProject, selectedProject]);

    useEffect(() => {
        // Modal animation and scroll lock
        if (selectedProject && modalRef.current) {
            // Store current scroll position and lock body
            scrollYRef.current = window.scrollY;
            document.body.style.position = "fixed";
            document.body.style.top = `-${scrollYRef.current}px`;
            document.body.style.left = "0";
            document.body.style.right = "0";
            document.body.style.overflow = "hidden";

            gsap.fromTo(
                modalRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.3, ease: "power2.out" }
            );
            gsap.fromTo(
                modalRef.current.querySelector(".modal-content"),
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.4, ease: "power3.out", delay: 0.1 }
            );
        }
    }, [selectedProject]);

    const closeModal = () => {
        if (modalRef.current) {
            gsap.to(modalRef.current, {
                opacity: 0,
                duration: 0.2,
                onComplete: () => {
                    // Restore scroll position after animation completes
                    document.body.style.position = "";
                    document.body.style.top = "";
                    document.body.style.left = "";
                    document.body.style.right = "";
                    document.body.style.overflow = "";
                    window.scrollTo(0, scrollYRef.current);
                    setSelectedProject(null);
                }
            });
        }
    };

    return (
        <section className="py-12 sm:py-16 md:py-24 lg:py-32 bg-black text-white relative z-10 px-4 sm:px-6 md:px-8 lg:px-16">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-8 sm:mb-12 md:mb-16 border-b border-white/10 pb-6 sm:pb-8">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-white/40">Selected Work</h2>
                    <p className="text-xs sm:text-sm opacity-50 mt-3 sm:mt-4 md:mt-0 max-w-xs">Featured projects and experiments</p>
                </div>

                <ul ref={listRef} className="space-y-4 sm:space-y-6 md:space-y-8">
                    {projects.map((project, index) => (
                        <li
                            key={project.id}
                            className="border-b border-white/10 pb-4 sm:pb-6 md:pb-8 cursor-pointer group transition-all duration-500 hover:pl-2 sm:hover:pl-4 hover:border-[#CCFF00]/30 hover:bg-white/[0.02] active:scale-[0.99]"
                            onMouseEnter={() => setHoveredProject(project.id)}
                            onMouseLeave={() => setHoveredProject(null)}
                            onClick={() => setSelectedProject(project)}
                        >
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4">
                                <div className="flex items-baseline gap-3 sm:gap-4 md:gap-8">
                                    <span className="text-xs sm:text-sm md:text-base font-mono opacity-30 group-hover:opacity-100 group-hover:text-[#CCFF00] transition-all duration-300 group-hover:scale-110">
                                        0{index + 1}
                                    </span>
                                    <h3 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold uppercase tracking-tight transition-all duration-300 group-hover:text-white/60 group-hover:tracking-tighter break-words">
                                        {project.title}
                                    </h3>
                                </div>
                                <div className="flex items-center gap-3 sm:gap-4 ml-8 sm:ml-0">
                                    <span className="text-xs sm:text-sm md:text-base uppercase tracking-widest opacity-40 group-hover:opacity-100 group-hover:text-[#CCFF00] transition-all duration-300 whitespace-nowrap">
                                        {project.category}
                                    </span>
                                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:border-[#CCFF00] group-hover:rotate-90 transition-all duration-500 flex-shrink-0">
                                        <svg
                                            className="w-3 h-3 sm:w-4 sm:h-4 group-hover:text-[#CCFF00]"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Floating Image Reveal */}
            <div
                ref={revealRef}
                className="fixed top-0 left-0 w-[250px] h-[250px] pointer-events-none z-20 overflow-hidden opacity-0 scale-0 hidden md:block rounded-full border-4 border-[#CCFF00]/50 shadow-lg shadow-[#CCFF00]/20"
            >
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className="absolute inset-0 w-full h-full rounded-full overflow-hidden"
                        style={{ opacity: hoveredProject === project.id ? 1 : 0, transition: "opacity 0.3s" }}
                    >
                        <Image
                            src={project.src}
                            alt={project.title}
                            fill
                            sizes="250px"
                            className="object-cover"
                        />
                    </div>
                ))}
            </div>

            {/* Project Modal */}
            {selectedProject && (
                <div
                    ref={modalRef}
                    className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
                    onClick={closeModal}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />

                    {/* Modal Content */}
                    <div
                        className="modal-content relative w-full sm:w-[95%] max-w-4xl h-[75vh] sm:max-h-[85vh] bg-black border-t sm:border border-white/10 flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 sm:top-4 sm:right-4 md:top-6 md:right-6 z-10 w-7 h-7 sm:w-10 sm:h-10 flex items-center justify-center border border-white/20 hover:border-white/60 hover:bg-white/10 transition-all duration-300 bg-black/50 backdrop-blur-sm"
                        >
                            <svg className="w-3 h-3 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Scrollable Content Area */}
                        <div className="flex-1 overflow-y-auto overflow-x-hidden min-h-0">
                            {/* Project Image */}
                            <div className="relative w-full h-32 sm:h-48 md:h-64 overflow-hidden flex-shrink-0">
                                <Image
                                    src={selectedProject.src}
                                    alt={selectedProject.title}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 95vw, 896px"
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                            </div>

                            {/* Project Info */}
                            <div className="p-4 sm:p-6 md:p-10">
                                {/* Category & Number */}
                                <div className="flex items-center gap-2 sm:gap-4 mb-2 sm:mb-4">
                                    <span className="text-xs sm:text-sm font-mono text-[#CCFF00]">
                                        0{selectedProject.id}
                                    </span>
                                    <span className="text-xs sm:text-sm uppercase tracking-widest text-white/50">
                                        {selectedProject.category}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight mb-2 sm:mb-6">
                                    {selectedProject.title}
                                </h3>

                                {/* Description */}
                                <p className="text-xs sm:text-base md:text-lg text-white/70 leading-relaxed mb-3 sm:mb-8 max-w-2xl line-clamp-4 sm:line-clamp-none">
                                    {selectedProject.description}
                                </p>

                                {/* Technologies */}
                                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                    {selectedProject.technologies.map((tech, i) => (
                                        <span
                                            key={i}
                                            className="px-2 py-1 sm:px-3 sm:py-1 text-[9px] sm:text-xs md:text-sm font-mono uppercase tracking-wider border border-white/20 text-white/60"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* GitHub Button - Fixed at bottom */}
                        <div className="flex-shrink-0 min-h-[70px] p-4 sm:p-6 md:px-10 md:pb-10 bg-black border-t border-white/10">
                            <a
                                href={selectedProject.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 sm:gap-3 w-full px-4 py-3 sm:py-3 md:px-8 md:py-4 bg-[#CCFF00] text-black font-bold uppercase tracking-wider text-xs sm:text-sm md:text-base hover:bg-white transition-colors duration-300 group"
                            >
                                <svg className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                                <span>View on GitHub</span>
                                <svg
                                    className="w-4 h-4 sm:w-4 sm:h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
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
};

export default ProjectList;
