/**
 * Where the hero field's "ghost pointer" drifts while nobody is moving the real one (t in seconds).
 * A wide hero follows the design's Lissajous path. A taller-than-wide hero means the text and the
 * portrait are stacked: the glow then circles the portrait (lower part) instead of sitting under
 * the bio, where it hurt readability on phones.
 */
export function idleTarget(t: number, w: number, h: number): { x: number; y: number } {
  if (h > w) {
    return {
      x: w * (0.5 + 0.28 * Math.sin(t * 0.37)),
      y: h * (0.78 + 0.08 * Math.sin(t * 0.61 + 1.1)),
    };
  }
  return {
    x: w * (0.56 + 0.3 * Math.sin(t * 0.37)),
    y: h * (0.46 + 0.25 * Math.sin(t * 0.61 + 1.1)),
  };
}
