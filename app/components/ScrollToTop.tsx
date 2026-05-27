"use client";
import { useEffect, useState } from "react";

export default function ScrollToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 500);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    if (!visible) return null;

    return (
        <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 left-6 sm:bottom-8 sm:left-8 z-[9997] w-12 h-12 flex items-center justify-center group"
            style={{
                border: "1px solid var(--border-hi)",
                background: "var(--void-2,#12121A)",
                color: "var(--fg)",
            }}
            aria-label="Scroll to top"
            onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
                (e.currentTarget as HTMLElement).style.color = "var(--accent)";
            }}
            onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border-hi)";
                (e.currentTarget as HTMLElement).style.color = "var(--fg)";
            }}
        >
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
        </button>
    );
}
