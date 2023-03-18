import JobItem, { JobProps } from './JobItem/JobItem';
import Timeline from './Timeline/Timeline';

const Test = () => {
  return (
    <ul>
      <li>This is number 1</li>
      <li>This is number 2</li>
      <li>This is number 3</li>
    </ul>
  );
}

const jobs: JobProps[] = [
  {
    title: 'Sr. Fullstack Developer',
    companyName: 'Banco Galicia',
    startDate: new Date(),
    endDate: new Date(),
    current: true,
    imgSrc: '/logos/galicia-logo-round.png',
    companyLink: '',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In hac habitasse platea dictumst quisque sagittis purus sit amet. Risus viverra adipiscing at in tellus integer feugiat scelerisque. Hendrerit dolor magna eget est lorem ipsum dolor sit amet. Adipiscing diam donec adipiscing tristique. Sodales neque sodales ut etiam sit amet nisl. Vitae congue mauris rhoncus aenean vel elit. Ipsum a arcu cursus vitae congue mauris rhoncus aenean. Nunc sed augue lacus viverra vitae congue eu consequat. Egestas purus viverra accumsan in. Quis eleifend quam adipiscing vitae. Auctor elit sed vulputate mi.',
  },
  {
    title: 'Backend Developer',
    companyName: 'Banco Galicia',
    startDate: new Date(),
    endDate: new Date(),
    imgSrc: '/logos/galicia-logo-round.png',
    companyLink: '',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In hac habitasse platea dictumst quisque sagittis purus sit amet. Risus viverra adipiscing at in tellus integer feugiat scelerisque. Hendrerit dolor magna eget est lorem ipsum dolor sit amet. Adipiscing diam donec adipiscing tristique. Sodales neque sodales ut etiam sit amet nisl. Vitae congue mauris rhoncus aenean vel elit. Ipsum a arcu cursus vitae congue mauris rhoncus aenean. Nunc sed augue lacus viverra vitae congue eu consequat. Egestas purus viverra accumsan in. Quis eleifend quam adipiscing vitae. Auctor elit sed vulputate mi.',
  },
  {
    title: 'Fullstack Developer',
    companyName: 'Banco Galicia',
    startDate: new Date(),
    endDate: new Date(),
    imgSrc: '/logos/galicia-logo-round.png',
    companyLink: '',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In hac habitasse platea dictumst quisque sagittis purus sit amet. Risus viverra adipiscing at in tellus integer feugiat scelerisque. Hendrerit dolor magna eget est lorem ipsum dolor sit amet. Adipiscing diam donec adipiscing tristique. Sodales neque sodales ut etiam sit amet nisl. Vitae congue mauris rhoncus aenean vel elit. Ipsum a arcu cursus vitae congue mauris rhoncus aenean. Nunc sed augue lacus viverra vitae congue eu consequat. Egestas purus viverra accumsan in. Quis eleifend quam adipiscing vitae. Auctor elit sed vulputate mi.',
  },
  {
    title: 'Business Intelligence Developer',
    companyName: 'Bolsas y Mercados Argentinos (BYMA)',
    companyLink: '',
    imgSrc: '/logos/galicia-logo-round.png',
    startDate: new Date(),
    endDate: new Date(),
    description: <Test />
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
        className="text-base md:text-xl text-sans font-base text-neutral-800 mb-4 md:mb-10 dark:text-neutral-200">
        My jobs through the years.
      </h3>
      <div >
        {jobs.map(job => {
          return (
            <div className='flex flex-row' key={`${job.startDate.getDate()} ${job.title}`}>
              <Timeline/>
              <JobItem {...job} />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Experience;
