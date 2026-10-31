import Link from 'next/link';
import RouteHeader from '~/components/layout/RouteHeader';
import Seo from '~/components/layout/Seo';
import SiteShell from '~/components/layout/SiteShell';

export default function NotFoundPage() {
  return (
    <>
      <Seo title="Page not found — Felipe Gorostiaga" description="That page doesn't exist." path="/404" />
      <SiteShell variant="route">
        <main className="route-main">
          <RouteHeader
            eyebrow="404"
            title={
              <>
                Page not <span className="accent grad">found</span>
              </>
            }
            lead="That page doesn't exist — it may have moved."
          />
          <Link className="btn btn-primary" href="/">
            Back home
          </Link>
        </main>
      </SiteShell>
    </>
  );
}
