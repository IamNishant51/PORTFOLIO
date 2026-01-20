"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Github, Linkedin, Mail, Download } from "lucide-react";

const QuickLinks = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility, { passive: true });
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    useEffect(() => {
        if (!containerRef.current || !isVisible) return;

        const links = containerRef.current.querySelectorAll('.quick-link');
        gsap.fromTo(
            links,
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: "power3.out",
            }
        );
    }, [isVisible]);

    const socialLinks = [
        {
            icon: Github,
            label: "GitHub",
            href: "https://github.com/IamNishant51",
            color: "#ffffff"
        },
        {
            icon: Linkedin,
            label: "LinkedIn",
            href: "https://www.linkedin.com/in/nishant-unavane-008291275/",
            color: "#0A66C2"
        },
        {
            icon: Mail,
            label: "Email",
            href: "mailto:nishant.unavane@outlook.com",
            color: "#CCFF00"
        },
        {
            icon: Download,
            label: "Resume",
            href: "https://ik.imagekit.io/9pfz6g8ri/avatars/Nishant_Unavane_Resume.pdf",
            color: "#FF6B6B",
            download: true
        },
    ];

    if (!isVisible) return null;

    return (
        <div
            ref={containerRef}
            className="fixed z-[9996] 
                       bottom-6 left-1/2 -translate-x-1/2 flex-row gap-4
                       sm:left-20 sm:bottom-8 sm:translate-x-0 sm:translate-y-0 sm:flex-row sm:gap-4
                       flex"
        >
            {socialLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                    <a
                        key={index}
                        href={link.href}
                        target={link.download ? "_blank" : "_blank"}
                        rel="noopener noreferrer"
                        download={link.download}
                        className="quick-link group relative w-11 h-11 sm:w-12 sm:h-12 bg-white dark:bg-black border-2 border-black dark:border-white rounded-full flex items-center justify-center hover:bg-[#CCFF00] hover:border-[#CCFF00] transition-all duration-300 hover:scale-110"
                        aria-label={link.label}
                    >
                        <Icon className="w-5 h-5 text-black dark:text-white group-hover:text-black transition-colors duration-300" />

                        {/* Tooltip */}
                        <span className="absolute left-full ml-4 bg-black dark:bg-white text-white dark:text-black px-3 py-1 rounded text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 hidden sm:inline">
                            {link.label}
                        </span>
                    </a>
                );
            })}
        </div>
    );
};

export default QuickLinks;
