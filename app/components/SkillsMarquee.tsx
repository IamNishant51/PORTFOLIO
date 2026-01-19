"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = [
    "React", "Node.js", "GSAP", "Next.js", "TypeScript", "Tailwind", "WebGL", "Three.js", "Figma", "Design"
];

const SkillsMarquee = () => {
    const marqueeRef = useRef<HTMLDivElement>(null);
    const directionRef = useRef<number>(-1); // -1 for left, 1 for right
    const tweenRef = useRef<gsap.core.Tween | null>(null);

    useEffect(() => {
        const marquee = marqueeRef.current;
        if (!marquee) return;

        // Duplicate content for seamless loop
        const content = marquee.innerHTML;
        marquee.innerHTML = content + content + content;

        const items = marquee.querySelectorAll(".skill-item");
        const totalWidth = Array.from(items).reduce((acc, item) => acc + (item as HTMLElement).offsetWidth, 0);

        // Create the infinite loop animation
        // Assuming 3 copies, we slide by 1/3 of the total scrollWidth
        const distance = marquee.scrollWidth / 3;

        const tl = gsap.to(marquee, {
            x: -distance,
            duration: 20,
            ease: "none",
            repeat: -1,
        });

        tweenRef.current = tl;

        // React to Scroll Speed
        ScrollTrigger.create({
            onUpdate: (self) => {
                // Calculate speed multiplier based on scroll velocity
                const velocity = self.getVelocity();
                const timeScale = Math.min(3, 1 + Math.abs(velocity / 1000)); // Limit max speed to 3x

                gsap.to(tl, { timeScale: timeScale, duration: 0.3, ease: "power2.out" });
            }
        });

        // Cleanup
        return () => {
            tl.kill();
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <section className="py-8 sm:py-10 md:py-16 lg:py-20 bg-white text-black overflow-hidden whitespace-nowrap">
            <div
                ref={marqueeRef}
                className="flex items-center gap-4 sm:gap-6 md:gap-10 text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold uppercase tracking-tighter"
                style={{ width: "fit-content" }}
            >
                {skills.map((skill, index) => (
                    <span key={index} className="skill-item flex items-center gap-4 sm:gap-6 md:gap-10">
                        {skill} <span className="text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-[#CCFF00]">●</span>
                    </span>
                ))}
            </div>
        </section>
    );
};

export default SkillsMarquee;
