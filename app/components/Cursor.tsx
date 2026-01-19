"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Cursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        // Check if it's a touch device
        const checkTouchDevice = () => {
            setIsTouchDevice(
                'ontouchstart' in window ||
                navigator.maxTouchPoints > 0 ||
                window.matchMedia('(pointer: coarse)').matches
            );
        };

        checkTouchDevice();

        // Also check on resize in case device orientation changes
        window.addEventListener('resize', checkTouchDevice);

        return () => window.removeEventListener('resize', checkTouchDevice);
    }, []);

    useEffect(() => {
        // Don't run cursor logic on touch devices
        if (isTouchDevice) return;

        const cursor = cursorRef.current;
        if (!cursor) return;

        // Center cursor on mouse
        gsap.set(cursor, { xPercent: -50, yPercent: -50 });

        const moveCursor = (e: MouseEvent) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1, // Slight lag for fluid heavy feel
                ease: "power2.out"
            });
        };

        const onHoverEnter = () => {
            gsap.to(cursor, { scale: 4, duration: 0.3 });
        };

        const onHoverLeave = () => {
            gsap.to(cursor, { scale: 1, duration: 0.3 });
        };

        window.addEventListener("mousemove", moveCursor);

        // Add hover listeners to clickable elements
        // This is a global listener approach
        const clickables = document.querySelectorAll("a, button, input, textarea, .cursor-hover");
        clickables.forEach((el) => {
            el.addEventListener("mouseenter", onHoverEnter);
            el.addEventListener("mouseleave", onHoverLeave);
        });

        // MutationObserver to attach to new elements? 
        // For simplicity, we just attach to existing. 
        // In a real SPA, we might need a context or use delegate event listeners.

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            clickables.forEach((el) => {
                el.removeEventListener("mouseenter", onHoverEnter);
                el.removeEventListener("mouseleave", onHoverLeave);
            });
        };
    }, [isTouchDevice]);

    // Don't render cursor on touch devices
    if (isTouchDevice) return null;

    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        />
    );
};

export default Cursor;
