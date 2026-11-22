// content/capabilities.ts — Four disciplines for the colonnade section
// Strictly from CONTENT.md §5

export interface Capability {
  numeral: string;
  discipline: string;
  technologies: string;
  line: string;
}

export const capabilities: Capability[] = [
  {
    numeral: "I",
    discipline: "Interface",
    technologies: "React 19 / Next.js / Tailwind CSS",
    line: "Tactile, responsive, typographic interfaces with micro-interactions and rigorous accessible foundations.",
  },
  {
    numeral: "II",
    discipline: "System",
    technologies: "Node.js / TypeScript / Fastify / Python",
    line: "Strongly-typed server runtimes, high-throughput microservices, local SQLite caches, developer tooling.",
  },
  {
    numeral: "III",
    discipline: "Movement",
    technologies: "GSAP / Three.js / WebGL / Shaders",
    line: "Scroll-driven kinetic choreography, inertial canvas physics, procedural 3D simulations that serve narrative clarity.",
  },
  {
    numeral: "IV",
    discipline: "Intelligence",
    technologies: "AI agents / MCP / Ollama / Cognee",
    line: "Multi-agent reasoning, Model Context Protocol pipelines, graph memory, private on-device intelligence.",
  },
];
