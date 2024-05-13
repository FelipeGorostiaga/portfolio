import { type NextApiRequest, type NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { type Quote } from '~/utils/types';

const QUOTES_FILE_PATH = path.join(process.cwd(), 'data', 'quotes.json');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    try {
      const fileContents = fs.readFileSync(QUOTES_FILE_PATH, 'utf-8');
      const quotes = JSON.parse(fileContents);

      const searchValue = req.query.search?.toString().toLowerCase() || '';
      const page = parseInt(req.query.page as string) || 1;
      const quotesPerPage = 10;

      const filteredQuotes = quotes.filter(
        (quote: Quote) =>
          quote.text.toLowerCase().includes(searchValue) ||
          quote.author.toLowerCase().includes(searchValue) ||
          (quote.reference?.toLowerCase().includes(searchValue) ?? false),
      );

      const total = filteredQuotes.length;
      const startIndex = (page - 1) * quotesPerPage;
      const endIndex = startIndex + quotesPerPage;
      const paginatedQuotes = filteredQuotes.slice(startIndex, endIndex);

      res.status(200).json({
        data: paginatedQuotes,
        total: total,
        page: page,
        totalPages: Math.ceil(total / quotesPerPage),
      });
    } catch (error: unknown) {
      res.status(500).json({ message: 'Error reading quotes file', error });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
