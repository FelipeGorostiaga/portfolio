import { useCallback, type MouseEvent } from 'react';

/**
 * Feeds the cursor glow (--mx/--my on the shell) and the spotlight cards
 * (--x/--y on the hovered `.spot`).
 */
export function usePointerVars() {
  const onMouseMove = useCallback((event: MouseEvent<HTMLElement>) => {
    const root = event.currentTarget;
    root.style.setProperty('--mx', `${event.clientX}px`);
    root.style.setProperty('--my', `${event.clientY}px`);

    const target = event.target as Element | null;
    const card = target?.closest<HTMLElement>('.spot');
    if (card) {
      const box = card.getBoundingClientRect();
      // Compensates for transforms (e.g. the hover lift) scaling the box.
      const scale = card.offsetWidth / (box.width || 1);
      card.style.setProperty('--x', `${(event.clientX - box.left) * scale}px`);
      card.style.setProperty('--y', `${(event.clientY - box.top) * scale}px`);
    }
  }, []);

  return { onMouseMove };
}
