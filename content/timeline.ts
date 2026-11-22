// content/timeline.ts — Timeline entries strictly from CONTENT.md §7

export interface TimelineEntry {
  years: string;
  title: string;
  body: string;
}

export const timeline: TimelineEntry[] = [
  {
    years: "2024 — Present",
    title: "Full-Stack Developer",
    body: "Building modern web applications with React, Next.js and TypeScript. Creating VS Code extensions that improve developer productivity.",
  },
  {
    years: "2023",
    title: "Frontend Developer",
    body: "Modern frontend frameworks and tooling. Started contributing to open source and building developer tools.",
  },
  {
    years: "2022",
    title: "Learning journey",
    body: "Learned JavaScript and React, built projects to solidify fundamentals.",
  },
];
