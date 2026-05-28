"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Footer() {
    const footerRef = useRef<HTMLElement>(null);
    const yearRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (yearRef.current) {
            yearRef.current.textContent = new Date().getFullYear().toString();
        }

        const ctx = gsap.context(() => {
            gsap.fromTo(
                footerRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 1.2, ease: "power2.out", delay: 0.1 }
            );
        }, footerRef);

        return () => ctx.revert();
    }, []);

    return (
        <footer
            ref={footerRef}
            className="fixed bottom-0 left-0 right-0 w-full"
            style={{
                background: "var(--bg)",
                borderTop: "1px solid var(--border-hi)",
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
                    <div>
                        <p className="text-heading font-bold mb-1" style={{ color: "var(--fg)", fontSize: "clamp(1.25rem, 3vw, 2rem)" }}>
                            nishant
                        </p>
                        <p className="text-mono" style={{ color: "var(--color-muted-ash)" }}>
                            Full-Stack Developer
                        </p>
                    </div>

                    {/* Links */}
                    <nav aria-label="Footer navigation">
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
                    className="mt-8 h-px"
                    style={{ background: "linear-gradient(to right, transparent, var(--accent), transparent)" }}
                    aria-hidden="true"
                />
            </div>
        </footer>
    );
}
