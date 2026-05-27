"use client";

import { useEffect, useId, useMemo, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import { usePageTransition } from "./TransitionLayout";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/skills" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();
  const { navigate } = usePageTransition();
  const navRef = useRef<HTMLElement>(null);
  const lastY = useRef(0);
  const stableId = useId();

  /* Deterministic sub-pixel imperfection */
  const imperfection = useMemo(() => {
    const h = (s: string) => {
      let n = 2166136261;
      for (let i = 0; i < s.length; i++) { n ^= s.charCodeAt(i); n = Math.imul(n, 16777619); }
      return n >>> 0;
    };
    const x = ((h(stableId) % 1000) / 1000 - 0.5) * 0.8;
    const y = ((h(`${stableId}-y`) % 1000) / 1000 - 0.5) * 0.8;
    return { x, y };
  }, [stableId]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setHidden(y > lastY.current && y > 120);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* GSAP hide/show */
  useEffect(() => {
    if (!navRef.current) return;
    gsap.to(navRef.current, {
      y: hidden ? -80 : 0,
      duration: 0.5,
      ease: hidden ? "power3.in" : "power3.out",
    });
  }, [hidden]);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    navigate(href);
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-[9999]"
        style={{
          transform: `translate(${imperfection.x}px, ${imperfection.y}px)`,
          background: scrolled
            ? "rgba(12, 12, 11, 0.85)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          borderBottom: scrolled ? "1px solid var(--border-hi)" : "1px solid transparent",
          transition: "background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease !important",
        }}
      >
        <div className="section-container flex items-center justify-between h-[60px]">
          {/* Brand */}
          <button
            onClick={() => handleNav("/")}
            className="text-mono hover-line font-mono"
            style={{ color: "var(--fg)" }}
            aria-label="Go to home"
          >
            nishant
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;
              return (
                <button
                  key={item.href}
                  onClick={() => handleNav(item.href)}
                  className="relative px-4 py-2 text-body-sm font-mono group"
                  style={{
                    color: active ? "var(--fg)" : "var(--color-muted-ash)",
                  }}
                >
                  {item.label}
                  <span
                    className="absolute bottom-1 left-4 right-4 h-px origin-left"
                    style={{
                      background: "var(--fg)",
                      transform: active ? "scaleX(1)" : "scaleX(0)",
                      transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1) !important",
                    }}
                  />
                  <span
                    className="absolute bottom-1 left-4 right-4 h-px origin-left scale-x-0 group-hover:scale-x-100"
                    style={{
                      background: "rgba(255, 255, 255, 0.2)",
                      transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1) !important",
                    }}
                  />
                </button>
              );
            })}
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <a
              href="mailto:nishant.unavane@outlook.com"
              className="hidden md:flex items-center gap-2 px-4 py-2 text-body-sm font-mono btn-ghost-primary"
            >
              Get in touch
            </a>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden w-10 h-10 flex items-center justify-center"
              style={{ border: "1px solid var(--border-hi)", color: "var(--fg)" }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile panel */}
      <div
        className={`fixed inset-0 z-[9998] md:hidden flex flex-col`}
        style={{
          background: "var(--bg)",
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "auto" : "none",
          transition: "opacity 0.3s ease !important",
        }}
        aria-hidden={!mobileOpen}
      >
        <div className="h-[60px]" style={{ borderBottom: "1px solid var(--border-hi)" }} />
        <div className="section-container py-12 flex flex-col gap-2 flex-1">
          {NAV_ITEMS.map((item, i) => {
            const active = pathname === item.href;
            return (
              <button
                key={item.href}
                onClick={() => handleNav(item.href)}
                className="text-left py-4 text-h3 font-bold"
                style={{
                  color: active ? "var(--fg)" : "var(--color-muted-ash)",
                  borderBottom: "1px solid var(--border-hi)",
                  transitionDelay: mobileOpen ? `${i * 40}ms` : "0ms",
                  transform: mobileOpen ? "translateX(0)" : "translateX(-20px)",
                  opacity: mobileOpen ? 1 : 0,
                  transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease !important",
                }}
              >
                <span className="text-mono mr-4" style={{ color: "var(--fg)" }}>
                  0{i + 1}
                </span>
                {item.label}
              </button>
            );
          })}

          <a
            href="mailto:nishant.unavane@outlook.com"
            className="mt-8 px-8 py-4 text-center font-semibold text-sm text-mono btn-ghost-primary"
          >
            Get in touch
          </a>
        </div>
      </div>
    </>
  );
}
