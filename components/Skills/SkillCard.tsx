interface SkillCardProps {
  imgUrl: string;
  name: string;
  description: string;
  link: string;
  percentage: number;
  color?: string;
}

const SkillCard = ({ name, description, imgUrl }: SkillCardProps) => {
  return (
    <div
      className="shadow-xl rounded-2xl border border-gray-300 bg-gray-100 flex flex-col max-w-sm gap-0
      overflow-hidden cursor-pointer 
      hover:scale-[1.008] hover:bg-gray-200 dark:bg-neutral-900 dark:border-neutral-900 group dark:shadow-lg dark:shadow-neutral-900">
      <div className="w-full flex items-center justify-center pt-8">
        <img src={imgUrl} className="h-[120px] aspect-square object-fit rounded-2xl group-hover:opacity-80 "
             alt={`${name} logo`} />
      </div>
      <div className="px-6 py-6 flex flex-col">
        <h1 className="text-2xl font-semibold font-sans text-neutral-700 dark:text-gray-200">{name}</h1>
        <p className="text-base font-sans mt-3 text-neutral-700 dark:text-gray-400">{description}</p>
      </div>
    </div>
  );
};

export default SkillCard;
