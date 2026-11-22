// content/profile.ts — Single source of truth for identity and stats
// Derived strictly from CONTENT.md. Do not edit without updating CONTENT.md.

export interface Profile {
  name: string;
  handle: string;
  rolePrimary: string;
  roleShort: string;
  location: string;
  status: string;
  email: string;
  github: string;
  linkedin: string;
  resumeUrl: string;
  positioning: string;
  subPositioning: string;
  stats: {
    value: string;
    label: string;
  }[];
  kanji: string;
  colophon: string;
  copyright: string;
}

export const profile: Profile = {
  name: "Nishant Unavane",
  handle: "IamNishant51",
  rolePrimary: "Full-Stack Developer & Agentic AI Systems Engineer",
  roleShort: "Full-Stack Developer",
  location: "Pune, India",
  status: "Available for high-impact roles & creative engineering",
  email: "nishantunawne0007@gmail.com",
  github: "https://github.com/IamNishant51",
  linkedin: "https://www.linkedin.com/in/nishant-unavane-008291275/",
  resumeUrl: "https://ik.imagekit.io/9pfz6g8ri/Nishant_Unavane_FullStack_resume.pdf",
  positioning: "I build interfaces, developer tools, coding agents, and the systems that connect them.",
  subPositioning: "Full-stack web applications, VS Code extensions, and autonomous agent systems engineered with Next.js, React 19, TypeScript, Three.js, and modern MCP tooling.",
  stats: [
    { value: "4+", label: "VS Code extensions" },
    { value: "15+", label: "Projects shipped" },
    { value: "2+", label: "Years coding" },
    { value: "10,340", label: "Community downloads" },
  ],
  kanji: "創",
  colophon: "Set in Instrument Serif & Geist. Built with Next.js, GSAP and Three.js.",
  copyright: "© 2027 Nishant Unavane",
};
