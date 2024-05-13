import StarIcon from '@mui/icons-material/Star';
import useBreakpoints from '~/hooks/useBreakpoints';
import Image from 'next/image';

interface BookProps {
  title: string;
  author: string;
  imgUrl: string;
  score: number;
  year?: number;
}

const BookItem = ({ title, author, imgUrl, score, year }: BookProps) => {
  const { xs } = useBreakpoints();
  const yearText = year ? `(${year})` : '';
  return (
    <div
      className="relative flex aspect-video min-h-[240px] w-full flex-row items-start rounded-xl bg-neutral-100
      shadow hover:scale-[1.01] dark:border dark:border-neutral-900 dark:bg-spacegray md:shadow-xl"
    >
      <div className="relative aspect-book h-full min-h-max">
        <Image
          src={imgUrl}
          alt="Book cover"
          fill
          className="h-full w-full rounded-l-xl"
        />
      </div>
      <div className="flex h-full w-full flex-col items-start justify-between px-3 py-2 md:px-4">
        <div className="flex w-full flex-col gap-0">
          <span className="text-base font-bold text-neutral-700 dark:text-neutral-200 xs:text-xl sm:text-base sm:leading-tight lg:text-lg">
            {title}
          </span>
          <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 xs:text-sm">{`${author} ${yearText}`}</span>
        </div>
        <div
          className="absolute bottom-2  right-2 flex flex-row items-center justify-between gap-1 self-end rounded-xl bg-spacegray
          bg-opacity-50 px-3 py-1 dark:bg-black dark:bg-opacity-100 "
        >
          <StarIcon
            style={{ color: '#FFC728', fontSize: xs ? '14px' : '18px' }}
          />
          <span className="text-sm text-neutral-300 md:text-base">{`${score}`}</span>
        </div>
      </div>
    </div>
  );
};

export default BookItem;
