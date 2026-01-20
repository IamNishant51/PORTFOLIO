"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="fixed top-6 right-6 z-[9999] w-12 h-12 rounded-full bg-black border-2 border-white" />
        );
    }

    const isDark = resolvedTheme === "dark";

    const toggleTheme = () => {
        const newTheme = isDark ? "light" : "dark";
        setTheme(newTheme);
    };

    return (
        <button
            onClick={toggleTheme}
            className="hidden lg:flex fixed top-6 right-6 z-[9999] w-12 h-12 rounded-full bg-black dark:bg-white border-2 border-white dark:border-black items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group shadow-lg"
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
            {!isDark ? (
                <Sun className="w-6 h-6 text-white" strokeWidth={2} />
            ) : (
                <Moon className="w-6 h-6 text-black" strokeWidth={2} />
            )}
        </button>
    );
};

export default ThemeToggle;
