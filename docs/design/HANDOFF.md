# Portfolio redesign — design handoff

Redesign of Felipe Gorostiaga's portfolio. Three pages: a one-page home and two separate routes.

| Route      | Source file                 | What it is                                                        |
|------------|-----------------------------|-------------------------------------------------------------------|
| `/`        | `design/Main.dc.html`       | One-page scroll: hero, experience, projects, skills, off the clock, contact |
| `/library` | `design/Library.dc.html`    | Books / Movies / Quotes with search and sort                      |
| `/games`   | `design/Games.dc.html`      | Playable Game of Life + Minesweeper and Snake cards               |

**The `.dc.html` files are the source of truth for exact values** (every CSS rule, keyframe and the JS for the canvas effects). This document explains the system and the intent; when in doubt, copy from the source.

## How to read the `.dc.html` files

They are design-tool component files, not runnable pages. Map them to React like this:

- `<helmet><style>…</style></helmet>`: the page's global CSS (tokens, component classes, keyframes). Port it to a global stylesheet / CSS module.
- Markup inside `<x-dc>`: the JSX. `class` → `className`, inline `style="…"` → style objects or utility classes.
- `{{ name }}`: a value returned by `renderVals()` in the script at the bottom (state, derived values, handlers).
- `<sc-if value="{{ x }}">`: conditional render. `<sc-for list="{{ items }}" as="item">`: `.map()`.
- `class Component extends DCLogic`: a React class component (`this.state`, `setState`, `componentDidMount`), so the logic ports almost 1:1 to hooks.
- `href="Library.dc.html"` → `/library`, `href="Games.dc.html"` → `/games`, `href="Main.dc.html"` → `/`.
- `/_blob/c5f2…` is the portrait: use `assets/felipe-portrait.jpg` (or the original high-res photo).

## Design tokens

Theme is a class on the root (`.pf` = dark, `.pf.light` = light). Both themes are **green on black/white**.

| Token         | Dark                         | Light                          |
|---------------|------------------------------|--------------------------------|
| `--bg`        | `#060807`                    | `#F6F7F6`                      |
| `--surface`   | `rgba(255,255,255,.035)`     | `rgba(255,255,255,.62)`        |
| `--surface-2` | `rgba(255,255,255,.07)`      | `rgba(255,255,255,.92)`        |
| `--line`      | `rgba(255,255,255,.09)`      | `rgba(15,23,42,.09)`           |
| `--line-2`    | `rgba(255,255,255,.16)`      | `rgba(15,23,42,.17)`           |
| `--text`      | `#F2F5F3`                    | `#0A0D0B`                      |
| `--muted`     | `#A3ADA7`                    | `#3F4842`                      |
| `--faint`     | `#7E8983`                    | `#5D6660`                      |
| `--a1` (primary green) | `#4ADE80`           | `#15803D`                      |
| `--a2` (pale lime)     | `#D9F99D`           | `#4D7C0F`                      |
| `--a3` (deep green)    | `#22C55E`           | `#166534`                      |
| `--btn-text`  | `#04130A`                    | `#FFFFFF`                      |
| `--glow-o` (cursor glow opacity) | `.5`      | `.22`                          |
| `--blob-o` (aurora opacity)      | `.5` home / `.42` routes | `.3` home / `.26` routes |
| `--shadow`    | `0 30px 80px -30px rgba(0,0,0,.8)` | `0 30px 70px -35px rgba(16,24,20,.28)` |

All text colors pass WCAG AA (4.5:1) on their background. Light-mode greens are darker on purpose for contrast.

**Theme toggle:** default dark. Toggling uses the View Transitions API: a circle expands from the toggle button (`clip-path` on `::view-transition-new(root)`, 700 ms, `cubic-bezier(.65,0,.35,1)`). Falls back to an instant switch. Persist the choice (and respect `prefers-color-scheme` on first visit), which the mockup doesn't do.

## Typography

- **Geist** (300–800) for everything, **Geist Mono** (400/500) for labels, meta and the HUD. Google Fonts.
- **Instrument Serif italic** only for the single accent word in section headings ("*building*", "*shipped*", "*of choice*", "*work*") and route titles ("*library*", "*something*"). Not used anywhere else. "touch." in Contact is Geist with the green gradient.

| Element | Size / line-height / tracking / weight |
|---|---|
| Hero name (H1) | `clamp(56px, 9.2vw, 132px)` / .9 / -0.05em / 700; second line "Gorostiaga" is the animated green gradient |
| Rotating role words | `clamp(30px, 3.6vw, 46px)` / 1.15 / -0.035em / 600, color `--a1` |
| Section H2 | `clamp(40px, 5.4vw, 68px)` / 1 / -0.04em / 600 |
| Contact H2 | `clamp(44px, 6vw, 80px)` / .95 / -0.045em / 600 |
| Route H1 | `clamp(52px, 7.4vw, 104px)` / .92 / -0.05em / 700 |
| Body | 16–17px / 1.6–1.65, `--muted` |
| Eyebrow label | Geist Mono 13px, uppercase, .1em tracking, `--faint`. **No section numbers.** |

## Layout

- Content container `max-width: 1180px`, 24px side gutters. Sections ~100–120px vertical padding.
- Nav: floating glass pill, `position: sticky; top: 16px`, blurred translucent background. Left: "FG" gradient mark + name. Right: Experience, Projects, Skills, Contact │ Library ↗, Games ↗, theme toggle (44px round). Wraps on phones.
- Every layout is flex-wrap / auto-fill grid, so it collapses to one column at phone width.
- Touch targets ≥ 44px.

## Global effects

1. **Cursor glow:** a fixed 680px radial gradient (`--a1` → `--a2` → transparent) that follows the pointer with a .45s ease. Pointer position is written to CSS vars `--mx/--my` on the root in `onMouseMove`.
2. **Spotlight cards (`.spot`):** glass cards (`--surface`, 1px `--line`, `backdrop-filter: blur(14px)`). On mousemove, the card gets `--x/--y` (pointer position inside it), which drive:
   - a 1px gradient border that lights up around the cursor (`::before` with mask-composite),
   - a soft inner green glow (`::after`).
   - **Hover:** lift `translate: 0 -6px`, border tints green, background → `--surface-2`, green outer glow. The contact form has `.still` (glows but doesn't lift), and the Game of Life panel doesn't lift either.
3. **Scroll reveal (`.reveal`):** CSS scroll-driven animation (`animation-timeline: view()`), fade + rise 48px, inside `@supports`, so unsupported browsers just show content.
4. **Hover rule:** arrow icons never move on hover. Book covers and spines never tilt.
5. **Reduced motion:** `prefers-reduced-motion` disables all animations/transitions, and the hero canvas renders one static frame.

## Home (`/`): sections in order

### 1. Hero
- Full-bleed, min-height ~900px, sits under the sticky nav. Layers (back → front): aurora blobs (3 blurred radial gradients drifting 18–26s) → **interactive canvas field** → bottom fade into `--bg` → content.
- Left column: chip "● Software Engineer & Fullstack Developer" (pulsing green dot) → name → **rotating role word** → bio → CTAs.
  - Role words cycle every 2.5s (12.5s loop): **Builder. → Engineer. → Creator. → Problem solver. → Lifelong learner.** Each enters from below with blur→sharp and exits upward. All words are stacked in one grid cell; screen readers get the full list as plain text.
  - Bio: "An engineer driven by curiosity. I make products that are useful to people and help them reach their full potential — for me, creating is where learning and lasting impact meet."
  - CTAs: "Let's talk ↗" (primary: animated green gradient pill, scrolls to #contact) and "See my work" (ghost, → #experience).
- Right: 340px circular portrait inside a rotating conic-gradient ring (a1→a2→a3) plus a blurred copy as a halo. No floating chips.
- Entrance: name lines slide up through a mask (staggered 150/260ms), the rest fades up.
- Bottom corners (hidden on phones): "move · bend the field / click · send a shockwave" and "canvas 2D · spring physics". Scroll cue (mouse icon) at bottom center.

#### The hero canvas field (key showcase piece)
Canvas 2D lattice of dots on springs (see `_build`, `_frame` in `Main.dc.html`). Port it as a client-only component (`useRef` + `useEffect` + `requestAnimationFrame`, `ResizeObserver`, cleanup on unmount).

| Parameter | Value |
|---|---|
| Grid spacing | 30px (tweakable 18–48) |
| Pointer influence | Gaussian falloff, R = 140px, ignored beyond 3R |
| Forces | radial repel `S = 2.6` + tangential swirl `1.3` (× intensity, default 1) |
| Spring / damping | `K = 0.05`, `D = 0.87` (slightly bouncy) |
| Click ripple | ring expands at 0.8 px/ms, Gaussian band (σ² = 900), outward force 6, lives 1.7s, max 5; ignored when clicking links/buttons |
| Light sweep | diagonal band moving 260 px/s, brightens dots (color only) |
| Idle "ghost" pointer | if no real pointer for 2.6s, eases (0.035) along a Lissajous path: `x = w(.56 + .3 sin .37t)`, `y = h(.46 + .25 sin(.61t + 1.1))`; real pointer eases at 0.22 |
| Drawing | idle dots = 1.6px squares at base color; active dots = circles r = 0.9 + 2.6·p colored from a 64-step a1→a2→a3 LUT; neighbor mesh lines when proximity > .06; soft radial lens at pointer |
| HUD | dashed full-width/height guides through the pointer, 14px ring + crosshair ticks, mono label `x 812   y 344` in a rounded chip |
| Perf | DPR capped at 2, skip frames when `document.hidden`, rebuild grid on resize |

Theme palettes for the canvas (RGB): dark a1 74,222,128 · a2 217,249,157 · a3 34,197,94 · base dots 150,160,154 @ .28 · HUD 232,240,235. Light a1 21,128,61 · a2 77,124,15 · a3 22,101,52 · base 60,68,63 @ .24 · HUD 10,13,11.

### 2. Experience: "Where I've been *building*"
Vertical timeline: 2px line with a traveling green light, a dot per job (current jobs pulse). Each job is a `.spot` card: 64px letter tile (`hu`, `sc`, `bg`, placeholders for real logos), role, dates + "Current" badge, company · one-liner, dash bullets, mono tag pills.
- React Software Engineer · Humand · Feb 2024 — Now
- Prompt Engineer · Scale AI (freelance) · Jun 2023 — Now
- Senior Fullstack Developer · Banco Galicia · **[dates TBD]**

### 3. Projects: "Things I've *shipped*"
One wide card per project, alternating sides (Greenboom: preview left, Splitsea: preview right). Preview = browser-window frame (traffic-light dots + URL bar) with a 16:10 viewport; on hover it tilts slightly in 3D (`perspective(1400px) rotateX(2deg) rotateY(∓3deg) scale(1.01)`) with a green shadow. Text side: mono "domain · year", 46px name, description, stack tags, primary "Visit ↗" button. **Swap the skeleton placeholders for real screenshots.** Optional: tall full-page screenshot that scrolls inside the frame on hover.

### 4. Skills: "My weapons *of choice*"
Periodic-table tiles (auto-fill grid, min 250px): atomic number + category (mono), a big 2-letter symbol (gradient text, turns green + glow on hover), name, one-line description. React (Re), Next.js (Nx), TypeScript (Ts), Node.js (No), NestJS (Ns), Tailwind CSS (Tw), Material UI (Mu), LLM evaluation (Ai). The tile numbers are part of the periodic-table motif, not section numbering.

### 5. Off the clock: "Things I do outside *work*"
Two link cards → `/library` and `/games`. Library card shows 5 static book spines (green/charcoal, no hover motion). Games card shows a small grid with pixel gliders moving diagonally (`steps(14)`). Bottom-left: eyebrow, 40px title, description, green "Open the library →" / "Play something →".

### 6. Contact: "Let's get in touch."
"touch." has the moving green gradient (Geist, not serif). Left: copy + rows for Email (`fgorostiagabraun@gmail.com`), LinkedIn, GitHub (row slides on hover, arrow stays put). Right: glass form: first/last name, email, phone (optional), message with live `n / 300` counter, "Send message ↗". Wire it to a real handler (the mockup only shows a thank-you state).

### 7. Footer
One row: "© 2026 Felipe Gorostiaga", LinkedIn, GitHub, Email, "Back to top ↑". **No giant wordmark.**

## `/library`
- Header: eyebrow "/library", H1 "The *library*", "Books, movies and quotes that shaped how I think — rated honestly, out of ten."
- Controls: segmented tabs Books / Movies / Quotes (sliding green pill indicator, 116px tabs), search (title/author), sort select (Rating/Year/Title), order toggle (arrow rotates 180°).
- Book cards (`.spot`, auto-fill min 340px): 120×176 typographic cover (green/charcoal gradient, author in mono caps, title in Instrument Serif), title, author · year, green star + rating, gradient rating bar. **Books are fully static** (no cover tilt, no entrance stagger, no bar animation).
- Data: Thus Spoke Zarathustra (1883) 10 · Beyond Good and Evil (1886) 9.4 · Sapiens (2011) 9 · The Anti-Christ (1895) 8.2 · Ecce Homo (1908) 8.2 · When Nietzsche Wept (Yalom, 1992) 8. Plus the rest of the real library from the current site.
- Movies and Quotes are placeholders: pull the real ones from the current site. Quote cards: big gradient “ mark, serif blockquote, mono attribution.

## `/games`
- Header: eyebrow "/games", H1 "Play *something*", "Three classics I rebuilt from scratch. The Game of Life is already running — draw on it."
- Game of Life panel: canvas 64×36 torus, seeded with a Gosper glider gun + R-pentomino, ticks every 110ms. Living cells glow (color by age: young = a3 → older = a1), dead cells leave a fading trail (heat × 0.78 per tick), hover cell outlined. Click/drag paints (toggles based on first cell). Side column: "Live simulation" badge, title, description, 4 numbered rules, Generation / Population counters, buttons Pause/Play, Step, Shuffle (22% random), Glider gun, Clear.
- Minesweeper and Snake cards: static mini-board previews + description + "Play …" button linking to the existing games.

## Placeholders to fill (from Felipe)
- Banco Galicia dates, bullets and stack tags; any older jobs.
- LinkedIn and GitHub URLs (contact rows + footer).
- Greenboom and Splitsea: URL, year, description, stack, screenshots.
- Movies and quotes; the rest of the books.
- Links to the real Minesweeper / Snake games.
- Company logos (currently letter tiles).

## Accessibility notes
Real `<button>`/`<a>`/`<label>` everywhere; icon-only buttons have `aria-label`; decorative SVGs/canvas `aria-hidden`; visible `:focus-visible` outline in `--a1`; tabs use `role="tablist"/"tab"` + `aria-selected`; rotating words have a static screen-reader alternative.
