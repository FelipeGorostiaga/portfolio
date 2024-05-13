import SearchIcon from '@mui/icons-material/Search';
import {
  type Dispatch,
  type KeyboardEvent,
  type SetStateAction,
  useState,
} from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useTheme } from '~/contexts/ThemeContext';
import {
  type SortCriteria,
  type SortDirection,
} from '~/utils/constants/gallery';

interface BookFilterProps {
  searchPlaceholder: string;
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  sortCriteria: SortCriteria;
  setSortCriteria: Dispatch<SetStateAction<SortCriteria>>;
  sortDirection: SortDirection;
  setSortDirection: Dispatch<SetStateAction<SortDirection>>;
  disabled: boolean;
  handleSearch?: () => void;
}

const Filters = (props: BookFilterProps) => {
  const [inputFocused, setInputFocused] = useState(false);
  const { isDark } = useTheme();

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      props.handleSearch && props.handleSearch();
    }
  };

  return (
    <div className="my-3 flex w-full flex-col items-center justify-between gap-5 md:flex-row">
      <div
        className={`flex w-full flex-row items-center justify-items-start gap-2 rounded-xl border
        bg-transparent px-5 py-3 dark:bg-transparent md:w-[50%] lg:w-[400px] ${
          inputFocused
            ? 'border-[#1976D2]'
            : isDark
            ? 'border-neutral-700'
            : 'border-neutral-400'
        }`}
      >
        <input
          value={props.searchValue}
          onChange={(e) => props.setSearchValue(e.target.value)}
          className="w-full bg-transparent font-sans text-lg text-neutral-700 caret-blue-400 outline-none placeholder:text-neutral-500 dark:text-neutral-300"
          placeholder={props.searchPlaceholder}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
          onKeyDown={(e) => handleKeyPress(e)}
        />
        {(props.searchValue.length > 0 || inputFocused) && (
          <SearchIcon
            fontSize="medium"
            sx={{ color: '#1976D2' }}
            className="cursor-pointer"
            onClick={() => props.handleSearch && props.handleSearch()}
          />
        )}
      </div>
      <div className="grid w-full grid-cols-2 items-center gap-4 md:w-[50%] lg:w-[300px]">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={props.sortCriteria}
            label="Sort by"
            disabled={props.disabled}
            onChange={(e) =>
              props.setSortCriteria(e.target.value as SortCriteria)
            }
          >
            <MenuItem value={'score'}>Rating</MenuItem>
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
            disabled={props.disabled}
            onChange={(e) =>
              props.setSortDirection(e.target.value as SortDirection)
            }
          >
            <MenuItem value={'desc'}>Descending</MenuItem>
            <MenuItem value={'asc'}>Ascending</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default Filters;
