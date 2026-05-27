"use client";
import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useSmoothScroll from "../hooks/useSmoothScroll";
import dynamic from "next/dynamic";

const PaperTexture = dynamic(() => import("./PaperTexture"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

function SmoothScrolling({ children }: { children: React.ReactNode }) {
    useSmoothScroll();

    return (
        <div className="lenis-scroller-wrapper">
            <PaperTexture />
            {children}
        </div>
    );
}

export default SmoothScrolling;
