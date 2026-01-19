"use client";
import React, { useState } from "react";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
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
        } catch (error) {
            setStatus("error");
            setTimeout(() => setStatus("idle"), 3000);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <section className="py-12 sm:py-16 md:py-24 lg:py-32 bg-black text-white relative z-10 mb-[50vh] px-4 sm:px-6 md:px-8 lg:px-16">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-24">
                    {/* Left Column - Heading */}
                    <div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold uppercase leading-[0.9] mb-4 sm:mb-6">Let's build<br /><span className="text-white/40">something great</span></h2>
                        <p className="text-xs sm:text-sm md:text-base opacity-50 max-w-sm">
                            Have a project in mind? I'd love to hear about it. Drop me a message and let's create something extraordinary together.
                        </p>
                    </div>

                    {/* Right Column - Form */}
                    <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 md:space-y-10">
                        <div className="relative border-b border-white/20 group">
                            <input
                                type="text"
                                name="name"
                                value={formData.name || ""}
                                onChange={handleChange}
                                placeholder="Your Name"
                                required
                                className="w-full bg-transparent py-3 sm:py-4 text-sm sm:text-base md:text-lg lg:text-xl focus:outline-none placeholder:text-white/30 transition-colors"
                            />
                            <div className="absolute bottom-0 left-0 w-0 h-px bg-[#CCFF00] transition-all duration-500 group-focus-within:w-full" />
                        </div>
                        <div className="relative border-b border-white/20 group">
                            <input
                                type="email"
                                name="email"
                                value={formData.email || ""}
                                onChange={handleChange}
                                placeholder="Your Email"
                                required
                                className="w-full bg-transparent py-3 sm:py-4 text-sm sm:text-base md:text-lg lg:text-xl focus:outline-none placeholder:text-white/30 transition-colors"
                            />
                            <div className="absolute bottom-0 left-0 w-0 h-px bg-[#CCFF00] transition-all duration-500 group-focus-within:w-full" />
                        </div>
                        <div className="relative border-b border-white/20 group">
                            <textarea
                                name="message"
                                value={formData.message || ""}
                                onChange={handleChange}
                                placeholder="Tell me about your project"
                                rows={3}
                                required
                                className="w-full bg-transparent py-3 sm:py-4 text-sm sm:text-base md:text-lg lg:text-xl focus:outline-none placeholder:text-white/30 resize-none transition-colors"
                            />
                            <div className="absolute bottom-0 left-0 w-0 h-px bg-[#CCFF00] transition-all duration-500 group-focus-within:w-full" />
                        </div>

                        <button
                            type="submit"
                            disabled={status === "sending"}
                            className={`
                                group relative w-full sm:w-auto px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-5 
                                border-2 rounded-full uppercase text-xs sm:text-sm md:text-base 
                                tracking-widest font-bold overflow-hidden
                                transition-all duration-500 active:scale-95
                                ${status === "sending" ? "bg-white text-black border-white cursor-wait" : ""}
                                ${status === "success" ? "bg-[#CCFF00] text-black border-[#CCFF00]" : ""}
                                ${status === "error" ? "bg-red-500 text-white border-red-500" : ""}
                                ${status === "idle" ? "bg-white text-black border-white" : ""}
                            `}
                        >
                            {/* Hover animation background */}
                            {status === "idle" && (
                                <>
                                    <div className="absolute inset-0 bg-[#CCFF00] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left -z-0 rounded-full"></div>
                                    <span className="absolute inset-0 bg-[#CCFF00] opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-10 rounded-full">
                                        <span className="text-black font-bold">Send Email</span>
                                    </span>
                                </>
                            )}

                            {/* Loading animation */}
                            {status === "sending" && (
                                <span className="absolute inset-0 flex items-center justify-center">
                                    <span className="flex gap-1">
                                        <span className="w-1.5 h-1.5 bg-black rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                                        <span className="w-1.5 h-1.5 bg-black rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                                        <span className="w-1.5 h-1.5 bg-black rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                                    </span>
                                </span>
                            )}

                            {/* Button text */}
                            <span className={`relative z-10 ${status === "sending" ? "invisible" : ""}`}>
                                {status === "success" ? "Email Sent ✓" : status === "error" ? "Failed. Try Again" : "Send Email"}
                            </span>
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
