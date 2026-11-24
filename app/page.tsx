import { Act01Arrival } from "@/components/acts/Act01Arrival";
import { LandingProjectsSection } from "@/components/landing/LandingProjectsSection";
import { Act04Sea } from "@/components/acts/Act04Sea";
import { LandingAboutSection } from "@/components/about/LandingAboutSection";
import { Act05Studio } from "@/components/acts/Act05Studio";
import { Act06Horizon } from "@/components/acts/Act06Horizon";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* Act 01: Arrival — open sky */}
      <Act01Arrival />

      {/* Act 03: Selected Work & Projects — Hand-crafted archive poster */}
      <LandingProjectsSection />

      {/* Act 04: The Sea — Smaller boats / experiments & side projects */}
      <Act04Sea />

      {/* Act 04.5: Iconography & Identity — Nishant's Artworks */}
      <LandingAboutSection />

      {/* Act 05: The Studio — the person, method, timeline */}
      <Act05Studio />

      {/* Act 06: The Horizon — contact & editorial footer */}
      <Act06Horizon />
    </div>
  );
}
