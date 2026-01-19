"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
    const [percentage, setPercentage] = useState(0);
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const nameRef = useRef(null);
    const taglineRef = useRef(null);
    const progressBarRef = useRef(null);
    const statusRef = useRef(null);

    useEffect(() => {
        // Animate name
        gsap.fromTo(nameRef.current,
            { opacity: 0, y: 40, letterSpacing: "0.5em" },
            { opacity: 1, y: 0, letterSpacing: "0.1em", duration: 1.2, ease: "power3.out", delay: 0.2 }
        );

        // Tagline
        gsap.fromTo(taglineRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.6 }
        );

        // Progress bar
        gsap.fromTo(progressBarRef.current,
            { scaleX: 0, opacity: 0 },
            { scaleX: 1, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.8 }
        );

        // Status text
        gsap.fromTo(statusRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.5, delay: 1.0 }
        );

        // Counter animation with realistic loading phases
        let currentPhase = 0;
        const phases = [
            { end: 30, speed: 120 },
            { end: 60, speed: 100 },
            { end: 90, speed: 80 },
            { end: 100, speed: 60 }
        ];

        const interval = setInterval(() => {
            setPercentage((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }

                const phase = phases[currentPhase];
                if (prev >= phase.end && currentPhase < phases.length - 1) {
                    currentPhase++;
                }

                return Math.min(prev + Math.floor(Math.random() * 8) + 3, phase.end);
            });
        }, phases[currentPhase].speed);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (percentage === 100) {
            const tl = gsap.timeline({
                onComplete: onComplete,
            });

            // Exit sequence
            tl.to(statusRef.current, {
                opacity: 0,
                duration: 0.3,
            })
                .to(taglineRef.current, {
                    opacity: 0,
                    y: -30,
                    scale: 0.95,
                    duration: 0.6,
                    ease: "power2.in"
                })
                .to(textRef.current, {
                    opacity: 0,
                    scale: 1.5,
                    duration: 0.6,
                    ease: "power2.in"
                }, "-=0.5")
                .to(nameRef.current, {
                    opacity: 0,
                    y: -40,
                    letterSpacing: "0.5em",
                    duration: 0.6,
                    ease: "power2.in"
                }, "-=0.6")
                .to(progressBarRef.current, {
                    scaleX: 0,
                    opacity: 0,
                    duration: 0.4,
                    ease: "power2.in"
                }, "-=0.4")
                .to(containerRef.current, {
                    y: "-100%",
                    duration: 1,
                    ease: "power4.inOut",
                }, "-=0.2");
        }
    }, [percentage, onComplete]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white font-bold overflow-hidden"
        >
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-[0.02]">
                <div className="w-full h-full" style={{
                    backgroundImage: 'linear-gradient(to right, #CCFF00 1px, transparent 1px), linear-gradient(to bottom, #CCFF00 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                    animation: 'gridSlide 30s linear infinite'
                }} />
            </div>

            {/* Corner labels */}
            <div className="absolute top-6 left-6 md:top-10 md:left-10 opacity-50">
                <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.3em]">Portfolio</span>
            </div>
            <div className="absolute top-6 right-6 md:top-10 md:right-10 opacity-50">
                <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.3em]">2026</span>
            </div>

            {/* Main content */}
            <div className="relative z-10 flex flex-col items-center gap-6 md:gap-10 px-6">
                {/* Name */}
                <div ref={nameRef} className="text-center opacity-0">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight">
                        Nishant Unavane
                    </h1>
                </div>

                {/* Tagline */}
                <div ref={taglineRef} className="text-center opacity-0">
                    <p className="text-xs sm:text-sm md:text-base uppercase tracking-[0.3em] text-white/60 font-mono">
                        Full-Stack Developer
                    </p>
                </div>

                {/* Progress Section */}
                <div className="w-64 sm:w-80 md:w-96 mt-4 md:mt-8">
                    {/* Loading bar container */}
                    <div ref={progressBarRef} className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-4 origin-left">
                        <div
                            className="h-full bg-gradient-to-r from-[#CCFF00] to-[#A0D900] transition-all duration-300 ease-out rounded-full relative"
                            style={{ width: `${percentage}%` }}
                        >
                            <div className="absolute inset-0 bg-white/30 animate-pulse" />
                        </div>
                    </div>

                    {/* Percentage and status */}
                    <div className="flex items-center justify-between">
                        <div ref={statusRef} className="opacity-0">
                            <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-white/40">
                                {percentage < 30 ? 'Initializing...' :
                                    percentage < 60 ? 'Loading Assets...' :
                                        percentage < 90 ? 'Preparing...' :
                                            percentage < 100 ? 'Almost There...' : 'Complete'}
                            </span>
                        </div>
                        <div ref={textRef} className="text-3xl sm:text-4xl md:text-5xl font-black tabular-nums text-[#CCFF00]">
                            {Math.min(percentage, 100)}
                            <span className="text-2xl sm:text-3xl md:text-4xl">%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom corner decorations */}
            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 w-12 h-12 md:w-16 md:h-16 border-2 border-white/10" />
            <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 w-12 h-12 md:w-16 md:h-16 border-2 border-[#CCFF00]/20">
                <div className="absolute -bottom-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-[#CCFF00]" />
            </div>

            <style jsx>{`
                @keyframes gridSlide {
                    0% {
                        transform: translate(0, 0);
                    }
                    100% {
                        transform: translate(60px, 60px);
                    }
                }
            `}</style>
        </div>
    );
};

export default Preloader;
