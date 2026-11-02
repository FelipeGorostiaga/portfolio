export type Theme = 'dark' | 'light';

export const THEME_STORAGE_KEY = 'theme';

/** A saved choice wins; otherwise follow the system, defaulting to dark. */
export function resolveTheme(stored: string | null, prefersLight: boolean): Theme {
  if (stored === 'dark' || stored === 'light') return stored;
  return prefersLight ? 'light' : 'dark';
}

/**
 * Runs in <head> before first paint (see _document) so the page never flashes
 * the wrong theme. Mirrors resolveTheme; keep the two in sync.
 */
export const THEME_SCRIPT = `(function(){try{var s=localStorage.getItem('${THEME_STORAGE_KEY}');var t=s==='dark'||s==='light'?s:(window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');var c=document.documentElement.classList;c.remove('dark','light');c.add(t);}catch(e){}})();`;
