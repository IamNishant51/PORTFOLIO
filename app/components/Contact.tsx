"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin, Mail, Download } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const SOCIALS = [
    { icon: Github, label: "GitHub", href: "https://github.com/IamNishant51" },
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/nishant-unavane-008291275/" },
    { icon: Mail, label: "Email", href: "mailto:nishant.unavane@outlook.com" },
    { icon: Download, label: "Resume", href: "https://ik.imagekit.io/9pfz6g8ri/avatars/Nishant_Unavane_Resume.pdf", download: true },
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
                setTimeout(() => setStatus("idle"), 3000);
            } else {
                setStatus("error");
                setTimeout(() => setStatus("idle"), 3000);
            }
        } catch {
            setStatus("error");
            setTimeout(() => setStatus("idle"), 3000);
        }
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(headingRef.current,
                { y: 60, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1, ease: "power4.out",
                    scrollTrigger: { trigger: headingRef.current, start: "top 85%", once: true }
                }
            );
            gsap.fromTo(formRef.current,
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.15,
                    scrollTrigger: { trigger: formRef.current, start: "top 85%", once: true }
                }
            );
            if (socialsRef.current) {
                gsap.fromTo(Array.from(socialsRef.current.children),
                    { y: 30, opacity: 0 },
                    {
                        y: 0, opacity: 1, stagger: 0.08, duration: 0.7, ease: "power3.out",
                        scrollTrigger: { trigger: socialsRef.current, start: "top 88%", once: true }
                    }
                );
            }
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="contact"
            className="relative py-24 md:py-32 lg:py-40 mb-[50vh] overflow-hidden"
            style={{ background: "var(--bg)" }}
        >
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "var(--border-hi)" }} />

            {/* Decorative large text */}
            <div
                className="absolute bottom-0 left-0 right-0 text-display font-bold uppercase select-none pointer-events-none overflow-hidden leading-none"
                style={{ color: "rgba(240,237,230,0.02)", lineHeight: 0.85 }}
                aria-hidden="true"
            >
                CONTACT
            </div>

            <div className="section-container relative z-10">
                {/* Label */}
                <div className="flex items-center gap-4 mb-12">
                    <span className="badge-neutral">06</span>
                    <span className="w-12 h-px" style={{ background: "var(--border-hi)" }} />
                    <span className="badge-neutral" style={{ color: "var(--fg)" }}>Contact</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                    {/* Left */}
                    <div ref={headingRef}>
                        <h2 className="text-heading-lg mb-6" style={{ color: "var(--fg)" }}>
                            Let&apos;s build something<br />
                            amazing
                        </h2>
                        <p className="text-body max-w-sm mb-12" style={{ color: "var(--color-muted-ash)" }}>
                            Have a project in mind? I&apos;d love to hear about it. Drop me a message
                            and let&apos;s create something extraordinary together.
                        </p>

                        {/* Socials */}
                        <div ref={socialsRef} className="flex flex-wrap gap-3">
                            {SOCIALS.map(({ icon: Icon, label, href, download }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target={download ? "_blank" : undefined}
                                    rel={download ? "noopener noreferrer" : undefined}
                                    download={download ? "Nishant_Unavane_Resume.pdf" : undefined}
                                    className="group btn-ghost-primary w-full md:w-auto"
                                    style={{
                                        borderColor: "rgba(255, 255, 255, 0.25)",
                                    }}
                                    onMouseEnter={(e) => {
                                        const el = e.currentTarget as HTMLElement;
                                        el.style.borderColor = "rgba(255, 255, 255, 0.5)";
                                        el.style.background = "rgba(255, 255, 255, 0.05)";
                                    }}
                                    onMouseLeave={(e) => {
                                        const el = e.currentTarget as HTMLElement;
                                        el.style.borderColor = "rgba(255, 255, 255, 0.25)";
                                        el.style.background = "rgba(0, 0, 0, 0)";
                                    }}
                                >
                                    <Icon className="w-4 h-4" />
                                    {label}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Right: Form */}
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
                        {[
                            { name: "name", type: "text", placeholder: "Your Name" },
                            { name: "email", type: "email", placeholder: "Your Email" },
                        ].map((field) => (
                            <div key={field.name} className="relative group" style={{ borderBottom: "1px solid var(--border-hi)" }}>
                                <input
                                    type={field.type}
                                    name={field.name}
                                    value={formData[field.name as "name" | "email"]}
                                    onChange={(e) => setFormData((p) => ({ ...p, [field.name]: e.target.value }))}
                                    placeholder={field.placeholder}
                                    required
                                    className="w-full bg-transparent py-4 text-body focus:outline-none placeholder:opacity-30"
                                    style={{ color: "var(--fg)" }}
                                />
                                <div
                                    className="absolute bottom-0 left-0 w-0 h-px group-focus-within:w-full"
                                    style={{ background: "var(--accent)", transition: "width 0.5s cubic-bezier(0.16,1,0.3,1) !important" }}
                                />
                            </div>
                        ))}

                        <div className="relative group" style={{ borderBottom: "1px solid var(--border-hi)" }}>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                                placeholder="Tell me about your project"
                                rows={4}
                                required
                                className="w-full bg-transparent py-4 text-body focus:outline-none placeholder:opacity-30 resize-none"
                                style={{ color: "var(--fg)" }}
                            />
                            <div
                                className="absolute bottom-0 left-0 w-0 h-px group-focus-within:w-full"
                                style={{ background: "var(--accent)", transition: "width 0.5s cubic-bezier(0.16,1,0.3,1) !important" }}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={status === "sending"}
                            className="btn-ghost-primary w-full sm:w-auto"
                            style={{
                                background: status === "success" ? "rgba(34, 197, 94, 0.1)" : status === "error" ? "rgba(239, 68, 68, 0.1)" : "rgba(0, 0, 0, 0)",
                                borderColor: status === "success" ? "rgba(34, 197, 94, 0.5)" : status === "error" ? "rgba(239, 68, 68, 0.5)" : "rgba(255, 255, 255, 0.25)",
                                color: status === "success" ? "#86efac" : status === "error" ? "#fca5a5" : "var(--fg)",
                                opacity: status === "sending" ? 0.7 : 1,
                                cursor: status === "sending" ? "wait" : "pointer",
                            }}
                        >
                            <span className="relative z-10 flex items-center gap-3">
                                {status === "sending" ? (
                                    <span className="flex gap-1">
                                        {[0, 150, 300].map((d) => (
                                            <span
                                                key={d}
                                                className="w-1.5 h-1.5 rounded-full animate-bounce"
                                                style={{ background: "#000", animationDelay: `${d}ms` }}
                                            />
                                        ))}
                                    </span>
                                ) : status === "success" ? (
                                    "Message Sent ✓"
                                ) : status === "error" ? (
                                    "Failed — Try Again"
                                ) : (
                                    <>
                                        Send Message
                                        <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </>
                                )}
                            </span>
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
