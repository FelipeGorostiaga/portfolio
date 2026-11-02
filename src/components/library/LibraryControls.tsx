import { type SortKey, type SortOrder } from '~/lib/library';
import styles from './Library.module.css';

type LibraryControlsProps = {
  query: string;
  onQuery(query: string): void;
  sort: SortKey;
  onSort(sort: SortKey): void;
  order: SortOrder;
  onToggleOrder(): void;
  /** Quotes have no rating or year, so sorting is off. */
  quotes: boolean;
};

export default function LibraryControls({
  query,
  onQuery,
  sort,
  onSort,
  order,
  onToggleOrder,
  quotes,
}: LibraryControlsProps) {
  const descending = order === 'desc';
  return (
    <div className={styles.filters}>
      <label className={styles.field}>
        <span className="sr-only">Search the library</span>
        <svg
          className={`${styles.fieldIcon} ${styles.searchIcon}`}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
        <input
          className={`${styles.control} ${styles.search}`}
          type="search"
          placeholder={quotes ? 'Search quotes or authors…' : 'Search by title or author…'}
          value={query}
          onChange={(event) => onQuery(event.target.value)}
        />
      </label>
      <label className={styles.field}>
        <span className="sr-only">Sort by</span>
        <select
          className={`${styles.control} ${styles.select}`}
          value={sort}
          disabled={quotes}
          onChange={(event) => onSort(event.target.value as SortKey)}
        >
          <option value="rating">Sort: Rating</option>
          <option value="year">Sort: Year</option>
          <option value="title">Sort: Title</option>
        </select>
        <svg
          className={`${styles.fieldIcon} ${styles.chevron}`}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </label>
      <button
        type="button"
        className={`${styles.orderButton} ${descending ? '' : styles.ascending}`}
        aria-label={
          descending ? 'Sorted high to low, switch to low to high' : 'Sorted low to high, switch to high to low'
        }
        disabled={quotes}
        onClick={onToggleOrder}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 5v14" />
          <path d="M6 13l6 6 6-6" />
        </svg>
      </button>
    </div>
  );
}
