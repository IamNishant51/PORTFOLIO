---
version: 1.0
name: Nishant-Unavane-Portfolio-2027
description: A neo-classical editorial portfolio. Warm paper canvas (#F6F2E9), warm near-black ink (#1A1815), and hand-painted engraved plates of colonnades, temples, marble and cloud banks that the page scrolls *through* like a walk across an estate. Display type is Instrument Serif at weight 400 (never bold); body is Geist. Colour voltage comes from the artwork, not from UI chrome. One terracotta accent (#C05B3C) used no more than twice per viewport. One dark band (deep navy #1F2C3D) exists in the whole site. Everything else is paper, ink, hairline.
colors:
  # --- paper & ink -------------------------------------------------
  paper: "#F6F2E9"            # default page canvas (warm cream)
  paper-soft: "#FBF8F2"       # alternating lighter band
  paper-deep: "#EFE9DC"       # recessed band, table surfaces
  paper-edge: "#E7DFCE"       # inset panels inside artwork frames
  ink: "#1A1815"              # display + primary text
  ink-soft: "#3D3931"         # secondary headings
  body: "#4A463D"             # running text (8.4:1 on paper)
  muted: "#8A8375"            # meta labels ONLY at >=16px / decorative
  hairline: "#DED6C6"         # 1px rules, frame edges
  hairline-strong: "#C9BEA8"  # frame edges over artwork
  on-ink: "#F6F2E9"
  on-dark: "#F3EEE3"
  # --- artwork palette (must match generated assets exactly) --------
  sky: "#A8C6DB"
  sky-deep: "#6E93AE"
  sky-pale: "#D6E4EC"
  sage: "#BFCBB8"
  sage-deep: "#93A88F"
  sand: "#D8C6A6"
  sand-deep: "#BFA783"
  terracotta: "#C05B3C"       # the single accent
  rose: "#D8AFA4"
  navy: "#1F2C3D"             # the one dark band
  # --- semantic ----------------------------------------------------
  success: "#5C7A52"
  error: "#A6402C"
typography:
  display-mega:
    fontFamily: "'Instrument Serif', 'Times New Roman', serif"
    fontSize: clamp(3.5rem, 9vw, 8.5rem)
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: -0.03em
  display-xl:
    fontFamily: "'Instrument Serif', serif"
    fontSize: clamp(2.75rem, 5.5vw, 5rem)
    fontWeight: 400
    lineHeight: 0.96
    letterSpacing: -0.025em
  display-lg:
    fontFamily: "'Instrument Serif', serif"
    fontSize: clamp(2rem, 3.4vw, 3.25rem)
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: -0.02em
  display-md:
    fontFamily: "'Instrument Serif', serif"
    fontSize: clamp(1.5rem, 2.2vw, 2rem)
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: -0.01em
  numeral:
    fontFamily: "'Instrument Serif', serif"
    fontSize: clamp(2.5rem, 4vw, 3.75rem)
    fontWeight: 400
    lineHeight: 1
    letterSpacing: -0.02em
  title:
    fontFamily: "'Geist', 'Inter', system-ui, sans-serif"
    fontSize: 1.25rem
    fontWeight: 500
    lineHeight: 1.35
    letterSpacing: -0.005em
  body:
    fontFamily: "'Geist', 'Inter', system-ui, sans-serif"
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: 0.005em
  body-sm:
    fontFamily: "'Geist', 'Inter', system-ui, sans-serif"
    fontSize: 0.9375rem
    fontWeight: 400
    lineHeight: 1.6
  meta:
    fontFamily: "'Geist Mono', ui-monospace, monospace"
    fontSize: 0.6875rem
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0.18em
    textTransform: uppercase
  nav:
    fontFamily: "'Geist', sans-serif"
    fontSize: 0.875rem
    fontWeight: 450
    lineHeight: 1.2
    letterSpacing: 0.01em
  button:
    fontFamily: "'Geist', sans-serif"
    fontSize: 0.875rem
    fontWeight: 500
    lineHeight: 1
    letterSpacing: 0.01em
rounded:
  none: 0px
  xs: 2px
  sm: 4px
  md: 8px
  lg: 14px
  xl: 20px
  pill: 9999px
spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  base: 16px
  md: 24px
  lg: 32px
  xl: 48px
  xxl: 72px
  section: 128px
  act: 200px
motion:
  ease-move: "cubic-bezier(0.22, 1, 0.36, 1)"
  ease-entrance: "cubic-bezier(0.16, 1, 0.3, 1)"
  ease-wipe: "cubic-bezier(0.76, 0, 0.24, 1)"
  ease-soft: "cubic-bezier(0.33, 1, 0.68, 1)"
  dur-hover-in: 90ms
  dur-hover-out: 140ms
  dur-quick: 160ms
  dur-standard: 220ms
  dur-calm: 320ms
  dur-slow: 420ms
  dur-reveal: 700ms
  dur-plate: 1500ms
  dur-scene: 1200ms
  dur-ambient: 2400ms
  lenis-lerp: 0.09
components:
  nav:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.nav}"
    height: 72px
    borderBottom: "1px solid {colors.hairline}"
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-ink}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: 13px 26px
    height: 44px
  button-outline:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    border: "1px solid {colors.hairline-strong}"
    rounded: "{rounded.pill}"
    padding: 12px 25px
    height: 44px
  button-text:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    underlineOnHover: true
  floating-card:
    backgroundColor: "rgba(255,255,255,0.72)"
    backdropFilter: "blur(14px) saturate(1.1)"
    textColor: "{colors.ink}"
    border: "1px solid rgba(255,255,255,0.85)"
    shadow: "0 24px 60px -24px rgba(26,24,21,0.22)"
    rounded: "{rounded.xl}"
    padding: 20px
  artwork-frame:
    backgroundColor: "{colors.paper-edge}"
    border: "1px solid {colors.hairline-strong}"
    padding: 10px
    rounded: "{rounded.xs}"
  project-row:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    borderTop: "1px solid {colors.hairline}"
    padding: "40px 0"
  meta-label:
    textColor: "{colors.muted}"
    typography: "{typography.meta}"
  stat-figure:
    textColor: "{colors.ink}"
    typography: "{typography.numeral}"
  dark-band:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.on-dark}"
    padding: "128px 48px"
  footer:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.body}"
    typography: "{typography.body-sm}"
    borderTop: "1px solid {colors.hairline}"
---

# DESIGN.md — Nishant Unavane, Portfolio 2027

> This file **replaces** `DESIGN-elevenlabs.md`. The ElevenLabs analysis is kept only as a reference for editorial *restraint* (off-white canvas, near-black ink, light-weight display serif, no saturated CTA colour). Everything specific below — palette, type, artwork, motion — is this project's own system and wins any conflict.

---

## 0. The one-sentence brief

A portfolio that reads like a **printed art book about engineering**: warm paper, engraved classical plates, one huge serif line per screen, and a page that scrolls like a walk through an estate — sky, colonnade, temple, sea, studio, horizon — where each act's artwork is the section's background and the copy sits *inside* the scene.

## 1. Art direction (the thing that makes it not look like AI)

**Reference DNA.** From the 13 inspiration screenshots the shared, extractable language is:

1. Warm off-white / cream paper as the base, never pure `#fff`.
2. **One enormous serif line** (Instrument-Serif-like: high contrast, slightly condensed, old-style italic available) with tight tracking, often two lines with the second line italic.
3. Muted sky-blue, sage, sand and dusty-rose artwork; **one** saturated accent (terracotta/orange) used on a single element.
4. Painterly or engraved texture — visible grain, canvas tooth, halftone, brush edge. Never clean vector gradients.
5. Floating white/glass cards with very soft shadows, small, placed off-axis over artwork.
6. Tiny mono/uppercase meta labels in the corners: coordinates, edition numbers, dates, `N 18°31' E 73°51'`.
7. Thin hairline rules and hairline-bordered frames (art presented like a museum plate with a mat).
8. Real photographic or painted human presence — never abstract blobs.

**The concept.** *The Estate.* The site is a walk through a classical landscape that stands for craft:
sky → colonnade → temple → sea → studio → horizon. Background artwork changes per act; copy is placed like wall text in a gallery; the scroll is the walk.

**Non-negotiable craft rules**

- **No purple/blue gradient SaaS look. No glassmorphism everywhere. No 3-up icon cards. No emoji. No "trusted by" logo wall.** These are the five strongest AI-slop signals.
- **Asymmetry is the default.** Headlines sit left-of-centre or bleed off the right edge. Nothing is centred except one deliberate moment (the Act 5 dark band).
- **Type over image edges.** Display lines may overlap the artwork by 8–14% — that overlap is what reads as designed-by-a-human.
- **Grain on everything.** A fixed 3.5% noise overlay above all content, below the cursor. Without it the painterly assets look like stock art.
- **Optical, not mathematical, alignment.** Hang punctuation, indent the first line of long copy, let one element sit 4px off the grid on purpose — but only one per screen.
- **Accent budget: 2 uses per viewport.** Terracotta is a spice.
- **One dark band in the entire site** (Act 5). If two sections are dark, the light theme dies.

---

## 2. Colour

### Paper & ink
| Token | Hex | Use |
|---|---|---|
| `paper` | `#F6F2E9` | Page canvas. The default. |
| `paper-soft` | `#FBF8F2` | Alternating band, card interiors |
| `paper-deep` | `#EFE9DC` | Recessed band, table surface |
| `paper-edge` | `#E7DFCE` | Mat inside artwork frames |
| `ink` | `#1A1815` | Display, primary text |
| `ink-soft` | `#3D3931` | Secondary headings |
| `body` | `#4A463D` | Running text — 8.4:1 on paper |
| `muted` | `#8A8375` | **Only** meta labels ≥16px or decorative. 3.4:1 — never for body copy. |
| `hairline` | `#DED6C6` | 1px rules |
| `hairline-strong` | `#C9BEA8` | Frame edges |

### Artwork palette (must match the generated plates)
`sky #A8C6DB` · `sky-deep #6E93AE` · `sky-pale #D6E4EC` · `sage #BFCBB8` · `sage-deep #93A88F` · `sand #D8C6A6` · `sand-deep #BFA783` · `rose #D8AFA4`

These are the *only* hues the Figma-generated assets may contain. If a generated asset introduces a colour outside this list, regenerate it — do not colour-correct it in CSS.

### Accent & dark
- `terracotta #C05B3C` — links on hover, one underline, one dot, the active act indicator, the single primary CTA in the hero. Nothing else.
- `navy #1F2C3D` — Act 5 band only.

### Ratio discipline
Per viewport: **~70% paper, 25% artwork, 4% ink type, 1% accent.** If a screenshot reads as colourful, it is wrong.

---

## 3. Typography

### Families (all free, all self-hosted via `next/font`)
- **Display — Instrument Serif** (400 + italic). High contrast, old-style, slightly condensed; the closest free match to the reference screenshots' display serif. **Never bold. Never below 24px.**
- **Body/UI — Geist Sans** (variable). Neutral, modern, not Inter — Inter is the default tell of AI-generated sites.
- **Meta — Geist Mono** (500, uppercase, `0.18em` tracking) for labels, coordinates, indices, stack lists.
- **Fallbacks:** `'Times New Roman', serif` / `system-ui, sans-serif`.

Licensed alternatives if the user buys them later: GT Sectra, Waldenburg, Söhne. Do not switch without asking — every asset's crop was composed for Instrument Serif's proportions.

### Scale
| Token | Size | Use |
|---|---|---|
| `display-mega` | `clamp(3.5rem, 9vw, 8.5rem)` / 0.92 / -0.03em | Hero line only. Two lines max. |
| `display-xl` | `clamp(2.75rem, 5.5vw, 5rem)` / 0.96 | Act titles |
| `display-lg` | `clamp(2rem, 3.4vw, 3.25rem)` / 1.02 | Section heads, project titles |
| `display-md` | `clamp(1.5rem, 2.2vw, 2rem)` / 1.1 | Card titles, pull quotes |
| `numeral` | `clamp(2.5rem, 4vw, 3.75rem)` | Stats — always serif, never mono |
| `title` | 20px Geist 500 | Labels with weight |
| `body` | 16px / 1.65 | Running text, max 62ch |
| `body-sm` | 15px / 1.6 | Captions, footer |
| `meta` | 11px Geist Mono 500 / 0.18em / uppercase | Everything small |

### Rules
- Hero: one line serif + **one** italic word for emphasis. Italic is the only emphasis device — no bold, no underline, no colour highlight.
- Body copy max **62ch**. Never full-width paragraphs.
- Display lines get `text-wrap: balance`; body gets `text-wrap: pretty`.
- Meta labels are the only uppercase text. Never uppercase a headline.
- Numerals in prose use tabular figures (`font-variant-numeric: tabular-nums`) only inside stats blocks.

---

## 4. Layout

- **Container:** `max-width: 1440px`, gutter `clamp(20px, 4vw, 64px)`. Artwork may bleed full-viewport; text never exceeds 1440px.
- **Grid:** 12 columns, `gap: 24px`. Text occupies 5–7 columns, artwork 7–12. Never centre a 12-col text block.
- **Act rhythm:** each act = `min-height: 100svh` scene + `padding-block: 200px`. Scenes overlap by 15–25vh so artwork cross-fades rather than cutting.
- **Vertical rhythm inside an act:** meta row → display line (48px below) → body (24px) → action (32px). Keep this order everywhere; it *is* the identity.
- **Whitespace:** if a section feels comfortable, add 25%. Empty paper is the product.
- **Corners:** artwork `2px` or `0`; cards `20px`; buttons `pill`. Never `rounded-3xl` on a full-bleed image.

### Mobile (< 768px)
- Hero `display-mega` → `2.75rem`; artwork crops to 4:5 portrait plates; floating cards collapse into one, positioned bottom-left; parallax reduced to 40%; grain stays.
- Nav becomes a full-screen paper overlay with serif links, 4 items, no icons.

---

## 5. Texture & material

| Layer | Spec | Where |
|---|---|---|
| Paper grain | `assets/01-textures/paper-grain.webp`, 512×512 tile, `background-repeat: repeat`, `opacity: .06`, `mix-blend-mode: multiply` | body, fixed |
| Noise overlay | inline SVG feTurbulence, `opacity: .035`, `pointer-events: none`, `position: fixed`, `z-index: 60` | above everything except cursor |
| Halftone | `halftone-45.webp`, 25% opacity multiply | portrait treatment, stat blocks |
| Vignette | radial `rgba(26,24,21,0.10)` → transparent, 120% size | inside artwork frames only |
| Plate edge | 1px `hairline-strong` + 10px `paper-edge` mat | every framed artwork |

**Never** apply `filter: blur()` to artwork for "depth". Depth comes from parallax speed and scale, not blur. Blur reads as a broken asset.

---

## 6. Motion

Full choreography lives in `BUILD-PLAN.md §5`. Tokens:

- Easing: `--ease-out-expo cubic-bezier(0.16,1,0.3,1)` for entrances; `--ease-in-out-quart cubic-bezier(0.76,0,0.24,1)` for scene transitions; never `linear` except marquees.
- Durations: micro 180 · ui 320 · reveal 700 · scene 1200 · ambient 2400+.
- Scroll: **Lenis** `lerp: 0.09`, `smoothWheel: true`. GSAP ScrollTrigger `scrollerProxy` bound to Lenis.
- Reveals: `y: 24px → 0`, `opacity: 0 → 1`, 700ms expo, stagger 60ms, trigger at `top 85%`.
- Display lines reveal **per line** with a clip-path wipe (`inset(0 0 100% 0)` → `inset(0)`), not per character. Per-character animation is the AI-slop tell.
- Artwork parallax: 0.12× for far layers, 0.3× mid, 0.55× near. Never above 0.6 or it feels like a slideshow.
- `prefers-reduced-motion: reduce` → all parallax off, reveals become 200ms opacity only, Lenis destroyed, pinned scenes unpinned.

---

## 7. Components

Build on **shadcn/ui** for behaviour (dialog, accordion, tooltip, sheet, form) and restyle with the tokens above. shadcn defaults look like shadcn — override radius, font, shadow and border on every primitive.

**Signature components (build these, they carry the design):**

1. `PlateFrame` — artwork in a mat + hairline, with a mono caption underneath (`PLATE 03 — THE COLONNADE · 1920×1080`).
2. `ActHeader` — meta row (`ACT 02 / 06` · coordinates · year) above a `display-xl` line with one italic word.
3. `FloatingNote` — the small glass card from the references; 240–300px wide, one icon-free glyph, 2 lines of copy, soft shadow, rotated `-1.5deg` to `1.5deg`.
4. `ProjectRow` — hairline-topped row, index numeral in serif, title `display-lg`, one-line proof, stack in mono, hover: the row's artwork thumbnail slides in from the right at 0.7 opacity.
5. `StatBlock` — serif numeral + mono label + hairline above.
6. `MarqueeStrip` — mono stack list scrolling at 40s, paused on hover, used once (between Act 3 and 4) to separate two heavy scenes.
7. `Cursor` — removed 2026-11-23 at the owner's request. The site uses the native cursor only; there is no custom cursor component and no `cursor: none` anywhere.

**React Bits usage:** allowed for **max 2** components (recommend `TextPressure` or `RotatingText` for one act title, and `ScrollVelocity` for the marquee). Everything else hand-built. Any React Bits component must be re-skinned to these tokens before it ships — default React Bits styling is instant AI-slop.

---

## 8. Asset usage map

| Act | Assets | Placement |
|---|---|---|
| 0 — Chrome | `01-textures/*` | global grain, halftone, plate edges |
| 1 — Arrival | `02-act1-arrival/sky-plate`, `clouds-far`, `clouds-near`, `heron` | sky-plate as fixed background; clouds parallax; heron drifts right on scroll |
| 2 — Colonnade | `03-act2-colonnade/colonnade-plate`, `column-left`, `column-right`, `engraving-detail` | plate pinned; columns split apart as the copy scrolls through the gap |
| 3 — Temple | `04-act3-temple/temple-plate`, `marble-bust`, `arch-frame` | plate cross-fades in; bust floats over the project list; arch frames the featured project |
| 4 — Sea | `05-act4-sea/sea-plate`, `sail`, `cypress` | horizontal drift while scrolling vertically; sail crosses the horizon line |
| 5 — Studio | `06-act5-studio/desk-plate`, `instruments`, `portrait-halftone` | dark band; desk plate at 18% opacity behind copy; portrait in a plate frame |
| 6 — Horizon | `07-act6-horizon/horizon-plate`, `sun`, `birds` | full-bleed closing plate, sun rises 12% on scroll into the footer |
| — | `08-project-shots/*` | **real screenshots only** — never AI-generated UI |
| — | `09-brand/og`, `monogram` | OG image, favicon, favicon-mask |

Exact filenames, ratios and prompts: `ASSET-PROMPTS.md`. The asset map is binding — if an asset is missing, use the plate, never a placeholder gradient.

---

## 9. Do / Don't

**Do**
- Let one serif line own the screen. Empty paper around it.
- Frame artwork like a museum plate (mat + hairline + mono caption).
- Put meta labels in corners. They do the "editorial" work cheaply.
- Keep grain at 3.5%. It unifies assets generated at different times.
- Use italic serif for emphasis, terracotta for one interactive moment.
- Compose every scene so it still works with the image removed (type-only fallback).

**Don't**
- Don't bold display type, don't use a second display family.
- Don't add a colour outside §2. Don't tint assets with CSS filters to "match".
- Don't centre everything, don't put 3 cards in a row with icons.
- Don't animate per-character, don't add `animate-pulse`, don't loop a video hero.
- Don't use dark mode. This site is light, full stop. (`prefers-color-scheme` must not flip it.)
- Don't generate project UI mockups with AI — screenshot the real products.
- Don't let any section exceed 100svh of pure image with no type.

---

## 10. Accessibility

- Body text `body #4A463D` on `paper` = 8.4:1. Meta labels may use `muted` only at ≥16px or as decoration with an accessible duplicate in `aria-label`.
- Terracotta `#C05B3C` on paper = 3.9:1 → **large text and icons only, never 16px body**. For small text use `ink` with a terracotta underline.
- Focus: 2px `ink` outline, `outline-offset: 3px`, never removed.
- Pinned scroll scenes must release focus order correctly; no scroll-jacking without a visible escape (keyboard `End` jumps to footer).
- All artwork `alt` describes the *scene*, not the file ("Engraved colonnade opening onto a hazy sea").
- Reduced motion honoured globally (§6).

---

## 11. Known gaps

- Instrument Serif has no true small-caps; fake small-caps are banned — use uppercase Geist Mono instead.
- Figma-generated assets will not be pixel-identical between runs; grain + consistent crop masks hide ≤5% variance. If variance is larger, the prompt prefix in `ASSET-PROMPTS.md` was not followed.
- The 13 inspiration screenshots are third-party work. They are references for *system and composition only*. No asset, layout or copy is copied from them.
