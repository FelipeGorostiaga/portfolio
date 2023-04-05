import SearchIcon from '@mui/icons-material/Search';
import { KeyboardEvent, useState } from 'react';

const BookFilters = () => {
  const [searchValue, setSearchValue] = useState<string>('');

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      if (searchValue.length > 0) {
        handleSearch();
      }
    }
  };

  const handleSearch = () => {

  }

  return (
    <div className="w-full flex flex-row items-center justify-between gap-5 my-3 py-4">
      <div
        className="py-3 px-5 bg-neutral-100 dark:bg-neutral-800 flex flex-row items-center justify-items-start gap-2 rounded-2xl sm:w-[400px] border-2 border-neutral-200">
        <input value={searchValue}
               onChange={e => setSearchValue(e.target.value)}
               className="outline-none bg-transparent font-sans w-full caret-blue-400 text-lg"
               placeholder="Search by title, author..."
               onKeyDown={(e) => handleKeyPress(e)}
        />
        {searchValue.length > 0 && <SearchIcon fontSize="medium" sx={{ color: '#60a5fa' }} className='cursor-pointer' onClick={handleSearch}/>}
      </div>
      <div className="flex flex-row">
      </div>
    </div>
  );
};

export default BookFilters;
