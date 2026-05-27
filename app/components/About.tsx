"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CoffeeCup from "./ui/svg/CoffeeCup";

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
            const trigger = (el: Element | null, opts = {}) =>
                gsap.fromTo(el,
                    { y: 50, opacity: 0 },
                    {
                        y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
                        scrollTrigger: { trigger: el, start: "top 88%", once: true },
                        ...opts,
                    }
                );

            trigger(headingRef.current, { duration: 1, ease: "power4.out" });
            trigger(bioRef.current, { duration: 0.9, delay: 0.05 });

            if (statsRef.current) {
                gsap.fromTo(Array.from(statsRef.current.children),
                    { y: 40, opacity: 0 },
                    {
                        y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power3.out",
                        scrollTrigger: { trigger: statsRef.current, start: "top 88%", once: true },
                    }
                );
            }

            if (journeyRef.current) {
                gsap.fromTo(Array.from(journeyRef.current.children),
                    { x: -32, opacity: 0 },
                    {
                        x: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: "power3.out",
                        scrollTrigger: { trigger: journeyRef.current, start: "top 88%", once: true },
                    }
                );
            }

            if (beliefsRef.current) {
                gsap.fromTo(Array.from(beliefsRef.current.children),
                    { scale: 0.88, opacity: 0 },
                    {
                        scale: 1, opacity: 1, stagger: 0.06, duration: 0.55, ease: "back.out(1.4)",
                        scrollTrigger: { trigger: beliefsRef.current, start: "top 90%", once: true },
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
            className="relative overflow-hidden"
            style={{ background: "var(--bg)", borderTop: "1px solid var(--border-hi)" }}
        >
            <div className="section-container section-py">
                {/* ── Section label ── */}
                <div className="section-label">
                    <span className="section-label-num">02</span>
                    <span className="section-label-line" />
                    <span className="section-label-text">About</span>
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
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-16 md:mb-24">
                    {/* Bio */}
                    <div ref={bioRef} className="space-y-5">
                        <p className="text-body" style={{ color: "var(--fg)" }}>
                            Hey! I&apos;m{" "}
                            <span style={{ color: "var(--fg)" }}>
                                Nishant Unavane
                            </span>
                            , a passionate developer who loves turning complex problems into
                            elegant solutions.
                        </p>
                        <p className="text-body" style={{ color: "var(--color-muted-ash)" }}>
                            My journey into tech started with curiosity and has evolved into a
                            deep passion for creating tools that make developers&apos; lives easier.
                            I specialize in building{" "}
                            <span style={{ color: "var(--accent)" }}>
                                VS Code extensions
                            </span>
                            , modern web applications, and everything in between.
                        </p>
                        <p className="text-body" style={{ color: "var(--color-muted-ash)" }}>
                            When I&apos;m not coding, you&apos;ll find me exploring new technologies,
                            contributing to open-source, or brewing the perfect cup of coffee ☕
                        </p>

                        {/* Beliefs */}
                        <div className="pt-6" style={{ borderTop: "1px solid var(--border-hi)" }}>
                            <p className="text-mono mb-4" style={{ color: "var(--color-muted-ash)" }}>
                                I believe in
                            </p>
                            <div ref={beliefsRef} className="flex flex-wrap gap-2">
                                {BELIEFS.map((b) => (
                                    <span
                                        key={b}
                                        className="px-3 py-1.5 text-mono cursor-default"
                                        style={{
                                            color: "var(--fg)",
                                            border: "1px solid var(--border-hi)",
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
                        <p className="text-mono mb-6" style={{ color: "var(--color-muted-ash)" }}>
                            By the numbers
                        </p>
                        <div ref={statsRef} className="grid grid-cols-2 gap-3">
                            {[
                                { value: "4+", label: "VS Code Extensions" },
                                { value: "15+", label: "Projects Completed" },
                                { value: "2+", label: "Years Coding" },
                                { value: "∞", label: "Coffee Consumed" },
                            ].map((s) => (
                                <div
                                    key={s.label}
                                    className="group p-5 md:p-7 card-callout cursor-default"
                                    style={{ transition: "border-color 0.3s ease !important" }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLElement).style.borderColor = "var(--border-hi)";
                                    }}
                                >
                                    <div
                                        className="text-heading font-bold mb-1.5 flex items-end justify-between"
                                        style={{ color: "var(--accent)" }}
                                    >
                                        <span>{s.value}</span>
                                        {s.label === "Coffee Consumed" && <CoffeeCup size={32} />}
                                    </div>
                                    <div className="text-mono" style={{ color: "var(--color-muted-ash)" }}>
                                        {s.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Journey ── */}
                <div>
                    <p className="text-mono mb-8" style={{ color: "var(--color-muted-ash)" }}>
                        My journey
                    </p>
                    <div ref={journeyRef} className="space-y-0">
                        {JOURNEY.map((item, i) => (
                            <div
                                key={i}
                                className="group relative grid gap-5 md:gap-10 py-6 md:py-8"
                                style={{
                                    gridTemplateColumns: "auto 1fr",
                                    borderBottom: "1px solid var(--border-hi)",
                                }}
                            >
                                {/* Timeline dot + line */}
                                <div className="flex flex-col items-center pt-1">
                                    <div
                                        className="w-2.5 h-2.5 flex-shrink-0"
                                        style={{
                                            background: item.active ? "var(--accent)" : "var(--border-hi)",
                                            boxShadow: item.active ? "0 0 10px var(--accent)" : "none",
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
                                    <span className="text-mono block mb-2" style={{ color: "var(--accent)" }}>
                                        {item.year}
                                    </span>
                                    <h3
                                        className="text-subheading mb-2"
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
