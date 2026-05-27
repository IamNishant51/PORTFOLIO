"use client";
import React, { useState } from "react";
import { Home, Briefcase, Target, MessageSquare, Mail } from "lucide-react";

const ITEMS = [
    { Icon: Home, label: "Home", action: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
    { Icon: Briefcase, label: "Projects", action: () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }) },
    { Icon: Target, label: "Skills", action: () => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" }) },
    { Icon: MessageSquare, label: "Testimonials", action: () => document.getElementById("testimonials")?.scrollIntoView({ behavior: "smooth" }) },
    { Icon: Mail, label: "Contact", action: () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }) },
];

export default function FloatingMenu() {
    const [open, setOpen] = useState(false);

    return (
        <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[9997]">
            {/* Items */}
            <div className="relative">
                {ITEMS.map(({ Icon, label, action }, i) => (
                    <button
                        key={label}
                        onClick={() => { action(); setOpen(false); }}
                        className="absolute bottom-0 right-0 w-11 h-11 flex items-center justify-center group"
                        style={{
                            border: "1px solid var(--border-hi)",
                            background: "var(--void-2,#12121A)",
                            color: "var(--fg)",
                            transform: open ? `translateY(-${(i + 1) * 52}px)` : "translateY(0)",
                            opacity: open ? 1 : 0,
                            pointerEvents: open ? "auto" : "none",
                            transitionProperty: "transform, opacity, background-color, border-color !important",
                            transitionDuration: "300ms !important",
                            transitionDelay: open ? `${i * 40}ms` : "0ms",
                        }}
                        aria-label={label}
                        title={label}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
                            (e.currentTarget as HTMLElement).style.color = "var(--accent)";
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.borderColor = "var(--border-hi)";
                            (e.currentTarget as HTMLElement).style.color = "var(--fg)";
                        }}
                    >
                        <Icon className="w-4 h-4" />
                        {/* Tooltip */}
                        <span
                            className="absolute right-14 px-3 py-1 text-mono whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100"
                            style={{
                                background: "var(--void-2,#12121A)",
                                border: "1px solid var(--border-hi)",
                                color: "var(--fg)",
                                transition: "opacity 0.2s ease !important",
                            }}
                        >
                            {label}
                        </span>
                    </button>
                ))}
            </div>

            {/* Toggle */}
            <button
                onClick={() => setOpen((v) => !v)}
                className="relative w-12 h-12 flex items-center justify-center"
                style={{
                    background: open ? "var(--accent)" : "var(--void-2,#12121A)",
                    border: "1px solid",
                    borderColor: open ? "var(--accent)" : "var(--border-hi)",
                    color: open ? "#000" : "var(--fg)",
                    transition: "background 0.3s ease, border-color 0.3s ease, color 0.3s ease !important",
                }}
                aria-label="Toggle navigation menu"
            >
                <span
                    className="absolute w-5 h-px"
                    style={{
                        background: "currentColor",
                        transform: open ? "rotate(45deg)" : "translateY(-5px)",
                        transition: "transform 0.3s ease !important",
                    }}
                />
                <span
                    className="absolute w-5 h-px"
                    style={{
                        background: "currentColor",
                        opacity: open ? 0 : 1,
                        transition: "opacity 0.2s ease !important",
                    }}
                />
                <span
                    className="absolute w-5 h-px"
                    style={{
                        background: "currentColor",
                        transform: open ? "rotate(-45deg)" : "translateY(5px)",
                        transition: "transform 0.3s ease !important",
                    }}
                />
            </button>
        </div>
    );
}
