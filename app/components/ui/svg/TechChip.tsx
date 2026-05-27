"use client";
import React from "react";
import { motion } from "framer-motion";

export default function TechChip({ size = 48 }: { size?: number }) {
    return (
        <div 
            className="flex items-center justify-center pointer-events-none select-none flex-shrink-0"
            style={{ width: `${size}px`, height: `${size}px` }}
        >
            <svg width="100%" height="100%" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                {/* Outer pin paths */}
                <path d="M 5 11 H 9 M 5 16 H 9 M 5 21 H 9" stroke="var(--border-hi)" strokeWidth="1" strokeLinecap="round" />
                <path d="M 23 11 H 27 M 23 16 H 27 M 23 21 H 27" stroke="var(--border-hi)" strokeWidth="1" strokeLinecap="round" />
                <path d="M 11 5 V 9 M 16 5 V 9 M 21 5 V 9" stroke="var(--border-hi)" strokeWidth="1" strokeLinecap="round" />
                <path d="M 11 23 V 27 M 16 23 V 27 M 21 23 V 27" stroke="var(--border-hi)" strokeWidth="1" strokeLinecap="round" />

                {/* Main silicon carrier base */}
                <rect x="9" y="9" width="14" height="14" stroke="var(--fg)" strokeWidth="1.5" />

                {/* Central CPU Core (pulses) */}
                <motion.rect 
                    x="13" y="13" width="6" height="6" 
                    fill="var(--accent)"
                    animate={{ opacity: [0.3, 0.9, 0.3], scale: [0.95, 1.05, 0.95] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                    style={{ originX: "16px", originY: "16px" }}
                />

                {/* Signals sliding outwards along the pins */}
                <motion.circle 
                    cx="9" cy="16" r="0.65" 
                    fill="var(--accent)"
                    animate={{ cx: [9, 4], opacity: [1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                />
                <motion.circle 
                    cx="23" cy="16" r="0.65" 
                    fill="var(--accent)"
                    animate={{ cx: [23, 28], opacity: [1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
                />
                <motion.circle 
                    cx="16" cy="9" r="0.65" 
                    fill="var(--accent)"
                    animate={{ cy: [9, 4], opacity: [1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.25 }}
                />
                <motion.circle 
                    cx="16" cy="23" r="0.65" 
                    fill="var(--accent)"
                    animate={{ cy: [23, 28], opacity: [1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.75 }}
                />
            </svg>
        </div>
    );
}
