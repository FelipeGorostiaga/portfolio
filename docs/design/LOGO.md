# Logo + favicon handoff: the `fg_` terminal tile

This replaces the old gradient "FG" mark described in `HANDOFF.md`. Use it in the navbar on every page and as the site favicon / app icon.

## The mark

- A dark rounded square, the same in **both** light and dark themes (it's the brand tile, identical to the favicon).
  - Fill `#060807`, plus a 1px inner edge of white at 14% opacity so it holds up on dark backgrounds.
  - Corner radius is about 28% of the tile size: 9px on a 32px tile.
- The text "fg" in **Geist Bold** (700), color `#F2F5F3`, letter-spacing `-0.06em`.
- A green underscore cursor (`#4ADE80`) right after the "g".
  - Size: 0.46em wide × 0.12em tall, fully rounded ends.
  - Position: 0.07em gap after the "g", sitting 0.03em below the baseline.
- **Navbar only:** the cursor blinks (1.1s, `steps(1)`, so it's on/off with no fade). With `prefers-reduced-motion`, it stays on and doesn't blink. The favicon and app icons are static.

## Files (`brand/`)

| File | Use | Where it goes |
|---|---|---|
| `favicon.svg` | Main favicon (vector, text outlined, no font needed) | `public/favicon.svg` |
| `favicon.ico` | Fallback favicon (16, 32, 48 px inside) | `public/favicon.ico` |
| `favicon-16.png`, `favicon-32.png`, `favicon-48.png` | PNG fallbacks, if you need them | `public/` |
| `apple-touch-icon.png` | iOS home screen (180 px, full-bleed square: iOS rounds the corners itself) | `public/apple-touch-icon.png` |
| `icon-192.png`, `icon-512.png` | Web app manifest icons (rounded tile) | `public/` |
| `icon-maskable-512.png` | Android maskable icon (full-bleed, mark inside the safe zone) | `public/` |
| `site.webmanifest` | Manifest that references the icons above | `public/site.webmanifest` |
| `logo-tile.svg` | Static SVG of the tile, for places where you can't use the HTML/CSS version (OG images, README, etc.) | anywhere |

### Head tags (plain HTML / any framework)

```html
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#060807">
```

### Next.js App Router alternative

Use the file conventions instead of `<link>` tags:
- `app/favicon.ico` ← `favicon.ico`
- `app/icon.svg` ← `favicon.svg`
- `app/apple-icon.png` ← `apple-touch-icon.png`
- `app/manifest.webmanifest` ← `site.webmanifest` (or export it from `app/manifest.ts`)
- `themeColor: '#060807'` in the `viewport` export

Delete any old favicon files so they don't override the new ones.

## Navbar component

Build the navbar version in HTML/CSS rather than with the SVG, so the cursor can blink and the text stays sharp at any zoom. Geist is already loaded for the site.

```tsx
export function LogoTile() {
  return (
    <span className="logo-tile" aria-hidden="true">
      fg<span className="logo-cur" />
    </span>
  );
}

// In the nav, replacing the old "FG" gradient mark:
<a href="/" className="brand" aria-label="Felipe Gorostiaga, home">
  <LogoTile />
  <span>Felipe Gorostiaga</span>
</a>
```

```css
.logo-tile {
  display: inline-block;
  flex: 0 0 auto;
  width: 32px;
  height: 32px;
  box-sizing: border-box;
  border-radius: 9px;
  text-align: center;
  font-family: 'Geist', system-ui, sans-serif;
  font-size: 14px;
  line-height: 31px;
  font-weight: 700;
  letter-spacing: -0.06em;
  white-space: nowrap;
  color: #F2F5F3;               /* fixed: does NOT change with theme */
  background: #060807;          /* fixed: does NOT change with theme */
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.14);
}
.logo-cur {
  display: inline-block;
  width: .46em;
  height: .12em;
  border-radius: .06em;
  margin-left: .07em;
  vertical-align: -0.03em;
  background: #4ADE80;          /* fixed green, same in light mode */
  animation: logo-blink 1.1s steps(1) infinite;
}
@keyframes logo-blink { 50% { opacity: 0; } }
@media (prefers-reduced-motion: reduce) { .logo-cur { animation: none; } }
```

To scale it, change `width`, `height`, `line-height` (height − 1px), `font-size` (≈ 0.44 × size) and `border-radius` (≈ 0.28 × size) together. The cursor scales with the font size.

## Done when
- The nav on `/`, `/library` and `/games` shows the `fg_` tile with a blinking green cursor, in both themes.
- The browser tab shows the `fg_` favicon. Hard-refresh or use a private window to check, because favicons cache aggressively.
- The old "FG" gradient mark and the old favicon files are gone.
