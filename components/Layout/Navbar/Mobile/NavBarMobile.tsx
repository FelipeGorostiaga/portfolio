import LightModeIcon from '@mui/icons-material/LightMode';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '../../../../contexts/ThemeContext';
import { Drawer } from '@mui/material';
import SideDrawer from './SideDrawer/SideDrawer';
import { useSideDrawer } from '../../../../contexts/SideDrawerContext';


const NavBarMobile = () => {
  const { isDark, switchTheme } = useTheme();
  const { isOpen, setIsOpen } = useSideDrawer();
  const menuColor = isDark ? 'white' : 'black';

  return (
    <>
      <Drawer
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <SideDrawer />
      </Drawer>
      <nav
        className="bg-neutral-100 h-16 px-6 flex flex-row items-center justify-between w-full border-b-2 border-gray-300 dark:bg-neutral-900 dark:border-gray-600">
        <MenuIcon fontSize="large" style={{ color: menuColor }} onClick={() => setIsOpen(true)}
                  className="cursor-pointer" />
        <div
          onClick={switchTheme}
          className="bg-gray-600 w-[40px] h-[40px] flex items-center rounded-md justify-center cursor-pointer hover:bg-gray-800 hover:dark:bg-gray-900 dark:bg-darkgray">
          {isDark && <LightModeIcon style={{ color: 'white' }} fontSize="medium" />}
          {!isDark && <BedtimeIcon style={{ color: 'white' }} fontSize="medium" />}
        </div>
      </nav>
    </>
  );
};

export default NavBarMobile;
