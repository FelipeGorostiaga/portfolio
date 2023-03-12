import SkillCard from './SkillCard';
import { ThemeType, useTheme } from '../../contexts/ThemeContext';
import { useMemo } from 'react';

function getSkillsWithTheme(isDark: boolean) {
  return [
    {
      name: 'Typescript',
      imgUrl: '/logos/ts-logo.svg',
      description: 'Strongly typed programming language that builds on top of JavaScript that adds additional syntax and better' +
        ' tooling without additional code',
      link: 'https://reactjs.org/',
      percentage: 85,
    },
    {
      name: 'React',
      imgUrl: '/logos/react-logo.svg',
      description: 'A JavaScript library for building user interfaces. It takes a component-based approach in which encapsulated components' +
        ' are composed in a tree structure to make complex UIs.',
      link: 'https://reactjs.org/',
      percentage: 85,
    },
    {
      name: 'Next.js',
      imgUrl: isDark? 'logos/nextjs-logo-white.svg' : '/logos/nextjs-logo.svg',
      description: 'A JavaScript library for building user interfaces. It takes a component-based approach in which encapsulated' +
        ' components are composed in a tree structure to make complex UIs.',
      link: 'https://reactjs.org/',
      percentage: 85,
    },
    {
      name: 'Node.js',
      imgUrl: '/logos/nodejs-logo.svg',
      description: 'A JavaScript library for building user interfaces. It takes a component-based approach in which encapsulated' +
        ' components are composed in a tree structure to make complex UIs.',
      link: 'https://reactjs.org/',
      percentage: 85,
    },
    {
      name: 'HTML',
      imgUrl: '/logos/html-logo.svg',
      description: 'The skeleton of the web.',
      link: 'https://reactjs.org/',
      percentage: 100,
    },
    {
      name: 'NestJS',
      imgUrl: '/logos/nestjs-logo.svg',
      description: 'The skeleton of the web.',
      link: 'https://reactjs.org/',
      percentage: 100,
    },
    {
      name: 'Spring',
      imgUrl: '/logos/spring-logo.svg',
      description: 'The skeleton of the web.',
      link: 'https://reactjs.org/',
      percentage: 100,
    },
    {
      name: 'Postgres',
      imgUrl: '/logos/postgresql-logo.svg',
      description: 'The skeleton of the web.',
      link: 'https://reactjs.org/',
      percentage: 100,
    },
    {
      name: 'AWS',
      imgUrl: isDark? '/logos/aws-logo-white.svg' : '/logos/aws-logo.svg',
      description: 'The skeleton of the web.',
      link: 'https://reactjs.org/',
      percentage: 100,
    },
    {
      name: 'GCP',
      imgUrl: '/logos/gcp-logo.svg',
      description: 'The skeleton of the web.',
      link: 'https://reactjs.org/',
      percentage: 100,
    },
    {
      name: 'Firebase',
      imgUrl: '/logos/firebase-logo.svg',
      description: 'The skeleton of the web.',
      link: 'https://reactjs.org/',
      percentage: 100,
    },
    {
      name: 'Angular',
      imgUrl: '/logos/angular-logo.svg',
      description: 'The skeleton of the web.',
      link: 'https://reactjs.org/',
      percentage: 100,
    },
    {
      name: 'Docker',
      imgUrl: '/logos/docker-logo.svg',
      description: 'The skeleton of the web.',
      link: 'https://reactjs.org/',
      percentage: 100,
    },
    {
      name: 'Mongo',
      imgUrl: '/logos/mongo-logo.svg',
      description: 'The skeleton of the web.',
      link: 'https://reactjs.org/',
      percentage: 100,
    },
    {
      name: 'CSS',
      imgUrl: '/logos/css-logo.svg',
      description: 'The skeleton of the web.',
      link: 'https://reactjs.org/',
      percentage: 100,
    },
    {
      name: 'Tailwind CSS',
      imgUrl: '/logos/tailwind-logo.svg',
      description: 'The skeleton of the web.',
      link: 'https://reactjs.org/',
      percentage: 100,
    },
    {
      name: 'Figma',
      imgUrl: '/logos/figma-logo.svg',
      description: 'The skeleton of the web.',
      link: 'https://reactjs.org/',
      percentage: 100,
    },
  ];
}

const Skills = () => {
  const { isDark } = useTheme();
  const skills = useMemo(() => {
    return getSkillsWithTheme(isDark);
  }, [isDark]);

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-20 px-20">
      {skills.map(skill => {
        return <SkillCard key={skill.name}
                          imgUrl={skill.imgUrl}
                          name={skill.name}
                          description={skill.description}
                          link={skill.link}
                          percentage={skill.percentage} />;
      })}
    </section>
  );
};

export default Skills;
