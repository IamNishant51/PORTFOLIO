"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { profile } from "@/content/profile";

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("arrival");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 30);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // IntersectionObserver for active section detection (zero layout reflow)
    const sections = ["arrival", "work", "sea", "about", "studio", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-72px 0px -70% 0px" }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  // Lock body scroll and pause Lenis when mobile sheet is open
  useEffect(() => {
    const lenis = (window as any).lenis;
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      lenis?.stop();
    } else {
      document.body.style.overflow = "";
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [mobileMenuOpen]);

  const isDark = false;

  // Transparent nav bar that seamlessly blends with the active section background
  const navBg = mobileMenuOpen
    ? "bg-paper border-b border-hairline/60"
    : scrolled
    ? "bg-transparent backdrop-blur-md border-b border-hairline/40"
    : "bg-transparent border-b border-transparent";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 h-[72px] z-50 transition-all duration-calm ${navBg}`}
      >
        <div className="max-w-[1440px] mx-auto h-full px-6 md:px-12 flex items-center justify-between">
        {/* Left: Brand Monogram + Name */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus-visible:outline-ink focus-visible:outline-2"
          aria-label={`${profile.name} — Home`}
        >
          <span
            className={`relative w-7 h-7 flex items-center justify-center border rounded-xs transition-colors ${
              isDark
                ? "border-white/20 bg-white/10 group-hover:border-white"
                : "border-hairline-strong bg-paper-edge group-hover:border-ink"
            }`}
          >
            <Image
              src="https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/09-brand/monogram.svg"
              alt=""
              width={16}
              height={16}
              className={`w-4 h-4 transition-all ${isDark ? "brightness-200" : ""}`}
              priority
            />
          </span>
          <span
            className={`meta-label tracking-[0.2em] font-medium text-[0.75rem] transition-colors ${
              isDark ? "text-on-dark" : "text-ink"
            }`}
          >
            {profile.name}
          </span>
        </Link>

        {/* Center: Editorial Nav Links (Desktop) */}
        <nav
          className="hidden md:flex items-center gap-6 lg:gap-8 text-[0.875rem] font-medium text-ink transition-colors"
          aria-label="Primary navigation"
        >
          <a
            href={pathname === "/" ? "#work" : "/#work"}
            className={`transition-colors duration-hoverIn py-2 ${
              activeSection === "work" && pathname === "/"
                ? "text-ink underline underline-offset-4"
                : "text-ink-soft hover:text-ink"
            }`}
          >
            Work
          </a>
          <Link
            href="/projects"
            className={`transition-colors duration-hoverIn py-2 ${
              pathname === "/projects"
                ? "text-ink underline underline-offset-4"
                : "text-ink-soft hover:text-ink"
            }`}
          >
            Projects
          </Link>
          <a
            href={pathname === "/" ? "#about" : "/#about"}
            className={`transition-colors duration-hoverIn py-2 ${
              pathname === "/about" || (activeSection === "about" && pathname === "/")
                ? "text-ink underline underline-offset-4"
                : "text-ink-soft hover:text-ink"
            }`}
          >
            About
          </a>
          <a
            href={pathname === "/" ? "#studio" : "/#studio"}
            className={`transition-colors duration-hoverIn py-2 ${
              activeSection === "studio" && pathname === "/"
                ? "text-ink underline underline-offset-4"
                : "text-ink-soft hover:text-ink"
            }`}
          >
            Studio
          </a>
          <a
            href={pathname === "/" ? "#contact" : "/#contact"}
            className={`transition-colors duration-hoverIn py-2 ${
              activeSection === "contact" && pathname === "/"
                ? "text-ink underline underline-offset-4"
                : "text-ink-soft hover:text-ink"
            }`}
          >
            Contact
          </a>
        </nav>

        {/* Right: Resume Pill Button & Colophon Link */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/colophon"
            className={`meta-label transition-colors text-[0.6875rem] ${
              isDark ? "text-white/60 hover:text-white" : "text-muted hover:text-ink"
            }`}
          >
            Colophon
          </Link>
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center px-4 py-2 border rounded-pill text-[0.8125rem] font-medium transition-all ${
              isDark
                ? "border-white/25 text-on-dark hover:border-white hover:bg-white/10"
                : "border-hairline-strong text-ink hover:border-ink hover:bg-paper-soft"
            }`}
          >
            <span>Résumé</span>
            <span className="ml-1 text-[0.75rem]" aria-hidden="true">
              ↗
            </span>
          </a>
        </div>

        {/* Mobile menu button (44x44px accessible touch target) */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`md:hidden flex flex-col justify-center items-center w-11 h-11 border rounded-xs focus-visible:outline-ink focus-visible:outline-2 transition-colors ${
            isDark
              ? "border-white/20 bg-white/10"
              : "border-hairline-strong bg-paper-soft"
          }`}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <span
            className={`block w-4 h-[1.5px] transition-all duration-standard ${
              isDark ? "bg-on-dark" : "bg-ink"
            } ${mobileMenuOpen ? "rotate-45 translate-y-[3.5px]" : "mb-1"}`}
          />
          <span
            className={`block w-4 h-[1.5px] transition-all duration-standard ${
              isDark ? "bg-on-dark" : "bg-ink"
            } ${mobileMenuOpen ? "-rotate-45 -translate-y-[2px]" : ""}`}
          />
        </button>
      </div>
    </header>

    {/* Mobile paper sheet navigation overlay - rendered outside header containing block */}
    {mobileMenuOpen && (
      <div
        className={`md:hidden fixed inset-x-0 top-[72px] bottom-0 z-50 flex flex-col px-8 py-8 border-t overflow-y-auto pb-[calc(2.5rem+env(safe-area-inset-bottom))] transition-colors ${
          isDark ? "bg-navy text-on-dark border-white/15" : "bg-paper text-ink border-hairline"
        }`}
        style={{ height: "calc(100dvh - 72px)", maxHeight: "calc(100dvh - 72px)" }}
      >
          <div
            className={`meta-label mb-6 tracking-[0.2em] ${
              isDark ? "text-white/50" : "text-muted"
            }`}
          >
            NAVIGATION
          </div>
          <nav className="flex flex-col text-2xl font-serif">
            <a
              href={pathname === "/" ? "#work" : "/#work"}
              onClick={() => setMobileMenuOpen(false)}
              className={`py-3 transition-colors border-b flex items-center min-h-[48px] ${
                activeSection === "work" && pathname === "/"
                  ? "text-terracotta font-semibold border-hairline/40"
                  : isDark
                  ? "text-on-dark hover:text-white border-white/10"
                  : "text-ink hover:text-terracotta border-hairline/40"
              }`}
            >
              Selected Work
            </a>
            <Link
              href="/projects"
              onClick={() => setMobileMenuOpen(false)}
              className={`py-3 transition-colors border-b flex items-center min-h-[48px] ${
                pathname === "/projects"
                  ? "text-ink font-semibold border-hairline/40"
                  : "text-ink hover:text-ink-soft border-hairline/40"
              }`}
            >
              Projects Archive
            </Link>
            <a
              href={pathname === "/" ? "#studio" : "/#studio"}
              onClick={() => setMobileMenuOpen(false)}
              className={`py-3 transition-colors border-b flex items-center min-h-[48px] ${
                isDark
                  ? "text-on-dark hover:text-white border-white/10"
                  : "text-ink hover:text-terracotta border-hairline/40"
              }`}
            >
              The Studio
            </a>
            <a
              href={pathname === "/" ? "#about" : "/#about"}
              onClick={() => setMobileMenuOpen(false)}
              className={`py-3 transition-colors border-b flex items-center min-h-[48px] ${
                pathname === "/about" || activeSection === "about"
                  ? "text-terracotta font-semibold border-hairline/40"
                  : isDark
                  ? "text-on-dark hover:text-white border-white/10"
                  : "text-ink hover:text-terracotta border-hairline/40"
              }`}
            >
              About Me
            </a>
            <a
              href={pathname === "/" ? "#contact" : "/#contact"}
              onClick={() => setMobileMenuOpen(false)}
              className={`py-3 transition-colors border-b flex items-center min-h-[48px] ${
                isDark
                  ? "text-on-dark hover:text-white border-white/10"
                  : "text-ink hover:text-terracotta border-hairline/40"
              }`}
            >
              Contact
            </a>
            <Link
              href="/colophon"
              onClick={() => setMobileMenuOpen(false)}
              className={`py-3 transition-colors flex items-center min-h-[48px] ${
                isDark ? "text-on-dark hover:text-white" : "text-ink hover:text-terracotta"
              }`}
            >
              Colophon
            </Link>
          </nav>
          <div
            className={`mt-auto pt-8 border-t flex items-center justify-between ${
              isDark ? "border-white/15" : "border-hairline"
            }`}
          >
            <span
              className={`meta-label ${isDark ? "text-white/60" : "text-muted"}`}
            >
              {profile.location}
            </span>
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 meta-label text-terracotta font-medium py-2 px-3 -my-2 -mx-3 min-h-[44px]"
            >
              RÉSUMÉ ↗
            </a>
          </div>
        </div>
      )}
    </>
  );
}
