"use client";
import React from "react";
import { motion } from "framer-motion";

export default function GitBranch({ size = 48 }: { size?: number }) {
    return (
        <div 
            className="flex items-center justify-center pointer-events-none select-none flex-shrink-0"
            style={{ width: `${size}px`, height: `${size}px` }}
        >
            <svg width="100%" height="100%" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                {/* Main git vertical branch line */}
                <path 
                    d="M 10 26 V 6" 
                    stroke="var(--fg)" strokeWidth="1.5" strokeLinecap="round" 
                />
                
                {/* Fork branch curve */}
                <path 
                    d="M 10 20 C 18 20, 22 17, 22 12 V 6" 
                    stroke="var(--fg)" strokeWidth="1.5" strokeLinecap="round" 
                />

                {/* Main branch trunk nodes */}
                <circle cx="10" cy="22" r="1.5" fill="var(--bg)" stroke="var(--fg)" strokeWidth="1.5" />
                <circle cx="10" cy="10" r="1.5" fill="var(--bg)" stroke="var(--fg)" strokeWidth="1.5" />

                {/* Sub branch active leaf node */}
                <motion.circle 
                    cx="22" cy="9" r="2.2" 
                    fill="var(--accent)"
                    animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Moving commit packet / dot */}
                <motion.circle 
                    cx="10" cy="20" r="1.2" 
                    fill="var(--accent)"
                    animate={{ 
                        cx: [10, 10, 16, 22, 22],
                        cy: [20, 20, 20, 14, 9],
                        opacity: [0, 1, 1, 1, 0]
                    }}
                    transition={{ 
                        duration: 3, 
                        repeat: Infinity, 
                        ease: "easeInOut",
                        times: [0, 0.15, 0.5, 0.8, 1]
                    }}
                />
            </svg>
        </div>
    );
}
