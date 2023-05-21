import React, { useMemo, useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import useBreakpoints from '~/hooks/useBreakpoints';

interface QuoteProps {
  text: string;
  author: string;
  reference: string | null;
}

const QuoteItem = ({ text, author, reference }: QuoteProps) => {
  const [showingMore, setShowingMore] = useState(false);
  const { sm, md, lg } = useBreakpoints();

  const charactersToShow = useMemo(() => {
    if (!lg) {
      return 2000;
    }
    if (!md) {
      return 800;
    }
    return 500;
  }, [text, sm, md, lg]);

  const requiresShowMore = text.length > charactersToShow;
  const authorText = `${author}${reference ? `, ${reference}` : ''}`;
  const shownText = (text.length <= charactersToShow) ? text : showingMore ? text : (text.slice(0, charactersToShow) + '...');
  const viewMoreText = showingMore ? 'View Less' : 'View More';
  const showAuthor = (requiresShowMore && showingMore) || (!requiresShowMore);

  return (
    <div
      className="flex flex-col gap-4 bg-neutral-200 dark:bg-spacegray bg-opacity-80
       dark:border-neutral-800 md:border-l-0 md:rounded-xl px-8 pt-6 pb-4 shadow-lg rounded-xl">
      <p
        className="text-base md:text-lg font-sans text-neutral-800 dark:text-neutral-200">{shownText}</p>
      {showAuthor && (
        <div className="flex flex-row justify-end w-full">
          <span className="text-sm italic text-neutral-600 dark:text-neutral-400">{authorText}</span>
        </div>
      )}
      {(requiresShowMore) && (
        <div className="relative w-auto text-blue-800 cursor-pointer text-sm" onClick={() => setShowingMore(prev => !prev)}>
          {viewMoreText}
          <KeyboardArrowDownIcon
            className={`absolute top-[0.85px] -right-5 ${showingMore ? 'rotate-180' : 'rotate-0'} transition-transform`}
            fontSize="small" sx={{ color: '#4b5563' }} />
        </div>
      )}
    </div>
  );
};

export default QuoteItem;


