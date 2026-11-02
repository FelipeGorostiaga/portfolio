import Snake from '~/components/games/Snake';
import RouteHeader from '~/components/layout/RouteHeader';
import Seo from '~/components/layout/Seo';
import SiteShell from '~/components/layout/SiteShell';

export default function SnakePage() {
  return (
    <>
      <Seo
        title="Snake | Felipe Gorostiaga"
        description="The arcade classic, rebuilt from scratch: eat the apples, avoid the walls and your own tail."
        path="/games/snake"
      />
      <SiteShell variant="route" current="games">
        <main className="route-main">
          <RouteHeader
            eyebrow="games"
            title={<span className="accent grad">Snake</span>}
            lead="The arcade classic: eat as many apples as you can without hitting the walls or your own growing tail."
          />
          <Snake />
        </main>
      </SiteShell>
    </>
  );
}
