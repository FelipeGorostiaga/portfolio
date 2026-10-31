import Minesweeper from '~/components/games/Minesweeper';
import RouteHeader from '~/components/layout/RouteHeader';
import Seo from '~/components/layout/Seo';
import SiteShell from '~/components/layout/SiteShell';

export default function MinesweeperPage() {
  return (
    <>
      <Seo
        title="Minesweeper — Felipe Gorostiaga"
        description="Minesweeper, rebuilt from scratch. Clear the board without hitting a mine."
        path="/games/minesweeper"
      />
      <SiteShell variant="route" current="games">
        <main className="route-main">
          <RouteHeader
            eyebrow="games"
            title={
              <>
                Mine<span className="accent grad">sweeper</span>
              </>
            }
            lead="Clear the board without hitting a mine. The numbers tell you how many mines touch each square."
          />
          <Minesweeper />
        </main>
      </SiteShell>
    </>
  );
}
