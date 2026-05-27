"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
    const [pct, setPct] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const nameRef = useRef<HTMLDivElement>(null);
    const barRef = useRef<HTMLDivElement>(null);
    const barFillRef = useRef<HTMLDivElement>(null);
    const numRef = useRef<HTMLDivElement>(null);
    const tagRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    /* ── Entry animations ── */
    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.fromTo(nameRef.current,
            { y: 60, opacity: 0, letterSpacing: "0.4em" },
            { y: 0, opacity: 1, letterSpacing: "0.05em", duration: 1.1, delay: 0.2 }
        )
            .fromTo(tagRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.7 },
                "-=0.5"
            )
            .fromTo(barRef.current,
                { scaleX: 0, opacity: 0 },
                { scaleX: 1, opacity: 1, duration: 0.6, transformOrigin: "left" },
                "-=0.4"
            )
            .fromTo(numRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.4 },
                "-=0.3"
            )
            .fromTo(lineRef.current,
                { scaleX: 0 },
                { scaleX: 1, duration: 0.8, transformOrigin: "left" },
                "-=0.2"
            );
    }, []);

    /* ── Counter ── */
    useEffect(() => {
        let phase = 0;
        const phases = [
            { end: 30, speed: 110 },
            { end: 60, speed: 90 },
            { end: 90, speed: 70 },
            { end: 100, speed: 50 },
        ];

        const id = setInterval(() => {
            setPct((prev) => {
                if (prev >= 100) { clearInterval(id); return 100; }
                const p = phases[phase];
                if (prev >= p.end && phase < phases.length - 1) phase++;
                return Math.min(prev + Math.floor(Math.random() * 7) + 2, phases[phase].end);
            });
        }, phases[phase].speed);

        return () => clearInterval(id);
    }, []);

    /* ── Exit when 100% ── */
    useEffect(() => {
        if (pct < 100) return;

        const tl = gsap.timeline({ onComplete });

        tl.to([tagRef.current, barRef.current, numRef.current], {
            opacity: 0, y: -20, stagger: 0.05, duration: 0.4, ease: "power2.in",
        })
            .to(nameRef.current, {
                opacity: 0, y: -40, letterSpacing: "0.4em", duration: 0.6, ease: "power2.in",
            }, "-=0.3")
            .to(lineRef.current, {
                scaleX: 0, transformOrigin: "right", duration: 0.4, ease: "power2.in",
            }, "-=0.4")
            .to(containerRef.current, {
                y: "-100%",
                duration: 1.1,
                ease: "power4.inOut",
            }, "-=0.1");
    }, [pct, onComplete]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden"
            style={{ background: "var(--bg)" }}
        >
            {/* Corner labels */}
            <div className="absolute top-6 left-6 md:top-10 md:left-10">
                <span className="text-mono" style={{ color: "rgba(240,237,230,0.3)" }}>Portfolio</span>
            </div>
            <div className="absolute top-6 right-6 md:top-10 md:right-10">
                <span className="text-mono" style={{ color: "rgba(240,237,230,0.3)" }}>2026</span>
            </div>

            {/* Corner accents */}
            <div className="absolute top-6 left-6 w-8 h-8 pointer-events-none" style={{ borderTop: "1px solid var(--accent)", borderLeft: "1px solid var(--accent)" }} />
            <div className="absolute bottom-6 right-6 w-8 h-8 pointer-events-none" style={{ borderBottom: "1px solid var(--accent)", borderRight: "1px solid var(--accent)" }} />

            {/* Main content */}
            <div className="relative z-10 flex flex-col items-center gap-8 px-6 w-full max-w-lg">
                {/* Name */}
                <div ref={nameRef} className="text-center opacity-0">
                    <h1
                        className="text-h1 font-bold uppercase"
                        style={{ color: "var(--fg)" }}
                    >
                        Nishant Unavane
                    </h1>
                </div>

                {/* Tagline */}
                <div ref={tagRef} className="opacity-0">
                    <p className="text-mono text-center" style={{ color: "var(--accent)" }}>
                        Full-Stack Developer
                    </p>
                </div>

                {/* Progress */}
                <div className="w-full mt-4">
                    <div
                        ref={barRef}
                        className="w-full h-px mb-4 origin-left opacity-0"
                        style={{ background: "var(--border-mid)" }}
                    >
                        <div
                            ref={barFillRef}
                            className="h-full origin-left"
                            style={{
                                background: "linear-gradient(to right, var(--accent), var(--electric-blue))",
                                width: `${pct}%`,
                                transition: "width 0.3s ease !important",
                            }}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-mono" style={{ color: "rgba(240,237,230,0.3)" }}>
                            {pct < 30 ? "Initializing…" : pct < 60 ? "Loading assets…" : pct < 90 ? "Preparing…" : pct < 100 ? "Almost there…" : "Complete"}
                        </span>
                        <div ref={numRef} className="opacity-0">
                            <span
                                className="font-bold tabular-nums"
                                style={{ color: "var(--accent)", fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1 }}
                            >
                                {pct}
                                <span style={{ fontSize: "0.6em" }}>%</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Horizontal accent line */}
            <div
                ref={lineRef}
                className="absolute bottom-0 left-0 right-0 h-px origin-left"
                style={{ background: "linear-gradient(to right, var(--accent), var(--electric-blue), transparent)" }}
            />
        </div>
    );
}
