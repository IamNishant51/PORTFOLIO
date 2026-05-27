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
                { opacity: 1, duration: 1, ease: "power2.out", delay: 0.2 }
            );
        }, footerRef);

        return () => ctx.revert();
    }, []);

    return (
        <footer
            ref={footerRef}
            className="relative w-full py-16 md:py-24"
            style={{
                background: "var(--bg)",
                borderTop: "1px solid var(--border-hi)",
            }}
        >
            {/* Large background text */}
            <div
                className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none"
                aria-hidden="true"
            >
                <span
                    className="text-display font-bold uppercase whitespace-nowrap"
                    style={{ color: "rgba(240,237,230,0.025)", fontSize: "clamp(4rem, 15vw, 20rem)" }}
                >
                    Let's Connect
                </span>
            </div>

            <div className="section-container relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    {/* Brand */}
                    <div>
                        <p className="text-heading font-bold mb-2" style={{ color: "var(--fg)" }}>
                            nishant
                        </p>
                        <p className="badge-neutral" style={{ color: "var(--color-muted-ash)" }}>
                            Full-Stack Developer
                        </p>
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-6">
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

                    {/* Copyright */}
                    <p className="text-caption text-center md:text-right" style={{ color: "var(--color-muted-ash)" }}>
                        © <span ref={yearRef}>2026</span> Nishant. All rights reserved.
                    </p>
                </div>

                {/* Bottom accent line */}
                <div
                    className="mt-12 h-px"
                    style={{ background: "linear-gradient(to right, transparent, var(--accent), transparent)" }}
                />
            </div>
        </footer>
    );
}
