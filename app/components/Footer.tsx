"use client";
import { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { reducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
    const footerRef = useRef<HTMLElement>(null);
    const yearRef = useRef<HTMLSpanElement>(null);
    const accentLineRef = useRef<HTMLDivElement>(null);
    const brandRef = useRef<HTMLDivElement>(null);
    const linksRef = useRef<HTMLElement>(null);

    const dur = useMemo(() => reducedMotion ? 0.01 : 1, []);

    useEffect(() => {
        if (yearRef.current) {
            yearRef.current.textContent = new Date().getFullYear().toString();
        }

        const ctx = gsap.context(() => {
            /* Brand: fade-in with letter-spacing animation */
            gsap.fromTo(brandRef.current,
                { opacity: 0, letterSpacing: "0.1em" },
                { opacity: 1, letterSpacing: "normal", duration: dur * 1.2, ease: "power2.out", delay: 0.05 }
            );

            /* Links: stagger fade-in */
            if (linksRef.current) {
                gsap.fromTo(Array.from(linksRef.current.children),
                    { opacity: 0, y: 8 },
                    { opacity: 1, y: 0, stagger: 0.06, duration: dur * 0.6, ease: "power2.out", delay: 0.15 }
                );
            }

            /* Accent line: draw from center outward */
            gsap.fromTo(accentLineRef.current,
                { scaleX: 0 },
                { scaleX: 1, duration: dur * 1.4, ease: "power2.inOut", delay: 0.2,
                    transformOrigin: "center center",
                }
            );
        }, footerRef);

        return () => ctx.revert();
    }, [dur]);

    return (
        <footer
            ref={footerRef}
            className="fixed bottom-0 left-0 right-0 w-full"
            style={{
                background: "var(--bg)",
                zIndex: 1,
            }}
        >
            {/* Top gradient fade */}
            <div
                className="absolute top-0 left-0 right-0 pointer-events-none"
                style={{
                    height: "60px",
                    top: "-60px",
                    background: "linear-gradient(to bottom, transparent, var(--bg))",
                }}
                aria-hidden="true"
            />

            {/* Large background text */}
            <div
                className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none"
                aria-hidden="true"
            >
                <span
                    className="font-bold uppercase whitespace-nowrap"
                    style={{ color: "rgba(255,255,255,0.018)", fontSize: "clamp(3rem, 12vw, 16rem)" }}
                >
                    Let&apos;s Connect
                </span>
            </div>

            <div
                className="section-container relative z-10"
                style={{ paddingTop: "clamp(2rem, 4vw, 4rem)", paddingBottom: "max(clamp(2rem, 4vw, 4rem), env(safe-area-inset-bottom))" }}
            >
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Brand */}
                    <div ref={brandRef}>
                        <p className="text-heading font-bold mb-1" style={{ color: "var(--fg)", fontSize: "clamp(1.25rem, 3vw, 2rem)" }}>
                            nishant
                        </p>
                        <p className="text-mono" style={{ color: "var(--color-muted-ash)" }}>
                            Full-Stack Developer
                        </p>
                    </div>

                    {/* Links */}
                    <nav ref={linksRef} aria-label="Footer navigation">
                        <div className="flex items-center gap-6 flex-wrap justify-center">
                            {[
                                { label: "GitHub", href: "https://github.com/IamNishant51" },
                                { label: "LinkedIn", href: "https://www.linkedin.com/in/nishant-unavane-008291275/" },
                                { label: "Email", href: "mailto:nishant.unavane@outlook.com" },
                            ].map(({ label, href }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target={href.startsWith("http") ? "_blank" : undefined}
                                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                                    className="text-body-sm hover-line"
                                    style={{ color: "var(--color-muted-ash)" }}
                                >
                                    {label}
                                </a>
                            ))}
                        </div>
                    </nav>

                    {/* Copyright */}
                    <p className="text-mono text-center md:text-right" style={{ color: "var(--color-muted-ash)" }}>
                        © <span ref={yearRef}>2026</span> Nishant. All rights reserved.
                    </p>
                </div>

                {/* Bottom accent line */}
                <div
                    ref={accentLineRef}
                    className="mt-8 h-px origin-center"
                    style={{ background: "linear-gradient(to right, transparent, var(--accent), transparent)", transform: "scaleX(0)" }}
                    aria-hidden="true"
                />
            </div>
        </footer>
    );
}
