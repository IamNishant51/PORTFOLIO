# DEV.to Blog Posts

Copy each post completely and paste directly into dev.to's editor.

> ✅ **Posted** — Posts 1, 2, 3, and 4 have been published on dev.to.

---

## Post 1

**Title:** I Built a VS Code Extension That Bundles Entire Codebases for AI

**Tags:** vscode, typescript, ai, opensource, productivity

**Cover Image Prompt:** A VS Code editor split view. Left side shows a folder tree of a project. Right side shows a clean Markdown output with syntax-highlighted code blocks and a table of contents. A robot icon in the corner. Dark theme, warm amber accent.

**Content:**

I was tired of manually selecting files to give AI assistants context. Open this file, copy it, open that file, copy it. Every code review or refactoring session started with five minutes of file gathering.

So I built **Carto**, a VS Code extension that automates the whole thing.

Carto scans your project, detects the tech stack from package.json, requirements.txt, go.mod, or any of a dozen ecosystem files, builds a directory tree, and outputs a single Markdown file with all the code organized by folder. It includes a table of contents, file paths, and syntax highlighting.

The extension supports four AI providers: Google Gemini, OpenAI, Groq, and Ollama for local models. You can toggle an AI analysis feature that appends a senior-engineer-level code review to the bundle.

The technical challenge was abstracting multiple AI providers behind a unified interface. Gemini streams differently than OpenAI. Groq is extremely fast but has different rate limits. Ollama might not even be running. I normalized everything into async generators so the rendering pipeline never needs to know which provider is backing it.

Security scanning was non-negotiable. The extension detects .env files, private keys, SSH credentials, and API keys using pattern matching, and excludes them from the output automatically.

The most common feedback is that it saves developers 30 to 60 minutes a day preparing AI context. That validated the entire project.

If you want to see the full source code or read about my other projects, visit my portfolio at [nishantunavane.qzz.io](https://nishantunavane.qzz.io).

### Check out the Project

{% cta https://github.com/IamNishant51/CARTO-VS-CODE-EXTENSION %} View Source Code on GitHub {% endcta %}

What does your AI context preparation workflow look like? Do you manually copy files or use something else? Let me know in the comments!

---

> ✅ **Posted**

---

## Post 2

**Title:** Controlling Blender with AI — Building an MCP Server for 3D Creation

**Tags:** blender, mcp, ai, python, 3d, opensource

**Cover Image Prompt:** A Blender 3D viewport with a half-built temple model showing wireframe geometry. A chat interface overlay in the corner with AI conversation. Warm amber and deep blue color scheme. Clean, technical aesthetic.

**Content:**

Blender's Python API is powerful but has a steep learning curve. What if you could describe a 3D model in plain language and have an AI build it inside Blender automatically?

That is what **Blender MCP** does. It is an MCP server that connects AI assistants like Claude and GitHub Copilot to Blender in real-time.

The architecture is simple. The MCP server runs as a Node.js process and spawns Blender as a background subprocess. When you tell the AI to "create an Indian temple with red marble material," the server generates a Python script using Blender's bpy API and executes it in the background Blender instance.

The server includes procedural generation templates for Indian-themed models — temples with detailed pillars and shikharas, auto-rickshaws with functional wheels, traditional thalis with rice and multiple curries, and human figures in traditional attire. Each template is a parameterized Python script that generates geometry procedurally.

Managing the Blender subprocess was the hardest part. Blender takes seconds to start, and long operations can timeout. I built a connection pool that keeps Blender running in the background and automatically reconnects if it crashes.

Material generation uses Blender's node system instead of texture files. Wood grain, marble in multiple colors, metals like gold and copper — each material is a node tree created programmatically.

If you want to see the full source code or read about my other projects, visit my portfolio at [nishantunavane.qzz.io](https://nishantunavane.qzz.io).

### Check out the Project

{% cta https://github.com/IamNishant51/Blender-MCP %} View Source Code on GitHub {% endcta %}

Have you tried using AI for 3D modeling? What kind of scenes would you generate? Let me know in the comments!

---

> ✅ **Posted**

---

## Post 3

**Title:** Building Axiom — A Claude Code-Style Terminal Agent with 7 LLM Providers

**Tags:** cli, typescript, ai, llm, opensource, terminal

**Cover Image Prompt:** A terminal window with streaming colored output. Code syntax highlighting in the terminal. A vim mode indicator in the corner. Multiple AI provider logos faint in the background. Dark background, vibrant green and amber text.

**Content:**

After using Claude Code CLI extensively, I wanted to understand the architecture by building my own version. **Axiom** is a terminal-based coding agent with a premium TUI that supports seven LLM providers.

The project is a monorepo with five packages: a unified LLM abstraction, an agent runtime with tool execution, a terminal UI framework, a React-based premium TUI, and the interactive coding agent itself.

Building a 60fps terminal UI was harder than expected. Terminals are not designed for smooth animation. I implemented a frame-based renderer with dirty region optimization — only changed parts of the screen are redrawn. This keeps the interface responsive during streaming token-by-token responses.

Vim mode was fun to implement. Normal mode treats h, j, k, l as movement keys. Insert mode passes keystrokes through. The mode switch is instantaneous with clear visual feedback in the status bar.

Security is built into every tool execution. The bash tool checks commands against dangerous patterns before running them. Path validation prevents directory traversal. Read-only filesystem detection prevents accidental writes to system files.

Session management uses JSONL persistence with branching support. You can try multiple approaches to a problem and compare results in parallel branches.

If you want to see the full source code or read about my other projects, visit my portfolio at [nishantunavane.qzz.io](https://nishantunavane.qzz.io).

### Check out the Project

{% cta https://github.com/IamNishant51/AXIOM %} View Source Code on GitHub {% endcta %}

What features would you want in a terminal coding agent? Do you prefer CLI-based AI tools or editor-integrated ones? Let me know in the comments!

---

> ✅ **Posted**

---

## Post 4

**Title:** Atlas MCP Server — 33 Developer Tools in One Package

**Tags:** mcp, ai, typescript, developer-tools, opensource

**Cover Image Prompt:** A dashboard showing 33 hexagonal icons arranged in a circular pattern, each representing a developer tool. A central brain icon with connecting lines. Dark background with gradient blue-purple accents. Clean, futuristic UI.

**Content:**

Atlas started as a simple code analysis tool and grew into a suite of 33 developer tools packaged as an MCP server. It integrates with Cursor, Windsurf, Claude Desktop, GitHub Copilot, and VS Code.

The core pipeline follows a six-stage process: Intent, Context, Decomposition, Variants, Critique, Optimization. When you ask **Atlas** to refactor a function, it understands your intent, gathers project context, breaks the task into subtasks, generates multiple approaches, critiques each one, and applies the best solution.

The RAG search feature is technically the most interesting. Instead of treating code as plain text for keyword matching, Atlas builds a knowledge graph from your codebase. It understands relationships between files, functions, imports, and data flow. You can ask "how does authentication work?" and get a contextual answer with relevant code paths.

The ML bug predictor analyzes complexity metrics, churn rates, and historical patterns to forecast issues with 70-85% accuracy. Training required collecting metrics from hundreds of open source projects.

The frontend developer tools include a Performance Doctor that detects React re-render issues, bundle bloat, and memory leaks. The CSS Wizard analyzes specificity conflicts and converts between BEM, Tailwind, and CSS Modules. The Animation Studio generates code for GSAP, Framer Motion, and CSS keyframes.

Atlas works without API keys. If none are provided, it delegates generation to your IDE's built-in AI. This makes it truly zero-configuration.

If you want to see the full source code or read about my other projects, visit my portfolio at [nishantunavane.qzz.io](https://nishantunavane.qzz.io).

### Check out the Project

{% cta https://github.com/IamNishant51/atlas-mcp-server %} View Source Code on GitHub {% endcta %}

What developer tool would you add to an IDE if you could build anything? Let me know in the comments!

---

> ✅ **Posted**

---

## Post 5

**Title:** Building a 3D Interactive Book with React Three.js and GSAP

**Tags:** react, threejs, gsap, 3d, javascript, webdev

**Cover Image Prompt:** A 3D floating book with pages mid-transition, illuminated by warm golden light against a dark background. Subtle particle effects around it. Clean, magical atmosphere with a dark academic aesthetic.

**Content:**

I built a 3D sliding book using React, Three.js, and GSAP that demonstrates realistic page transitions and immersive depth effects. It is designed for digital portfolios, product showcases, or interactive storytelling.

The core interaction is a page-flip animation driven by GSAP timelines. Each page transition is synchronized with the Three.js render loop to maintain smooth 60fps motion. The book responds to scroll position and mouse interaction.

Syncing GSAP with Three.js was the main challenge. GSAP operates on DOM elements, while Three.js works with its own scene graph. I used React Three Fiber's useFrame hook to bridge the two, updating Three.js object properties from GSAP's ticker in the animation loop.

The lighting setup uses a three-point system with warm key light, cool fill light, and rim light to give the book depth. Page materials use normal maps for paper texture and subtle subsurface scattering approximation for realistic light transmission through thin pages.

Performance optimization was critical. I reduced draw calls by merging geometry where possible and used instancing for repeated elements. The render loop uses a fixed timestep to prevent animation stutter.

If you want to see the full source code or read about my other projects, visit my portfolio at [nishantunavane.qzz.io](https://nishantunavane.qzz.io). You can also try the live demo at [3d-book-tau.vercel.app](https://3d-book-tau.vercel.app).

### Check out the Project

{% cta https://github.com/IamNishant51/Three.JS-Book %} View Source Code on GitHub {% endcta %}

Have you built anything with Three.js? What kind of interactive 3D experiences interest you? Let me know in the comments!

---

## Post 6

**Title:** Designing with Japanese Zen Aesthetics — My Portfolio Design System

**Tags:** design, css, webdev, nextjs, ui, creativity

**Cover Image Prompt:** A serene dark scene with subtle bamboo silhouettes on the edges. A faint circular enso calligraphy mark in the center. Warm paper-toned texture overlaying a deep charcoal background. Minimalist Japanese zen aesthetic. No text, just atmosphere.

**Content:**

I wanted my portfolio to feel different. Not another dark-mode minimal site with the same layout as everyone else. I wanted it to feel like a space, not a page.

Japanese aesthetics gave me a framework to work with. Three concepts shaped every decision.

**Ma** is the space between things. In design, it means negative space is not empty. It is a deliberate element that gives content room to breathe. I increased padding, reduced visual density, and stopped trying to fill every pixel.

**Wabi-sabi** finds beauty in imperfection. I introduced slight asymmetries. Text that does not perfectly center. Borders that are not perfectly aligned. A human feel that a strict grid cannot produce.

**Kanso** means simplicity. Remove everything that is not essential. Every element on the page has to earn its place. If it is decorative, it either serves a purpose or it goes.

The color palette draws from traditional Japanese interiors. Deep charcoal backgrounds, warm off-white text, and muted gold accents. No bright colors. Nothing that demands attention.

Animations follow the same philosophy. Slow ease curves. Organic timing. Nothing snaps or bounces. Every transition feels like it happens at its own pace.

If you want to see the full design system applied, visit my portfolio at [nishantunavane.qzz.io](https://nishantunavane.qzz.io). The source code is also on GitHub.

### Check out the Project

{% cta https://github.com/IamNishant51/PORTFOLIO %} View Source Code on GitHub {% endcta %}

What design philosophy influences your work? Do you follow any particular aesthetic in your projects? Let me know in the comments!

---

## Post 7

**Title:** Lucifer Dark Theme — A VS Code Theme for Late Night Coding

**Tags:** vscode, theme, design, productivity, webdev

**Cover Image Prompt:** A VS Code editor split into multiple panels showing code in Python, JavaScript, and TypeScript. Deep dark background with vibrant syntax highlighting accents. Warm amber and electric blue colors on a nearly black background. Clean, comfortable dark theme aesthetic.

**Content:**

I spend a lot of time coding late at night. Most dark themes either have too little contrast (everything looks gray) or too much (bright colors that strain your eyes in a dark room).

So I created **Lucifer Dark Theme** for VS Code. It is designed specifically for low-light environments with carefully balanced contrast ratios.

The editor background is a deep near-black shade. Syntax colors are rich but not overpowering — warm amber for functions, cool blue for keywords, soft green for strings. Each color was tuned manually across multiple languages to ensure readability without glare.

UI elements follow the same philosophy. The sidebar, status bar, and panel backgrounds are slightly lighter than the editor to create visual hierarchy without distraction. Active selections use a subtle highlight that is visible but not jarring.

Semantic highlighting was important. Different tokens get distinct colors based on their role — variables, parameters, properties, and types each have their own hue. This makes code easier to scan quickly.

The most challenging part was maintaining consistency across languages. A string in Python should look the same as a string in JavaScript. A function name in Rust should match a function in TypeScript. I spent hours cross-referencing TextMate grammars to ensure uniform token coloring.

If you want to try it or read about my other projects, visit my portfolio at [nishantunavane.qzz.io](https://nishantunavane.qzz.io).

### Check out the Project

{% cta https://github.com/IamNishant51/Lucifer-Dark-Theme-vs-code-extension- %} View Source Code on GitHub {% endcta %}

What is your favorite VS Code theme? Do you prefer dark themes with high contrast or softer palettes? Let me know in the comments!

---

## Post 8

**Title:** What I Learned Publishing 6 Open Source Projects

**Tags:** opensource, vscode, typescript, beginners, career

**Cover Image Prompt:** Six hexagonal icons arranged in a row on a dark background. A subtle glow behind each one. Clean typography with "6 Projects" as the main text. Minimalist tech illustration style. Warm amber and white color scheme.

**Content:**

I have published six open source projects. Each one taught me something different about building software.

**Carto**, the AI codebase bundler, taught me about multi-provider LLM abstraction and VS Code WebView rendering. Abstracting Gemini, OpenAI, Groq, and Ollama behind a unified interface requires careful normalization of streaming behavior.

**Blender MCP** taught me about subprocess management and procedural geometry generation. Keeping Blender running as a background process with automatic reconnection was harder than any feature implementation.

**Axiom** taught me terminal UI rendering at 60fps with dirty region optimization and security-first tool execution design.

**Atlas MCP Server** taught me how to build a knowledge graph for RAG search and achieve ML prediction accuracy across diverse codebases.

The **3D Sliding Book** taught me about syncing GSAP timelines with the Three.js render loop.

The **Lucifer Dark Theme** taught me about VS Code's color token system and accessibility-aware theme design.

Here is what I wish I knew before starting. First, test on all three platforms. An extension that works on macOS might crash on Windows. CI pipelines that run tests on Linux, Windows, and macOS are worth the setup time.

Second, invest in error handling. Software that crashes silently teaches users nothing. Meaningful error messages with suggested fixes reduce support requests significantly.

Third, the marketplace rewards specificity. Tools that solve one clear problem rank higher than tools that try to do everything. A focused tool with a clear README outperforms a Swiss Army knife.

If you want to see the full source code or read about my other projects, visit my portfolio at [nishantunavane.qzz.io](https://nishantunavane.qzz.io).

### Check out the Projects

{% cta https://github.com/IamNishant51 %} View All Projects on GitHub {% endcta %}

What is the most important lesson you have learned from open source? Let me know in the comments!

---

## Post 9

**Title:** Open Source Lessons from Maintaining 6 Repositories

**Tags:** opensource, vscode, typescript, career, beginners

**Cover Image Prompt:** A GitHub profile grid showing contribution activity and repository cards. Stylized network graph connecting code contributions. Dark background with green and white accents. Open source community visual metaphor.

**Content:**

I started open source by fixing a typo in documentation. That small commit led to building and maintaining six repositories with users across multiple platforms.

Here is what I learned along the way.

**Issues are not complaints.** Every issue filed is someone taking time to help you improve your software. The tone might not always be friendly, but the intent usually is. Respond quickly, acknowledge the problem, and set realistic timelines.

**Pull requests from strangers are a gift.** Someone looked at your code, understood it, and wrote an improvement. Even if you do not merge it, learn from it. Ask questions. Understand their approach.

**Documentation is not optional.** A well-written README reduces issues by half. Installation instructions, configuration options, screenshots, and a clear description of what the project does. Users should know within ten seconds whether your tool solves their problem.

**Semantic versioning matters.** Breaking changes in a minor version erodes trust. I use semantic-release to automate versioning based on commit messages. It removes the guesswork.

**Saying no is part of maintenance.** Not every feature request should be implemented. Not every PR should be merged. Having a clear scope for your project makes these decisions easier. A focused tool with clear boundaries is more valuable than a sprawling one.

The community is the best part. I have had conversations with developers from countries I have never visited, using my tools in ways I never imagined. Open source connects you to people who care about the same problems you do.

If you want to see all my open source projects, visit my portfolio at [nishantunavane.qzz.io](https://nishantunavane.qzz.io).

### Check out the Projects

{% cta https://github.com/IamNishant51 %} View All Projects on GitHub {% endcta %}

What has your open source experience been like? Are you maintaining any projects or planning to start? Let me know in the comments!

---

## Post 10

**Title:** Why I Chose Next.js and GSAP for My Portfolio

**Tags:** nextjs, gsap, react, typescript, webdev

**Cover Image Prompt:** A browser window showing a portfolio homepage. Abstract geometric shapes floating around the page with motion blur trails suggesting animation. Next.js and GSAP logos faintly in the bottom corners. Dark background, warm gold and white color palette.

**Content:**

When I rebuilt my portfolio, I had two requirements. The animations had to feel intentional, not flashy. And the page transitions had to be smooth enough that visitors would not notice them.

I chose Next.js for the framework and GSAP for animations. Here is why.

Next.js gives you server-side rendering, static generation, and route-based code splitting out of the box. For a portfolio with multiple pages, this means fast initial loads and good SEO. The app router makes nested layouts and shared components straightforward.

GSAP was the animation choice because it separates animation logic from the component lifecycle. With React, animations can get tangled in state management and re-renders. GSAP runs independently on the DOM, which means smoother performance and cleaner code.

The page transitions use a vertical curtain wipe effect. A panel slides down to cover the current page, then slides up to reveal the new one. The entire transition takes 800 milliseconds. It is fast enough to feel instant but slow enough to register visually.

I used GSAP's ScrollTrigger for all the scroll-based animations. Sections reveal with clip-path animations, text splits into staggered word animations, and stats scale in as you scroll past them. The key was restraint. Every animation has a purpose. None of them are decorative.

The biggest lesson was about performance. GSAP is efficient, but too many simultaneous animations can still cause jank. I batch animations into timelines, use GPU-accelerated properties, and check the user's prefers-reduced-motion setting.

If you want to see the full source code or read about my other projects, visit my portfolio at [nishantunavane.qzz.io](https://nishantunavane.qzz.io).

### Check out the Project

{% cta https://github.com/IamNishant51/PORTFOLIO %} View Source Code on GitHub {% endcta %}

What framework and animation library do you use for your personal site? Are you team Framer Motion or GSAP? Let me know in the comments!
