import { useEffect } from 'react';
import gsap from 'gsap';
import Lenis from 'lenis';

export default function useSmoothScroll() {

    useEffect(() => {
        // Check if it's a mobile/touch device
        const isMobile =
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
            'ontouchstart' in window ||
            navigator.maxTouchPoints > 0 ||
            window.innerWidth < 768;

        // Don't initialize Lenis on mobile devices to prevent touch/scroll issues
        if (isMobile) {
            // Ensure body is scrollable on mobile - force it!
            document.body.style.overflow = 'visible';
            document.body.style.overflowY = 'auto';
            document.body.style.overflowX = 'hidden';
            document.documentElement.style.overflow = 'visible';
            document.documentElement.style.overflowY = 'auto';
            document.documentElement.style.overflowX = 'hidden';
            // Don't do anything else - exit early
            return () => { };
        }

        // Initialize Lenis for desktop only
        const lenisInstance = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential smoothing
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            touchMultiplier: 2,
        });

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
}
