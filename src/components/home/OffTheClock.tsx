import Link from 'next/link';
import { ArrowRight } from '~/components/layout/icons';
import styles from './OffTheClock.module.css';
import SectionHeading from './SectionHeading';
import sectionStyles from './Section.module.css';

const SPINES = [
  { title: 'Zarathustra', height: 150, colors: ['#166534', '#052E16'] },
  { title: 'Beyond Good & Evil', height: 172, colors: ['#27272A', '#09090B'] },
  { title: 'Sapiens', height: 138, colors: ['#15803D', '#14532D'] },
  { title: 'Ecce Homo', height: 160, colors: ['#3F3F46', '#18181B'] },
  { title: 'When Nietzsche Wept', height: 166, colors: ['#065F46', '#022C22'] },
];

// Glider cell offsets inside its 60×60 box.
const GLIDER = [
  [21, 1],
  [41, 21],
  [1, 41],
  [21, 41],
  [41, 41],
];

function Glider({ delay }: { delay?: string }) {
  return (
    <div className={styles.glider} style={delay ? { animationDelay: delay } : undefined}>
      {GLIDER.map(([left, top]) => (
        <i key={`${left}-${top}`} style={{ left, top }} />
      ))}
    </div>
  );
}

export default function OffTheClock() {
  return (
    <section id="elsewhere" className={sectionStyles.section}>
      <SectionHeading eyebrow="Off the clock" title="Things I do outside" accent="work" />
      <div className={styles.cards}>
        <Link href="/library" className={`spot reveal ${styles.portal}`}>
          <div className={styles.spines} aria-hidden="true">
            {SPINES.map((spine) => (
              <span
                key={spine.title}
                className={`serif ${styles.spine}`}
                style={{
                  height: spine.height,
                  background: `linear-gradient(180deg, ${spine.colors[0]}, ${spine.colors[1]})`,
                }}
              >
                {spine.title}
              </span>
            ))}
          </div>
          <span className="eyebrow">/library</span>
          <h3 className={styles.title}>Library</h3>
          <p className={styles.description}>
            Books, movies and the quotes I keep coming back to, all rated and searchable.
          </p>
          <span className={styles.go}>
            Open the library <ArrowRight />
          </span>
        </Link>

        <Link href="/games" className={`spot reveal ${styles.portal}`}>
          <div className={styles.board} aria-hidden="true">
            <Glider />
            <Glider delay="-3.5s" />
          </div>
          <span className="eyebrow">/games</span>
          <h3 className={styles.title}>Games</h3>
          <p className={styles.description}>
            Game of Life, Minesweeper and Snake, built from scratch and playable in the browser.
          </p>
          <span className={styles.go}>
            Play something <ArrowRight />
          </span>
        </Link>
      </div>
    </section>
  );
}
