"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const SKILLS = [
    { name: "Figma", logo: "https://ik.imagekit.io/9pfz6g8ri/avatars/figma.png" },
    { name: "GSAP", logo: "https://ik.imagekit.io/9pfz6g8ri/avatars/gsap.png" },
    { name: "Next.js", logo: "https://ik.imagekit.io/9pfz6g8ri/avatars/next_js.png" },
    { name: "React", logo: "https://ik.imagekit.io/9pfz6g8ri/avatars/react.png" },
    { name: "Tailwind", logo: "https://ik.imagekit.io/9pfz6g8ri/avatars/tailwind.png" },
    { name: "TypeScript", logo: "https://ik.imagekit.io/9pfz6g8ri/avatars/typescript.png" },
];

const TECH_LABELS = [
    "React", "Next.js", "TypeScript", "Node.js", "MongoDB",
    "GSAP", "Tailwind CSS", "VS Code API", "REST APIs", "WebGL",
    "Git", "Figma", "PostgreSQL", "Docker", "Vercel",
];

export default function SkillsMarquee() {
    const sectionRef = useRef<HTMLElement>(null);
    const row1Ref = useRef<HTMLDivElement>(null);
    const row2Ref = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            /* Heading reveal */
            gsap.fromTo(headingRef.current,
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
                    scrollTrigger: { trigger: headingRef.current, start: "top 85%", once: true },
                }
            );

            /* ── Logo marquee row 1 (left) ── */
            const r1 = row1Ref.current;
            if (r1) {
                r1.innerHTML = r1.innerHTML + r1.innerHTML + r1.innerHTML;
                const dist = r1.scrollWidth / 3;
                const tl1 = gsap.to(r1, { x: -dist, duration: 22, ease: "none", repeat: -1 });

                ScrollTrigger.create({
                    onUpdate(self) {
                        const ts = Math.min(3, 1 + Math.abs(self.getVelocity() / 800));
                        gsap.to(tl1, { timeScale: ts, duration: 0.3, ease: "power2.out" });
                    },
                });
            }

            /* ── Text marquee row 2 (right, reversed) ── */
            const r2 = row2Ref.current;
            if (r2) {
                r2.innerHTML = r2.innerHTML + r2.innerHTML + r2.innerHTML;
                const dist = r2.scrollWidth / 3;
                gsap.set(r2, { x: -dist });
                const tl2 = gsap.to(r2, { x: 0, duration: 28, ease: "none", repeat: -1 });

                ScrollTrigger.create({
                    onUpdate(self) {
                        const ts = Math.min(3, 1 + Math.abs(self.getVelocity() / 800));
                        gsap.to(tl2, { timeScale: ts, duration: 0.3, ease: "power2.out" });
                    },
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="skills"
            className="relative py-24 md:py-32 overflow-hidden"
            style={{ background: "var(--bg)" }}
        >
            {/* Top border */}
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "var(--border)" }} />

            <div className="section-container mb-16">
                {/* Section label */}
                <div className="flex items-center gap-4 mb-12">
                    <span className="text-mono" style={{ color: "var(--accent)" }}>04</span>
                    <span className="w-12 h-px" style={{ background: "var(--accent)" }} />
                    <span className="text-mono" style={{ color: "rgba(240,237,230,0.4)" }}>Skills</span>
                </div>

                <div ref={headingRef}>
                    <h2 className="text-h1 mb-4" style={{ color: "var(--fg)" }}>
                        Tech<br />
                        <span style={{ color: "var(--accent)" }}>Stack</span>
                    </h2>
                    <p className="text-body max-w-md" style={{ color: "rgba(240,237,230,0.45)" }}>
                        Tools and technologies I use to bring ideas to life.
                    </p>
                </div>
            </div>

            {/* ── Logo marquee ── */}
            <div className="overflow-hidden mb-6" style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
                <div
                    ref={row1Ref}
                    className="flex items-center gap-0 py-6"
                    style={{ width: "fit-content" }}
                >
                    {SKILLS.map((skill, i) => (
                        <div
                            key={i}
                            className="skill-item flex items-center gap-0 flex-shrink-0"
                        >
                            <div
                                className="flex items-center gap-6 px-10 py-2 group cursor-default"
                                style={{ borderRight: "1px solid var(--border)" }}
                            >
                                <div className="relative w-10 h-10 flex-shrink-0 grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110">
                                    <Image
                                        src={skill.logo}
                                        alt={`${skill.name} logo`}
                                        fill
                                        className="object-contain"
                                        sizes="40px"
                                    />
                                </div>
                                <span
                                    className="text-mono whitespace-nowrap"
                                    style={{ color: "rgba(240,237,230,0.5)" }}
                                >
                                    {skill.name}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Text marquee (reversed) ── */}
            <div className="overflow-hidden" style={{ borderBottom: "1px solid var(--border)" }}>
                <div
                    ref={row2Ref}
                    className="flex items-center gap-0 py-4"
                    style={{ width: "fit-content" }}
                >
                    {TECH_LABELS.map((label, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-0 flex-shrink-0"
                        >
                            <span
                                className="text-mono px-8 whitespace-nowrap"
                                style={{
                                    color: i % 3 === 0 ? "var(--accent)" : "rgba(240,237,230,0.25)",
                                    borderRight: "1px solid var(--border)",
                                }}
                            >
                                {label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
