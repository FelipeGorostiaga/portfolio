import { ArrowUpRight } from '~/components/layout/icons';
import { visibleProjects } from '~/content/projects';
import styles from './Projects.module.css';
import SectionHeading from './SectionHeading';
import sectionStyles from './Section.module.css';

export default function Projects() {
  if (visibleProjects.length === 0) return null;

  return (
    <section id="projects" className={sectionStyles.section}>
      <SectionHeading
        eyebrow="Projects"
        title="Things I've"
        accent="shipped"
        aside="Side projects I've designed and built — live and open to explore."
      />
      <div className={styles.list}>
        {visibleProjects.map((project, i) => {
          const meta = [project.domain, project.year].filter(Boolean).join(' · ');
          return (
            <article
              key={project.name}
              className={`spot reveal ${styles.project} ${i % 2 === 1 ? styles.flip : ''}`}
            >
              <div className={styles.shot}>
                <div className={styles.chrome} aria-hidden="true">
                  <span className={styles.dots}>
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className={`mono ${styles.urlbar}`}>{project.domain}</span>
                  <span className={styles.spacer} />
                </div>
                <div className={styles.viewport}>
                  {/* eslint-disable-next-line @next/next/no-img-element -- image optimizer is disabled site-wide */}
                  <img src={project.screenshot} alt={`Screenshot of ${project.name}`} loading="lazy" />
                </div>
              </div>
              <div className={styles.text}>
                {meta && <span className={`mono ${styles.meta}`}>{meta}</span>}
                <h3 className={styles.name}>{project.name}</h3>
                <p className={styles.description}>{project.description}</p>
                <div className={styles.tags}>
                  {project.stack.map((item) => (
                    <span key={item} className="tag">
                      {item}
                    </span>
                  ))}
                </div>
                <a
                  className={`btn btn-primary ${styles.visit}`}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit {project.name} <ArrowUpRight />
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
