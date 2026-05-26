"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

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

const Testimonials = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [testimonialsList, setTestimonialsList] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        role: "",
        message: "",
        rating: 5
    });
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

    // Fetch testimonials from database
    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const res = await fetch("/api/testimonial");
                if (res.ok) {
                    const data = await res.json();
                    setTestimonialsList(data);
                }
            } catch (error) {
                console.error("Failed to fetch testimonials:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");

        try {
            const res = await fetch("/api/testimonial", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                const data = await res.json();
                setStatus("success");

                const newTestimonial: Testimonial = {
                    _id: data.testimonial._id,
                    name: formData.name,
                    role: formData.role,
                    message: formData.message,
                    rating: Number(formData.rating)
                };
                setTestimonialsList(prev => [newTestimonial, ...prev]);

                setFormData({ name: "", role: "", message: "", rating: 5 });
                setTimeout(() => {
                    setStatus("idle");
                    setShowForm(false);
                }, 2000);
            } else {
                setStatus("error");
                setTimeout(() => setStatus("idle"), 3000);
            }
        } catch (error) {
            setStatus("error");
            setTimeout(() => setStatus("idle"), 3000);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <section
            ref={sectionRef}
            id="testimonials"
            className="py-16 sm:py-20 md:py-24 lg:py-32 bg-white text-black px-4 sm:px-6 md:px-8 lg:px-16"
            aria-label="Client Testimonials"
        >
            <div className="max-w-7xl mx-auto">
                <div className="mb-12 md:mb-16 lg:mb-20 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
                    <div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight mb-4">
                            What People Say
                        </h2>
                        <p className="text-sm md:text-base opacity-50 max-w-2xl">
                            Don't just take my word for it. Here's what clients and collaborators have to say about working with me.
                        </p>
                    </div>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="group relative px-6 py-3 bg-white text-black border-2 border-white font-bold uppercase text-sm tracking-wider whitespace-nowrap self-start sm:self-auto rounded-full overflow-hidden transition-all duration-500 active:scale-95"
                    >
                        <div className="absolute inset-0 bg-[black] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left -z-0 rounded-full"></div>
                        <span className="absolute inset-0 bg-[black] opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-10 rounded-full">
                            <span className="text-black font-bold">{showForm ? "Close Form" : "Leave Testimonial"}</span>
                        </span>
                        <span className="relative z-10">{showForm ? "Close Form" : "Leave Testimonial"}</span>
                    </button>
                </div>

                {showForm && (
                    <div className="mb-12 md:mb-16 p-6 md:p-8 lg:p-10 border-2 border-[black] bg-white">
                        <h3 className="text-2xl md:text-3xl font-bold uppercase mb-6">Share Your Experience</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="relative border-b border-black/20 group">
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Your Name"
                                        required
                                        className="w-full bg-transparent py-3 text-sm md:text-base border-0 focus:outline-none focus:ring-0 focus:border-0 placeholder:text-black/30 transition-colors"
                                        style={{ boxShadow: 'none' }}
                                    />
                                    <div className="absolute bottom-0 left-0 w-0 h-px bg-[black] transition-all duration-500 group-focus-within:w-full" />
                                </div>
                                <div className="relative border-b border-black/20 group">
                                    <input
                                        type="text"
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                        placeholder="Your Role/Company"
                                        required
                                        className="w-full bg-transparent py-3 text-sm md:text-base border-0 focus:outline-none focus:ring-0 focus:border-0 placeholder:text-black/30 transition-colors"
                                        style={{ boxShadow: 'none' }}
                                    />
                                    <div className="absolute bottom-0 left-0 w-0 h-px bg-[black] transition-all duration-500 group-focus-within:w-full" />
                                </div>
                            </div>
                            <div className="relative border-b border-black/20 group">
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Your Testimonial"
                                    rows={4}
                                    required
                                    className="w-full bg-transparent py-3 text-sm md:text-base border-0 focus:outline-none focus:ring-0 focus:border-0 placeholder:text-black/30 resize-none transition-colors"
                                    style={{ boxShadow: 'none' }}
                                />
                                <div className="absolute bottom-0 left-0 w-0 h-px bg-[black] transition-all duration-500 group-focus-within:w-full" />
                            </div>
                            <div className="flex items-center gap-4">
                                <label className="text-sm md:text-base font-medium">Rating:</label>
                                <select
                                    name="rating"
                                    value={formData.rating}
                                    onChange={handleChange}
                                    className="bg-transparent border-2 border-black/20 px-4 py-2 focus:border-[black] focus:outline-none focus:ring-0 transition-colors"
                                >
                                    <option value={5}>⭐⭐⭐⭐⭐ (5 stars)</option>
                                    <option value={4}>⭐⭐⭐⭐ (4 stars)</option>
                                    <option value={3}>⭐⭐⭐ (3 stars)</option>
                                    <option value={2}>⭐⭐ (2 stars)</option>
                                    <option value={1}>⭐ (1 star)</option>
                                </select>
                            </div>
                            <button
                                type="submit"
                                disabled={status === "sending"}
                                className={`px-8 py-3 font-bold uppercase text-sm tracking-wider transition-all duration-300 ${status === "sending" ? "bg-gray-400 cursor-wait" :
                                    status === "success" ? "bg-green-500" :
                                        status === "error" ? "bg-red-500" :
                                            "bg-[black] hover:bg-[#b3e600]"
                                    } text-black`}
                            >
                                {status === "sending" ? "Submitting..." :
                                    status === "success" ? "Submitted! ✓" :
                                        status === "error" ? "Failed. Try Again" :
                                            "Submit Testimonial"}
                            </button>
                        </form>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
                    {loading ? (
                        <div className="col-span-full text-center py-12">
                            <p className="text-lg opacity-50">Loading testimonials...</p>
                        </div>
                    ) : testimonialsList.length === 0 ? (
                        <div className="col-span-full text-center py-12">
                            <p className="text-lg opacity-50">No testimonials yet. Be the first to share your experience!</p>
                        </div>
                    ) : (
                        testimonialsList.slice(0, 4).map((testimonial, index) => {
                            const displayText = testimonial.message || testimonial.text || "";
                            const testimonialId = testimonial._id || testimonial.id || index;
                            const avatarImage = testimonial.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=CCFF00&color=000`;

                            return (
                                <div
                                    key={testimonialId}
                                    ref={(el) => { if (el) cardsRef.current[index] = el; }}
                                    className="group relative p-6 md:p-8 lg:p-10 border-2 border-black/10 hover:border-[black] transition-all duration-500 hover:shadow-2xl bg-white overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-r-[40px] border-t-[black] border-r-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

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

                                    <p className="text-sm md:text-base lg:text-lg leading-relaxed mb-6 opacity-80">
                                        "{displayText}"
                                    </p>

                                    <div className="flex items-center gap-4">
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
                                </div>
                            );
                        })
                    )}
                </div>

                {!loading && testimonialsList.length > 4 && (
                    <div className="mt-12 md:mt-16 text-center">
                        <Link
                            href="/testimonials"
                            className="group relative inline-block px-8 py-4 bg-white text-black border-2 border-white font-bold uppercase text-sm tracking-wider rounded-full overflow-hidden transition-all duration-500 active:scale-95"
                        >
                            <div className="absolute inset-0 bg-[black] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left -z-0 rounded-full"></div>
                            <span className="absolute inset-0 bg-[black] opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-10 rounded-full">
                                <span className="text-black font-bold">See All Testimonials ({testimonialsList.length})</span>
                            </span>
                            <span className="relative z-10">See All Testimonials ({testimonialsList.length})</span>
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Testimonials;
