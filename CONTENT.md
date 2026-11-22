# CONTENT.md — Single source of truth for every word on the site

**Rule for the coding agent: if a fact is not in this file, it does not exist. Do not invent projects, metrics, employers, dates, awards, testimonials or clients. If a section needs copy that is missing, leave a `TODO(content)` marker and stop.**

All copy below is pulled from the live site (https://nishantunavane.qzz.io) and `N_Portfolio/lib/projects-data.ts`. Copy may be *edited for voice* (shorter, sharper) but facts must not change.

---

## 1. Identity

| Field | Value |
|---|---|
| Name | Nishant Unavane |
| Handle | IamNishant51 |
| Role (primary) | Full-Stack Developer & Agentic AI Systems Engineer |
| Role (short, for hero) | Full-Stack Developer |
| Location | India (Pune) |
| Status | Available for high-impact roles & creative engineering |
| Email | nishantunawne0007@gmail.com |
| Email (alt, from live site) | nishant.unavane@outlook.com |
| GitHub | https://github.com/IamNishant51 |
| LinkedIn | https://www.linkedin.com/in/nishant-unavane-008291275/ |
| Résumé | https://ik.imagekit.io/9pfz6g8ri/Nishant_Unavane_FullStack_resume.pdf |

**Email decision:** use `nishantunawne0007@gmail.com` as the primary contact in the site (it is the one in `projects-data.ts`); keep the outlook one only if the user confirms. Do not show both.

### Positioning line (use verbatim)
> I build interfaces, developer tools, coding agents, and the systems that connect them.

### Sub-positioning (use verbatim, can be trimmed)
> Full-stack web applications, VS Code extensions, and autonomous agent systems engineered with Next.js, React 19, TypeScript, Three.js, and modern MCP tooling.

---

## 2. Stats (real, from source)

| Number | Label |
|---|---|
| 4+ | VS Code extensions |
| 15+ | Projects shipped |
| 2+ | Years coding |
| 10,340 | Community downloads |

Do not round these up or invent new ones. If a stat is stale, ask the user — do not "refresh" it yourself.

---

## 3. Flagship projects (order matters)

### 01 — Custom-PI
- **Category:** Coding agent / local-first
- **Subtitle:** Give the agent a working memory.
- **Body:** A dual terminal and web platform for autonomous coding agents: persistent memory graph, multi-agent orchestration, browser automation, and MCP tool synthesis. Built on top of the Pi Coding Agent core.
- **Stack:** TypeScript · Node.js · Fastify · React · SQLite · Playwright
- **Proof:** 4,458 npm downloads · Persistent graph memory · MCP protocol support
- **Links:** repo `https://github.com/IamNishant51/Custom-PI` · live `https://custom-pi-ai.vercel.app`

### 02 — Synapse
- **Category:** Memory / knowledge graph
- **Subtitle:** Memory is more than storage.
- **Body:** A Cognee-based cognitive memory dashboard engineered for continuous ingestion, entity conflict reconciliation, temporal state tracking, and 3D visual knowledge-graph traversal.
- **Stack:** Next.js · React · TypeScript · Tailwind CSS · FastAPI · Python
- **Proof:** Cognee-based ingestion · Conflict reconciliation · Temporal graph
- **Links:** repo `https://github.com/IamNishant51/Synapse` · live `https://synapsememory.vercel.app`

### 03 — Carto
- **Category:** VS Code / context engine
- **Subtitle:** A codebase, unfolded.
- **Body:** A production VS Code extension that digests an entire repository into structured, token-optimized Markdown context with file trees, architectural stack analysis, real-time diff preview, and LLM prompt generation.
- **Stack:** TypeScript · VS Code Extension API · AST parsers
- **Proof:** Published on VS Code Marketplace · Instant multi-file bundling
- **Links:** repo `https://github.com/IamNishant51/CARTO-VS-CODE-EXTENSION` · marketplace `https://marketplace.visualstudio.com/items?itemName=nishantunavane.carto`

### 04 — Ollama Agent
- **Category:** VS Code / local models
- **Subtitle:** Intelligence, kept close.
- **Body:** A local-first VS Code assistant featuring automatic local model discovery, real-time code streaming, workspace context injection, inline diff previews, automated test authoring, and zero telemetry egress.
- **Stack:** TypeScript · React · Ollama · VS Code API
- **Proof:** Zero API fees · 100% offline inference · Low-latency streaming
- **Links:** repo `https://github.com/IamNishant51/Ollama-Agent-vs-code-extension` · (no live demo)

---

## 4. Secondary work (experiments strip)

| Title | Tag | Line | URL |
|---|---|---|---|
| atlas-mcp-server | Developer workflows | Workflow orchestration engine operating over the Model Context Protocol. | https://github.com/IamNishant51/atlas-mcp-server |
| frame | React / motion primitives | Fluidly animated React components and composable physics-based motion primitives. | https://framejs.vercel.app |
| Three.JS-Book | React / Three.js / R3F | A browser-based photorealistic 3D book with interactive spatial page turning and dynamic cloth mesh physics. | https://github.com/IamNishant51/Three.JS-Book |

---

## 5. Capability layers (for the "foundation" section)

Use these four disciplines as the four columns of the colonnade section. One column = one discipline. Keep labels short.

| # | Discipline | Technologies | Line |
|---|---|---|---|
| I | Interface | React 19 / Next.js / Tailwind CSS | Tactile, responsive, typographic interfaces with micro-interactions and rigorous accessible foundations. |
| II | System | Node.js / TypeScript / Fastify / Python | Strongly-typed server runtimes, high-throughput microservices, local SQLite caches, developer tooling. |
| III | Movement | GSAP / Three.js / WebGL / Shaders | Scroll-driven kinetic choreography, inertial canvas physics, procedural 3D simulations that serve narrative clarity. |
| IV | Intelligence | AI agents / MCP / Ollama / Cognee | Multi-agent reasoning, Model Context Protocol pipelines, graph memory, private on-device intelligence. |

---

## 6. Method (four steps, from source)

1. **Find the real question.** Write down the core human problem before reaching for an interface or framework.
2. **Make the small version.** Connect one useful path end to end immediately.
3. **Follow the friction.** Watch edge cases, sluggish frames, and moments the software demands unnecessary cognitive load.
4. **Edit. Then edit again.** Keep the necessary essence. Polish typography, layout, performance.

---

## 7. Timeline (from live site — do not add roles)

| Years | Title | Body |
|---|---|---|
| 2024 — Present | Full-Stack Developer | Building modern web applications with React, Next.js and TypeScript. Creating VS Code extensions that improve developer productivity. |
| 2023 | Frontend Developer | Modern frontend frameworks and tooling. Started contributing to open source and building developer tools. |
| 2022 | Learning journey | Learned JavaScript and React, built projects to solidify fundamentals. |

**No employers are named on the live site. Do not invent company names, logos or titles.**

---

## 8. Voice rules

- First person, plain, calm. Short sentences. No exclamation marks.
- State the thing, then the proof. Never the adjective first.
- Banned words: passionate, innovative, cutting-edge, seamless, revolutionary, ninja, rockstar, "digital experiences" (unless quoted from source), "elevate", "unlock", "journey" (except the timeline heading).
- Numbers over adjectives: "4,458 npm downloads" beats "widely used".
- Em dashes are allowed; exclamation marks are not.
- Japanese/kanji accents: the live site used 創 ("to create") and フルスタック開発者. Keep **at most one** kanji accent per page, as a 12px label, never as decoration spam. Recommended: `創` in the hero meta row only.

---

## 9. Contact / footer

- Line: "Open to full-stack and creative-engineering roles. Based in Pune, working remotely."
- Links: GitHub · LinkedIn · Email · Résumé
- Copyright: `© 2027 Nishant Unavane`
- Colophon line (small): `Set in Instrument Serif & Geist. Built with Next.js, GSAP and Three.js.`
