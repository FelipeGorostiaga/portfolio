import React, { useMemo, useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import useBreakpoints from '~/hooks/useBreakpoints';

interface QuoteProps {
  text: string;
  author: string;
  reference?: string;
}

const QuoteItem = ({ text, author, reference }: QuoteProps) => {
  const [showingMore, setShowingMore] = useState(false);
  const { md, lg } = useBreakpoints();

  const charactersToShow = useMemo(() => {
    if (!lg) {
      return 2000;
    }
    if (!md) {
      return 800;
    }
    return 500;
  }, [md, lg]);

  const requiresShowMore = text.length > charactersToShow;
  const authorText = `${author}${reference ? `, ${reference}` : ''}`;
  const shownText =
    text.length <= charactersToShow
      ? text
      : showingMore
      ? text
      : text.slice(0, charactersToShow) + '...';
  const viewMoreText = showingMore ? 'View Less' : 'View More';
  const showAuthor = (requiresShowMore && showingMore) || !requiresShowMore;

  return (
    <div
      className="flex flex-col gap-4 rounded-xl border-2 bg-neutral-200
       bg-opacity-80 px-8 pb-4 pt-6 shadow-lg dark:border-neutral-800 dark:bg-[#010003] md:rounded-xl"
    >
      <p className="font-sans text-base text-neutral-800 dark:text-neutral-100 md:text-lg">
        {shownText}
      </p>
      {showAuthor && (
        <div className="flex w-full flex-row justify-end">
          <span className="text-sm italic text-neutral-600 dark:text-neutral-400">
            {authorText}
          </span>
        </div>
      )}
      {requiresShowMore && (
        <div
          className="relative w-auto cursor-pointer text-sm text-blue-800"
          onClick={() => setShowingMore((prev) => !prev)}
        >
          {viewMoreText}
          <KeyboardArrowDownIcon
            className={`absolute -right-5 top-[0.85px] ${
              showingMore ? 'rotate-180' : 'rotate-0'
            } transition-transform`}
            fontSize="small"
            sx={{ color: '#4b5563' }}
          />
        </div>
      )}
    </div>
  );
};

export default QuoteItem;
