interface Props {
  intro: string;
  responsibilities: string[];
}

const JobDescription = ({ intro, responsibilities }: Props) => {
  return (
    <div className="flex flex-col justify-start">
      <p className="mb-1 dark:text-neutral-300">{intro}</p>
      <ul className="list-disc pl-6 pt-2">
        {responsibilities.map((responsibility, idx) => <li key={idx} className='dark:text-neutral-300'>{responsibility}</li>)}
      </ul>
    </div>
  );
};

export default JobDescription;
