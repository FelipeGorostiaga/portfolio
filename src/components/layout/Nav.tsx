import Link from 'next/link';
import { site } from '~/content/site';
import { ArrowLeft, ArrowUpRight } from './icons';
import styles from './Nav.module.css';
import ThemeToggle from './ThemeToggle';

export type NavProps = {
  variant: 'home' | 'route';
  current?: 'library' | 'games';
  showProjects?: boolean;
};

export default function Nav({ variant, current, showProjects = false }: NavProps) {
  const brand = (
    <>
      <span className={styles.logoTile} aria-hidden="true">
        fg
        <span className={styles.logoCursor} />
      </span>
      <span className={styles.brandName}>{site.name}</span>
    </>
  );

  if (variant === 'home') {
    return (
      <header className={styles.header}>
        <a href="#top" className={styles.brand}>
          {brand}
        </a>
        <nav aria-label="Primary" className={styles.links}>
          <a className={styles.link} href="#experience">
            Experience
          </a>
          {showProjects && (
            <a className={styles.link} href="#projects">
              Projects
            </a>
          )}
          <a className={styles.link} href="#skills">
            Skills
          </a>
          <a className={styles.link} href="#contact">
            Contact
          </a>
          <span className={styles.separator} aria-hidden="true" />
          <Link className={styles.link} href="/library">
            Library <ArrowUpRight size={14} />
          </Link>
          <Link className={styles.link} href="/games">
            Games <ArrowUpRight size={14} />
          </Link>
          <ThemeToggle />
        </nav>
      </header>
    );
  }

  const routeLink = (page: 'library' | 'games', label: string) => (
    <Link
      className={`${styles.link} ${current === page ? styles.on : ''}`}
      href={`/${page}`}
      aria-current={current === page ? 'page' : undefined}
    >
      {label}
    </Link>
  );

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.brand}>
        {brand}
      </Link>
      <nav aria-label="Primary" className={styles.links}>
        <Link className={styles.link} href="/">
          <ArrowLeft />
          Home
        </Link>
        {routeLink('library', 'Library')}
        {routeLink('games', 'Games')}
        <ThemeToggle />
      </nav>
    </header>
  );
}
