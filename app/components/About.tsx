"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BELIEFS = ["Clean Code", "User Experience", "Continuous Learning", "Open Source", "Innovation"];

const JOURNEY = [
    {
        year: "2024 — Present",
        title: "Full-Stack Developer",
        desc: "Building modern web applications with React, Next.js, and TypeScript. Creating VS Code extensions that enhance developer productivity.",
        active: true,
    },
    {
        year: "2023",
        title: "Frontend Developer",
        desc: "Mastered modern frontend frameworks and tools. Started contributing to open-source projects and building developer tools.",
        active: false,
    },
    {
        year: "2022",
        title: "Learning Journey",
        desc: "Dove deep into web development. Learned JavaScript, React, and started building projects to solidify my skills.",
        active: false,
    },
];

export default function About() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const bioRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const journeyRef = useRef<HTMLDivElement>(null);
    const beliefsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            /* Heading reveal */
            gsap.fromTo(headingRef.current,
                { y: 60, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1, ease: "power4.out",
                    scrollTrigger: { trigger: headingRef.current, start: "top 85%", once: true },
                }
            );

            /* Bio */
            gsap.fromTo(bioRef.current,
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
                    scrollTrigger: { trigger: bioRef.current, start: "top 85%", once: true },
                }
            );

            /* Stats stagger */
            if (statsRef.current) {
                gsap.fromTo(Array.from(statsRef.current.children),
                    { y: 40, opacity: 0 },
                    {
                        y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power3.out",
                        scrollTrigger: { trigger: statsRef.current, start: "top 85%", once: true },
                    }
                );
            }

            /* Journey items */
            if (journeyRef.current) {
                gsap.fromTo(Array.from(journeyRef.current.children),
                    { x: -40, opacity: 0 },
                    {
                        x: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: "power3.out",
                        scrollTrigger: { trigger: journeyRef.current, start: "top 85%", once: true },
                    }
                );
            }

            /* Beliefs */
            if (beliefsRef.current) {
                gsap.fromTo(Array.from(beliefsRef.current.children),
                    { scale: 0.85, opacity: 0 },
                    {
                        scale: 1, opacity: 1, stagger: 0.07, duration: 0.6, ease: "back.out(1.4)",
                        scrollTrigger: { trigger: beliefsRef.current, start: "top 88%", once: true },
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="about"
            className="relative py-24 md:py-32 lg:py-40 overflow-hidden"
            style={{ background: "var(--bg)" }}
        >


            <div className="section-container">
                {/* ── Section label ── */}
                <div className="flex items-center gap-4 mb-12">
                    <span className="text-caption" style={{ color: "var(--accent)" }}>02</span>
                    <span className="w-12 h-px" style={{ background: "var(--accent)" }} />
                    <span className="text-caption" style={{ color: "var(--color-muted-ash)" }}>About</span>
                </div>

                {/* ── Heading ── */}
                <h2
                    ref={headingRef}
                    className="text-heading-lg mb-16 md:mb-24"
                    style={{ color: "var(--fg)" }}
                >
                    Crafting{" "}
                    <span style={{ color: "var(--accent)" }}>Digital</span>
                    <br />
                    Experiences
                </h2>

                {/* ── Main grid ── */}
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 mb-20 md:mb-28">
                    {/* Bio */}
                    <div ref={bioRef} className="space-y-6">
                        <p className="text-body" style={{ color: "var(--fg)" }}>
                            Hey! I&apos;m{" "}
                            <span className="font-semibold" style={{ color: "var(--fg)" }}>
                                Nishant Unavane
                            </span>
                            , a passionate developer who loves turning complex problems into
                            elegant solutions.
                        </p>
                        <p className="text-body" style={{ color: "var(--color-muted-ash)" }}>
                            My journey into tech started with curiosity and has evolved into a
                            deep passion for creating tools that make developers&apos; lives easier.
                            I specialize in building{" "}
                            <span className="font-semibold" style={{ color: "var(--accent)" }}>
                                VS Code extensions
                            </span>
                            , modern web applications, and everything in between.
                        </p>
                        <p className="text-body" style={{ color: "var(--color-muted-ash)" }}>
                            When I&apos;m not coding, you&apos;ll find me exploring new technologies,
                            contributing to open-source, or brewing the perfect cup of coffee ☕
                        </p>

                        {/* Beliefs */}
                        <div className="pt-8" style={{ borderTop: "1px solid var(--border-hi)" }}>
                            <p className="text-caption mb-4" style={{ color: "var(--color-muted-ash)" }}>
                                I believe in
                            </p>
                            <div ref={beliefsRef} className="flex flex-wrap gap-2">
                                {BELIEFS.map((b) => (
                                    <span
                                        key={b}
                                        className="px-4 py-2 text-small font-medium cursor-default badge-neutral"
                                        style={{
                                            color: "var(--fg)",
                                        }}
                                    >
                                        {b}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div>
                        <p className="text-caption mb-8" style={{ color: "var(--color-muted-ash)" }}>
                            By the numbers
                        </p>
                        <div ref={statsRef} className="grid grid-cols-2 gap-4">
                            {[
                                { value: "4+", label: "VS Code Extensions" },
                                { value: "15+", label: "Projects Completed" },
                                { value: "1+", label: "Years Coding" },
                                { value: "∞", label: "Coffee Consumed" },
                            ].map((s) => (
                                <div
                                    key={s.label}
                                    className="group p-6 md:p-8 cursor-default card-callout"
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLElement).style.borderColor = "var(--border-hi)";
                                    }}
                                >
                                    <div
                                        className="text-heading font-bold mb-2"
                                        style={{ color: "var(--accent)" }}
                                    >
                                        {s.value}
                                    </div>
                                    <div className="text-caption" style={{ color: "var(--color-muted-ash)" }}>
                                        {s.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Journey ── */}
                <div>
                    <p className="text-caption mb-10" style={{ color: "var(--color-muted-ash)" }}>
                        My journey
                    </p>
                    <div ref={journeyRef} className="space-y-0">
                        {JOURNEY.map((item, i) => (
                            <div
                                key={i}
                                className="group relative grid grid-cols-[auto_1fr] gap-6 md:gap-10 py-8"
                                style={{ borderBottom: "1px solid var(--border-hi)" }}
                            >
                                {/* Timeline dot + line */}
                                <div className="flex flex-col items-center pt-1">
                                    <div
                                        className="w-3 h-3 flex-shrink-0"
                                        style={{
                                            background: item.active ? "var(--accent)" : "var(--border-hi)",
                                            boxShadow: item.active ? "0 0 12px var(--accent)" : "none",
                                        }}
                                    />
                                    {i < JOURNEY.length - 1 && (
                                        <div
                                            className="w-px flex-1 mt-2"
                                            style={{ background: "var(--border-hi)" }}
                                        />
                                    )}
                                </div>

                                {/* Content */}
                                <div>
                                    <span className="text-caption block mb-2" style={{ color: "var(--accent)" }}>
                                        {item.year}
                                    </span>
                                    <h3
                                        className="text-subheading mb-3"
                                        style={{ color: item.active ? "var(--fg)" : "var(--color-muted-ash)" }}
                                    >
                                        {item.title}
                                    </h3>
                                    <p className="text-body max-w-xl" style={{ color: "var(--color-muted-ash)" }}>
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
