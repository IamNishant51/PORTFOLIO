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

        const moveCursor = (e: MouseEvent) => {
            cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
        };

        const onHoverEnter = () => {
            cursor.style.transition = 'transform 0.3s ease';
            cursor.style.transform = `translate(${cursor.offsetLeft}px, ${cursor.offsetTop}px) translate(-50%, -50%) scale(4)`;
        };

        const onHoverLeave = () => {
            cursor.style.transition = 'transform 0.3s ease';
            const currentTransform = cursor.style.transform;
            const matches = currentTransform.match(/translate\(([^,]+),\s*([^)]+)\)/);
            if (matches) {
                cursor.style.transform = `translate(${matches[1]}, ${matches[2]}) translate(-50%, -50%) scale(1)`;
            }
        };

        window.addEventListener("mousemove", moveCursor);

        // Add hover listeners to clickable elements
        const clickables = document.querySelectorAll("a, button, input, textarea, .cursor-hover");
        clickables.forEach((el) => {
            el.addEventListener("mouseenter", onHoverEnter);
            el.addEventListener("mouseleave", onHoverLeave);
        });

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
