"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Home, Briefcase, Target, MessageSquare, Mail, Moon, Sun } from "lucide-react";

const FloatingMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = resolvedTheme === "dark";

    const menuItems = [
        { Icon: Home, label: "Home", action: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
        { Icon: Briefcase, label: "Projects", action: () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }) },
        { Icon: Target, label: "Skills", action: () => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" }) },
        { Icon: MessageSquare, label: "Testimonials", action: () => document.getElementById("testimonials")?.scrollIntoView({ behavior: "smooth" }) },
        { Icon: Mail, label: "Contact", action: () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }) },
        {
            Icon: mounted ? (isDark ? Sun : Moon) : Moon,
            label: mounted ? (isDark ? "Light Mode" : "Dark Mode") : "Theme",
            action: () => {
                if (mounted) {
                    setTheme(isDark ? "light" : "dark");
                }
            },
            isThemeToggle: true
        },
    ];

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[9997]">
            {/* Menu Items */}
            <div className="relative">
                {menuItems.map((item, index) => (
                    <button
                        key={item.label}
                        onClick={() => {
                            item.action();
                            setIsOpen(false);
                        }}
                        className={`absolute bottom-0 right-0 w-11 h-11 sm:w-12 sm:h-12 bg-white dark:bg-black border-2 border-black dark:border-white rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[#CCFF00] hover:border-[#CCFF00] group shadow-lg ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                            }`}
                        style={{
                            transform: isOpen
                                ? `translateY(-${(index + 1) * 55}px)`
                                : "translateY(0)",
                            transitionDelay: isOpen ? `${index * 50}ms` : "0ms",
                            transitionProperty: "transform, opacity",
                        }}
                        aria-label={item.label}
                        title={item.label}
                    >
                        <item.Icon className={`w-4 h-4 sm:w-5 sm:h-5 text-black dark:text-white group-hover:text-black`} />
                        <span className="absolute right-12 sm:right-14 bg-black dark:bg-white text-white dark:text-black px-2 sm:px-3 py-1 rounded text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none" style={{ transitionProperty: "opacity", transitionDuration: "200ms" }}>
                            {item.label}
                        </span>
                    </button>
                ))}
            </div>

            {/* Toggle Button */}
            <button
                onClick={handleToggle}
                className="relative w-12 h-12 sm:w-14 sm:h-14 bg-black dark:bg-white border-2 border-white dark:border-black rounded-full flex items-center justify-center transition-all duration-300 hover:rotate-90 shadow-2xl"
                aria-label="Toggle menu"
            >
                <span
                    className={`absolute w-6 h-0.5 bg-white dark:bg-black transition-all duration-300 ${isOpen ? "rotate-45" : "rotate-0 -translate-y-1.5"
                        }`}
                />
                <span
                    className={`absolute w-6 h-0.5 bg-white dark:bg-black transition-all duration-300 ${isOpen ? "opacity-0" : "opacity-100"
                        }`}
                />
                <span
                    className={`absolute w-6 h-0.5 bg-white dark:bg-black transition-all duration-300 ${isOpen ? "-rotate-45" : "rotate-0 translate-y-1.5"
                        }`}
                />
            </button>
        </div>
    );
};

export default FloatingMenu;
