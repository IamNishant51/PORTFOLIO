"use client";
import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import SkillsMarquee from "../components/SkillsMarquee";
import Navbar from "../components/layout/Navbar";
import TransitionLayout from "../components/layout/TransitionLayout";

export default function SkillsPage() {
  return (
    <TransitionLayout>
      <main className="min-h-screen relative w-full pb-12" style={{ background: "var(--bg)", color: "var(--fg)" }}>
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
        <SkillsMarquee />
      </main>
    </TransitionLayout>
  );
}
