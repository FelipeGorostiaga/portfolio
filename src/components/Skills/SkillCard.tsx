import styles from './SkillCard.module.scss';
import Link from 'next/link';

interface SkillCardProps {
  imgUrl: string;
  name: string;
  description: string;
  link: string;
  percentage: number;
  color?: string;
}

const SkillCard = ({ name, description, imgUrl, link }: SkillCardProps) => {
  return (
    <Link
      href={link}
      target="_blank" rel="noopener noreferrer"
      className={"shadow-xl rounded-2xl border border-gray-300 bg-gray-100 flex flex-col max-w-sm " +
        "gap-0 overflow-hidden cursor-pointer hover:scale-[1.008] " +
        `hover:bg-gray-200 dark:bg-neutral-900 dark:border-neutral-900 group ${styles.card}`}>
      <div className="w-full flex items-center justify-center pt-8">
        <img src={imgUrl}
             className="h-[90px] md:h-[120px] aspect-square object-fit group-hover:opacity-80"
             alt={`${name} logo`} />
      </div>
      <div className="px-6 pt-6 pb-8 flex flex-col">
        <h1 className="text-xl md:text-2xl font-semibold font-sans text-neutral-700 dark:text-gray-200">{name}</h1>
        <p className="text-sm md:text-base font-sans mt-3 text-neutral-700 dark:text-neutral-300">{description}</p>
      </div>
    </Link>
  );
};

export default SkillCard;
