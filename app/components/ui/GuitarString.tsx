"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";

interface GuitarStringProps {
    index?: string | number;
    onClick?: () => void;
}

const FREQUENCIES = [
    164.81, // E3 (Warm low note)
    196.00, // G3
    220.00, // A3
    246.94, // B3
    293.66, // D4
    329.63  // E4 (Bright high note)
];

export default function GuitarString({ index = 0, onClick }: GuitarStringProps) {
    const svgRef = useRef<SVGSVGElement>(null);
    const pathRef = useRef<SVGPathElement>(null);
    const tweenRef = useRef<gsap.core.Tween | null>(null);
    
    const lastXRef = useRef<number>(0);
    const lastYRef = useRef<number>(20);
    const isHoveredRef = useRef<boolean>(false);

    // Map the string index to a specific frequency in E Minor Pentatonic scale
    const idx = typeof index === "string" ? parseInt(index, 10) - 1 : index;
    const frequency = FREQUENCIES[idx % FREQUENCIES.length] || FREQUENCIES[0];

    const playPluckSound = (freq: number) => {
        try {
            const AudioContextClass = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
            if (!AudioContextClass) return;

            const ctx = new AudioContextClass();
            const sampleRate = ctx.sampleRate;
            const delayLength = Math.round(sampleRate / freq);
            
            // Create a buffer for 1.5 seconds of sound
            const buffer = ctx.createBuffer(1, sampleRate * 1.5, sampleRate);
            const data = buffer.getChannelData(0);
            
            // Fill delay line with noise (initial pluck excitation)
            for (let i = 0; i < delayLength; i++) {
                data[i] = Math.random() * 2 - 1;
            }
            
            // Karplus-Strong synthesis algorithm to simulate string vibration decay
            const decay = 0.991; 
            for (let i = delayLength; i < data.length; i++) {
                const prevIndex = i - delayLength - 1;
                const prevVal = prevIndex >= 0 ? data[prevIndex] : 0;
                const average = (data[i - delayLength] + prevVal) / 2;
                data[i] = average * decay;
            }
            
            const source = ctx.createBufferSource();
            source.buffer = buffer;
            
            const gainNode = ctx.createGain();
            // A comfortable, non-intrusive pluck volume
            gainNode.gain.setValueAtTime(0.18, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.4);
            
            source.connect(gainNode);
            gainNode.connect(ctx.destination);
            
            source.start();
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
                onClick={(e) => {
                    e.stopPropagation();
                    onClick?.();
                }}
            />
        </svg>
    );
}
