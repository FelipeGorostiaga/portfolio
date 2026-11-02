# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply Felipe's design handoff to the portfolio on the existing Next.js 13 Pages Router, fix the reviewed bugs and close the security issues.

**Architecture:** Pure logic (contact validation, library search/sort, the three games, dates, palettes, theme resolution) lives in `src/lib` with Vitest tests. Pages are thin: a shared `SiteShell` (nav, footer, cursor glow, pointer vars) wraps section components styled by the design's CSS, ported as-is into `globals.css` plus CSS Modules. Content is typed data in `src/content`; the library reads `data/*.json` at build time.

**Tech Stack:** Next.js 13.5.11 (Pages Router), React 18.2, TypeScript 5.9, plain CSS + CSS Modules, zod 4.6, nodemailer 10, Vitest 5, npm, Node 24.

**Spec:** `docs/superpowers/specs/2026-10-31-portfolio-redesign-design.md` (approved). Visual source of truth: `docs/design/HANDOFF.md` and `docs/design/{Main,Library,Games}.dc.html`. Line numbers below refer to those files.

## Global Constraints

- Pages Router only; `next` 13.5.11; no App Router, no Next 14+.
- npm with `package-lock.json`; Node 24.
- After Task 7: no Tailwind, PostCSS, Sass, MUI, emotion. Styling = `src/styles/globals.css` + `*.module.css`.
- Design tokens, sizes, timings and copy are copied verbatim from `docs/design/*` (HANDOFF.md token table; `.dc.html` CSS rules and strings).
- Experience copy comes from spec §4 verbatim (Felipe may edit it later).
- Accessibility (HANDOFF.md "Accessibility notes"): real `<button>`/`<a>`/`<label>`; icon-only buttons have `aria-label`; decorative SVG/canvas `aria-hidden`; `:focus-visible` outline `2px solid var(--a1)`, offset 3px; touch targets ≥ 44px.
- `prefers-reduced-motion: reduce` disables animations/transitions (design rule) and canvases draw one static frame.
- Theme-dependent visuals switch by CSS (`:root.light …`), never by React state (no hydration mismatch). Server markup is the dark variant.
- No new runtime dependencies. Only new devDependency: `vitest`.
- Every commit passes: `npx tsc --noEmit`, `npm test`, `SKIP_ENV_VALIDATION=1 npx next build`.
- Commit messages: Conventional Commits (`feat:`, `fix:`, `chore:`, `test:`, `docs:`), matching repo history.
- Never push or open the PR without Felipe's explicit OK.

## Review Focus

1. Stored theme value that is neither `dark` nor `light` (old value, manual edit) → fall back to the system preference, then dark; never a blank or broken theme. Test in Task 7 (`resolveTheme`).
2. Contact message of only whitespace or a name containing a line break → rejected with a field error, nothing sent. Tests in Task 2.
3. Contact rate limit: the 6th request within an hour from one IP gets 429; a different IP is unaffected; the same IP is allowed again after the window. Tests in Task 2.
4. Library search with stray spaces or different case (`"  NIETZSCHE "`) still matches; a junk or repeated `?tab=` query falls back to Books. Tests in Task 3.
5. Minesweeper: flagging a revealed cell or revealing a flagged cell changes nothing (tests in Task 5); clicks after the game ended change nothing (component guard, browser check in Task 13 Step 4).

---

### Task 1: Remove dead layers, update dependencies, harden config

**Files:**
- Delete: `prisma/`, `src/server/api/`, `src/server/auth.ts`, `src/server/db.ts`, `src/utils/api.ts`, `src/pages/admin/`, `src/pages/api/auth/`, `src/pages/api/trpc/`
- Modify: `package.json`, `package-lock.json`, `src/pages/_app.tsx`, `src/components/Contact/Form/ContactForm.tsx`, `src/env.mjs`, `next.config.mjs`, `.env.example`

**Interfaces:**
- Produces: `env.GMAIL_API_USERNAME`, `env.GMAIL_API_PASSWORD` (`string | undefined` outside production, required in production).

- [ ] **Step 1: Delete the files listed above**

- [ ] **Step 2: Update `package.json`**

Remove dependencies: `@next-auth/prisma-adapter`, `@prisma/client`, `@trpc/client`, `@trpc/next`, `@trpc/react-query`, `@trpc/server`, `next-auth`, `superjson`, `axios`, `p5`, `react-responsive`, `@fontsource/roboto`. Remove devDependency `prisma`. Move `@types/nodemailer` to devDependencies. Remove the `postinstall` script and the `ct3aMetadata` block. Then:

```bash
npm install next@13.5.11 nodemailer@10.3.1 zod@4.6.7
npm install -D eslint-config-next@13.5.11 @types/nodemailer@8.0.2 typescript@5.9.3 @types/node@24
```

- [ ] **Step 3: Remove tRPC and next-auth from `_app.tsx`**

Drop `SessionProvider`, the `session` page prop, `api.withTRPC`; export `MyApp` directly. Everything else in `_app` stays until Task 7.

- [ ] **Step 4: Replace axios in `ContactForm.tsx`**

`await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })`, throwing when `!response.ok`. (This form is replaced in Task 10.)

- [ ] **Step 5: Shrink `src/env.mjs`**

Server schema keeps `NODE_ENV` and `GMAIL_API_USERNAME` / `GMAIL_API_PASSWORD` as `z.string().min(1)` in production, `.optional()` otherwise (same pattern the file used for `NEXTAUTH_SECRET`). Remove `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `GITHUB_ID`, `GITHUB_SECRET` from schema and `processEnv`.

- [ ] **Step 6: Replace `.env.example` contents**

```
# Gmail account that sends and receives contact-form mail.
# Use an App Password: https://myaccount.google.com/apppasswords
GMAIL_API_USERNAME="you@gmail.com"
GMAIL_API_PASSWORD="your-gmail-app-password"
```

- [ ] **Step 7: Harden `next.config.mjs`**

Remove the `i18n` block and `images.remotePatterns`; set `images: { unoptimized: true }`. Add:

```js
async headers() {
  return [{
    source: '/(.*)',
    headers: [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
    ],
  }];
},
```

- [ ] **Step 8: Verify**

Run: `npx tsc --noEmit` → no errors (fix only what the TS 5.9 bump surfaces). Run: `SKIP_ENV_VALIDATION=1 npx next build` → succeeds, no `/admin`, `/api/auth`, `/api/trpc` routes in the output. Run: `npm audit --omit=dev` → no `next-auth`, `axios`, `nodemailer` or `zod` entries; save the full output to the scratchpad for the PR description (Task 14).

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "chore: remove dead auth/db/trpc layers and update vulnerable dependencies"
```

---

### Task 2: Test runner, contact validation and hardened `/api/contact`

**Files:**
- Create: `vitest.config.ts`, `src/lib/contact.ts`, `src/lib/contact.test.ts`, `src/pages/api/contact.ts`
- Delete: `src/pages/api/contact/index.ts`
- Modify: `package.json` (scripts)

**Interfaces:**
- Produces (in `src/lib/contact.ts`):
  - `CONTACT_LIMITS = { name: 30, messageMin: 20, messageMax: 300, phoneMax: 20 } as const`
  - `contactSchema` (zod object) with fields `firstName`, `lastName`, `email`, `phone` (optional, `''` allowed), `message`, `company` (honeypot, optional)
  - `type ContactInput = z.input<typeof contactSchema>`
  - `type MailMessage = { replyTo: string; subject: string; text: string }`
  - `buildMail(input: z.output<typeof contactSchema>): MailMessage`
  - `type RateLimiter = { hit(key: string, now: number): boolean }` (true = allowed)
  - `createRateLimiter(limit = 5, windowMs = 3_600_000): RateLimiter`
  - `type ContactDeps = { send(mail: MailMessage): Promise<void>; limiter: RateLimiter; now(): number }`
  - `type ContactResult = { status: 201 | 200 | 400 | 405 | 429 | 500; body: { ok: boolean; error?: string; fieldErrors?: Record<string, string[]> } }`
  - `handleContact(method: string, body: unknown, ip: string, deps: ContactDeps): Promise<ContactResult>`

- [ ] **Step 1: Add Vitest**

```bash
npm install -D vitest@5.0.5
```

Add script `"test": "vitest run"`. `vitest.config.ts`: `test.include = ['src/**/*.test.ts']`, `test.environment = 'node'`, `resolve.alias` mapping `~` to `./src`.

- [ ] **Step 2: Write the failing tests** (`src/lib/contact.test.ts`)

```ts
import { describe, expect, it, vi } from 'vitest';
import { buildMail, contactSchema, createRateLimiter, handleContact, type ContactDeps } from '~/lib/contact';

const valid = { firstName: 'Ada', lastName: 'Lovelace', email: 'ada@example.com', phone: '', message: 'I would love to talk about engines.', company: '' };
const deps = (over: Partial<ContactDeps> = {}): ContactDeps => ({
  send: vi.fn().mockResolvedValue(undefined), limiter: createRateLimiter(), now: () => 0, ...over,
});

describe('contactSchema', () => {
  it('accepts a valid message', () => expect(contactSchema.safeParse(valid).success).toBe(true));
  it('rejects a whitespace-only message', () =>
    expect(contactSchema.safeParse({ ...valid, message: ' '.repeat(40) }).success).toBe(false));
  it('rejects line breaks in names', () =>
    expect(contactSchema.safeParse({ ...valid, firstName: 'Ada\nBcc: x@y.z' }).success).toBe(false));
  it('rejects names over 30 characters', () =>
    expect(contactSchema.safeParse({ ...valid, lastName: 'x'.repeat(31) }).success).toBe(false));
  it('accepts a formatted phone and rejects letters', () => {
    expect(contactSchema.safeParse({ ...valid, phone: '+54 9 11 1234-5678' }).success).toBe(true);
    expect(contactSchema.safeParse({ ...valid, phone: 'call me' }).success).toBe(false);
  });
  it('rejects messages over 300 characters', () =>
    expect(contactSchema.safeParse({ ...valid, message: 'x'.repeat(301) }).success).toBe(false));
});

describe('buildMail', () => {
  it('replies to the visitor and names them in the subject', () => {
    const mail = buildMail(contactSchema.parse(valid));
    expect(mail.replyTo).toBe('ada@example.com');
    expect(mail.subject).toBe('Hey! Ada Lovelace wants to talk to you...');
    expect(mail.text).toContain('Email: ada@example.com');
    expect(mail.text).not.toContain('Phone:');
  });
  it('adds the phone line when given', () =>
    expect(buildMail(contactSchema.parse({ ...valid, phone: '+54 11 1234 5678' })).text).toContain('Phone: +54 11 1234 5678'));
});

describe('handleContact', () => {
  it('rejects non-POST with 405', async () =>
    expect((await handleContact('GET', valid, '1.1.1.1', deps())).status).toBe(405));
  it('returns 400 with field errors for invalid input and sends nothing', async () => {
    const d = deps();
    const res = await handleContact('POST', { ...valid, email: 'nope' }, '1.1.1.1', d);
    expect(res.status).toBe(400);
    expect(res.body.fieldErrors?.email).toBeDefined();
    expect(d.send).not.toHaveBeenCalled();
  });
  it('silently drops honeypot submissions', async () => {
    const d = deps();
    expect((await handleContact('POST', { ...valid, company: 'Spam Inc' }, '1.1.1.1', d)).status).toBe(200);
    expect(d.send).not.toHaveBeenCalled();
  });
  it('sends and returns 201', async () => {
    const d = deps();
    expect((await handleContact('POST', valid, '1.1.1.1', d)).status).toBe(201);
    expect(d.send).toHaveBeenCalledOnce();
  });
  it('hides transport errors behind a generic 500', async () => {
    const res = await handleContact('POST', valid, '1.1.1.1', deps({ send: vi.fn().mockRejectedValue(new Error('535 bad creds')) }));
    expect(res).toEqual({ status: 500, body: { ok: false, error: 'Could not send message' } });
  });
  it('limits each IP to 5 requests per hour', async () => {
    let t = 0;
    const d = deps({ now: () => t });
    for (let i = 0; i < 5; i++) expect((await handleContact('POST', valid, '1.1.1.1', d)).status).toBe(201);
    expect((await handleContact('POST', valid, '1.1.1.1', d)).status).toBe(429);
    expect((await handleContact('POST', valid, '2.2.2.2', d)).status).toBe(201);
    t = 3_600_001;
    expect((await handleContact('POST', valid, '1.1.1.1', d)).status).toBe(201);
  });
});
```

- [ ] **Step 3: Run to verify failure**

Run: `npx vitest run src/lib/contact.test.ts` → FAIL (`~/lib/contact` not found).

- [ ] **Step 4: Implement `src/lib/contact.ts`**

All string fields `.trim()`. Names: `min(1, 'Required')`, `max(30, 'Max. 30 characters')`, `regex(/^[^\r\n]*$/, 'Line breaks are not allowed')`. Email: `email('Enter a valid email')`, `max(254)`. Phone: `regex(/^\+?[0-9\s().-]{6,20}$/, 'Invalid phone number')` or `''`. Message: `min(20, 'At least 20 characters')`, `max(300, 'Max. 300 characters')`. `company`: optional string.
`handleContact` order: method → `limiter.hit(ip, now())` (429, `'Too many messages, try again later'`) → `safeParse` (400, `'Invalid input'` + `z.flattenError(error).fieldErrors`, zod 4 API) → honeypot non-empty (200 `{ ok: true }`) → `send(buildMail(data))` (201 `{ ok: true }`, or 500 as tested). Mail text: the message, then `\n\n\nEmail: {email}` and `\nPhone: {phone}` when present. Rate limiter: `Map<string, number[]>` of timestamps, pruning those older than `windowMs`.

- [ ] **Step 5: Run to verify pass**

Run: `npx vitest run src/lib/contact.test.ts` → PASS.

- [ ] **Step 6: Write the route `src/pages/api/contact.ts`**

`export const config = { api: { bodyParser: { sizeLimit: '16kb' } } }`. Module-level limiter and a lazily created nodemailer transport (`service: 'gmail'`, auth from `env`). `send`: if Gmail vars are missing and `NODE_ENV !== 'production'`, `console.info('[contact] dev mail', mail)`; otherwise `transport.sendMail({ from: user, to: user, ...mail })`. IP = first entry of `x-forwarded-for`, else `req.socket.remoteAddress ?? 'unknown'`. On 405 set `Allow: POST`. Respond `res.status(result.status).json(result.body)`. Delete `src/pages/api/contact/index.ts`. (The old `ContactForm` payload no longer matches; it is replaced in Task 10.)

- [ ] **Step 7: Verify and commit**

Run: `npx tsc --noEmit && npm test && SKIP_ENV_VALIDATION=1 npx next build` → all pass.

```bash
git add -A
git commit -m "fix: validate, rate-limit and harden the contact endpoint"
```

---

### Task 3: Library search and sort

**Files:**
- Create: `src/lib/library.ts`, `src/lib/library.test.ts`
- Modify: `data/books.json`, `data/movies.json` (remove every `imgUrl` field)

**Interfaces:**
- Produces:
  - `type RawBook = { id: number; title: string; author: string; year: number; score: number }`
  - `type RawMovie = { id: number; title: string; director: string; year: number; score: number }`
  - `type Quote = { id: number; text: string; author: string; reference?: string }`
  - `type RatedItem = { id: number; title: string; creator: string; year: number; score: number }`
  - `type LibraryTab = 'books' | 'movies' | 'quotes'`, `type SortKey = 'rating' | 'year' | 'title'`, `type SortOrder = 'desc' | 'asc'`
  - `fromBook(b: RawBook): RatedItem`, `fromMovie(m: RawMovie): RatedItem`
  - `filterRated(items: RatedItem[], query: string): RatedItem[]` (title or creator)
  - `sortRated(items: RatedItem[], key: SortKey, order: SortOrder): RatedItem[]` (returns a new array; `rating` sorts by `score`; `title` uses `localeCompare`)
  - `filterQuotes(quotes: Quote[], query: string): Quote[]` (text, author or reference)
  - `parseTab(value: string | string[] | undefined): LibraryTab`
  - `LONG_QUOTE = 220`

- [ ] **Step 1: Write the failing tests** (`src/lib/library.test.ts`)

```ts
import { describe, expect, it } from 'vitest';
import books from '../../data/books.json';
import quotes from '../../data/quotes.json';
import { filterQuotes, filterRated, fromBook, parseTab, sortRated } from '~/lib/library';

const items = books.map(fromBook);

describe('filterRated', () => {
  it('ignores case and surrounding spaces', () =>
    expect(filterRated(items, '  NIETZSCHE ').map((b) => b.title)).toHaveLength(7)); // 6 by author + "When Nietzsche Wept"
  it('matches titles', () => expect(filterRated(items, 'sapiens').map((b) => b.title)).toEqual(['Sapiens']));
  it('returns everything for an empty query', () => expect(filterRated(items, '')).toHaveLength(12));
});

describe('sortRated', () => {
  it('sorts by rating, high to low', () => expect(sortRated(items, 'rating', 'desc')[0].title).toBe('Thus Spoke Zarathustra'));
  it('sorts by rating, low to high', () => expect(sortRated(items, 'rating', 'asc')[0].title).toBe('21 Lessons for the 21st Century'));
  it('sorts by year', () => expect(sortRated(items, 'year', 'asc')[0].year).toBe(1883));
  it('sorts by title', () => expect(sortRated(items, 'title', 'asc')[0].title).toBe('21 Lessons for the 21st Century'));
  it('does not mutate its input', () => {
    const before = items.map((b) => b.id);
    sortRated(items, 'title', 'desc');
    expect(items.map((b) => b.id)).toEqual(before);
  });
});

describe('filterQuotes', () => {
  it('matches the reference field', () => {
    const withRef = quotes.find((q) => q.reference)!;
    expect(filterQuotes(quotes, withRef.reference!.toUpperCase())).toContainEqual(withRef);
  });
});

describe('parseTab', () => {
  it('accepts known tabs', () => expect(parseTab('quotes')).toBe('quotes'));
  it('falls back to books for junk, arrays or nothing', () => {
    expect(parseTab('blue')).toBe('books');
    expect(parseTab(['movies', 'quotes'])).toBe('books');
    expect(parseTab(undefined)).toBe('books');
  });
});
```

- [ ] **Step 2: Run to verify failure** — `npx vitest run src/lib/library.test.ts` → FAIL.
- [ ] **Step 3: Implement `src/lib/library.ts`** per the Interfaces block. Query normalization: `query.trim().toLowerCase()`. Remove `imgUrl` from both JSON files.
- [ ] **Step 4: Run to verify pass** — `npx vitest run src/lib/library.test.ts` → PASS.
- [ ] **Step 5: Verify and commit** — `npx tsc --noEmit && npm test && SKIP_ENV_VALIDATION=1 npx next build`, then:

```bash
git add -A
git commit -m "feat: add library search and sort helpers"
```

(The old gallery pages still render; their cover images disappear because `imgUrl` is gone. They are deleted in Task 7.)

---

### Task 4: Game of Life engine

**Files:**
- Create: `src/lib/games/life.ts`, `src/lib/games/life.test.ts`

**Interfaces:**
- Produces:
  - `LIFE_COLS = 64`, `LIFE_ROWS = 36`
  - `type LifeState = { cols: number; rows: number; cells: Uint8Array; age: Uint16Array; heat: Float32Array; generation: number; population: number }`
  - `createLife(cols = LIFE_COLS, rows = LIFE_ROWS): LifeState`
  - `cellIndex(s: LifeState, x: number, y: number): number` (wraps x and y)
  - `setCell(s: LifeState, index: number, alive: boolean): void` (alive → heat 1; resets age; updates population)
  - `stepLife(s: LifeState): void` (mutates; torus; port of `_step`, `Games.dc.html` 294–317)
  - `seedGliderGun(s: LifeState): void` (clear, then the gun offset (+2, +3) and R-pentomino offset (+48, +22), coordinates from `Games.dc.html` 273–276)
  - `shuffleLife(s: LifeState, random = Math.random, density = 0.22): void`
  - `clearLife(s: LifeState): void`

- [ ] **Step 1: Write the failing tests** (`src/lib/games/life.test.ts`)

```ts
import { describe, expect, it } from 'vitest';
import { cellIndex, clearLife, createLife, seedGliderGun, setCell, shuffleLife, stepLife } from '~/lib/games/life';

const aliveAt = (s: ReturnType<typeof createLife>) =>
  [...s.cells].flatMap((v, i) => (v ? [[i % s.cols, Math.floor(i / s.cols)]] : [])).sort();
const place = (s: ReturnType<typeof createLife>, pts: number[][]) => pts.forEach(([x, y]) => setCell(s, cellIndex(s, x, y), true));

describe('stepLife', () => {
  it('oscillates a blinker with period 2', () => {
    const s = createLife(); place(s, [[10, 10], [11, 10], [12, 10]]);
    stepLife(s); expect(aliveAt(s)).toEqual([[11, 11], [11, 10], [11, 9]].sort());
    stepLife(s); expect(aliveAt(s)).toEqual([[10, 10], [11, 10], [12, 10]].sort());
    expect(s.generation).toBe(2);
  });
  it('moves a glider one cell diagonally every 4 generations', () => {
    const s = createLife(); const glider = [[1, 0], [2, 1], [0, 2], [1, 2], [2, 2]]; place(s, glider);
    for (let i = 0; i < 4; i++) stepLife(s);
    expect(aliveAt(s)).toEqual(glider.map(([x, y]) => [x + 1, y + 1]).sort());
  });
  it('wraps around the edges', () => {
    const s = createLife(); place(s, [[63, 10], [0, 10], [1, 10]]);
    stepLife(s); expect(aliveAt(s)).toEqual([[0, 9], [0, 10], [0, 11]].sort());
  });
  it('cools dead cells by 0.78 per generation and ages survivors', () => {
    const s = createLife(); place(s, [[5, 5]]); stepLife(s);
    expect(s.heat[cellIndex(s, 5, 5)]).toBeCloseTo(0.78);
    stepLife(s); expect(s.heat[cellIndex(s, 5, 5)]).toBeCloseTo(0.6084);
    const b = createLife(); place(b, [[0, 0], [1, 0], [0, 1], [1, 1]]); stepLife(b); stepLife(b);
    expect(b.age[cellIndex(b, 0, 0)]).toBe(2);
  });
});

describe('seeds', () => {
  it('seeds the glider gun and R-pentomino', () => {
    const s = createLife(); seedGliderGun(s);
    expect(s.population).toBe(41); expect(s.generation).toBe(0);
  });
  it('shuffles with the given density', () => {
    const s = createLife();
    shuffleLife(s, () => 0.1); expect(s.population).toBe(64 * 36);
    shuffleLife(s, () => 0.5); expect(s.population).toBe(0);
  });
  it('clears everything', () => {
    const s = createLife(); seedGliderGun(s); clearLife(s);
    expect(s.population).toBe(0); expect(s.generation).toBe(0);
  });
});
```

- [ ] **Step 2: Run to verify failure** — `npx vitest run src/lib/games/life.test.ts` → FAIL.
- [ ] **Step 3: Implement `src/lib/games/life.ts`** per Interfaces (rules and heat/age math exactly as `_step`).
- [ ] **Step 4: Run to verify pass** → PASS.
- [ ] **Step 5: Commit**

```bash
git add src/lib/games/life.ts src/lib/games/life.test.ts
git commit -m "feat: add Game of Life engine"
```

---

### Task 5: Minesweeper engine

**Files:**
- Create: `src/lib/games/minesweeper.ts`, `src/lib/games/minesweeper.test.ts`

**Interfaces:**
- Produces:
  - `MS_ROWS = 16`, `MS_COLS = 16`, `MS_MINES = 50`
  - `type Cell = { mine: boolean; flagged: boolean; revealed: boolean; adjacent: number }`, `type Board = Cell[][]`
  - `createEmptyBoard(rows: number, cols: number): Board`
  - `boardFromMines(rows: number, cols: number, mines: Array<[number, number]>): Board` (computes `adjacent`)
  - `placeMines(rows: number, cols: number, count: number, safe: [number, number], random = Math.random): Board` (no mine on `safe` or its 8 neighbours)
  - `reveal(board: Board, r: number, c: number): { board: Board; hitMine: boolean }` (iterative flood fill through `adjacent === 0`; flagged/revealed cells unchanged; never mutates input)
  - `toggleFlag(board: Board, r: number, c: number): Board` (no-op on revealed cells)
  - `revealMines(board: Board): Board`
  - `hasWon(board: Board): boolean` (every non-mine cell revealed)
  - `countFlags(board: Board): number`
  - `formatElapsed(ms: number): string` (`mm:ss.cc`)

- [ ] **Step 1: Write the failing tests** (`src/lib/games/minesweeper.test.ts`)

```ts
import { describe, expect, it } from 'vitest';
import { boardFromMines, formatElapsed, hasWon, placeMines, reveal, toggleFlag } from '~/lib/games/minesweeper';

const seeded = (seed: number) => () => ((seed = (seed * 1664525 + 1013904223) % 2 ** 32) / 2 ** 32);
const revealedCount = (b: ReturnType<typeof boardFromMines>) => b.flat().filter((c) => c.revealed).length;

describe('placeMines', () => {
  it('places exactly the requested mines and never on or around the first click', () => {
    for (let seed = 0; seed < 200; seed++) {
      const b = placeMines(16, 16, 50, [8, 8], seeded(seed));
      expect(b.flat().filter((c) => c.mine)).toHaveLength(50);
      for (let r = 7; r <= 9; r++) for (let c = 7; c <= 9; c++) expect(b[r][c].mine).toBe(false);
    }
  });
});

describe('reveal', () => {
  it('counts adjacent mines', () => {
    const b = boardFromMines(3, 3, [[0, 0]]);
    expect(b[1][1].adjacent).toBe(1); expect(b[2][2].adjacent).toBe(0);
  });
  it('flood-fills empty areas and stops at numbers', () => {
    const { board, hitMine } = reveal(boardFromMines(4, 4, [[3, 3]]), 0, 0);
    expect(hitMine).toBe(false); expect(revealedCount(board)).toBe(15); expect(hasWon(board)).toBe(true);
  });
  it('opens only the clicked cell when it has a number', () =>
    expect(revealedCount(reveal(boardFromMines(3, 3, [[0, 0]]), 1, 1).board)).toBe(1));
  it('reports a mine hit', () => expect(reveal(boardFromMines(2, 2, [[0, 0]]), 0, 0).hitMine).toBe(true));
  it('ignores flagged cells and does not mutate the input', () => {
    const flagged = toggleFlag(boardFromMines(2, 2, [[0, 0]]), 0, 0);
    const res = reveal(flagged, 0, 0);
    expect(res.hitMine).toBe(false); expect(res.board[0][0].revealed).toBe(false);
    expect(flagged[0][0].flagged).toBe(true);
  });
});

describe('toggleFlag', () => {
  it('does nothing on a revealed cell', () => {
    const opened = reveal(boardFromMines(3, 3, [[0, 0]]), 1, 1).board;
    expect(toggleFlag(opened, 1, 1)[1][1].flagged).toBe(false);
  });
});

describe('formatElapsed', () => {
  it('formats minutes, seconds and centiseconds', () => expect(formatElapsed(65_430)).toBe('01:05.43'));
});
```

- [ ] **Step 2: Run to verify failure** → FAIL.
- [ ] **Step 3: Implement `src/lib/games/minesweeper.ts`** per Interfaces. Copy-on-write: clone only the rows you change.
- [ ] **Step 4: Run to verify pass** → PASS.
- [ ] **Step 5: Commit**

```bash
git add src/lib/games/minesweeper.ts src/lib/games/minesweeper.test.ts
git commit -m "fix: safe first click and correct flood fill in minesweeper engine"
```

---

### Task 6: Snake engine

**Files:**
- Create: `src/lib/games/snake.ts`, `src/lib/games/snake.test.ts`

**Interfaces:**
- Produces:
  - `SNAKE_COLS = 20`, `SNAKE_ROWS = 20`, `SNAKE_TICK_MS = 100`
  - `type Point = { x: number; y: number }`, `type Direction = 'up' | 'down' | 'left' | 'right'`
  - `type SnakeState = { snake: Point[]; dir: Direction; lastMoved: Direction; apple: Point; score: number; over: boolean }`
  - `createSnake(): SnakeState` (snake `[{x:8,y:7},{x:8,y:8}]`, dir/lastMoved `up`, apple `{x:8,y:3}`)
  - `keyToDirection(key: string): Direction | null` (`ArrowUp|ArrowDown|ArrowLeft|ArrowRight` only)
  - `turn(s: SnakeState, d: Direction): SnakeState` (ignores the opposite of `s.lastMoved`; no-op when `over`)
  - `stepSnake(s: SnakeState, random = Math.random): SnakeState` (moves by `dir`, sets `lastMoved = dir`; wall or body hit → `over: true` with the snake unchanged; the tail cell counts as free unless the snake grows; eating → length +1, score +1, new apple on a free cell; no-op when `over`)

- [ ] **Step 1: Write the failing tests** (`src/lib/games/snake.test.ts`)

```ts
import { describe, expect, it } from 'vitest';
import { createSnake, keyToDirection, stepSnake, turn, type SnakeState } from '~/lib/games/snake';

const at = (over: Partial<SnakeState>): SnakeState => ({ ...createSnake(), ...over });

describe('turn', () => {
  it('ignores reversing', () => expect(turn(createSnake(), 'down').dir).toBe('up'));
  it('cannot reverse through two quick turns before a move', () =>
    expect(turn(turn(createSnake(), 'left'), 'down').dir).toBe('left'));
});

describe('stepSnake', () => {
  it('moves the head', () => {
    const s = stepSnake(createSnake());
    expect(s.snake).toEqual([{ x: 8, y: 6 }, { x: 8, y: 7 }]); expect(s.lastMoved).toBe('up');
  });
  it('grows and scores when eating, and spawns the apple off the snake', () => {
    const s = stepSnake(at({ apple: { x: 8, y: 6 } }), () => 0.43);
    expect(s.snake).toHaveLength(3); expect(s.score).toBe(1);
    expect(s.snake).not.toContainEqual(s.apple);
  });
  it('ends the game on a wall', () => {
    const s = stepSnake(at({ snake: [{ x: 4, y: 0 }, { x: 4, y: 1 }] }));
    expect(s.over).toBe(true); expect(s.snake[0]).toEqual({ x: 4, y: 0 });
  });
  it('ends the game on its own body', () => {
    const body = [{ x: 5, y: 5 }, { x: 6, y: 5 }, { x: 6, y: 4 }, { x: 5, y: 4 }, { x: 4, y: 4 }];
    expect(stepSnake(at({ snake: body, dir: 'up', lastMoved: 'left' })).over).toBe(true);
  });
  it('may move into the tail cell that is leaving', () => {
    const ring = [{ x: 5, y: 5 }, { x: 6, y: 5 }, { x: 6, y: 4 }, { x: 5, y: 4 }];
    expect(stepSnake(at({ snake: ring, dir: 'up', lastMoved: 'left' })).over).toBe(false);
  });
  it('does nothing after game over', () => {
    const over = at({ over: true });
    expect(stepSnake(over)).toEqual(over); expect(turn(over, 'left')).toEqual(over);
  });
});

describe('keyToDirection', () => {
  it('maps arrow keys only', () => {
    expect(keyToDirection('ArrowLeft')).toBe('left'); expect(keyToDirection('a')).toBeNull();
  });
});
```

- [ ] **Step 2: Run to verify failure** → FAIL.
- [ ] **Step 3: Implement `src/lib/games/snake.ts`** per Interfaces. Apple placement: pick a random cell from the free cells (`Math.floor(random() * free.length)`).
- [ ] **Step 4: Run to verify pass** → PASS.
- [ ] **Step 5: Commit**

```bash
git add src/lib/games/snake.ts src/lib/games/snake.test.ts
git commit -m "fix: prevent snake reversal and use key names in snake engine"
```

---

### Task 7: Design foundation — theme, shell, globals, 404; old UI removed

**Files:**
- Create: `src/lib/theme.ts`, `src/lib/theme.test.ts`, `src/lib/palette.ts`, `src/lib/palette.test.ts`, `src/content/site.ts`, `src/hooks/useTheme.tsx`, `src/hooks/usePointerVars.ts`, `src/components/layout/{SiteShell,Nav,Footer,ThemeToggle,Seo,RouteHeader}.tsx` + `.module.css` where needed, `src/pages/_document.tsx`
- Replace: `src/styles/globals.css`, `src/pages/_app.tsx`, `src/pages/404.tsx`, `src/pages/index.tsx` (shell with empty `<main id="top">` until Task 8), `public/site.webmanifest`
- Delete: everything under `src/components/` not created above, `src/contexts/`, old `src/hooks/*` (keep `useInterval.tsx`, typed: `useRef<() => void>()`), `src/utils/`, `src/server/`, `src/pages/{experience,skills,contact,gallery}/`, `src/pages/games/` (all), `src/pages/api/gallery/`, `tailwind.config.js`, `postcss.config.js`, `prettier.config.cjs`
- Modify: `package.json` (remove `tailwindcss`, `postcss`, `autoprefixer`, `prettier-plugin-tailwindcss`, `sass`, `@mui/material`, `@mui/icons-material`, `@emotion/react`, `@emotion/styled`, `react-hot-toast`, `@tanstack/react-query`, `class-variance-authority`), `tsconfig.json` (drop the `@ui/*` and `@components/*` paths)

**Interfaces:**
- Produces:
  - `type Theme = 'dark' | 'light'`; `resolveTheme(stored: string | null, prefersLight: boolean): Theme`; `THEME_STORAGE_KEY = 'theme'`; `THEME_SCRIPT: string` (inline script applying the same rule to `document.documentElement.classList`) — `src/lib/theme.ts`
  - `accentLut(theme: Theme): string[]` (64 `"r,g,b"` strings, port of `_palette` LUT, `Main.dc.html` 553–563) and `PALETTES: Record<Theme, { a1: number[]; a2: number[]; a3: number[]; base: string; baseA: number; hud: string; chip: string }>` with the RGB values from HANDOFF.md "Theme palettes" and `Main.dc.html` 564–570 — `src/lib/palette.ts`
  - `site = { name: 'Felipe Gorostiaga', role: 'Software Engineer & Fullstack Developer', email: 'fgorostiagabraun@gmail.com', linkedin: 'https://www.linkedin.com/in/felipe-gorostiaga/', github: 'https://github.com/FelipeGorostiaga', url: 'https://www.felipegorostiaga.com' } as const` — `src/content/site.ts`
  - `ThemeProvider({ children })`, `useTheme(): { theme: Theme; toggle(origin?: HTMLElement | null): void }` — `src/hooks/useTheme.tsx`
  - `usePointerVars(): { onMouseMove(e: React.MouseEvent<HTMLElement>): void }` — writes `--mx/--my` on `currentTarget`, `--x/--y` on `target.closest('.spot')` (port of `_move`, `Main.dc.html` 707–718) — `src/hooks/usePointerVars.ts`
  - `SiteShell({ variant: 'home' | 'route'; current?: 'library' | 'games'; showProjects?: boolean; children })`
  - `Nav({ variant, current?, showProjects? })`, `Footer({ variant })`, `ThemeToggle()`
  - `Seo({ title: string; description: string; path: string })`
  - `RouteHeader({ eyebrow: string; title: React.ReactNode; lead: string })`

- [ ] **Step 1: Write the failing tests**

```ts
// src/lib/theme.test.ts
import { describe, expect, it } from 'vitest';
import { resolveTheme } from '~/lib/theme';
describe('resolveTheme', () => {
  it('uses a valid stored value', () => { expect(resolveTheme('light', false)).toBe('light'); expect(resolveTheme('dark', true)).toBe('dark'); });
  it('falls back to the system preference, then dark', () => {
    expect(resolveTheme(null, true)).toBe('light'); expect(resolveTheme('blue', true)).toBe('light');
    expect(resolveTheme('blue', false)).toBe('dark'); expect(resolveTheme(null, false)).toBe('dark');
  });
});

// src/lib/palette.test.ts
import { describe, expect, it } from 'vitest';
import { accentLut } from '~/lib/palette';
describe('accentLut', () => {
  it('has 64 entries starting and ending on a1', () => {
    const dark = accentLut('dark');
    expect(dark).toHaveLength(64); expect(dark[0]).toBe('74,222,128'); expect(dark[63]).toBe('74,222,128');
    expect(accentLut('light')[0]).toBe('21,128,61');
  });
});
```

- [ ] **Step 2: Run to verify failure** — `npx vitest run src/lib/theme.test.ts src/lib/palette.test.ts` → FAIL.
- [ ] **Step 3: Implement `theme.ts` and `palette.ts`; run the tests** → PASS.

- [ ] **Step 4: Write `src/styles/globals.css`**

Port from `Main.dc.html` 13–157, `Library.dc.html` 13–73 and `Games.dc.html` 13–76:
- `.pf{…}` declarations → `:root`; `.pf.light{…}` → `:root.light`; drop every `.pf ` selector prefix. `body` gets `background: var(--bg)`, `color: var(--text)`, the font stack and smoothing from `.pf`. Route shells override `--blob-o` to `.42` (dark) / `.26` (light) via a `.route` class on the shell root.
- Global (shared by several components): base rules, `::view-transition-*`, `::selection`, `:focus-visible`, `.mono`, `.serif`, `.sr-only`, `.cursor-glow`, `.eyebrow` (+ `b`), `.chip`, `.pulse`, `.grad`, `.enter`, `.reveal` (inside its `@supports`), `.spot` (+ `::before`, `::after`, `:hover`, `.still`), `.btn`, `.btn-primary`, `.btn-ghost`, `.tag`, `.in`, `.lbl`, `.stat`, the Minesweeper cell family `.ms`, `.ms.c`, `.ms.f`, `.ms.r`, `.n1`–`.n3` (`Games.dc.html` 64–68; used by both the preview and the game), every keyframe, the reduced-motion rule. `.spot.still:hover { translate: none }` — the contact form and the Life panel use `spot still` (they glow but never lift).
- Everything else goes into the CSS Module of the component that uses it (Tasks 8–13).
- Theme toggle icons: `.icon-sun` visible by default, `.icon-moon` visible under `:root.light`.

- [ ] **Step 5: Write `_document.tsx`**

`<Html lang="en" className="dark">`; in `<Head>`: `<script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />` first; Google Fonts `preconnect` to `https://fonts.googleapis.com` and `https://fonts.gstatic.com` (crossOrigin) and the stylesheet `https://fonts.googleapis.com/css2?family=Geist:wght@300..800&family=Geist+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&display=swap`; the favicon links from the old `pages/index.tsx` head; `<meta name="theme-color" content="#060807">`. `public/site.webmanifest`: name `Felipe Gorostiaga`, short_name `Felipe`, `theme_color`/`background_color` `#060807`.

- [ ] **Step 6: Write `useTheme.tsx` and `usePointerVars.ts`**

`ThemeProvider` starts at `'dark'`, reads the `<html>` class in `useEffect`. `toggle(origin)`: next theme; apply = set `<html>` class + `localStorage[THEME_STORAGE_KEY]` + state; with `document.startViewTransition` and no reduced motion, run apply inside the transition and animate `clipPath` from `circle(0px at cx cy)` to `circle(rad at cx cy)` on `::view-transition-new(root)`, 700 ms, `cubic-bezier(.65,0,.35,1)` (port of `_toggle`, `Main.dc.html` 738–756); otherwise apply instantly.

- [ ] **Step 7: Write the layout components**

- `SiteShell`: root `<div>` with class `shell` (+ `route` for the route variant), `onMouseMove` from `usePointerVars`, `<div class="cursor-glow" aria-hidden>`, route-variant aurora (two blobs, `Library.dc.html` 22–27 / 78), `Nav`, `children`, `Footer`.
- `Nav` home variant: markup `Main.dc.html` 163–181 (brand → `#top`; links `#experience`, `#projects` only when `showProjects`, `#skills`, `#contact`; separator; `/library` "Library ↗", `/games` "Games ↗"; `ThemeToggle`). Route variant: `Library.dc.html` 80–94 (brand → `/`; "← Home" `/`, Library, Games; `aria-current="page"` + `.on` on `current`). Use `next/link` for routes.
- `Footer` home variant: `Main.dc.html` 466–476 with `site.*` links and `new Date().getFullYear()`; route variant: `Library.dc.html` 180–185.
- `ThemeToggle`: `<button class="theme-btn" aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>` containing both SVGs (`Main.dc.html` 177–178) with `icon-sun` / `icon-moon` classes; `onClick={(e) => toggle(e.currentTarget)}`.
- `Seo`: `<Head>` with `<title>`, `description`, `<link rel="canonical" href={site.url + path}>`, `og:title`, `og:description`, `og:url`, `og:type=website`, `og:image={site.url + '/felipe-portrait.jpg'}`, `twitter:card=summary`.
- `RouteHeader`: `Library.dc.html` 97–103 structure (eyebrow with `<b>/</b>`, H1 route size, lead paragraph).

- [ ] **Step 8: Replace `_app`, `404`, `index`; delete the old UI; remove style dependencies**

`_app`: `import '~/styles/globals.css'`; `<ThemeProvider><Component {...pageProps} /></ThemeProvider>`. `404`: `SiteShell` route variant + `RouteHeader` (eyebrow `404`, title `Page not <span class="serif grad">found</span>`, lead `That page doesn't exist — it may have moved.`) + `<Link className="btn btn-primary" href="/">Back home</Link>` + `Seo`. `index`: `SiteShell variant="home"` with `<main id="top" />` (filled in Tasks 8–10). Copy `felipe-portrait.jpg` from the handoff zip (`C:\Users\Felipe\Downloads\portfolio-design-handoff.zip`, `assets/felipe-portrait.jpg`) to `public/`. Delete the files listed above; `npm uninstall` the style packages.

- [ ] **Step 9: Verify**

Run: `npx tsc --noEmit && npm test && SKIP_ENV_VALIDATION=1 npx next build` → pass; build lists only `/`, `/404`, `/api/contact`. Start `npx next dev` and in the built-in browser check `/does-not-exist`: dark by default; toggle → circle reveal → light; reload → stays light with no dark flash; set `localStorage.theme = 'blue'` + reload → follows system; focus ring visible on Tab; no console errors or hydration warnings.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat: add design foundation (tokens, theme, shell) and remove the old UI"
```

---

### Task 8: Home hero and interactive field

**Files:**
- Create: `src/components/home/Hero.tsx`, `Hero.module.css`, `src/components/home/HeroField.tsx`
- Modify: `src/pages/index.tsx`

**Interfaces:**
- Consumes: `accentLut`, `PALETTES` (Task 7), `useTheme` (Task 7), `site` (Task 7)
- Produces: `Hero()`; `HeroField({ intensity = 1, spacing = 30 }: { intensity?: number; spacing?: number })`

- [ ] **Step 1: Write `Hero`** — markup `Main.dc.html` 183–216 (section `id="top"`, aurora three blobs, `<HeroField />`, fade, chip, name with `.line`/`.enter-up` and `.grad`, rotating roles with `.sr-only` list, bio, CTAs `#contact` / `#experience`, portrait `/felipe-portrait.jpg` 340px with `.ring`/`.ring.soft`, hero-meta corners, scroll cue). Section-only rules (`.aurora`, `.blob`, `.b1-3`, `.field`, `.hero-fade`, `.line`, `.enter-up`, `.roles`, `.role-word`, `.ring`, `.mouse`, `.wheel`, `.hero-meta`, `.kbd`) go in `Hero.module.css`. Section uses `margin-top: -74px` so it sits under the sticky nav.
- [ ] **Step 2: Write `HeroField`** — client-only canvas port of `Main.dc.html` 480–736: `_boot`/`_resize` (DPR ≤ 2, `ResizeObserver`), `_build` (grid from `spacing`, min 14), `_frame` (forces, springs, ripples, sweep, lens, mesh, dots, ripple rings, HUD) with `accentLut(theme)` / `PALETTES[theme]` (recomputed when `theme` changes), ghost pointer after 2.6 s idle. Pointer: `pointermove` on `window` (inside test against the canvas rect); `pointerdown` on `canvas.parentElement` ignoring targets inside `a, button`; max 5 ripples. Skip frames while `document.hidden`; under reduced motion draw one frame and no loop; cancel rAF, disconnect observer and remove listeners on unmount.
- [ ] **Step 3: Render in `index.tsx`** — `<Seo title="Felipe Gorostiaga — Software Engineer" description="Felipe Gorostiaga, software engineer and fullstack developer: experience, skills, side projects and a few games built from scratch." path="/" />`, `<SiteShell variant="home"><Hero /></SiteShell>`.
- [ ] **Step 4: Verify in the browser** (`npx next dev`, `/`): field bends under the pointer, click sends a ripple, clicking "Let's talk" does not; idle 3 s → ghost pointer drifts; toggle theme → palette switches; 375px width → hero stacks, corner meta hidden; emulate reduced motion → static frame, no role animation; no console errors. `npx tsc --noEmit && npm test && SKIP_ENV_VALIDATION=1 npx next build` pass.
- [ ] **Step 5: Commit** — `git add -A && git commit -m "feat: add home hero with interactive field"`

---

### Task 9: Home content sections — Experience, Projects, Skills, Off the clock

**Files:**
- Create: `src/lib/dates.ts`, `src/lib/dates.test.ts`, `src/content/experience.ts`, `src/content/projects.ts`, `src/content/projects.test.ts`, `src/content/skills.ts`, `src/components/home/{Experience,Projects,Skills,OffTheClock}.tsx` + `.module.css`
- Modify: `src/pages/index.tsx`

**Interfaces:**
- Produces:
  - `formatRange(start: string, end: string | null): string` — `'YYYY-MM'` inputs, output `'Feb 2024 — Now'` / `'Mar 2023 — Feb 2024'` (em dash, English short months, no `Date` parsing) — `src/lib/dates.ts`
  - `type Job = { role: string; company: string; companyUrl: string; logo?: string; mark: string; start: string; end: string | null; summary: string; bullets: string[]; tags: string[] }`, `jobs: Job[]` (spec §4, newest start first) — `src/content/experience.ts`
  - `type Project = { name: string; url?: string; domain?: string; year?: string; description?: string; stack: string[]; screenshot?: string }`, `projects: Project[]`, `isComplete(p: Project): boolean` (url + description + screenshot), `visibleProjects: Project[]` — `src/content/projects.ts`
  - `type Skill = { number: string; category: string; symbol: string; name: string; description: string }`, `skills: Skill[]` (8 tiles, `Main.dc.html` 351–398) — `src/content/skills.ts`

- [ ] **Step 1: Write the failing tests**

```ts
// src/lib/dates.test.ts
import { expect, it } from 'vitest';
import { formatRange } from '~/lib/dates';
it('formats open and closed ranges', () => {
  expect(formatRange('2024-02', null)).toBe('Feb 2024 — Now');
  expect(formatRange('2023-03', '2024-02')).toBe('Mar 2023 — Feb 2024');
});

// src/content/projects.test.ts
import { expect, it } from 'vitest';
import { isComplete, visibleProjects } from '~/content/projects';
it('needs url, description and screenshot', () => {
  expect(isComplete({ name: 'X', stack: [], url: 'https://x.dev', description: 'd' })).toBe(false);
  expect(isComplete({ name: 'X', stack: [], url: 'https://x.dev', description: 'd', screenshot: '/x.png' })).toBe(true);
});
it('hides every project at launch', () => expect(visibleProjects).toEqual([]));
```

- [ ] **Step 2: Run to verify failure** → FAIL. **Step 3: Implement** `dates.ts` and the three content files (copy from spec §4 and `Main.dc.html`; `mark` = the letter tile text: `hu`, `sc`, `bg`, `bg`, `do`, `bg`, `by`). **Step 4: Run** → PASS.
- [ ] **Step 5: Write the section components**
  - `Experience`: `Main.dc.html` 218–283; one `<article class="reveal">` per job; `.tl-dot.live` + "Current" badge when `end === null`; `.mark` tile shows `<img src={logo} alt="" />` (object-fit contain, 40px) when `logo` is set, else `mark` text; company name links to `companyUrl` (`target="_blank" rel="noopener noreferrer"`).
  - `Projects`: returns `null` when `visibleProjects` is empty; otherwise `Main.dc.html` 285–340 with alternating `.flip`, real screenshot `<img>` in `.viewport`, "Visit {name} ↗" to `url`.
  - `Skills`: `Main.dc.html` 342–400 from `skills`.
  - `OffTheClock`: `Main.dc.html` 402–432 with `next/link` to `/library` and `/games`.
- [ ] **Step 6: Render in `index.tsx`** after `Hero`; pass `showProjects={visibleProjects.length > 0}` to `SiteShell`.
- [ ] **Step 7: Verify in the browser**: 7 jobs in the spec's order and dates (Galicia Senior `Mar 2023 — Feb 2024`), two "Current" badges; no Projects section and no "Projects" nav link; 8 skill tiles; spotlight border follows the pointer on cards; scroll reveal; 375px single column. `npx tsc --noEmit && npm test && SKIP_ENV_VALIDATION=1 npx next build` pass.
- [ ] **Step 8: Commit** — `git add -A && git commit -m "feat: add experience, projects, skills and off-the-clock sections"`

---

### Task 10: Home contact section

**Files:**
- Create: `src/components/home/Contact.tsx`, `Contact.module.css`
- Modify: `src/pages/index.tsx`

**Interfaces:**
- Consumes: `contactSchema`, `CONTACT_LIMITS`, `type ContactInput` (Task 2); `site` (Task 7)
- Produces: `Contact()`

- [ ] **Step 1: Write `Contact`** — markup `Main.dc.html` 434–464 (left: eyebrow, H2 with `.touch` "touch.", copy, row links to `mailto:{site.email}`, LinkedIn, GitHub showing `linkedin.com/in/felipe-gorostiaga` and `github.com/FelipeGorostiaga`; right: `<form className="spot still reveal" noValidate onSubmit>`). Fields named `firstName`, `lastName`, `email`, `phone` (`type="tel"`), `message` (`maxLength={300}`, live `{n} / 300`), plus honeypot `company` in a visually hidden wrapper (`aria-hidden`, `tabIndex={-1}`, `autoComplete="off"`). State: `values`, `fieldErrors`, `status: 'idle' | 'sending' | 'sent' | 'error'`. Submit: `contactSchema.safeParse(values)` → show the first message per field under the input (`aria-invalid`, `aria-describedby`); if valid POST JSON to `/api/contact`; `201`/`200` → `sent` and clear values; `400` → show `fieldErrors` from the response; anything else → `error`, values kept. Button disabled while `sending` (label `Sending…`). Status line (`role="status"`): sent `Thanks — I'll get back to you soon.`; error `Couldn't send it — email me at {site.email}.`; idle `I read every message.`
- [ ] **Step 2: Render in `index.tsx`** after `OffTheClock`.
- [ ] **Step 3: Verify in the browser** (dev, no Gmail vars): submit empty → field errors, nothing sent; valid submit → "Thanks…", terminal shows `[contact] dev mail`; stop the dev server's network (DevTools offline) and submit → error line, values kept; Enter in a field submits; button disabled while sending. Build/test/tsc pass.
- [ ] **Step 4: Commit** — `git add -A && git commit -m "fix: rebuild contact form with validation and no data loss on failure"`

---

### Task 11: Library page

**Files:**
- Create: `src/pages/library.tsx`, `src/components/library/{LibraryTabs,LibraryControls,BookCard,QuoteCard}.tsx` + `Library.module.css`

**Interfaces:**
- Consumes: Task 3 exports; `SiteShell`, `RouteHeader`, `Seo` (Task 7)
- Produces: `getStaticProps(): { props: { books: RatedItem[]; movies: RatedItem[]; quotes: Quote[] } }`; `COVER_PAIRS: Array<[string, string]>` = `[['#166534','#052E16'],['#27272A','#09090B'],['#15803D','#14532D'],['#3F3F46','#18181B'],['#065F46','#022C22'],['#44403C','#0C0A09']]`, cover = `COVER_PAIRS[(item.id - 1) % 6]`

- [ ] **Step 1: Write the page** — `getStaticProps` imports `data/*.json` and maps with `fromBook` / `fromMovie`. Tab from `parseTab(router.query.tab)`; changing tab → `router.replace({ query: tab === 'books' ? {} : { tab } }, undefined, { shallow: true, scroll: false })`. State: `query`, `sort` (`'rating'`), `order` (`'desc'`). Header `RouteHeader` (eyebrow `library`, title `The <span class="serif grad">library</span>`, lead from `Library.dc.html` 102). Controls `Library.dc.html` 105–129: tabs with `role="tablist"`/`role="tab"`/`aria-selected`, `.tab-ind` translated by `index × 116px`; search `type="search"` placeholder `Search by title or author…` (Quotes: `Search quotes or authors…`); sort select and order button disabled on Quotes; order label from `Library.dc.html` 292. Count label `12 books` / `1 movie` / `64 quotes` (singular at 1). Empty state `Nothing matches that search yet.` `<Seo title="Library — Felipe Gorostiaga" description="Books, movies and quotes that shaped how I think — rated honestly, out of ten." path="/library" />`; shell `SiteShell variant="route" current="library"`.
- [ ] **Step 2: Cards** — `BookCard({ item }: { item: RatedItem })`: `Library.dc.html` 136–150 (cover with `COVER_PAIRS`, creator in mono caps, title in serif; `My rating` + star + score; meter width `score × 10%`). `QuoteCard({ quote }: { quote: Quote })`: `Library.dc.html` 161–165; blockquote class switches to the ~22px variant when `quote.text.length > LONG_QUOTE`; caption `— {author}` plus `, {reference}` when present. Grids `repeat(auto-fill, minmax(340px, 1fr))`.
- [ ] **Step 3: Verify in the browser**: `/library` shows 12 books sorted by rating (Zarathustra first); search `  nietzsche ` → 6; Year/Title/order toggle work; Movies tab → URL `?tab=movies`, 1 movie with director; Quotes tab → 64 quotes, sort disabled, search matches a source; reload keeps the tab; Tab/Shift-Tab and Enter/Space on tabs; 375px layout. Build/test/tsc pass.
- [ ] **Step 4: Commit** — `git add -A && git commit -m "feat: add static library page with search and sort"`

---

### Task 12: `/games` page with live Game of Life

**Files:**
- Create: `src/pages/games/index.tsx`, `src/components/games/{LifePanel,MinesweeperPreview,SnakePreview}.tsx` + `Games.module.css`

**Interfaces:**
- Consumes: Task 4 exports; `accentLut`, `PALETTES`, `useTheme`, `SiteShell`, `RouteHeader`, `Seo` (Task 7)
- Produces: `LifePanel()`, `MinesweeperPreview()`, `SnakePreview()`

- [ ] **Step 1: `LifePanel`** — markup `Games.dc.html` 108–140; canvas loop port of 199–241 and `_draw` 319–353 using a `LifeState` in a ref, ticking every 110 ms while running; `generation`/`population` mirrored into React state on each tick (formatted with `toLocaleString('en-US')`). Pointer events on the canvas: `pointerdown` (capture pointer, paint value = opposite of the first cell), `pointermove` (hover outline; paint while down), `pointerup`/`pointerleave`. Buttons: Pause/Play, Step (pauses), Shuffle, Glider gun (resumes), Clear (pauses). Starts with `seedGliderGun`; starts paused under reduced motion. Status badge `Live simulation` / `Paused`.
- [ ] **Step 2: Previews** — `MinesweeperPreview` from `mineRows` (`Games.dc.html` 439–448) and `SnakePreview` from `body`/`apple` (450–461), static markup inside the cards of `Games.dc.html` 143–162, each with `<Link className="btn btn-ghost" href="/games/minesweeper">Play Minesweeper →</Link>` / `/games/snake`.
- [ ] **Step 3: Page** — `SiteShell variant="route" current="games"`, `RouteHeader` (eyebrow `games`, title `Play <span class="serif grad">something</span>`, lead `Games.dc.html` 105), `Seo`.
- [ ] **Step 4: Verify in the browser**: gun fires gliders; draw by click-drag (and touch emulation); Step/Shuffle/Glider gun/Clear and counters behave; theme switch recolors; hidden tab pauses work (no CPU while hidden); both Play links reach their routes (404 until Task 13). Build/test/tsc pass.
- [ ] **Step 5: Commit** — `git add -A && git commit -m "feat: add games page with live Game of Life"`

---

### Task 13: Minesweeper and Snake pages in the new look

**Files:**
- Create: `src/pages/games/minesweeper.tsx`, `src/pages/games/snake.tsx`, `src/components/games/{Minesweeper,Snake}.tsx` + `Minesweeper.module.css`, `Snake.module.css`

**Interfaces:**
- Consumes: Task 5 and Task 6 exports; `useInterval` (kept hook); `accentLut`, `PALETTES`, `useTheme`, `SiteShell`, `RouteHeader`, `Seo` (Task 7)
- Produces: `Minesweeper()`, `Snake()`

- [ ] **Step 1: `Minesweeper`** — state `{ board, status: 'ready' | 'playing' | 'won' | 'lost', startedAt: number | null, endedAt: number | null }`. First reveal: `placeMines(MS_ROWS, MS_COLS, MS_MINES, [r, c])` then `reveal`, start the clock. Reveal hitting a mine → `revealMines`, `lost`. After each reveal `hasWon` → `won`. Right click (`onContextMenu`, `preventDefault`) → `toggleFlag` (only while not finished). Moves are ignored once finished. HUD (`.stat` style): flags left `MS_MINES - countFlags(board)`, "New game" button, timer `formatElapsed((endedAt ?? now) - startedAt)` re-rendered every 100 ms while playing. Cells are `<button>`s with the design's `.ms` styles (`Games.dc.html` 64–68): covered `.c`, flagged `.f`, revealed `.r` + `.n1/.n2/.n3` (4+ use `.n3`), mine = `#F43F5E` dot; `aria-label` like `Row 3, column 5, covered`. Cell size `--cell: 18px`, `24px` from 480px, `32px` from 640px. Finished panel: `.spot` card with `Game over` / `Cleared in {time}` and a `btn btn-primary` "Play again".
- [ ] **Step 2: `Snake`** — `SnakeState` in state; `keydown` on `window` while mounted: arrow keys `preventDefault` + `turn` (first arrow starts the loop); `useInterval(() => setState(stepSnake), running ? SNAKE_TICK_MS : null)`. Canvas 500×500 (25px cells) drawn on every state change; the board background is CSS on the `<canvas>` element (`background: var(--surface)`, `border: 1px solid var(--line-2)`, radius 16px), the canvas only draws faint grid lines (`PALETTES[theme].hud` at 0.06) and the pieces: body gradient `PALETTES[theme].a1`→`a2` with fading opacity, head a3, apple `#F43F5E` circle. Score readout and a game-over `.spot` panel with "Play again" (`createSnake()`). Below 640px (`@media (max-width: 639px)`) the board is hidden and `Snake needs a keyboard — try it on a larger screen.` shows instead.
- [ ] **Step 3: Pages** — both `SiteShell variant="route" current="games"` + `RouteHeader` (eyebrow `games`, titles `Mine<span class="serif grad">sweeper</span>` and `<span class="serif grad">Snake</span>`, leads from `Games.dc.html` 149 and 159) + `Seo`.
- [ ] **Step 4: Verify in the browser**: first click never loses and opens an area; flags count down; right-click on a revealed cell does nothing; after a loss, left and right clicks on the board change nothing; win and loss panels; Play again resets; timer counts up and stops. Snake: arrows steer, quick Left+Down while moving up does not kill the snake, apples grow it, wall/self end the game; theme switch recolors; 375px shows the keyboard message. Build/test/tsc pass.
- [ ] **Step 5: Commit** — `git add -A && git commit -m "feat: restyle minesweeper and snake into the new design"`

---

### Task 14: Cleanup, docs and full verification

**Files:**
- Delete from `public/`: `apple.svg`, `explosion.png`, `explosion.svg`, `flag.png`, `game-of-life.png`, `logo.png`, `pfp-smiling.jpg`, `smile.png`, `snake.svg`, `stopwatch.png`, and in `public/logos/` everything except `byma-logo.png`, `dome-logo.svg`, `galicia-logo.png`, `scale-logo.svg`
- Modify: `README.md`

- [ ] **Step 1: Delete the assets**, then confirm nothing references them: `grep -rn "pfp-smiling\|explosion\|stopwatch\|smile.png\|game-of-life.png\|logos/" src` → only the four kept logos appear.
- [ ] **Step 2: Rewrite `README.md`** — features (home, library, games), stack (Next.js 13 Pages Router, TypeScript, CSS Modules, zod, nodemailer, Vitest), setup (`npm ci`, copy `.env.example` to `.env.local`, `npm run dev`, `npm test`, `npm run build`); remove the T3/tRPC/Prisma/PlanetScale/Tailwind claims.
- [ ] **Step 3: Full verification**
  - `npx tsc --noEmit`, `npx next lint`, `npm test`, `SKIP_ENV_VALIDATION=1 npx next build` → no errors.
  - `SKIP_ENV_VALIDATION=1 npx next start` and: `curl -sI http://localhost:3000/` shows the four security headers; `curl -s -o /dev/null -w '%{http_code}' 'http://localhost:3000/_next/image?url=%2Ffelipe-portrait.jpg&w=64&q=75'` is not `200`; `/experience`, `/gallery/books`, `/admin`, `/api/gallery/movies` → `404`; `curl -s -X GET http://localhost:3000/api/contact` → `405`.
  - Built-in browser on every route (`/`, `/library`, `/games`, `/games/minesweeper`, `/games/snake`, a 404): dark and light, 375px and desktop, reduced motion, keyboard focus; theme survives reload without a flash; no console errors.
  - Screenshots of each route (dark desktop, light desktop, dark 375px) saved for the PR.
  - `npm audit --omit=dev` → write each remaining advisory with the reason it does not apply into the PR notes.
- [ ] **Step 4: Commit** — `git add -A && git commit -m "chore: remove unused assets and update README"`
- [ ] **Step 5: Hand off** — report results and screenshots to Felipe; push and open the PR (`GH_TOKEN=$(gh auth token --user FelipeGorostiaga)`) only after his OK. PR description: summary, bug fixes, security changes + remaining advisories, Felipe's actions from spec §"Felipe's actions", screenshots, and the attribution line.
