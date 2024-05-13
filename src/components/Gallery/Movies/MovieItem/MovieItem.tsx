import Image from 'next/image';
import StarIcon from '@mui/icons-material/Star';
import useBreakpoints from '~/hooks/useBreakpoints';

interface MovieProps {
  title: string;
  director: string;
  score: number;
  imgUrl: string;
  year?: number;
}

const MovieItem = ({ title, director, imgUrl, score, year }: MovieProps) => {
  const { xs } = useBreakpoints();
  return (
    <div
      className="relative flex h-full min-h-[240px] w-full flex-col items-start
      gap-3 rounded-xl bg-neutral-100 shadow hover:scale-[1.01] dark:bg-spacegray dark:bg-opacity-50 md:shadow-xl"
    >
      <div className="relative aspect-movie w-full">
        <Image
          src={imgUrl}
          fill
          alt={`${title} cover`}
          className="overflow-hidden rounded-t-lg"
          sizes="400px"
          quality={100}
        />
      </div>
      <div className="flex flex-col gap-1 px-4">
        <h3 className="text-lg font-bold leading-tight text-neutral-700 dark:text-neutral-200">
          {title}
        </h3>
        <h5 className="text-sm text-neutral-500 dark:text-neutral-400">
          {director} ({year}){' '}
        </h5>
      </div>
      <div className="h-[32px] w-full bg-transparent"></div>
      <div
        className="absolute bottom-2 right-2 flex w-fit flex-row items-center justify-between gap-1 self-end rounded-xl bg-spacegray bg-opacity-50 px-3
         py-1 dark:bg-black dark:bg-opacity-100 "
      >
        <StarIcon
          style={{ color: '#FFC728', fontSize: xs ? '14px' : '18px' }}
        />
        <span className="text-sm text-neutral-300 md:text-base">{`${score}`}</span>
      </div>
    </div>
  );
};

export default MovieItem;
