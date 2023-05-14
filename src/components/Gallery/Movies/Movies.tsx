import MovieItem from '~/components/Gallery/Movies/MovieItem/MovieItem';
import { useEffect, useMemo, useState } from 'react';
import useBreakpoints from '~/hooks/useBreakpoints';
import { api } from '~/utils/api';
import { MOVIES_PER_PAGE, type SortCriteria, type SortDirection } from '~/utils/constants/gallery';
import { Pagination } from '@mui/material';
import Filters from '~/components/Gallery/Filters/Filters';
import MovieItemSkeleton from '@components/Gallery/Movies/MovieItem/MovieItemSkeleton';


const Movies = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [sortCriteria, setSortCriteria] = useState<SortCriteria>('rating');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [activeSearchValue, setActiveSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const { sm } = useBreakpoints();

  const skipValue = useMemo(() => {
    return page === 1 ? 0 : ((page - 1) * MOVIES_PER_PAGE);
  }, [page]);

  const { data, isLoading } = api.movies.getAll.useQuery({
    value: activeSearchValue,
    criteria: sortCriteria,
    order: sortDirection,
    skip: skipValue,
  });

  const movies = useMemo(() => data?.data, [data]);
  const total = useMemo(() => data?.pagination.total, [data]);

  const handleSearch = () => {
    // trigger search on action instead of input change (query value)
    setActiveSearchValue(searchValue);
  };

  const disabled = isLoading ? true : (movies ? movies.length <= 1 : true);

  const filterProps = {
    searchValue,
    setSearchValue,
    sortCriteria,
    setSortCriteria,
    sortDirection,
    setSortDirection,
    handleSearch,
    disabled,
    searchPlaceholder: 'Search by title, director...'
  };

  useEffect(() => {
    setPage(1);
  }, [activeSearchValue, sortDirection, sortCriteria]);

  const totalPages = useMemo(() => {
    if (total) {
      return Math.ceil(total / MOVIES_PER_PAGE);
    }
    return 0;
  }, [total]);

  const showEmptyState = !isLoading && movies?.length === 0;
  const showPagination = !isLoading && !!total && (total > MOVIES_PER_PAGE);

  return (
    <div className="px-8 max-w-7xl w-full md:px-14 2xl:px-0 flex flex-col gap-0 pt-12 pb-12">
      <h1
        className="text-4xl text-sans font-bold text-neutral-800 dark:text-neutral-100">
        Movies
      </h1>
      <Filters {...filterProps} />
      <div className='grid grid-cols-1 xs:grid-cols-2 place-items-start gap-4 md:gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        {isLoading && Array.from(Array(10)).map((n, idx) => {
          return <MovieItemSkeleton key={idx} />;
        })}
        {!isLoading && movies?.map(movie => <MovieItem key={movie.id} {...movie} />)}

      </div>
      {
        showEmptyState &&
        <div className="pt-6 pl-2 text-slate-800 dark:text-neutral-300 w-full text-2xl">No results were found...</div>
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

export default Movies;
