import {
  type SortCriteria,
  type SortDirection,
} from '~/utils/constants/gallery';
import { type PaginatedResponse, type Movie } from '~/utils/types';

export async function fetchMovies(
  page: number,
  searchValue: string,
  sortCriteria: SortCriteria,
  sortDirection: SortDirection,
): Promise<PaginatedResponse<Movie>> {
  const response = await fetch(
    `/api/gallery/movies?page=${page}&search=${searchValue}&sort=${sortCriteria}&direction=${sortDirection}`,
  );
  if (!response.ok) {
    throw new Error('Network response failed');
  }
  return response.json();
}
