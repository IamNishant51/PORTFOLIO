"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const touchRef = useRef(false);

    useEffect(() => {
        touchRef.current =
            "ontouchstart" in window ||
            navigator.maxTouchPoints > 0 ||
            window.matchMedia("(pointer: coarse)").matches;

        if (touchRef.current) return;

        const dot = dotRef.current;
        const ring = ringRef.current;
        if (!dot || !ring) return;

        /* Fast dot follows cursor exactly */
        const onMove = (e: MouseEvent) => {
            gsap.set(dot, { x: e.clientX, y: e.clientY });
            gsap.to(ring, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.18,
                ease: "power2.out",
            });
        };

        /* Hover expand */
        const onEnter = () => {
            gsap.to(ring, { scale: 2.5, opacity: 0.6, duration: 0.3, ease: "power2.out" });
            gsap.to(dot, { scale: 0, opacity: 0, duration: 0.2 });
        };
        const onLeave = () => {
            gsap.to(ring, { scale: 1, opacity: 1, duration: 0.4, ease: "elastic.out(1,0.5)" });
            gsap.to(dot, { scale: 1, opacity: 1, duration: 0.3 });
        };

        window.addEventListener("mousemove", onMove);

        const clickables = document.querySelectorAll("a, button, input, textarea, [data-cursor]");
        clickables.forEach((el) => {
            el.addEventListener("mouseenter", onEnter);
            el.addEventListener("mouseleave", onLeave);
        });

        return () => {
            window.removeEventListener("mousemove", onMove);
            clickables.forEach((el) => {
                el.removeEventListener("mouseenter", onEnter);
                el.removeEventListener("mouseleave", onLeave);
            });
        };
    }, []);

    /* Hide on touch devices via CSS — no state needed */
    return (
        <>
            {/* Dot */}
            <div
                ref={dotRef}
                className="fixed top-0 left-0 w-2 h-2 pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2 hidden md:block"
                style={{ background: "var(--accent)", mixBlendMode: "difference" }}
            />
            {/* Ring */}
            <div
                ref={ringRef}
                className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[99998] -translate-x-1/2 -translate-y-1/2 hidden md:block"
                style={{
                    border: "1px solid var(--accent)",
                    borderRadius: "50%",
                    mixBlendMode: "difference",
                    opacity: 0.7,
                }}
            />
        </>
    );
}
