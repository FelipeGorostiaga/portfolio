import { coverColors, type RatedItem } from '~/lib/library';
import styles from './Library.module.css';

export default function BookCard({ item }: { item: RatedItem }) {
  const [from, to] = coverColors(item.id);
  return (
    <article className={`spot ${styles.book}`}>
      <div className={styles.cover} aria-hidden="true" style={{ background: `linear-gradient(160deg, ${from}, ${to})` }}>
        <span className={`mono ${styles.coverAuthor}`}>{item.creator}</span>
        <span className={`serif ${styles.coverTitle}`}>{item.title}</span>
        <span className={styles.coverRule} />
      </div>
      <div className={styles.bookBody}>
        <h2 className={styles.bookTitle}>{item.title}</h2>
        <p className={styles.bookMeta}>
          {item.creator} · {item.year}
        </p>
        <div className={styles.rating}>
          <div className={styles.ratingRow}>
            <span className="lbl">My rating</span>
            <span className={styles.score}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3 6.1 20.6l1.3-6.6L2.5 9.4l6.6-.8z" />
              </svg>
              <span className="sr-only">Rated</span>
              {item.score}
              <span className="sr-only"> out of 10</span>
            </span>
          </div>
          <div className={styles.meter} aria-hidden="true">
            <span style={{ width: `${item.score * 10}%` }} />
          </div>
        </div>
      </div>
    </article>
  );
}
