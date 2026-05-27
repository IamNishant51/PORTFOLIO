"use client";
import React from "react";
import { motion } from "framer-motion";

export default function ContourMap() {
    // Generate a few topographic/loss-landscape curves
    const paths = [
        "M 0 20 C 30 10, 60 40, 100 20",
        "M 0 40 C 40 20, 50 60, 100 40",
        "M 0 60 C 20 80, 80 40, 100 60",
        "M 0 80 C 50 90, 60 70, 100 80",
        "M 0 10 C 20 30, 80 5, 100 25",
        "M 0 90 C 30 80, 70 100, 100 85",
    ];

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-[0.07]">
            <svg 
                viewBox="0 0 100 100" 
                preserveAspectRatio="none" 
                className="w-full h-full"
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
            >
                {paths.map((d, i) => {
                    const cycleDuration = 12 + i * 3;
                    const floatDuration = 10 + i * 2.5;

                    return (
                        <g key={i}>
                            {/* Layer 1: Base Contour Line (Static/Gently Floating) */}
                            <motion.path
                                d={d}
                                stroke="var(--border-hi)"
                                strokeWidth="0.15"
                                initial={{ pathLength: 0, opacity: 0 }}
                                whileInView={{ pathLength: 1, opacity: 0.35 }}
                                viewport={{ once: true, margin: "-50px" }}
                                animate={{
                                    y: [0, -3, 3, 0],
                                    scaleY: [1, 1.04, 0.96, 1]
                                }}
                                transition={{
                                    pathLength: { duration: 2.5, delay: i * 0.15, ease: "easeOut" },
                                    opacity: { duration: 1, delay: i * 0.15 },
                                    y: { duration: floatDuration, repeat: Infinity, ease: "easeInOut" },
                                    scaleY: { duration: floatDuration, repeat: Infinity, ease: "easeInOut" }
                                }}
                            />

                            {/* Layer 2: Glowing Flowing Pulse Line (Synced with Base) */}
                            <motion.path
                                d={d}
                                stroke="var(--accent)"
                                strokeWidth="0.25"
                                strokeDasharray="12 90" // Creates a neat sliding data packet
                                initial={{ pathLength: 0, opacity: 0 }}
                                whileInView={{ pathLength: 1, opacity: 0.75 }}
                                viewport={{ once: true, margin: "-50px" }}
                                animate={{
                                    y: [0, -3, 3, 0],
                                    scaleY: [1, 1.04, 0.96, 1],
                                    strokeDashoffset: [0, -102] // Continuous flow along the stroke
                                }}
                                transition={{
                                    pathLength: { duration: 2.5, delay: i * 0.15, ease: "easeOut" },
                                    opacity: { duration: 1, delay: i * 0.15 },
                                    y: { duration: floatDuration, repeat: Infinity, ease: "easeInOut" },
                                    scaleY: { duration: floatDuration, repeat: Infinity, ease: "easeInOut" },
                                    strokeDashoffset: { duration: cycleDuration, repeat: Infinity, ease: "linear" }
                                }}
                            />
                        </g>
                    );
                })}
            </svg>
        </div>
    );
}
