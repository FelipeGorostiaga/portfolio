import styles from './Section.module.css';

type SectionHeadingProps = {
  eyebrow: string;
  /** Heading text before the accent word. */
  title: string;
  /** The single serif-italic word that ends the heading. */
  accent: string;
  aside?: string;
};

export default function SectionHeading({ eyebrow, title, accent, aside }: SectionHeadingProps) {
  return (
    <div className={`reveal ${styles.heading}`}>
      <div className={styles.titles}>
        <span className="eyebrow">{eyebrow}</span>
        <h2 className={styles.title}>
          {title} <span className="accent">{accent}</span>
        </h2>
      </div>
      {aside && <p className={styles.aside}>{aside}</p>}
    </div>
  );
}
