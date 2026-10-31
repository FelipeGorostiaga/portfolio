import { type ReactNode } from 'react';
import { usePointerVars } from '~/hooks/usePointerVars';
import Footer from './Footer';
import Nav, { type NavProps } from './Nav';
import styles from './SiteShell.module.css';

type SiteShellProps = NavProps & { children: ReactNode };

export default function SiteShell({ variant, current, showProjects, children }: SiteShellProps) {
  const { onMouseMove } = usePointerVars();
  const isRoute = variant === 'route';
  const className = [styles.shell, isRoute && 'route', current === 'games' && styles.games]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={className} onMouseMove={onMouseMove}>
      <div className="cursor-glow" aria-hidden="true" />
      {isRoute && (
        <div className={styles.aurora} aria-hidden="true">
          <div className={`${styles.blob} ${styles.b1}`} />
          <div className={`${styles.blob} ${styles.b2}`} />
        </div>
      )}
      <Nav variant={variant} current={current} showProjects={showProjects} />
      {children}
      <Footer variant={variant} />
    </div>
  );
}
