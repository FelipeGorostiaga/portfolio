import {
  type SortCriteria,
  type SortDirection,
} from '~/utils/constants/gallery';
import { type PaginatedResponse, type Book } from '~/utils/types';

export async function fetchBooks(
  page: number,
  searchValue: string,
  sortCriteria: SortCriteria,
  sortDirection: SortDirection,
): Promise<PaginatedResponse<Book>> {
  const response = await fetch(
    `/api/gallery/books?page=${page}&search=${searchValue}&sort=${sortCriteria}&direction=${sortDirection}`,
  );
  if (!response.ok) {
    throw new Error('Network response failed');
  }
  return response.json();
}
