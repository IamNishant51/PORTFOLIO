"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import TypingAnimation from "./TypingAnimation";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const line1Ref = useRef<HTMLSpanElement>(null);
    const line2Ref = useRef<HTMLSpanElement>(null);
    const imageRef = useRef<HTMLAnchorElement>(null);
    const nameLabelRef = useRef<HTMLDivElement>(null);
    const subtextRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const line1 = line1Ref.current;
        const line2 = line2Ref.current;
        const imageContainer = imageRef.current;
        const nameLabel = nameLabelRef.current;
        const subtext = subtextRef.current;

        if (!line1 || !line2) return;

        // Split each line into characters
        const splitLine = (element: HTMLElement) => {
            const text = element.textContent || "";
            element.innerHTML = "";
            text.split("").forEach((char) => {
                const span = document.createElement("span");
                span.textContent = char;
                span.className = "inline-block";
                element.appendChild(span);
            });
            return element.querySelectorAll("span");
        };

        const chars1 = splitLine(line1);
        const chars2 = splitLine(line2);
        const allChars = [...Array.from(chars1), ...Array.from(chars2)];

        // Image reveal animation
        if (imageContainer) {
            gsap.fromTo(
                imageContainer,
                { scale: 0.8, opacity: 0, y: 30 },
                {
                    scale: 1,
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power4.out",
                    delay: 1.5,
                }
            );
        }

        // Name label animation
        if (nameLabel) {
            gsap.fromTo(
                nameLabel,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power4.out",
                    delay: 1.8,
                }
            );
        }

        // Animation for title entry
        gsap.fromTo(
            chars1,
            { y: 100, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                stagger: 0.03,
                duration: 1,
                ease: "power4.out",
                delay: 2,
            }
        );

        gsap.fromTo(
            chars2,
            { y: 100, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                stagger: 0.03,
                duration: 1,
                ease: "power4.out",
                delay: 2.3,
            }
        );

        // Subtext animation
        if (subtext) {
            gsap.fromTo(
                subtext,
                { opacity: 0, y: 20 },
                {
                    opacity: 0.6,
                    y: 0,
                    duration: 0.8,
                    ease: "power4.out",
                    delay: 2.6,
                }
            );
        }

        // Scroll Velocity Skew Effect
        let proxy = { skew: 0 };
        let skewSetter = gsap.quickSetter(allChars, "skewY", "deg");
        let clamp = gsap.utils.clamp(-20, 20);

        ScrollTrigger.create({
            onUpdate: (self) => {
                let skew = clamp(self.getVelocity() / -300);
                if (Math.abs(skew) > Math.abs(proxy.skew)) {
                    proxy.skew = skew;
                    gsap.to(proxy, { skew: 0, duration: 0.8, ease: "power3", overwrite: true, onUpdate: () => skewSetter(proxy.skew) });
                }
            }
        });

        // Parallax effect on image during scroll
        if (imageContainer) {
            gsap.to(imageContainer, {
                y: 50,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                }
            });
        }

    }, []);

    return (
        <section
            ref={containerRef}
            className="min-h-screen w-full flex items-center justify-center bg-white dark:bg-black text-black dark:text-white overflow-hidden relative px-6 md:px-8 lg:px-16 py-16 md:py-20 pb-24 md:pb-28"
        >
            <div className="w-full max-w-7xl mx-auto z-10">
                {/* Hero Image with brutalist frame */}
                <a
                    href="https://github.com/IamNishant51"
                    target="_blank"
                    rel="noopener noreferrer"
                    ref={imageRef}
                    className="relative w-44 h-44 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 mx-auto mb-6 md:mb-12 group cursor-pointer block isolate"
                >
                    {/* Neon accent offset frame */}
                    <div className="absolute inset-0 bg-[#CCFF00] translate-x-2 translate-y-2 sm:translate-x-3 sm:translate-y-3 transition-transform duration-300 group-hover:translate-x-3 group-hover:translate-y-3 sm:group-hover:translate-x-4 sm:group-hover:translate-y-4" />
                    {/* Black border frame */}
                    <div className="absolute inset-0 border-2 md:border-4 border-black dark:border-white bg-white dark:bg-black transition-transform duration-300 group-hover:scale-105" />
                    {/* Image container */}
                    <div className="relative w-full h-full overflow-hidden border-2 md:border-4 border-black dark:border-white">
                        <Image
                            src="https://ik.imagekit.io/9pfz6g8ri/avatars/nishant.jpg"
                            alt="Nishant Unavane - Full-Stack Developer specializing in React, Next.js, and TypeScript"
                            fill
                            className="object-cover grayscale hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                            priority
                            sizes="(max-width: 640px) 160px, (max-width: 768px) 192px, (max-width: 1024px) 224px, 256px"
                        />
                    </div>
                    {/* Corner accents */}
                    <div className="absolute -top-1 -left-1 w-3 h-3 md:w-4 md:h-4 bg-black dark:bg-white transition-all duration-300 group-hover:w-4 group-hover:h-4 md:group-hover:w-5 md:group-hover:h-5" />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-black dark:bg-white transition-all duration-300 group-hover:w-4 group-hover:h-4 md:group-hover:w-5 md:group-hover:h-5" />
                </a>

                {/* Name label */}
                <div ref={nameLabelRef} className="flex justify-center mb-4 md:mb-8 opacity-0 relative z-20 pointer-events-none">
                    <span className="text-[10px] md:text-sm font-mono uppercase tracking-[0.3em] text-black/50 dark:text-white/50 border border-black/20 dark:border-white/20 px-3 py-1.5 md:px-4 md:py-2 hover:border-[#CCFF00] hover:text-[#CCFF00] hover:tracking-[0.4em] transition-all duration-500 cursor-default pointer-events-auto">
                        Nishant
                    </span>
                </div>

                {/* Two-line headline with proper word breaks */}
                <h1 className="text-[13vw] sm:text-[12vw] md:text-[10vw] lg:text-[9vw] font-black leading-[0.85] tracking-[-0.04em] uppercase text-center overflow-hidden" style={{ transitionProperty: "none" }}>
                    <span ref={line1Ref} className="block" style={{ transitionProperty: "none" }}>CODE MEETS</span>
                    <span ref={line2Ref} className="block text-gray-400 dark:text-gray-600" style={{ transitionProperty: "none" }}>CREATIVITY</span>
                </h1>

                {/* Subtext */}
                <p ref={subtextRef} className="text-center mt-6 md:mt-12 text-xs md:text-base lg:text-lg opacity-0 max-w-md mx-auto px-4">
                    <TypingAnimation />
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6 mt-6 md:mt-10 mb-16 md:mb-20">
                    <button
                        onClick={() => {
                            const contactSection = document.querySelector('section:has(form)');
                            contactSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }}
                        className="group relative w-full sm:w-auto px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 bg-black dark:bg-white text-white dark:text-black border-2 border-black dark:border-white uppercase text-xs sm:text-sm md:text-base tracking-widest font-bold overflow-hidden hover:bg-transparent dark:hover:bg-transparent hover:text-black dark:hover:text-white active:scale-95"
                        style={{ transitionProperty: "transform, background-color, border-color", transitionDuration: "500ms" }}
                    >
                        <span className="relative z-10">Let's Talk</span>
                        <div className="absolute inset-0 bg-[#CCFF00] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left -z-0"></div>
                        <span className="absolute inset-0 bg-[#CCFF00] opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-10">
                            <span className="text-black dark:text-black font-bold">Let's Talk</span>
                        </span>
                    </button>

                    <a
                        href="https://ik.imagekit.io/9pfz6g8ri/avatars/Nishant_Unavane_Resume.pdf"
                        download="Nishant_Unavane_Resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative w-full sm:w-auto px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 border-2 border-black dark:border-white text-black dark:text-white uppercase text-xs sm:text-sm md:text-base tracking-widest font-bold hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black active:scale-95 flex items-center justify-center gap-2 sm:gap-3"
                        style={{ transitionProperty: "transform, background-color, border-color", transitionDuration: "500ms" }}
                    >
                        <span>Download CV</span>
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                    </a>
                </div>

                {/* Scroll Indicator */}
                <div
                    onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
                    className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 hover:opacity-100 transition-opacity duration-300 cursor-pointer group"
                >
                    <span className="text-[10px] md:text-xs uppercase tracking-widest group-hover:tracking-[0.3em] transition-all duration-300">Scroll</span>
                    <div className="w-px h-10 md:h-12 bg-current animate-pulse group-hover:h-14 md:group-hover:h-16 transition-all duration-300" />
                </div>
            </div>

            {/* Background Grid */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
                <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
            </div>
        </section>
    );
};

export default Hero;
