# BUILD-PLAN.md — sections, scroll storyboard, stack, phases

Read `DESIGN.md` (visual law) and `CONTENT.md` (copy law) first. This file is the *build* law.

---

## 1. The narrative

The homepage is **one continuous walk through a classical estate**, told in six acts. Scrolling is walking. The artwork is the estate; the copy is the wall text.

| Act | Scene | Means | Carries |
|---|---|---|---|
| 01 | Arrival — open sky | ambition, space | hero, positioning, CTAs |
| 02 | The colonnade | structure, foundations | 4 disciplines, stack |
| 03 | The temple | built work | 4 flagship projects |
| 04 | The sea | exploration | experiments, side projects |
| 05 | The studio | the person | about, method, timeline, portrait |
| 06 | The horizon | invitation | contact, footer |

Act 05 is the **only** dark band. Acts 01→04 are continuous daylight; 06 is late afternoon. The light *changes across the page* — that is the storytelling, not a gimmick.

**Route map**

```
/                    homepage (6 acts)
/work/[slug]         4 case studies (custom-pi, synapse, carto, ollama-agent)
/colophon            type, stack, credits, "how this was made" (small, high-craft page)
/404                 paper page, one serif line, one link home
```

No blog in v1. No CMS — content lives in `content/*.ts` typed files generated from `CONTENT.md`.

---

## 2. Hero copy (locked)

```
META ROW   PORTFOLIO 2027 · PUNE, IN · 創

H1         Software,
           made by hand.        ← "hand" in italic

SUB        Full-stack developer and agentic systems engineer.
           I build interfaces, developer tools, and the coding
           agents that use them.

ACTIONS    [View the work →]   Résumé ↗

FOOTNOTE   Currently building Custom-PI · 10,340 downloads across shipped tools
```

Two lines only. `display-mega`. No badge above it, no avatar cluster, no "trusted by".

---

## 3. Section-by-section spec

### ACT 01 — Arrival

- **Layout:** full-bleed `a1-sky-plate` as a fixed background layer (`position: fixed; inset: 0; z-index: 0`), scaled `1.04`. Content grid 12-col; H1 occupies cols 1–8, sub cols 1–5, actions cols 1–4. Right side stays empty — that emptiness is the design.
- **The sky owns the top.** H1 baseline lands at **62–70% of the viewport height**, not at the top. The top third of the screen is pure painted sky with only the meta row floating in its corner. This single decision is what separates the page from a template hero — centring the type is the AI default.
- **Overlays:** `a1-clouds-far` bottom-left, `a1-clouds-near` bottom-right (partially off-canvas), `a1-heron` top-right at 12% from the right edge, small.
- **Meta row:** `meta` type, sits at the very top of the content block, 1px hairline under it spanning cols 1–12.
- **Scroll:** no pin. Sky parallax 0.12×, far clouds 0.30×, near clouds 0.55×, heron `x: +6%, y: -3%`, hero copy `opacity 1→0` over 0–35% of viewport, `translateY: -40px`.
- **Enter animation:** per-line clip wipe on H1 (2 lines, 120ms apart), meta fades 200ms, sub 300ms, actions 400ms. Total 1.1s after the curtain lifts.

### ACT 02 — The Colonnade

- **Scene:** `a2-colonnade-plate` pinned for `200vh`. The plate is the room; the two column PNGs stand in front of it at the left and right edges.
- **Copy:** `ACT 02 / 06 · THE FOUNDATION` meta → H2 `Four columns hold it up.` (*hold* italic) → one-line sub: "Every project I ship sits on the same four disciplines."
- **The four disciplines** are the four columns of type that appear *in the gap* as the columns split: I Interface / II System / III Movement / IV Intelligence, each with its tech list in `meta` and one line of body. Vertical stack on mobile, 4-across on desktop, each 3 cols wide, hairline separators.
- **Scroll timeline (scrub, pinned):**
  - `0–25%` plate `scale 1 → 1.06`, H2 wipes in.
  - `25–65%` `a2-column-left x: 0 → -28%`, `a2-column-right x: 0 → +28%`, columns `opacity 1 → 0.9`; disciplines stagger in (80ms each) at 35%.
  - `65–100%` `a2-engraving-detail` slides up into a `PlateFrame` at bottom-right, caption `PLATE 02 — CAPITAL STUDY`.
- **Fallback (reduced motion):** no pin, static plate, disciplines in a plain 2×2 grid.

### ACT 03 — The Temple (the work)

- **Scene:** `a3-temple-plate` as a section background that cross-fades in from Act 02 over the first 30% of the section (shared fixed layer, opacity scrub — do **not** stack two fixed layers, it doubles paint cost).
- **Copy:** `ACT 03 / 06 · SELECTED WORK` → H2 `Four things I built, / and still maintain.` (*still* italic).
- **Project rows** — not cards. Each row: hairline top → index `01` in serif 40px → title `display-lg` → subtitle one-liner → proof line in `meta` → stack in `meta` → arrow. Rows are full-width, left-aligned, `padding-block: 40px`.
- **Hover:** the project's real screenshot slides in from the right, `clip-path` reveal, 0.7 opacity, 420ms expo; the row title shifts `x: 8px`. On touch, the screenshot is simply shown below the title.
- **Featured project (Custom-PI):** sits in `a3-arch-frame` as a CSS `mask-image` — the screenshot is visible *through* the stone arch. Caption under it in `meta`.
- **`a3-marble-bust`:** floats right at `opacity: .92`, `parallax 0.3×`, `z-index` below the rows, above the plate. It never overlaps text at any breakpoint — if it would, hide it below 1280px.
- **Rows reveal:** `y 24 → 0`, opacity, 700ms, stagger 60ms, `top 85%`.

### ACT 03.5 — Marquee separator

One `MarqueeStrip` of the full stack, `meta` type, terracotta bullet separators, 40s linear, pauses on hover, `aria-hidden` with a visually hidden real list. Exists to give the eye a beat between two heavy scenes.

### ACT 04 — The Sea (experiments)

- **Scene:** `a4-sea-plate` (21:9) pinned `150vh`; **vertical scroll drives horizontal drift** `x: 0 → -12%`. This is the "insane scroll animation" moment that costs nothing in performance.
- **Copy:** `ACT 04 / 06 · FIELD NOTES` → H2 `Smaller boats.` → sub "Side projects, tools and experiments that didn't need to become companies."
- **Three experiments** as a horizontal-ish staggered list: title `display-md`, tag `meta`, one line, arrow. `atlas-mcp-server`, `frame`, `Three.JS-Book`.
- **Motion:** `a4-sail x: 62% → 18%` across the pin, `y` slight sine; `a4-cypress` at the left edge `x: -4% → 0`. Experiment items fade in at 30/50/70%.

### ACT 05 — The Studio (dark navy band)

- **This is the only dark surface in the site.** `navy #1F2C3D`, paper grain inverted (`mix-blend-mode: screen`, opacity .04).
- **Backdrop:** `a5-desk-plate` at `opacity: .18`, `scale: 1.08`, parallax 0.2×. Text stays ≥ 7:1 because the plate is dimmed — verify with a contrast check, do not eyeball it.
- **Copy:** `ACT 05 / 06 · THE STUDIO` → H2 `How the work gets made.` → two paragraphs (from CONTENT.md §5 positioning, rewritten to first person).
- **Method:** 4 steps in an asymmetric 2×2 grid — numerals `01–04` in serif 56px, title, one line. Hairline rules between. Off-grid: step 02 is indented 1 column, step 04 is 2 columns wide.
- **Timeline:** 3 rows, year in `meta`, title in serif, one line. Hairline tops.
- **Portrait:** `a5-portrait-halftone` inside a `PlateFrame`, right column, caption `PLATE 05 — THE STUDIO, 2027`.
- **Stats:** 4 `StatBlock`s in a single row above the timeline — serif numerals, mono labels.
- **Motion:** the band enters with a paper-to-navy colour wipe (`clip-path: inset(100% 0 0 0)` → `inset(0)`, 900ms quart). Method numerals count up? **No.** No counters. Numerals fade in only.

### ACT 06 — The Horizon (contact + footer)

- **Scene:** `a6-horizon-plate` full-bleed, `min-height: 100svh`, no pin. Sun `y: +12%` as you scroll in; birds drift `x: +3%`.
- **Copy:** H2 `Let's make something / worth keeping.` (*keeping* italic), then the email as a giant mailto link (`display-lg`, ink, terracotta underline on hover), then GitHub · LinkedIn · Résumé in a row.
- **Footer:** hairline top, 4 columns: identity / navigate / elsewhere / colophon. Copyright `© 2027 Nishant Unavane`. Colophon line: `Set in Instrument Serif & Geist. Built with Next.js, GSAP and Three.js.`

---

## 4. Chrome (persistent UI)

| Element | Spec |
|---|---|
| **Nav** | Fixed, 72px, transparent over Act 01, gains `paper` + hairline after 40px scroll (GSAP `toggleClass`). Left: monogram + name in `meta`. Centre: 3 links (`Work`, `Studio`, `Contact`). Right: `Résumé ↗` outline pill. Mobile: monogram + a 2-line burger that opens a full-screen paper sheet. |
| **Cursor** | 8px ink dot + 28px ring, `mix-blend-mode: difference` on the ring only over artwork. Ring scales 1.6 + fills `paper-soft` over links. Disabled on touch and when `prefers-reduced-motion`. |
| **Grain** | Fixed SVG feTurbulence, `opacity .035`, `z-index 60`, `pointer-events: none`. |
| **Preloader** | `paper` curtain, centred counter in serif `0 → 100`, 900ms minimum, then `clip-path` lift 900ms quart. Locks scroll. Never longer than 1.6s. Skip entirely on repeat visits (sessionStorage). |

---

## 5. Motion spec

**Libraries — exactly these, no more**

| Job | Tool |
|---|---|
| Smooth scroll | `lenis@1.1` |
| Scroll choreography, pinning, scrub | `gsap@3.12` + `ScrollTrigger` (both free) |
| UI micro-interactions | CSS transitions + GSAP `to()` — **no framer-motion** |
| Route transitions | Next.js View Transitions API (`experimental.viewTransition: true`) |
| Optional WebGL | `three` + `@react-three/fiber` — **phase 2 only**, see §8 |

**Lenis ↔ ScrollTrigger wiring**

```ts
const lenis = new Lenis({ lerp: 0.09, smoothWheel: true })
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((t) => lenis.raf(t * 1000))
gsap.ticker.lagSmoothing(0)
```

`ScrollTrigger.config({ ignoreMobileResize: true })`. Refresh on route change and after fonts load (`document.fonts.ready`).

**Easing / duration tokens** — calibrated against the three reference teardowns (`§12`), not guessed. Use the CSS variables; never inline a cubic-bezier.

| Token | Value | Use |
|---|---|---|
| `--ease-move` | `cubic-bezier(.22,1,.36,1)` | transforms, hovers, wipes |
| `--ease-entrance` | `cubic-bezier(.16,1,.3,1)` | reveals, plate flow-in |
| `--ease-wipe` | `cubic-bezier(.76,0,.24,1)` | route transition, scene handoff |
| `--dur-hover-in` | `90ms` | pointer enters |
| `--dur-hover-out` | `140ms` | pointer leaves — **asymmetric on purpose** |
| `--dur-quick` | `160ms` | press, toggle |
| `--dur-standard` | `220ms` | UI state |
| `--dur-calm` | `320ms` | sheets, dialogs |
| `--dur-slow` | `420ms` | hover thumbnails, image reveals |
| `--dur-reveal` | `700ms` | type line wipes |
| `--dur-plate` | `1500ms` | artwork flow-in |
| `--dur-scene` | `1200ms` | act handoffs |

**Two reveal recipes — do not mix them.**

1. **Type** (`<Reveal>`): per-line clip wipe, `700ms` `--ease-entrance`, trigger `top 85%`, stagger `60–120ms`. No `translateY` on display type — the wipe is the movement.
2. **Artwork** (`<RevealPlate>`): the "expensive" entrance — `opacity 0→1`, `translateY(180px)→0`, `scale(1.4)→1`, `1500ms` `--ease-entrance`. Big travel, long duration, soft settle. A 300ms fade-up is what makes a site feel cheap; this is the single highest-leverage motion decision in the build.

**Scrubbed properties** always get `ease: 'none'` and a normalised `duration: 1` inside a `scrub: 0.8` ScrollTrigger. Easing a scrub double-eases and reads as lag.

**Hard rules**
- Never animate per-character on display type. Per-line clip wipes only.
- Never `scrub: true` — always `scrub: 0.8` or higher, or the scene jitters on trackpads.
- Never pin more than one section at a time; pins must not nest.
- `matchMedia` for `(prefers-reduced-motion: reduce)` → kill all pins, parallax and Lenis at init, not on change.
- On mobile: pin distances ×0.6, parallax ×0.4, blur effects off, cursor off.
- **Page transition = one geometric mask, not a fade.** Five equal-height paper panels (`~18vh` each, desktop) offset horizontally, sliding up-left as one shape over `800ms` `--ease-wipe`, ink-coloured on the leading edge. Under it, a shared `view-transition-name` on the project title → case study H1. Mobile: 3 panels. Never a spinner, never a plain fade between routes.

---

## 6. Tech stack (locked)

```
Next.js 15.x (App Router) · React 19 · TypeScript strict
Tailwind CSS v4 (CSS-first @theme, tokens from DESIGN.md)
GSAP 3.12 + ScrollTrigger · Lenis 1.1
shadcn/ui (Radix primitives, restyled) — dialog, sheet, tooltip, accordion only
next/font — Instrument Serif + Geist Sans + Geist Mono (self-hosted, subset latin)
next/image + sharp
View Transitions API
Vercel
```

**Deliberately not included:** framer-motion (GSAP covers it), styled-components, any UI kit with opinions (MUI/Chakra), any icon pack beyond a handful of inline SVGs, any 3D in v1, any CMS, any analytics beyond Vercel Analytics (optional).

**React Bits:** maximum 2 components, restyled to tokens. Recommended: `ScrollVelocity` for the marquee, `RotatingText` for one act title. Copy the source into `components/reactbits/` and delete everything you don't use. A third React Bits import is a code-review reject.

---

## 7. Project structure

```
app/
  layout.tsx                 fonts, metadata, grain, cursor, nav, footer
  page.tsx                   the 6 acts, composed from components/acts/*
  work/[slug]/page.tsx       case study template (generateStaticParams from content)
  colophon/page.tsx
  not-found.tsx
  globals.css                @theme tokens, base, utilities
  sitemap.ts  robots.ts  opengraph-image.tsx
components/
  chrome/       Nav, Cursor, Grain, Preloader, PageTransition
  acts/         Act01Arrival … Act06Horizon
  primitives/   Reveal, PlateFrame, ActHeader, FloatingNote, StatBlock, MarqueeStrip
  ui/           shadcn (restyled)
content/
  projects.ts   typed from CONTENT.md — the only source of project data
  profile.ts
  experiments.ts
lib/
  gsap.ts       registers plugins, exports configured gsap
  lenis.ts      provider + ScrollTrigger wiring
  seo.ts        metadata builders, JSON-LD builders
  motion.ts     shared easings/durations mirrored from CSS vars
public/
  assets/…      exactly the folders in ASSETS/ (see ASSET-PROMPTS.md)
  llms.txt
  fonts/
```

Assets live at `public/assets/<folder>/<file>.webp` — same folder names as `ASSETS/`. The build agent copies, it does not reorganise.

---

## 8. Phases (build in this order, ship after each)

| Phase | Deliverable | Done when |
|---|---|---|
| **P0 — Foundation** | Next app, tokens in `@theme`, fonts, grain, nav, footer, layout shell | `next build` clean, Lighthouse a11y 100 on an empty page |
| **P1 — Static acts** | All 6 acts rendered with real copy and placeholder-free layouts, zero animation | Full page reads correctly with JS disabled. **Do not start animation before this passes.** |
| **P2 — Motion** | Lenis + GSAP reveals, Act 02 pin, Act 04 drift, Act 06 sun | 60fps on a mid-range Android; no layout shift; reduced-motion path works |
| **P3 — Assets** | All 24 assets in, plates framed, parallax layers wired | Every image `next/image`, correct `sizes`, no CLS on load |
| **P4 — Pages** | 4 case studies + colophon + 404 + View Transitions | Every route reachable, metadata complete, OG renders |
| **P5 — Polish** | Cursor, preloader, hover states, focus rings, sound-off micro-details | Full keyboard pass, axe clean, contrast verified |
| **P6 — Optional WebGL** | One shader moment (cloud displacement on Act 01) | Only if P2–P5 hold 60fps *and* JS budget still under 180KB. Otherwise skip permanently. |

**Never** build P2 before P1. Animation on top of an unfinished layout is how the "AI slop" look happens.

---

## 9. Performance budget (enforced)

| Metric | Target |
|---|---|
| LCP | < 1.8s (hero plate preloaded, `fetchpriority=high`) |
| CLS | < 0.02 |
| INP | < 200ms |
| Homepage JS | < 180KB gzip |
| Above-the-fold images | < 700KB total |
| Total page weight | < 3.5MB |
| Lighthouse perf (mobile) | ≥ 85 |
| Lighthouse a11y | 100 |

Rules: plates are WebP q82, alpha elements WebP q88; `sizes` on every `next/image`; parallax layers `loading="lazy"` except the two in the first viewport; no font > 2 weights per family; preload only Instrument Serif 400 + Geist 400.

---

## 10. SEO / AEO

**Technical**
- `metadata` per route via the Metadata API; `title.template = '%s — Nishant Unavane'`.
- Canonical on every page. `sitemap.ts` + `robots.ts`. No `noindex` anywhere.
- OG + Twitter card images generated per route (`opengraph-image.tsx`) using the OG composition from `ASSET-PROMPTS.md §4`.
- One `<h1>` per page. Heading order never skipped. Landmarks: `header/nav/main/section[aria-labelledby]/footer`.
- `lang="en"`. `theme-color` `#F6F2E9`. Explicitly **do not** ship a dark-mode media query.

**Structured data (JSON-LD, in `lib/seo.ts`)**
- `Person` — name, jobTitle, url, sameAs (GitHub, LinkedIn), knowsAbout.
- `WebSite` — name, url, author.
- `SoftwareSourceCode` / `CreativeWork` per project — name, description, codeRepository, programmingLanguage, keywords. This is what makes case studies quotable by answer engines.
- `BreadcrumbList` on case studies.
- `FAQPage` on each case study — 3 real Q&As (Why local-first? Why a knowledge graph? etc.). Real answers from CONTENT.md, never invented.

**AEO (answer-engine optimisation)**
- `public/llms.txt` — plain text: who he is, what he builds, the four projects with one-line descriptions and canonical URLs, contact. This is the single highest-leverage AEO file.
- Every case study opens with a **40–60 word definitional paragraph** that answers "what is this and why does it exist" in one breath. Answer engines lift that block.
- Use the real metrics inline (`4,458 npm downloads`), because that is what gets quoted.
- No keyword stuffing, no hidden text, no "AI-generated" boilerplate. AEO rewards specificity.

**Copy hygiene**
- Title pattern: `Custom-PI — a coding agent with working memory | Nishant Unavane`.
- Meta description: ≤ 155 chars, factual, no adjectives.
- Alt text describes the scene, not the filename.

---

## 11. Definition of done

- [ ] Every word on the page traces to `CONTENT.md`. No invented project, metric, client or date.
- [ ] Zero placeholders: no lorem, no grey boxes, no `coming soon`.
- [ ] Six acts read correctly with JS disabled and with images blocked.
- [ ] Reduced-motion path is a real, finished experience — not a broken one.
- [ ] No colour outside `DESIGN.md §2`. Grep the CSS for hex values outside the token file: should be zero.
- [ ] Keyboard: every interactive element reachable, visible 2px focus ring, `End` escapes pinned scenes.
- [ ] No section is a 3-up card grid. No emoji. No dark mode. No second display family.
- [ ] Mobile 375px and 1440px both hand-checked in a real browser, not just responsive devtools.
- [ ] Lighthouse: perf ≥ 85, a11y 100, best-practices ≥ 95, SEO 100.

---

## 12. Reference teardown — what we take, what we reject

Verified by inspecting the three reference sites' live bundles (Nov 2026), not by eyeballing.

| Site | Real stack | Verified numbers worth stealing |
|---|---|---|
| russellnumo.nl | Next **pages** router, Chakra + Emotion, GSAP + ScrollTrigger, Lenis 1.1.5 | Page transition is a **5-step staircase wipe** (~90px steps, one shared transform, 800ms); display type at **14vw**, `lh .9`, `-0.02em`; ink is `#1A202C`, **not black** |
| adrienquechon.com | Nuxt 3 + Tailwind v4, three.js multi-pass, GSAP, Lenis | Display `108px` at `lh .85` with **`+0.03em`** tracking; all metadata in mono wrapped in `( )` / `[ ]`; whole page is 5 viewports; **zero image assets** — one procedural shader |
| andreas.vision | React 19 + Vite, Lenis, IntersectionObserver + CSS keyframes, **no GSAP** | `--ease-move cubic-bezier(.22,1,.36,1)`; `hover-in 90ms / hover-out 140ms`; entrance `y 300px + scale 1.5 → rest` over 1.5–2.1s; section separation by **full-bleed colour band**, not dividers; display type scaled in **`cqi`** |

### Adopted (now law, see §5)

1. Asymmetric hover timing — 90ms in, 140ms out.
2. Scrub gets `ease: 'none'`, `duration: 1`.
3. Artwork entrance travels `180–300px` at `scale 1.3–1.5` over `1.5s`. Type never travels — it wipes.
4. Page transition is a stepped geometric mask, not a fade.
5. Ink is `#1A1815`, never `#000`. Pure black only inside the staircase panels.
6. Hero type sits low (62–70% baseline) with the sky empty above.
7. Work list is an **editorial table**, not cards — hairline rows, serif titles, mono metadata.
8. Fluid type in container units: `cqi` inside containers, `svw` for full-bleed. `clamp(44px, 8.2cqi + 18px, 132px)` is the shape to copy.

### Rejected (and why)

- **Russell's full-bleed black hero** — we are light-theme; the dark moment is Act 05 only.
- **Adrien's WebGL hero** — its shader is the *whole* page; ours would be decoration competing with the plates. Stays P6/optional.
- **Andreas's saturated colour bands** (`#0AF` blue) — our colour voltage is the artwork, not a fill. Our equivalent band is the navy Act 05.
- **Three+ typefaces** — we run two families (Instrument Serif + Geist) plus mono. That is the ceiling.
- **Per-character display animation** (Russell does it at 14vw) — expensive, and it is the most common AI tell. Line wipes only.

### Ornament shortlist — pick 3, not 10

Cheap, specific, and only possible on *this* site. Each is ≤20 lines of code:

1. **Scroll percentage** in Instrument Serif, bottom-left of the hero, counting `00 → 100` in `meta` numerals.
2. **Bracketed mono labels** — `( 2027 )`, `[ LET'S TALK ]`, `( 04 / 06 )` — never plain parentheses around prose.
3. **Coordinate readout** under the Act 02 header: `18°31'12"N 73°51'22"E`.
4. **A 4px arrow nudge** on hover, not 8px.

Anything beyond these four is scope creep and gets cut.

### The one principle we take from all three

Each site repeats **one motif** across unrelated surfaces — Russell's staircase, Adrien's silk ribbon, Andreas's pixel dither. Ours is the **engraved line + paper grain**: it appears in the etching assets, in the halftone portrait, in the hairline rules, and in the grain overlay. If a new element can't carry that motif, it doesn't belong on the page.
