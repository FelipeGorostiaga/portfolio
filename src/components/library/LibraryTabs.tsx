import { useRef, type CSSProperties, type KeyboardEvent } from 'react';
import { TABS, type LibraryTab } from '~/lib/library';
import styles from './Library.module.css';

const LABELS: Record<LibraryTab, string> = { books: 'Books', movies: 'Movies', quotes: 'Quotes' };

export const tabId = (tab: LibraryTab) => `library-tab-${tab}`;
export const PANEL_ID = 'library-panel';

type LibraryTabsProps = { tab: LibraryTab; onChange(tab: LibraryTab): void };

export default function LibraryTabs({ tab, onChange }: LibraryTabsProps) {
  const refs = useRef<Partial<Record<LibraryTab, HTMLButtonElement | null>>>({});
  const index = TABS.indexOf(tab);

  // Arrow keys move between tabs (WAI-ARIA tabs pattern); only the active tab is in the Tab order.
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const next = TABS[(index + step + TABS.length) % TABS.length];
    onChange(next);
    refs.current[next]?.focus();
  };

  return (
    <div role="tablist" aria-label="Library sections" className={styles.tablist} onKeyDown={onKeyDown}>
      <span
        className={styles.indicator}
        aria-hidden="true"
        style={{ '--tab-index': index } as CSSProperties}
      />
      {TABS.map((t) => (
        <button
          key={t}
          ref={(el) => {
            refs.current[t] = el;
          }}
          type="button"
          role="tab"
          id={tabId(t)}
          aria-selected={t === tab}
          aria-controls={PANEL_ID}
          tabIndex={t === tab ? 0 : -1}
          className={styles.tab}
          onClick={() => onChange(t)}
        >
          {LABELS[t]}
        </button>
      ))}
    </div>
  );
}
