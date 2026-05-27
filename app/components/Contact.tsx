"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SignalBeacon from "./ui/svg/SignalBeacon";

gsap.registerPlugin(ScrollTrigger);

/* ── Inline SVG icons — guaranteed to render ── */
const GithubIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
);

const LinkedinIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
);

const MailIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <polyline points="2,4 12,13 22,4"/>
    </svg>
);

const DownloadIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
);

const SOCIALS = [
    { Icon: GithubIcon, label: "GitHub", href: "https://github.com/IamNishant51", download: false },
    { Icon: LinkedinIcon, label: "LinkedIn", href: "https://www.linkedin.com/in/nishant-unavane-008291275/", download: false },
    { Icon: MailIcon, label: "Email", href: "mailto:nishant.unavane@outlook.com", download: false },
    { Icon: DownloadIcon, label: "Résumé", href: "https://ik.imagekit.io/9pfz6g8ri/Nishant_Unavane_FullStack_resume.pdf", download: true },
];

export default function Contact() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const socialsRef = useRef<HTMLDivElement>(null);

    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                setStatus("success");
                setFormData({ name: "", email: "", message: "" });
                setTimeout(() => setStatus("idle"), 4000);
            } else {
                setStatus("error");
                setTimeout(() => setStatus("idle"), 4000);
            }
        } catch {
            setStatus("error");
            setTimeout(() => setStatus("idle"), 4000);
        }
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(headingRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1, ease: "power4.out",
                    scrollTrigger: { trigger: headingRef.current, start: "top 88%", once: true }
                }
            );
            gsap.fromTo(formRef.current,
                { y: 36, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.12,
                    scrollTrigger: { trigger: formRef.current, start: "top 88%", once: true }
                }
            );
            if (socialsRef.current) {
                gsap.fromTo(Array.from(socialsRef.current.children),
                    { y: 24, opacity: 0 },
                    {
                        y: 0, opacity: 1, stagger: 0.07, duration: 0.7, ease: "power3.out",
                        scrollTrigger: { trigger: socialsRef.current, start: "top 90%", once: true }
                    }
                );
            }
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const inputStyle: React.CSSProperties = {
        color: "var(--fg)",
        fontSize: "var(--text-body)",
    };

    return (
        <section
            ref={sectionRef}
            id="contact"
            className="relative overflow-hidden"
            style={{
                background: "var(--bg)",
                borderTop: "1px solid var(--border-hi)",
                marginBottom: "clamp(20vh, 30vw, 40vh)",
            }}
        >
            {/* Decorative large text */}
            <div
                className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none pointer-events-none select-none"
                style={{ color: "rgba(255,255,255,0.015)", fontSize: "clamp(5rem, 15vw, 18rem)", fontWeight: 400, lineHeight: 0.85 }}
                aria-hidden="true"
            >
                CONTACT
            </div>

            <div className="section-container section-py relative z-10">
                {/* Label */}
                <div className="section-label">
                    <span className="section-label-num">05</span>
                    <span className="section-label-line" />
                    <span className="section-label-text">Contact</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Left */}
                    <div ref={headingRef}>
                        <h2 className="text-heading-lg mb-5 flex items-center gap-4" style={{ color: "var(--fg)" }}>
                            <span>
                                Let&apos;s build something<br />
                                <span style={{ color: "var(--accent)" }}>amazing</span>
                            </span>
                            <SignalBeacon size={56} />
                        </h2>
                        <p className="text-body max-w-sm mb-10" style={{ color: "var(--color-muted-ash)" }}>
                            Have a project in mind? I&apos;d love to hear about it. Drop me a message
                            and let&apos;s create something extraordinary together.
                        </p>

                        {/* Socials */}
                        <div
                            ref={socialsRef}
                            className="grid grid-cols-2 gap-3"
                        >
                            {SOCIALS.map(({ Icon, label, href, download }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target={download ? "_blank" : undefined}
                                    rel={download ? "noopener noreferrer" : undefined}
                                    download={download ? "Nishant_Unavane_FullStack_resume.pdf" : undefined}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px",
                                        padding: "12px 16px",
                                        border: "1px solid var(--border-hi)",
                                        color: "var(--fg)",
                                        textDecoration: "none",
                                        fontSize: "var(--text-body-sm)",
                                        fontFamily: "var(--font-geistmono)",
                                        transition: "border-color 0.3s ease, background 0.3s ease",
                                        letterSpacing: "0.04em",
                                    }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.45)";
                                        (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLElement).style.borderColor = "var(--border-hi)";
                                        (e.currentTarget as HTMLElement).style.background = "transparent";
                                    }}
                                >
                                    <Icon />
                                    {label}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Right: Form */}
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-7">
                        {[
                            { name: "name", type: "text", placeholder: "Your Name" },
                            { name: "email", type: "email", placeholder: "Your Email" },
                        ].map((field) => (
                            <div
                                key={field.name}
                                className="relative group"
                                style={{ borderBottom: "1px solid var(--border-hi)" }}
                            >
                                <input
                                    type={field.type}
                                    name={field.name}
                                    value={formData[field.name as "name" | "email"]}
                                    onChange={(e) => setFormData((p) => ({ ...p, [field.name]: e.target.value }))}
                                    placeholder={field.placeholder}
                                    required
                                    className="w-full bg-transparent py-4 focus:outline-none placeholder:opacity-25"
                                    style={inputStyle}
                                    autoComplete={field.name === "email" ? "email" : "name"}
                                />
                                <div
                                    className="absolute bottom-0 left-0 w-0 h-px group-focus-within:w-full"
                                    style={{ background: "var(--accent)", transition: "width 0.45s cubic-bezier(0.16,1,0.3,1) !important" }}
                                />
                            </div>
                        ))}

                        <div
                            className="relative group"
                            style={{ borderBottom: "1px solid var(--border-hi)" }}
                        >
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                                placeholder="Tell me about your project"
                                rows={4}
                                required
                                className="w-full bg-transparent py-4 focus:outline-none placeholder:opacity-25 resize-none"
                                style={inputStyle}
                            />
                            <div
                                className="absolute bottom-0 left-0 w-0 h-px group-focus-within:w-full"
                                style={{ background: "var(--accent)", transition: "width 0.45s cubic-bezier(0.16,1,0.3,1) !important" }}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={status === "sending"}
                            className="btn-ghost-primary w-full sm:w-auto"
                            style={{
                                padding: "12px 28px",
                                background: status === "success"
                                    ? "rgba(34,197,94,0.08)"
                                    : status === "error"
                                    ? "rgba(239,68,68,0.08)"
                                    : "rgba(0,0,0,0)",
                                borderColor: status === "success"
                                    ? "rgba(34,197,94,0.45)"
                                    : status === "error"
                                    ? "rgba(239,68,68,0.45)"
                                    : "rgba(255,255,255,0.2)",
                                color: status === "success"
                                    ? "#86efac"
                                    : status === "error"
                                    ? "#fca5a5"
                                    : "var(--fg)",
                                opacity: status === "sending" ? 0.65 : 1,
                                cursor: status === "sending" ? "wait" : "pointer",
                                justifyContent: "center",
                            }}
                        >
                            {status === "sending" ? (
                                <span className="flex items-center gap-2">
                                    <span className="flex gap-1">
                                        {[0, 120, 240].map((d) => (
                                            <span
                                                key={d}
                                                className="w-1.5 h-1.5 animate-bounce"
                                                style={{
                                                    background: "currentColor",
                                                    animationDelay: `${d}ms`,
                                                    borderRadius: "50%",
                                                }}
                                            />
                                        ))}
                                    </span>
                                    Sending…
                                </span>
                            ) : status === "success" ? (
                                "Message Sent ✓"
                            ) : status === "error" ? (
                                "Failed — Try Again"
                            ) : (
                                <>
                                    Send Message
                                    <svg
                                        className="w-4 h-4"
                                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                        aria-hidden="true"
                                        style={{ transition: "transform 0.3s ease !important" }}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
