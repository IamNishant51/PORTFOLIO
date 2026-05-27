"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Filter, X } from "lucide-react";

interface Testimonial {
    _id?: string;
    id?: number;
    name: string;
    role: string;
    image?: string;
    text?: string;
    message?: string;
    rating: number;
    createdAt?: string;
}

export default function TestimonialsPage() {
    const [list, setList] = useState<Testimonial[]>([]);
    const [filtered, setFiltered] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [dateFilter, setDateFilter] = useState<"all" | "today" | "week" | "month" | "custom">("all");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [showFilter, setShowFilter] = useState(false);

    useEffect(() => {
        fetch("/api/testimonial")
            .then((r) => r.ok ? r.json() : [])
            .then((data) => { setList(data); setFiltered(data); })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (dateFilter === "all") { setFiltered(list); return; }
        const now = new Date();
        let result = [...list];
        if (dateFilter === "today") {
            result = list.filter((t) => t.createdAt && new Date(t.createdAt).toDateString() === now.toDateString());
        } else if (dateFilter === "week") {
            const ago = new Date(now.getTime() - 7 * 86400000);
            result = list.filter((t) => t.createdAt && new Date(t.createdAt) >= ago);
        } else if (dateFilter === "month") {
            const ago = new Date(now.getTime() - 30 * 86400000);
            result = list.filter((t) => t.createdAt && new Date(t.createdAt) >= ago);
        } else if (dateFilter === "custom" && startDate && endDate) {
            const s = new Date(startDate);
            const e = new Date(endDate); e.setHours(23, 59, 59, 999);
            result = list.filter((t) => t.createdAt && new Date(t.createdAt) >= s && new Date(t.createdAt) <= e);
        }
        setFiltered(result);
    }, [dateFilter, startDate, endDate, list]);

    const fmt = (d?: string) =>
        d ? new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "Recently";

    const FILTER_OPTS = [
        { key: "all", label: "All Time" },
        { key: "today", label: "Today" },
        { key: "week", label: "Last 7 Days" },
        { key: "month", label: "Last 30 Days" },
        { key: "custom", label: "Custom Range" },
    ] as const;

    return (
        <main className="min-h-screen" style={{ background: "var(--bg)", color: "var(--fg)" }}>
            {/* Header */}
            <section
                className="pt-24 md:pt-32 pb-16 md:pb-20"
                style={{ borderBottom: "1px solid var(--border)" }}
            >
                <div className="section-container">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 mb-10 text-mono"
                        style={{ color: "rgba(240,237,230,0.4)" }}
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>

                    <div className="flex items-center gap-4 mb-8">
                        <span className="text-mono" style={{ color: "var(--accent)" }}>Testimonials</span>
                        <span className="w-8 h-px" style={{ background: "var(--accent)" }} />
                    </div>

                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                        <div>
                            <h1 className="text-h1 mb-4" style={{ color: "var(--fg)" }}>
                                All <span style={{ color: "var(--accent)" }}>Reviews</span>
                            </h1>
                            <p className="text-body" style={{ color: "rgba(240,237,230,0.4)" }}>
                                {filtered.length} {filtered.length === 1 ? "testimonial" : "testimonials"}
                                {dateFilter !== "all" && " in selected range"}
                            </p>
                        </div>

                        <button
                            onClick={() => setShowFilter(!showFilter)}
                            className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-sm uppercase tracking-widest self-start lg:self-auto"
                            style={{
                                border: "1px solid var(--border-hi)",
                                color: showFilter ? "var(--accent)" : "var(--fg)",
                            }}
                        >
                            <Filter className="w-4 h-4" />
                            Filter by Date
                        </button>
                    </div>

                    {/* Filter panel */}
                    {showFilter && (
                        <div
                            className="mt-8 p-6 md:p-8 relative animate-slideUp"
                            style={{ border: "1px solid var(--border-hi)", background: "rgba(240,237,230,0.02)" }}
                        >
                            <button
                                onClick={() => setShowFilter(false)}
                                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center"
                                style={{ border: "1px solid var(--border-mid)", color: "var(--fg)" }}
                            >
                                <X className="w-4 h-4" />
                            </button>

                            <h3 className="text-h3 mb-6 flex items-center gap-2" style={{ color: "var(--fg)" }}>
                                <Calendar className="w-5 h-5" style={{ color: "var(--accent)" }} />
                                Filter by Date
                            </h3>

                            <div className="flex flex-wrap gap-3 mb-6">
                                {FILTER_OPTS.map(({ key, label }) => (
                                    <button
                                        key={key}
                                        onClick={() => setDateFilter(key)}
                                        className="px-4 py-2 text-mono"
                                        style={{
                                            background: dateFilter === key ? "var(--accent)" : "transparent",
                                            color: dateFilter === key ? "#000" : "rgba(240,237,230,0.5)",
                                            border: "1px solid",
                                            borderColor: dateFilter === key ? "var(--accent)" : "var(--border-mid)",
                                        }}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>

                            {dateFilter === "custom" && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4" style={{ borderTop: "1px solid var(--border)" }}>
                                    {[
                                        { label: "Start Date", val: startDate, set: setStartDate },
                                        { label: "End Date", val: endDate, set: setEndDate },
                                    ].map(({ label, val, set }) => (
                                        <div key={label}>
                                            <label className="text-mono block mb-2" style={{ color: "rgba(240,237,230,0.4)" }}>{label}</label>
                                            <input
                                                type="date"
                                                value={val}
                                                onChange={(e) => set(e.target.value)}
                                                className="w-full bg-transparent py-3 px-4 text-body focus:outline-none"
                                                style={{
                                                    border: "1px solid var(--border-mid)",
                                                    color: "var(--fg)",
                                                    colorScheme: "dark",
                                                }}
                                            />
                                        </div>
                                    ))}
                                    {(startDate || endDate) && (
                                        <button
                                            onClick={() => { setStartDate(""); setEndDate(""); setDateFilter("all"); }}
                                            className="text-small"
                                            style={{ color: "var(--ember,#FF4D1C)" }}
                                        >
                                            Clear dates
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>

            {/* Grid */}
            <section className="py-16 md:py-24">
                <div className="section-container">
                    {loading ? (
                        <div className="text-center py-20">
                            <div
                                className="inline-block w-12 h-12 border-2 border-t-transparent animate-spin mb-4"
                                style={{ borderColor: "var(--accent)", borderTopColor: "transparent", borderRadius: "50%" }}
                            />
                            <p className="text-body" style={{ color: "rgba(240,237,230,0.3)" }}>Loading…</p>
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-body mb-6" style={{ color: "rgba(240,237,230,0.4)" }}>
                                {dateFilter === "all" ? "No testimonials yet." : "No testimonials in this range."}
                            </p>
                            {dateFilter !== "all" && (
                                <button
                                    onClick={() => setDateFilter("all")}
                                    className="px-8 py-4 font-bold text-sm uppercase tracking-widest"
                                    style={{ background: "var(--accent)", color: "#000" }}
                                >
                                    Show All
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                            {filtered.map((t, i) => {
                                const text = t.message || t.text || "";
                                const key = t._id || t.id || i;
                                const avatar = t.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=2563eb&color=fff`;
                                return (
                                    <div
                                        key={key}
                                        className="group p-6 md:p-8"
                                        style={{
                                            border: "1px solid var(--border)",
                                            background: "rgba(240,237,230,0.02)",
                                            transition: "border-color 0.3s ease, background 0.3s ease !important",
                                        }}
                                        onMouseEnter={(e) => {
                                            (e.currentTarget as HTMLElement).style.borderColor = "var(--border-hi)";
                                            (e.currentTarget as HTMLElement).style.background = "rgba(240,237,230,0.04)";
                                        }}
                                        onMouseLeave={(e) => {
                                            (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                                            (e.currentTarget as HTMLElement).style.background = "rgba(240,237,230,0.02)";
                                        }}
                                    >
                                        {/* Stars */}
                                        <div className="flex gap-1 mb-4">
                                            {Array.from({ length: t.rating }).map((_, si) => (
                                                <svg key={si} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" style={{ color: "var(--accent)" }}>
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>

                                        <p className="text-body mb-6 leading-relaxed" style={{ color: "rgba(240,237,230,0.65)" }}>
                                            "{text}"
                                        </p>

                                        <div className="flex items-center justify-between gap-4 flex-wrap">
                                            <div className="flex items-center gap-3">
                                                <div className="relative w-10 h-10 overflow-hidden flex-shrink-0" style={{ border: "1px solid var(--border-mid)" }}>
                                                    <Image src={avatar} alt={t.name} fill className="object-cover" sizes="40px" />
                                                </div>
                                                <div>
                                                    <p className="text-small font-semibold" style={{ color: "var(--fg)" }}>{t.name}</p>
                                                    <p className="text-mono" style={{ color: "rgba(240,237,230,0.35)" }}>{t.role}</p>
                                                </div>
                                            </div>
                                            <span className="text-mono" style={{ color: "rgba(240,237,230,0.25)" }}>{fmt(t.createdAt)}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
