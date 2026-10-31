import Hero from '~/components/home/Hero';
import Seo from '~/components/layout/Seo';
import SiteShell from '~/components/layout/SiteShell';

export default function HomePage() {
  return (
    <>
      <Seo
        title="Felipe Gorostiaga — Software Engineer"
        description="Felipe Gorostiaga, software engineer and fullstack developer: experience, skills, side projects and a few games built from scratch."
        path="/"
      />
      <SiteShell variant="home">
        <main>
          <Hero />
        </main>
      </SiteShell>
    </>
  );
}
