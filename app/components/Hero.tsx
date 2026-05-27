import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

/* ── Utility: split text into char spans ── */
function splitChars(el: HTMLElement) {
    const text = el.textContent ?? "";
    el.innerHTML = "";
    el.setAttribute("aria-label", text);
    return text.split("").map((ch) => {
        const wrap = document.createElement("span");
        wrap.className = "char-wrap";
        wrap.setAttribute("aria-hidden", "true");
        const inner = document.createElement("span");
        inner.className = "inline-block";
        inner.textContent = ch === " " ? "\u00A0" : ch;
        wrap.appendChild(inner);
        el.appendChild(wrap);
        return inner;
    });
}

const Hero = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const line1Ref = useRef<HTMLSpanElement>(null);
    const line2Ref = useRef<HTMLSpanElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLDivElement>(null);
    const subtextRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const l1 = line1Ref.current;
            const l2 = line2Ref.current;
            if (!l1 || !l2) return;

            const chars1 = splitChars(l1);
            const chars2 = splitChars(l2);

            const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

            /* Image reveal */
            tl.fromTo(imageRef.current,
                { scale: 0.9, opacity: 0, y: 20 },
                { scale: 1, opacity: 1, y: 0, duration: 1 }
            );

            /* Label */
            tl.fromTo(labelRef.current,
                { opacity: 0, y: 12 },
                { opacity: 1, y: 0, duration: 0.6 },
                "-=0.6"
            );

            /* Headline chars */
            tl.fromTo(chars1,
                { y: "110%", opacity: 0 },
                { y: "0%", opacity: 1, stagger: 0.03, duration: 0.8 },
                "-=0.3"
            );
            tl.fromTo(chars2,
                { y: "110%", opacity: 0 },
                { y: "0%", opacity: 1, stagger: 0.03, duration: 0.8 },
                "-=0.6"
            );

            /* Subtext */
            tl.fromTo(subtextRef.current,
                { opacity: 0, y: 16 },
                { opacity: 1, y: 0, duration: 0.7 },
                "-=0.4"
            );

            /* CTA */
            tl.fromTo(ctaRef.current,
                { opacity: 0, y: 16 },
                { opacity: 1, y: 0, duration: 0.6 },
                "-=0.4"
            );

            /* Scroll indicator */
            tl.fromTo(scrollRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.5 },
                "-=0.2"
            );

            /* ── Scroll velocity skew on chars ── */
            const allChars = [...chars1, ...chars2];
            const proxy = { skew: 0 };
            const skewSetter = gsap.quickSetter(allChars, "skewY", "deg");
            const clamp = gsap.utils.clamp(-10, 10);

            ScrollTrigger.create({
                onUpdate(self) {
                    const skew = clamp(self.getVelocity() / -400);
                    if (Math.abs(skew) > Math.abs(proxy.skew)) {
                        proxy.skew = skew;
                        gsap.to(proxy, {
                            skew: 0,
                            duration: 0.8,
                            ease: "power3",
                            overwrite: true,
                            onUpdate: () => skewSetter(proxy.skew),
                        });
                    }
                },
            });

            /* ── Parallax on image ── */
            gsap.to(imageRef.current, {
                y: 60,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1.2,
                },
            });

            /* ── Headline fade on scroll ── */
            gsap.to([l1, l2], {
                opacity: 0,
                y: -40,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "30% top",
                    end: "70% top",
                    scrub: 1,
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
            style={{ background: "var(--bg)" }}
        >
            {/* Subtle top border */}
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "var(--border-hi)" }} />

            {/* Main content */}
            <div className="section-container relative z-10 w-full pt-24 pb-20 md:pt-32 md:pb-28">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16 lg:gap-24 items-center">

                    {/* ── Left: Headline ── */}
                    <div>
                        {/* Badge */}
                        <div ref={labelRef} className="flex items-center gap-2 mb-12 opacity-0">
                            <span className="badge-neutral">01</span>
                            <span className="badge-neutral" style={{ color: "var(--fg)" }}>
                                Full-Stack Developer
                            </span>
                        </div>

                        {/* Headline */}
                        <h1 className="text-display overflow-hidden mb-8" style={{ color: "var(--fg)" }}>
                            <span ref={line1Ref} className="block overflow-hidden">AI for all humanity</span>
                            <span
                                ref={line2Ref}
                                className="block overflow-hidden"
                                style={{ color: "var(--fg)" }}
                            >
                                Start building today
                            </span>
                        </h1>

                        {/* Subtext */}
                        <p
                            ref={subtextRef}
                            className="text-body max-w-lg mb-12 opacity-0"
                            style={{ color: "var(--color-muted-ash)" }}
                        >
                            Explore new frontiers. Building high-performance web apps, VS Code extensions, and
                            immersive digital experiences with modern technologies and clean code principles.
                        </p>

                        {/* CTA */}
                        <div ref={ctaRef} className="flex flex-wrap items-center gap-4 opacity-0">
                            <button
                                onClick={() => {
                                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                                }}
                                className="btn-ghost-primary"
                            >
                                Get started
                            </button>
                            <a
                                href="https://ik.imagekit.io/9pfz6g8ri/avatars/Nishant_Unavane_Resume.pdf"
                                download="Nishant_Unavane_Resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-ghost-primary"
                            >
                                My resume
                            </a>
                        </div>
                    </div>

                    {/* ── Right: Profile image ── */}
                    <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                        <div ref={imageRef} className="relative opacity-0">
                            {/* Image frame */}
                            <a
                                href="https://github.com/IamNishant51"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative block w-60 h-60 md:w-72 md:h-72"
                                style={{ border: "1px solid var(--border-hi)" }}
                            >
                                <Image
                                    src="https://ik.imagekit.io/9pfz6g8ri/avatars/nishant.jpg"
                                    alt="Nishant Unavane — Full-Stack Developer"
                                    fill
                                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                    priority
                                    sizes="(max-width: 768px) 240px, 288px"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div
                ref={scrollRef}
                onClick={() => window.scrollBy({ top: window.innerHeight, behavior: "smooth" })}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group opacity-0"
                style={{ color: "var(--color-muted-ash)" }}
            >
                <span className="text-caption group-hover:text-[var(--fg)] transition-colors duration-300">
                    Scroll to explore
                </span>
                <div
                    className="w-px h-8 animate-pulse"
                    style={{ background: "currentColor" }}
                />
            </div>
        </section>
    );
};

export default Hero;
