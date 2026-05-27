"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroGeometry() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Parallax translation on scroll (tilted rotation removed to keep it clean and flat)
    const yPos = useTransform(scrollYProgress, [0, 1], [-80, 80]);

    const drawTransition = { duration: 2, ease: "easeInOut" } as const;

    return (
        <div 
            ref={containerRef} 
            className="absolute left-1/2 top-[63%] sm:top-[61%] lg:top-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] h-[85vw] max-w-[280px] max-h-[280px] sm:max-w-[400px] sm:max-h-[400px] lg:max-w-[550px] lg:max-h-[550px] xl:max-w-[600px] xl:max-h-[600px] pointer-events-none opacity-20 sm:opacity-25 z-0 mix-blend-screen lg:left-[52%]"
        >
            <motion.div
                className="w-full h-full"
                style={{ y: yPos }}
            >
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    {/* Background Dot Matrix representation of Vector Embedding space */}
                    <g opacity="0.12">
                        {[5, 15, 25, 35, 45, 55, 65, 75, 85, 95].map((x) =>
                            [5, 15, 25, 35, 45, 55, 65, 75, 85, 95].map((y) => (
                                <circle key={`${x}-${y}`} cx={x} cy={y} r="0.15" fill="var(--fg)" />
                            ))
                        )}
                    </g>

                    {/* Outer frame borders - technical brackets */}
                    <path d="M 2 8 L 2 2 H 8" stroke="var(--border-hi)" strokeWidth="0.3" />
                    <path d="M 98 8 L 98 2 H 92" stroke="var(--border-hi)" strokeWidth="0.3" />
                    <path d="M 2 92 L 2 98 H 8" stroke="var(--border-hi)" strokeWidth="0.3" />
                    <path d="M 98 92 L 98 98 H 92" stroke="var(--border-hi)" strokeWidth="0.3" />

                    {/* ──── SUB-COMPONENTS (Pillars of AI Agent) ──── */}

                    {/* 1. PERCEPTION / OBSERVE (Top Left) */}
                    <g>
                        <text x="12" y="9" fill="var(--color-muted-ash)" fontSize="1.8" fontFamily="monospace">[PERCEIVE]</text>
                        <rect x="12" y="12" width="16" height="16" stroke="var(--border-hi)" strokeWidth="0.3" />
                        
                        {/* Interactive Sensor Nodes */}
                        <circle cx="16" cy="17" r="0.8" fill="var(--fg)" />
                        <circle cx="20" cy="17" r="0.8" fill="var(--fg)" />
                        <circle cx="24" cy="17" r="0.8" fill="var(--fg)" />
                        <circle cx="16" cy="21" r="0.8" fill="var(--fg)" />
                        
                        {/* Dynamic blinking node */}
                        <motion.circle 
                            cx="20" cy="21" r="0.8" 
                            fill="var(--accent)" 
                            animate={{ opacity: [0.2, 1, 0.2] }} 
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} 
                        />
                        <circle cx="24" cy="21" r="0.8" fill="var(--fg)" />
                        
                        <text x="20" y="26" fill="var(--color-muted-ash)" fontSize="1.6" fontFamily="monospace" textAnchor="middle">OBS_STREAM</text>
                    </g>

                    {/* 2. PLANNING & REASONING (Top Right) */}
                    <g>
                        <text x="72" y="9" fill="var(--color-muted-ash)" fontSize="1.8" fontFamily="monospace">[PLANNING]</text>
                        <rect x="72" y="12" width="16" height="16" stroke="var(--border-hi)" strokeWidth="0.3" />
                        
                        {/* Decision tree layout */}
                        <path d="M 80 15 L 76 21 M 80 15 L 84 21" stroke="var(--fg)" strokeWidth="0.25" />
                        <circle cx="80" cy="15" r="0.8" fill="var(--fg)" />
                        <circle cx="76" cy="21" r="0.8" fill="var(--fg)" />
                        <circle cx="84" cy="21" r="0.8" fill="var(--accent)" />
                        
                        <text x="80" y="26" fill="var(--color-muted-ash)" fontSize="1.6" fontFamily="monospace" textAnchor="middle">TREE_DFS</text>
                    </g>

                    {/* 3. VECTOR MEMORY / RAG (Bottom Left) */}
                    <g>
                        <text x="12" y="92" fill="var(--color-muted-ash)" fontSize="1.8" fontFamily="monospace">[MEMORY]</text>
                        <rect x="12" y="72" width="16" height="16" stroke="var(--border-hi)" strokeWidth="0.3" />
                        
                        {/* Vector Database index layers */}
                        <path d="M 15 76 H 25" stroke="var(--fg)" strokeWidth="0.3" />
                        <path d="M 15 80 H 25" stroke="var(--fg)" strokeWidth="0.3" />
                        <path d="M 15 84 H 25" stroke="var(--fg)" strokeWidth="0.3" />
                        
                        {/* Scanning search head */}
                        <motion.line 
                            x1="14" x2="26" 
                            y1="73" y2="73" 
                            stroke="var(--accent)" 
                            strokeWidth="0.5" 
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        />
                        
                        <text x="20" y="86" fill="var(--color-muted-ash)" fontSize="1.6" fontFamily="monospace" textAnchor="middle">RAG_STORE</text>
                    </g>

                    {/* 4. ACTION / TOOL EXECUTION (Bottom Right) */}
                    <g>
                        <text x="72" y="92" fill="var(--color-muted-ash)" fontSize="1.8" fontFamily="monospace">[ACTION]</text>
                        <rect x="72" y="72" width="16" height="16" stroke="var(--border-hi)" strokeWidth="0.3" />
                        
                        {/* Tool call status grids */}
                        <line x1="72" y1="80" x2="88" y2="80" stroke="var(--border-hi)" strokeWidth="0.2" />
                        <line x1="80" y1="72" x2="80" y2="88" stroke="var(--border-hi)" strokeWidth="0.2" />
                        
                        <motion.rect 
                            x="74" y="74" width="4" height="4" 
                            fill="var(--fg)" 
                            animate={{ opacity: [0.2, 0.8, 0.2] }} 
                            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                        />
                        <motion.rect 
                            x="82" y="74" width="4" height="4" 
                            fill="var(--accent)" 
                            animate={{ opacity: [0.2, 0.8, 0.2] }} 
                            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                        />
                        <motion.rect 
                            x="74" y="82" width="4" height="4" 
                            fill="var(--fg)" 
                            animate={{ opacity: [0.8, 0.2, 0.8] }} 
                            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                        />
                        <motion.rect 
                            x="82" y="82" width="4" height="4" 
                            fill="var(--fg)" 
                            animate={{ opacity: [0.2, 0.8, 0.2] }} 
                            transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                        />
                        
                        <text x="80" y="86" fill="var(--color-muted-ash)" fontSize="1.6" fontFamily="monospace" textAnchor="middle">ACT_INVOKE</text>
                    </g>

                    {/* ──── CENTRAL HUB: COGNITIVE ORCHESTRATOR / LLM LOOP ──── */}
                    <g>
                        {/* Brackets around core */}
                        <path d="M 36 44 V 36 H 44" stroke="var(--color-muted-ash)" strokeWidth="0.25" />
                        <path d="M 64 44 V 36 H 56" stroke="var(--color-muted-ash)" strokeWidth="0.25" />
                        <path d="M 36 56 V 64 H 44" stroke="var(--color-muted-ash)" strokeWidth="0.25" />
                        <path d="M 64 56 V 64 H 56" stroke="var(--color-muted-ash)" strokeWidth="0.25" />

                        {/* Central diamond */}
                        <motion.path
                            d="M 50 38 L 62 50 L 50 62 L 38 50 Z"
                            stroke="var(--fg)" strokeWidth="0.4"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            viewport={{ once: true }}
                            transition={drawTransition}
                        />

                        {/* Concentric rotating feedback ring */}
                        <motion.circle
                            cx="50" cy="50" r="8"
                            stroke="var(--accent)" strokeWidth="0.3"
                            strokeDasharray="2 3"
                            animate={{ rotate: -360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            style={{ originX: "50px", originY: "50px" }}
                        />

                        {/* Outer rotating dashed ring */}
                        <motion.circle
                            cx="50" cy="50" r="10"
                            stroke="var(--border-hi)" strokeWidth="0.2"
                            strokeDasharray="4 6"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                            style={{ originX: "50px", originY: "50px" }}
                        />

                        {/* Inner crosshair */}
                        <line x1="42" y1="50" x2="58" y2="50" stroke="var(--border-hi)" strokeWidth="0.2" strokeDasharray="1 1" />
                        <line x1="50" y1="42" x2="50" y2="58" stroke="var(--border-hi)" strokeWidth="0.2" strokeDasharray="1 1" />

                        {/* Reticle tick gauges */}
                        <line x1="34" y1="50" x2="36" y2="50" stroke="var(--accent)" strokeWidth="0.3" />
                        <line x1="64" y1="50" x2="66" y2="50" stroke="var(--accent)" strokeWidth="0.3" />
                        <line x1="50" y1="34" x2="50" y2="36" stroke="var(--accent)" strokeWidth="0.3" />
                        <line x1="50" y1="64" x2="50" y2="66" stroke="var(--accent)" strokeWidth="0.3" />

                        {/* Pulse Orchestrator Node */}
                        <motion.circle
                            cx="50" cy="50" r="2"
                            fill="var(--accent)"
                            animate={{ scale: [1, 1.25, 1] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        />
                        
                        <text x="50" y="33.2" fill="var(--fg)" fontSize="1.8" fontFamily="monospace" textAnchor="middle">[AGENT_CORE]</text>
                    </g>

                    {/* ──── NEW TECHNICAL DETAILS / CAD ब्लू-प्रिंट ──── */}
                    
                    {/* 5. ATTENTION HEATMAP GRAPH (Top Center) */}
                    <g>
                        <rect x="42" y="6" width="16" height="8" stroke="var(--border-hi)" strokeWidth="0.2" strokeDasharray="1 1" />
                        <text x="50" y="5.2" fill="var(--color-muted-ash)" fontSize="1.2" fontFamily="monospace" textAnchor="middle">[ATTN_MAP]</text>
                        {/* Render miniature attention matrix */}
                        <rect x="44" y="8" width="1.5" height="1.5" fill="var(--fg)" opacity="0.8" />
                        <rect x="46.5" y="8" width="1.5" height="1.5" fill="var(--fg)" opacity="0.2" />
                        <rect x="49" y="8" width="1.5" height="1.5" fill="var(--accent)" opacity="0.9" />
                        <rect x="51.5" y="8" width="1.5" height="1.5" fill="var(--fg)" opacity="0.4" />
                        <rect x="54" y="8" width="1.5" height="1.5" fill="var(--fg)" opacity="0.6" />
                        
                        <rect x="44" y="10.5" width="1.5" height="1.5" fill="var(--fg)" opacity="0.3" />
                        <rect x="46.5" y="10.5" width="1.5" height="1.5" fill="var(--fg)" opacity="0.7" />
                        <rect x="49" y="10.5" width="1.5" height="1.5" fill="var(--fg)" opacity="0.1" />
                        <rect x="51.5" y="10.5" width="1.5" height="1.5" fill="var(--accent)" opacity="0.8" />
                        <rect x="54" y="10.5" width="1.5" height="1.5" fill="var(--fg)" opacity="0.5" />
                    </g>

                    {/* 6. TOKEN / EMBEDDING STREAM HASHES (Bottom Center) */}
                    <g>
                        <rect x="40" y="86" width="20" height="9" stroke="var(--border-hi)" strokeWidth="0.2" strokeDasharray="1 1" />
                        <text x="50" y="85.2" fill="var(--color-muted-ash)" fontSize="1.2" fontFamily="monospace" textAnchor="middle">[VEC_PROJ]</text>
                        <text x="50" y="89.5" fill="var(--color-muted-ash)" fontSize="1.3" fontFamily="monospace" textAnchor="middle">T_502 Q_915 K_204</text>
                        <text x="50" y="93.5" fill="var(--accent)" fontSize="1.3" fontFamily="monospace" textAnchor="middle">similarity: 0.887</text>
                    </g>

                    {/* 7. MIDDLE BOUNDARIES & TELEMETRY LABELS */}
                    <path d="M 38 12 H 62" stroke="var(--border-hi)" strokeWidth="0.25" opacity="0.2" />
                    <path d="M 38 88 H 62" stroke="var(--border-hi)" strokeWidth="0.25" opacity="0.2" />
                    <path d="M 30 38 V 62" stroke="var(--border-hi)" strokeWidth="0.25" opacity="0.2" />
                    <path d="M 70 38 V 62" stroke="var(--border-hi)" strokeWidth="0.25" opacity="0.2" />

                    <g opacity="0.45">
                        <text x="32" y="31" fill="var(--color-muted-ash)" fontSize="1.3" fontFamily="monospace">id: 0x51_agent</text>
                        <text x="68" y="31" fill="var(--color-muted-ash)" fontSize="1.3" fontFamily="monospace" textAnchor="end">temp: 0.15 | top_p: 0.95</text>
                        <text x="32" y="69" fill="var(--color-muted-ash)" fontSize="1.3" fontFamily="monospace">emb_dim: 1536</text>
                        <text x="68" y="69" fill="var(--color-muted-ash)" fontSize="1.3" fontFamily="monospace" textAnchor="end">cycle: 24t/s</text>
                        
                        {/* New technical metrics */}
                        <text x="29" y="44" fill="var(--color-muted-ash)" fontSize="1.1" fontFamily="monospace" textAnchor="end">loss: 0.0042</text>
                        <text x="29" y="50" fill="var(--color-muted-ash)" fontSize="1.1" fontFamily="monospace" textAnchor="end">context: 128k</text>
                        <text x="29" y="56" fill="var(--color-muted-ash)" fontSize="1.1" fontFamily="monospace" textAnchor="end">mode: ReAct</text>
                        
                        <text x="71" y="44" fill="var(--color-muted-ash)" fontSize="1.1" fontFamily="monospace">agent: ACTIVE</text>
                        <text x="71" y="50" fill="var(--color-muted-ash)" fontSize="1.1" fontFamily="monospace">attn_heads: 32</text>
                        <text x="71" y="56" fill="var(--color-muted-ash)" fontSize="1.1" fontFamily="monospace">latency: 42ms</text>
                    </g>

                    {/* ──── DATA PATHWAYS (INFORMATION FLOWS) ──── */}

                    {/* Path 1: Observe -> Core (Flow In) */}
                    <path d="M 28 20 H 42 L 46 24 V 44 H 48" stroke="var(--border-hi)" strokeWidth="0.25" opacity="0.3" fill="none" />
                    <motion.path 
                        d="M 28 20 H 42 L 46 24 V 44 H 48" 
                        stroke="var(--accent)" strokeWidth="0.4" strokeDasharray="3 15" fill="none"
                        animate={{ strokeDashoffset: [0, -36] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Path 2: Plan -> Core (Flow Out) */}
                    <path d="M 72 20 H 58 L 54 24 V 44 H 52" stroke="var(--border-hi)" strokeWidth="0.25" opacity="0.3" fill="none" />
                    <motion.path 
                        d="M 72 20 H 58 L 54 24 V 44 H 52" 
                        stroke="var(--accent)" strokeWidth="0.4" strokeDasharray="3 15" fill="none"
                        animate={{ strokeDashoffset: [36, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Path 3: Recall -> Core (Flow In) */}
                    <path d="M 28 80 H 42 L 46 76 V 56 H 48" stroke="var(--border-hi)" strokeWidth="0.25" opacity="0.3" fill="none" />
                    <motion.path 
                        d="M 28 80 H 42 L 46 76 V 56 H 48" 
                        stroke="var(--accent)" strokeWidth="0.4" strokeDasharray="3 15" fill="none"
                        animate={{ strokeDashoffset: [0, -36] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Path 4: Act -> Core (Flow Out) */}
                    <path d="M 72 80 H 58 L 54 76 V 56 H 52" stroke="var(--border-hi)" strokeWidth="0.25" opacity="0.3" fill="none" />
                    <motion.path 
                        d="M 72 80 H 58 L 54 76 V 56 H 52" 
                        stroke="var(--accent)" strokeWidth="0.4" strokeDasharray="3 15" fill="none"
                        animate={{ strokeDashoffset: [36, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />

                    {/* ──── VERTICAL COGNITIVE PIPELINES (Observe <-> Memory & Plan <-> Action) ──── */}
                    <path d="M 20 28 V 72" stroke="var(--border-hi)" strokeWidth="0.2" opacity="0.25" strokeDasharray="2 2" fill="none" />
                    <motion.path 
                        d="M 20 28 V 72" 
                        stroke="var(--accent)" strokeWidth="0.3" strokeDasharray="4 20" fill="none"
                        animate={{ strokeDashoffset: [0, -44] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    />

                    <path d="M 80 28 V 72" stroke="var(--border-hi)" strokeWidth="0.2" opacity="0.25" strokeDasharray="2 2" fill="none" />
                    <motion.path 
                        d="M 80 28 V 72" 
                        stroke="var(--accent)" strokeWidth="0.3" strokeDasharray="4 20" fill="none"
                        animate={{ strokeDashoffset: [44, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    />
                </svg>
            </motion.div>
        </div>
    );
}
