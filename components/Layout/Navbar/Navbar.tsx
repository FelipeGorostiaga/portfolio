import Link from 'next/link';
import LightModeIcon from '@mui/icons-material/LightMode';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import { useTheme } from '../../../contexts/ThemeContext';
import { useMemo } from 'react';

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const isDark: boolean = useMemo(() => theme === 'dark', [theme]);

  return (
    <nav className="bg-black h-3 px-14 py-10 flex flex-row items-center">
      <ul className="flex flex-row gap-12 w-full h-full items-center">
        <li className="font-sans text-gray-200 hover:text-gray-50">
          <Link href={'/'}>Home</Link>
        </li>
        <li className="font-sans text-gray-200 hover:text-gray-50">
          <Link href={'/gallery'}>Gallery</Link>
        </li>
        <li className="font-sans text-gray-200 hover:text-gray-50">
          <Link href={'/games'}>Games</Link>
        </li>
        <li className="font-sans text-gray-200 hover:text-gray-50">
          <Link href={'/experience'}>Experience</Link>
        </li>
        <li className="font-sans text-gray-200 hover:text-gray-50">
          <Link href={'/contact'}>Contact</Link>
        </li>
      </ul>
      {
        isDark && (
          <div
            onClick={() => setTheme('dark')}
            className="bg-[#2b2b2b] w-[40px] h-[40px] flex items-center rounded-md justify-center cursor-pointer hover:bg-gray-900">
            <LightModeIcon style={{ color: 'white' }} fontSize="medium" />
          </div>
        )
      }
      {
        isDark && (
          <div
            onClick={() => setTheme('light')}
            className="bg-[#2b2b2b] w-[40px] h-[40px] flex items-center rounded-md justify-center cursor-pointer hover:bg-gray-900">
            <BedtimeIcon style={{ color: 'white' }} fontSize="medium" />
          </div>
        )
      }
    </nav>
  );
};

export default Navbar;
