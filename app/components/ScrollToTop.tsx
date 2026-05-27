"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function ScrollToTop() {
    const [visible, setVisible] = useState(false);
    const btnRef = useRef<HTMLButtonElement>(null);
    const prevVisible = useRef(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 500);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    /* GSAP animate in/out */
    useEffect(() => {
        if (!btnRef.current) return;
        if (visible && !prevVisible.current) {
            gsap.fromTo(btnRef.current,
                { opacity: 0, y: 12, scale: 0.88 },
                { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.4)" }
            );
        } else if (!visible && prevVisible.current) {
            gsap.to(btnRef.current,
                { opacity: 0, y: 12, scale: 0.88, duration: 0.25, ease: "power2.in" }
            );
        }
        prevVisible.current = visible;
    }, [visible]);

    return (
        <button
            ref={btnRef}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 left-6 sm:bottom-8 sm:left-8 z-[9997] flex items-center justify-center group"
            style={{
                width: "44px",
                height: "44px",
                border: "1px solid var(--border-hi)",
                background: "var(--surface-2)",
                color: "var(--fg)",
                cursor: "pointer",
                opacity: 0,
                pointerEvents: visible ? "auto" : "none",
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
            <svg
                className="w-4 h-4"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
                style={{ transition: "transform 0.3s ease !important" }}
                aria-hidden="true"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
        </button>
    );
}
