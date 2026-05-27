"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import FeedbackBubble from "./ui/svg/FeedbackBubble";

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
    _id?: string;
    id?: number;
    name: string;
    role: string;
    image?: string;
    text?: string;
    message?: string;
    rating: number;
}

export default function Testimonials() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    const [showForm, setShowForm] = useState(false);
    const [list, setList] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ name: "", role: "", message: "", rating: 5 });
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

    useEffect(() => {
        fetch("/api/testimonial")
            .then((r) => r.ok ? r.json() : [])
            .then(setList)
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");
        try {
            const res = await fetch("/api/testimonial", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                const data = await res.json();
                setStatus("success");
                setList((prev) => [{ _id: data.testimonial._id, ...formData, rating: Number(formData.rating) }, ...prev]);
                setFormData({ name: "", role: "", message: "", rating: 5 });
                setTimeout(() => { setStatus("idle"); setShowForm(false); }, 2000);
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
                { y: 50, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1, ease: "power4.out",
                    scrollTrigger: { trigger: headingRef.current, start: "top 85%", once: true }
                }
            );
            if (gridRef.current) {
                gsap.fromTo(Array.from(gridRef.current.children),
                    { y: 40, opacity: 0 },
                    {
                        y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power3.out",
                        scrollTrigger: { trigger: gridRef.current, start: "top 85%", once: true }
                    }
                );
            }
        }, sectionRef);
        return () => ctx.revert();
    }, [list]);

    return (
        <section
            ref={sectionRef}
            id="testimonials"
            className="relative py-24 md:py-32 lg:py-40 overflow-hidden"
            style={{ background: "var(--bg)" }}
        >
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "var(--border-hi)" }} />

            <div className="section-container">
                {/* Label */}
                <div className="flex items-center gap-4 mb-12">
                    <span className="text-caption" style={{ color: "var(--accent)" }}>05</span>
                    <span className="w-12 h-px" style={{ background: "var(--accent)" }} />
                    <span className="text-caption" style={{ color: "var(--color-muted-ash)" }}>Testimonials</span>
                </div>

                {/* Heading */}
                <div ref={headingRef} className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
                    <div>
                        <h2 className="text-heading-lg mb-4 flex items-center gap-4" style={{ color: "var(--fg)" }}>
                            <span>
                                What People<br />
                                <span style={{ color: "var(--accent)" }}>Say</span>
                            </span>
                            <FeedbackBubble size={56} />
                        </h2>
                        <p className="text-body max-w-sm" style={{ color: "var(--color-muted-ash)" }}>
                            Don&apos;t just take my word for it.
                        </p>
                    </div>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="btn-ghost-primary group flex items-center gap-3 px-6 py-3 font-medium text-sm tracking-wide self-start sm:self-auto"
                    >
                        {showForm ? "Close" : "Leave a Review"}
                        <svg
                            className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45"
                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    </button>
                </div>

                {/* Form */}
                {showForm && (
                    <div
                        className="mb-16 p-8 md:p-10 animate-slideUp"
                        style={{ border: "1px solid var(--border-hi)" }}
                    >
                        <h3 className="text-subheading mb-8" style={{ color: "var(--fg)" }}>Share Your Experience</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {["name", "role"].map((field) => (
                                    <div key={field} className="relative group" style={{ borderBottom: "1px solid var(--border-hi)" }}>
                                        <input
                                            type="text"
                                            name={field}
                                            aria-label={field === "name" ? "Your Name" : "Your Role or Company"}
                                            value={formData[field as "name" | "role"]}
                                            onChange={(e) => setFormData((p) => ({ ...p, [field]: e.target.value }))}
                                            placeholder={field === "name" ? "Your Name" : "Your Role / Company"}
                                            required
                                            className="w-full bg-transparent py-3 text-body focus:outline-none placeholder:opacity-30"
                                            style={{ color: "var(--fg)" }}
                                        />
                                        <div
                                            className="absolute bottom-0 left-0 w-0 h-px group-focus-within:w-full"
                                            style={{ background: "var(--accent)", transition: "width 0.4s cubic-bezier(0.16,1,0.3,1) !important" }}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="relative group" style={{ borderBottom: "1px solid var(--border-hi)" }}>
                                <textarea
                                    name="message"
                                    aria-label="Your Testimonial Message"
                                    value={formData.message}
                                    onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                                    placeholder="Your testimonial"
                                    rows={4}
                                    required
                                    className="w-full bg-transparent py-3 text-body focus:outline-none placeholder:opacity-30 resize-none"
                                    style={{ color: "var(--fg)" }}
                                />
                                <div
                                    className="absolute bottom-0 left-0 w-0 h-px group-focus-within:w-full"
                                    style={{ background: "var(--accent)", transition: "width 0.4s cubic-bezier(0.16,1,0.3,1) !important" }}
                                />
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-small" style={{ color: "var(--color-muted-ash)" }}>Rating:</span>
                                <select
                                    name="rating"
                                    aria-label="Select Rating"
                                    value={formData.rating}
                                    onChange={(e) => setFormData((p) => ({ ...p, rating: Number(e.target.value) }))}
                                    className="bg-transparent text-small focus:outline-none"
                                    style={{ border: "1px solid var(--border-hi)", color: "var(--fg)", padding: "8px 12px" }}
                                >
                                    {[5, 4, 3, 2, 1].map((n) => (
                                        <option key={n} value={n} style={{ background: "var(--bg)" }}>
                                            {"★".repeat(n)} ({n} star{n > 1 ? "s" : ""})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button
                                type="submit"
                                disabled={status === "sending"}
                                className="btn-ghost-primary px-8 py-4 font-medium text-sm tracking-wide"
                                style={{
                                    borderColor: status === "success" ? "#22c55e" : status === "error" ? "#ef4444" : "var(--accent)",
                                    color: status === "success" ? "#22c55e" : status === "error" ? "#ef4444" : "var(--fg)",
                                    opacity: status === "sending" ? 0.7 : 1,
                                    cursor: status === "sending" ? "wait" : "pointer",
                                }}
                            >
                                {status === "sending" ? "Submitting…" : status === "success" ? "Submitted ✓" : status === "error" ? "Failed — Try Again" : "Submit"}
                            </button>
                        </form>
                    </div>
                )}

                {/* Grid */}
                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {loading ? (
                        <div className="col-span-full py-16 text-center">
                            <p className="text-body" style={{ color: "var(--color-muted-ash)" }}>Loading…</p>
                        </div>
                    ) : list.length === 0 ? (
                        <div className="col-span-full py-16 text-center">
                            <p className="text-body" style={{ color: "var(--color-muted-ash)" }}>
                                No testimonials yet. Be the first!
                            </p>
                        </div>
                    ) : (
                        list.slice(0, 4).map((t, i) => {
                            const text = t.message || t.text || "";
                            const key = t._id || t.id || i;
                            const avatar = t.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=2563eb&color=ffffff`;
                            return (
                                <div
                                    key={key}
                                    className="group p-6 md:p-8 card-callout"
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLElement).style.borderColor = "var(--border-hi)";
                                    }}
                                >
                                    {/* Stars */}
                                    <div className="flex gap-1 mb-5">
                                        {Array.from({ length: t.rating }).map((_, si) => (
                                            <svg key={si} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" style={{ color: "var(--accent)" }}>
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>

                                    {/* Quote */}
                                    <p className="text-body mb-6 leading-relaxed" style={{ color: "var(--color-muted-ash)" }}>
                                        &ldquo;{text}&rdquo;
                                    </p>

                                    {/* Author */}
                                    <div className="flex items-center gap-3">
                                        <div className="relative w-10 h-10 overflow-hidden flex-shrink-0" style={{ border: "1px solid var(--border-hi)" }}>
                                            <Image src={avatar} alt={t.name} fill className="object-cover" sizes="40px" />
                                        </div>
                                        <div>
                                            <p className="text-small font-semibold" style={{ color: "var(--fg)" }}>{t.name}</p>
                                            <p className="text-mono" style={{ color: "var(--color-muted-ash)" }}>{t.role}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* See all */}
                {!loading && list.length > 4 && (
                    <div className="mt-12 text-center">
                        <Link
                            href="/testimonials"
                            className="btn-ghost-primary group inline-flex items-center gap-3 px-8 py-4 font-medium text-sm tracking-wide"
                        >
                            See All ({list.length})
                            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
