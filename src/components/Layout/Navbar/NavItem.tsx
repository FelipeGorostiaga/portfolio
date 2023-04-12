import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { capitalize } from '~/utils/lib/string';

interface NavItemProps {
  route: string;
  title: string;
  selected: boolean;
  setSelectedItem: (item: string) => void;
}

function NavItem({ route, title, selected, setSelectedItem }: NavItemProps) {

  const className = `font-sans text-gray-600 text-base font-light cursor-pointer dark:text-gray-200 ${selected ? '' : 'hover:text-sky-400 hover:dark:text-blue-300'}`;

  return (
    <Link href={route} onClick={() => setSelectedItem(route)} className={className}>
      {title}
      {!selected && <div className="bg-transparent w-full h-1"></div>}
      {selected && <div className="bg-blue-400 dark:bg-blue-600 w-full h-1"></div>}
    </Link>
  );
}

export default NavItem;
