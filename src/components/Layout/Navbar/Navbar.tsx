import LightModeIcon from '@mui/icons-material/LightMode';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import { useTheme } from '~/contexts/ThemeContext';
import { useEffect, useMemo, useRef, useState } from 'react';
import NavItem from './NavItem';
import NavBarMobile from './Mobile/NavBarMobile';
import { useRouter } from 'next/router';
import useBreakpoints from '~/hooks/useBreakpoints';
import NavItemMenu from '~/components/Layout/Navbar/NavItemMenu';
import { useOutsideAlerter } from '~/hooks/useClickOutside';


const Navbar = () => {
  const { theme, switchTheme } = useTheme();
  const router = useRouter();
  const { md } = useBreakpoints();
  const isDark: boolean = useMemo(() => theme === 'dark', [theme]);
  const [selectedItem, setSelectedItem] = useState<string>('home');
  const [galleryDropdownOpen, setGalleryDropdownOpen] = useState(false);
  const galleryDropdownRef = useRef(null);

  const handleClickOutsideDropdown = (e: any) => {
    const id = e.target?.id;
    if (id && id === 'gallery-item') {
      return;
    }
    setGalleryDropdownOpen(false);
  }

  useOutsideAlerter(galleryDropdownRef, handleClickOutsideDropdown);

    useEffect(() => {
      const path = router.asPath;
      setSelectedItem(path);
    }, [router.asPath]);

  if (md) {
    return <NavBarMobile />;
  }

  const dropdownItems = [
    {
      title: 'Books',
      route: '/gallery/books',
      selected: selectedItem === '/gallery/books',
    },
    {
      title: 'Movies',
      route: '/gallery/movies',
      selected: selectedItem === '/gallery/movies',
    },
    {
      title: 'Quotes',
      route: '/gallery/quotes',
      selected: selectedItem === '/gallery/quotes',
    },
  ];

  const gallerySelected = selectedItem.includes('gallery');

  return (
    <nav
      className="bg-neutral-100 bg-opacity-70 h-16 px-6 md:px-14 flex flex-row items-center border-b-2 border-gray-300 dark:bg-transparent dark:border-gray-600 z-10">
      <div className="flex flex-row gap-7 md:gap-12 w-full h-full items-center">
        <NavItem title="Home"
                 route="/"
                 selected={selectedItem === '/'}
                 setSelectedItem={setSelectedItem} />
        <NavItem title="Experience"
                 route="/experience"
                 selected={selectedItem === '/experience'}
                 setSelectedItem={setSelectedItem} />
        <NavItem title="Skills"
                 route="/skills"
                 selected={selectedItem === '/skills'}
                 setSelectedItem={setSelectedItem} />
        <NavItemMenu dropdownItems={dropdownItems}
                     title="Gallery"
                     selected={gallerySelected}
                     onClick={() => setGalleryDropdownOpen(prev => !prev)}
                     dropdownOpen={galleryDropdownOpen}
                     setSelectedItem={setSelectedItem}
                     ref={galleryDropdownRef}
        />
        <NavItem title="Games"
                 route="/games"
                 selected={selectedItem === '/games'}
                 setSelectedItem={setSelectedItem} />
        <NavItem title="Contact"
                 route="/contact"
                 selected={selectedItem === '/contact'}
                 setSelectedItem={setSelectedItem} />
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
