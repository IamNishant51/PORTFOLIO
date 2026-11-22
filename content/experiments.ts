// content/experiments.ts — Secondary work from CONTENT.md

export interface Experiment {
  title: string;
  tag: string;
  line: string;
  url: string;
  image?: string;
}

export const experiments: Experiment[] = [
  {
    title: "atlas-mcp-server",
    tag: "Developer workflows",
    line: "Workflow orchestration engine operating over the Model Context Protocol.",
    url: "https://github.com/IamNishant51/atlas-mcp-server",
    image: "/assets/08-project-shots/atlas-mcp.webp",
  },
  {
    title: "frame",
    tag: "React / motion primitives",
    line: "Fluidly animated React components and composable physics-based motion primitives.",
    url: "https://framejs.vercel.app",
    image: "/assets/08-project-shots/frame-js.webp",
  },
  {
    title: "Three.JS-Book",
    tag: "React / Three.js / R3F",
    line: "A browser-based photorealistic 3D book with interactive spatial page turning and dynamic cloth mesh physics.",
    url: "https://github.com/IamNishant51/Three.JS-Book",
    image: "/assets/08-project-shots/three-js-book.webp",
  },
];
