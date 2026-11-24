import type { Metadata } from "next";
import Link from "next/link";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutPlatesGallery } from "@/components/about/AboutPlatesGallery";
import { AboutBio } from "@/components/about/AboutBio";
import { AboutMetrics } from "@/components/about/AboutMetrics";
import { aboutData } from "@/content/about";

export const metadata: Metadata = {
  title: "About Me — Nishant Unavane · Portfolio 2027",
  description:
    "Biography, verified facts, engineering principles, and curated iconographic plates of Nishant Unavane, Full-Stack Developer & Agentic AI Systems Engineer.",
  alternates: {
    canonical: "https://nishantunavane.qzz.io/about",
  },
  openGraph: {
    title: "About Nishant Unavane — Portfolio 2027",
    description:
      "Full-stack developer and AI systems engineer based in Pune, India. 10,340+ community downloads, local-first coding agents, and tactile interfaces.",
    images: ["https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/about/plate-01-be-humble.webp"],
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-paper text-ink selection:bg-paper-edge selection:text-ink relative">
      <AboutHero />
      <AboutPlatesGallery />
      <AboutBio />
      <AboutMetrics />

      {/* Footer Colophon Strip */}
      <footer className="w-full border-t border-hairline py-8 bg-paper">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 meta-label text-[0.6875rem] text-muted">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-ink hover:text-terracotta transition-colors flex items-center gap-1"
            >
              <span>←</span>
              <span>INDEX / PORTFOLIO</span>
            </Link>
            <span aria-hidden="true">·</span>
            <Link href="/colophon" className="hover:text-ink transition-colors">
              COLOPHON
            </Link>
          </div>
          <div>
            <span>© 2027 {aboutData.name} · PUNE, IN</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
