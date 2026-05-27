"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin, Mail, Download } from "lucide-react";
import SignalBeacon from "./ui/svg/SignalBeacon";

gsap.registerPlugin(ScrollTrigger);

const SOCIALS = [
    { icon: Github, label: "GitHub", href: "https://github.com/IamNishant51" },
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/nishant-unavane-008291275/" },
    { icon: Mail, label: "Email", href: "mailto:nishant.unavane@outlook.com" },
    { icon: Download, label: "Résumé", href: "https://ik.imagekit.io/9pfz6g8ri/Nishant_Unavane_FullStack_resume.pdf", download: true },
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
                            className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3"
                        >
                            {SOCIALS.map(({ icon: Icon, label, href, download }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target={download ? "_blank" : undefined}
                                    rel={download ? "noopener noreferrer" : undefined}
                                    download={download ? "Nishant_Unavane_FullStack_resume.pdf" : undefined}
                                    className="btn-ghost-primary justify-center sm:justify-start"
                                    style={{ gap: "10px" }}
                                >
                                    <Icon className="w-4 h-4" aria-hidden="true" />
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
