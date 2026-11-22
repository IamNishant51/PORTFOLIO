// content/projects.ts — Single source of truth for flagship projects
// Strictly from CONTENT.md. Do not invent or alter metrics.

export interface Project {
  id: string;
  index: string;
  slug: string;
  title: string;
  category: string;
  subtitle: string;
  description: string;
  stack: string[];
  proof: string[];
  links: {
    repo?: string;
    live?: string;
    marketplace?: string;
  };
  metrics: string;
  image?: string;
}

export const projects: Project[] = [
  {
    id: "01",
    index: "01",
    slug: "custom-pi",
    title: "Custom-PI",
    category: "Coding agent / local-first",
    subtitle: "Give the agent a working memory.",
    description: "A dual terminal and web platform for autonomous coding agents: persistent memory graph, multi-agent orchestration, browser automation, and MCP tool synthesis. Built on top of the Pi Coding Agent core.",
    stack: ["TypeScript", "Node.js", "Fastify", "React", "SQLite", "Playwright"],
    proof: ["4,458 npm downloads", "Persistent graph memory", "MCP protocol support"],
    metrics: "4,458 npm downloads",
    links: {
      repo: "https://github.com/IamNishant51/Custom-PI",
      live: "https://custom-pi-ai.vercel.app",
    },
    image: "/assets/08-project-shots/custom-pi.webp",
  },
  {
    id: "02",
    index: "02",
    slug: "synapse",
    title: "Synapse",
    category: "Memory / knowledge graph",
    subtitle: "Memory is more than storage.",
    description: "A Cognee-based cognitive memory dashboard engineered for continuous ingestion, entity conflict reconciliation, temporal state tracking, and 3D visual knowledge-graph traversal.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "FastAPI", "Python"],
    proof: ["Cognee-based ingestion", "Conflict reconciliation", "Temporal graph"],
    metrics: "Cognee-based ingestion",
    links: {
      repo: "https://github.com/IamNishant51/Synapse",
      live: "https://synapsememory.vercel.app",
    },
    image: "/assets/08-project-shots/synapse.webp",
  },
  {
    id: "03",
    index: "03",
    slug: "carto",
    title: "Carto",
    category: "VS Code / context engine",
    subtitle: "A codebase, unfolded.",
    description: "A production VS Code extension that digests an entire repository into structured, token-optimized Markdown context with file trees, architectural stack analysis, real-time diff preview, and LLM prompt generation.",
    stack: ["TypeScript", "VS Code Extension API", "AST parsers"],
    proof: ["Published on VS Code Marketplace", "Instant multi-file bundling"],
    metrics: "Published on VS Code Marketplace",
    links: {
      repo: "https://github.com/IamNishant51/CARTO-VS-CODE-EXTENSION",
      marketplace: "https://marketplace.visualstudio.com/items?itemName=nishantunavane.carto",
    },
    image: "/assets/08-project-shots/carto.webp",
  },
  {
    id: "04",
    index: "04",
    slug: "ollama-agent",
    title: "Ollama Agent",
    category: "VS Code / local models",
    subtitle: "Intelligence, kept close.",
    description: "A local-first VS Code assistant featuring automatic local model discovery, real-time code streaming, workspace context injection, inline diff previews, automated test authoring, and zero telemetry egress.",
    stack: ["TypeScript", "React", "Ollama", "VS Code API"],
    proof: ["Zero API fees", "100% offline inference", "Low-latency streaming"],
    metrics: "100% offline inference",
    links: {
      repo: "https://github.com/IamNishant51/Ollama-Agent-vs-code-extension",
    },
    image: "/assets/08-project-shots/ollama-agent.webp",
  },
];
