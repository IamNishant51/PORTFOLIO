"use client";

import { useEffect, useRef } from "react";
import { cardParticlePoints } from "@/content/cardParticles";

interface HeroCardParticleCanvasProps {
  progress: number; // 0 to 1
  className?: string;
  onComplete?: () => void;
}

export function HeroCardParticleCanvas({
  progress,
  className = "",
  onComplete,
}: HeroCardParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<
    Array<{
      tx: number;
      ty: number;
      r0: number;
      theta0: number;
      r: number;
      g: number;
      b: number;
      size: number;
    }>
  >([]);

  // Initialize particle metadata once
  useEffect(() => {
    const pts = cardParticlePoints;
    const count = pts.length / 5;
    const list = [];

    for (let i = 0; i < count; i++) {
      const idx = i * 5;
      const xNorm = pts[idx] / 1000;
      const yNorm = pts[idx + 1] / 1000;
      const r = pts[idx + 2];
      const g = pts[idx + 3];
      const b = pts[idx + 4];

      // Starting orbital cloud: radial dispersion around center
      const theta0 = Math.random() * Math.PI * 2;
      const r0 = Math.random() * 320 + 80; // distance from target
      const size = Math.random() * 1.2 + 1.2;

      list.push({
        tx: xNorm,
        ty: yNorm,
        r0,
        theta0,
        r,
        g,
        b,
        size,
      });
    }

    particlesRef.current = list;
  }, []);

  // Render particles when progress changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;

    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);

    if (progress <= 0) {
      ctx.restore();
      return;
    }

    // Mathematical swirl parametric interpolation
    // progress: 0 -> 1
    // p: easing curve
    const p = Math.min(1, Math.max(0, progress));
    const smoothP = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2; // easeInOutCubic
    const swirlFactor = (1 - smoothP) * Math.PI * 2.5; // spiral turns
    const decay = Math.pow(1 - smoothP, 1.6);

    const particles = particlesRef.current;
    const count = particles.length;

    // Fade out particles when crystallizing (p > 0.88)
    const fadeOutAlpha = p > 0.88 ? Math.max(0, 1 - (p - 0.88) / 0.12) : 1;
    const globalAlpha = Math.min(1, p * 2.2) * fadeOutAlpha;

    for (let i = 0; i < count; i++) {
      const pt = particles[i];

      // Target coordinate in canvas pixels (accounting for image bottom placement)
      const targetPxX = pt.tx * w;
      const targetPxY = pt.ty * h;

      // Swirling position
      const angle = pt.theta0 + swirlFactor;
      const dist = pt.r0 * decay;

      const curX = targetPxX + Math.cos(angle) * dist;
      const curY = targetPxY + Math.sin(angle) * dist;

      // Draw particle dot
      ctx.fillStyle = `rgba(${pt.r}, ${pt.g}, ${pt.b}, ${globalAlpha.toFixed(2)})`;
      ctx.beginPath();
      const dotRadius = pt.size * (0.8 + 0.5 * (1 - smoothP));
      ctx.arc(curX, curY, dotRadius, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();

    if (progress >= 1 && onComplete) {
      onComplete();
    }
  }, [progress, onComplete]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none z-25 ${className}`}
      aria-hidden="true"
    />
  );
}
