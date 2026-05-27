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
  { label: "Contact", href: "/contact" },
] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();
  const { navigate } = usePageTransition();
  const navRef = useRef<HTMLElement>(null);
  const mobileItemsRef = useRef<HTMLDivElement>(null);
  const lastY = useRef(0);
  const stableId = useId();

  /* Deterministic sub-pixel imperfection */
  const imperfection = useMemo(() => {
    const h = (s: string) => {
      let n = 2166136261;
      for (let i = 0; i < s.length; i++) { n ^= s.charCodeAt(i); n = Math.imul(n, 16777619); }
      return n >>> 0;
    };
    const x = ((h(stableId) % 1000) / 1000 - 0.5) * 0.6;
    const y = ((h(`${stableId}-y`) % 1000) / 1000 - 0.5) * 0.6;
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
      duration: 0.45,
      ease: hidden ? "power3.in" : "power3.out",
    });
  }, [hidden]);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  /* GSAP stagger animate mobile items */
  useEffect(() => {
    if (!mobileItemsRef.current) return;
    const items = Array.from(mobileItemsRef.current.children);
    if (mobileOpen) {
      gsap.fromTo(items,
        { x: -24, opacity: 0 },
        {
          x: 0, opacity: 1,
          stagger: 0.05,
          duration: 0.45,
          ease: "power3.out",
          delay: 0.05,
        }
      );
    } else {
      gsap.to(items, { x: -12, opacity: 0, stagger: 0.03, duration: 0.2, ease: "power2.in" });
    }
  }, [mobileOpen]);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    
    // If clicking home while already on home, scroll to top
    if (href === "/") {
      if (pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
    }

    if (href === "/contact") {
      if (pathname === "/") {
        const contactSection = document.getElementById("contact");
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: "smooth" });
          return;
        }
      } else {
        navigate("/#contact");
        return;
      }
    }
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
            ? "rgba(12, 12, 11, 0.88)"
            : "transparent",
          backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
          borderBottom: scrolled ? "1px solid var(--border-hi)" : "1px solid transparent",
          transition: "background 0.4s ease, border-color 0.4s ease !important",
        }}
        aria-label="Main navigation"
      >
        <div className="section-container flex items-center justify-between" style={{ height: "clamp(52px, 8vw, 64px)" }}>
          {/* Brand */}
          <button
            onClick={() => handleNav("/")}
            className="text-mono hover-line font-mono"
            style={{ color: "var(--fg)", fontSize: "var(--text-caption)" }}
            aria-label="Go to home"
          >
            nishant
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1" role="list">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;
              return (
                <button
                  key={item.href}
                  onClick={() => handleNav(item.href)}
                  className="relative px-4 py-2 text-body-sm font-mono group"
                  role="listitem"
                  aria-current={active ? "page" : undefined}
                  style={{
                    color: active ? "var(--fg)" : "var(--color-muted-ash)",
                  }}
                >
                  {item.label}
                  {/* Active indicator */}
                  <span
                    className="absolute bottom-1 left-4 right-4 h-px origin-left"
                    style={{
                      background: "var(--fg)",
                      transform: active ? "scaleX(1)" : "scaleX(0)",
                      transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1) !important",
                    }}
                  />
                  {/* Hover indicator */}
                  <span
                    className="absolute bottom-1 left-4 right-4 h-px origin-left scale-x-0 group-hover:scale-x-100"
                    style={{
                      background: "rgba(255, 255, 255, 0.18)",
                      transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1) !important",
                    }}
                  />
                </button>
              );
            })}
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNav("/contact")}
              className="hidden md:flex items-center gap-2 btn-ghost-primary text-body-sm font-mono cursor-pointer"
              style={{ padding: "8px 16px" }}
            >
              Get in touch
            </button>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden flex items-center justify-center"
              style={{
                width: "44px",
                height: "44px",
                border: "1px solid var(--border-hi)",
                color: "var(--fg)",
                background: "transparent",
                cursor: "pointer",
              }}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-panel"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile panel */}
      <div
        id="mobile-nav-panel"
        className="fixed inset-0 z-[9998] md:hidden flex flex-col"
        style={{
          background: "var(--bg)",
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "auto" : "none",
          transition: "opacity 0.3s ease !important",
        }}
        aria-hidden={!mobileOpen}
        role="dialog"
        aria-modal={mobileOpen}
        aria-label="Mobile navigation"
      >
        {/* Spacer for nav height */}
        <div
          style={{
            height: "clamp(52px, 8vw, 64px)",
            borderBottom: "1px solid var(--border-hi)",
          }}
        />

        <div
          className="section-container py-10 flex flex-col flex-1 overflow-y-auto"
          style={{ paddingBottom: "max(2.5rem, env(safe-area-inset-bottom))" }}
        >
          {/* Nav items with GSAP stagger */}
          <div ref={mobileItemsRef} className="flex flex-col gap-0">
            {NAV_ITEMS.map((item, i) => {
              const active = pathname === item.href;
              return (
                <button
                  key={item.href}
                  onClick={() => handleNav(item.href)}
                  className="text-left py-5"
                  style={{
                    color: active ? "var(--fg)" : "var(--color-muted-ash)",
                    borderBottom: "1px solid var(--border-hi)",
                    fontSize: "clamp(1.25rem, 4vw, 1.75rem)",
                    letterSpacing: "-0.02em",
                    fontWeight: 400,
                    opacity: 0, // starts hidden, GSAP animates in
                  }}
                  aria-current={active ? "page" : undefined}
                >
                  <span className="text-mono mr-4" style={{ color: "var(--accent)" }}>
                    0{i + 1}
                  </span>
                  {item.label}
                </button>
              );
            })}
          </div>

        </div>
      </div>
    </>
  );
}
