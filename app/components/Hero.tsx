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

            {/* Geometric SVG Background */}
            <HeroGeometry />

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
                        <div ref={labelRef} className="flex items-center gap-3 mb-10 opacity-0">
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
                        <div ref={ctaRef} className="flex flex-wrap items-center gap-3 opacity-0">
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
                                className="btn-ghost-primary"
                            >
                                View résumé
                            </a>
                        </div>
                    </div>

                    {/* ── Right: Profile image ── */}
                    <div className="order-first lg:order-last flex justify-center lg:justify-end">
                        <div ref={imageRef} className="relative opacity-0">
                            {/* Image frame */}
                            <a
                                href="https://github.com/IamNishant51"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative block"
                                style={{
                                    width: "clamp(180px, 40vw, 300px)",
                                    height: "clamp(180px, 40vw, 300px)",
                                    border: "1px solid var(--border-hi)",
                                }}
                                aria-label="View GitHub profile"
                            >
                                <Image
                                    src="https://ik.imagekit.io/9pfz6g8ri/avatars/nishant.jpg"
                                    alt="Nishant Unavane — Full-Stack Developer"
                                    fill
                                    className="object-cover grayscale group-hover:grayscale-0"
                                    style={{ transition: "filter 0.7s ease !important" }}
                                    priority
                                    sizes="(max-width: 480px) 180px, (max-width: 768px) 40vw, 300px"
                                />
                                {/* Hover overlay */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100"
                                    style={{
                                        background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%)",
                                        transition: "opacity 0.5s ease !important",
                                    }}
                                />
                            </a>
                            {/* Corner accent lines */}
                            <div
                                className="absolute -top-2 -right-2 w-5 h-5 pointer-events-none"
                                style={{ borderTop: "1px solid var(--accent)", borderRight: "1px solid var(--accent)" }}
                                aria-hidden="true"
                            />
                            <div
                                className="absolute -bottom-2 -left-2 w-5 h-5 pointer-events-none"
                                style={{ borderBottom: "1px solid var(--accent)", borderLeft: "1px solid var(--accent)" }}
                                aria-hidden="true"
                            />
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
