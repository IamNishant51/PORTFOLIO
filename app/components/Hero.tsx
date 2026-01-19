"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const line1Ref = useRef<HTMLSpanElement>(null);
    const line2Ref = useRef<HTMLSpanElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
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
                y: 100,
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
            className="min-h-screen w-full flex items-center justify-center bg-white text-black overflow-hidden relative px-6 md:px-8 lg:px-16 py-16 md:py-20"
        >
            <div className="w-full max-w-7xl mx-auto z-10">
                {/* Hero Image with brutalist frame */}
                <div
                    ref={imageRef}
                    className="relative w-44 h-44 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 mx-auto mb-6 md:mb-12"
                >
                    {/* Neon accent offset frame */}
                    <div className="absolute inset-0 bg-[#CCFF00] translate-x-2 translate-y-2 sm:translate-x-3 sm:translate-y-3" />
                    {/* Black border frame */}
                    <div className="absolute inset-0 border-2 md:border-4 border-black bg-white" />
                    {/* Image container */}
                    <div className="relative w-full h-full overflow-hidden border-2 md:border-4 border-black">
                        <Image
                            src="https://ik.imagekit.io/9pfz6g8ri/avatars/nishant.jpg"
                            alt="Nishant - Creative Developer"
                            fill
                            className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                            priority
                            sizes="(max-width: 640px) 160px, (max-width: 768px) 192px, (max-width: 1024px) 224px, 256px"
                        />
                    </div>
                    {/* Corner accents */}
                    <div className="absolute -top-1 -left-1 w-3 h-3 md:w-4 md:h-4 bg-black" />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-black" />
                </div>

                {/* Name label */}
                <div ref={nameLabelRef} className="flex justify-center mb-4 md:mb-8 opacity-0">
                    <span className="text-[10px] md:text-sm font-mono uppercase tracking-[0.3em] text-black/50 border border-black/20 px-3 py-1.5 md:px-4 md:py-2">
                        Nishant
                    </span>
                </div>

                {/* Two-line headline with proper word breaks */}
                <h1 className="text-[13vw] sm:text-[12vw] md:text-[10vw] lg:text-[9vw] font-black leading-[0.85] tracking-[-0.04em] uppercase text-center overflow-hidden">
                    <span ref={line1Ref} className="block">CREATIVE</span>
                    <span ref={line2Ref} className="block text-gray-400">DEVELOPER</span>
                </h1>

                {/* Subtext */}
                <p ref={subtextRef} className="text-center mt-6 md:mt-12 text-xs md:text-base lg:text-lg opacity-0 max-w-md mx-auto px-4">
                    Full-Stack Developer crafting digital experiences with code and creativity.
                </p>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
                    <span className="text-[10px] md:text-xs uppercase tracking-widest">Scroll</span>
                    <div className="w-px h-10 md:h-12 bg-current animate-pulse" />
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
