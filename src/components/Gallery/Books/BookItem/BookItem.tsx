import Image from 'next/image';
import StarIcon from '@mui/icons-material/Star';
import useBreakpoints from '~/hooks/useBreakpoints';

interface BookProps {
  title: string;
  author: string;
  imgUrl: string;
  score: number;
}

const BookItem = ({ title, author, imgUrl, score }: BookProps) => {
  const { xs } = useBreakpoints();
  return (
    <div
      className="flex flex-row items-start rounded-xl bg-neutral-100 dark:bg-spacegray w-full min-h-[200px] aspect-video
      shadow md:shadow-xl hover:scale-[1.01]">
      <div className="h-full aspect-book relative">
        <img src={imgUrl} alt="Book cover" className="rounded-l-xl h-full w-full" />
      </div>
      <div className="flex flex-col items-start py-2 px-3 md:px-4 justify-between h-full w-full">
        <div className="flex flex-col gap-0 sm:gap-1">
          <h3 className="text-base xs:text-xl sm:text-base font-bold sm:leading-tight dark:text-neutral-200">{title}</h3>
          <h5 className="text-xs xs:text-sm dark:text-neutral-400">{author}</h5>
        </div>
        <div
          className="flex flex-row bg-black items-center justify-between rounded-xl px-3 py-1 gap-1 self-end bg-opacity-60">
          <StarIcon style={{ color: '#FFC728', fontSize: xs ? '14px' : '18px' }} />
          <span className="text-sm md:text-base text-neutral-200">{`${score}`}</span>
        </div>
      </div>
    </div>
  );
};

export default BookItem;
