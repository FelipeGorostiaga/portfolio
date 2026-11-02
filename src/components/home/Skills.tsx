import { skills } from '~/content/skills';
import SectionHeading from './SectionHeading';
import sectionStyles from './Section.module.css';
import styles from './Skills.module.css';

export default function Skills() {
  return (
    <section id="skills" className={sectionStyles.section}>
      <SectionHeading eyebrow="Skills" title="My weapons" accent="of choice" />
      <div className={styles.grid}>
        {skills.map((skill) => (
          <article key={skill.symbol} className={`spot reveal ${styles.tile}`}>
            <div className={`mono ${styles.top}`}>
              <span>{skill.number}</span>
              <span>{skill.category}</span>
            </div>
            <div className={styles.symbol} aria-hidden="true">
              {skill.symbol}
            </div>
            <h3 className={styles.name}>{skill.name}</h3>
            <p className={styles.description}>{skill.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
