import { LONG_QUOTE, type Quote } from '~/lib/library';
import styles from './Library.module.css';

export default function QuoteCard({ quote }: { quote: Quote }) {
  const long = quote.text.length > LONG_QUOTE;
  return (
    <figure className={`spot ${styles.quote}`}>
      <span className={styles.qmark} aria-hidden="true">
        “
      </span>
      <blockquote className={`serif ${styles.blockquote} ${long ? styles.blockquoteLong : ''}`}>{quote.text}</blockquote>
      <figcaption className={`mono ${styles.caption}`}>
        — {quote.author}
        {quote.reference ? `, ${quote.reference}` : ''}
      </figcaption>
    </figure>
  );
}
