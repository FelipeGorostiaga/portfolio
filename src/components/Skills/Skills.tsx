import SkillCard from './SkillCard';
import { useTheme } from '~/contexts/ThemeContext';
import { useMemo } from 'react';

function getSkillsWithTheme(isDark: boolean) {
  return [
    {
      name: 'Next.js',
      imgUrl: isDark ? 'logos/nextjs-logo-white.svg' : '/logos/nextjs-logo.svg',
      description: 'Fullstack web framework that extends React latest features. It provides some additional built in features like' +
        ' nested routing, middlewares, image optimization and multiple rendering strategies.',
      link: 'https://nextjs.org/',
      percentage: 95,
    },
    {
      name: 'React',
      imgUrl: '/logos/react-logo.svg',
      description: 'A JavaScript library for building user interfaces. It takes a component-based approach in which encapsulated components' +
        ' are composed in a tree structure to make complex UIs.',
      link: 'https://reactjs.org/',
      percentage: 95,
    },
    {
      name: 'Typescript',
      imgUrl: '/logos/ts-logo.svg',
      description: 'Strongly typed programming language that builds on top of JavaScript that adds additional syntax and better' +
        ' tooling without additional code.',
      link: 'https://www.typescriptlang.org/',
      percentage: 95,
    },
    {
      name: 'Tailwind CSS',
      imgUrl: '/logos/tailwind-logo.svg',
      description: 'A utility-first CSS framework packed with helper classes that can be composed to build any design, directly in your markup.' +
        ' It provides an out of the box design system to be consistent with color choices, spacing, typography, shadows and everything else that makes' +
        ' up a well-engineered system while still providing the capacity to be fully customizable.',
      link: 'https://tailwindcss.com/',
      percentage: 75,
    },
    {
      name: 'NestJS',
      imgUrl: '/logos/nestjs-logo.svg',
      description: 'A progressive Node.js framework for building efficient, reliable and scalable server-side applications.' +
        ' Nest extends Node.js frameworks like Express or Fastify adding modular organization and a wide range of other libraries' +
        ' to take care of repetitive tasks.',
      link: 'https://nestjs.com/',
      percentage: 95,
    },
    {
      name: 'Node.js',
      imgUrl: '/logos/nodejs-logo.svg',
      description: 'An asynchronous event-driven JavaScript runtime to build scalable network applications. Its single-threaded non-blocking' +
        ' I/O architecture makes it an excellent choice for both real-time and data streaming applications too.',
      link: 'https://nodejs.org/es',
      percentage: 95,
    },
    {
      name: 'HTML',
      imgUrl: '/logos/html-logo.svg',
      description: 'Stands for HyperText Markup Language. It is the web standard for markup language for web page creation.' +
        ' It allows creation and structure of sections, paragraphs, and links using building blocks such as tags and attributes.',
      link: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
      percentage: 100,
    },
    {
      name: 'CSS',
      imgUrl: '/logos/css-logo.svg',
      description: 'Stands for Cascading Style Sheets language and is used to style elements written in a markup language such as HTML.' +
        ' It separates the content from the visual representation of the site. The relation between HTML and CSS is strongly tied together since HTML' +
        ' is the very foundation of a site and CSS is all of the aesthetics of an entire website.',
      link: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
      percentage: 90,
    },
    {
      name: 'Spring',
      imgUrl: '/logos/spring-logo.svg',
      description: 'An open source Java application framework that uses inversion of control and dependency injection to provide a quick and easy developer experience.' +
        ' It is mostly used to create microservices, fullstack and serverless applications. It provides multiple projects, quickstarts and development tools to' +
        ' build common used patterns and features faster.',
      link: 'https://spring.io/',
      percentage: 80,
    },
    {
      name: 'AWS',
      imgUrl: isDark ? '/logos/aws-logo-white.svg' : '/logos/aws-logo.svg',
      description: 'The worlds largest and most used cloud provider. It provides more than 200 different services for multiple use-cases available from' +
        ' data centers globally. It has more than 30 regions around the world that provide security, fault tolerance and scalability features.',
      link: 'https://aws.amazon.com/',
      percentage: 75,
    },
    {
      name: 'GCP',
      imgUrl: '/logos/gcp-logo.svg',
      description: 'Google\'s cloud computing platform. It provides multiple services like storage, databases, computing, security, AI and many others.' +
        ' It\'s easy to use and provides many SDK\'s for many programming languages.',
      link: 'https://cloud.google.com/',
      percentage: 70,
    },
    {
      name: 'Firebase',
      imgUrl: '/logos/firebase-logo.svg',
      description: 'Google\'s backend as a service platform for application development. ' +
        'It provides services such as authentication, authorization, databases, analytics, hosting, storage, cloud functions, messaging and many more.' +
        ' It provides SDKs for most popular programming languages and an user interface for better visualization and making integrations easier.',
      link: 'https://firebase.google.com/',
      percentage: 70,
    },
    {
      name: 'Postgres',
      imgUrl: '/logos/postgresql-logo.svg',
      description: 'A powerful, open source object-relational database system with more than 30 years of active development that has earned a strong' +
        ' reputation for performance, reliability and robustness. It has a huge community that build plugins and products that complement the DBMS.',
      link: 'https://www.postgresql.org/',
      percentage: 90,
    },
    {
      name: 'MongoDB',
      imgUrl: '/logos/mongo-logo.svg',
      description: 'A flexible NoSQL, document database that stores data in JSON-like documents. It provides ad hoc queries,' +
        ' indexing, real time aggregation and is a distributed database at its core, so high availability, horizontal scaling,' +
        ' and geographic distribution are built in and easy to use. It provides drivers for more than 10 languages' +
        ' and has a huge community that provides many more.',
      link: 'https://www.mongodb.com/',
      percentage: 60,
    },
    {
      name: 'Angular',
      imgUrl: '/logos/angular-logo.svg',
      description: 'An open-source web framework written in TypeScript and maintained by Google. It takes a component-based approach with' +
        ' well-integrated libraries that cover a wide variety of features, including routing, forms, data fetching and many more. It comes with' +
        ' a built in CLI for a better developer experience and uses a modular architecture with dependency injection.',
      link: 'https://angular.io/',
      percentage: 50,
    },
    {
      name: 'Docker',
      imgUrl: '/logos/docker-logo.svg',
      description: 'A software platform that allows users to build, test, and deploy applications quickly. It packages software' +
        ' into standardized units called containers that have everything the software needs to run, including libraries, system tools,' +
        ' code and runtime. It provides tools for easy managing and scaling on demand.',
      link: 'https://www.docker.com/',
      percentage: 60,
    },
    {
      name: 'Figma',
      imgUrl: '/logos/figma-logo.svg',
      description: 'A collaborative web and desktop application for interface design. It focuses on UI/UX design,' +
        ' with an emphasis on real-time collaboration using a variety of vector graphics editors and prototyping tools.' +
        ' It provides cloud-based storage for files and has very active community that shares designs and assets for public use.',
      link: 'https://www.figma.com/',
      percentage: 70,
    },
    {
      name: 'Git',
      imgUrl: '/logos/git-logo.svg',
      description: 'An open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency. It is the' +
        ' worlds most used VCS by developers.',
      link: 'https://git-scm.com/',
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
    <section className="px-6 py-10 sm:py-20 sm:px-20">
      <h1
        className="text-3xl md:text-6xl text-sans font-bold mb-1 md:mb-3 text-neutral-800 dark:text-neutral-100">Skills</h1>
      <h3
        className="text-base md:text-xl text-sans font-base text-neutral-800 mb-4 md:mb-10 dark:text-neutral-200">These
        are my weapons of choice.</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {skills.map(skill => {
          return <SkillCard key={skill.name}
                            imgUrl={skill.imgUrl}
                            name={skill.name}
                            description={skill.description}
                            link={skill.link}
                            percentage={skill.percentage} />;
        })}
      </div>
    </section>

  );
};

export default Skills;
