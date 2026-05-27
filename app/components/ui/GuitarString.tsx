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
    const lastYRef = useRef<number>(30);
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
            filter.frequency.setValueAtTime(10000, t); // Brighter pluck for mobile
            filter.frequency.exponentialRampToValueAtTime(800, t + 0.15); // More high-mids for small speakers
            filter.frequency.linearRampToValueAtTime(100, t + 1.5);

            // Oscillator 3: Harmonic overtone (Octave up). Small mobile speakers physically cannot reproduce 
            // the fundamental frequencies (164Hz-300Hz) well. Adding an octave up ensures it cuts through.
            const overtone = ctx.createOscillator();
            overtone.type = 'sine';
            overtone.frequency.setValueAtTime(freq * 2, t);

            // Gain node for the master amplitude envelope
            const gainNode = ctx.createGain();
            gainNode.gain.setValueAtTime(0, t);
            gainNode.gain.linearRampToValueAtTime(1.8, t + 0.015); // Overdrive slightly for perceived loudness
            gainNode.gain.exponentialRampToValueAtTime(0.3, t + 0.2); // Stronger sustained level
            gainNode.gain.exponentialRampToValueAtTime(0.001, t + 1.5);

            // Gain envelope specifically for the sawtooth (only loud at the very beginning)
            const sawGain = ctx.createGain();
            sawGain.gain.setValueAtTime(0.45, t); // Sharper and louder twang
            sawGain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);

            // Route audio
            saw.connect(sawGain);
            sawGain.connect(filter);
            
            osc.connect(filter);
            overtone.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(ctx.destination);

            osc.start(t);
            saw.start(t);
            overtone.start(t);
            
            osc.stop(t + 1.5);
            saw.stop(t + 1.5);
            overtone.stop(t + 1.5);

            // Cleanup to avoid memory leaks
            setTimeout(() => {
                try {
                    osc.disconnect();
                    saw.disconnect();
                    overtone.disconnect();
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
        
        const clampedY = Math.max(5, Math.min(55, y));
        
        pathRef.current.setAttribute("d", `M 0 30 Q ${x} ${clampedY} ${rect.width} 30`);
        
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
            y: 30,
            duration: 2.2,
            ease: "elastic.out(2.5, 0.12)",
            onUpdate: () => {
                if (isHoveredRef.current) return;
                if (pathRef.current) {
                    pathRef.current.setAttribute("d", `M 0 30 Q ${animObj.x} ${animObj.y} ${width} 30`);
                }
            }
        });
    };

    useEffect(() => {
        const handleResize = () => {
            if (svgRef.current && pathRef.current && !isHoveredRef.current) {
                const rect = svgRef.current.getBoundingClientRect();
                pathRef.current.setAttribute("d", `M 0 30 Q ${rect.width / 2} 30 ${rect.width} 30`);
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
            className="absolute bottom-[-30px] left-0 w-full h-[60px] pointer-events-none z-20 overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* The visible interactive string line */}
            <path
                ref={pathRef}
                d="M 0 30 Q 0 30 0 30"
                stroke="var(--border-hi)"
                strokeWidth="1.5"
                fill="none"
                className="pointer-events-none transition-colors duration-300 group-hover:stroke-[var(--color-muted-ash)]"
            />
            {/* Transparent hover catcher overlay */}
            <rect
                width="100%"
                height="60"
                fill="transparent"
                className="pointer-events-auto cursor-pointer"
                style={{ touchAction: "none" }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onTouchMove={(e) => {
                    const touch = e.touches[0];
                    if (!svgRef.current || !pathRef.current) return;
                    
                    if (tweenRef.current) tweenRef.current.kill();
                    
                    const rect = svgRef.current.getBoundingClientRect();
                    const x = touch.clientX - rect.left;
                    const y = touch.clientY - rect.top;
                    
                    const clampedY = Math.max(5, Math.min(55, y));
                    pathRef.current.setAttribute("d", `M 0 30 Q ${x} ${clampedY} ${rect.width} 30`);
                    
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
