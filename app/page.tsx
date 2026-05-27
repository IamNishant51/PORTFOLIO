"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Preloader from "./components/Preloader";
import Hero from "./components/Hero";
import About from "./components/About";
import Cursor from "./components/Cursor";
import Navbar from "./components/layout/Navbar";

/* Lazy-load non-critical sections */
const ProjectList = dynamic(() => import("./components/ProjectList"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen" style={{ background: "var(--bg)" }} />
  ),
});
const SkillsMarquee = dynamic(() => import("./components/SkillsMarquee"), {
  ssr: false,
  loading: () => (
    <div className="min-h-[50vh]" style={{ background: "var(--bg)" }} />
  ),
});
const Contact = dynamic(() => import("./components/Contact"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen" style={{ background: "var(--bg)" }} />
  ),
});
const Footer = dynamic(() => import("./components/Footer"));
const ScrollToTop = dynamic(() => import("./components/ScrollToTop"), { ssr: false });

// Module-level persistent flag (persists across client-side router navigation, resets on refresh)
let preloaderHasRun = false;

export default function Home() {
  const [done, setDone] = useState(preloaderHasRun);
  const [showPreloader, setShowPreloader] = useState(!preloaderHasRun);

  const handleComplete = () => {
    setDone(true);
    setTimeout(() => setShowPreloader(false), 100);
    preloaderHasRun = true;
  };

  useEffect(() => {
    if (done && typeof window !== "undefined" && window.location.hash === "#contact") {
      setTimeout(() => {
        const contactSection = document.getElementById("contact");
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
    }
  }, [done]);

  return (
    <main className="relative w-full" role="main">
      {showPreloader && <Preloader onComplete={handleComplete} />}
      <Cursor />

      {done && (
        <>
          <ScrollToTop />
        </>
      )}

      {/* Navbar sits above everything */}
      <Navbar />

      {/* Main content — scrolls over the fixed footer */}
      <div className="relative z-10" style={{ background: "var(--bg)" }}>
        <Hero />
        <About />
        <ProjectList />
        <SkillsMarquee />
        <Contact />
      </div>

      {/* Fixed footer revealed by Contact's bottom margin */}
      <Footer />
    </main>
  );
}
