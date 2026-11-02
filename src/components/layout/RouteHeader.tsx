import Link from 'next/link';
import { type ReactNode } from 'react';
import styles from './RouteHeader.module.css';

type RouteHeaderProps = {
  /** Shown after a green slash, e.g. "library" → "/library". */
  eyebrow: string;
  /** Makes the eyebrow a link, e.g. "/games" from a single game's page. */
  eyebrowHref?: string;
  title: ReactNode;
  lead: string;
};

export default function RouteHeader({ eyebrow, eyebrowHref, title, lead }: RouteHeaderProps) {
  const eyebrowText = (
    <>
      <b>/</b>
      {eyebrow}
    </>
  );

  return (
    <div className={`enter ${styles.header}`}>
      <div className={styles.titles}>
        {eyebrowHref ? (
          <Link href={eyebrowHref} className={`eyebrow ${styles.eyebrowLink}`}>
            {eyebrowText}
          </Link>
        ) : (
          <span className="eyebrow">{eyebrowText}</span>
        )}
        <h1 className={styles.title}>{title}</h1>
      </div>
      <p className={styles.lead}>{lead}</p>
    </div>
  );
}
