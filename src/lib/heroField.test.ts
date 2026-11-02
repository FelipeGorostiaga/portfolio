import { describe, expect, it } from 'vitest';
import { idleTarget } from '~/lib/heroField';

const times = Array.from({ length: 400 }, (_, i) => i * 0.25);

describe('idleTarget', () => {
  it('keeps the design path on a wide hero (text and portrait side by side)', () => {
    const w = 1440;
    const h = 900;
    for (const t of times) {
      const { x, y } = idleTarget(t, w, h);
      expect(x).toBeCloseTo(w * (0.56 + 0.3 * Math.sin(t * 0.37)));
      expect(y).toBeCloseTo(h * (0.46 + 0.25 * Math.sin(t * 0.61 + 1.1)));
    }
  });

  it('drifts below the text on a tall, stacked hero', () => {
    // 375px phone: the text ends at 56% of the hero's height, the portrait spans 61-90%.
    const w = 375;
    const h = 1158;
    for (const t of times) {
      const { x, y } = idleTarget(t, w, h);
      expect(y).toBeGreaterThanOrEqual(h * 0.7);
      expect(y).toBeLessThanOrEqual(h * 0.86);
      expect(x).toBeGreaterThanOrEqual(w * 0.2);
      expect(x).toBeLessThanOrEqual(w * 0.8);
    }
  });
});
