import React, { useState } from 'react';
import Link from 'next/link';

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


const NavItemMenu = React.forwardRef(({ title, selected, dropdownItems, dropdownOpen, onClick, setSelectedItem }: Props, ref: any) => {

  const className = `font-sans text-gray-600 relative text-base font-light cursor-pointer dark:text-gray-200 
  ${selected ? '' : 'hover:text-sky-400 hover:dark:text-blue-300'}`;

  return (
    <div className={className} onClick={onClick} id='gallery-item'>
      {title}
      {!selected && <div className="bg-transparent w-full h-1"></div>}
      {selected && <div className="bg-blue-400 dark:bg-blue-600 w-full h-1"></div>}
      {dropdownOpen && (
        <div className='absolute left-[1rem] top-[120%] bg-neutral-200 bg-opacity-90 rounded-xl flex flex-col  w-[150px]' ref={ref}>
          {
            dropdownItems.map(item => {

              const listItemClassname = `px-3 py-3 font-sans text-gray-600 text-sm font-light cursor-pointer dark:text-gray-200
                           first:rounded-t-xl
                           last:rounded-b-xl
                           hover:text-sky-400 hover:dark:text-blue-400 hover:bg-neutral-300`

              return <Link key={item.title}
                           onClick={() => setSelectedItem(item.route)}
                           href={item.route}
                           className={listItemClassname}>
                <div className='w-fit'>
                  {item.title}
                  {!item.selected && <div className="bg-transparent w-full h-0.5 absolute"></div>}
                  {item.selected && <div className="bg-blue-400 dark:bg-blue-600 w-full h-0.5"></div>}
                </div>
              </Link>
            })
          }
        </div>
      )}
    </div>
  );
});

export default NavItemMenu;
