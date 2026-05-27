"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import TechChip from "./ui/svg/TechChip";

gsap.registerPlugin(ScrollTrigger);

const BASE_SKILLS = [
    { name: "Figma", logo: "https://ik.imagekit.io/9pfz6g8ri/avatars/figma.png" },
    { name: "GSAP", logo: "https://ik.imagekit.io/9pfz6g8ri/avatars/gsap.png" },
    { name: "Next.js", logo: "https://ik.imagekit.io/9pfz6g8ri/avatars/next_js.png" },
    { name: "React", logo: "https://ik.imagekit.io/9pfz6g8ri/avatars/react.png" },
    { name: "Tailwind", logo: "https://ik.imagekit.io/9pfz6g8ri/avatars/tailwind.png" },
    { name: "TypeScript", logo: "https://ik.imagekit.io/9pfz6g8ri/avatars/typescript.png" },
];

// Triple so the seamless half-width loop always has items filling >1 viewport
const SKILLS = [...BASE_SKILLS, ...BASE_SKILLS, ...BASE_SKILLS, ...BASE_SKILLS];

const TECH_LABELS_A = [
    "React", "Next.js", "TypeScript", "Node.js", "MongoDB",
    "GSAP", "Tailwind CSS", "VS Code API", "REST APIs", "WebGL",
    "Git", "Figma", "PostgreSQL", "Docker", "Vercel",
    "React", "Next.js", "TypeScript", "Node.js", "MongoDB",
    "GSAP", "Tailwind CSS", "VS Code API", "REST APIs", "WebGL",
    "Git", "Figma", "PostgreSQL", "Docker", "Vercel",
];

export default function SkillsMarquee() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const row1InitRef = useRef(false);
    const row2InitRef = useRef(false);
    const tl1Ref = useRef<gsap.core.Tween | null>(null);
    const tl2Ref = useRef<gsap.core.Tween | null>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            /* Heading reveal */
            gsap.fromTo(headingRef.current,
                { y: 36, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
                    scrollTrigger: { trigger: headingRef.current, start: "top 88%", once: true },
                }
            );

            /* Scroll velocity speed-up for marquees */
            ScrollTrigger.create({
                onUpdate(self) {
                    const vel = Math.abs(self.getVelocity());
                    const ts = Math.min(3.5, 1 + vel / 1000);
                    if (tl1Ref.current) gsap.to(tl1Ref.current, { timeScale: ts, duration: 0.3, ease: "power2.out" });
                    if (tl2Ref.current) gsap.to(tl2Ref.current, { timeScale: ts, duration: 0.3, ease: "power2.out" });
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    /* Row 1 GSAP init — fires once after mount */
    const row1Ref = (el: HTMLDivElement | null) => {
        if (!el || row1InitRef.current) return;
        row1InitRef.current = true;
        const dist = el.scrollWidth / 2;
        tl1Ref.current = gsap.to(el, { x: -dist, duration: 24, ease: "none", repeat: -1 });
    };

    /* Row 2 GSAP init */
    const row2Ref = (el: HTMLDivElement | null) => {
        if (!el || row2InitRef.current) return;
        row2InitRef.current = true;
        const dist = el.scrollWidth / 2;
        gsap.set(el, { x: -dist });
        tl2Ref.current = gsap.to(el, { x: 0, duration: 32, ease: "none", repeat: -1 });
    };

    return (
        <section
            ref={sectionRef}
            id="skills"
            className="relative overflow-hidden"
            style={{ background: "var(--bg)", borderTop: "1px solid var(--border-hi)" }}
        >
            <div className="section-container section-py pb-0 md:pb-0" style={{ paddingBottom: "2rem" }}>
                {/* Section label */}
                <div className="section-label">
                    <span className="section-label-num">04</span>
                    <span className="section-label-line" />
                    <span className="section-label-text">Skills</span>
                </div>

                <div ref={headingRef}>
                    <h2 className="text-heading-lg mb-4 flex items-center gap-4" style={{ color: "var(--fg)" }}>
                        <span>
                            Tech{" "}
                            <span style={{ color: "var(--accent)" }}>Stack</span>
                        </span>
                        <TechChip size={36} />
                    </h2>
                    <p className="text-body max-w-md mb-12" style={{ color: "var(--color-muted-ash)" }}>
                        Tools and technologies I use to bring ideas to life.
                    </p>
                </div>
            </div>

            {/* ── Logo marquee row (left) ── */}
            <div
                className="overflow-hidden mb-0"
                style={{ borderTop: "1px solid var(--border-hi)", borderBottom: "1px solid var(--border-hi)" }}
            >
                <div
                    ref={row1Ref}
                    className="flex items-center"
                    style={{ width: "max-content" }}
                >
                    {SKILLS.map((skill, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-5 px-8 py-5 group cursor-default flex-shrink-0"
                            style={{ borderRight: "1px solid var(--border-hi)" }}
                        >
                            <div className="relative flex-shrink-0 grayscale group-hover:grayscale-0"
                                style={{
                                    width: "36px",
                                    height: "36px",
                                    transition: "filter 0.4s ease, transform 0.4s ease !important",
                                }}
                            >
                                <Image
                                    src={skill.logo}
                                    alt={`${skill.name} logo`}
                                    fill
                                    className="object-contain"
                                    sizes="36px"
                                />
                            </div>
                            <span
                                className="text-mono whitespace-nowrap"
                                style={{ color: "rgba(255,255,255,0.45)" }}
                            >
                                {skill.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Text marquee row (right, reversed) ── */}
            <div
                className="overflow-hidden"
                style={{ borderBottom: "1px solid var(--border-hi)" }}
            >
                <div
                    ref={row2Ref}
                    className="flex items-center py-3"
                    style={{ width: "max-content" }}
                >
                    {TECH_LABELS_A.map((label, i) => (
                        <span
                            key={i}
                            className="text-mono px-7 whitespace-nowrap flex-shrink-0"
                            style={{
                                color: i % 4 === 0 ? "var(--accent)" : "rgba(255,255,255,0.2)",
                                borderRight: "1px solid var(--border-hi)",
                            }}
                        >
                            {label}
                        </span>
                    ))}
                </div>
            </div>

            {/* Bottom padding */}
            <div style={{ paddingBottom: "clamp(4rem, 8vw, 10rem)" }} />
        </section>
    );
}
