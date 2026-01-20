"use client";
import React from "react";
import { Code2, Sparkles, Rocket, Heart } from "lucide-react";

const About = () => {
    const stats = [
        { icon: Code2, label: "VS Code Extensions", value: "4+", color: "#CCFF00" },
        { icon: Sparkles, label: "Projects Completed", value: "15+", color: "#00D9FF" },
        { icon: Rocket, label: "Years Coding", value: "1+", color: "#FF6B6B" },
        { icon: Heart, label: "Coffee Consumed", value: "∞", color: "#FFD93D" },
    ];

    const journey = [
        {
            year: "2024 - Present",
            title: "Full-Stack Developer",
            description: "Building modern web applications with React, Next.js, and TypeScript. Creating VS Code extensions that enhance developer productivity.",
            highlight: true
        },
        {
            year: "2023",
            title: "Frontend Developer",
            description: "Mastered modern frontend frameworks and tools. Started contributing to open-source projects and building developer tools.",
            highlight: false
        },
        {
            year: "2022",
            title: "Learning Journey",
            description: "Dove deep into web development. Learned JavaScript, React, and started building projects to solidify my skills.",
            highlight: false
        }
    ];

    return (
        <section
            className="relative py-16 md:py-24 lg:py-32 bg-white dark:bg-black text-black dark:text-white px-6 md:px-8 lg:px-16 overflow-hidden"
        >
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="mb-12 md:mb-20">
                    <span className="text-xs md:text-sm font-mono uppercase tracking-[0.3em] text-black/50 dark:text-white/50 mb-4 block">
                        Get to know me
                    </span>
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight">
                        About <span className="text-[#CCFF00]">Me</span>
                    </h2>
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20 mb-16 md:mb-24">
                    {/* Bio */}
                    <div className="space-y-6">
                        <p className="text-lg md:text-xl leading-relaxed text-black/70 dark:text-white/70">
                            Hey! I'm <span className="font-bold text-black dark:text-white">Nishant Unavane</span>,
                            a passionate developer who loves turning complex problems into elegant solutions.
                        </p>
                        <p className="text-base md:text-lg leading-relaxed text-black/60 dark:text-white/60">
                            My journey into tech started with curiosity and has evolved into a deep passion for creating
                            tools that make developers' lives easier. I specialize in building{" "}
                            <span className="font-semibold text-[#CCFF00]">VS Code extensions</span>,
                            modern web applications, and everything in between.
                        </p>
                        <p className="text-base md:text-lg leading-relaxed text-black/60 dark:text-white/60">
                            When I'm not coding, you'll find me exploring new technologies, contributing to open-source,
                            or brewing the perfect cup of coffee ☕
                        </p>

                        {/* Personal Interests */}
                        <div className="pt-6 border-t border-black/10 dark:border-white/10">
                            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-black/50 dark:text-white/50">
                                I believe in
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {["Clean Code", "User Experience", "Continuous Learning", "Open Source", "Innovation"].map((belief) => (
                                    <span
                                        key={belief}
                                        className="px-4 py-2 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs md:text-sm font-medium hover:border-[#CCFF00] hover:bg-[#CCFF00]/10 transition-all duration-300 cursor-default"
                                    >
                                        {belief}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="space-y-6">
                        <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-8">
                            By the Numbers
                        </h3>
                        <div className="grid grid-cols-2 gap-4 md:gap-6">
                            {stats.map((stat, index) => {
                                const Icon = stat.icon;
                                return (
                                    <div
                                        key={index}
                                        className="group relative p-6 md:p-8 border-2 border-black/10 dark:border-white/10 hover:border-[#CCFF00] transition-all duration-500 bg-white dark:bg-black hover:shadow-2xl hover:shadow-[#CCFF00]/20 cursor-default"
                                    >
                                        <Icon
                                            className="w-8 h-8 md:w-10 md:h-10 mb-4 group-hover:scale-110 transition-transform duration-300"
                                            style={{ color: stat.color }}
                                        />
                                        <div className="text-3xl md:text-4xl font-black mb-2 group-hover:text-[#CCFF00] transition-colors duration-300">
                                            {stat.value}
                                        </div>
                                        <div className="text-xs md:text-sm uppercase tracking-wider text-black/50 dark:text-white/50 font-medium">
                                            {stat.label}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Journey Timeline */}
                <div className="relative">
                    <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-12">
                        My Journey
                    </h3>
                    <div className="space-y-8 md:space-y-12">
                        {journey.map((item, index) => (
                            <div
                                key={index}
                                className={`relative pl-8 md:pl-12 border-l-2 ${item.highlight
                                    ? "border-[#CCFF00]"
                                    : "border-black/10 dark:border-white/10"
                                    }`}
                            >
                                {/* Timeline Dot */}
                                <div
                                    className={`absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full ${item.highlight
                                        ? "bg-[#CCFF00] ring-4 ring-[#CCFF00]/20"
                                        : "bg-black/20 dark:bg-white/20"
                                        }`}
                                />

                                {/* Content */}
                                <div className="space-y-2">
                                    <span className="text-xs md:text-sm font-mono text-black/50 dark:text-white/50 uppercase tracking-wider">
                                        {item.year}
                                    </span>
                                    <h4 className={`text-xl md:text-2xl font-bold ${item.highlight ? "text-[#CCFF00]" : ""
                                        }`}>
                                        {item.title}
                                    </h4>
                                    <p className="text-sm md:text-base text-black/60 dark:text-white/60 leading-relaxed max-w-2xl">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute top-20 right-10 w-64 h-64 bg-[#CCFF00]/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#CCFF00]/3 rounded-full blur-3xl pointer-events-none" />
        </section>
    );
};

export default About;
