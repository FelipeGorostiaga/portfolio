import { useCallback, useRef, type MouseEvent } from 'react';

/**
 * Feeds the cursor glow (--mx/--my on the glow itself) and the spotlight cards
 * (--x/--y on the hovered `.spot`).
 */
export function usePointerVars() {
  const glowRef = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback((event: MouseEvent<HTMLElement>) => {
    // Not on the shell: a custom property there restyles the whole page on every move, and a
    // window Chrome feeds more moves than frames (300+/s) then starves the hero canvas.
    const glow = glowRef.current;
    if (glow) {
      glow.style.setProperty('--mx', `${event.clientX}px`);
      glow.style.setProperty('--my', `${event.clientY}px`);
    }

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

  return { glowRef, onMouseMove };
}
