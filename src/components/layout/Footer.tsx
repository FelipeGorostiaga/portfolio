import Link from 'next/link';
import { site } from '~/content/site';
import styles from './Footer.module.css';

export default function Footer({ variant }: { variant: 'home' | 'route' }) {
  const copyright = (
    <span className={`mono ${styles.copyright}`}>
      © {process.env.BUILD_YEAR} {site.name}
    </span>
  );

  if (variant === 'route') {
    return (
      <footer className={styles.footer}>
        <div className={styles.inner}>
          {copyright}
          <Link className={styles.link} href="/">
            ← Back home
          </Link>
        </div>
      </footer>
    );
  }

  return (
    <footer className={`${styles.footer} ${styles.home}`}>
      <div className={styles.inner}>
        {copyright}
        <nav aria-label="Footer" className={styles.links}>
          <a className={styles.link} href={site.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a className={styles.link} href={site.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a className={styles.link} href={`mailto:${site.email}`}>
            Email
          </a>
          <a className={styles.link} href="#top">
            Back to top ↑
          </a>
        </nav>
      </div>
    </footer>
  );
}
