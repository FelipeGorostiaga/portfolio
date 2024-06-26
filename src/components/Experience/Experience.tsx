import JobItem, { type JobProps } from './JobItem/JobItem';
import Timeline from './Timeline/Timeline';
import JobDescription from './JobDescription/JobDescription';

const humandProps = {
  intro: 'Front end developer for the Humand platform',
  responsibilities: [
    'Develop responsive and accessible components for the Humand platform using React and Material-UI',
    'Review PRs and provide feedback to the team members to ensure the quality of the codebase',
  ],
};

const scaleProps = {
  intro: 'Freelancer - Reviewer and Task writer',
  responsibilities: [
    'Review LLM responses for computer science and STEM related prompts',
    'Rewrite LLM responses to comply with the highest standards',
    'Assess the quality of prompt/responses identifying weak points that need improvement',
  ],
};

const transactionalProps = {
  intro: 'Member of the transactional team of the B2B web application',
  responsibilities: [
    'Develop React components for the business-to-business web application that adjust to the high fidelity designs provided by the design team',
    'Develop highly customizable components used by multiple teams in a micro frontend architecture',
    'Develop, test and deploy microservices using NestJS with special attention to the security concerns',
  ],
};

const domeProps = {
  intro:
    'Freelancer - Lead developer of a four person team for a crypto startup',
  responsibilities: [
    'Design the software architecture taking into account costs, scalability and performance',
    'Develop the backend Rest API',
    'Develop the frontend application',
    'Develop cron tasks',
    'Develop serverless functions',
    'Integrate the application with multiple web3 providers and APIs',
    'Manage and deploy the software infrastructure',
    'Advise in the UI/UX design process',
  ],
};

const mobileProps = {
  intro: 'Member of the core team of the B2B mobile application',
  responsibilities: [
    'Develop, test and deploy microservices using NestJS',
    'Make decisions about the technical aspects of the BFF architecture',
  ],
};

const troncalProps = {
  intro: 'Member of the core team of the B2B web application',
  responsibilities: [
    'Develop React components for the frontend application',
    'Develop, test and deploy microservices using NestJS',
  ],
};

const bymaProps = {
  intro: 'Member of the Investor relations team',
  responsibilities: [
    'Create interactive dashboards to provide insights on historical market activity',
    'Develop cron tasks to parse daily market activity',
    'Participate in the analysis and presentation of the Quarterly Reports',
  ],
};

const jobs: JobProps[] = [
  {
    title: 'React Software Engineer',
    companyName: 'Humand',
    startDate: new Date(2024, 1, 14),
    endDate: new Date(),
    current: true,
    imgSrc: '/humand.png',
    companyLink: 'https://humand.co/',
    description: <JobDescription {...humandProps} />,
    pillList: [
      {
        label: 'React',
        className:
          'text-xs md:text-sm text-white font-base rounded-full bg-[#149ECA]',
      },
      {
        label: 'Material UI',
        className:
          'text-xs md:text-sm text-white font-base rounded-full bg-[#007FFF]',
      },
    ],
  },
  {
    title: 'Prompt Engineer',
    companyName: 'Scale AI',
    startDate: new Date(2023, 5, 1),
    endDate: new Date(),
    current: true,
    imgSrc: '/logos/scale-logo.svg',
    companyLink: 'https://scale.com/',
    description: <JobDescription {...scaleProps} />,
    pillList: [
      {
        label: 'AI',
        className:
          'text-xs md:text-sm text-white font-base rounded-full bg-[#06b6d4]',
      },
      {
        label: 'Computer Science',
        className:
          'text-xs md:text-sm text-white font-base rounded-full bg-[#16a34a]',
      },
    ],
  },
  {
    title: 'Senior Fullstack Developer',
    companyName: 'Banco Galicia',
    startDate: new Date(),
    endDate: new Date(),
    current: true,
    imgSrc: '/logos/galicia-logo.png',
    companyLink: 'https://www.galicia.ar/empresas',
    description: <JobDescription {...transactionalProps} />,
    pillList: [
      {
        label: 'NestJS',
        className:
          'text-xs md:text-sm text-white font-base rounded-full bg-[#E0234E]',
      },
      {
        label: 'Next.js',
        className:
          'text-xs md:text-sm text-white font-base rounded-full bg-black',
      },
    ],
  },
  {
    title: 'Backend Developer',
    companyName: 'Banco Galicia',
    startDate: new Date(2022, 10, 1),
    endDate: new Date(2023, 2, 1),
    imgSrc: '/logos/galicia-logo.png',
    companyLink: 'https://www.galicia.ar/empresas',
    pillList: [
      {
        label: 'NestJS',
        className:
          'text-xs md:text-sm text-white font-base rounded-full bg-[#E0234E]',
      },
      {
        label: 'Datagrid',
        className:
          'text-xs md:text-sm text-white font-base rounded-full bg-black',
      },
    ],
    description: <JobDescription {...mobileProps} />,
  },
  {
    title: 'Software Engineer',
    companyName: 'Dome.xyz',
    startDate: new Date(2022, 3, 1),
    endDate: new Date(2022, 11, 1),
    imgSrc: '/logos/dome-logo.svg',
    companyLink: 'https://www.mydome.xyz',
    description: <JobDescription {...domeProps} />,
    pillList: [
      {
        label: 'NestJS',
        className:
          'text-xs md:text-sm text-white font-base rounded-full bg-[#E0234E]',
      },
      {
        label: 'Next.js',
        className:
          'text-xs md:text-sm text-white font-base rounded-full bg-black',
      },

      {
        label: 'PostgreSQL',
        className:
          'text-xs md:text-sm text-white font-base rounded-full bg-[#679CC7]',
      },
      {
        label: 'AWS',
        className:
          'text-xs md:text-sm text-white font-base rounded-full bg-[#232F3E]',
      },
      {
        label: 'Vercel',
        className:
          'text-xs md:text-sm text-white font-base rounded-full bg-[#8026C3]',
      },
    ],
  },
  {
    title: 'Junior Developer',
    companyName: 'Banco Galicia',
    startDate: new Date(2021, 11, 1),
    endDate: new Date(2022, 10, 1),
    imgSrc: '/logos/galicia-logo.png',
    companyLink: 'https://www.galicia.ar/empresas',
    pillList: [
      {
        label: 'NestJS',
        className:
          'text-xs md:text-sm text-white font-base rounded-full bg-[#E0234E]',
      },
      {
        label: 'Next.js',
        className:
          'text-xs md:text-sm text-white font-base rounded-full bg-black',
      },
    ],
    description: <JobDescription {...troncalProps} />,
  },
  {
    title: 'Business Intelligence Developer',
    companyName: 'Bolsas y Mercados Argentinos',
    companyLink: 'https://www.byma.com.ar/',
    imgSrc: '/logos/byma-logo.png',
    startDate: new Date(2020, 5, 1),
    endDate: new Date(2020, 11, 1),
    description: <JobDescription {...bymaProps} />,
    pillList: [
      {
        label: 'Python',
        className:
          'text-xs md:text-sm text-white font-base rounded-full bg-[#417FB1]',
      },
      {
        label: 'Power BI',
        className:
          'text-xs md:text-sm text-white font-base rounded-full bg-[#F2B915]',
      },
    ],
  },
];

const Experience = () => {
  return (
    <section className="max-w-7xl px-6 py-10 sm:px-20 sm:py-20">
      <h1 className="text-sans mb-1 text-3xl font-bold text-neutral-800 dark:text-neutral-100 md:mb-3 md:text-6xl">
        Experience
      </h1>
      <h3 className="text-sans font-base mb-4 text-base text-neutral-800 dark:text-neutral-200 md:mb-12 md:text-xl">
        My jobs through the years
      </h3>
      <div className="flex w-full flex-col items-start">
        {jobs.map((job, index) => {
          const isLast = index === jobs.length - 1;
          return (
            <div
              className="flex w-full flex-row gap-2 md:gap-10"
              key={`${job.startDate.getDate()} ${job.title}`}
            >
              <Timeline showBar={!isLast} />
              <JobItem {...job} />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Experience;
