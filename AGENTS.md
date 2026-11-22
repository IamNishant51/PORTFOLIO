# AGENTS.md — operating rules for the coding agent

You are building **Nishant Unavane's portfolio, 2027 edition**: a light-theme, neo-classical editorial site with hand-painted plates, scroll-driven storytelling, and Next.js. The plan is finished. Your job is execution without drift.

## Read order (every session, before touching code)

1. `AGENTS.md` (this file) — the rules.
2. `CONTENT.md` — the only permitted source of words and facts.
3. `DESIGN.md` — the only permitted source of colour, type, spacing, motion.
4. `BUILD-PLAN.md` — sections, storyboard, stack, phases.
5. `ASSET-PROMPTS.md` — asset filenames and where each one goes.

If two files disagree: `DESIGN.md` wins on visuals, `CONTENT.md` wins on facts, `BUILD-PLAN.md` wins on structure. Never resolve a conflict by inventing something.

## Hard rules

**Facts**
- Do not invent projects, metrics, employers, clients, dates, testimonials, awards, or blog posts. Everything must exist in `CONTENT.md`.
- Do not "refresh" a number. `4,458 npm downloads` stays `4,458` until the user updates `CONTENT.md`.
- Do not write fake case-study outcomes. If a section needs data you don't have, emit `TODO(content): <what you need>` and stop that section.
- Do not generate project UI mockups. Screenshots go in `ASSETS/08-project-shots/` from the real products.

**Visual**
- No hex value in any component file. Every colour is a token from `globals.css @theme`. If you need a new colour, you don't — use an existing token.
- No font family outside Instrument Serif / Geist Sans / Geist Mono. No bold display type.
- No dark mode. Do not add `prefers-color-scheme` handling. The site is light.
- No `rounded-3xl` on full-bleed images, no `backdrop-blur` outside `FloatingNote`, no `shadow-xl`, no gradient buttons.
- Terracotta appears at most twice per viewport.
- One dark band exists: Act 05. Do not darken anything else.

**Code**
- No new dependency without asking. The stack is locked in `BUILD-PLAN.md §6`. Specifically: no framer-motion, no UI kit, no icon library, no CSS-in-JS, no state manager, no CMS.
- One shared `<Reveal>` for scroll reveals. No per-section animation code.
- Every animation must be gated by `matchMedia('(prefers-reduced-motion: reduce)')` at init.
- `next/image` for every raster asset, with explicit `sizes`. Never a raw `<img>` for a plate.
- TypeScript strict, no `any`, no `@ts-ignore`. Props typed inline for leaf components, exported interfaces for shared ones.

## Asset contract

- Files live at `public/assets/<folder>/<file>` with **exactly** the folders and filenames in `ASSET-PROMPTS.md §4`. Do not rename, do not reorganise, do not add hashes.
- Every plate is wrapped in `<PlateFrame>` with a `meta` caption (`PLATE 03 — THE COLONNADE`).
- Every artwork has scene-describing `alt` text. Decorative-only layers get `alt=""` and `aria-hidden`.
- **If an asset is missing:** use the act's plate. Never substitute a gradient, a stock photo, a CSS blob, or a generated placeholder. Never ship a grey box.
- Alpha layers are `position: absolute` inside a `relative` scene container with `pointer-events: none` and `will-change: transform`.

## Copy contract

- Sentence case. No exclamation marks. No emoji.
- Banned: passionate, innovative, cutting-edge, seamless, revolutionary, elevate, unlock, ninja, rockstar, "digital experiences".
- Max 62ch measure. Max 2 lines for a hero sub. Max 1 sentence for a card line.
- Numbers before adjectives.

## Component contracts

Build these once, use everywhere. Do not fork them.

| Component | Contract |
|---|---|
| `Reveal` | `y:24→0`, opacity, 700ms, `top 85%`, `delay` prop, respects reduced motion |
| `PlateFrame` | mat + hairline + optional caption; children are the image |
| `ActHeader` | `ACT 0X / 06 · LABEL` meta row + hairline + `display-xl` line with one italic word |
| `FloatingNote` | 240–300px, glass, `±1.5deg` rotation, no icon library |
| `StatBlock` | serif numeral + mono label + hairline top |
| `ProjectRow` | hairline top, index, title, one-liner, proof, stack, arrow, hover thumbnail |
| `MarqueeStrip` | 40s linear, pause on hover, `aria-hidden` + hidden real list |

## Motion contract

- Lenis `lerp 0.09`, wired to `ScrollTrigger.update` via `gsap.ticker`.
- `scrub: 0.8` minimum. Never `scrub: true`.
- Never nest pins. Never pin two sections at once.
- Mobile: pin distance ×0.6, parallax ×0.4.
- Display type animates per **line** (clip wipe), never per character.
- Durations/easings come from the tokens in `DESIGN.md §6`.

## Anti-slop gate (run before you say a section is done)

Answer honestly. Any "yes" is a rewrite:

1. Could this section be dropped into any other SaaS site unchanged?
2. Are there three equal cards in a row with an icon on top?
3. Is everything centred?
4. Does a gradient do the work that artwork should do?
5. Is there more than one accent colour visible?
6. Is the display type bold, or a second serif family?
7. Would the section still be legible with the image removed? (Must be yes.)
8. Does any animation loop forever for no reason?
9. Is any copy a sentence that means nothing ("crafting digital experiences")?
10. Does the mobile version merely stack the desktop layout without re-composing?

## Verification (evidence, not vibes)

```bash
npm run build          # must pass, zero warnings you introduced
npx tsc --noEmit       # strict, clean
npx eslint .           # clean
npx playwright test    # smoke: every route 200, no console errors, no CLS > 0.02
```

Then, for any visual change: **open it in a real browser at 375px and 1440px and look at it.** Quote what you saw. Typecheck alone is not verification for a design build.

Also check, per phase:
- Images blocked → does the page still read?
- JS disabled → does the page still read?
- Tab through the whole page → is focus always visible?
- Toggle OS reduced-motion → is the site still finished?

## When to stop and ask

Ask the user (do not guess) if:
- A fact, metric, link, or claim is needed but absent from `CONTENT.md`.
- An asset in `ASSET-PROMPTS.md` doesn't exist yet.
- A design decision would require a new dependency, a new colour, or a new font.
- You are about to delete or restructure existing work.

## Forbidden, one line each

No lorem ipsum. No placeholder images. No "coming soon". No fake testimonials. No invented logos. No dark mode. No emoji. No per-character text animation. No scroll-jacking without a keyboard escape. No `console.log` in committed code. No `!important`. No inline styles except computed transforms. No second display typeface. No copying assets, copy, or layouts from the reference sites in `ASSETS/00-references/` — they are inspiration for *system and composition* only.
