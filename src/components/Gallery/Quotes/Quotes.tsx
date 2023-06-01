import { api } from '~/utils/api';
import { type KeyboardEvent, useMemo, useState } from 'react';
import { QUOTES_PER_PAGE } from '~/utils/constants/gallery';
import QuoteItem from '@components/Gallery/Quotes/QuoteItem';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '~/contexts/ThemeContext';
import { CircularProgress, Pagination } from '@mui/material';
import useBreakpoints from '~/hooks/useBreakpoints';


const Quotes = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [activeSearchValue, setActiveSearchValue] = useState<string>('');
  const [page, setPage] = useState(1);
  const [inputFocused, setInputFocused] = useState(false);
  const { isDark } = useTheme();
  const { sm } = useBreakpoints();

  const skipValue = useMemo(() => {
    return page === 1 ? 0 : ((page - 1) * QUOTES_PER_PAGE);
  }, [page]);

  const { data, isLoading } = api.quotes.getAll.useQuery({
    value: activeSearchValue,
    skip: skipValue,
  });

  const quotes = useMemo(() => data?.data, [data]);
  const total = useMemo(() => data?.pagination.total, [data]);

  // TODO: show empty state
  const showEmptyState = !isLoading && quotes?.length === 0;
  const showPagination = !isLoading && !!total && (total > QUOTES_PER_PAGE);

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    // trigger search on action instead of input change (query value)
    setActiveSearchValue(searchValue);
  };

  const totalPages = useMemo(() => {
    if (total) {
      return Math.ceil(total / QUOTES_PER_PAGE);
    }
    return 0;
  }, [total]);

  return (
    <div className="px-8 max-w-7xl w-full md:px-14 2xl:px-0 flex flex-col gap-0 pt-8 md:pt-12 lg:pt-16 pb-10">
      <h1
        className="text-2xl md:text-4xl md:mb-1 font-semibold font-sans text-neutral-800 dark:text-neutral-100">
        Quotes
      </h1>
      <div
        className={`py-3 mt-3 px-5 bg-transparent dark:bg-transparent flex flex-row items-center justify-items-start
        gap-2 rounded-xl w-full md:w-[50%] lg:w-[400px] border ${inputFocused ? 'border-[#1976D2]' : (isDark ? 'border-neutral-700' : 'border-neutral-400')}`}>
        <input value={searchValue}
               onChange={e => setSearchValue(e.target.value)}
               className="outline-none bg-transparent font-sans w-full caret-blue-400 text-lg text-neutral-700 dark:text-neutral-300 placeholder:text-neutral-500"
               placeholder="Search by keyword, author..."
               onFocus={() => setInputFocused(true)}
               onBlur={() => setInputFocused(false)}
               onKeyDown={(e) => handleKeyPress(e)}
        />
        {(searchValue.length > 0 || inputFocused) &&
          <SearchIcon fontSize="medium" sx={{ color: '#1976D2' }} className="cursor-pointer"
                      onClick={() => handleSearch()} />}
      </div>
      <div className="flex flex-col w-full gap-6 mt-4 md:mt-8 md:gap-8 ">
        {!isLoading && quotes?.map(quote => {
          return <QuoteItem key={quote.id} {...quote} />;
        })}
      </div>
      {
        isLoading && (
          <div className="flex items-center justify-center w-full mt-6 md:mt-12">
            <CircularProgress size={sm ? '24px' : '32px'} sx={{
              color: '#3b82f6',
            }} />
          </div>
        )
      }
      {
        showPagination &&
        <div className="w-full flex flex-row items-center justify-center mt-10">
          <Pagination count={totalPages} page={page} onChange={(e, page) => setPage(page)}
                      size={sm ? 'small' : 'large'} />
        </div>
      }
    </div>
  );
};

export default Quotes;
