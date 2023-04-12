import SearchIcon from '@mui/icons-material/Search';
import { type Dispatch, type KeyboardEvent, type SetStateAction, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useTheme } from '~/contexts/ThemeContext';
import { SortCriteria, SortDirection } from '~/components/Gallery/Books/Books';

interface BookFilterProps {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  sortCriteria: SortCriteria;
  setSortCriteria: Dispatch<SetStateAction<SortCriteria>>;
  sortDirection: SortDirection;
  setSortDirection: Dispatch<SetStateAction<SortDirection>>;
  handleSearch: () => void;
}

const BookFilters = (props: BookFilterProps) => {
  const [inputFocused, setInputFocused] = useState(false);
  const { isDark } = useTheme();

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      props.handleSearch();
    }
  };

  return (
    <div className="w-full flex flex-row items-center justify-between gap-5 my-3 py-4">
      <div
        className={`py-3 px-5 bg-neutral-50 dark:bg-neutral-800 flex flex-row items-center justify-items-start
        gap-2 rounded-2xl sm:w-[400px] border-2 ${inputFocused ? 'border-[#1976D2]' : (isDark? 'border-neutral-700' : 'border-neutral-200')}`}>
        <input value={props.searchValue}
               onChange={e => props.setSearchValue(e.target.value)}
               className="outline-none bg-transparent font-sans w-full caret-blue-400 text-lg text-neutral-700 dark:text-neutral-300"
               placeholder="Search by title, author..."
               onFocus={() => setInputFocused(true)}
               onBlur={() => setInputFocused(false)}
               onKeyDown={(e) => handleKeyPress(e)}
        />
        {(props.searchValue.length > 0 || inputFocused) &&
          <SearchIcon fontSize="medium" sx={{ color: '#1976D2' }} className="cursor-pointer" onClick={() => props.handleSearch()} />}
      </div>
      <div className="grid grid-cols-2 items-center gap-4 w-[300px]">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={props.sortCriteria}
            label="Sort by"
            onChange={e => props.setSortCriteria(e.target.value as SortCriteria)}
          >
            <MenuItem value={'rating'}>Rating</MenuItem>
            <MenuItem value={'year'}>Year</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Order</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={props.sortDirection}
            label="Order"
            onChange={e => props.setSortDirection(e.target.value as SortDirection)}
          >
            <MenuItem value={'desc'}>Descending</MenuItem>
            <MenuItem value={'asc'}>Ascending</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default BookFilters;
