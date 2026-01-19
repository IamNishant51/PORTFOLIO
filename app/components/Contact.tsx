"use client";
import React, { useState } from "react";

const Contact = () => {
    const [status, setStatus] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("Sending...");

        // Example integration
        const res = await fetch("/api/contact", {
            method: "POST",
            body: JSON.stringify({}), // Logic to gather inputs
        });

        if (res.ok) setStatus("Message sent!");
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
                                placeholder="Your Name"
                                className="w-full bg-transparent py-3 sm:py-4 text-sm sm:text-base md:text-lg lg:text-xl focus:outline-none placeholder:text-white/30 transition-colors"
                            />
                            <div className="absolute bottom-0 left-0 w-0 h-px bg-[#CCFF00] transition-all duration-500 group-focus-within:w-full" />
                        </div>
                        <div className="relative border-b border-white/20 group">
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="w-full bg-transparent py-3 sm:py-4 text-sm sm:text-base md:text-lg lg:text-xl focus:outline-none placeholder:text-white/30 transition-colors"
                            />
                            <div className="absolute bottom-0 left-0 w-0 h-px bg-[#CCFF00] transition-all duration-500 group-focus-within:w-full" />
                        </div>
                        <div className="relative border-b border-white/20 group">
                            <textarea
                                placeholder="Tell me about your project"
                                rows={3}
                                className="w-full bg-transparent py-3 sm:py-4 text-sm sm:text-base md:text-lg lg:text-xl focus:outline-none placeholder:text-white/30 resize-none transition-colors"
                            />
                            <div className="absolute bottom-0 left-0 w-0 h-px bg-[#CCFF00] transition-all duration-500 group-focus-within:w-full" />
                        </div>

                        <button
                            type="submit"
                            className="w-full sm:w-auto px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-5 border border-white/50 rounded-full uppercase text-xs sm:text-sm md:text-base tracking-widest hover:bg-[#CCFF00] hover:text-black hover:border-[#CCFF00] transition-all duration-500 font-medium"
                        >
                            Send Message
                        </button>

                        {status && <p className="mt-3 sm:mt-4 text-xs sm:text-sm opacity-70">{status}</p>}
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
