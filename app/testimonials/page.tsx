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

const TestimonialsPage = () => {
    const [testimonialsList, setTestimonialsList] = useState<Testimonial[]>([]);
    const [filteredTestimonials, setFilteredTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [dateFilter, setDateFilter] = useState<"all" | "today" | "week" | "month" | "custom">("all");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [showFilterMenu, setShowFilterMenu] = useState(false);

    // Fetch testimonials from database
    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const res = await fetch("/api/testimonial");
                if (res.ok) {
                    const data = await res.json();
                    setTestimonialsList(data);
                    setFilteredTestimonials(data);
                }
            } catch (error) {
                console.error("Failed to fetch testimonials:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    // Apply date filter
    useEffect(() => {
        if (dateFilter === "all") {
            setFilteredTestimonials(testimonialsList);
            return;
        }

        const now = new Date();
        let filtered = [...testimonialsList];

        switch (dateFilter) {
            case "today":
                filtered = testimonialsList.filter(t => {
                    if (!t.createdAt) return false;
                    const date = new Date(t.createdAt);
                    return date.toDateString() === now.toDateString();
                });
                break;

            case "week":
                const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                filtered = testimonialsList.filter(t => {
                    if (!t.createdAt) return false;
                    const date = new Date(t.createdAt);
                    return date >= weekAgo;
                });
                break;

            case "month":
                const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                filtered = testimonialsList.filter(t => {
                    if (!t.createdAt) return false;
                    const date = new Date(t.createdAt);
                    return date >= monthAgo;
                });
                break;

            case "custom":
                if (startDate && endDate) {
                    const start = new Date(startDate);
                    const end = new Date(endDate);
                    end.setHours(23, 59, 59, 999);
                    filtered = testimonialsList.filter(t => {
                        if (!t.createdAt) return false;
                        const date = new Date(t.createdAt);
                        return date >= start && date <= end;
                    });
                }
                break;
        }

        setFilteredTestimonials(filtered);
    }, [dateFilter, startDate, endDate, testimonialsList]);

    const formatDate = (dateString?: string) => {
        if (!dateString) return "Recently";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
        });
    };

    const clearCustomDates = () => {
        setStartDate("");
        setEndDate("");
        setDateFilter("all");
    };

    return (
        <main className="min-h-screen bg-white text-black">
            {/* Header */}
            <section className="py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 lg:px-16 border-b border-black/10">
                <div className="max-w-7xl mx-auto">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 mb-8 text-sm md:text-base opacity-60 hover:opacity-100 transition-opacity"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>

                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6 lg:gap-8">
                        <div>
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight mb-4">
                                All Testimonials
                            </h1>
                            <p className="text-sm md:text-base lg:text-lg opacity-50 max-w-2xl">
                                Read what clients and collaborators have to say about working with me.
                                {filteredTestimonials.length > 0 && ` Showing ${filteredTestimonials.length} ${filteredTestimonials.length === 1 ? 'testimonial' : 'testimonials'}.`}
                            </p>
                        </div>

                        {/* Filter Button */}
                        <button
                            onClick={() => setShowFilterMenu(!showFilterMenu)}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[black] text-black font-bold uppercase text-sm tracking-wider hover:bg-[black] transition-all duration-300 self-start lg:self-auto"
                        >
                            <Filter className="w-4 h-4" />
                            Filter by Date
                        </button>
                    </div>

                    {/* Filter Menu */}
                    {showFilterMenu && (
                        <div className="mt-8 p-6 md:p-8 border-2 border-[black] bg-white relative">
                            <button
                                onClick={() => setShowFilterMenu(false)}
                                className="absolute top-4 right-4 p-2 hover:bg-black/5 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <h3 className="text-xl md:text-2xl font-bold uppercase mb-6 flex items-center gap-2">
                                <Calendar className="w-5 h-5" />
                                Filter by Date
                            </h3>

                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
                                <button
                                    onClick={() => setDateFilter("all")}
                                    className={`px-4 py-3 text-sm font-medium uppercase tracking-wider transition-all duration-300 ${dateFilter === "all"
                                            ? "bg-[black] text-black"
                                            : "border-2 border-black/20 hover:border-[black]"
                                        }`}
                                >
                                    All Time
                                </button>
                                <button
                                    onClick={() => setDateFilter("today")}
                                    className={`px-4 py-3 text-sm font-medium uppercase tracking-wider transition-all duration-300 ${dateFilter === "today"
                                            ? "bg-[black] text-black"
                                            : "border-2 border-black/20 hover:border-[black]"
                                        }`}
                                >
                                    Today
                                </button>
                                <button
                                    onClick={() => setDateFilter("week")}
                                    className={`px-4 py-3 text-sm font-medium uppercase tracking-wider transition-all duration-300 ${dateFilter === "week"
                                            ? "bg-[black] text-black"
                                            : "border-2 border-black/20 hover:border-[black]"
                                        }`}
                                >
                                    Last 7 Days
                                </button>
                                <button
                                    onClick={() => setDateFilter("month")}
                                    className={`px-4 py-3 text-sm font-medium uppercase tracking-wider transition-all duration-300 ${dateFilter === "month"
                                            ? "bg-[black] text-black"
                                            : "border-2 border-black/20 hover:border-[black]"
                                        }`}
                                >
                                    Last 30 Days
                                </button>
                                <button
                                    onClick={() => setDateFilter("custom")}
                                    className={`px-4 py-3 text-sm font-medium uppercase tracking-wider transition-all duration-300 ${dateFilter === "custom"
                                            ? "bg-[black] text-black"
                                            : "border-2 border-black/20 hover:border-[black]"
                                        }`}
                                >
                                    Custom Range
                                </button>
                            </div>

                            {/* Custom Date Range */}
                            {dateFilter === "custom" && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-black/10">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Start Date</label>
                                        <input
                                            type="date"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                            className="w-full bg-transparent border-2 border-black/20 px-4 py-3 focus:border-[black] focus:outline-none transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">End Date</label>
                                        <input
                                            type="date"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            className="w-full bg-transparent border-2 border-black/20 px-4 py-3 focus:border-[black] focus:outline-none transition-colors"
                                        />
                                    </div>
                                    {(startDate || endDate) && (
                                        <button
                                            onClick={clearCustomDates}
                                            className="sm:col-span-2 px-4 py-2 text-sm text-red-600 hover:underline"
                                        >
                                            Clear Custom Dates
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>

            {/* Testimonials Grid */}
            <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 lg:px-16">
                <div className="max-w-7xl mx-auto">
                    {loading ? (
                        <div className="text-center py-20">
                            <div className="inline-block w-16 h-16 border-4 border-[black] border-t-transparent rounded-full animate-spin mb-4"></div>
                            <p className="text-lg opacity-50">Loading testimonials...</p>
                        </div>
                    ) : filteredTestimonials.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-xl md:text-2xl opacity-50 mb-4">
                                {dateFilter === "all"
                                    ? "No testimonials yet."
                                    : "No testimonials found for the selected date range."}
                            </p>
                            {dateFilter !== "all" && (
                                <button
                                    onClick={() => setDateFilter("all")}
                                    className="mt-4 px-6 py-3 bg-[black] text-black font-bold uppercase text-sm tracking-wider hover:bg-[black] transition-all duration-300"
                                >
                                    Show All Testimonials
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {filteredTestimonials.map((testimonial, index) => {
                                const displayText = testimonial.message || testimonial.text || "";
                                const testimonialId = testimonial._id || testimonial.id || index;
                                const avatarImage = testimonial.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=CCFF00&color=000`;

                                return (
                                    <div
                                        key={testimonialId}
                                        className="group relative p-6 md:p-8 border-2 border-black/10 hover:border-[black] transition-all duration-500 hover:shadow-2xl bg-white overflow-hidden"
                                    >
                                        <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-r-[40px] border-t-[black] border-r-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                        {/* Rating */}
                                        <div className="flex gap-1 mb-4">
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <svg
                                                    key={i}
                                                    className="w-5 h-5 text-[black]"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>

                                        {/* Testimonial Text */}
                                        <p className="text-sm md:text-base leading-relaxed mb-6 opacity-80">
                                            "{displayText}"
                                        </p>

                                        {/* Author Info */}
                                        <div className="flex items-center justify-between gap-4 flex-wrap">
                                            <div className="flex items-center gap-3">
                                                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[black]">
                                                    <Image
                                                        src={avatarImage}
                                                        alt={`${testimonial.name} testimonial`}
                                                        fill
                                                        className="object-cover"
                                                        sizes="48px"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-sm md:text-base">{testimonial.name}</p>
                                                    <p className="text-xs md:text-sm opacity-50">{testimonial.role}</p>
                                                </div>
                                            </div>

                                            {/* Date */}
                                            <div className="text-xs opacity-40">
                                                {formatDate(testimonial.createdAt)}
                                            </div>
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
};

export default TestimonialsPage;
