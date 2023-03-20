interface Props {
  intro: string;
  responsibilities: string[];
}

const JobDescription = ({ intro, responsibilities }: Props) => {
  return (
    <div className="flex flex-col justify-start">
      <p className="mb-1">{intro}</p>
      <ul className="list-disc pl-6 pt-2">
        {responsibilities.map((responsibility, idx) => <li key={idx}>{responsibility}</li>)}
      </ul>
    </div>
  );
};

export default JobDescription;
