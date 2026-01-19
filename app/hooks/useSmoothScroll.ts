import { useEffect, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

export default function useSmoothScroll() {
    const [lenis, setLenis] = useState<Lenis | null>(null);

    useEffect(() => {
        // Initialize Lenis
        const lenisInstance = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential smoothing
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            touchMultiplier: 2,
        });

        setLenis(lenisInstance);

        // Sync Lenis with GSAP's ScrollTrigger
        // This assumes specific requestAnimationFrame handling:
        function update(time: number) {
            lenisInstance.raf(time * 1000);
        }

        // Add Lenis update to GSAP's ticker (best practice for syncing)
        gsap.ticker.add(update);
        gsap.ticker.lagSmoothing(0); // Disable lag smoothing to prevent jumps

        return () => {
            gsap.ticker.remove(update);
            lenisInstance.destroy();
        };
    }, []);

    return lenis;
}
