import { type NextApiRequest, type NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { type Book } from '~/utils/types';
import { sortCollection } from '~/utils/lib/books';
import {
  MOVIES_PER_PAGE,
  type SortCriteria,
  type SortDirection,
} from '~/utils/constants/gallery';

const MOVIES_FILE_PATH = path.join(process.cwd(), 'data', 'movies.json');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    try {
      const fileContents = fs.readFileSync(MOVIES_FILE_PATH, 'utf-8');
      const movies = JSON.parse(fileContents);
      const searchValue = req.query.search?.toString().toLowerCase() || '';
      const page = parseInt(req.query.page as string) || 1;

      const direction: SortDirection =
        (req.query.direction?.toString().toLowerCase() as SortDirection) ||
        'desc';
      const sort: SortCriteria =
        (req.query.sort?.toString().toLowerCase() as SortCriteria) || 'rating';

      const filteredMovies = movies.filter(
        (quote: Book) =>
          quote.title.toLowerCase().includes(searchValue) ||
          quote.author.toLowerCase().includes(searchValue),
      );

      const sortedMovies = sortCollection(filteredMovies, sort, direction);
      const total = sortedMovies.length;
      const startIndex = (page - 1) * MOVIES_PER_PAGE;
      const endIndex = startIndex + MOVIES_PER_PAGE;
      const paginatedMovies = sortedMovies.slice(startIndex, endIndex);

      res.status(200).json({
        data: paginatedMovies,
        total: total,
        page: page,
        totalPages: Math.ceil(total / MOVIES_PER_PAGE),
      });
    } catch (error: unknown) {
      res.status(500).json({ message: 'Error reading books file', error });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
