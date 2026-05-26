"use client";
import React from "react";

/**
 * Global texture overlays: noise, scanlines, and vignette.
 * Render once at the root level. All layers are pointer-events-none.
 */
export default function TextureOverlay() {
  return (
    <>
      {/* Noise grain — already handled by globals.css body::before */}

      {/* Vignette (dark mode only) */}
      <div
        className="fixed inset-0 pointer-events-none z-9997 mix-blend-multiply"
        style={{
          background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.15) 100%)",
        }}
      />
    </>
  );
}
