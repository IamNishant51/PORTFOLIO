"use client";
import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useSmoothScroll from "../hooks/useSmoothScroll";

gsap.registerPlugin(ScrollTrigger);

function SmoothScrolling({ children }: { children: React.ReactNode }) {
    const lenis = useSmoothScroll();

    return <div className="lenis-scroller-wrapper">{children}</div>;
}

export default SmoothScrolling;
