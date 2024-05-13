export type Quote = {
  id: number;
  text: string;
  author: string;
  reference?: string;
};

export type Book = {
  id: number;
  title: string;
  author: string;
  score: number;
  imgUrl: string;
  year?: number;
};

export type Movie = {
  id: number;
  title: string;
  director: string;
  imgUrl: string;
  score: number;
  year?: number;
};

export type GalleryCollection = Book | Movie;

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
};
