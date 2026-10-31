# Portfolio redesign — design spec

Date: 2026-10-31 · Branch: `redesign` · Visual source of truth: [`docs/design/HANDOFF.md`](../../design/HANDOFF.md) and the three `docs/design/*.dc.html` files.

## Goal

Apply the new visual design to the portfolio, fix the bugs found in the 2026-10-30 code review, and close the security issues in the code and dependencies. Nothing else changes.

## Constraints and decisions

| Topic | Decision |
|---|---|
| Framework | Stay on the Next.js Pages Router. Bump `next` 13.2.4 → 13.5.11 (same major). No App Router or Next 14+ migration. |
| Routes | Clean slate: `/`, `/library`, `/games`, `/games/minesweeper`, `/games/snake`, `404`, `/api/contact`. Every other route is deleted with **no redirects**. |
| Styling | Port the design CSS as-is: tokens + shared classes in one global stylesheet, section styles in plain CSS Modules. Tailwind, Sass and MUI/emotion are removed. |
| Minesweeper / Snake | Kept and fitted into the new look (same shell, design tokens). |
| Projects | Content-driven; a project renders only when complete; the section and its nav link hide while none is complete. |
| Experience | All 7 jobs, with rewritten copy (draft below, Felipe edits). Galicia Senior Fullstack = Mar 2023 – Feb 2024. |
| Design files | Committed under `docs/design/` (public repo). |

## 1. Architecture

### Routes

| Route | Source | Notes |
|---|---|---|
| `/` | `pages/index.tsx` | One-page scroll: hero, experience, projects, skills, off the clock, contact, footer |
| `/library` | `pages/library.tsx` | `getStaticProps` loads `data/*.json` at build time |
| `/games` | `pages/games/index.tsx` | Game of Life panel + Minesweeper / Snake cards |
| `/games/minesweeper` | `pages/games/minesweeper.tsx` | Restyled existing game |
| `/games/snake` | `pages/games/snake.tsx` | Restyled existing game |
| `404` | `pages/404.tsx` | Route shell + "Page not *found*" + link home |
| `/api/contact` | `pages/api/contact.ts` | Only API route left |

Deleted: `/experience`, `/skills`, `/contact`, `/gallery/books|movies|quotes`, `/games/game-of-life`, `/admin`, `/api/auth/*`, `/api/trpc/*`, `/api/gallery/*`.

### Source layout

```
src/
  styles/globals.css          tokens (:root = dark, :root.light = light), base, shared classes
  content/                    typed content, no React
    site.ts                   name, role, email, LinkedIn, GitHub, site URL
    experience.ts             7 jobs
    projects.ts               Splitsea, Greenboom (+ isComplete rule)
    skills.ts                 8 periodic tiles
  lib/                        pure logic, no React, unit-tested
    library.ts                search / sort for books, movies, quotes
    contact.ts                zod schema shared by form and API
    games/life.ts             torus step, seeds (glider gun, R-pentomino), shuffle
    games/minesweeper.ts      board creation after first click, reveal, win check
    games/snake.ts            step, direction rules, collisions
  hooks/
    useTheme.tsx              ThemeProvider + useTheme
    usePointerVars.ts         writes --mx/--my on the shell and --x/--y on the hovered .spot
  components/
    layout/                   SiteShell, Nav (home + route variants), Footer (home + route variants), ThemeToggle, Seo, RouteHeader
    home/                     Hero, HeroField (canvas), Experience, Projects, Skills, OffTheClock, Contact
    library/                  LibraryTabs, LibraryControls, BookCard, QuoteCard
    games/                    LifePanel (canvas), MinesweeperPreview, SnakePreview, Minesweeper, Snake
```

Each component with section-specific styles has a sibling `*.module.css`. The design's inline `style="…"` attributes become module classes; shared classes (`.spot`, `.btn`, `.btn-primary`, `.btn-ghost`, `.nav`, `.nlink`, `.theme-btn`, `.eyebrow`, `.chip`, `.tag`, `.in`, `.lbl`, `.mono`, `.serif`, `.grad`, `.enter`, `.reveal`, `.cursor-glow`, `.aurora`, `.blob`, `.sr-only`) stay global with the design's exact rules.

### Theme

- Tokens from HANDOFF.md: dark on `:root`, light on `:root.light`. Per-page `--blob-o` (home .5/.3, routes .42/.26) set by a class on the shell.
- `_document` gets a tiny inline script that runs before paint: `localStorage.theme` → else `prefers-color-scheme` → else dark; it sets `light` or `dark` on `<html>`. No flash of the wrong theme.
- The server always renders the dark markup, so anything visible that depends on the theme is switched by CSS (`:root.light …`), never by React state. The toggle renders both sun and moon icons and CSS shows one. No hydration mismatch.
- `ThemeProvider` reads the class on mount and exposes `{ theme, toggle }`. `toggle` uses `document.startViewTransition` with the design's circle reveal (700 ms, `cubic-bezier(.65,0,.35,1)`), falls back to an instant switch when unsupported or under reduced motion, and persists to `localStorage`.
- Canvas components (HeroField, LifePanel, Snake) pick their RGB palettes from `theme` (values in HANDOFF.md).

### Fonts

Geist (300–800), Geist Mono (400/500) and Instrument Serif (italic) via a Google Fonts `<link>` in `_document`, with `preconnect`. (`next/font/google` in Next 13.5 does not ship Geist.)

### Global effects

- Cursor glow, spotlight cards, scroll reveal and the hover rules exactly as in HANDOFF.md "Global effects".
- One `usePointerVars` handler on the shell root replaces the design's `_move`.
- `prefers-reduced-motion`: the design's global rule disables animations/transitions; canvases render one static frame.

### Removed

- Dependencies: `tailwindcss`, `postcss`, `autoprefixer`, `prettier-plugin-tailwindcss`, `sass`, `@mui/material`, `@mui/icons-material`, `@emotion/react`, `@emotion/styled`, `react-hot-toast`, `@tanstack/react-query`, `@trpc/*`, `superjson`, `next-auth`, `@next-auth/prisma-adapter`, `prisma`, `@prisma/client`, `axios`, `p5`, `react-responsive`, `@fontsource/roboto`, `class-variance-authority`.
- Files: `prisma/`, `src/server/`, `src/utils/api.ts`, `tailwind.config.js`, `postcss.config.js`, `prettier.config.cjs` (the `.prettierrc` already wins), every old component, context and hook not reused (including `useBreakpoints`, `HackerText`, the old Navbar/Footer/SideDrawer).
- `public/` assets no longer referenced after the redesign (e.g. the 1.8 MB `pfp-smiling.jpg`, skill logos, backgrounds, old game images). Favicons and the company logos stay.

## 2. Pages

### `/`

1. **Hero** — per HANDOFF.md "Hero". `HeroField` ports `_build` / `_frame` / `_move` / `_down` from `Main.dc.html` as a client-only component: `useRef` + `requestAnimationFrame` + `ResizeObserver`, DPR capped at 2, skips frames while `document.hidden`, cleans up on unmount, one static frame under reduced motion. Ripples ignore clicks on links/buttons. Portrait: `public/felipe-portrait.jpg` from the handoff. Rotating role words are CSS-only with a `.sr-only` full list.
2. **Experience** — 7 cards from `content/experience.ts`, newest start first. Each job: `role, company, companyUrl, logo, start, end | null, summary, bullets[], tags[]`. `end: null` drives "Now", the "Current" badge and the pulsing timeline dot. Dates render as `Mon YYYY — Mon YYYY`. The 64px tile shows the company logo, falling back to the letter tile.
3. **Projects** — from `content/projects.ts`: `name, url?, domain?, year?, description?, stack[], screenshot?`. `isComplete(p)` = url + description + screenshot. Only complete projects render, alternating sides as in the design; the section and the "Projects" nav link are hidden when none is complete (the case at launch).
4. **Skills** — the 8 periodic tiles from HANDOFF.md / `Main.dc.html` (Re, Nx, Ts, No, Ns, Tw, Mu, Ai). No percentages.
5. **Off the clock** — two link cards to `/library` and `/games`; book spines and gliders are static CSS (gliders animate via `steps(14)`).
6. **Contact** — design form; behavior in §3.
7. **Footer** — `© {current year} Felipe Gorostiaga`, LinkedIn, GitHub, Email, "Back to top ↑".

Home nav: Experience, Projects (when visible), Skills, Contact │ Library ↗, Games ↗, theme toggle.

### `/library`

- Header and controls per `Library.dc.html`. Tabs use `role="tablist"` / `role="tab"` / `aria-selected`, sliding pill indicator. The active tab is mirrored in the URL (`?tab=books|movies|quotes`, shallow `router.replace`), so refresh and back keep it.
- Search applies to every tab (books: title/author; movies: title/director; quotes: text/author/reference). Sort (Rating / Year / Title) and the order toggle apply to books and movies and are disabled on Quotes.
- Book and movie cards share `BookCard` (movies show the director); typographic covers use the design's 6 gradient pairs, assigned by index. Static: no tilt, no stagger, no bar animation.
- Quote cards per design. Quotes longer than 220 characters use a ~22px blockquote instead of 28px (deviation from the handoff, for the 450-character quote).
- Count label (`12 books`, `1 movie`, `64 quotes`) and the design's empty state. No pagination.
- Data: `data/*.json` stay the source. Their unused `imgUrl` fields are removed, and so are the remote image hosts in `next.config`.

### `/games`

- Header per `Games.dc.html`.
- `LifePanel` ports the design's Game of Life (64×36 torus, Gosper glider gun + R-pentomino, 110 ms ticks, age colors, heat trail × 0.78, hover outline, Pause/Play, Step, Shuffle 22 %, Glider gun, Clear, Generation / Population). Drawing uses pointer events (works on touch); the canvas already has `touch-action: none`. Starts paused under reduced motion.
- Minesweeper and Snake cards with the design's static previews and "Play …" links to the sub-pages.

### `/games/minesweeper` and `/games/snake`

- Route shell (nav with Games active, compact footer) and a `RouteHeader` (eyebrow `/games`, H1 in the route style).
- Minesweeper: board cells use the design's `.ms` styles (covered, flagged with the CSS flag, revealed, number colors); mines render as a `#F43F5E` dot. HUD (flags left, new game, timer) in the `.stat` style. Win / lose panel is a `.spot` card with a primary "Play again" button. Cell size is a CSS variable stepped down with media queries.
- Snake: canvas colors from the theme palette (body a1→a2, head a3, apple `#F43F5E`). Score and game-over panel in the design style. Below 640px a CSS media query shows "Snake needs a keyboard — try it on a larger screen" instead of the board.

### Metadata

A `Seo` component per page: `<title>`, `description`, canonical, Open Graph and Twitter tags, OG image = the portrait as an absolute URL built from `site.url`. Favicons, manifest, `theme-color` and `lang="en"` move to `_document` so every page has them.

## 3. Bugs, security, verification

### Bugs removed with deleted code

Movies search 500 (`api/gallery/movies.ts` filtered on `author`), invalid `'rating'` default sort, duplicate DOM ids and dead search icon in `Filters`, Game of Life play/pause stacking timers, `HackerText` interval leak and `letters` typo, `capitalize(undefined)` crash, theme flash, Galicia `startDate: new Date()`.

### Bugs fixed in kept code

- **Contact form**: input is kept when sending fails (inline error + email fallback); submit via `<form onSubmit>`; button disabled while sending; phone `type="tel"` with a correct, simple pattern; labels wrap their inputs; live `n / 300` counter.
- **Contact API**: POST only (405 + `Allow`); body validated with the shared zod schema (names ≤ 30 chars, no line breaks; valid email; optional phone; message 20–300); mail sent `from` the Gmail account with `replyTo` = visitor; `bodyParser.sizeLimit` 16 kb; generic error responses (no transport internals); hidden honeypot field (filled → 200, silently dropped); best-effort in-memory limit of 5 requests per IP per hour (not shared across serverless instances); in development, missing Gmail env vars → the mail is logged instead of sent.
- **Minesweeper**: mines are placed after the first click, excluding that cell and its neighbours; iterative flood-fill reveal replaces the broken `Set<[n, n]>` recursion; no side effects inside state updaters; timer derived from timestamps instead of 10 ms ticks.
- **Snake**: direction changes are validated against the last direction actually moved (no reversing into itself via two quick keys); `e.key` replaces `keyCode`; the loop stops before drawing outside the board; the apple is drawn directly (no DOM `<img>` lookup).

### Security

- `.env.example` values replaced with placeholders. Felipe rotates the Gmail app password and deletes the GitHub OAuth app (auth is removed). After rotation the old `.env` in git history is harmless; no history rewrite.
- `src/env.mjs` only requires `GMAIL_API_USERNAME` and `GMAIL_API_PASSWORD`. Felipe can then delete `DATABASE_URL`, `NEXTAUTH_*`, `GITHUB_*` from Vercel.
- Dependencies: dead packages removed (see §1); `nodemailer` → latest major; `zod` → latest 3.x; `next` + `eslint-config-next` → 13.5.11; `typescript` 4.8 → 5.x only if an updated package's types require it. `npm audit --omit=dev` re-run; every remaining advisory is listed in the PR with why it does not apply (no middleware, rewrites, Server Actions or App Router; image optimizer disabled).
- `next.config`: `images.unoptimized: true` (verify `/_next/image` no longer serves), `i18n` block removed, `headers()` adds `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY` and `Permissions-Policy: camera=(), microphone=(), geolocation=()`. No full CSP (inline theme script + Google Fonts make it fiddly on the Pages Router); out of scope.

### Verification

- `npx tsc --noEmit`, `npx next lint` and `npx next build` with no errors.
- Vitest (dev dependency) unit tests for `src/lib`: library search/sort, contact schema, Life (blinker, glider, wrap-around), Minesweeper (first-click safety, flood fill, win), Snake (no reversal, wall and self collision).
- Built-in browser pass on `next dev` and `next start`: every route in dark and light, at 375px and desktop, with reduced motion; keyboard focus and library tabs; theme persists across reload without a flash; contact send through the dev logger; old routes return 404; security headers present; `/_next/image` disabled.
- Screenshots in the PR.

### Delivery

One branch (`redesign`) and one PR to `main`, commits in this order: cleanup + security → bug fixes in kept code → theme + shell → home → library → `/games` → restyled Minesweeper / Snake. README updated to the real stack. If Vercel is connected, the PR's preview deploy is the review surface before merge.

## 4. Content

### `content/site.ts`

Name Felipe Gorostiaga · role "Software Engineer & Fullstack Developer" · email `fgorostiagabraun@gmail.com` · LinkedIn `https://www.linkedin.com/in/felipe-gorostiaga/` · GitHub `https://github.com/FelipeGorostiaga` · site `https://www.felipegorostiaga.com`.

### `content/experience.ts` — DRAFT copy for Felipe to edit

The Humand bullets go beyond the old site's two lines, based on work visible in this workspace; confirm what is fine to say publicly.

1. **React Software Engineer** · Humand · Feb 2024 — Now · humand.co · `/humand.png`
   Front-end engineer on the Humand employee-experience platform.
   - Build responsive, accessible features for the web and admin apps with React, TypeScript and Material UI.
   - Contribute to the shared design system that both apps are built on.
   - Lead framework upgrades across the apps, such as the move from React Query v3 to v5.
   - Review pull requests and give feedback that keeps the codebase healthy.
   Tags: React · TypeScript · Material UI · React Query
2. **Prompt Engineer** · Scale AI (freelance) · Jun 2023 — Now · scale.com · `/logos/scale-logo.svg`
   Freelance reviewer and task writer for LLM training data.
   - Review model answers to computer-science and STEM prompts for correctness, reasoning and clarity.
   - Rewrite weak responses into reference-quality answers.
   - Write prompts and evaluation criteria that expose where models fail.
   Tags: AI · LLM evaluation · Computer Science
3. **Senior Fullstack Developer** · Banco Galicia · Mar 2023 — Feb 2024 · galicia.ar/empresas · `/logos/galicia-logo.png`
   Transactional team of the bank's B2B web platform.
   - Built React screens that match the design team's high-fidelity specs.
   - Created configurable components shared by several teams in a micro-frontend architecture.
   - Developed, tested and deployed NestJS microservices with a focus on the security of transactional flows.
   Tags: React · NestJS · Next.js · Micro-frontends
4. **Backend Developer** · Banco Galicia · Nov 2022 — Mar 2023 · `/logos/galicia-logo.png`
   Core team of the bank's B2B mobile app.
   - Designed, tested and deployed the NestJS microservices behind the mobile app.
   - Shaped the technical decisions of its backend-for-frontend (BFF) layer.
   Tags: NestJS · Microservices · BFF
5. **Software Engineer** · Dome.xyz (freelance) · Apr 2022 — Dec 2022 · mydome.xyz · `/logos/dome-logo.svg`
   Lead developer of a four-person team at a crypto startup.
   - Designed the architecture around cost, scalability and performance.
   - Built the REST API, the web app, scheduled jobs and serverless functions.
   - Integrated several web3 providers and APIs.
   - Ran the infrastructure on AWS and Vercel and advised on UI/UX.
   Tags: NestJS · Next.js · PostgreSQL · AWS · Vercel
6. **Junior Developer** · Banco Galicia · Dec 2021 — Nov 2022 · `/logos/galicia-logo.png`
   Core team of the bank's B2B web platform.
   - Built React components for the business web app.
   - Developed, tested and deployed NestJS microservices.
   Tags: React · NestJS · Next.js
7. **Business Intelligence Developer** · Bolsas y Mercados Argentinos (BYMA) · Jun 2020 — Dec 2020 · byma.com.ar · `/logos/byma-logo.png`
   Investor relations team at Argentina's stock exchange.
   - Built interactive dashboards on historical market activity.
   - Wrote scheduled jobs that parse each day's market data.
   - Helped analyze and present the quarterly reports.
   Tags: Python · Power BI

### `content/projects.ts`

- **Splitsea** — description: "Expense tracking for households, couples and groups: log shared expenses, split them fairly and keep balances clear across currencies." Stack: Next.js, React 19, TypeScript, Tailwind CSS, Supabase. Missing: url, year, screenshot → hidden.
- **Greenboom** — name only → hidden.

### `content/skills.ts`

The 8 tiles exactly as in `Main.dc.html` (number, category, symbol, name, one-line description).

## Out of scope

Next.js major upgrade / App Router, a full Content-Security-Policy, new features beyond the handoff (e.g. touch controls for Snake), git history rewriting, CI setup.

## Felipe's actions (outside the code)

1. Rotate the Gmail app password; update it in Vercel.
2. Delete the GitHub OAuth app and the old database (if it still exists); remove their env vars from Vercel.
3. Edit the experience copy above.
4. Send project URLs, years and screenshots when ready (Splitsea, Greenboom).
