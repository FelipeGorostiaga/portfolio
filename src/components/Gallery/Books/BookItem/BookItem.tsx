import StarIcon from '@mui/icons-material/Star';
import useBreakpoints from '~/hooks/useBreakpoints';
import Image from 'next/image';

interface BookProps {
  title: string;
  author: string;
  imgUrl: string;
  rate: number;
  year: string;
}

const BookItem = ({ title, author, imgUrl, rate, year }: BookProps) => {
  const { xs } = useBreakpoints();
  return (
    <div
      className="flex flex-row items-start rounded-xl bg-neutral-100 dark:bg-spacegray w-full min-h-[240px] aspect-video
      shadow md:shadow-xl hover:scale-[1.01] relative dark:border dark:border-neutral-900">
      <div className="h-full aspect-book relative">
        <Image src={imgUrl} alt="Book cover" fill className="rounded-l-xl h-full w-full" />
      </div>
      <div className="flex flex-col items-start py-2 px-3 md:px-4 justify-between h-full w-full">
        <div className="flex flex-col gap-0 w-full">
          <span
            className="text-base xs:text-xl sm:text-base lg:text-lg font-bold sm:leading-tight dark:text-neutral-200 text-neutral-700">{title}</span>
          <span
            className="text-xs xs:text-sm dark:text-neutral-400 text-neutral-500 font-semibold">{`${author} (${year})`}</span>
        </div>
        <div
          className="flex flex-row  items-center justify-between rounded-xl px-3 py-1 gap-1 self-end bg-spacegray bg-opacity-50
          absolute right-2 bottom-2 dark:bg-black dark:bg-opacity-100 ">
          <StarIcon style={{ color: '#FFC728', fontSize: xs ? '14px' : '18px' }} />
          <span className="text-sm md:text-base text-neutral-300">{`${rate}`}</span>
        </div>
      </div>
    </div>
  );
};

export default BookItem;
