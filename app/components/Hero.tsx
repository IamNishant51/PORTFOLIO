import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import HeroGeometry from "./ui/svg/HeroGeometry";

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

const LENS_RADIUS = 110; // px – radius of the reveal circle

const Hero = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const line1Ref = useRef<HTMLSpanElement>(null);
    const line2Ref = useRef<HTMLSpanElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLDivElement>(null);
    const subtextRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    /* Hover-reveal refs */
    const frameRef = useRef<HTMLDivElement>(null); // outer click-able frame
    const lensRef = useRef<HTMLDivElement>(null);  // clip-masked bamboo layer
    const lensGlowRef = useRef<HTMLDivElement>(null); // glow ring around lens
    const isHovering = useRef(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const l1 = line1Ref.current;
            const l2 = line2Ref.current;
            if (!l1 || !l2) return;

            const chars1 = splitChars(l1);
            const chars2 = splitChars(l2);

            const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

            /* Ambient glow */
            tl.fromTo(glowRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 1.5 },
                0
            );

            /* Image reveal */
            tl.fromTo(imageRef.current,
                { scale: 0.92, opacity: 0, y: 24 },
                { scale: 1, opacity: 1, y: 0, duration: 1.1 },
                0.1
            );

            /* Label */
            tl.fromTo(labelRef.current,
                { opacity: 0, y: 14 },
                { opacity: 1, y: 0, duration: 0.7 },
                "-=0.7"
            );

            /* Headline chars */
            tl.fromTo(chars1,
                { y: "110%", opacity: 0 },
                { y: "0%", opacity: 1, stagger: 0.025, duration: 0.9 },
                "-=0.4"
            );
            tl.fromTo(chars2,
                { y: "110%", opacity: 0 },
                { y: "0%", opacity: 1, stagger: 0.025, duration: 0.9 },
                "-=0.7"
            );

            /* Subtext */
            tl.fromTo(subtextRef.current,
                { opacity: 0, y: 18 },
                { opacity: 1, y: 0, duration: 0.8 },
                "-=0.5"
            );

            /* CTA */
            tl.fromTo(ctaRef.current,
                { opacity: 0, y: 18 },
                { opacity: 1, y: 0, duration: 0.7 },
                "-=0.4"
            );

            /* Scroll indicator */
            tl.fromTo(scrollRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.6 },
                "-=0.3"
            );

            /* ── Scroll velocity skew on chars ── */
            const allChars = [...chars1, ...chars2];
            const proxy = { skew: 0 };
            const skewSetter = gsap.quickSetter(allChars, "skewY", "deg");
            const clamp = gsap.utils.clamp(-8, 8);

            ScrollTrigger.create({
                onUpdate(self) {
                    const skew = clamp(self.getVelocity() / -450);
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
                y: 50,
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

        /* ── Lens / hover-reveal logic ── */
        const frame = frameRef.current;
        const lens = lensRef.current;
        const lensGlow = lensGlowRef.current;
        if (!frame || !lens || !lensGlow) return () => ctx.revert();

        // Mutable state driven by GSAP — x/y are the smooth-lagged lens centre, r is animated radius
        const lensState = { x: 0, y: 0, r: 0 };
        // Target raw cursor position (no lag)
        const target = { x: 0, y: 0 };

        /** Write mask-image directly from lensState */
        const applyMask = () => {
            if (!lens) return;
            const { x, y, r } = lensState;
            // Soft feathered edge: fully opaque core → transparent at 100%
            const mask = [
                `radial-gradient(circle ${r}px at ${x}px ${y}px,`,
                `  rgba(0,0,0,1)   0%,`,
                `  rgba(0,0,0,0.95) 42%,`,
                `  rgba(0,0,0,0.6)  60%,`,
                `  rgba(0,0,0,0.15) 80%,`,
                `  rgba(0,0,0,0)   100%`,
                `)`,
            ].join(" ");
            lens.style.maskImage = mask;
            (lens.style as CSSStyleDeclaration & { webkitMaskImage: string }).webkitMaskImage = mask;
        };

        // Seed applyMask with collapsed state so nothing shows at start
        applyMask();

        const moveLens = (e: MouseEvent) => {
            if (!isHovering.current) return;
            const rect = frame.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Raw target — no clamping, mask handles overflow gracefully
            target.x = x;
            target.y = y;

            // Smoothly follow with GSAP; onUpdate writes mask every frame
            gsap.to(lensState, {
                x: target.x,
                y: target.y,
                duration: 0.22,
                ease: "power2.out",
                overwrite: "auto",
                onUpdate: applyMask,
            });

            // Glow ring follows with same lag
            gsap.to(lensGlow, {
                x: target.x - LENS_RADIUS,
                y: target.y - LENS_RADIUS,
                duration: 0.22,
                ease: "power2.out",
                overwrite: "auto",
            });
        };

        const onEnter = (e: MouseEvent) => {
            isHovering.current = true;
            // Seed initial position so the lens doesn't jump from 0,0
            const rect = frame.getBoundingClientRect();
            lensState.x = e.clientX - rect.left;
            lensState.y = e.clientY - rect.top;

            // Grow radius from 0 → LENS_RADIUS with spring
            gsap.to(lensState, {
                r: LENS_RADIUS,
                duration: 0.55,
                ease: "back.out(1.6)",
                overwrite: "auto",
                onUpdate: applyMask,
            });
            gsap.to(lensGlow, {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                ease: "back.out(1.4)",
            });
        };

        const onLeave = () => {
            isHovering.current = false;
            // Collapse radius back to 0
            gsap.to(lensState, {
                r: 0,
                duration: 0.45,
                ease: "power3.inOut",
                overwrite: "auto",
                onUpdate: applyMask,
            });
            gsap.to(lensGlow, {
                opacity: 0,
                scale: 0.5,
                duration: 0.4,
                ease: "power2.inOut",
            });
        };

        frame.addEventListener("mouseenter", onEnter);
        frame.addEventListener("mouseleave", onLeave);
        frame.addEventListener("mousemove", moveLens);

        return () => {
            ctx.revert();
            frame.removeEventListener("mouseenter", onEnter);
            frame.removeEventListener("mouseleave", onLeave);
            frame.removeEventListener("mousemove", moveLens);
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
            style={{ background: "var(--bg)" }}
        >
            {/* Subtle top border */}
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "var(--border-hi)" }} />

            {/* Geometric SVG Background */}
            {/* <HeroGeometry /> */}
            <div
                className="absolute inset-0 pointer-events-none select-none"
                style={{
                    backgroundImage: "url('/ASSETS/HERO-BG.svg')",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center",
                    backgroundSize: "cover", // Cover ensures it stretches nicely across the hero
                    opacity: 0.12, // Very dull and subtle like the other backgrounds
                }}
                aria-hidden="true"
            />

            {/* Ambient glow */}
            <div
                ref={glowRef}
                className="absolute inset-0 pointer-events-none opacity-0"
                style={{
                    background: "radial-gradient(ellipse 70% 55% at 50% 0%, rgba(255,255,255,0.03) 0%, transparent 65%)",
                }}
                aria-hidden="true"
            />

            {/* Main content */}
            <div className="section-container relative z-10 w-full pt-28 pb-24 md:pt-36 md:pb-32">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 lg:gap-20 xl:gap-28 items-center">

                    {/* ── Left: Headline ── */}
                    <div>
                        {/* Badge */}
                        <div ref={labelRef} className="flex flex-wrap items-center gap-3 mb-10 opacity-0">
                            <span className="text-mono" style={{ color: "var(--accent)" }}>01</span>
                            <span className="w-8 h-px flex-shrink-0" style={{ background: "var(--accent)" }} />
                            <span className="text-mono" style={{ color: "var(--color-muted-ash)" }}>
                                Full-Stack Developer
                            </span>
                        </div>

                        {/* Headline */}
                        <h1 className="text-display overflow-hidden mb-8" style={{ color: "var(--fg)" }}>
                            <span ref={line1Ref} className="block overflow-hidden">Full-Stack</span>
                            <span
                                ref={line2Ref}
                                className="block overflow-hidden"
                                style={{ color: "var(--accent)" }}
                            >
                                Developer
                            </span>
                        </h1>

                        {/* Subtext */}
                        <p
                            ref={subtextRef}
                            className="text-body max-w-[42ch] mb-12 opacity-0"
                            style={{ color: "var(--color-muted-ash)" }}
                        >
                            Building high-performance web apps, VS Code extensions, and immersive digital experiences with
                            React, Next.js, TypeScript, and modern tooling.
                        </p>

                        {/* CTA */}
                        <div ref={ctaRef} className="flex flex-wrap items-center gap-5 opacity-0">
                            <button
                                onClick={() => {
                                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                                }}
                                className="btn-ghost-primary"
                            >
                                Get in touch
                            </button>
                            <a
                                href="https://ik.imagekit.io/9pfz6g8ri/Nishant_Unavane_FullStack_resume.pdf"
                                download="Nishant_Unavane_FullStack_resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-mono hover:text-[var(--fg)] transition-colors duration-300 underline underline-offset-4 decoration-[var(--border-hi)] hover:decoration-[var(--fg)]"
                                style={{ color: "var(--color-muted-ash)" }}
                            >
                                View résumé
                            </a>
                        </div>
                    </div>

                    {/* ── Right: Portrait with lens reveal ── */}
                    <div className="flex justify-center lg:justify-end mt-10 lg:mt-0">
                        <div ref={imageRef} className="relative opacity-0 max-w-full">

                            {/* Corner accent lines */}
                            <div
                                className="absolute -top-2 -right-2 w-5 h-5 pointer-events-none z-10"
                                style={{ borderTop: "1px solid var(--accent)", borderRight: "1px solid var(--accent)" }}
                                aria-hidden="true"
                            />
                            <div
                                className="absolute -bottom-2 -left-2 w-5 h-5 pointer-events-none z-10"
                                style={{ borderBottom: "1px solid var(--accent)", borderLeft: "1px solid var(--accent)" }}
                                aria-hidden="true"
                            />

                            {/*
                             * Portrait frame — this is the interactive zone.
                             * data-cursor="portrait" tells Cursor.tsx to grow the ring.
                             */}
                            <div
                                ref={frameRef}
                                data-cursor="portrait"
                                className="relative overflow-hidden gpu-accelerated max-w-[100vw]"
                                style={{
                                    width: "clamp(200px, 40vw, 320px)",
                                    height: "clamp(240px, 48vw, 400px)",
                                    border: "1px solid var(--border-hi)",
                                    cursor: "none",
                                }}
                                aria-label="Portrait of Nishant Unavane"
                            >
                                {/* ── Layer 0: Base — NIGHT photo (grayscale) ── */}
                                <Image
                                    src="/ASSETS/NISHANT-NIGHT.jpeg"
                                    alt="Nishant Unavane — Full-Stack Developer"
                                    fill
                                    className="object-cover object-top"
                                    style={{ filter: "grayscale(100%) brightness(0.9)" }}
                                    priority
                                    sizes="(max-width: 480px) 200px, (max-width: 768px) 40vw, 320px"
                                    draggable={false}
                                />

                                {/* ── Layer 1: Bamboo reveal — mask-image radial-gradient (soft faded edges) ── */}
                                <div
                                    ref={lensRef}
                                    className="absolute inset-0 gpu-accelerated"
                                    style={{
                                        // mask-image is written dynamically by applyMask() via GSAP
                                        // Initial state: fully transparent (radius = 0)
                                        maskImage: "radial-gradient(circle 0px at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 100%)",
                                        WebkitMaskImage: "radial-gradient(circle 0px at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 100%)",
                                    }}
                                    aria-hidden="true"
                                >
                                    <Image
                                        src="/ASSETS/NISHANT-BAMBOO.jpeg"
                                        alt=""
                                        fill
                                        className="object-cover object-top"
                                        sizes="(max-width: 480px) 200px, (max-width: 768px) 40vw, 320px"
                                        priority
                                        draggable={false}
                                    />
                                </div>

                                {/* ── Layer 2: Lens glow ring (decorative) — positioned via GSAP x/y ── */}
                                <div
                                    ref={lensGlowRef}
                                    className="absolute pointer-events-none gpu-accelerated"
                                    style={{
                                        width: LENS_RADIUS * 2,
                                        height: LENS_RADIUS * 2,
                                        top: 0,
                                        left: 0,
                                        border: "1.5px solid rgba(255,255,255,0.28)",
                                        boxShadow: "0 0 24px 4px rgba(255,255,255,0.08), inset 0 0 12px 2px rgba(255,255,255,0.04)",
                                        borderRadius: "50%",
                                        opacity: 0,
                                        transform: "scale(0.5)",
                                    }}
                                    aria-hidden="true"
                                />

                                {/* Scanline / grain overlay for texture */}
                                <div
                                    className="absolute inset-0 pointer-events-none"
                                    style={{
                                        background: "repeating-linear-gradient(0deg, rgba(0,0,0,0.04) 0px, rgba(0,0,0,0.04) 1px, transparent 1px, transparent 3px)",
                                        mixBlendMode: "multiply",
                                    }}
                                    aria-hidden="true"
                                />
                            </div>

                            {/* Caption strip below portrait */}
                            <div
                                className="flex flex-wrap items-center justify-between gap-2 px-0 mt-3"
                                style={{ color: "var(--color-muted-ash)" }}
                            >
                                <span className="text-mono flex-shrink-0" style={{ fontSize: "10px", letterSpacing: "0.12em" }}>
                                    NISHANT UNAVANE
                                </span>
                                <span className="text-mono flex-shrink-0" style={{ fontSize: "10px", letterSpacing: "0.08em" }}>
                                    ©&thinsp;2024
                                </span>
                            </div>
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
                role="button"
                aria-label="Scroll to next section"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && window.scrollBy({ top: window.innerHeight, behavior: "smooth" })}
            >
                <span className="text-mono group-hover:text-[var(--fg)]" style={{ transition: "color 0.3s ease !important" }}>
                    Scroll
                </span>
                <div className="relative h-8 w-px overflow-hidden" style={{ background: "var(--border-hi)" }}>
                    <div
                        className="absolute top-0 left-0 w-full h-full animate-scroll-cue"
                        style={{ background: "var(--accent)" }}
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero;
