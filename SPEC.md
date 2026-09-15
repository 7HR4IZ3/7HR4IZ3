# SPEC — THRAIZE Personal Space (feat/personal-space)

> Reinvent thraize.vercel.app as a **cozy minimalist personal tech space** — not a website. Visitors walked into your workspace where evidence is pinned, machines are running, notes are loose. Intimate, inhabited, not polished for strangers. Gets you work by showing *how* and *what* you build across breadth.

Branch: `feat/personal-space` (worktree `thraize-personal-space`)
Base: `main @ 6c2c148`
Stack: Next 16.2 App Router, TypeScript, Bun, Recursive variable, hand annotation font, motion (micro only), handcrafted CSS, Vercel. **No Three.js** in this language.

---

## 1) Vision & audience

**Metaphor:** A working studio + archive **desk/field** that belongs to you. Not a landing page. The desk is *yours* — visitors are guests. Objects have weight (paper, pins, tape, strings). Evidence is real (terminal receipts, screenshots, galleries) but composed — level 3-4 "designed mess," readable.

**For:** Primary = peers + serious collaborators / hiring managers who want to understand *how* you think. Secondary = future you. Optimize for **lingering and depth**, not conversion. Contact is earned (card on desk), not pushed.

**Feels separate from internet because:**
- No hero → generic promise → social proof → features → CTA stack
- No global header nav bar, no hamburger, no card grid
- Navigation is a **tiny desk-edge** (`desk · folders · bench · about · — thraize — · email`), not a marketing nav
- Interaction is **explorable field** (gentle pan/drag of a paper desk), projects are objects with spatial weight, not stacked sections
- Papers feel tactile (paper field, plates, tape) not SaaS polish

---

## 2) Principles (what we reject / what we keep)

**Reject:**
- Landing-page chapter rhythm (frontpage-hero → record → project-chapter → experience → working-set → contact)
- `MachineStage` / `BoundaryMachine` / `BoundaryMachine` procedural 3D workbench, `SignalCartography`, `CartographyPoster`, `InkBlueprint` hero tricks
- `showcase/ink-blueprint` and `demo/ink-blueprint` as public routes (retire)
- Big display caps at 100-148px; reduce to ~88px max, more air

**Keep (evolve):**
- Content truth: proof-first, ownership, architecture, decisions
- `projects.ts` / `experience.ts` / `site.ts` as source of truth — but **re-curate featured 6**
- `/work/[slug]` exists but becomes a **folder spread**, not an article
- `/about` exists but becomes a **single pinned sheet**
- `/private/legal/privacy/[slug]` stays hidden/unlinked
- A11y (skip-link, reduced-motion, 44px targets), SEO (metadata, OG, sitemap, robots, JSON-LD)

---

## 3) Information architecture

```
/ (desk)              → explorable paper field + 6 flagship plates + contact card
/work                → folders index (drawer view of ALL projects, not just featured)
/work/[slug]         → opened folder spread (case study)
/about               → pinned profile sheet (single, not long editorial)
/bench (← /lab)      → bench table: loose notes, experiments, interests
/private/legal/privacy/[slug] → unchanged, unlinked
```

Redirect: `/lab` → `/bench` (preserve external links). Remove `/showcase/ink-blueprint`, `/demo/ink-blueprint`.

**Desk-edge (persistent, not header):** `desk · folders · bench · about · — THRAIZE — · email` — tiny type, bottom edge or top hairline, not a bar. Does not compete with desk.

---

## 4) Content model

### 4.1 Flagship 6 — breadth + systems (main desk)

Replace current featured 6. New featuredOrder 1-6:

| # | System | Project source | Flagship proof |
|---|--------|---------------|----------------|
| 1 | **Mobile Agent Workspace** | `kaizen-code` (keep) | Android runtime + Alpine bridge + iOS fail-closed |
| 2 | **Parallel Agent Systems** | `snapshot` (keep) | worktree/APFS/overlay, deterministic merges/recovery |
| 3 | **Spatial Hardware** | `vrmac` (keep) | Swift host + Kotlin Cardboard world-anchored display |
| 4 | **Local-First Native Suite** | `android-utility-portfolio` **new collective** (folds `motion-cues` inside) | 4 apps: notification/clipboard/screenshot/automation, Free/Pro, offline-first |
| 5 | **Play & Reasoning** | `antichess` **promoted from lab** | Multi-model chess, compare reasoning |
| 6 | **Language Bridges** | `wsgic-bridgeio` **promoted from lab** | py_bridge/js_bridge/browser-bridge, ExpressPy, virtual-dom |

**Demoted to bench/drawer (still in `projects` but `featuredOrder: null`):** `stackjet`, `opencode-annotate` (strong but move to supporting evidence), `acode-beyond-android` (contribution), `checkaroundme` (professional work pinned on bench as reference).

**Why this 6:** Covers `tech + chess + phones + laptops + coding`, each a different system/value, not 6 similar web apps. Immediately signals range.

### 4.2 Bench — loose notes / on the bench (8-10 small artifacts)

Scope deferred per Q12, but reserve data shape:

- Chess profile card (handle + rating + live position) — placeholder
- Current devices card (phone + laptop daily drivers) — placeholder
- Schooling pin (UniBen Metallurgical & Materials note) — placeholder
- Dotfiles card (repo link) — placeholder
- 2-4 experiment sketches (e.g. `browser-proxy`, `llm-chess`, `home-visualizer`, `story-ai`) — placeholders

Each bench item is a small paper/card, not a case study. Implement as placeholders with TODO copy + `reminder: fill from real inventory` comments.

### 4.3 Experience & personal statement

- Fold experience ledger into **traces on the bench/about**, not a full chapter. About sheet contains name, title, location, one-paragraph stance, education brief, timeline compressed.

---

## 5) Visual language — cozy minimalist

**Palette (warm paper, not blueprint):**
- `--paper`: `#F4EFE6` (desk) + `--paper-light`: `#EEE8DC` (sheets)
- `--ink`: `#1B1B17` + `--ink-soft`: `#5D5B50` + `--ink-faint`: `rgba(27,27,23,.18)`
- Accent `--terracotta`: `var(--orange-dark)` heritage (keep) + muted sage `--sage` for subtle borders
- Keep `var(--bone)`, `var(--graphite)` aliases for backwards compat but new tokens primary.

**Type:**
- Keep `Recursive` variable (`--font-recursive`) for all body/display
- Add **hand annotation** font for pins/tape/captions: `Caveat` or `Patrick Hand` or `RecMono hand` — small, warm, not comic. Load via `next/font/google` or `localFont`. Use only for `figcaptions`, plate labels, tape.

**Scale & rhythm:**
- Display max `88px` (down from 148), more negative paper, generous air.
- Body 16-17px, line-height 1.6, captions 9-11px uppercase tracking 0.06-0.08em
- Structure still brutal (borders 1-2px, grids) but quiet — cozy = warm paper + air + small type, not soft shadows.

**Surfaces:**
- Desk: large paper field with subtle grain/noise, inset shadow
- Plates/evidence sheets: `background: var(--paper-light)`, `border: 1px solid var(--ink)`, `box-shadow: 8px 9px 0 rgba(27,27,23,.14)` (tape feel)
- Strings, pins, tape as CSS pseudo-elements (no images)

---

## 6) Interaction — explorable field

**Desk field:**
- Full-viewport paper field, **gently draggable/pannable** (pointer drag + inertia, clamped). Not a game — calm.
- 6 plates positioned with slight rotation (`-8deg … +7deg`), overlapping like real desk. Each plate is link to `/work/[slug]`.
- Hover: slight lift (`translateY(-4px) + rotate 0`) + tape brighten, border to terracotta.
- Contact card is also an object on desk (bottom-right-ish), not a section.
- Coordinates/legend tiny bottom edge: e.g. `six systems · one practice · draggable`
- Reduced-motion: no drag, plates stack statically, `prefers-reduced-motion` disables parallax.

**Desk-edge nav:** Fixed bottom (or top hairline) tiny row: `desk · folders · bench · about · — THRAIZE 7HR4IZ3 — · email`. Links are text with underline on hover, no pill/buttons. Always reachable, never dominant.

**Micro motion:** `motion` library only for plate hover, folder open, drawer slide. No page transitions.

**No:** scrolljacking, scroll chapters, parallax hero, snapping.

---

## 7) Case study — opened folder spread

Route stays `/work/[slug]` but layout = **folder spread**:

- Top: folder tab / meta bar (status, year, ownership)
- Left flap: identity (title, premise, domains, role, maturity) + TOC-ish jump to sections
- Right stack: evidence sheets in order — `summary` → `challenge` → `intervention` → `decision` → `proof` (bullets) → `lessons` → `stack` pills → `links` → `gallery` (pinned plates) → `next folder`
- Gallery: pinned plates (product/terminal/architecture captures) with tape, like desk plates, not carousel
- Background: same paper desk, folder sits on it

Keep `SystemDiagram` as one evidence sheet where needed.

---

## 8) Project index & bench & about

- **`/work` (folders index):** Drawer view: `index · title · status · premise →` rows, minimal (like `ProjectRow` but paper). Not cards. Filter by domain if trivial.
- **`/bench`:** Table surface with bench items scattered (small cards/notes). Section: `On the bench` + `Experiments` + `Interests`. All placeholders wired to real data later.
- **`/about`:** Single pinned sheet: who, stance, capabilities, rakes contact onto sheet. No long editorial with 6 sections.

---

## 9) Technical plan

- Keep `src/content/projects.ts` shape; only change `featuredOrder` + add collective `android-utility-portfolio` entry (create if missing) and promote `antichess`/`wsgic-bridgeio` to featured.
- New components: `DeskField` (draggable field), `DeskPlate` (pinned plate), `DeskEdge` (nav), `ContactCard`, `FolderSpread` (case), `FoldersIndex`, `BenchTable`, `AboutSheet`
- Remove/retire: `MachineStage`, `BoundaryMachine`, `CartographyPoster`, `SignalCartography`, `HomeExperience` chapter stack, `Blueprint` showcase/demo pages + CSS
- CSS: keep `globals.css` architecture, add `--paper` tokens, hand font variable, field/plate/folder styles, keep existing responsive breakpoints (980/680)
- A11y: keyboard drag alternative (arrow keys + focus), skip-link, prefers-reduced-motion, 44px targets
- Perf: no 3D, no large images beyond plates; lazy gallery

---

## 10) What dies / what migrates

- Dies: procedural 3D hero, `professional-record` chapter, `frontpage-record`, `frontpage-projects` stacked chapters, `experience-chapter` ledger full page, `working-set` as chapter, `contact-chapter`, showcase/demo routes
- Migrates: flagship content → desk plates; working-set/lab → bench; experience → about sheet + bench traces; contact → card

---

## 11) Q12 reminders (fill before polish)

- Chess handle/profile + live puzzle?
- Current phone + laptop models?
- Dotfiles repo URL?
- School note copy final?
- 2-4 bench experiments to pin?

Add TODOs in code: `// TODO(Q12): fill from real inventory`

---

## 12) Acceptance

- `/` feels like *your* desk, not a template — warm paper, 6 plates, card, desk-edge, draggable, reduced-motion fallback
- 6 flagships reflect breadth (chess, phones, bridges included)
- No hero/nav/grid, no showcase/demo, cozy minimalist, hand annotations
- `/work/[slug]` reads as folder spread with real evidence
- `/work`, `/bench`, `/about` all paper, coherent, shippable
- Lighthouse/a11y/typecheck/lint/build green; e2e covers desk → folder → bench
