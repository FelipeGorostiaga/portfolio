import Contact from '~/components/home/Contact';
import Experience from '~/components/home/Experience';
import Hero from '~/components/home/Hero';
import OffTheClock from '~/components/home/OffTheClock';
import Projects from '~/components/home/Projects';
import Skills from '~/components/home/Skills';
import Seo from '~/components/layout/Seo';
import SiteShell from '~/components/layout/SiteShell';
import { visibleProjects } from '~/content/projects';

export default function HomePage() {
  return (
    <>
      <Seo
        title="Felipe Gorostiaga | Software Engineer"
        description="Felipe Gorostiaga, software engineer and fullstack developer: experience, skills, side projects and a few games built from scratch."
        path="/"
      />
      <SiteShell variant="home" showProjects={visibleProjects.length > 0}>
        <main>
          <Hero />
          <Experience />
          <Projects />
          <Skills />
          <OffTheClock />
          <Contact />
        </main>
      </SiteShell>
    </>
  );
}
