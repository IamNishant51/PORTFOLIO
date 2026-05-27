"use client";
import React from "react";
import { motion } from "framer-motion";

export default function CoffeeCup({ size = 48 }: { size?: number }) {
    return (
        <motion.div 
            className="flex items-center justify-center pointer-events-none select-none flex-shrink-0"
            style={{ width: `${size}px`, height: `${size}px` }}
            animate={{ rotate: [-1.5, 1.5, -1.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
            <svg width="100%" height="100%" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                {/* Steam trails */}
                <motion.path 
                    d="M 12 11 C 12 8, 14 8, 14 5" 
                    stroke="var(--accent)" strokeWidth="1" strokeLinecap="round"
                    animate={{ y: [1, -2, 1], opacity: [0.3, 0.9, 0.3] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.path 
                    d="M 16 11 C 16 8, 18 8, 18 5" 
                    stroke="var(--accent)" strokeWidth="1" strokeLinecap="round"
                    animate={{ y: [0, -3, 0], opacity: [0.2, 0.8, 0.2] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                />
                <motion.path 
                    d="M 20 11 C 20 8, 22 8, 22 5" 
                    stroke="var(--accent)" strokeWidth="1" strokeLinecap="round"
                    animate={{ y: [1.5, -1.5, 1.5], opacity: [0.3, 0.9, 0.3] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                />

                {/* Coffee Cup Body */}
                <path 
                    d="M 9 14 V 23 C 9 26, 23 26, 23 23 V 14 H 9 Z" 
                    stroke="var(--fg)" strokeWidth="1.5" strokeLinejoin="round" 
                />
                {/* Handle */}
                <path 
                    d="M 23 16 H 26 C 27.5 16, 27.5 21, 26 21 H 23" 
                    stroke="var(--fg)" strokeWidth="1.5" strokeLinecap="round" 
                />
                {/* Plate / Saucer */}
                <path 
                    d="M 7 27 H 25" 
                    stroke="var(--border-hi)" strokeWidth="1.5" strokeLinecap="round" 
                />
            </svg>
        </motion.div>
    );
}
