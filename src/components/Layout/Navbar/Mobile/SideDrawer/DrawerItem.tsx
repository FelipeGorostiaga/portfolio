import Link from 'next/link';
import styles from './DrawerItem.module.scss';
import { type ReactElement } from 'react';

interface ItemProps {
  route: string;
  name: string;
  icon: ReactElement;
  onClick: () => void;
  selected: boolean;
}

const DrawerItem = ({ route, name, icon, onClick, selected }: ItemProps) => {
  return (
    <Link href={route} className="flex flex-row gap-3 items-center justify-start cursor-pointer h-14 pl-8" onClick={onClick}>
      {icon}
      <span className={`text-sans text-gray-600 dark:text-gray-100 text-lg ${selected ? styles.selected : ''}`}>{name}</span>
    </Link>
  );
}

export default DrawerItem;
