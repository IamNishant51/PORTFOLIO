"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const skills = [
    { name: "Figma", logo: "https://ik.imagekit.io/9pfz6g8ri/avatars/figma.png" },
    { name: "GSAP", logo: "https://ik.imagekit.io/9pfz6g8ri/avatars/gsap.png" },
    { name: "Next.js", logo: "https://ik.imagekit.io/9pfz6g8ri/avatars/next_js.png" },
    { name: "React", logo: "https://ik.imagekit.io/9pfz6g8ri/avatars/react.png" },
    { name: "Tailwind", logo: "https://ik.imagekit.io/9pfz6g8ri/avatars/tailwind.png" },
    { name: "TypeScript", logo: "https://ik.imagekit.io/9pfz6g8ri/avatars/typescript.png" },
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
                className="flex items-center gap-6 sm:gap-8 md:gap-12 lg:gap-16"
                style={{ width: "fit-content" }}
            >
                {skills.map((skill, index) => (
                    <div key={index} className="skill-item flex items-center gap-6 sm:gap-8 md:gap-12 lg:gap-16">
                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-500 hover:scale-110">
                            <Image
                                src={skill.logo}
                                alt={skill.name}
                                fill
                                className="object-contain"
                                sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, (max-width: 1024px) 96px, (max-width: 1280px) 112px, 128px"
                            />
                        </div>
                        <span className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-[#CCFF00] rounded-full flex-shrink-0" />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SkillsMarquee;
