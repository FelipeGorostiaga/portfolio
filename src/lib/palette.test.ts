import { describe, expect, it } from 'vitest';
import { accentLut } from '~/lib/palette';

describe('accentLut', () => {
  it('has 64 entries starting and ending on a1', () => {
    const dark = accentLut('dark');
    expect(dark).toHaveLength(64);
    expect(dark[0]).toBe('74,222,128');
    expect(dark[63]).toBe('74,222,128');
    expect(accentLut('light')[0]).toBe('21,128,61');
  });
});
