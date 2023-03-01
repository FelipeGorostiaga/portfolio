import LightModeIcon from '@mui/icons-material/LightMode';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import { useTheme } from '../../../contexts/ThemeContext';
import { useEffect, useMemo, useState } from 'react';
import NavItem from './NavItem';
import { routes } from '../../../utils/constants/routes';
import useBreakpoints from '../../../hooks/useBreakpoints';
import NavBarMobile from './Mobile/NavBarMobile';
import { useRouter } from 'next/router';


const Navbar = () => {
  const { theme, switchTheme } = useTheme();
  const router = useRouter();
  const { sm } = useBreakpoints();
  const isDark: boolean = useMemo(() => theme === 'dark', [theme]);
  const [selectedItem, setSelectedItem] = useState<string>('home');

  useEffect(() => {
    const path = router.asPath;
    if (path === '/') {
      setSelectedItem('home');
    } else {
      setSelectedItem(path.replace('/', ''));
    }
  }, [router.asPath]);

  if (sm) {
    return <NavBarMobile />;
  }

  return (
    <nav
      className="bg-neutral-100 h-16 px-14 flex flex-row items-center border-b-2 border-gray-300 dark:bg-neutral-900 dark:border-gray-600 z-10">
      <div className="flex flex-row gap-12 w-full h-full items-center">
        {routes.map(route => {
          return <NavItem key={route}
                          item={route}
                          selected={selectedItem === route}
                          setSelectedItem={setSelectedItem} />;
        })}
      </div>
      <div
        onClick={switchTheme}
        className="bg-gray-600 w-[40px] h-[40px] flex items-center rounded-md justify-center cursor-pointer hover:bg-gray-800 dark:bg-darkgray hover:dark:bg-neutral-800">
        {isDark && <LightModeIcon style={{ color: 'white' }} fontSize="medium" />}
        {!isDark && <BedtimeIcon style={{ color: 'white' }} fontSize="medium" />}
      </div>
    </nav>
  );
};

export default Navbar;
