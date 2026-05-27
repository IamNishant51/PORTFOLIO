"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
    const [pct, setPct] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const topPanelRef = useRef<HTMLDivElement>(null);
    const bottomPanelRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);
    const counterWrapperRef = useRef<HTMLDivElement>(null);
    const counterRef = useRef<HTMLSpanElement>(null);
    const nameRef = useRef<HTMLHeadingElement>(null);
    const tagRef = useRef<HTMLParagraphElement>(null);

    /* ── Counter Logic ── */
    useEffect(() => {
        const obj = { val: 0 };
        const tl = gsap.timeline();

        // Animate counter from 0 to 100
        tl.to(obj, {
            val: 100,
            duration: 2.4,
            ease: "power2.inOut",
            onUpdate: () => {
                const currentVal = Math.floor(obj.val);
                setPct(currentVal);
                if (counterRef.current) {
                    counterRef.current.innerText = currentVal.toString().padStart(2, "0");
                }
            },
            onComplete: () => {
                playRevealSequence();
            }
        });

        // Fade in glow and counter initially
        gsap.fromTo(counterWrapperRef.current, 
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" }
        );

        gsap.fromTo(glowRef.current,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1.2, duration: 2.4, ease: "power2.inOut" }
        );
    }, [playRevealSequence]);

    /* ── Reveal Sequence ── */
    const playRevealSequence = useCallback(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                onComplete();
            }
        });

        tl.to(counterWrapperRef.current, {
            opacity: 0,
            y: -25,
            duration: 0.6,
            ease: "power3.in"
        })
        .to(nameRef.current, {
            opacity: 1,
            filter: "blur(0px)",
            scale: 1,
            letterSpacing: "0.22em",
            duration: 1.8,
            ease: "power3.out"
        }, "-=0.2")
        .to(tagRef.current, {
            opacity: 0.7,
            filter: "blur(0px)",
            letterSpacing: "0.45em",
            duration: 1.4,
            ease: "power3.out"
        }, "-=1.3")
        .to(nameRef.current, {
            opacity: 0,
            filter: "blur(12px)",
            letterSpacing: "0.38em",
            scale: 0.96,
            duration: 1.0,
            ease: "power3.in",
            delay: 1.2
        })
        .to(tagRef.current, {
            opacity: 0,
            filter: "blur(8px)",
            letterSpacing: "0.55em",
            duration: 0.8,
            ease: "power3.in"
        }, "-=0.9")
        .to(glowRef.current, {
            opacity: 0,
            scale: 1.4,
            duration: 0.9,
            ease: "power3.in"
        }, "-=0.9")
        .to(topPanelRef.current, {
            y: "-100%",
            duration: 1.3,
            ease: "power4.inOut"
        })
        .to(bottomPanelRef.current, {
            y: "100%",
            duration: 1.3,
            ease: "power4.inOut"
        }, "-=1.3");
    }, [onComplete]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden"
            style={{ background: "transparent" }}
        >
            {/* Top sliding panel */}
            <div
                ref={topPanelRef}
                className="absolute inset-x-0 top-0 h-1/2 bg-[#0c0c0b] border-b border-white/5"
                style={{ transform: "translateY(0%)" }}
            />
            {/* Bottom sliding panel */}
            <div
                ref={bottomPanelRef}
                className="absolute inset-x-0 bottom-0 h-1/2 bg-[#0c0c0b] border-t border-white/5"
                style={{ transform: "translateY(0%)" }}
            />

            {/* Spotlight glow behind text */}
            <div
                ref={glowRef}
                className="absolute w-[500px] h-[500px] rounded-full pointer-events-none opacity-0"
                style={{
                    background: "radial-gradient(circle, rgba(255,255,255,0.065) 0%, rgba(255,255,255,0) 70%)",
                }}
            />

            {/* Corner metadata overlays */}
            <div className="absolute top-6 left-6 md:top-10 md:left-10 z-20">
                <span className="text-mono" style={{ color: "rgba(255,255,255,0.18)" }}>PORTFOLIO</span>
            </div>
            <div className="absolute top-6 right-6 md:top-10 md:right-10 z-20">
                <span className="text-mono" style={{ color: "rgba(255,255,255,0.18)" }}>NISHANT</span>
            </div>

            {/* Content overlay */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">
                {/* Counter */}
                <div ref={counterWrapperRef} className="mb-4 opacity-0">
                    <span
                        ref={counterRef}
                        className="font-mono font-light tracking-widest tabular-nums"
                        style={{ color: "rgba(255,255,255,0.85)", fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
                    >
                        00
                    </span>
                    <span style={{ color: "rgba(255,255,255,0.45)", fontSize: "clamp(1rem, 2vw, 1.5rem)", marginLeft: "0.25rem" }}>%</span>
                </div>

                {/* Movie Title Style Name */}
                <div className="overflow-visible py-4">
                    <h1
                        ref={nameRef}
                        className="font-light uppercase tracking-[0.55em] leading-none opacity-0"
                        style={{
                            color: "var(--fg)",
                            fontSize: "clamp(1.75rem, 5vw, 3.5rem)",
                            filter: "blur(12px)",
                            transform: "scale(1.08)",
                        }}
                    >
                        Nishant Unavane
                    </h1>
                </div>

                {/* Tagline */}
                <div className="overflow-visible mt-2">
                    <p
                        ref={tagRef}
                        className="text-mono uppercase tracking-[0.65em] opacity-0"
                        style={{
                            color: "rgba(255,255,255,0.6)",
                            fontSize: "clamp(0.65rem, 1.2vw, 0.8rem)",
                            filter: "blur(6px)",
                        }}
                    >
                        Full-Stack Developer
                    </p>
                </div>
            </div>
        </div>
    );
}
