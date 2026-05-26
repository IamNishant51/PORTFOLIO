"use client";

import { type ReactNode } from "react";
import Navbar from "./Navbar";
import Cursor from "../Cursor";
import ScrollToTop from "../ScrollToTop";
import Footer from "../Footer";
import PaperTexture from "../PaperTexture";

export default function ClientShell({ children }: { children: ReactNode }) {
  return (
    <>
      <PaperTexture />
      <Navbar />
      <Cursor />
      <ScrollToTop />
      <div className="relative z-10 min-h-screen">
        {children}
      </div>
      <div className="h-[50vh]" />
      <Footer />
    </>
  );
}
