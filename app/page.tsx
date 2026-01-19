"use client";
import React, { useState } from "react";
import Preloader from "./components/Preloader";
import Hero from "./components/Hero";
import ProjectList from "./components/ProjectList";
import SkillsMarquee from "./components/SkillsMarquee";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Cursor from "./components/Cursor";

export default function Home() {
  const [timelineComplete, setTimelineComplete] = useState(false);

  return (
    <main className="relative w-full">
      <Preloader onComplete={() => setTimelineComplete(true)} />
      <Cursor />

      {/* Main Content Wrapper - Z-Index 10 to scroll OVER the footer */}
      <div className="relative z-10 bg-white shadow-2xl">
        <Hero />
        <div className="bg-black text-white">
          <ProjectList />
        </div>
        <SkillsMarquee />
        <div className="bg-black text-white">
          <Contact />
        </div>
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
