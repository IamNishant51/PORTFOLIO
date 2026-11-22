# Responsive Design & Mobile UX Specification
## Nishant Unavane — 2027 Neo-Classical Editorial Portfolio

> **Document Status:** Complete & Actionable  
> **Source Laws:** `AGENTS.md`, `DESIGN.md`, `BUILD-PLAN.md`, `CONTENT.md`  
> **Target Viewports:** 320px (Ultra-compact), 375px–430px (Standard Mobile), 768px–1024px (Tablet), 1280px–1440px (Desktop), 1920px+ (Ultrawide)

---

## 1. Executive Summary

A comprehensive responsive design and mobile UX audit of the codebase was conducted across all six story acts (`Act01Arrival` through `Act06Horizon` and `Act03HalfMarquee`), the chrome components (`Nav`, `ActRail`, `Cursor`, `Grain`, `Preloader`), primitives (`PlateFrame`, `ActHeader`, `FloatingNote`, `StatBlock`, `ProjectRow`, `MarqueeStrip`, `Reveal`), and subpages (`/work/[slug]`, `/colophon`, `/404`).

While the desktop editorial experience closely mirrors the classical estate art direction, **seven critical mobile/tablet friction points and compliance gaps** were uncovered:

1. **Fluid Typography Clamp Floor Blowouts (320px–360px):**  
   `.display-mega` has a min clamp floor of `3.5rem` (56px) in `globals.css`, directly violating `DESIGN.md §4` which explicitly mandates `display-mega → 2.75rem` (44px) on mobile. On 320px screens with 48px horizontal gutters (272px available), 56px Instrument Serif words ("Software,") risk awkward line wraps and edge clipping. Similarly, `.numeral` at `2.5rem` (40px) causes figure strings like `"10,340"` to blow out the 2-column mobile stat grid in Act 05.
2. **Missing Mobile Touch Project Previews (`ProjectRow.tsx`):**  
   `BUILD-PLAN.md §3` requires: *"On touch, the screenshot is simply shown below the title."* However, `ProjectRow.tsx` hides the image entirely on mobile (`hidden md:block pointer-events-none absolute right-24...`). Mobile users currently have zero visual plate feedback for projects.
3. **Severe Touch Target Accessibility Violations (< 44×44px):**  
   - Mobile navigation hamburger button in `Nav.tsx` is `w-9 h-9` (36×36px), violating WCAG 2.5.5 and Apple/Google 44×44px guidelines.  
   - Project links (`REPO ↗`, `LIVE ↗`, `STORE ↗`) and the circular arrow icon button (`w-8 h-8` = 32×32px) in `ProjectRow.tsx` have tight, sub-30px hit targets that trigger accidental clicks.  
   - Social links in Act 06 (`Act06Horizon.tsx`) are separated by `/` dividers without touch padding.
4. **Unscaled Parallax & Visual Overlap on Mobile (`Act01`, `Act04`, `Act06`):**  
   `AGENTS.md` and `BUILD-PLAN.md §5` command: *"Mobile: pin distance ×0.6, parallax ×0.4, blur effects off, cursor off."* Currently, parallax animations in GSAP run at **100% desktop translation distance** on all screens. On phones, 700px clouds in Act 01 and the drifting sail in Act 04 move across the entire screen, colliding with and obscuring the editorial headlines.
5. **Mobile Navigation Overlay Gaps (`Nav.tsx`):**  
   When the mobile menu opens, body scroll is not locked, allowing the user to scroll the background page behind the sheet. Furthermore, the overlay lacks `overflow-y-auto` and iOS safe area padding (`env(safe-area-inset-bottom)`), causing links to clip on short landscape phones or collide with the iPhone home indicator.
6. **Dual Cursor & Touch Leak on Mobile (`Cursor.tsx`):**  
   Desktop shows both the native OS pointer and the custom dot/ring because `cursor: none` is omitted from `html`/`body`. On touch devices, emulated `mousemove` events from taps cause the custom cursor to unhide and freeze at the tap position.
7. **Tablet 2×2 Border Defect (`Act02Colonnade.tsx`):**  
   In `Act02Colonnade.tsx`, capabilities use `p-6 border-t md:border-t-0 md:border-l first:border-l-0`. On 2-column tablet layouts (`md:grid-cols-2`), the third discipline (Item 2) is the start of row 2; it loses its top border while gaining an erroneous left border, breaking the architectural grid.

---

## 2. Breakpoint System & Fluid Typography Scale

### 2.1 Standardized Breakpoints
The portfolio operates on Tailwind CSS v4's media query system, mapped to real-world devices:

| Breakpoint | Range | Device Classes | Layout Rules |
|---|---|---|---|
| `xs` (Sub-standard) | `320px – 360px` | iPhone SE (1st/2nd gen), Galaxy Z Flip outer, small Androids | Single column only, gutters `px-5` (20px), clamp floors engaged, no multi-column stat rows |
| `sm` (Standard Mobile) | `375px – 430px` | iPhone 13/14/15/16 Pro & Max, Pixel 8, Galaxy S24 | Single column, gutters `px-6` (24px), vertical rhythm compressed to 24px–32px |
| `md` (Tablet Portrait) | `768px – 1023px` | iPad mini, iPad 10.2", Surface Go | 2-column grids for disciplines and method; floating notes tucked bottom-right |
| `lg` (Tablet Landscape / Laptop) | `1024px – 1279px` | iPad Pro 11", small Chromebooks, 13" MacBooks at scaled resolution | Full 12-col grid enabled, 4-col capabilities grid |
| `xl` (Standard Desktop) | `1280px – 1440px` | MacBook Pro 14"/16", 1080p Desktop displays | Reference estate layout, bust decoration enabled |
| `2xl` (Ultrawide) | `1920px+` | 27" 1440p, 4K displays, ultrawide monitors | Max content box locked at `1440px`, gutters scale fluidly to `clamp(24px, 4vw, 64px)` |

---

### 2.2 Fluid Typography Math & Token Overhaul

The CSS utility classes in `app/globals.css` must strictly enforce the min/max clamps specified in `DESIGN.md §3` and `DESIGN.md §4`.

```
Viewport Range: 320px (20rem) → 1440px (90rem)
Formula: clamp(MIN, VAL_VW + VAL_REM, MAX)
```

#### Revised Typography Scale Table

| Token | Class | Existing Formula | Issues Identified | New Calibrated Formula (`globals.css`) |
|---|---|---|---|---|
| `display-mega` | `.display-mega` | `clamp(3.5rem, 9vw, 8.5rem)` | Min 56px breaks on 320px mobile (exceeds container). Violates DESIGN.md 2.75rem rule. | `clamp(2.75rem, 7.5vw, 8.5rem)` |
| `display-xl` | `.display-xl` | `clamp(2.75rem, 5.5vw, 5rem)` | Min 44px causes Act headers to wrap 4+ lines on 320px screens. | `clamp(2.25rem, 5vw, 5rem)` |
| `display-lg` | `.display-lg` | `clamp(2rem, 3.4vw, 3.25rem)` | Long email in Act 06 overflows or breaks clumsily. | `clamp(1.75rem, 3.2vw, 3.25rem)` |
| `display-md` | `.display-md` | `clamp(1.5rem, 2.2vw, 2rem)` | Card titles in Act 04 wrap too early on small mobile. | `clamp(1.35rem, 2vw, 2rem)` |
| `numeral` | `.numeral` | `clamp(2.5rem, 4vw, 3.75rem)` | Min 40px causes "10,340" stat block to overflow 124px mobile grid cell. | `clamp(2rem, 3.5vw, 3.75rem)` |
| `meta-label` | `.meta-label` | `0.6875rem` / `0.18em` | Fixed `0.18em` tracking causes coordinate string wrapping on <360px. | `text-[0.625rem] sm:text-[0.6875rem] tracking-[0.14em] sm:tracking-[0.18em]` |

---

## 3. Horizontal Scroll Leaks & Overflow Elimination Plan

### 3.1 Root Causes of Horizontal Leaks
1. **Asset Dimensions vs Screen Width:**
   In `Act01Arrival.tsx`, `a1-clouds-near.webp` has fixed width `w-[700px]` and negative offset `-right-16` (-64px). On a 375px phone, a 700px absolute element creates an off-canvas bleed of over 260px. While the immediate section has `overflow-hidden`, touch gestures on mobile Safari can pull or bounce horizontally if parent elements fail to constrain it.
2. **Viewport Units (`100vw` vs `100%`):**
   Using `w-[100vw]` or `100vw` sizes on Next.js images causes layout shift and horizontal scrollbars on desktop browsers when the native vertical scrollbar is present.
3. **Viewport Configuration in `layout.tsx`:**
   Missing `viewportFit: "cover"` in Next.js metadata results in iOS Safari letterboxing landscape viewports and disregarding `env(safe-area-inset-*)`.

### 3.2 Defense Architecture
1. **Root HTML/Body Lock:**
   ```css
   html, body {
     max-width: 100%;
     overflow-x: hidden;
     position: relative;
   }
   ```
2. **Explicit Next.js 15 Viewport Configuration (`app/layout.tsx`):**
   ```tsx
   import type { Viewport } from "next";

   export const viewport: Viewport = {
     themeColor: "#F6F2E9",
     width: "device-width",
     initialScale: 1,
     maximumScale: 5,
     viewportFit: "cover",
   };
   ```
3. **Safe Area Utility Classes:**
   Support iOS Dynamic Island, notch, and home bar:
   ```css
   .pt-safe { padding-top: env(safe-area-inset-top); }
   .pb-safe { padding-bottom: env(safe-area-inset-bottom); }
   .pl-safe { padding-left: env(safe-area-inset-left); }
   .pr-safe { padding-right: env(safe-area-inset-right); }
   ```

---

## 4. Component-by-Component Audit & Responsive Refactoring Plan

---

### 4.1 Chrome Components

#### `components/chrome/Nav.tsx`
* **Defects Identified:**
  - Hamburger button is `w-9 h-9` (36×36px), violating the 44px minimum touch target.
  - When the mobile sheet opens, body scroll is not locked.
  - Mobile sheet is `top-[72px] inset-0` with no `overflow-y-auto`; on short landscape devices (e.g. 375px height), menu items and resume link get cropped off-screen.
  - Mobile sheet bottom bar lacks `pb-safe`, placing the resume button directly under the iOS home indicator bar.
  - Nav links lack vertical padding, making them only ~24px tall touch targets.
* **Refactoring Actions:**
  1. Increase hamburger button tap container to `w-11 h-11` (44×44px) while preserving the refined 16px internal icon width.
  2. Implement body scroll lock via `document.body.style.overflow = mobileMenuOpen ? "hidden" : ""` with cleanup on unmount.
  3. Add `overflow-y-auto` and `pb-safe` to mobile sheet container.
  4. Expand link tap target heights to at least 48px (`py-3`).

---

#### `components/chrome/Cursor.tsx`
* **Defects Identified:**
  - Cursor detection relies solely on `"ontouchstart" in window || navigator.maxTouchPoints > 0`. On touch-enabled laptops (e.g. Surface, Touch XPS), the custom cursor is permanently disabled even when using a mouse!
  - Conversely, on mobile devices, simulated mouse events triggered by taps cause the cursor to become visible and freeze on screen.
  - System cursor is not hidden on desktop, resulting in an awkward double cursor.
* **Refactoring Actions:**
  1. Query `window.matchMedia("(pointer: fine)").matches` instead of fragile touch detection.
  2. Add CSS media query `@media (pointer: coarse), (hover: none) { .custom-cursor { display: none !important; } }`.
  3. Apply `cursor: none` to interactive desktop elements when pointer is fine.

---

#### `components/chrome/Grain.tsx`
* **Defects Identified:**
  - Tailwind class `opacity-6` is used instead of arbitrary value `opacity-[0.06]`.
  - Fullscreen SVG `feTurbulence` running on a fixed layer causes heavy GPU compositing overhead on low-end mobile hardware.
* **Refactoring Actions:**
  1. Correct opacity syntax to `opacity-[0.06]`.
  2. Add `transform: translateZ(0)` / `will-change: transform` to force hardware layering without forcing per-frame SVG recalculations during scroll.

---

#### `components/chrome/Preloader.tsx`
* **Defects Identified:**
  - Body scroll is not locked while the preloader is counting up, enabling users to flick scroll on mobile before the curtain lifts.
* **Refactoring Actions:**
  1. Lock `document.body.style.overflow = "hidden"` on mount; restore to `""` once transition completes.
  2. Ensure count numeral uses `tabular-nums` and scales to `text-6xl sm:text-7xl md:text-8xl`.

---

### 4.2 Primitive Components

#### `components/primitives/PlateFrame.tsx`
* **Defects Identified:**
  - Long captions (e.g. `PLATE 03 — ARCHITECTURAL CASE STUDY: CUSTOM-PI · 1920×1080`) wrap unpredictably without proper leading on narrow viewports.
* **Refactoring Actions:**
  1. Add `leading-normal break-words` to `figcaption`.
  2. Support responsive `aspectRatio` handling so mobile plates do not stretch vertically.

---

#### `components/primitives/ActHeader.tsx`
* **Defects Identified:**
  - Display headline uses raw `display-xl` class which, on 320px screens, can force single words onto new lines.
  - Meta coordinates row wraps into two lines on narrow screens if coordinates are not properly hidden.
* **Refactoring Actions:**
  1. Refine coordinates visibility to `hidden sm:inline`.
  2. Ensure `text-wrap: balance` is applied to H2 and `leading-[0.98]` on mobile.

---

#### `components/primitives/FloatingNote.tsx`
* **Defects Identified:**
  - Card width is fixed `w-[260px] md:w-[280px]`. On a 320px phone with 40px gutters, 260px rotated at `-1.5deg` consumes 262px, leaving barely 18px clearance.
  - `backdrop-blur-[14px]` is active on mobile, violating `DESIGN.md §6` (*"On mobile: blur effects off"*).
* **Refactoring Actions:**
  1. Update width to `w-full max-w-[260px] sm:max-w-[280px]`.
  2. Disable blur on mobile: `bg-white/95 backdrop-blur-none md:bg-white/75 md:backdrop-blur-[14px]`.
  3. Reduce rotation on mobile: `transform: rotate(0deg) sm:rotate(-1.5deg)`.

---

#### `components/primitives/StatBlock.tsx`
* **Defects Identified:**
  - Figure numerals at `clamp(2.5rem, 4vw, 3.75rem)` overflow columns when rendered in a 2-column mobile grid.
* **Refactoring Actions:**
  1. Apply updated `numeral` clamp floor of `2rem` (32px).
  2. Set `tabular-nums tracking-tight` and `truncate` or `break-normal` protection.

---

#### `components/primitives/ProjectRow.tsx`
* **Defects Identified:**
  - **Missing touch image preview:** Screenshot is marked `hidden md:block`. Mobile users never see project visuals!
  - **Sub-standard tap targets:**
    - Action links (`REPO ↗`, `LIVE ↗`, `STORE ↗`) have zero padding, resulting in a height of only ~14px.
    - Arrow button is `w-8 h-8` (32×32px), failing 44px tap target requirements.
* **Refactoring Actions:**
  1. Add an inline responsive mobile preview image directly under the subtitle (`block md:hidden relative w-full h-44 rounded-xs border border-hairline overflow-hidden my-4`).
  2. Wrap action links in touch-friendly pill buttons or expand click bounds with `py-2.5 px-3 -my-1.5 -mx-1` (providing 44px hit heights).
  3. Increase circular arrow button to `w-11 h-11 md:w-8 md:h-8` with centered flex icon.

---

#### `components/primitives/MarqueeStrip.tsx`
* **Defects Identified:**
  - Marquee animation uses CPU-intensive painting if `will-change: transform` is not declared.
* **Refactoring Actions:**
  1. Add `will-change-transform` and `contain-paint` for butter-smooth 60fps scrolling on mobile WebKit.

---

#### `components/primitives/Reveal.tsx`
* **Defects Identified:**
  - If JavaScript fails or is disabled, elements remain permanently hidden at `opacity-0 translate-y-6`.
* **Refactoring Actions:**
  1. Provide a `<noscript>` stylesheet or CSS fallback in `globals.css` ensuring `opacity: 1 !important; transform: none !important;` when `.no-js` is present.

---

### 4.3 Story Acts (Act 01 through Act 06)

---

#### Act 01: Arrival (`Act01Arrival.tsx`)
* **Issues:**
  - Clouds are 650px and 700px wide, dominating mobile viewports.
  - GSAP parallax translations (`yPercent: -45`, `xPercent: 25`) cause severe visual jitter and cover copy on phones.
  - Headline uses uncalibrated `display-mega` (56px min).
* **Responsive Refactoring:**
  1. **Scale Assets for Mobile:**
     ```tsx
     {/* Far clouds */}
     className="absolute -bottom-6 -left-8 w-[320px] sm:w-[480px] md:w-[650px] h-auto ... "
     {/* Near clouds */}
     className="absolute -bottom-10 -right-10 w-[360px] sm:w-[520px] md:w-[700px] h-auto ... "
     {/* Heron */}
     className="absolute top-20 md:top-28 right-6 md:right-[12%] w-16 h-16 md:w-32 md:h-32 ... "
     ```
  2. **GSAP Mobile Media Query (Parallax ×0.4):**
     ```ts
     const mm = gsap.matchMedia();
     mm.add("(max-width: 767px)", () => {
       // Mobile: parallax scaled to 40%
       if (skyRef.current) gsap.to(skyRef.current, { yPercent: 5, ease: "none", scrollTrigger: { trigger: containerRef.current, scrub: 0.8 } });
       if (cloudsFarRef.current) gsap.to(cloudsFarRef.current, { yPercent: -8, xPercent: 2, ease: "none", scrollTrigger: { trigger: containerRef.current, scrub: 0.8 } });
       if (cloudsNearRef.current) gsap.to(cloudsNearRef.current, { yPercent: -18, xPercent: -3, ease: "none", scrollTrigger: { trigger: containerRef.current, scrub: 0.8 } });
       if (heronRef.current) gsap.to(heronRef.current, { xPercent: 10, yPercent: -6, ease: "none", scrollTrigger: { trigger: containerRef.current, scrub: 0.8 } });
     });
     mm.add("(min-width: 768px)", () => {
       // Desktop: full 100% parallax choreography
     });
     ```
  3. **CTAs & Footnote Flow:**
     Stack CTAs cleanly on `< 400px` viewports using `flex-col sm:flex-row w-full sm:w-auto`.

---

#### Act 02: The Colonnade (`Act02Colonnade.tsx`)
* **Issues:**
  - Foreground column overlays are hidden on mobile (`hidden md:block`), but left and right column refs are still animated by GSAP.
  - Tablet 2×2 grid border styling defect: item 2 loses its top border and gets an incorrect left border.
  - Capital study plate spans full width awkwardly on mobile.
* **Responsive Refactoring:**
  1. **Fix Tablet 2×2 Border Logic:**
     ```tsx
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 pt-4">
       {capabilities.map((item, idx) => (
         <div
           key={item.numeral}
           className={`flex flex-col gap-4 p-6 bg-paper/60 border-hairline
             border-t first:border-t-0
             md:first:border-t-0
             md:[&:nth-child(2)]:border-t-0
             md:border-t
             md:[&:nth-child(even)]:border-l
             lg:border-t-0 lg:border-l lg:first:border-l-0
           `}
         >
           ...
         </div>
       ))}
     </div>
     ```
  2. **Capital Study Plate:**
     Wrap in `w-full max-w-xs sm:w-72` for balanced proportions.

---

#### Act 03: The Temple (`Act03Temple.tsx`)
* **Issues:**
  - Featured Custom-PI Arch card: on mobile, left column and arch plate stack into 1 column. Arch plate height is fixed at `h-64 md:h-80`.
  - Buttons ("Launch Custom-PI", "VIEW REPOSITORY") touch targets need mobile enhancement.
* **Responsive Refactoring:**
  1. Featured card: padding reduced to `p-5 sm:p-8 md:p-10`.
  2. Actions: `flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-5 pt-3`.
  3. Arch plate frame: `aspect-[4/3] sm:aspect-[16/10] w-full max-w-sm mx-auto`.

---

#### Act 04: The Sea (`Act04Sea.tsx`)
* **Issues:**
  - Sail boat (`a4-sail.webp`) is positioned at `right-12 top-28`. On a 320px phone, the 128px sail sits directly over the headline "Smaller boats."
  - Experiment cards have `p-8` on desktop, which leaves only 256px inner width on a 320px phone.
* **Responsive Refactoring:**
  1. **Sail Positioning & Mobile Scaling:**
     Change to `w-20 h-28 sm:w-28 sm:h-36 md:w-32 md:h-44 right-4 sm:right-8 md:right-12 top-16 md:top-36`.
  2. **GSAP Mobile Drift Scaling (0.4×):**
     On mobile: `xPercent: -18, yPercent: -4` (reduced from desktop `-45` and `-10`).
  3. **Experiment Cards:**
     Change padding to `p-5 sm:p-6 md:p-8`.
     Ensure `EXPLORE ↗` link has a minimum 44px tap height (`py-2 px-3 -my-2 -mx-3`).

---

#### Act 05: The Studio (`Act05Studio.tsx`)
* **Issues:**
  - Dark band (`bg-navy text-on-dark`).
  - Stat figure `"10,340"` in `clamp(2.5rem, 4vw, 3.75rem)` overflows 124px width in the 2-column mobile grid.
  - Method grid on mobile: 4 vertical steps need clear hairline division.
* **Responsive Refactoring:**
  1. **Mobile Stat Grid Adaptation:**
     ```tsx
     {/* xs: single col if <340px, 2-col on 340px+, 4-col on desktop */}
     <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-2">
       {profile.stats.map((stat, idx) => (
         <StatBlock
           key={idx}
           figure={stat.value}
           label={stat.label}
           isDark={true}
         />
       ))}
     </div>
     ```
  2. **Portrait Halftone Plate:**
     Use responsive height `h-72 sm:h-80 md:h-96` inside `max-w-xs sm:max-w-sm`.

---

#### Act 06: The Horizon (`Act06Horizon.tsx`)
* **Issues:**
  - Sun at `bottom-36` and birds at `right-16 top-24` crowd mobile content.
  - Email link in `display-lg` (`clamp(2rem, 3.4vw, 3.25rem)`) breaks into 3 awkward pieces.
  - Social links separated by `/` without touch clearance.
  - Missing bottom safe-area inset on footer.
* **Responsive Refactoring:**
  1. **Email Link Scaling:**
     ```tsx
     <a
       href={`mailto:${profile.email}`}
       className="font-serif text-2xl sm:text-3xl md:text-4xl lg:display-lg text-ink hover:text-terracotta transition-colors underline decoration-hairline-strong underline-offset-8 break-all"
     >
       {profile.email}
     </a>
     ```
  2. **Social Links Hit Padding:**
     Wrap each link in `py-2 px-2 inline-flex items-center min-h-[44px]`.
  3. **Birds & Sun Sizing:**
     Sun: `w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 bottom-24 md:bottom-36`.
     Birds: `w-24 h-18 sm:w-32 sm:h-24 md:w-36 md:h-28 right-4 sm:right-16 top-16 md:top-24`.
  4. **Footer Safe Area:**
     Add `pb-safe pb-12` to footer container.

---

### 4.4 Pages & Case Studies

#### `/work/[slug]/page.tsx`
* **Defects:**
  - Case study hero top padding `pt-32` is too generous on mobile; pushes H1 below fold.
  - Plate height `h-[360px]` on 320px screen creates awkward 4:3 tall box.
  - Action buttons wrap tightly.
* **Refactoring:**
  1. Padding: `pt-24 sm:pt-32 pb-16 sm:pb-24 px-5 sm:px-6 md:px-12`.
  2. Definitional box: `p-5 sm:p-8`.
  3. Plate height: `h-[240px] sm:h-[360px] md:h-[500px]`.
  4. Buttons: `flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-6`.

#### `/colophon/page.tsx`
* **Defects:**
  - Tech stack grid `grid-cols-2 sm:grid-cols-3 md:grid-cols-4`: on 320px screens, long strings (`GSAP 3.12 + ScrollTrigger`) overflow tiny boxes.
* **Refactoring:**
  1. Set `grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4`.
  2. Add `break-words` to code blocks.

---

## 5. Interaction & Touch Strategy

### 5.1 Hover State Isolation
Hover effects (such as `hover:translate-x-2` or image reveal transitions) must be guarded against sticky-hover artifacts on touch devices.

```css
/* Apply hover transitions only on true pointing devices */
@media (hover: hover) and (pointer: fine) {
  .group:hover .group-hover-preview {
    opacity: 0.9;
    transform: translateX(0);
  }
  .link-hover-nudge:hover {
    transform: translateX(4px);
  }
}

/* Touch fallback: Show active feedback via :active */
@media (hover: none) or (pointer: coarse) {
  a:active, button:active {
    opacity: 0.7;
    transform: scale(0.98);
  }
}
```

---

### 5.2 Tap Target Accessibility Audit Table

| UI Element | Location | Current Size | Minimum Required Size | Refactoring Solution |
|---|---|---|---|---|
| Hamburger Toggle Button | `Nav.tsx` | 36×36px (`w-9 h-9`) | **44×44px** | Change to `w-11 h-11`, keep icon 16px, center with flex |
| Mobile Navigation Links | `Nav.tsx` overlay | ~28px height | **48×44px** | Add `py-3 px-2 flex items-center min-h-[48px]` |
| Project Row Arrow Button | `ProjectRow.tsx` | 32×32px (`w-8 h-8`) | **44×44px** | Change to `w-11 h-11 md:w-8 md:h-8 flex items-center justify-center` |
| Project Row Repo/Live/Store | `ProjectRow.tsx` | ~14px text | **44×36px** (touch area) | Apply `py-2.5 px-3 -my-2 -mx-1 inline-flex items-center` |
| Act 04 "EXPLORE ↗" Link | `Act04Sea.tsx` | ~16px text | **44×44px** | Add `py-2.5 px-3 -my-2 -mx-2 inline-flex items-center` |
| Act 06 Social Links | `Act06Horizon.tsx` | ~16px text | **44×44px** | Add `py-2.5 px-3 inline-flex items-center` |
| Footer Nav Links | `Act06Horizon.tsx` | ~20px text | **40×44px** | Add `py-1.5 inline-block` |
| Case Study Return Link | `[slug]/page.tsx` | ~18px text | **44×44px** | Add `py-2 pr-4 inline-flex items-center` |

---

## 6. Scroll & Motion Adjustments for Mobile

### 6.1 Lenis Smooth Scroll Configuration
In `lib/lenis.tsx`, ensure touch scrolling delegates directly to native hardware momentum without synthetic lag:

```ts
const lenis = new Lenis({
  lerp: 0.09,
  smoothWheel: true,
  syncTouch: false, // Guarantees native iOS momentum scrolling
});
```

### 6.2 GSAP ScrollTrigger Calibration
In `lib/gsap.ts`:
```ts
ScrollTrigger.config({
  ignoreMobileResize: true, // Prevents toolbar show/hide jumpiness
  autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
});
```

### 6.3 Parallax & Pin Scaling Rules (AGENTS.md Compliance)

| Motion Layer | Desktop Parameter | Mobile Parameter (`< 768px`) |
|---|---|---|
| Hero Sky Plate Parallax | `yPercent: 12` | `yPercent: 5` (×0.4) |
| Far Clouds Drift | `yPercent: -20, xPercent: 5` | `yPercent: -8, xPercent: 2` (×0.4) |
| Near Clouds Drift | `yPercent: -45, xPercent: -8` | `yPercent: -18, xPercent: -3` (×0.4) |
| Heron Drift | `xPercent: 25, yPercent: -15` | `xPercent: 10, yPercent: -6` (×0.4) |
| Hero Text Fade | `y: -50, opacity: 0.35` | `y: -20, opacity: 0.5` |
| Act 04 Sail Drift | `xPercent: -45, yPercent: -10` | `xPercent: -18, yPercent: -4` (×0.4) |
| Act 06 Sun Ascension | `yPercent: -20` | `yPercent: -8` (×0.4) |
| Act 06 Birds Drift | `xPercent: 18, yPercent: -12` | `xPercent: 7, yPercent: -5` (×0.4) |
| Pinned Section Travel | `200vh` pin | `120vh` (×0.6) or static stack on small mobile |

---

## 7. Exact Tailwind CSS Classes & Code Changes Reference

### 7.1 `app/globals.css` Overhauls
Replace the typography utility definitions with the calibrated fluid clamp values:

```css
/* Typography styles strictly following DESIGN.md with 320px mobile protection */
.display-mega {
  font-family: var(--font-serif);
  font-size: clamp(2.75rem, 7.5vw, 8.5rem);
  font-weight: 400;
  line-height: 0.92;
  letter-spacing: -0.03em;
  text-wrap: balance;
}

.display-xl {
  font-family: var(--font-serif);
  font-size: clamp(2.25rem, 5vw, 5rem);
  font-weight: 400;
  line-height: 0.96;
  letter-spacing: -0.025em;
  text-wrap: balance;
}

.display-lg {
  font-family: var(--font-serif);
  font-size: clamp(1.75rem, 3.2vw, 3.25rem);
  font-weight: 400;
  line-height: 1.02;
  letter-spacing: -0.02em;
  text-wrap: balance;
}

.display-md {
  font-family: var(--font-serif);
  font-size: clamp(1.35rem, 2vw, 2rem);
  font-weight: 400;
  line-height: 1.1;
  letter-spacing: -0.01em;
}

.numeral {
  font-family: var(--font-serif);
  font-size: clamp(2rem, 3.5vw, 3.75rem);
  font-weight: 400;
  line-height: 1;
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
}

.meta-label {
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  font-weight: 500;
  line-height: 1.4;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-muted);
}

@media (max-width: 639px) {
  .meta-label {
    letter-spacing: 0.12em;
  }
}

/* Touch cursor suppression */
@media (pointer: coarse), (hover: none) {
  .custom-cursor-element {
    display: none !important;
  }
}
```

---

### 7.2 `app/layout.tsx` Viewport Export
Add the modern Next.js 15 viewport metadata export:

```tsx
import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#F6F2E9",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};
```

---

### 7.3 `components/chrome/Nav.tsx` Refactor Summary
```tsx
// 1. 44x44px button wrapper
<button
  type="button"
  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
  className="md:hidden flex flex-col justify-center items-center w-11 h-11 border border-hairline-strong rounded-xs bg-paper-soft focus-visible:outline-ink focus-visible:outline-2"
  aria-expanded={mobileMenuOpen}
  aria-label="Toggle navigation menu"
>
  <span className={`block w-4 h-[1.5px] bg-ink transition-transform duration-standard ${mobileMenuOpen ? "rotate-45 translate-y-[3.5px]" : "mb-1"}`} />
  <span className={`block w-4 h-[1.5px] bg-ink transition-transform duration-standard ${mobileMenuOpen ? "-rotate-45 -translate-y-[2px]" : ""}`} />
</button>

// 2. Body scroll lock hook
useEffect(() => {
  if (mobileMenuOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
  return () => { document.body.style.overflow = ""; };
}, [mobileMenuOpen]);

// 3. Mobile sheet container with overflow-y-auto and pb-safe
<div className="md:hidden fixed inset-0 top-[72px] bg-paper z-50 flex flex-col px-8 py-8 border-t border-hairline overflow-y-auto pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
  {/* Menu items with py-3 for 48px hit target */}
  <nav className="flex flex-col text-2xl font-serif">
    <a href="#work" onClick={() => setMobileMenuOpen(false)} className="text-ink hover:text-terracotta py-3 transition-colors">
      Selected Work
    </a>
    ...
  </nav>
</div>
```

---

### 7.4 `components/primitives/ProjectRow.tsx` Touch Preview Integration
Add the mobile inline preview below subtitle (lines 46–47):

```tsx
{/* Title & Subtitle */}
<div className="md:col-span-5 flex flex-col gap-2">
  <div className="flex items-center gap-3">
    <Link
      href={`/work/${project.slug}`}
      className="display-lg text-ink group-hover:text-ink hover:underline underline-offset-4 decoration-hairline transition-transform duration-standard group-hover:translate-x-2"
    >
      {project.title}
    </Link>
  </div>
  <p className="body-editorial text-body text-[0.9375rem]">
    {project.subtitle}
  </p>

  {/* Mobile Touch Preview Plate */}
  <div className="block md:hidden relative w-full h-44 my-3 rounded-xs border border-hairline-strong overflow-hidden bg-paper-edge">
    <Image
      src={imageSrc}
      alt={`Screenshot preview of ${project.title}`}
      fill
      sizes="(max-width: 768px) 100vw, 300px"
      className="object-cover"
    />
    <div className="absolute inset-0 bg-ink/5 mix-blend-multiply" />
  </div>
</div>
```

And update the action buttons tap targets:
```tsx
{/* 44px min tap targets for mobile links */}
<div className="flex items-center gap-2 sm:gap-4 flex-wrap">
  {project.links.repo && (
    <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className="meta-label text-muted hover:text-ink py-2.5 px-2 inline-flex items-center">
      REPO ↗
    </a>
  )}
  {project.links.live && (
    <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="meta-label text-terracotta hover:underline font-semibold py-2.5 px-2 inline-flex items-center">
      LIVE ↗
    </a>
  )}
  <Link
    href={`/work/${project.slug}`}
    className="inline-flex items-center justify-center w-11 h-11 md:w-8 md:h-8 rounded-full border border-hairline-strong group-hover:border-ink group-hover:bg-ink group-hover:text-on-ink transition-all ml-auto md:ml-0"
    aria-label={`Read case study for ${project.title}`}
  >
    <span className="text-sm">→</span>
  </Link>
</div>
```

---

## 8. Verification & QA Checklist

Before shipping any phase or commit, run this verification protocol:

- [ ] **320px Viewport (iPhone SE / Compact Android):**
  - No horizontal scrolling (`document.documentElement.scrollWidth === window.innerWidth`).
  - H1 headline "Software, made by *hand.*" renders cleanly without clipping.
  - Stat figure "10,340" in Act 05 fits comfortably within its grid cell.
- [ ] **375px–430px Viewport (Modern Standard iOS / Android):**
  - Mobile hamburger button is easily clickable (44×44px hit box).
  - Background scroll is locked when mobile menu is open.
  - Each project row shows an inline visual thumbnail below its subtitle.
- [ ] **768px–1024px Viewport (iPad / Tablet Portrait & Landscape):**
  - Act 02 capabilities grid displays a clean 2×2 layout with unbroken hairlines.
- [ ] **1280px–1440px Viewport (Standard Desktop):**
  - ProjectRow hover thumbnail slides in smoothly from the right.
  - Custom cursor dot and ring track mouse movement smoothly without duplicate OS cursor.
- [ ] **Touch Device Emulation:**
  - Custom cursor stays completely suppressed when tapping on touch screens.
- [ ] **Reduced Motion (`prefers-reduced-motion: reduce`):**
  - All parallax translations deactivate immediately.
  - Lenis smooth scroll provider unmounts or disables.
  - Reveals render in their final visible state instantly.

---

*Specification authored in strict accordance with `AGENTS.md`, `DESIGN.md`, `CONTENT.md`, and `BUILD-PLAN.md`.*
