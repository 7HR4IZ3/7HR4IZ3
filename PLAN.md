# PLAN — Personal Space

## Branch
`feat/personal-space` @ `thraize-personal-space` worktree

## Tickets (ordered, with deps)

### 01 — Foundation: tokens, hand font, desk-edge shell
- Add `--paper` / `--paper-light` / `--ink` tokens to `globals.css` (warm A)
- Load hand annotation font via `next/font/google` (Caveat or Patrick Hand) + `variable: --font-hand`
- Create `src/components/desk-edge.tsx` (desk · folders · bench · about · — THRAIZE — · email), wire into `RootLayout` or `PageShell`
- Reduce display caps to ~88px, increase air (adjust `.site-header` etc. or new shell)
- Acceptance: type renders, edge visible on all routes, no 3D, no break

### 02 — Desk field (explorable) + 6 plates
**Dep: 01**
- Create `src/components/desk-field.tsx` — full-viewport paper field, clamped drag (pointer events, inertia, reduced-motion fallback static)
- Create `src/components/desk-plate.tsx` — pinned evidence card (tape, rotation, hover lift, link)
- Compose 6 plates with positions/rotations + legend `six systems · one practice · draggable`
- Retire `MachineStage` / `HomeExperience` on `/` → render `DeskField` instead
- A11y: keyboard pan (arrows), focusable plates, skip-link, prefers-reduced-motion disables drag
- Acceptance: draggable on desktop, static stacked on 680px, 6 plates link to `/work/[slug]`

### 03 — Re-curate projects.ts to 6 systems
**Dep: 02 (for visuals) — can parallel**
- In `src/content/projects.ts`: set `featuredOrder` 1-6 to [kaizen-code, snapshot, vrmac, android-utility-portfolio, antichess, wsgic-bridgeio]; null the rest
- Create `android-utility-portfolio` collective entry if missing (folds motion-cues + 3 other apps), include media placeholder or reuse motion-cues assets
- Ensure `antichess` + `wsgic-bridgeio` have `media` + `gallery` approved plates (reuse existing or placeholder svg)
- Demote `stackjet`, `opencode-annotate` to bench-drawer entries (featuredOrder null)
- Add `// TODO(Q12)` placeholders for bench content shape
- Acceptance: `featuredProjects` returns exactly the 6 in order, no showcase/demo refs

### 04 — Folder spread: /work/[slug]
**Dep: 01,03**
- Create `src/components/folder-spread.tsx` — tab bar + left flap + right stack
- Restyle `src/app/work/[slug]/page.tsx` to render FolderSpread (summary→challenge→intervention→decision→proof→lessons→stack→links→gallery)
- Gallery as pinned plates (reuse DeskPlate frame, not carousel)
- Keep `SystemDiagram` as one sheet where applicable
- Acceptance: case reads as folder, paper coherent, next-folder link works

### 05 — Folders index: /work
**Dep: 01,03**
- Restyle `src/app/work/page.tsx` + `ProjectRow` as paper drawer rows (keep `src/components/project-row.tsx` but paper tokens)
- Add tiny domain filter if trivial (no new state lib)
- Acceptance: all projects listed, paper style, rows link to folders

### 06 — Bench: /bench (← /lab)
**Dep: 01,03**
- Create `src/app/bench/page.tsx` + `src/components/bench-table.tsx` — table surface, scattered small cards/notes
- Sections: `On the bench`, `Experiments`, `Interests` — 8-10 placeholders with TODO(Q12) copy
- Redirect `/lab` → `/bench` in `next.config.ts` or `lab/page.tsx`
- Acceptance: bench feels like side table, placeholders visible, no dead links

### 07 — About sheet: /about
**Dep: 01**
- Restyle `src/app/about/page.tsx` as single pinned sheet (not long editorial)
- Content: name/alias/handle, one-paragraph stance, capabilities, education brief, timeline compressed, contact card reuse
- Acceptance: single sheet, paper, no capabilities/principles/experience long sections

### 08 — Retire showcase/demo + clean globals
**Dep: 02,04,05**
- Delete or unlink `src/app/showcase/ink-blueprint`, `src/app/demo/ink-blueprint`, `blueprint-*` components/pages + associated CSS in `globals.css`
- Keep `private/legal` untouched
- Add redirect for `/showcase/*`, `/demo/*` → `/` or 404 intentional
- Acceptance: no dead routes, build clean, bundle drops (no three)

### 09 — Contact as card only
**Dep: 02**
- Create `src/components/contact-card.tsx` — pinned card object on desk (email + github/linkedin/x + availability)
- Remove `contact-chapter` from home (already gone via 02) — ensure no duplicate contact section elsewhere
- Acceptance: card is only contact entry, desk-edge email also present, no contact chapter

### 10 — Polish, a11y, perf, e2e
**Dep: all above**
- `bun run lint && bun run typecheck && bun test && bun run build`
- `bun run test:e2e` — add specs: desk renders 6 plates, drag or keyboard pan works, plate → folder, folders index lists all, bench + about render, desk-edge persistent, reduced-motion
- Lighthouse + axe quick pass, responsive 980/680
- Vercel preview check
- Acceptance: green checks, no regressions

## Order

```
01 → 02 → 03 → 04 → 05 → 06 → 07 → 08 → 09 → 10
     03 can start in parallel with 02
     04/05/06 share deps on 01+03
```

## Notes

- Keep `site.ts` url/metadata, `robots.ts`, `sitemap.ts`, `opengraph-image.tsx` — no change
- Do not add Convex/DB — this stays content-driven (`content/*.ts`)
- Hand font: choose Caveat 400/700 or Patrick Hand — one file, small subset latin
- Drag: clamp to field bounds, no physics lib — simple pointer delta + spring via `motion`
