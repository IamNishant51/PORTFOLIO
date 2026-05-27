"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TechStack = () => {
    const sectionRef = useRef<HTMLElement>(null);

    const technologies = {
        "Languages": ["JavaScript", "TypeScript", "HTML", "CSS"],
        "Frontend": ["React", "Next.js", "Tailwind CSS", "GSAP"],
        "Backend": ["Node.js", "Express", "MongoDB", "REST APIs"],
        "Tools": ["Git", "VS Code", "Vercel", "npm", "Figma"],
    };

    useEffect(() => {
        if (!sectionRef.current) return;

        const items = sectionRef.current.querySelectorAll('.tech-item');

        gsap.fromTo(
            items,
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.05,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                }
            }
        );
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative py-24 md:py-32 lg:py-40"
            style={{ background: "var(--bg)" }}
        >
            <div className="section-container">
                {/* Header */}
                <div className="mb-16 md:mb-24">
                    <p className="text-caption mb-4" style={{ color: "var(--color-muted-ash)" }}>
                        TECHNOLOGIES
                    </p>
                    <h2 className="text-heading-lg" style={{ color: "var(--fg)" }}>
                        Tools I work with
                    </h2>
                </div>

                {/* Tech Grid */}
                <div className="space-y-12 md:space-y-16">
                    {Object.entries(technologies).map(([category, items], idx) => (
                        <div key={idx} className="tech-category">
                            {/* Category Title */}
                            <h3 className="text-subheading mb-6" style={{ color: "var(--color-muted-ash)" }}>
                                {category}
                            </h3>

                            {/* Tech Items */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                                {items.map((tech, techIdx) => (
                                    <div
                                        key={techIdx}
                                        className="tech-item group badge-neutral"
                                        style={{
                                            border: "1px solid var(--border-hi)",
                                            padding: "16px 24px",
                                            textAlign: "center",
                                            color: "var(--fg)",
                                            cursor: "default",
                                        }}
                                    >
                                        <p className="text-body">
                                            {tech}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer Note */}
                <div className="mt-16 md:mt-24 pt-8" style={{ borderTop: "1px solid var(--border-hi)" }}>
                    <p className="text-body" style={{ color: "var(--color-muted-ash)", maxWidth: "32rem" }}>
                        I&apos;m constantly learning and exploring new technologies.
                        Check out my{" "}
                        <a
                            href="https://github.com/IamNishant51"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-accent transition-colors"
                            style={{ color: "var(--accent)" }}
                        >
                            GitHub
                        </a>
                        {" "}to see what I'm currently working on.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default TechStack;
