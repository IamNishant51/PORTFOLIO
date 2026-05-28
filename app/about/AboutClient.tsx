"use client";
import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import About from "../components/About";
import Navbar from "../components/layout/Navbar";
import TransitionLayout from "../components/layout/TransitionLayout";

/**
 * AboutClient — client component housing all interactive/GSAP elements.
 * Kept separate so the parent page.tsx can remain a server component,
 * allowing Next.js to stream the shell to Googlebot on first crawl.
 */
export default function AboutClient() {
  return (
    <TransitionLayout>
      <main className="min-h-screen relative w-full pb-12" style={{ background: "var(--bg)", color: "var(--fg)" }}>
        <div
          className="absolute inset-0 pointer-events-none select-none"
          style={{
            backgroundImage: "url('/ASSETS/WATER-WAVE.svg')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center bottom",
            backgroundSize: "100% auto",
            opacity: 0.03,
          }}
          aria-hidden="true"
        />
        <Navbar />
        <div className="relative z-10 pt-28 md:pt-36 pb-6">
          <div className="section-container">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-mono hover:text-white transition-colors duration-200"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              <ArrowLeft className="w-6 h-6" />
              Back to Home
            </Link>
          </div>
        </div>
        <About journeyBg />
      </main>
    </TransitionLayout>
  );
}
