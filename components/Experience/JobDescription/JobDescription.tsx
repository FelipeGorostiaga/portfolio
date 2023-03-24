interface Props {
  intro: string;
  responsibilities: string[];
}

const JobDescription = ({ intro, responsibilities }: Props) => {
  return (
    <div className="flex flex-col justify-start">
      <p className="text-xs md:text-base mb-1 dark:text-[#adadad]">{intro}</p>
      <ul className="list-disc pl-4 md:pl-6 pt-2">
        {responsibilities.map((responsibility, idx) => <li key={idx} className='text-xs mb-2 md:mb-0 md:text-base dark:text-[#adadad]'>{responsibility}</li>)}
      </ul>
    </div>
  );
};

export default JobDescription;
