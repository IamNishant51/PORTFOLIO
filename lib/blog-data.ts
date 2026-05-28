export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  tags: string[];
  excerpt: string;
  content: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "building-carto-ai-codebase-bundler",
    title: "Building Carto — An AI Codebase Bundler for VS Code",
    date: "2026-05-20",
    readTime: "7 min read",
    tags: ["VS Code", "TypeScript", "AI", "Developer Tools"],
    excerpt:
      "How I built a VS Code extension that bundles entire codebases into AI-ready context, supporting Gemini, OpenAI, Groq, and Ollama.",
    content: [
      "I was tired of manually selecting files to provide context to AI assistants. Every time I wanted help with a code review or refactoring, I had to copy file after file. So I built Carto, a VS Code extension that does it in one click.",
      "",
      "Carto scans your project, detects its tech stack, builds a directory tree, and outputs a beautifully structured Markdown file with all your code. It supports four AI providers out of the box — Google Gemini, OpenAI, Groq, and Ollama for local models.",
      "",
      "The most technically challenging part was abstracting multiple AI providers behind a unified interface. Each provider has different streaming behaviors, token limits, and response formats. Gemini streams differently than OpenAI. Groq is incredibly fast but has different rate limits. Ollama runs locally and might not even be running.",
      "",
      "I settled on a provider abstraction layer that normalizes streaming into async generators. Each provider adapter handles its own connection and parsing, but feeds into the same rendering pipeline. This made it easy to add new providers later.",
      "",
      "The output preview was another challenge. VS Code WebViews are essentially iframes with limited capabilities. I needed a markdown renderer that could handle large outputs with syntax highlighting, collapsible sections, and a table of contents. I built it with a custom React application that communicates with the extension host through message passing.",
      "",
      "Security scanning was a requirement from the start. The extension automatically detects .env files, private keys, SSH credentials, and API keys, and excludes them from the bundle. It uses pattern matching against known sensitive file formats.",
      "",
      "The most rewarding feedback came from a developer who said Carto saved them an hour a day preparing context for AI code reviews. That is the kind of impact that makes building developer tools worth it.",
    ],
  },
  {
    slug: "connecting-ai-to-blender-with-mcp",
    title: "Connecting AI to Blender with the Model Context Protocol",
    date: "2026-05-15",
    readTime: "8 min read",
    tags: ["Blender", "MCP", "AI", "Python", "3D"],
    excerpt:
      "Building an MCP server that lets Claude, Copilot, and other AI assistants control Blender for 3D creation in real-time.",
    content: [
      "Blender is an incredibly powerful 3D creation suite, but its Python API has a steep learning curve. What if you could just tell an AI what to build and have it control Blender directly?",
      "",
      "That was the idea behind Blender MCP. It is an MCP server that acts as a bridge between AI assistants and Blender. Claude Code, GitHub Copilot, or any MCP-compatible client can issue commands that get executed in Blender in real-time.",
      "",
      "The architecture is straightforward. The MCP server runs as a Node.js process and spawns Blender as a background subprocess. When a tool is invoked, the server generates a Python script using Blender's bpy API and executes it in the background Blender instance.",
      "",
      "One of the interesting features is procedural model generation. The server includes templates for Indian-themed 3D models — temples with pillars and shikharas, auto-rickshaws with detailed wheels, traditional thalis with rice and curries. Each template is a parameterized Python script that generates geometry on the fly.",
      "",
      "The biggest challenge was managing the Blender subprocess lifecycle. Blender can take seconds to start, and a long-running operation might timeout. I implemented a connection pool that keeps Blender running in the background and reconnects if it crashes.",
      "",
      "Material generation was another interesting problem. Instead of using texture files, the server generates procedural materials using Blender's node system. Wood grain, marble, metal — each material is a node tree that gets created programmatically.",
      "",
      "The project is open source on GitHub and published on npm as blender-mcp. It has been used to create everything from architectural visualizations to game assets.",
    ],
  },
  {
    slug: "axiom-terminal-coding-agent",
    title: "Building Axiom — A Terminal Coding Agent with Multi-Provider LLM Support",
    date: "2026-05-10",
    readTime: "9 min read",
    tags: ["TypeScript", "CLI", "AI", "LLM", "Open Source"],
    excerpt:
      "How I built a Claude Code-style terminal agent with 60fps TUI, vim mode, security validation, and support for 7 LLM providers.",
    content: [
      "After using Claude Code CLI extensively, I wanted to understand how it worked by building my own version. Axiom is the result — a terminal-based coding agent with a premium TUI that supports OpenCode, Anthropic, OpenAI, Google, Groq, xAI, and Cerebras.",
      "",
      "The project is organized as a monorepo with five packages. The AI package provides a unified LLM abstraction. The agent-core package handles tool execution and event streaming. The TUI package provides the terminal UI framework. The coding-agent package ties everything together with the interactive experience.",
      "",
      "Building a 60fps terminal UI was harder than I expected. Terminals are not designed for smooth rendering. I implemented a frame-based renderer with dirty region optimization — only changed parts of the screen are redrawn. This keeps rendering overhead minimal even during streaming responses.",
      "",
      "Vim mode was a fun feature to implement. The terminal needs to intercept keystrokes and interpret them based on the current mode. Normal mode treats h, j, k, l as movement keys. Insert mode passes everything through. The mode switch happens instantaneously with clear visual feedback.",
      "",
      "Security validation is built into every tool. The bash tool checks commands against a list of dangerous patterns before execution. Path validation prevents directory traversal. Read-only filesystem detection prevents accidental writes to system files.",
      "",
      "Session management uses JSONL format with branching support. Each session is a sequence of turns that can fork into parallel exploration paths. This is useful when you want to try multiple approaches to a problem and compare results.",
    ],
  },
  {
    slug: "atlas-mcp-server-enterprise-ai-pipeline",
    title: "Atlas MCP Server — 33 Developer Tools in One MCP Server",
    date: "2026-05-05",
    readTime: "10 min read",
    tags: ["MCP", "AI", "Developer Tools", "TypeScript", "RAG"],
    excerpt:
      "Building an enterprise-grade MCP server with 33 tools including RAG search, ML bug prediction, code migration, and frontend performance analysis.",
    content: [
      "Atlas started as a simple code analysis tool and grew into a comprehensive suite of 33 developer tools packaged as an MCP server. It integrates with Cursor, Windsurf, Claude Desktop, GitHub Copilot, and VS Code.",
      "",
      "The core pipeline follows a six-stage process: Intent, Context, Decomposition, Variants, Critique, and Optimization. When you ask Atlas to refactor a function, it first understands your intent, gathers project context, breaks the task into subtasks, generates multiple approaches, critiques each one, and applies the best solution.",
      "",
      "One of the most technically interesting features is the RAG search. Instead of treating code as plain text for keyword matching, Atlas builds a knowledge graph from your codebase. It understands relationships between files, functions, imports, and data flow. You can ask 'how does authentication work?' and get a contextual answer.",
      "",
      "The ML bug predictor was a significant challenge. It analyzes code complexity metrics, churn rates, and historical bug patterns to forecast potential issues with 70-85% accuracy. Training the model required collecting metrics from hundreds of open source projects.",
      "",
      "The frontend developer tools were added after I noticed that many developers struggle with React performance issues. The Performance Doctor detects unnecessary re-renders, bundle bloat, and memory leaks. It provides specific code fixes with improvement estimates.",
      "",
      "Atlas is designed to work without API keys. If no keys are provided, it defaults to client sampling mode, delegating generation to your IDE's built-in AI capabilities. This makes it truly zero-configuration.",
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getBlogSlugs(): string[] {
  return blogPosts.map((p) => p.slug);
}
