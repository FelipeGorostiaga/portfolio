import React from 'react';
import Link from 'next/link';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface NavDropdownItem {
  title: string;
  route: string;
  selected: boolean;
}

interface Props {
  title: string;
  selected: boolean;
  dropdownOpen: boolean;
  dropdownItems: NavDropdownItem[];
  setSelectedItem: (item: string) => void;
  onClick: () => void;
}

const NavItemMenu = React.forwardRef(({
                                        title,
                                        selected,
                                        dropdownItems,
                                        dropdownOpen,
                                        onClick,
                                        setSelectedItem,
                                      }: Props, ref: any) => {
  return (
    <div id="gallery-item"
         className="font-sans text-gray-600 relative text-base font-light cursor-pointer dark:text-gray-200 hover:text-sky-400 hover:dark:text-blue-300"
         onClick={onClick}>
      <span className="flex items-center gap-1" id="gallery-sub-item">
         {title}
        <KeyboardArrowDownIcon fontSize="small" sx={{ color: '#4b5563' }} id='icon'/>
      </span>
      {!selected && <div className="bg-transparent w-full h-1" id='border-transparent'></div>}
      {selected && <div className="bg-blue-400 dark:bg-blue-600 w-[70%] h-1" id='border-selected'></div>}
      {dropdownOpen && (
        <div
          className="absolute left-0 top-[calc(100%+1.25rem)] bg-neutral-200 rounded-lg flex flex-col w-[250px] z-50
           dark:bg-black shadow-xl dark:shadow dark:shadow-blue-800"
          ref={ref}>
          {
            dropdownItems.map(item => {
              return (
                <Link key={item.title}
                      onClick={() => setSelectedItem(item.route)}
                      href={item.route}
                      className="px-3 py-3 pl-4 font-sans text-gray-600 text-sm font-light cursor-pointer dark:text-gray-200 first:rounded-t-lg last:rounded-b-lg
                      hover:text-sky-400 hover:bg-neutral-300
                      hover:dark:text-blue-400 dark:hover:bg-spacegray">
                  <div className="w-fit">
                    {item.title}
                    {!item.selected && <div className="bg-transparent w-full h-0.5 absolute"></div>}
                    {item.selected && <div className="bg-blue-400 dark:bg-blue-600 w-full h-0.5"></div>}
                  </div>
                </Link>
              );
            })
          }
        </div>
      )}
    </div>
  );
});

export default NavItemMenu;
