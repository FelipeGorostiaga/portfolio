import Link from 'next/link';
import { useCallback, useEffect, useRef, useState, type MouseEvent, type ReactNode, type RefObject } from 'react';
import { site } from '~/content/site';
import { ArrowLeft, ArrowUpRight, CloseIcon, MenuIcon } from './icons';
import styles from './Nav.module.css';
import ThemeToggle from './ThemeToggle';

export type NavProps = {
  variant: 'home' | 'route';
  current?: 'library' | 'games';
  showProjects?: boolean;
};

const LINKS_ID = 'primary-links';

/**
 * Publishes the sticky nav's height as --nav-h on <html>, so the home sections' anchor jumps
 * land below the nav. The collapsed menu drops down outside the bar and doesn't change it.
 */
function usePublishedHeight(ref: RefObject<HTMLElement>) {
  useEffect(() => {
    const header = ref.current;
    if (!header) return;
    const root = document.documentElement;
    const observer = new ResizeObserver(() => root.style.setProperty('--nav-h', `${header.offsetHeight}px`));
    observer.observe(header);
    return () => {
      observer.disconnect();
      root.style.removeProperty('--nav-h');
    };
  }, [ref]);
}

/** The collapsed menu closes on Escape (focus back on its button) and on a press outside the nav. */
function useDismiss(open: boolean, close: () => void, headerRef: RefObject<HTMLElement>, buttonRef: RefObject<HTMLButtonElement>) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      close();
      buttonRef.current?.focus();
    };
    const onDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) close();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown);
    };
  }, [open, close, headerRef, buttonRef]);
}

export default function Nav({ variant, current, showProjects = false }: NavProps) {
  const headerRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  usePublishedHeight(headerRef);
  useDismiss(open, close, headerRef, buttonRef);

  // Picking a link (or the brand) closes the collapsed menu.
  const onNavigate = (event: MouseEvent) => {
    if ((event.target as Element).closest('a')) close();
  };

  const brand = (
    <>
      <span className={styles.logoTile} aria-hidden="true">
        fg
        <span className={styles.logoCursor} />
      </span>
      <span className={styles.brandName}>{site.name}</span>
    </>
  );

  const shell = (home: ReactNode, links: ReactNode) => (
    <header ref={headerRef} className={styles.header} data-open={open || undefined} onClick={onNavigate}>
      {home}
      <nav id={LINKS_ID} aria-label="Primary" className={styles.links}>
        {links}
      </nav>
      <div className={styles.actions}>
        <ThemeToggle />
        <button
          ref={buttonRef}
          type="button"
          className={styles.menuButton}
          aria-expanded={open}
          aria-controls={LINKS_ID}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>
    </header>
  );

  if (variant === 'home') {
    return shell(
      <a href="#top" className={styles.brand}>
        {brand}
      </a>,
      <>
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
      </>,
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

  return shell(
    <Link href="/" className={styles.brand}>
      {brand}
    </Link>,
    <>
      <Link className={styles.link} href="/">
        <ArrowLeft />
        Home
      </Link>
      {routeLink('library', 'Library')}
      {routeLink('games', 'Games')}
    </>,
  );
}
