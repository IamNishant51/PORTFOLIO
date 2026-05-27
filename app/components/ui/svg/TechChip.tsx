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
                {/* ── Top Block: UI / Frontend ── */}
                {/* Browser/Window container */}
                <rect x="5" y="4" width="22" height="6" stroke="var(--fg)" strokeWidth="1.5" strokeLinejoin="round" />
                {/* Window buttons */}
                <circle cx="8" cy="7" r="0.75" fill="var(--fg)" />
                <circle cx="11" cy="7" r="0.75" fill="var(--fg)" />
                {/* Code Tag inside browser window */}
                <motion.path 
                    d="M 17 6 L 19 7 L 17 8" 
                    stroke="var(--accent)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.path 
                    d="M 15 8 L 13 7 L 15 6" 
                    stroke="var(--accent)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* ── Connection Pipe 1 ── */}
                <path d="M 16 10 V 13" stroke="var(--border-hi)" strokeWidth="1" strokeDasharray="2 2" />

                {/* ── Middle Block: Logic / API Middleware ── */}
                <rect x="8" y="13" width="16" height="6" stroke="var(--fg)" strokeWidth="1.5" strokeLinejoin="round" />
                {/* Processing node */}
                <motion.circle 
                    cx="16" cy="16" r="1.5" 
                    fill="var(--accent)"
                    animate={{ scale: [0.8, 1.25, 0.8], opacity: [0.4, 0.95, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                {/* Left and right processing details */}
                <path d="M 11 16 H 13 M 19 16 H 21" stroke="var(--border-hi)" strokeWidth="1" strokeLinecap="round" />

                {/* ── Connection Pipe 2 ── */}
                <path d="M 16 19 V 22" stroke="var(--border-hi)" strokeWidth="1" strokeDasharray="2 2" />

                {/* ── Bottom Block: Database / Data Store ── */}
                {/* Cylinder 1 (top storage level) */}
                <path 
                    d="M 7 22 C 7 20.5, 25 20.5, 25 22 V 24.5 C 25 26, 7 26, 7 24.5 Z" 
                    stroke="var(--fg)" strokeWidth="1.5" strokeLinejoin="round" 
                />
                <path 
                    d="M 7 22 C 7 23.5, 25 23.5, 25 22" 
                    stroke="var(--fg)" strokeWidth="1.5" strokeLinejoin="round" 
                />
                {/* Cylinder 2 (bottom storage level, offset stacked) */}
                <path 
                    d="M 7 25 C 7 26.5, 25 26.5, 25 25 V 27.5 C 25 29, 7 29, 7 27.5 Z" 
                    stroke="var(--fg)" strokeWidth="1.5" strokeLinejoin="round" 
                />
                <path 
                    d="M 7 25 C 7 26.5, 25 26.5, 25 25" 
                    stroke="var(--fg)" strokeWidth="1.5" strokeLinejoin="round" 
                />

                {/* ── Animated Data Packets Flowing ── */}
                <motion.circle 
                    cx="16" cy="10" r="1" 
                    fill="var(--accent)"
                    animate={{ cy: [10, 22], opacity: [0.1, 0.9, 0.1] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
                />
            </svg>
        </div>
    );
}
