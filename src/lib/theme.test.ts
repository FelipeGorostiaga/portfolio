import { describe, expect, it } from 'vitest';
import { resolveTheme, THEME_SCRIPT } from '~/lib/theme';

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

const BLOCKED = Symbol('storage throws');

/** Runs the inline <head> script against fake browser globals and returns the <html> classes. */
function runThemeScript(stored: string | null | typeof BLOCKED, prefersLight: boolean): string[] {
  const classes = new Set(['dark']); // what _document renders
  const localStorage = {
    getItem: () => {
      if (stored === BLOCKED) throw new Error('SecurityError: storage is disabled');
      return stored;
    },
  };
  const window = { matchMedia: (query: string) => ({ matches: prefersLight && query.includes('light') }) };
  const document = {
    documentElement: {
      classList: {
        add: (...names: string[]) => names.forEach((n) => classes.add(n)),
        remove: (...names: string[]) => names.forEach((n) => classes.delete(n)),
      },
    },
  };
  new Function('localStorage', 'window', 'document', THEME_SCRIPT)(localStorage, window, document);
  return [...classes];
}

describe('THEME_SCRIPT', () => {
  const cases: [string | null | typeof BLOCKED, boolean][] = [];
  for (const stored of [null, 'light', 'dark', 'blue', BLOCKED] as const) {
    for (const prefersLight of [true, false]) cases.push([stored, prefersLight]);
  }

  it.each(cases)('agrees with resolveTheme (stored %s, prefers light %s)', (stored, prefersLight) => {
    const expected = resolveTheme(stored === BLOCKED ? null : stored, prefersLight);
    expect(runThemeScript(stored, prefersLight)).toEqual([expected]);
  });
});
