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
    slug: "building-vs-code-extensions-from-scratch",
    title: "Building VS Code Extensions from Scratch",
    date: "2025-12-15",
    readTime: "8 min read",
    tags: ["VS Code", "TypeScript", "Developer Tools"],
    excerpt:
      "A practical guide to creating your first VS Code extension, from scaffolding to publishing on the marketplace.",
    content: [
      "VS Code extensions are one of the best ways to improve your daily development workflow. They range from simple syntax highlighters to full-featured language servers and AI integrations.",
      "",
      "## Getting Started",
      "",
      "Every VS Code extension starts with a `package.json` file and a `yo code` scaffolding command. The Yeoman generator sets up the project structure, activation events, and contribution points.",
      "",
      "The extension lifecycle has three key events: `onActivate` when your extension loads, `onDeactivate` when it unloads, and various activation events like `onCommand`, `onLanguage`, or `onView` that trigger your code.",
      "",
      "## Key APIs to Know",
      "",
      "The `vscode` module provides everything you need: `vscode.window` for UI (status bar, notifications, webviews), `vscode.workspace` for file system and configuration access, and `vscode.languages` for language features like hover info, autocomplete, and diagnostics.",
      "",
      "## Publishing",
      "",
      "Publishing is straightforward with `vsce publish`. The VS Code Marketplace accepts VSIX packages. Make sure your README is polished — it's the first thing users see.",
      "",
      "The most rewarding part is shipping something that other developers use daily. My Code Runner extension taught me more about cross-platform development than any tutorial.",
    ],
  },
  {
    slug: "crafting-a-japanese-zen-portfolio",
    title: "Crafting a Japanese Zen Portfolio",
    date: "2025-11-20",
    readTime: "10 min read",
    tags: ["Design", "Next.js", "GSAP"],
    excerpt:
      "How I designed and built a portfolio inspired by Japanese aesthetics — wabi-sabi, ma, and the art of subtle motion.",
    content: [
      "When I set out to rebuild my portfolio, I knew I wanted something different. Not another black-and-white minimal site, but a space that felt intentional, calm, and distinctly personal.",
      "",
      "## The Japanese Design Philosophy",
      "",
      "Japanese aesthetics center on a few core concepts that translate beautifully to web design:",
      "",
      "- **Ma (間)** — the space between things. Negative space isn't empty; it's a deliberate design element that gives content room to breathe.",
      "- **Wabi-sabi (侘寂)** — beauty in imperfection. Asymmetry, texture, and the natural patina of things.",
      "- **Kanso (簡素)** — simplicity. Eliminate everything that isn't essential.",
      "",
      "## Bringing It to the Browser",
      "",
      "I chose a dark, warm palette: deep midnight backgrounds with warm white text and muted ash accents. The bamboo SVG background adds texture without distraction. Katakana characters and hanko seals nod to the theme without being loud.",
      "",
      "Animations are restrained and purposeful. Instead of flashy entrances, I used GSAP's `power2.inOut` easing — a slow, organic curve that feels natural rather than mechanical. Each section reveals itself with a clip-path or stagger animation, giving the scroll a meditative rhythm.",
      "",
      "The result is a site that feels less like a portfolio and more like a space you inhabit. That was the goal all along.",
    ],
  },
  {
    slug: "mastering-gsap-scrolltrigger",
    title: "Mastering GSAP ScrollTrigger",
    date: "2025-10-08",
    readTime: "6 min read",
    tags: ["GSAP", "Animation", "JavaScript"],
    excerpt:
      "A deep dive into GSAP's ScrollTrigger plugin — pinning, scrubbing, timelines, and performance patterns.",
    content: [
      "ScrollTrigger is the most powerful plugin in the GSAP ecosystem. It ties animation timelines to scroll position, enabling everything from simple reveal animations to complex narrative-driven experiences.",
      "",
      "## Core Concepts",
      "",
      "ScrollTrigger works by defining `trigger` elements, `start` and `end` points, and what happens in between. The `scrub` option links animation progress directly to scroll position, creating a 1:1 mapping.",
      "",
      "## Pinning for Narrative",
      "",
      "The `pin` option locks an element in place while the scroll continues. This is perfect for storytelling — imagine a product image that stays fixed while text scrolls over it, changing as the user progresses. I use this in my About section with the statistics panel.",
      "",
      "## Performance Considerations",
      "",
      "ScrollTrigger can be expensive if misused. Always batch your animations into GSAP Contexts (`gsap.context()`) for easy cleanup. Use `once: true` for one-time reveals to avoid unnecessary recalculations. And respect `prefers-reduced-motion` with a global check.",
      "",
      "The key insight: less is more. A single well-timed animation is worth ten scattered effects.",
    ],
  },
  {
    slug: "why-open-source-matters",
    title: "Why Open Source Matters",
    date: "2025-09-01",
    readTime: "5 min read",
    tags: ["Open Source", "Community", "Career"],
    excerpt:
      "My journey into open source, the projects I've built, and why every developer should contribute.",
    content: [
      "I started contributing to open source the way most developers do: by fixing a typo in documentation. That small commit led to a journey that fundamentally changed how I think about software.",
      "",
      "## Building in Public",
      "",
      "My VS Code extensions — Code Runner, Ollama Agent, GitHub Dashboard — are all open source. Building in public means every bug report is a learning opportunity, every PR a collaboration, every star a validation that what you're building matters to someone.",
      "",
      "## The Hidden Benefits",
      "",
      "Open source sharpens your skills faster than any course. You learn to write clean code because strangers will read it. You learn API design because users depend on your interface. You learn communication because issues and PRs demand clarity.",
      "",
      "## Start Small",
      "",
      "If you're new to open source, start with documentation improvements, bug reproductions, or small feature additions. Every contribution counts. The community is welcoming — we were all beginners once.",
      "",
      "My GitHub profile is a record of my growth. Each repository tells a story of something I wanted to build, learned to build, and shared with the world.",
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getBlogSlugs(): string[] {
  return blogPosts.map((p) => p.slug);
}
