import Link from 'next/link';
import LightModeIcon from '@mui/icons-material/LightMode';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import { useTheme } from '../../../contexts/ThemeContext';
import { useMemo, useState } from 'react';
import { NAV_ROUTES } from '../../../utils/constants/routes';

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [hoveredItem, setHoveredItem] = useState<NAV_ROUTES | null>();
  const isDark: boolean = useMemo(() => theme === 'dark', [theme]);

  return (
    <nav className="bg-black h-3 px-14 py-10 flex flex-row items-center">
      <ul className="flex flex-row gap-12 w-full h-full items-center">
        <li
          onMouseEnter={() => setHoveredItem(NAV_ROUTES.HOME)}
          onMouseLeave={() => setHoveredItem(null)}
          className="font-sans text-gray-200 text-lg hover:text-gray-50">
          <Link href={'/'}>Home</Link>
          {(hoveredItem !== NAV_ROUTES.HOME) && <div className="bg-transparent w-full h-1"></div>}
          {(hoveredItem === NAV_ROUTES.HOME) && <div className="bg-blue-600 w-full h-1"></div>}
        </li>

        <li
          onMouseEnter={() => setHoveredItem(NAV_ROUTES.GALLERY)}
          onMouseLeave={() => setHoveredItem(null)}
          className="font-sans text-gray-200 text-lg hover:text-gray-50">
          <Link href={'/gallery'}>Gallery</Link>
          {(hoveredItem !== NAV_ROUTES.GALLERY) && <div className="bg-transparent w-full h-1"></div>}
          {(hoveredItem === NAV_ROUTES.GALLERY) && <div className="bg-blue-600 w-full h-1"></div>}
        </li>
        <li
          onMouseEnter={() => setHoveredItem(NAV_ROUTES.GAMES)}
          onMouseLeave={() => setHoveredItem(null)}
          className="font-sans text-gray-200 text-lg hover:text-gray-50">
          <Link href={'/games'}>Games</Link>
          {(hoveredItem !== NAV_ROUTES.GAMES) && <div className="bg-transparent w-full h-1"></div>}
          {(hoveredItem === NAV_ROUTES.GAMES) && <div className="bg-blue-600 w-full h-1"></div>}
        </li>
        <li
          onMouseEnter={() => setHoveredItem(NAV_ROUTES.EXPERIENCE)}
          onMouseLeave={() => setHoveredItem(null)}
          className="font-sans text-gray-200 text-lg hover:text-gray-50">
          <Link href={'/experience'}>Experience</Link>
          {(hoveredItem !== NAV_ROUTES.EXPERIENCE) && <div className="bg-transparent w-full h-1"></div>}
          {(hoveredItem === NAV_ROUTES.EXPERIENCE) && <div className="bg-blue-600 w-full h-1"></div>}
        </li>
        <li
          onMouseEnter={() => setHoveredItem(NAV_ROUTES.CONTACT)}
          onMouseLeave={() => setHoveredItem(null)}
          className="font-sans text-gray-200 text-lg hover:text-gray-50">
          <Link href={'/contact'}>Contact</Link>
          {(hoveredItem !== NAV_ROUTES.CONTACT) && <div className="bg-transparent w-full h-1"></div>}
          {(hoveredItem === NAV_ROUTES.CONTACT) && <div className="bg-blue-600 w-full h-1"></div>}
        </li>
      </ul>
      {
        isDark && (
          <div
            onClick={() => setTheme('light')}
            className="bg-darkgray w-[40px] h-[40px] flex items-center rounded-md justify-center cursor-pointer hover:bg-gray-900">
            <LightModeIcon style={{ color: 'white' }} fontSize="medium" />
          </div>
        )
      }
      {
        !isDark && (
          <div
            onClick={() => setTheme('dark')}
            className="bg-darkgray w-[40px] h-[40px] flex items-center rounded-md justify-center cursor-pointer hover:bg-gray-900">
            <BedtimeIcon style={{ color: 'white' }} fontSize="medium" />
          </div>
        )
      }
    </nav>
  );
};

export default Navbar;
