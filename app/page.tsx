"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import Preloader from "./components/Preloader";
import Hero from "./components/Hero";
import About from "./components/About";
import Cursor from "./components/Cursor";

// Lazy load non-critical components
const ProjectList = dynamic(() => import("./components/ProjectList"), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-black" />,
});
const SkillsMarquee = dynamic(() => import("./components/SkillsMarquee"), {
  ssr: false,
  loading: () => <div className="min-h-[50vh] bg-white" />,
});
const Contact = dynamic(() => import("./components/Contact"), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-black" />,
});
const Footer = dynamic(() => import("./components/Footer"));
const Testimonials = dynamic(() => import("./components/Testimonials"), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-white" />,
});
const FloatingMenu = dynamic(() => import("./components/FloatingMenu"), { ssr: false });
const ScrollToTop = dynamic(() => import("./components/ScrollToTop"), { ssr: false });

export default function Home() {
  const [timelineComplete, setTimelineComplete] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);

  const handlePreloaderComplete = () => {
    setTimelineComplete(true);
    // Remove preloader from DOM completely
    setTimeout(() => setShowPreloader(false), 100);
  };

  return (
    <main className="relative w-full" role="main">
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
      <Cursor />
      {timelineComplete && (
        <>
          <FloatingMenu />
          <ScrollToTop />
        </>
      )}

      {/* Main Content Wrapper - Z-Index 10 to scroll OVER the footer */}
      <div className="relative z-10 bg-white shadow-2xl">
        <Hero />
        <About />
        <section id="projects" className="bg-black text-white" aria-label="Projects">
          <ProjectList />
        </section>
        <section id="skills" aria-label="Skills and Technologies">
          <SkillsMarquee />
        </section>
        <Testimonials />
        <section id="contact" className="bg-black text-white" aria-label="Contact">
          <Contact />
        </section>
      </div>

      {/* Fixed Footer - revealed by the margin-bottom of the last element in Content Wrapper */}
      {/* Note: In Contact.tsx we added mb-[50vh] to the section itself. 
          Alternatively, we can add it to the wrapper div or a spacer.
          The Contact component has 'mb-[50vh]' so it creates the window.
      */}
      <Footer />
    </main>
  );
}
