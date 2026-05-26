# AGENTS.md — Portfolio (Nishant Unavane)

## Stack

- **Next.js 16.1.3** (App Router, Turbopack), **React 19.2**, **TypeScript 5**
- **Tailwind v4** — config lives in `app/globals.css` via `@theme` block (no `tailwind.config.ts`)
- **GSAP 3.14** (+ ScrollTrigger), **Lenis 1.3** for smooth scrolling

## Commands

```bash
npm run dev      # Uses --turbopack (required for Next.js 16)
npm run build    # Production build
npm run lint     # ESLint v9 flat config (eslint.config.mjs, not .eslintrc)
npm run analyze  # ANALYZE=true next build (bundle analysis)
```

## Key Conventions

- **Zero border-radius** — enforced globally via `* { border-radius: 0 !important }` in CSS
- **Global transitions** restricted to `transform, opacity, filter, box-shadow` (`!important`)
- **H1–h6 are uppercase** by default (Space Grotesk, `text-transform: uppercase`)
- **Dark mode** is class-based (`.dark` selector), `enableSystem={false}` in next-themes
- **Fluid type utilities**: `.text-display`, `.text-h1`–`.text-h3`, `.text-body`, `.text-small`, `.text-mono`
- **Brutalist borders**: `.border-brutal` (2px), `.border-brutal-thin` (1px)
- **Additional CSS utilities** (globals.css): `.section-container`, `.text-gradient`, `.mask-edges`, `.diagonal-clip-right`, `.diagonal-clip-left`, `.gpu-accelerated`
- **Noise + scanline overlays** on `body::before` / `body::after`
- **`gpu-accelerated`** class available for animation targets
- **`lib/motion.ts`** — shared GSAP presets, easing constants, factory functions (fadeInUp, fadeIn, scaleIn, counter, scrollReveal, magneticEffect, etc.). Import instead of writing raw GSAP.

## Architecture

- `/` — Single-page layout stacking: Navbar → Preloader → Hero → About → Projects → Skills → Testimonials → Contact → Footer
- `/projects` — GitHub repo archive with language filter + sort
- `/testimonials` — MongoDB-backed testimonials with date filter
- `/api/contact` — POST via Resend; `/api/testimonial` — GET/POST via MongoDB
- `app/components/layout/` — Navbar, SectionReveal, (persistent layout wrappers)
- Non-critical components are **lazy-loaded**: `next/dynamic` with `ssr: false` (Cursor, FloatingMenu, Preloader, ScrollToTop, Testimonials, ProjectList, SkillsMarquee, Contact, Footer)

## Data

- **GitHub**: Octokit → `IamNishant51`, 1-hour in-memory cache, filters forks/archived/private
- **MongoDB**: Collection `portfolio.testimonials`, `MONGODB_URI` env var (dev fallback `mongodb://localhost:27017/`)
- **Images**: Allowed hosts — `ik.imagekit.io`, `picsum.photos`, `i.pravatar.cc`, `ui-avatars.com`
- **Env vars**: `MONGODB_URI`, `RESEND_API_KEY`, `EMAIL_TO` (fallback: `nishant.unavane@outlook.com`)

## Style Quirks

- Path alias `@/*` → `./*`
- `clsx` and `tailwind-merge` are in package.json but **not imported anywhere** (vestigial)
- `agentation` is in deps but **unused**
- ESLint uses v9 flat config (`eslint.config.mjs`)
- PostCSS uses `@tailwindcss/postcss` (Tailwind v4 plugin, not v3)
- CI: GitHub Action on push to main → SSH deploy (secrets: SSH_KEY, SERVER_IP, SSH_USER, DEPLOY_PATH, START_COMMAND)
