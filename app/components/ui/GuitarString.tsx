"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";

interface GuitarStringProps {
    index?: string | number;
    onClick?: () => void;
}

const FREQUENCIES = [
    164.81, // E3 - Hirajōshi / In scale
    174.61, // F3
    220.00, // A3
    246.94, // B3
    261.63, // C4
    329.63  // E4
];

let sharedAudioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (sharedAudioCtx) return sharedAudioCtx;
    const AudioContextClass = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return null;
    sharedAudioCtx = new AudioContextClass();
    return sharedAudioCtx;
}

export default function GuitarString({ index = 0, onClick }: GuitarStringProps) {
    const svgRef = useRef<SVGSVGElement>(null);
    const pathRef = useRef<SVGPathElement>(null);
    const tweenRef = useRef<gsap.core.Tween | null>(null);
    
    const lastXRef = useRef<number>(0);
    const lastYRef = useRef<number>(20);
    const isHoveredRef = useRef<boolean>(false);

    // Map the string index to a specific frequency in Japanese Pentatonic scale
    const idx = typeof index === "string" ? parseInt(index, 10) - 1 : index;
    const frequency = FREQUENCIES[idx % FREQUENCIES.length] || FREQUENCIES[0];

    const playPluckSound = async (freq: number) => {
        try {
            const ctx = getAudioContext();
            if (!ctx) return;

            // Use await to ensure the context is fully resumed before taking currentTime
            if (ctx.state === "suspended") {
                await ctx.resume();
            }

            const t = ctx.currentTime;
            
            // Oscillator 1: Triangle for the warm fundamental (string body)
            const osc = ctx.createOscillator();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, t);

            // Oscillator 2: Sawtooth for the sharp pluck and buzz (Shamisen sawari effect)
            const saw = ctx.createOscillator();
            saw.type = 'sawtooth';
            saw.frequency.setValueAtTime(freq, t);

            // Filter to simulate the acoustic body of a Koto/Shamisen
            const filter = ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(8000, t); // Bright pluck initially
            filter.frequency.exponentialRampToValueAtTime(400, t + 0.15); // Quickly lose high frequencies
            filter.frequency.linearRampToValueAtTime(100, t + 1.5); // Decay to a dull ring

            // Gain node for the master amplitude envelope
            const gainNode = ctx.createGain();
            gainNode.gain.setValueAtTime(0, t);
            gainNode.gain.linearRampToValueAtTime(0.8, t + 0.015); // Fast, loud, sharp attack
            gainNode.gain.exponentialRampToValueAtTime(0.15, t + 0.2); // Fast decay to a louder sustained level
            gainNode.gain.exponentialRampToValueAtTime(0.001, t + 1.5); // Slow release

            // Gain envelope specifically for the sawtooth (only loud at the very beginning)
            const sawGain = ctx.createGain();
            sawGain.gain.setValueAtTime(0.35, t); // Sharper and louder twang
            sawGain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);

            // Route audio
            saw.connect(sawGain);
            sawGain.connect(filter);
            
            osc.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(ctx.destination);

            osc.start(t);
            saw.start(t);
            
            osc.stop(t + 1.5);
            saw.stop(t + 1.5);

            // Cleanup to avoid memory leaks
            setTimeout(() => {
                try {
                    osc.disconnect();
                    saw.disconnect();
                    filter.disconnect();
                    gainNode.disconnect();
                    sawGain.disconnect();
                } catch (e) {
                    // Already disconnected
                }
            }, 1600);
        } catch (e) {
            console.warn("Pluck audio error:", e);
        }
    };

    const handleMouseMove = (e: React.MouseEvent<SVGRectElement>) => {
        if (!svgRef.current || !pathRef.current) return;
        
        if (tweenRef.current) {
            tweenRef.current.kill();
        }
        
        const rect = svgRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const clampedY = Math.max(2, Math.min(38, y));
        
        pathRef.current.setAttribute("d", `M 0 20 Q ${x} ${clampedY} ${rect.width} 20`);
        
        lastXRef.current = x;
        lastYRef.current = clampedY;
        isHoveredRef.current = true;
    };

    const handleMouseLeave = () => {
        if (!svgRef.current || !pathRef.current) return;
        
        const rect = svgRef.current.getBoundingClientRect();
        const width = rect.width;
        
        isHoveredRef.current = false;
        
        // Play Karplus-Strong string pluck sound!
        playPluckSound(frequency);
        
        const animObj = { x: lastXRef.current, y: lastYRef.current };
        
        tweenRef.current = gsap.to(animObj, {
            x: width / 2,
            y: 20,
            duration: 2.2,
            ease: "elastic.out(2.5, 0.12)",
            onUpdate: () => {
                if (isHoveredRef.current) return;
                if (pathRef.current) {
                    pathRef.current.setAttribute("d", `M 0 20 Q ${animObj.x} ${animObj.y} ${width} 20`);
                }
            }
        });
    };

    useEffect(() => {
        const handleResize = () => {
            if (svgRef.current && pathRef.current && !isHoveredRef.current) {
                const rect = svgRef.current.getBoundingClientRect();
                pathRef.current.setAttribute("d", `M 0 20 Q ${rect.width / 2} 20 ${rect.width} 20`);
            }
        };

        handleResize();
        const timer = setTimeout(handleResize, 100);
        
        window.addEventListener("resize", handleResize);
        return () => {
            clearTimeout(timer);
            window.removeEventListener("resize", handleResize);
            if (tweenRef.current) {
                tweenRef.current.kill();
            }
        };
    }, []);

    return (
        <svg
            ref={svgRef}
            className="absolute bottom-[-20px] left-0 w-full h-[40px] pointer-events-none z-20 overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* The visible interactive string line */}
            <path
                ref={pathRef}
                d="M 0 20 Q 0 20 0 20"
                stroke="var(--border-hi)"
                strokeWidth="1.5"
                fill="none"
                className="pointer-events-none transition-colors duration-300 group-hover:stroke-[var(--color-muted-ash)]"
            />
            {/* Transparent hover catcher overlay */}
            <rect
                width="100%"
                height="40"
                fill="transparent"
                className="pointer-events-auto cursor-pointer"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onTouchMove={(e) => {
                    const touch = e.touches[0];
                    if (!svgRef.current || !pathRef.current) return;
                    
                    if (tweenRef.current) tweenRef.current.kill();
                    
                    const rect = svgRef.current.getBoundingClientRect();
                    const x = touch.clientX - rect.left;
                    const y = touch.clientY - rect.top;
                    
                    const clampedY = Math.max(2, Math.min(38, y));
                    pathRef.current.setAttribute("d", `M 0 20 Q ${x} ${clampedY} ${rect.width} 20`);
                    
                    lastXRef.current = x;
                    lastYRef.current = clampedY;
                    isHoveredRef.current = true;
                }}
                onTouchEnd={handleMouseLeave}
                onTouchCancel={handleMouseLeave}
                onClick={(e) => {
                    e.stopPropagation();
                    onClick?.();
                }}
            />
        </svg>
    );
}
