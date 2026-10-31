import Link from 'next/link';
import { MinesweeperPreview, SnakePreview } from '~/components/games/GamePreviews';
import styles from '~/components/games/Games.module.css';
import LifePanel from '~/components/games/LifePanel';
import { ArrowRight } from '~/components/layout/icons';
import RouteHeader from '~/components/layout/RouteHeader';
import Seo from '~/components/layout/Seo';
import SiteShell from '~/components/layout/SiteShell';

const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

export default function GamesPage() {
  return (
    <>
      <Seo
        title="Games — Felipe Gorostiaga"
        description="Game of Life, Minesweeper and Snake, rebuilt from scratch and playable in the browser."
        path="/games"
      />
      <SiteShell variant="route" current="games">
        <main className={`route-main ${styles.main}`}>
          <RouteHeader
            eyebrow="games"
            title={
              <>
                Play <span className="accent grad">something</span>
              </>
            }
            lead="Three classics I rebuilt from scratch. The Game of Life is already running — draw on it."
          />

          <LifePanel />

          <div className={styles.cards}>
            <article className={`spot enter ${styles.card}`} style={delay(220)}>
              <MinesweeperPreview />
              <div className={styles.cardText}>
                <h2 className={styles.cardTitle}>Minesweeper</h2>
                <p className={styles.copy}>
                  Clear the board without hitting a mine. The numbers tell you how many mines touch each square.
                </p>
                <Link className={`btn btn-sm btn-ghost ${styles.play}`} href="/games/minesweeper">
                  Play Minesweeper <ArrowRight size={16} />
                </Link>
              </div>
            </article>
            <article className={`spot enter ${styles.card}`} style={delay(300)}>
              <SnakePreview />
              <div className={styles.cardText}>
                <h2 className={styles.cardTitle}>Snake</h2>
                <p className={styles.copy}>
                  The arcade classic: eat as many apples as you can without hitting the walls or your own growing
                  tail.
                </p>
                <Link className={`btn btn-sm btn-ghost ${styles.play}`} href="/games/snake">
                  Play Snake <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          </div>
        </main>
      </SiteShell>
    </>
  );
}
