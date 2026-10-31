import { describe, expect, it } from 'vitest';
import { resolveTheme } from '~/lib/theme';

describe('resolveTheme', () => {
  it('uses a valid stored value', () => {
    expect(resolveTheme('light', false)).toBe('light');
    expect(resolveTheme('dark', true)).toBe('dark');
  });

  it('falls back to the system preference, then dark', () => {
    expect(resolveTheme(null, true)).toBe('light');
    expect(resolveTheme('blue', true)).toBe('light');
    expect(resolveTheme('blue', false)).toBe('dark');
    expect(resolveTheme(null, false)).toBe('dark');
  });
});
