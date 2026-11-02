export type Theme = 'dark' | 'light';

export const THEME_STORAGE_KEY = 'theme';

/** A saved choice wins; otherwise follow the system, defaulting to dark. */
export function resolveTheme(stored: string | null, prefersLight: boolean): Theme {
  if (stored === 'dark' || stored === 'light') return stored;
  return prefersLight ? 'light' : 'dark';
}

/**
 * Runs in <head> before first paint (see _document) so the page never flashes
 * the wrong theme. Mirrors resolveTheme; theme.test.ts runs it against resolveTheme
 * for every case. Reading storage can throw (blocked storage), so it has its own try:
 * the system preference still applies.
 */
export const THEME_SCRIPT = `(function(){var s=null;try{s=localStorage.getItem('${THEME_STORAGE_KEY}');}catch(e){}try{var t=s==='dark'||s==='light'?s:(window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');var c=document.documentElement.classList;c.remove('dark','light');c.add(t);}catch(e){}})();`;
