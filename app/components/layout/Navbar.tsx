"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
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
  const pathname = usePathname();
  const { navigate } = usePageTransition();

  const stableId = useId();

  const imperfection = useMemo(() => {
    // Deterministic “random” so React purity/lint stays happy, but the UI still feels imperfect.
    const hash32 = (s: string) => {
      let h = 2166136261;
      for (let i = 0; i < s.length; i++) {
        h ^= s.charCodeAt(i);
        h = Math.imul(h, 16777619);
      }
      return h >>> 0;
    };

    const h1 = hash32(stableId);
    const h2 = hash32(`${stableId}-y`);

    const x = ((h1 % 1000) / 1000 - 0.5) * 1.5;
    const y = ((h2 % 1000) / 1000 - 0.5) * 1.5;
    return { x, y };
  }, [stableId]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    navigate(href);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[9999] bg-white border-b border-black ${
          scrolled ? "" : ""
        }`}
        style={{ transform: `translate(${imperfection.x}px, ${imperfection.y}px)` }}
      >
        <div className="section-container flex items-center justify-between h-[55px]">
          {/* Brand */}
          <button
            onClick={() => handleNav("/")}
            className="text-[14px] leading-[1.4] font-normal text-black px-[20px] py-[5px] border-b border-transparent hover:border-black"
            aria-label="Go to home"
          >
            Nishant Unavane
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center justify-center gap-[10px] flex-1">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;
              return (
                <button
                  key={item.href}
                  onClick={() => handleNav(item.href)}
                  className={`text-[14px] leading-[1.4] font-normal text-black px-[20px] py-[5px] border-b transition-[border-color] duration-200 ${
                    active ? "border-black" : "border-transparent hover:border-black"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden w-10 h-10 flex items-center justify-center border border-black text-black"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile panel */}
      <div
        className={`fixed inset-0 z-[9998] bg-white md:hidden transition-opacity duration-200 ${
          mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!mobileOpen}
      >
        <div className="h-[55px] border-b border-black" />
        <div className="section-container py-10 flex flex-col gap-4">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <button
                key={item.href}
                onClick={() => handleNav(item.href)}
                className={`text-[30px] leading-[1.4] font-normal text-left border-b pb-2 ${
                  active ? "border-black" : "border-transparent hover:border-black"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
