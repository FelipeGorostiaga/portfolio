import { type Theme } from '~/lib/theme';

type Rgb = [number, number, number];

type Palette = {
  a1: Rgb;
  a2: Rgb;
  a3: Rgb;
  /** Idle dot color ("r,g,b") and its alpha. */
  base: string;
  baseA: number;
  /** HUD strokes. */
  hud: string;
};

// Canvas colors from docs/design/HANDOFF.md ("Theme palettes for the canvas").
export const PALETTES: Record<Theme, Palette> = {
  dark: {
    a1: [74, 222, 128],
    a2: [217, 249, 157],
    a3: [34, 197, 94],
    base: '150,160,154',
    baseA: 0.28,
    hud: '232,240,235',
  },
  light: {
    a1: [21, 128, 61],
    a2: [77, 124, 15],
    a3: [22, 101, 52],
    base: '60,68,63',
    baseA: 0.24,
    hud: '10,13,11',
  },
};

const lutCache = new Map<Theme, string[]>();

/** 64-step a1 → a2 → a3 → a2 → a1 ramp as "r,g,b" strings (port of the design's `_palette`). */
export function accentLut(theme: Theme): string[] {
  const cached = lutCache.get(theme);
  if (cached) return cached;
  const { a1, a2, a3 } = PALETTES[theme];
  const lut: string[] = [];
  for (let i = 0; i < 64; i++) {
    const tri = 1 - Math.abs((2 * i) / 63 - 1);
    const [from, to, t] = tri < 0.5 ? [a1, a2, tri * 2] : [a2, a3, (tri - 0.5) * 2];
    lut.push(from.map((channel, k) => Math.round(channel + (to[k] - channel) * t)).join(','));
  }
  lutCache.set(theme, lut);
  return lut;
}
