import React, { useMemo } from 'react';
import { NAV_ROUTES } from '../../../utils/constants/routes';
import Link from 'next/link';
import { capitalize } from '../../../utils/lib/string';

function parseRoute(item: NAV_ROUTES) {
  if (item.toLowerCase() === 'home') {
    return '';
  }
  return item.toLowerCase();
}

interface NavItemProps {
  item: NAV_ROUTES;
  selected: boolean;
  setSelectedItem: (item: NAV_ROUTES) => void;
  setHoveredItem: (item: NAV_ROUTES | null) => void;
  hoveredItem: NAV_ROUTES | null | undefined;
}

function NavItem({ item, selected, setHoveredItem, hoveredItem, setSelectedItem }: NavItemProps) {

  const itemName = useMemo(() => {
    return capitalize(item.toLowerCase());
  }, [item]);

  const itemRoute = useMemo(() => {
    return parseRoute(item);
  }, [item]);

  const className = `font-sans text-gray-200 text-lg hover:text-gray-50 cursor-pointer ${selected? '' : 'hover:text-blue-200'}`;

  return (
    <li
      onMouseEnter={() => setHoveredItem(item)}
      onMouseLeave={() => setHoveredItem(null)}
      onClick={() => setSelectedItem(item)}
      className={className}>
      <Link href={`/${itemRoute}`}>{itemName}</Link>
      {!selected && <div className="bg-transparent w-full h-1"></div>}
      {selected && <div className="bg-blue-600 w-full h-1"></div>}
      {/*{(hoveredItem !== item) && <div className="bg-transparent w-full h-1"></div>}
      {(hoveredItem === item) && <div className="bg-blue-600 w-full h-1"></div>}*/}
    </li>
  );
}

export default NavItem;
