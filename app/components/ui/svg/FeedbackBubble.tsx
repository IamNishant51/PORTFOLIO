"use client";
import React from "react";
import { motion } from "framer-motion";

export default function FeedbackBubble({ size = 48 }: { size?: number }) {
    return (
        <div 
            className="flex items-center justify-center pointer-events-none select-none flex-shrink-0"
            style={{ width: `${size}px`, height: `${size}px` }}
        >
            <svg width="100%" height="100%" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                {/* Speech Bubble outline */}
                <path 
                    d="M 6 8 H 26 V 22 H 18 L 12 27 V 22 H 6 Z" 
                    stroke="var(--fg)" strokeWidth="1.5" strokeLinejoin="round" 
                />

                {/* Oscillating soundwave bars inside the bubble */}
                <g style={{ transform: "translate(0, 15px)" }}>
                    {/* Bar 1 */}
                    <motion.line 
                        x1="10" x2="10" 
                        y1="-3" y2="3" 
                        stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round"
                        animate={{ scaleY: [0.5, 1.6, 0.5] }}
                        transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
                    />
                    
                    {/* Bar 2 */}
                    <motion.line 
                        x1="16" x2="16" 
                        y1="-5" y2="5" 
                        stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round"
                        animate={{ scaleY: [1.4, 0.6, 1.4] }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                    />
                    
                    {/* Bar 3 */}
                    <motion.line 
                        x1="22" x2="22" 
                        y1="-3" y2="3" 
                        stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round"
                        animate={{ scaleY: [0.6, 1.7, 0.6] }}
                        transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
                    />
                </g>
            </svg>
        </div>
    );
}
