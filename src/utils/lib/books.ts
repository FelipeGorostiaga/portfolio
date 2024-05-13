import { type SortCriteria, type SortDirection } from '../constants/gallery';
import { type GalleryCollection } from '../types';

export function sortCollection(
  books: GalleryCollection[],
  sortCriteria: SortCriteria,
  direction: SortDirection,
): GalleryCollection[] {
  return books.sort((a, b) => {
    // Using a default value when 'year' is undefined
    let valueA =
      a[sortCriteria] ?? (direction === 'asc' ? -Infinity : Infinity);
    let valueB =
      b[sortCriteria] ?? (direction === 'asc' ? -Infinity : Infinity);

    // Convert to number for comparison if the sort criteria is 'score'
    if (sortCriteria === 'score') {
      valueA = Number(valueA);
      valueB = Number(valueB);
    }

    if (direction === 'asc') {
      return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
    } else {
      return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
    }
  });
}
