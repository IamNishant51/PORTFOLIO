"use client";
import React, { useEffect, useState } from "react";

const KonamiCode = () => {
    const [showEasterEgg, setShowEasterEgg] = useState(false);
    const [sequence, setSequence] = useState<string[]>([]);

    // Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            setSequence((prev) => {
                const newSeq = [...prev, e.key.toLowerCase()].slice(-10);

                // Check if the sequence matches the Konami code
                if (newSeq.join(',') === konamiCode.join(',')) {
                    setShowEasterEgg(true);
                    setTimeout(() => setShowEasterEgg(false), 5000);
                    return [];
                }

                return newSeq;
            });
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    if (!showEasterEgg) return null;

    return (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fadeIn">
            <div className="text-center space-y-6 animate-bounce">
                <div className="text-8xl">🎮</div>
                <h2 className="text-4xl md:text-6xl font-black text-[black] uppercase">
                    You Found It!
                </h2>
                <p className="text-xl text-white/80">
                    You're a true developer! ⌨️
                </p>
                <div className="text-sm text-white/50 font-mono">
                    Achievement Unlocked: Konami Code Master
                </div>
            </div>
        </div>
    );
};

export default KonamiCode;
