"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
    const [percentage, setPercentage] = useState(0);
    const containerRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();

        // Counter animation
        const interval = setInterval(() => {
            setPercentage((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                // Random increment for realistic 'loading' feel
                return prev + Math.floor(Math.random() * 10) + 1;
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (percentage === 100) {
            const tl = gsap.timeline({
                onComplete: onComplete,
            });

            // Curtain reveal effect
            tl.to(textRef.current, {
                opacity: 0,
                duration: 0.5,
            })
                .to(containerRef.current, {
                    y: "-100%",
                    duration: 1.5,
                    ease: "power4.inOut",
                });
        }
    }, [percentage, onComplete]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-50 flex items-end justify-end bg-black text-white p-6 md:p-10 font-bold"
        >
            <div className="absolute top-6 left-6 md:top-10 md:left-10">
                <span className="text-xs md:text-sm uppercase tracking-widest opacity-50">Loading</span>
            </div>
            <div ref={textRef} className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[-0.04em] font-black tabular-nums">
                {Math.min(percentage, 100)}%
            </div>
        </div>
    );
};

export default Preloader;
