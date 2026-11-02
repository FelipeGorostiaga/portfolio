# Portfolio website

Felipe Gorostiaga's personal site: who I am, where I've worked, what I build with, and a few things I do outside work.

Live at [felipegorostiaga.com](https://www.felipegorostiaga.com).

## What's inside

- **Home (`/`)** — one-page scroll: an interactive canvas hero, experience timeline, projects, skills and a contact form.
- **Library (`/library`)** — books, movies and quotes I keep coming back to, with search and sorting.
- **Games (`/games`)** — a live Game of Life you can draw on, plus Minesweeper and Snake, all built from scratch.

## Stack

- [Next.js 13](https://nextjs.org) (Pages Router) and React 18, written in TypeScript
- Plain CSS: design tokens and shared classes in `src/styles/globals.css`, component styles in CSS Modules
- [zod](https://zod.dev) for validating the contact form, [nodemailer](https://nodemailer.com) to deliver it through Gmail
- [Vitest](https://vitest.dev) for unit tests of everything in `src/lib`
- Deployed on [Vercel](https://vercel.com)

## Project layout

```
src/
  pages/        routes: /, /library, /games, /games/minesweeper, /games/snake, /api/contact
  components/   layout (nav, footer, theme), home, library and games components
  content/      site details, experience, projects and skills as typed data
  lib/          pure logic (contact validation, library search, game engines, dates, palettes)
  styles/       global design tokens and shared classes
data/           books, movies and quotes (read at build time)
docs/design/    the design handoff the UI is built from
```

## Setup

Requirements: Node.js 20+ and npm.

```bash
npm ci
cp .env.example .env.local   # Gmail account + app password for the contact form
npm run dev                  # http://localhost:3000
```

Without the Gmail variables, the contact form still works in development: messages are logged to the terminal instead of being sent.

Other scripts:

```bash
npm test         # unit tests
npm run lint
npm run build    # production build (needs the Gmail variables, or SKIP_ENV_VALIDATION=1)
```

## Adding content

- **Jobs:** edit `src/content/experience.ts` (dates are `YYYY-MM`; `end: null` marks the current job).
- **Projects:** edit `src/content/projects.ts`. A project only appears once it has a `url`, a `description` and a `screenshot` (put screenshots in `public/`).
- **Library:** edit the JSON files in `data/`.
