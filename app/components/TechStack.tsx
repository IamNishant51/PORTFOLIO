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
            className="relative py-24 md:py-32 lg:py-40 bg-white dark:bg-black text-black dark:text-white px-6 md:px-8 lg:px-16"
        >
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-16 md:mb-24">
                    <p className="text-sm md:text-base text-black/40 dark:text-white/40 mb-4 font-medium tracking-wide">
                        TECHNOLOGIES
                    </p>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                        Tools I work with
                    </h2>
                </div>

                {/* Tech Grid */}
                <div className="space-y-12 md:space-y-16">
                    {Object.entries(technologies).map(([category, items], idx) => (
                        <div key={idx} className="tech-category">
                            {/* Category Title */}
                            <h3 className="text-lg md:text-xl font-semibold mb-6 text-black/60 dark:text-white/60">
                                {category}
                            </h3>

                            {/* Tech Items */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                                {items.map((tech, techIdx) => (
                                    <div
                                        key={techIdx}
                                        className="tech-item group"
                                    >
                                        <div className="relative px-6 py-4 border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 transition-all duration-300 bg-white dark:bg-black hover:shadow-lg">
                                            <p className="text-sm md:text-base font-medium text-center">
                                                {tech}
                                            </p>

                                            {/* Subtle hover indicator */}
                                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black dark:bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer Note */}
                <div className="mt-16 md:mt-24 pt-8 border-t border-black/10 dark:border-white/10">
                    <p className="text-sm md:text-base text-black/50 dark:text-white/50 max-w-2xl">
                        I'm constantly learning and exploring new technologies.
                        Check out my{" "}
                        <a
                            href="https://github.com/IamNishant51"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-black dark:hover:text-white transition-colors"
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
