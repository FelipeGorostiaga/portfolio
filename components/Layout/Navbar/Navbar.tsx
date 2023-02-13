import LightModeIcon from '@mui/icons-material/LightMode';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import { useTheme } from '../../../contexts/ThemeContext';
import { useMemo, useState } from 'react';
import NavItem from './NavItem';
import { routes } from '../../../utils/constants/routes';

const Navbar = () => {
  const { theme, switchTheme } = useTheme();
  const isDark: boolean = useMemo(() => theme === 'dark', [theme]);
  const [selectedItem, setSelectedItem] = useState<string>('home');

  return (
    <nav className="bg-gray-50 h-3 px-14 py-10 flex flex-row items-center border-b-2 border-gray-300 dark:bg-black dark:border-gray-600">
      <ul className="flex flex-row gap-12 w-full h-full items-center">
        {routes.map(route => {
          return <NavItem key={route}
                          item={route}
                          selected={selectedItem === route}
                          setSelectedItem={setSelectedItem} />;
        })}
      </ul>
      <div
        onClick={switchTheme}
        className="bg-gray-700 w-[40px] h-[40px] flex items-center rounded-md justify-center cursor-pointer hover:dark:bg-gray-900 dark:bg-darkgray">
        {isDark && <LightModeIcon style={{ color: 'white' }} fontSize="medium" />}
        {!isDark && <BedtimeIcon style={{ color: 'white' }} fontSize="medium" />}
      </div>
    </nav>
  );
};

export default Navbar;
