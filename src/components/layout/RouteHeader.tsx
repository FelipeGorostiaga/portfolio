import { type ReactNode } from 'react';
import styles from './RouteHeader.module.css';

type RouteHeaderProps = {
  /** Shown after a green slash, e.g. "library" → "/library". */
  eyebrow: string;
  title: ReactNode;
  lead: string;
};

export default function RouteHeader({ eyebrow, title, lead }: RouteHeaderProps) {
  return (
    <div className={`enter ${styles.header}`}>
      <div className={styles.titles}>
        <span className="eyebrow">
          <b>/</b>
          {eyebrow}
        </span>
        <h1 className={styles.title}>{title}</h1>
      </div>
      <p className={styles.lead}>{lead}</p>
    </div>
  );
}
