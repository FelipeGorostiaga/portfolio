import SkillCard from './SkillCard';

const Skills = () => {

  const skillsMock = [
    {
      name: 'Typescript',
      imgUrl: '/logos/ts-logo.svg',
      description: 'Strongly typed programming language that builds on top of JavaScript that adds additional syntax and better tooling without additional code',
      link: 'https://reactjs.org/',
      percentage: 85,
    },
    {
      name: 'React',
      imgUrl: '/logos/react-logo.svg',
      description: 'A JavaScript library for building user interfaces. It takes a component-based approach in which encapsulated components are composed in a tree structure to make complex UIs.',
      link: 'https://reactjs.org/',
      percentage: 85,
    },
    {
      name: 'Next.js',
      imgUrl: '/logos/nextjs-logo.svg',
      description: 'A JavaScript library for building user interfaces. It takes a component-based approach in which encapsulated components are composed in a tree structure to make complex UIs.',
      link: 'https://reactjs.org/',
      percentage: 85,
    },
    {
      name: 'Node.js',
      imgUrl: '/logos/nodejs-icon.svg',
      description: 'A JavaScript library for building user interfaces. It takes a component-based approach in which encapsulated components are composed in a tree structure to make complex UIs.',
      link: 'https://reactjs.org/',
      percentage: 85,
    },
  ];

   // nest js, express, java, spring, sql,

  return (
    <section className="grid grid-cols-3 gap-6 py-20 px-20">
      {skillsMock.map(skill => {
        return <SkillCard key={skill.name} imgUrl={skill.imgUrl} name={skill.name} description={skill.description}
                          link={skill.link} percentage={skill.percentage} />;
      })}
    </section>
  );
};

export default Skills;
