import Image from 'next/image';
import StarIcon from '@mui/icons-material/Star';
import useBreakpoints from '~/hooks/useBreakpoints';

interface MovieProps {
  title: string;
  director: string;
  rate: number;
  year: string;
  imgUrl: string;
}

const MovieItem = ({ title, director, imgUrl, rate, year }: MovieProps) => {
  const { xs } = useBreakpoints();
  return (
    <div
      className="flex flex-col justify-start w-full gap-3 rounded-lg bg-neutral-100 relative shadow md:shadow-xl hover:scale-[1.01]
       dark:bg-spacegray dark:bg-opacity-50">
      <div className="w-full aspect-[3.2/5] relative">
        <Image src={imgUrl} fill alt={`${title} cover`} className="overflow-hidden rounded-t-lg" />
      </div>
      <div className="px-4 flex flex-col gap-1">
        <h3 className="text-lg font-bold text-neutral-700 leading-tight dark:text-neutral-200">{title}</h3>
        <h5 className="text-sm text-neutral-500 dark:text-neutral-400">{director} ({year}) </h5>
      </div>
      <div className='w-full bg-transparent h-[32px]'></div>
      <div
        className="absolute right-2 bottom-2 flex flex-row items-center w-fit justify-between rounded-xl px-3 py-1 gap-1 self-end bg-spacegray
         bg-opacity-50 dark:bg-black dark:bg-opacity-100 ">
        <StarIcon style={{ color: '#FFC728', fontSize: xs ? '14px' : '18px' }} />
        <span className="text-sm md:text-base text-neutral-300">{`${rate}`}</span>
      </div>
    </div>
  );
};

export default MovieItem;
