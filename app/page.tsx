"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import Preloader from "./components/Preloader";
import Hero from "./components/Hero";
import Cursor from "./components/Cursor";
import ThemeToggle from "./components/ThemeToggle";

// Lazy load components that are not critical for initial render
const ProjectList = dynamic(() => import("./components/ProjectList"), {
  loading: () => <div className="min-h-screen bg-black" />,
});
const SkillsMarquee = dynamic(() => import("./components/SkillsMarquee"), {
  loading: () => <div className="min-h-[50vh] bg-white dark:bg-black" />,
});
const Contact = dynamic(() => import("./components/Contact"), {
  loading: () => <div className="min-h-screen bg-black" />,
});
const Footer = dynamic(() => import("./components/Footer"));
const Testimonials = dynamic(() => import("./components/Testimonials"), {
  loading: () => <div className="min-h-screen bg-white dark:bg-black" />,
});
const FloatingMenu = dynamic(() => import("./components/FloatingMenu"));
const ScrollToTop = dynamic(() => import("./components/ScrollToTop"));

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
          <ThemeToggle />
          <FloatingMenu />
          <ScrollToTop />
        </>
      )}

      {/* Main Content Wrapper - Z-Index 10 to scroll OVER the footer */}
      <div className="relative z-10 bg-white dark:bg-black shadow-2xl">
        <Hero />
        <section id="projects" className="bg-black dark:bg-black text-white" aria-label="Projects">
          <ProjectList />
        </section>
        <section id="skills" aria-label="Skills and Technologies">
          <SkillsMarquee />
        </section>
        <Testimonials />
        <section id="contact" className="bg-black dark:bg-black text-white" aria-label="Contact">
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
