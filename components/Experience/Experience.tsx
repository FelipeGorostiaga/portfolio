import JobItem, { JobProps } from './JobItem/JobItem';
import Timeline from './Timeline/Timeline';

const TransactionalJob = () => {
  return (
    <div>
      <p className="mb-1">Member of the transactional team of the b2b web application</p>
      <ul className="list-disc pl-6 pt-2">
        <li>Develop React components for the business-to-business web application that adjust to the high fidelity designs provided by the design team</li>
        <li>Develop highly customizable components used by multiple teams in a micro frontend architecture</li>
        <li>Develop, test and deploy microservices using NestJS with special attention to the security concerns</li>
      </ul>
    </div>
  );
};

const DomeJob = () => {
  return (
    <div>
      <p>Lead developer of a 4 person team for a crypto startup</p>
      <ul className="list-disc pl-6 pt-2">
        <li>Design the software architecture taking into account costs, scalability and performance</li>
        <li>Develop the backend Rest API</li>
        <li>Develop the frontend application</li>
        <li>Develop cron tasks</li>
        <li>Develop serverless functions</li>
        <li>Integrate the application with multiple web3 providers and APIs</li>
        <li>Manage and deploy the software infrastructure</li>
        <li>Advise in the UI/UX design</li>
      </ul>
    </div>
  );
};

const MobileJob = () => {
  return (
    <div>
      <p className="mb-1">Member of the core team of the b2b mobile application</p>
      <ul className="list-disc pl-6 pt-2">
        <li>Develop, test and deploy microservices using NestJS</li>
        <li>Make decisions about the technical aspects of the BFF architecture</li>
      </ul>
    </div>
  );
};

const TroncalJob = () => {
  return (
    <div>
      <p className="mb-1">Member of the core team of the b2b web application</p>
      <ul className="list-disc pl-6 pt-2">
        <li>Develop React components for the frontend application</li>
        <li>Develop, test and deploy microservices using NestJS</li>
      </ul>
    </div>
  );
};

const BYMAJob = () => {
  return (
    <div>

    </div>
  )
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
    description: <TransactionalJob />,
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
    description: <MobileJob />,
  },
  {
    title: 'Software Engineer',
    companyName: 'Dome.xyz',
    startDate: new Date(2021, 0, 19),
    endDate: new Date(),
    imgSrc: '/logos/dome-logo.svg',
    companyLink: 'https://',
    description: <DomeJob />,
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
        className: 'text-sm text-white dark:text-black font-base rounded-full bg-[#8026C3] dark:bg-white',
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
    description: <TroncalJob />,
  },
  {
    title: 'Business Intelligence Developer',
    companyName: 'Bolsas y Mercados Argentinos',
    companyLink: '',
    imgSrc: '/logos/byma-logo.png',
    startDate: new Date(),
    endDate: new Date(),
    description: 'Creat interactive and visually appealing dashboards to provide insights of market activity',
    pillList: [
      {
        label: 'Python',
        className: 'text-sm text-white dark:text-black font-base rounded-full bg-[#417FB1]',
      },
      {
        label: 'Power BI',
        className: 'text-sm text-white dark:text-black font-base rounded-full bg-[#F2B915]',
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
