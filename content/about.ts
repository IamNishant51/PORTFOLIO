// content/about.ts — Verified factual dossier and biography for Nishant Unavane
// Strict adherence to real metrics, verified links, and editorial guidelines.

export interface AboutPlate {
  id: string;
  plate: string;
  title: string;
  subtitle: string;
  medium: string;
  year: string;
  src: string;
  aspect: string;
  description: string;
  tags: string[];
}

export interface AboutData {
  name: string;
  dob: string;
  dobFormatted: string;
  age: number; // 21 in 2027 edition
  location: string;
  coordinates: string;
  role: string;
  status: string;
  emails: {
    primary: string;
    secondary: string;
  };
  socials: {
    github: string;
    devto: string;
    linkedin: string;
    portfolio: string;
  };
  bioLead: string;
  bioParagraphs: string[];
  metrics: {
    value: string;
    label: string;
    detail: string;
  }[];
  principles: {
    index: string;
    title: string;
    statement: string;
  }[];
  plates: AboutPlate[];
}

export const aboutData: AboutData = {
  name: "Nishant Unavane",
  dob: "2006-01-03",
  dobFormatted: "January 3, 2006",
  age: 21,
  location: "Pune, Maharashtra, India",
  coordinates: "18°31'12\" N · 73°51'22\" E",
  role: "Full-Stack Developer & Agentic AI Systems Engineer",
  status: "Open to high-impact technical roles & creative engineering collaborations",
  emails: {
    primary: "nishantunawne0007@gmail.com",
    secondary: "anonymouslucifer400@gmail.com",
  },
  socials: {
    github: "https://github.com/IamNishant51",
    devto: "https://dev.to/iamnishant51",
    linkedin: "https://www.linkedin.com/in/nishant-unavane-008291275/",
    portfolio: "https://nishantunavane.qzz.io",
  },
  bioLead:
    "An engineer who treats software like editorial printmaking: local-first runtimes, persistent cognitive graphs, and typography with architectural weight.",
  bioParagraphs: [
    "Born on January 3, 2006 in Pune, India, Nishant Unavane builds autonomous coding agents, VS Code context engines, and typographic web applications. His engineering centers on a simple conviction: tools should think with you, preserve privacy by default, and never waste a millisecond of your focus.",
    "Across published developer tools like Carto, Ollama Agent, and the Atlas MCP Server (33 tools in one runtime), his software has earned over 10,340 community downloads and active use by engineers demanding offline-first autonomy.",
    "His interface craft balances classical proportion with modern runtime mechanics: fluid GSAP scroll choreographies, Three.js spatial simulations, and rigorous Next.js architectures that load instantly and perform without drift.",
  ],
  metrics: [
    {
      value: "10,340+",
      label: "Community Downloads",
      detail: "Across VS Code Marketplace, npm packages, and developer extensions",
    },
    {
      value: "4+",
      label: "Published Extensions",
      detail: "Carto context bundle, Ollama Agent, Lucifer Dark, and Custom-PI runtime",
    },
    {
      value: "15+",
      label: "Shipped Projects",
      detail: "Full-stack web applications, MCP servers, and local AI agent architectures",
    },
    {
      value: "21",
      label: "Years of Age",
      detail: "Born January 3, 2006 · Pune, India",
    },
  ],
  principles: [
    {
      index: "01",
      title: "Local-First Cognition",
      statement:
        "Inference, context building, and state belong on your machine. Cloud APIs should be an option, not a prerequisite for intelligence.",
    },
    {
      index: "02",
      title: "Memory Over Storage",
      statement:
        "Agents do not need larger context dumps; they need cognitive memory graphs that resolve conflicts, track temporal state, and learn over time.",
    },
    {
      index: "03",
      title: "Tactile Editorial Restraint",
      statement:
        "Restrain the chrome. Prioritize high-contrast typography, strict mathematical geometry, and responsive physics over cosmetic noise.",
    },
  ],
  plates: [
    {
      id: "plate-01",
      plate: "PLATE I",
      title: "Be Humble",
      subtitle: "Ochre paper fold with star-visor profile & bold condensed typography",
      medium: "Vintage ochre screenprint, folded stock texture & graphic overlay",
      year: "2027",
      src: "/assets/about/plate-01-be-humble.webp",
      aspect: "aspect-[3/4]",
      description:
        "A reminder that true strength lies in humility. Profile study featuring bold condensed typography 'BE HUMBLE', archival paper fold textures, and graphic star eyewear.",
      tags: ["Typography", "Paper Fold", "Screenprint", "Profile"],
    },
    {
      id: "plate-02",
      plate: "PLATE II",
      title: "Alternate",
      subtitle: "Deep crimson poster with flared neoclassical serif display",
      medium: "Crimson wash, custom flared display typography & halo vignette",
      year: "2027",
      src: "/assets/about/plate-02-alternate.webp",
      aspect: "aspect-[3/4]",
      description:
        "Neoclassical editorial study with flared organic serif typography 'ALTERNATE' towering over a poised standing portrait in earth tones.",
      tags: ["Serif Display", "Crimson", "Editorial", "Portrait"],
    },
    {
      id: "plate-03",
      plate: "PLATE III",
      title: "The Developer",
      subtitle: "Lilac botanical collage with crimson visor bar & mirror portrait",
      medium: "Monochrome silver-gelatin portrait, lilac field & botanical lily collage",
      year: "2027",
      src: "/assets/about/plate-03-the-developer.webp",
      aspect: "aspect-[3/4]",
      description:
        "High-contrast monochrome mirror study in biker leather, accented with an authoritative crimson visor bar, botanical lily crown, and dynamic typographic angles.",
      tags: ["Botanical", "Visor Bar", "Mirror Study", "Lilac"],
    },
    {
      id: "plate-04",
      plate: "PLATE IV",
      title: "Visual Study 2025",
      subtitle: "Modular crimson & black letterform mask with barcode register",
      medium: "Modular typeface grid mask, barcode register mark & studio portrait",
      year: "2027",
      src: "/assets/about/plate-05-visual-study.webp",
      aspect: "aspect-[3/4]",
      description:
        "Geometric typographic overlay study. The face of the developer fragmented through towering black and crimson 'NSHNT' letterforms with technical barcode alignment.",
      tags: ["Modular Type", "Grid Mask", "Barcode", "Graphic Design"],
    },
    {
      id: "plate-05",
      plate: "PLATE V",
      title: "Optical Monolith",
      subtitle: "Silver-gelatin portrait with horizontal luminous ocular bar",
      medium: "Silver-gelatin 35mm monochrome & luminous horizontal slit projection",
      year: "2027",
      src: "/assets/about/plate-06-monochrome-glare.webp",
      aspect: "aspect-[3/4]",
      description:
        "Surrealist monochrome apparatus. Studio portrait in heavy knitwear bisected by a floating rectangular luminous window exposing an inverted ocular gesture.",
      tags: ["Monochrome", "Surrealist", "Ocular Bar", "Studio"],
    },
    {
      id: "plate-06",
      plate: "PLATE VI",
      title: "New Arrivals",
      subtitle: "Sage & forest botanical contours with outline typography",
      medium: "Forest green botanical color fields, outline lettering & side profile",
      year: "2027",
      src: "/assets/about/plate-07-new-arrivals.webp",
      aspect: "aspect-[3/4]",
      description:
        "Fluid organic landscape study. Side profile with wireframe eyewear emerging through undulating sage and forest green curved shapes with layered 'NEW ARRIVALS' typography.",
      tags: ["Organic Shapes", "Sage & Forest", "Outline Type", "Profile"],
    },
  ],
};
