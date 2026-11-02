import { site } from '~/content/site';
import { ArrowUpRight } from '~/components/layout/icons';
import HeroField from './HeroField';
import styles from './Hero.module.css';

// The CSS loop in Hero.module.css (.roleWord / @keyframes word) is sized for 3 words × 3.75s.
const ROLES = ['Engineer.', 'Builder.', 'Creator.'];
const ROLE_INTERVAL_S = 3.75;

const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

export default function Hero() {
  return (
    <section id="top" className={styles.hero}>
      <div className={styles.aurora} aria-hidden="true">
        <div className={`${styles.blob} ${styles.b1}`} />
        <div className={`${styles.blob} ${styles.b2}`} />
        <div className={`${styles.blob} ${styles.b3}`} />
      </div>
      <HeroField className={styles.field} />
      <div className={styles.fade} aria-hidden="true" />

      <div className={styles.content}>
        <div className={styles.intro}>
          <span className="chip enter" style={delay(80)}>
            <span className="pulse" aria-hidden="true" />
            {site.role}
          </span>
          <h1 className={styles.name}>
            <span className={styles.line}>
              <span className={styles.enterUp} style={delay(150)}>
                Felipe
              </span>
            </span>
            <span className={styles.line}>
              <span className={`grad ${styles.surname}`} style={delay(260)}>
                Gorostiaga
              </span>
            </span>
          </h1>
          <p className={`enter ${styles.roleLine}`} style={delay(420)}>
            <span className="sr-only">Engineer, builder, creator.</span>
            <span className={styles.roles} aria-hidden="true">
              {ROLES.map((role, i) => (
                <span
                  key={role}
                  className={styles.roleWord}
                  style={i ? { animationDelay: `${i * ROLE_INTERVAL_S}s` } : undefined}
                >
                  {role}
                </span>
              ))}
            </span>
          </p>
          <p className={`enter ${styles.bio}`} style={delay(520)}>
            An engineer driven by curiosity. I make products that are useful to people and help them reach their
            full potential — for me, creating is where learning and lasting impact meet.
          </p>
          <div className={`enter ${styles.ctas}`} style={delay(620)}>
            <a className="btn btn-primary" href="#contact">
              Let&apos;s talk <ArrowUpRight />
            </a>
            <a className="btn btn-ghost" href="#experience">
              See my work
            </a>
          </div>
        </div>

        <div className={`enter ${styles.portrait}`} style={delay(380)}>
          <div className={`${styles.ring} ${styles.ringSoft}`} aria-hidden="true" />
          <div className={styles.ring} aria-hidden="true" />
          <div className={styles.ringGap} />
          <div className={styles.photo}>
            {/* eslint-disable-next-line @next/next/no-img-element -- image optimizer is disabled site-wide */}
            <img src="/felipe-portrait.jpg" alt={`Portrait of ${site.name}`} width={318} height={318} />
          </div>
        </div>
      </div>

    </section>
  );
}
