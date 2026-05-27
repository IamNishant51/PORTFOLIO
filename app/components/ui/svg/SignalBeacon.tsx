"use client";
import React from "react";
import { motion } from "framer-motion";

export default function SignalBeacon({ size = 48 }: { size?: number }) {
    return (
        <div 
            className="flex items-center justify-center pointer-events-none select-none flex-shrink-0"
            style={{ width: `${size}px`, height: `${size}px` }}
        >
            <svg width="100%" height="100%" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                {/* Antenna support base */}
                <path 
                    d="M 11 27 L 16 16 L 21 27 M 13 24 H 19" 
                    stroke="var(--fg)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" 
                />

                {/* Emitter tip node */}
                <motion.circle 
                    cx="16" cy="16" r="1.5" 
                    fill="var(--accent)"
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Expanding signal wave 1 */}
                <motion.path 
                    d="M 12 12 A 5.6 5.6 0 0 1 20 12" 
                    stroke="var(--accent)" strokeWidth="1" strokeLinecap="round"
                    animate={{ scale: [0.8, 1.3], opacity: [0.8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                    style={{ originX: "16px", originY: "16px" }}
                />

                {/* Expanding signal wave 2 (delayed) */}
                <motion.path 
                    d="M 8 8 A 11.3 11.3 0 0 1 24 8" 
                    stroke="var(--accent)" strokeWidth="1" strokeLinecap="round"
                    animate={{ scale: [0.8, 1.4], opacity: [0.6, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.8, ease: "easeOut" }}
                    style={{ originX: "16px", originY: "16px" }}
                />
            </svg>
        </div>
    );
}
