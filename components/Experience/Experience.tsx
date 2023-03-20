import JobItem, { JobProps } from './JobItem/JobItem';
import Timeline from './Timeline/Timeline';
import JobDescription from './JobDescription/JobDescription';


const transactionalProps = {
  intro: 'Member of the transactional team of the b2b web application',
  responsibilities: [
    'Develop React components for the business-to-business web application that adjust to the high fidelity designs provided by the design team',
    'Develop highly customizable components used by multiple teams in a micro frontend architecture',
    'Develop, test and deploy microservices using NestJS with special attention to the security concerns',
  ],
};

const domeProps = {
  intro: 'Lead developer of a 4 person team for a crypto startup',
  responsibilities: [
    'Design the software architecture taking into account costs, scalability and performance',
    'Develop the backend Rest API',
    'Develop the frontend application',
    'Develop cron tasks',
    'Develop serverless functions',
    'Integrate the application with multiple web3 providers and APIs',
    'Manage and deploy the software infrastructure',
    'Advise in the UI/UX design',
  ],
};

const mobileProps = {
  intro: 'Member of the core team of the b2b mobile application',
  responsibilities: [
    'Develop, test and deploy microservices using NestJS',
    'Make decisions about the technical aspects of the BFF architecture',
  ],
};

const troncalProps = {
  intro: 'Member of the core team of the b2b web application',
  responsibilities: [
    'Develop React components for the frontend application',
    'Develop, test and deploy microservices using NestJS',
  ],
}

const bymaProps = {
  intro: 'Member of the Investor relations team',
  responsibilities: [
    'Create interactive dashboards to provide insights on historical market activity',
    'Develop cron tasks to parse daily market activity',
    'Participate in the analysis and presentation of the Quarterly Reports',
  ],
}


const jobs: JobProps[] = [
  {
    title: 'Senior Fullstack Developer',
    companyName: 'Banco Galicia',
    startDate: new Date(),
    endDate: new Date(),
    current: true,
    imgSrc: '/logos/galicia-logo.png',
    companyLink: '',
    description: <JobDescription {...transactionalProps}/>,
    pillList: [
      {
        label: 'NestJS',
        className: 'text-sm text-white font-base rounded-full bg-[#E0234E]',
      },
      {
        label: 'Next.js',
        className: 'text-sm text-white font-base rounded-full bg-black',
      },
    ],
  },
  {
    title: 'Backend Developer',
    companyName: 'Banco Galicia',
    startDate: new Date(2022, 11, 1),
    endDate: new Date(2023, 2, 1),
    imgSrc: '/logos/galicia-logo.png',
    companyLink: '',
    pillList: [
      {
        label: 'NestJS',
        className: 'text-sm text-white font-base rounded-full bg-[#E0234E]',
      },
      {
        label: 'Datagrid',
        className: 'text-sm text-white font-base rounded-full bg-black',
      },
    ],
    description: <JobDescription {...mobileProps} />,
  },
  {
    title: 'Software Engineer',
    companyName: 'Dome.xyz',
    startDate: new Date(2021, 0, 19),
    endDate: new Date(),
    imgSrc: '/logos/dome-logo.svg',
    companyLink: 'https://',
    description: <JobDescription {...domeProps} />,
    pillList: [
      {
        label: 'NestJS',
        className: 'text-sm text-white font-base rounded-full bg-[#E0234E]',
      },
      {
        label: 'Next.js',
        className: 'text-sm text-white font-base rounded-full bg-black',
      },

      {
        label: 'PostgreSQL',
        className: 'text-sm text-white font-base rounded-full bg-[#679CC7]',
      },
      {
        label: 'AWS',
        className: 'text-sm text-white font-base rounded-full bg-[#232F3E]',
      },
      {
        label: 'Vercel',
        className: 'text-sm text-white font-base rounded-full bg-[#8026C3]',
      },
    ],
  },
  {
    title: 'Junior Developer',
    companyName: 'Banco Galicia',
    startDate: new Date(),
    endDate: new Date(),
    imgSrc: '/logos/galicia-logo.png',
    companyLink: '',
    pillList: [
      {
        label: 'NestJS',
        className: 'text-sm text-white font-base rounded-full bg-[#E0234E]',
      },
      {
        label: 'Next.js',
        className: 'text-sm text-white font-base rounded-full bg-black',
      },
    ],
    description: <JobDescription {...troncalProps} />,
  },
  {
    title: 'Business Intelligence Developer',
    companyName: 'Bolsas y Mercados Argentinos',
    companyLink: '',
    imgSrc: '/logos/byma-logo.png',
    startDate: new Date(),
    endDate: new Date(),
    description: <JobDescription {...bymaProps} />,
    pillList: [
      {
        label: 'Python',
        className: 'text-sm text-white font-base rounded-full bg-[#417FB1]',
      },
      {
        label: 'Power BI',
        className: 'text-sm text-white font-base rounded-full bg-[#F2B915]',
      },
    ],
  },
];

const Experience = () => {
  return (
    <section className="px-6 py-10 sm:py-20 sm:px-20 max-w-7xl">
      <h1
        className="text-3xl md:text-6xl text-sans font-bold mb-1 md:mb-3 text-neutral-800 dark:text-gray-50">
        Experience
      </h1>
      <h3
        className="text-base md:text-xl text-sans font-base text-neutral-800 mb-4 md:mb-12 dark:text-neutral-200">
        My jobs through the years.
      </h3>
      <div className="flex flex-col items-start w-full">
        {jobs.map((job, index) => {
          const isLast = index === (jobs.length - 1);
          return (
            <div className="flex flex-row gap-10 w-full" key={`${job.startDate.getDate()} ${job.title}`}>
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
