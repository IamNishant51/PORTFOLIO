"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLSpanElement>(null);
    const touchRef = useRef(false);

    useEffect(() => {
        // Detect touch devices
        touchRef.current =
            "ontouchstart" in window ||
            navigator.maxTouchPoints > 0 ||
            window.matchMedia("(pointer: coarse)").matches;

        if (touchRef.current) return;

        const dot = dotRef.current;
        const ring = ringRef.current;
        const label = labelRef.current;
        if (!dot || !ring) return;

        // Position initial state off-screen
        gsap.set([dot, ring], { xPercent: -50, yPercent: -50, x: -100, y: -100 });

        /* Smooth mouse movement tracking */
        const onMove = (e: MouseEvent) => {
            gsap.set(dot, { x: e.clientX, y: e.clientY });
            gsap.to(ring, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.3,
                ease: "power3.out",
            });
        };

        /* Event delegation for hover states (supports lazy-loaded elements) */
        const onMouseOver = (e: MouseEvent) => {
            const target = (e.target as HTMLElement).closest("a, button, input, textarea, select, [data-cursor], [role='button']");
            if (target) {
                const cursorType = target.getAttribute("data-cursor");
                
                if (cursorType === "view") {
                    // Project hover: Ring expands to a solid white badge, dot disappears, black label fades in
                    gsap.to(ring, {
                        width: "64px",
                        height: "64px",
                        backgroundColor: "rgba(255, 255, 255, 1)",
                        borderColor: "rgba(255, 255, 255, 0)",
                        opacity: 1,
                        duration: 0.3,
                        ease: "power2.out",
                    });
                    gsap.to(dot, {
                        scale: 0,
                        opacity: 0,
                        duration: 0.2,
                        ease: "power2.out",
                    });
                    if (label) {
                        gsap.to(label, {
                            opacity: 1,
                            scale: 1,
                            duration: 0.25,
                            ease: "power2.out",
                            delay: 0.05,
                        });
                    }
                } else {
                    // Standard clickable: Ring grows and fills with translucent white, dot scales up
                    gsap.to(ring, {
                        width: "52px",
                        height: "52px",
                        backgroundColor: "rgba(255, 255, 255, 0.14)",
                        borderColor: "rgba(255, 255, 255, 0.8)",
                        opacity: 1,
                        duration: 0.35,
                        ease: "power2.out",
                    });
                    gsap.to(dot, {
                        scale: 1.5,
                        duration: 0.25,
                        ease: "power2.out",
                    });
                }
            }
        };

        const onMouseOut = (e: MouseEvent) => {
            const target = (e.target as HTMLElement).closest("a, button, input, textarea, select, [data-cursor], [role='button']");
            if (target) {
                // Reset to default fine ring + dot state
                gsap.to(ring, {
                    width: "36px",
                    height: "36px",
                    backgroundColor: "rgba(255, 255, 255, 0)",
                    borderColor: "var(--accent)",
                    opacity: 0.7,
                    duration: 0.35,
                    ease: "power2.out",
                });
                gsap.to(dot, {
                    scale: 1,
                    opacity: 1,
                    duration: 0.3,
                    ease: "power2.out",
                });
                if (label) {
                    gsap.to(label, {
                        opacity: 0,
                        scale: 0.8,
                        duration: 0.2,
                        ease: "power2.in",
                    });
                }
            }
        };

        // Click active state shrink
        const onMouseDown = () => {
            gsap.to(ring, { scale: 0.8, duration: 0.15 });
            gsap.to(dot, { scale: 0.7, duration: 0.15 });
        };
        const onMouseUp = () => {
            gsap.to(ring, { scale: 1, duration: 0.2 });
            gsap.to(dot, { scale: 1, duration: 0.2 });
        };

        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseover", onMouseOver);
        window.addEventListener("mouseout", onMouseOut);
        window.addEventListener("mousedown", onMouseDown);
        window.addEventListener("mouseup", onMouseUp);

        return () => {
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseover", onMouseOver);
            window.removeEventListener("mouseout", onMouseOut);
            window.removeEventListener("mousedown", onMouseDown);
            window.removeEventListener("mouseup", onMouseUp);
        };
    }, []);

    return (
        <>
            {/* Fine Center Dot */}
            <div
                ref={dotRef}
                className="fixed top-0 left-0 w-1.5 h-1.5 pointer-events-none z-[99999] hidden md:block"
                style={{
                    background: "var(--accent)",
                    mixBlendMode: "difference",
                }}
            />
            {/* Interactive Outer Ring */}
            <div
                ref={ringRef}
                className="fixed top-0 left-0 w-9 h-9 pointer-events-none z-[99998] hidden md:block flex items-center justify-center overflow-hidden"
                style={{
                    border: "1px solid var(--accent)",
                    borderRadius: "50%",
                    mixBlendMode: "difference",
                    backgroundColor: "rgba(255, 255, 255, 0)",
                    opacity: 0.7,
                }}
            >
                {/* Monospace view label hidden inside the ring */}
                <span
                    ref={labelRef}
                    className="text-[9px] font-mono font-bold tracking-widest select-none pointer-events-none opacity-0 scale-90"
                    style={{
                        color: "#000",
                        lineHeight: 1,
                    }}
                >
                    VIEW
                </span>
            </div>
        </>
    );
}
