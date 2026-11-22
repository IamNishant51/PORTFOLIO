# Nishant Unavane — Portfolio 2027

Planning package. No site code yet — this folder is what the build agent reads.

```
Nishant_portfolio_2027/
├── AGENTS.md            ← read first. Rules, contracts, anti-slop gate.
├── CONTENT.md           ← every word and fact. Nothing outside this file may be published.
├── DESIGN.md            ← colour, type, texture, motion tokens. Replaces DESIGN-elevenlabs.md.
├── BUILD-PLAN.md        ← 6 acts, scroll storyboard, stack, phases, SEO/AEO, budgets.
├── ASSET-PROMPTS.md     ← 24 Figma prompts, filenames, frame sizes, production order.
└── ASSETS/              ← drop generated files here, names must match ASSET-PROMPTS.md
    ├── 00-references/   ← inspiration screenshots + portrait sources
    ├── 01-textures/  02-act1-arrival/  03-act2-colonnade/  04-act3-temple/
    ├── 05-act4-sea/  06-act5-studio/   07-act6-horizon/
    ├── 08-project-shots/  ← real screenshots only, never AI
    └── 09-brand/
```

## Next three steps

1. **Save the 13 screenshots** into `ASSETS/00-references/` using the names in `ASSETS/00-references/REFERENCES.md`. (They were pasted in chat, so they need saving once.)
2. **Generate `PROMPT 00` first** (`ASSET-PROMPTS.md §4`) and lock it as `STYLE-PLATE`. Do not generate anything else until you have it.
3. **Generate the 24 assets** in the order given in `ASSET-PROMPTS.md §1`. Attach `STYLE-PLATE` as reference image #1 every single time.

Then hand the folder to the coding agent and say: *"Read AGENTS.md, then build P0 and P1 only."*

## The idea in one line

A walk through a classical estate — sky, colonnade, temple, sea, studio, horizon — where the painted background changes as you scroll and the copy is hung like gallery wall text. Warm paper, one serif, one accent, heavy grain, no dark mode.

## Rules that are not negotiable

- Light theme only. One dark band (Act 05).
- Facts only from `CONTENT.md`. No invented projects or metrics.
- Colours only from `DESIGN.md §2`. No purple gradients, no glassmorphism everywhere.
- Instrument Serif 400 for display — never bold.
- Real project screenshots, never AI-generated UI.
- Must read correctly with JS disabled and images blocked.
