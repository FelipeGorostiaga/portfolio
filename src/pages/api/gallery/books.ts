import { type NextApiRequest, type NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { type Book } from '~/utils/types';
import { sortCollection } from '~/utils/lib/books';
import {
  BOOKS_PER_PAGE,
  type SortCriteria,
  type SortDirection,
} from '~/utils/constants/gallery';

const BOOKS_FILE_PATH = path.join(process.cwd(), 'data', 'books.json');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    try {
      const fileContents = fs.readFileSync(BOOKS_FILE_PATH, 'utf-8');
      const books = JSON.parse(fileContents);
      const searchValue = req.query.search?.toString().toLowerCase() || '';
      const page = parseInt(req.query.page as string) || 1;

      const direction: SortDirection =
        (req.query.direction?.toString().toLowerCase() as SortDirection) ||
        'desc';
      const sort: SortCriteria =
        (req.query.sort?.toString().toLowerCase() as SortCriteria) || 'rating';

      const filteredBooks = books.filter(
        (quote: Book) =>
          quote.title.toLowerCase().includes(searchValue) ||
          quote.author.toLowerCase().includes(searchValue),
      );

      const sortedBooks = sortCollection(filteredBooks, sort, direction);
      const total = sortedBooks.length;
      const startIndex = (page - 1) * BOOKS_PER_PAGE;
      const endIndex = startIndex + BOOKS_PER_PAGE;
      const paginatedBooks = sortedBooks.slice(startIndex, endIndex);

      res.status(200).json({
        data: paginatedBooks,
        total: total,
        page: page,
        totalPages: Math.ceil(total / BOOKS_PER_PAGE),
      });
    } catch (error: unknown) {
      res.status(500).json({ message: 'Error reading books file', error });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
