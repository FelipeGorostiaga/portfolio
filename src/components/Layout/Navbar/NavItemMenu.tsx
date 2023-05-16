import React from 'react';
import Link from 'next/link';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import styles from './NavItemMenu.module.scss';

interface NavDropdownItem {
  title: string;
  route: string;
  selected: boolean;
}

interface MenuProps {
  title: string;
  selected: boolean;
  dropdownOpen: boolean;
  dropdownItems: NavDropdownItem[];
  setSelectedItem: (item: string) => void;
  onClick: () => void;
}

const DropdownItem = ({ item, setSelectedItem }: {
  item: NavDropdownItem,
  setSelectedItem: (item: string) => void
}) => {
  return (
    <Link key={item.title}
          onClick={() => setSelectedItem(item.route)}
          href={item.route}
          className="px-3 py-3 pl-4 font-sans cursor-pointer text-gray-600 text-sm font-light dark:text-gray-200 first:rounded-t-lg last:rounded-b-lg
                      hover:text-sky-400 hover:bg-neutral-300
                      hover:dark:text-blue-400 dark:hover:bg-spacegray w-full">
      <div className="w-fit">
        {item.title}
        {!item.selected && <div className="bg-transparent w-full h-0.5"></div>}
        {item.selected && <div className="bg-blue-400 dark:bg-blue-600 w-full h-0.5"></div>}
      </div>
    </Link>
  );
};

const NavItemMenu = React.forwardRef<HTMLDivElement, MenuProps>((props, ref) => {
  return (
    <div id="gallery-item"
         className="font-sans text-gray-600 relative text-base font-light cursor-pointer dark:text-gray-200 hover:text-sky-400 hover:dark:text-blue-300"
         onClick={props.onClick}>
      <span className="relative">
         {props.title}
        <KeyboardArrowDownIcon
          className={`absolute top-[0.85px] -right-5 ${props.dropdownOpen ? 'rotate-180' : 'rotate-0'} transition-transform`}
          fontSize="small" sx={{ color: '#4b5563' }} />
      </span>
      {!props.selected && <div className="bg-transparent w-full h-1"></div>}
      {props.selected && <div className="bg-blue-400 dark:bg-blue-600 w-[100%] h-1"></div>}
      <div id="ref-id"
           className={`bg-neutral-200 rounded-lg z-30 dark:bg-black shadow-xl 
           dark:shadow dark:shadow-blue-800 ${styles.dropdownMenu} ${props.dropdownOpen ? styles.active : ''}`}
           ref={ref}>
        {
          props.dropdownItems.map(item => <DropdownItem key={item.title} item={item}
                                                        setSelectedItem={props.setSelectedItem} />)
        }
      </div>
    </div>
  );
});

NavItemMenu.displayName = 'NavItemMenu';

export default NavItemMenu;
