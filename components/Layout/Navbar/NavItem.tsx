import React, { useMemo } from 'react';
import Link from 'next/link';
import { capitalize } from '../../../utils/lib/string';

function parseRoute(item: string) {
  if (item.toLowerCase() === 'home') {
    return '';
  }
  return item;
}

interface NavItemProps {
  item: string;
  selected: boolean;
  setSelectedItem: (item: string) => void;
}

function NavItem({ item, selected, setSelectedItem }: NavItemProps) {

  const itemName = useMemo(() => {
    return capitalize(item);
  }, [item]);

  const itemRoute = useMemo(() => {
    return parseRoute(item);
  }, [item]);

  const className = `font-sans text-gray-600 text-base font-light cursor-pointer dark:text-gray-200 ${selected ? '' : 'hover:text-sky-400 hover:dark:text-blue-300'}`;

  return (
    <Link href={`/${itemRoute}`} onClick={() => setSelectedItem(item)} className={className}>
      {itemName}
      {!selected && <div className="bg-transparent w-full h-1"></div>}
      {selected && <div className="bg-blue-600 w-full h-1"></div>}
    </Link>
  );
}

export default NavItem;
