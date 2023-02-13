import LightModeIcon from '@mui/icons-material/LightMode';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import { useTheme } from '../../../contexts/ThemeContext';
import { useMemo, useState } from 'react';
import { NAV_ROUTES } from '../../../utils/constants/routes';
import NavItem from './NavItem';

const routes = Object.keys(NAV_ROUTES);

const Navbar = () => {
  const { theme, switchTheme } = useTheme();
  const [hoveredItem, setHoveredItem] = useState<NAV_ROUTES | null>();
  const isDark: boolean = useMemo(() => theme === 'dark', [theme]);
  const [selectedItem, setSelectedItem] = useState<NAV_ROUTES>(NAV_ROUTES.HOME);

  return (
    <nav className="bg-black h-3 px-14 py-10 flex flex-row items-center border-b-2 border-gray-600">
      <ul className="flex flex-row gap-12 w-full h-full items-center">
        {routes.map(route => {
          return <NavItem key={route}
                          item={route as NAV_ROUTES}
                          selected={selectedItem === route}
                          hoveredItem={hoveredItem}
                          setSelectedItem={setSelectedItem}
                          setHoveredItem={setHoveredItem} />;
        })}
      </ul>
      <div
        onClick={switchTheme}
        className="bg-darkgray w-[40px] h-[40px] flex items-center rounded-md justify-center cursor-pointer hover:bg-gray-900">
        {isDark && <LightModeIcon style={{color: 'white'}} fontSize='medium' />}
        {!isDark && <BedtimeIcon style={{ color: 'white' }} fontSize="medium" />}
      </div>
    </nav>
  );
};

export default Navbar;
