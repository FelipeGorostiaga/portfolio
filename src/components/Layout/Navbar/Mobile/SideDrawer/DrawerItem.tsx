import Link from 'next/link';
import styles from './DrawerItem.module.scss';
import React from 'react';
import { type ILink } from '~/components/Layout/Navbar/Mobile/SideDrawer/SideDrawer';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface ItemProps extends ILink {
  onClick: () => void;
  selected: boolean;
  multilevel?: boolean;
  multilevelOpen?: boolean;
  subItems?: ILink[];
}

const DrawerItem = ({
                      route,
                      name,
                      icon,
                      onClick,
                      selected,
                      multilevel = false,
                      subItems = [],
                      multilevelOpen = false,
                    }: ItemProps) => {

  if (!multilevel) {
    return (
      <Link href={route}
            className="flex flex-row gap-3 items-center justify-start cursor-pointer h-14 pl-8"
            onClick={onClick}>
        {icon}
        <span
          className={`text-sans text-gray-600 dark:text-gray-100 text-lg ${selected ? styles.selected : ''}`}>{name}</span>
      </Link>
    );
  }

  return (
    <div className="flex flex-col gap-1 items-start justify-start">
      <div className="h-14">
        <div className="flex flex-row gap-3 items-center justify-start cursor-pointer h-14 pl-8"
             onClick={onClick}>
          {icon}
          <div className="flex flex-row gap-0.5 items-center">
            <span
              className={`text-sans text-gray-600 dark:text-gray-100 text-lg ${selected ? styles.selected : ''}`}>{name}</span>
            <KeyboardArrowDownIcon fontSize="small"
                                   sx={{ color: '#4b5563' }}
                                   className={`mt-1 ${multilevelOpen ? 'rotate-180' : 'rotate-0'} transition-transform `} />
          </div>
        </div>
      </div>
      <div
        className={`flex flex-col items-start justify-start pl-12 gap-2 w-full ${multilevelOpen ? 'visible' : 'hidden'} ${styles.dropdown}`}>
        {
          subItems && subItems.map(item => {
            return (
              <Link href={item.route}
                    key={item.name}
                    className="flex flex-row gap-3 items-center justify-start cursor-pointer h-10 pl-8 w-full"
                    onClick={item.onClick}>
                {item.icon}
                <span
                  className={`text-sans text-gray-600 dark:text-gray-100 text-sm ${item.selected ? styles.selectedSubItem : ''}`}>{item.name}</span>
              </Link>
            );
          })
        }
      </div>
    </div>
  );
};

export default DrawerItem;
