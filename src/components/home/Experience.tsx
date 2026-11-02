import { jobs } from '~/content/experience';
import { formatRange } from '~/lib/dates';
import styles from './Experience.module.css';
import SectionHeading from './SectionHeading';
import sectionStyles from './Section.module.css';

export default function Experience() {
  return (
    <section id="experience" className={`${sectionStyles.section} ${styles.section}`}>
      <SectionHeading eyebrow="Experience" title="Where I've been" accent="building" />
      <div className={styles.timeline}>
        <div className={styles.line} aria-hidden="true" />
        {jobs.map((job) => {
          const current = job.end === null;
          return (
            <article key={`${job.company}-${job.start}`} className={`reveal ${styles.job}`}>
              <span className={`${styles.dot} ${current ? styles.live : ''}`} aria-hidden="true" />
              <div className={`spot ${styles.card}`}>
                <div className={styles.mark} aria-hidden="true">
                  {/* eslint-disable-next-line @next/next/no-img-element -- image optimizer is disabled site-wide */}
                  {job.logo ? <img src={job.logo} alt="" width={40} height={40} /> : job.mark}
                </div>
                <div className={styles.body}>
                  <div className={styles.top}>
                    <h3 className={styles.role}>{job.role}</h3>
                    <span className={styles.when}>
                      <span className={`mono ${styles.dates}`}>{formatRange(job.start, job.end)}</span>
                      {current && <span className={styles.now}>Current</span>}
                    </span>
                  </div>
                  <p className={styles.summary}>
                    <a className={styles.company} href={job.companyUrl} target="_blank" rel="noopener noreferrer">
                      {job.company}
                    </a>{' '}
                    · {job.summary}
                  </p>
                  <ul className={styles.bullets}>
                    {job.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                  <div className={styles.tags}>
                    {job.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
