import { useEffect, useMemo, useState } from 'react';
import { DEBOUNCE_DELAY, QUOTES_PER_PAGE } from '~/utils/constants/gallery';
import QuoteItem from '@components/Gallery/Quotes/QuoteItem';
import { useTheme } from '~/contexts/ThemeContext';
import { CircularProgress, Pagination } from '@mui/material';
import useBreakpoints from '~/hooks/useBreakpoints';
import { useQuery } from '@tanstack/react-query';
import { fetchQuotes } from '~/server/gallery/quotes';
import useDebounce from '~/hooks/useDebounce';

const Quotes = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedSearchValue = useDebounce<string>(searchValue, DEBOUNCE_DELAY);
  const [page, setPage] = useState(1);
  const [inputFocused, setInputFocused] = useState(false);
  const { isDark } = useTheme();
  const { sm } = useBreakpoints();

  const { data: paginatedQuotes, isLoading } = useQuery(
    ['quotes', debouncedSearchValue, page],
    () => fetchQuotes(page, debouncedSearchValue),
    {
      keepPreviousData: true,
      staleTime: 5000,
    },
  );

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchValue]);

  const quotes = useMemo(() => paginatedQuotes?.data, [paginatedQuotes]);
  const total = useMemo(() => paginatedQuotes?.total, [paginatedQuotes]);
  const totalPages = useMemo(
    () => paginatedQuotes?.totalPages ?? 0,
    [paginatedQuotes],
  );

  const showEmptyState = !isLoading && paginatedQuotes?.data?.length === 0;
  const showPagination = !isLoading && !!total && total > QUOTES_PER_PAGE;

  return (
    <div className="flex w-full max-w-7xl flex-col gap-0 px-8 pb-10 pt-8 md:px-14 md:pt-12 lg:pt-16 2xl:px-0">
      <h1 className="font-sans text-2xl font-semibold text-neutral-800 dark:text-neutral-100 md:mb-1 md:text-4xl">
        Quotes
      </h1>
      <div
        className={`mt-3 flex w-full flex-row items-center justify-items-start gap-2 rounded-xl border
        bg-transparent px-5 py-3 dark:bg-transparent md:w-[50%] lg:w-[400px] ${
          inputFocused
            ? 'border-[#1976D2]'
            : isDark
            ? 'border-neutral-700'
            : 'border-neutral-400'
        }`}
      >
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full bg-transparent font-sans text-lg text-neutral-700 caret-blue-400 outline-none placeholder:text-neutral-500 dark:text-neutral-300"
          placeholder="Search by keyword, author..."
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
        />
      </div>
      <div className="mt-4 flex w-full flex-col gap-6 md:mt-8 md:gap-8 ">
        {!isLoading &&
          quotes?.map((quote) => {
            return <QuoteItem key={quote.id} {...quote} />;
          })}
        {showEmptyState && (
          <div className="w-full pl-2 pt-6 text-base text-slate-800 dark:text-neutral-300 md:text-lg lg:text-xl">
            No results were found...
          </div>
        )}
      </div>
      {isLoading && (
        <div className="mt-6 flex w-full items-center justify-center md:mt-12">
          <CircularProgress
            size={sm ? '24px' : '32px'}
            sx={{
              color: '#3b82f6',
            }}
          />
        </div>
      )}
      {showPagination && (
        <div className="mt-10 flex w-full flex-row items-center justify-center">
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, page) => setPage(page)}
            size={sm ? 'small' : 'large'}
          />
        </div>
      )}
    </div>
  );
};

export default Quotes;
