import MovieItem from '~/components/Gallery/Movies/MovieItem/MovieItem';
import { useEffect, useMemo, useState } from 'react';
import useBreakpoints from '~/hooks/useBreakpoints';
import {
  DEBOUNCE_DELAY,
  MOVIES_PER_PAGE,
  type SortCriteria,
  type SortDirection,
} from '~/utils/constants/gallery';
import { Pagination } from '@mui/material';
import Filters from '~/components/Gallery/Filters/Filters';
import MovieItemSkeleton from '@components/Gallery/Movies/MovieItem/MovieItemSkeleton';
import useDebounce from '~/hooks/useDebounce';
import { useQuery } from '@tanstack/react-query';
import { fetchMovies } from '~/server/gallery/movies';

const Movies = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedSearchValue = useDebounce<string>(searchValue, DEBOUNCE_DELAY);
  const [sortCriteria, setSortCriteria] = useState<SortCriteria>('score');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [page, setPage] = useState(1);
  const { sm } = useBreakpoints();

  const { data: paginatedMovies, isLoading } = useQuery(
    ['movies', debouncedSearchValue, sortCriteria, sortDirection, page],
    () => fetchMovies(page, debouncedSearchValue, sortCriteria, sortDirection),
    {
      keepPreviousData: true,
      staleTime: 5000,
    },
  );

  const movies = useMemo(() => paginatedMovies?.data, [paginatedMovies]);
  const total = useMemo(() => paginatedMovies?.total, [paginatedMovies]);
  const totalPages = useMemo(
    () => paginatedMovies?.totalPages,
    [paginatedMovies],
  );

  const disabled = isLoading || !movies || movies?.length <= 1;

  const filterProps = {
    searchValue,
    setSearchValue,
    sortCriteria,
    setSortCriteria,
    sortDirection,
    setSortDirection,
    disabled,
    searchPlaceholder: 'Search by title, director...',
  };

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchValue, sortDirection, sortCriteria]);

  const showEmptyState = !isLoading && movies?.length === 0;
  const showPagination = !isLoading && !!total && total > MOVIES_PER_PAGE;

  return (
    <div className="flex w-full max-w-7xl flex-col gap-0 px-8 pb-10 pt-8 md:px-14 md:pt-12 lg:pt-16 2xl:px-0">
      <h1 className="font-sans text-2xl font-semibold text-neutral-800 dark:text-neutral-100 md:mb-1 md:text-4xl">
        Movies
      </h1>
      <Filters {...filterProps} />
      <div className="flex flex-col gap-4 xs:grid xs:grid-cols-2 xs:place-items-start sm:grid-cols-3 md:mt-2 md:gap-6 lg:grid-cols-4 xl:grid-cols-5">
        {isLoading &&
          Array.from(Array(10)).map((n, idx) => {
            return <MovieItemSkeleton key={idx} />;
          })}
        {!isLoading &&
          movies?.map((movie) => <MovieItem key={movie.id} {...movie} />)}
      </div>
      {showEmptyState && (
        <div className="w-full pl-2 pt-6 text-base text-slate-800 dark:text-neutral-300 md:text-lg lg:text-xl">
          No results were found...
        </div>
      )}
      {showPagination && (
        <div className="mt-10 flex w-full flex-row items-center justify-center">
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, page) => setPage(page)}
            size={sm ? 'small' : 'large'}
          />
        </div>
      )}
    </div>
  );
};

export default Movies;
