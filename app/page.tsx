"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import Preloader from "./components/Preloader";
import Hero from "./components/Hero";
import About from "./components/About";
import Cursor from "./components/Cursor";
import Navbar from "./components/layout/Navbar";
import TransitionLayout from "./components/layout/TransitionLayout";

/* Lazy-load non-critical sections */
const ProjectList = dynamic(() => import("./components/ProjectList"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen" style={{ background: "var(--void-2,#12121A)" }} />
  ),
});
const SkillsMarquee = dynamic(() => import("./components/SkillsMarquee"), {
  ssr: false,
  loading: () => (
    <div className="min-h-[50vh]" style={{ background: "var(--bg)" }} />
  ),
});
const Testimonials = dynamic(() => import("./components/Testimonials"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen" style={{ background: "var(--void-2,#12121A)" }} />
  ),
});
const Contact = dynamic(() => import("./components/Contact"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen" style={{ background: "var(--bg)" }} />
  ),
});
const Footer = dynamic(() => import("./components/Footer"));
const FloatingMenu = dynamic(() => import("./components/FloatingMenu"), { ssr: false });
const ScrollToTop = dynamic(() => import("./components/ScrollToTop"), { ssr: false });

export default function Home() {
  const [done, setDone] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);

  const handleComplete = () => {
    setDone(true);
    setTimeout(() => setShowPreloader(false), 100);
  };

  return (
    <TransitionLayout>
      <main className="relative w-full" role="main">
        {showPreloader && <Preloader onComplete={handleComplete} />}
        <Cursor />

        {done && (
          <>
            <FloatingMenu />
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
          <Testimonials />
          <Contact />
        </div>

        {/* Fixed footer revealed by Contact's mb-[50vh] */}
        <Footer />
      </main>
    </TransitionLayout>
  );
}
