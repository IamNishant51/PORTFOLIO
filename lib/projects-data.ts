export interface ProjectDetail {
  slug: string;
  title: string;
  tagline: string;
  overview: string;
  features: string[];
  tech: string[];
  challenges: string[];
  learnings: string[];
  links: { label: string; url: string }[];
}

export const projectDetails: ProjectDetail[] = [
  {
    slug: "CARTO-VS-CODE-EXTENSION",
    title: "Carto",
    tagline: "AI Codebase Bundler for VS Code",
    overview:
      "Carto bundles your entire codebase into a single, beautifully structured Markdown file — ready to paste into any AI assistant. It supports multi-provider AI (Gemini, OpenAI, Groq, Ollama), auto-detects your tech stack, and runs entirely locally on your machine. Features intelligent context bundling with a table of contents, tech stack detection, directory tree, and full file contents grouped by folder.",
    features: [
      "Multi-provider AI integration — Gemini, OpenAI, Groq, Ollama",
      "Intelligent context bundling with TOC, tech stack detection, and directory tree",
      "AI toggle for senior-engineer-level codebase analysis",
      "Full output preview with rendered markdown inside VS Code sidebar",
      "Auto tech stack detection from package.json, requirements.txt, go.mod, Cargo.toml, and more",
      "Security scanning — detects and excludes .env, private keys, and credentials",
      "Local AI support via Ollama for 100% offline operation",
    ],
    tech: ["TypeScript", "VS Code API", "Google Gemini", "OpenAI", "Groq", "Ollama"],
    challenges: [
      "Abstracting multiple AI providers behind a unified interface with different streaming behaviors",
      "Building a performant markdown preview renderer within VS Code WebView constraints",
      "Implementing accurate tech stack detection across 10+ ecosystem file formats",
      "Designing security scanning that catches sensitive files without false positives",
    ],
    learnings: [
      "Deep understanding of VS Code extension architecture and WebView communication",
      "Multi-provider LLM integration patterns and streaming response handling",
      "File system scanning optimization for large codebases",
      "Security pattern detection and file exclusion strategies",
    ],
    links: [
      { label: "GitHub", url: "https://github.com/IamNishant51/CARTO-VS-CODE-EXTENSION" },
      { label: "VS Code Marketplace", url: "https://marketplace.visualstudio.com/items?itemName=nishantunavane.carto" },
    ],
  },
  {
    slug: "Blender-MCP",
    title: "Blender MCP Server",
    tagline: "Control Blender with AI — 3D creation via natural language",
    overview:
      "An MCP server that enables AI assistants like Claude and Copilot to control Blender programmatically. Create complex 3D models with detailed planning and procedural generation, search the internet for 3D models and textures, apply materials, modify existing models, and import/export 3D files. Includes built-in procedural generation for Indian-themed models like temples, auto-rickshaws, and traditional thalis.",
    features: [
      "Create complex 3D models with internet search and detailed planning",
      "Modify existing models — change colors, materials, scale, rotation",
      "Apply procedural materials (wood, marble, stone, metal, etc.)",
      "Search the internet for 3D models and textures across multiple sources",
      "Built-in model templates for Indian-themed 3D content",
      "Import models directly from URLs",
      "Runs Blender as a background subprocess via bpy API",
    ],
    tech: ["Python", "Node.js", "Blender", "MCP Protocol", "bpy"],
    challenges: [
      "Bridging the MCP protocol with Blender's Python bpy API in real-time",
      "Managing Blender as a background subprocess with proper timeout and error handling",
      "Procedural generation of complex 3D geometry with reliable output",
      "Cross-platform Blender executable path resolution",
    ],
    learnings: [
      "MCP (Model Context Protocol) server architecture and tool registration",
      "Blender Python API internals for procedural geometry generation",
      "Subprocess management for long-running 3D rendering operations",
      "Internet search integration within agent tool workflows",
    ],
    links: [
      { label: "GitHub", url: "https://github.com/IamNishant51/Blender-MCP" },
      { label: "npm", url: "https://www.npmjs.com/package/blender-mcp" },
    ],
  },
  {
    slug: "AXIOM",
    title: "Axiom",
    tagline: "Terminal Coding Agent with Multi-Provider LLM Support",
    overview:
      "Axiom is a powerful terminal-based coding agent inspired by Claude Code CLI. It features a premium TUI with streaming responses, multi-provider LLM support (OpenCode, Anthropic, OpenAI, Google, Groq, xAI, Cerebras), tool execution with security validation, vim mode, collapsible thinking panels, and session management with branching support. Built as a monorepo with separate packages for AI, agent-core, TUI, and the coding agent itself.",
    features: [
      "Premium TUI with Claude Code CLI-style interface and 60fps rendering",
      "Multi-provider support — OpenCode, Anthropic, OpenAI, Google, Groq, xAI, Cerebras",
      "Tool execution — read, write, bash, edit, grep, find, ls, mkdir with security validation",
      "Security-first design — dangerous command detection, path validation, read-only checks",
      "Full vim keybindings (i, Esc, h/j/k/l, w, b, dd, dw)",
      "Collapsible thinking panel — Tab key to toggle reasoning display",
      "Session management with JSONL persistence and branching support",
    ],
    tech: ["TypeScript", "Node.js", "React", "LLM APIs", "MCP Protocol"],
    challenges: [
      "Building a 60fps terminal UI framework with dirty region optimization",
      "Implementing consistent tool execution across multiple LLM providers with different API characteristics",
      "Security validation — accurately detecting dangerous commands without blocking legitimate ones",
      "Session branching — managing complex conversation trees with JSONL persistence",
    ],
    learnings: [
      "Terminal UI rendering techniques including frame-based rendering and dirty region optimization",
      "Multi-provider LLM abstraction — handling different streaming formats, token limits, and error modes",
      "Security-first tool execution design patterns",
      "Monorepo architecture with shared packages and build orchestration",
    ],
    links: [
      { label: "GitHub", url: "https://github.com/IamNishant51/AXIOM" },
    ],
  },
  {
    slug: "atlas-mcp-server",
    title: "Atlas MCP Server",
    tagline: "Enterprise-Grade Agentic AI Pipeline for Modern IDEs",
    overview:
      "Atlas MCP Server transforms your IDE with intelligent development capabilities through a comprehensive analysis pipeline. It features 33 professional tools spanning AI/ML-powered analysis (RAG search, ML bug prediction with 70-85% accuracy, intelligent code migration, advanced test generation), frontend developer tools (performance doctor, CSS wizard, animation studio), and senior developer tools (architecture guidance, security scanning, state management analysis). Integrates natively with Cursor, Windsurf, Claude Desktop, GitHub Copilot, and VS Code.",
    features: [
      "33 professional tools covering code analysis, review, refactoring, and optimization",
      "RAG-powered semantic code search with knowledge graphs",
      "ML bug prediction with 70-85% accuracy using complexity and churn analysis",
      "Intelligent code migration across 12 types (JS to TS, React upgrades, Callbacks to Async)",
      "Frontend developer tools — performance doctor, CSS wizard, animation studio, API helper",
      "Senior developer tools — architecture mentor, security scanner, state management architect",
      "Zero configuration — no API keys required, leverages IDE's built-in AI",
    ],
    tech: ["TypeScript", "Node.js", "MCP Protocol", "RAG", "Machine Learning"],
    challenges: [
      "Implementing a DAG-based task decomposition pipeline that handles complex workflows",
      "Building a RAG search system that works with code semantics, not just keywords",
      "Achieving 70-85% ML prediction accuracy across diverse codebases",
      "Supporting 33 tools without overwhelming IDE performance through LRU caching and parallel execution",
    ],
    learnings: [
      "MCP server architecture at scale with 33+ tool registrations",
      "RAG implementation for code-specific semantic search with knowledge graphs",
      "ML model integration for bug prediction and performance analysis",
      "Frontend tooling — detecting React re-render issues, CSS specificity conflicts, animation optimization",
    ],
    links: [
      { label: "GitHub", url: "https://github.com/IamNishant51/atlas-mcp-server" },
      { label: "npm", url: "https://www.npmjs.com/package/atlas-pipeline-mcp" },
    ],
  },
  {
    slug: "Three.JS-Book",
    title: "3D Sliding Book",
    tagline: "Interactive 3D Book with React, Three.js, and GSAP",
    overview:
      "A visually engaging 3D sliding book built with React and Three.js. Features realistic book animations, smooth page sliding transitions, and immersive depth effects. Ideal for digital portfolios, product showcases, or storytelling websites. Built with GSAP for page slide animations and Three.js for 3D rendering, with realistic lighting and depth effects.",
    features: [
      "Smooth 3D page transitions with GSAP animations",
      "Realistic lighting and depth effects with Three.js",
      "Looping animations and interactive camera controls",
      "Responsive design that works across devices",
      "Customizable layout and interaction parameters",
      "Lightweight and performant rendering",
    ],
    tech: ["React", "Three.js", "GSAP", "JavaScript", "Vite"],
    challenges: [
      "Syncing GSAP animation timelines with Three.js render loop",
      "Creating realistic page deformation and sliding physics in 3D space",
      "Optimizing Three.js performance for smooth 60fps page transitions",
    ],
    learnings: [
      "Integrating GSAP animation timelines with React Three Fiber",
      "3D geometry manipulation for page deformation effects",
      "Performance optimization for WebGL-based interactive experiences",
    ],
    links: [
      { label: "GitHub", url: "https://github.com/IamNishant51/Three.JS-Book" },
      { label: "Live Demo", url: "https://3d-book-tau.vercel.app" },
    ],
  },
  {
    slug: "Lucifer-Dark-Theme-vs-code-extension-",
    title: "Lucifer Dark Theme",
    tagline: "Sleek Dark Theme for VS Code",
    overview:
      "A sleek and modern dark theme for Visual Studio Code inspired by the darkness of the night. Features carefully chosen syntax colors for better code readability, themed workbench and editor components, optimized contrast ratios for comfortable viewing, and semantic highlighting for enhanced code understanding. Perfect for developers who prefer coding in low-light environments with style.",
    features: [
      "Deep dark color scheme easy on the eyes during long coding sessions",
      "Carefully curated syntax highlighting for better code readability",
      "Themed workbench and editor components for a cohesive experience",
      "Optimized contrast ratios for comfortable extended viewing",
      "Semantic highlighting for enhanced code understanding",
    ],
    tech: ["JSON", "VS Code Theme API", "TextMate Grammars"],
    challenges: [
      "Achieving WCAG-compliant contrast ratios while maintaining a dark aesthetic",
      "Ensuring consistent color application across all VS Code UI elements",
      "Supporting semantic highlighting tokens across multiple languages",
    ],
    learnings: [
      "VS Code theme architecture and color token system",
      "Color theory for code syntax highlighting — readability vs aesthetics",
      "Accessibility considerations in theme design",
    ],
    links: [
      { label: "GitHub", url: "https://github.com/IamNishant51/Lucifer-Dark-Theme-vs-code-extension-" },
    ],
  },
];

export function getProjectBySlug(slug: string): ProjectDetail | undefined {
  return projectDetails.find((p) => p.slug === slug);
}

export function getProjectSlugs(): string[] {
  return projectDetails.map((p) => p.slug);
}
