"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Navigation = () => {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const navRef = useRef<HTMLElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (currentScrollY / scrollHeight) * 100;

            setScrollProgress(progress);

            // Hide nav on scroll down, show on scroll up
            if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (navRef.current) {
            gsap.to(navRef.current, {
                y: isVisible ? 0 : -100,
                duration: 0.3,
                ease: "power2.out"
            });
        }
    }, [isVisible]);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <nav
            ref={navRef}
            className="fixed top-0 left-0 w-full z-[9998] bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-black/10 dark:border-white/10"
        >
            <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-16">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className="text-xl md:text-2xl font-bold uppercase tracking-tight hover:text-[#CCFF00] transition-colors duration-300"
                    >
                        Nishant
                    </button>

                    {/* Navigation Links */}
                    <ul className="hidden md:flex items-center gap-8 text-sm uppercase tracking-wider font-medium">
                        <li>
                            <button
                                onClick={() => scrollToSection("projects")}
                                className="hover:text-[#CCFF00] transition-colors duration-300 relative group"
                            >
                                Projects
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#CCFF00] group-hover:w-full transition-all duration-300" />
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => scrollToSection("skills")}
                                className="hover:text-[#CCFF00] transition-colors duration-300 relative group"
                            >
                                Skills
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#CCFF00] group-hover:w-full transition-all duration-300" />
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => scrollToSection("testimonials")}
                                className="hover:text-[#CCFF00] transition-colors duration-300 relative group"
                            >
                                Testimonials
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#CCFF00] group-hover:w-full transition-all duration-300" />
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => scrollToSection("contact")}
                                className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black hover:bg-[#CCFF00] hover:text-black transition-all duration-300 font-bold uppercase tracking-wide"
                            >
                                Contact
                            </button>
                        </li>
                    </ul>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => scrollToSection("contact")}
                        className="md:hidden px-4 py-2 bg-black dark:bg-white text-white dark:text-black text-xs font-bold uppercase"
                    >
                        Contact
                    </button>
                </div>
            </div>

            {/* Progress Bar */}
            <div
                ref={progressBarRef}
                className="absolute bottom-0 left-0 h-1 bg-[#CCFF00] transition-all duration-100"
                style={{ width: `${scrollProgress}%` }}
            />
        </nav>
    );
};

export default Navigation;
