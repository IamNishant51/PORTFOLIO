import type { Metadata } from "next";
import Link from "next/link";
import { getAllWorks, projects } from "@/content/projects";
import { experiments } from "@/content/experiments";
import { ProjectsCatalogue } from "@/components/projects/ProjectsCatalogue";

export const metadata: Metadata = {
  title: "Projects & Experiments — Nishant Unavane · Portfolio 2027",
  description: `A collection of ${projects.length} flagship autonomous systems, memory infrastructure, and ${experiments.length} developer tools & visual experiments built by Nishant Unavane.`,
  alternates: {
    canonical: "https://nishantunavane.qzz.io/projects",
  },
  openGraph: {
    title: "Projects & Selected Works — Nishant Unavane",
    description:
      "Flagship coding agents, cognitive memory graphs, VS Code context engines, and experimental motion primitives.",
    images: [
      "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/08-project-shots/all-projects.webp",
    ],
  },
};

export default function ProjectsPage() {
  const allWorks = getAllWorks();
  const flagshipWorks = allWorks.slice(0, projects.length);
  const experimentWorks = allWorks.slice(projects.length);

  return (
    <div className="min-h-screen bg-paper text-ink selection:bg-paper-edge selection:text-ink pt-28 sm:pt-36 pb-20 sm:pb-28">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col gap-12 md:gap-16">
        {/* Top Utility Strip */}
        <div className="flex items-center justify-between border-b border-hairline pb-4">
          <Link
            href="/#work"
            className="meta-label text-ink hover:text-ink-soft transition-colors inline-flex items-center gap-2 py-2 pr-3 min-h-[44px]"
          >
            <span aria-hidden="true">←</span>
            <span>BACK TO PORTFOLIO</span>
          </Link>
          <span className="font-serif text-xl sm:text-2xl text-muted tabular-nums">
            {String(allWorks.length).padStart(2, "0")}
          </span>
        </div>

        {/* Summary Metrics Strip */}
        <header className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 pb-8 border-b border-hairline">
          <div className="flex flex-col gap-1">
            <span className="numeral text-ink">
              {String(projects.length).padStart(2, "0")}
            </span>
            <span className="meta-label text-muted">FLAGSHIP SYSTEMS</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="numeral text-ink">
              {String(experiments.length).padStart(2, "0")}
            </span>
            <span className="meta-label text-muted">FIELD EXPERIMENTS</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="numeral text-ink">10,340+</span>
            <span className="meta-label text-muted">COMMUNITY DOWNLOADS</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="numeral text-ink">100%</span>
            <span className="meta-label text-muted">LOCAL-FIRST CAPABLE</span>
          </div>
        </header>

        {/* Interactive Swiss Catalogue (Shadcn Card + React Bits Magnet + Filter/Index) */}
        <ProjectsCatalogue
          flagships={flagshipWorks}
          experiments={experimentWorks}
        />

        {/* Footer Strip */}
        <footer className="w-full border-t border-hairline pt-8 mt-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 meta-label text-muted">
            <div className="flex items-center gap-4">
              <Link
                href="/#work"
                className="text-ink hover:text-ink-soft transition-colors flex items-center gap-1 py-2 min-h-[44px]"
              >
                <span aria-hidden="true">←</span>
                <span>HOME / SELECTED WORK</span>
              </Link>
              <span aria-hidden="true">·</span>
              <Link href="/about" className="hover:text-ink transition-colors py-2 min-h-[44px] flex items-center">
                ABOUT
              </Link>
              <span aria-hidden="true">·</span>
              <Link href="/colophon" className="hover:text-ink transition-colors py-2 min-h-[44px] flex items-center">
                COLOPHON
              </Link>
            </div>
            <span>© 2027 NISHANT UNAVANE · PUNE, IN</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
