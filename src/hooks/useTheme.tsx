import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { THEME_STORAGE_KEY, type Theme } from '~/lib/theme';

type ThemeContextValue = {
  theme: Theme;
  /** Switches theme; `origin` is the element the circle reveal grows from. */
  toggle(origin?: HTMLElement | null): void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => { ready: Promise<void> };
};

function applyTheme(theme: Theme) {
  const root = document.documentElement.classList;
  root.remove('dark', 'light');
  root.add(theme);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Private mode or blocked storage: the theme still applies for this visit.
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // The server always renders dark; the inline script in _document has already
  // set the real theme on <html>, so read it back after mount.
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    setTheme(document.documentElement.classList.contains('light') ? 'light' : 'dark');
  }, []);

  const toggle = useCallback(
    (origin?: HTMLElement | null) => {
      const next: Theme = theme === 'dark' ? 'light' : 'dark';
      const update = () => {
        applyTheme(next);
        setTheme(next);
      };
      const doc = document as ViewTransitionDocument;
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!doc.startViewTransition || reduceMotion || !origin) {
        update();
        return;
      }
      const box = origin.getBoundingClientRect();
      const cx = box.left + box.width / 2;
      const cy = box.top + box.height / 2;
      const radius = Math.hypot(Math.max(cx, window.innerWidth - cx), Math.max(cy, window.innerHeight - cy));
      try {
        doc
          .startViewTransition(update)
          .ready.then(() => {
            document.documentElement.animate(
              { clipPath: [`circle(0px at ${cx}px ${cy}px)`, `circle(${radius}px at ${cx}px ${cy}px)`] },
              { duration: 700, easing: 'cubic-bezier(.65,0,.35,1)', pseudoElement: '::view-transition-new(root)' },
            );
          })
          .catch(() => undefined);
      } catch {
        update();
      }
    },
    [theme],
  );

  const value = useMemo(() => ({ theme, toggle }), [theme, toggle]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const value = useContext(ThemeContext);
  if (!value) throw new Error('useTheme must be used inside ThemeProvider');
  return value;
}
