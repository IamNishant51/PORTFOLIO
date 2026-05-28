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
    slug: "ollama-agent-vs-code-extension",
    title: "Ollama Agent",
    tagline: "AI-powered code assistance directly inside VS Code",
    overview:
      "A VS Code extension that integrates Ollama AI models into your editor workflow. Run local LLMs for code completion, explanation, refactoring, and debugging without sending data to third-party APIs. Supports multiple Ollama models with a chat interface, inline code actions, and custom prompt templates.",
    features: [
      "Multi-model support — switch between any Ollama model",
      "Inline code actions for explain, refactor, and debug",
      "Persistent chat history across sessions",
      "Custom prompt templates for repetitive tasks",
      "Keyboard shortcuts for common operations",
    ],
    tech: ["TypeScript", "VS Code API", "Ollama", "Node.js"],
    challenges: [
      "Managing streaming responses from Ollama without blocking the UI thread",
      "Designing a clean chat interface that fits VS Code's design language",
      "Handling model download and configuration gracefully",
    ],
    learnings: [
      "Deep understanding of VS Code extension architecture and lifecycle",
      "Streaming JSON parsing and incremental rendering patterns",
      "User experience design for developer tools",
    ],
    links: [
      { label: "GitHub", url: "https://github.com/IamNishant51/Ollama-Agent-vs-code-extension" },
      { label: "VS Code Marketplace", url: "https://marketplace.visualstudio.com/" },
    ],
  },
  {
    slug: "git-hub-activity-dashboard-vscode-extension",
    title: "GitHub Activity Dashboard",
    tagline: "Track GitHub contributions without leaving your editor",
    overview:
      "A VS Code extension that brings your GitHub activity feed, notifications, and contribution graph directly into the editor sidebar. Stay on top of issues, PRs, and repository activity without context-switching to a browser.",
    features: [
      "Real-time activity feed in the sidebar",
      "Contribution graph visualization",
      "Issue and PR notification badges",
      "Quick-action buttons for common GitHub operations",
      "Multi-account support",
    ],
    tech: ["TypeScript", "VS Code API", "GitHub REST API", "Chart.js"],
    challenges: [
      "OAuth token management within the extension context",
      "Rate limiting and caching strategies for GitHub API calls",
      "Rendering charts in a WebView context",
    ],
    learnings: [
      "OAuth flow implementation in VS Code extensions",
      "Efficient API caching to respect rate limits",
      "WebView-based UI rendering patterns",
    ],
    links: [
      { label: "GitHub", url: "https://github.com/IamNishant51/GIT-HUB-ACTIVITY-DASHBOARD-Vscode-extension" },
    ],
  },
  {
    slug: "code-runner-vscode-extension",
    title: "Code Runner",
    tagline: "Execute code in 40+ languages with one click",
    overview:
      "A multi-language code runner extension for VS Code. Supports 40+ programming languages including Python, JavaScript, TypeScript, Go, Rust, C++, and more. Features customizable run commands, output panel with syntax highlighting, and intelligent error detection.",
    features: [
      "One-click execution for 40+ languages",
      "Customizable compiler and interpreter commands",
      "Output panel with syntax-highlighted results",
      "Error detection and inline problem markers",
      "Configurable file extension to language mapping",
    ],
    tech: ["TypeScript", "VS Code API", "Node.js child_process"],
    challenges: [
      "Abstracting language-specific execution into a unified interface",
      "Handling long-running processes and output buffering",
      "Cross-platform path and command resolution",
    ],
    learnings: [
      "Child process management and output streaming in Node.js",
      "Cross-platform compatibility patterns",
      "Designing extensible plugin architectures",
    ],
    links: [
      { label: "GitHub", url: "https://github.com/IamNishant51/CODE-RUNNER-vscode-extension" },
    ],
  },
  {
    slug: "api-testing-vs-code-extension",
    title: "API Testing Tool",
    tagline: "REST API testing built into VS Code",
    overview:
      "A lightweight REST client extension for VS Code that lets you compose and send HTTP requests without leaving your editor. Supports collections, environment variables, authentication, and response visualization.",
    features: [
      "HTTP request composition with method, URL, headers, and body",
      "Environment variable support with quick-switch",
      "Request collections and folder organization",
      "Authentication helpers (Basic, Bearer, OAuth)",
      "Response preview with JSON/XML/HTML formatting",
    ],
    tech: ["TypeScript", "VS Code API", "Node.js http/https"],
    challenges: [
      "Building a responsive request editor within WebView constraints",
      "Certificate handling and proxy support",
      "Large response body streaming and formatting",
    ],
    learnings: [
      "WebView-based form input handling and validation",
      "HTTP protocol fundamentals through implementation",
      "Certificate and proxy configuration patterns",
    ],
    links: [
      { label: "GitHub", url: "https://github.com/IamNishant51/API-TESTING-vs-code-extension-" },
    ],
  },
  {
    slug: "portfolio",
    title: "Portfolio",
    tagline: "This website — a Japanese zen-inspired digital space",
    overview:
      "A personal portfolio built with Next.js, GSAP, Three.js, and Tailwind CSS. Features smooth page transitions, scroll-triggered animations, WebGL particle effects, and a Japanese zen aesthetic throughout. Designed to showcase both technical skill and design sensibility.",
    features: [
      "Fluid page transitions with GSAP",
      "Japanese zen visual theme with bamboo, katakana, and warm tones",
      "Smooth scrolling via Lenis",
      "WebGL particle field centerpiece",
      "Responsive and accessible design",
    ],
    tech: ["Next.js", "TypeScript", "GSAP", "Three.js", "Tailwind CSS", "Lenis"],
    challenges: [
      "Balancing rich animations with performance on lower-end devices",
      "Implementing page transitions that feel native and seamless",
      "Integrating WebGL with React's component model",
    ],
    learnings: [
      "Advanced GSAP timeline orchestration and ScrollTrigger patterns",
      "React Three Fiber integration in a Next.js app",
      "Design system architecture with CSS custom properties",
    ],
    links: [
      { label: "GitHub", url: "https://github.com/IamNishant51/PORTFOLIO" },
      { label: "Live Site", url: "https://nishantunavane.qzz.io" },
    ],
  },
  {
    slug: "claude-code-helper",
    title: "Claude Code Helper",
    tagline: "AI-powered code assistance with Claude",
    overview:
      "A VS Code extension that brings Claude AI's capabilities into your development workflow. Get intelligent code suggestions, explanations, and pair programming assistance directly in your editor.",
    features: [
      "Chat interface for asking code-related questions",
      "Code explanation and documentation generation",
      "Refactoring suggestions with diff preview",
      "Context-aware code completion",
    ],
    tech: ["TypeScript", "VS Code API", "Claude API", "Node.js"],
    challenges: [
      "Managing API costs and request optimization",
      "Context window management for large codebases",
      "Streaming response rendering in the editor",
    ],
    learnings: [
      "LLM prompt engineering for code-specific tasks",
      "Streaming API integration patterns",
      "Editor-integrated AI UX design",
    ],
    links: [
      { label: "GitHub", url: "https://github.com/IamNishant51" },
    ],
  },
];

export function getProjectBySlug(slug: string): ProjectDetail | undefined {
  return projectDetails.find((p) => p.slug === slug);
}

export function getProjectSlugs(): string[] {
  return projectDetails.map((p) => p.slug);
}
