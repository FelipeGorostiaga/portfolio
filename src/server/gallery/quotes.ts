import { type PaginatedResponse, type Quote } from '~/utils/types';

export async function fetchQuotes(
  page: number,
  searchValue: string,
): Promise<PaginatedResponse<Quote>> {
  const response = await fetch(
    `/api/gallery/quotes?page=${page}&search=${searchValue}`,
  );
  if (!response.ok) {
    throw new Error('Network response failed');
  }
  return response.json();
}
