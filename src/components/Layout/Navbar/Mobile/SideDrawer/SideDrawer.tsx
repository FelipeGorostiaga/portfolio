import styles from './SideDrawer.module.scss';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Image from 'next/image';
import TerminalRoundedIcon from '@mui/icons-material/TerminalRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import BookRoundedIcon from '@mui/icons-material/BookRounded';
import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded';
import MovieCreationRoundedIcon from '@mui/icons-material/MovieCreationRounded';
import { useSideDrawer } from '~/contexts/SideDrawerContext';
import DrawerItem from './DrawerItem';
import { type ReactElement, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from '~/contexts/ThemeContext';

export interface ILink {
  route: string;
  name: string;
  icon: ReactElement;
  multilevel?: boolean;
  subItems?: ILink[];
  onClick?: () => void;
  selected: boolean;
}

const SideDrawer = () => {
  const { setIsOpen } = useSideDrawer();
  const { pathname } = useRouter();
  const { isDark } = useTheme();
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const links: ILink[] = useMemo(() => {
    const iconStyle = { color: isDark ? 'white' : '#2b2b2b' };
    return [
      {
        route: '/',
        name: 'Home',
        icon: <HomeRoundedIcon fontSize="medium" style={iconStyle} />,
        get selected() {
          return this.route === pathname;
        },
      },
      {
        route: '/experience',
        name: 'Experience',
        icon: <TerminalRoundedIcon fontSize="medium" style={iconStyle} />,
        get selected() {
          return this.route === pathname;
        },
      },
      {
        route: '/skills',
        name: 'Skills',
        icon: <ConstructionRoundedIcon fontSize="medium" style={iconStyle} />,
        get selected() {
          return this.route === pathname;
        },
      },
      {
        route: '/gallery',
        name: 'Gallery',
        multilevel: true,
        selected: pathname.includes('gallery'),
        icon: <CategoryRoundedIcon fontSize="medium" style={iconStyle} />,
        subItems: [
          {
            route: '/gallery/books',
            name: 'Books',
            icon: <BookRoundedIcon fontSize="small" style={iconStyle} />,
            onClick: () => setIsOpen(false),
            get selected() {
              return this.route === pathname;
            },
          },
          {
            route: '/gallery/movies',
            name: 'Movies',
            icon: <MovieCreationRoundedIcon fontSize="small" style={iconStyle} />,
            onClick: () => setIsOpen(false),
            get selected() {
              return this.route === pathname;
            },
          },
          {
            route: '/gallery/quotes',
            name: 'Quotes',
            icon: <FormatQuoteRoundedIcon fontSize="small" style={iconStyle} />,
            onClick: () => setIsOpen(false),
            get selected() {
              return this.route === pathname;
            },
          },
        ],
      },
      {
        route: '/games',
        name: 'Games',
        icon: <SportsEsportsIcon fontSize="medium" style={{ color: isDark ? 'white' : '#2b2b2b' }} />,
        get selected() {
          return this.route === pathname;
        },
      },
      {
        route: '/contact',
        name: 'Contact',
        icon: <AccountCircleIcon fontSize="medium" style={{ color: isDark ? 'white' : '#2b2b2b' }} />,
        get selected() {
          return this.route === pathname;
        },
      },
    ];
  }, [isDark, pathname, setIsOpen]);

  return (
    <div className={`${styles.container} ${isDark ? styles.containerDark : styles.containerLight}`}>
      <div
        className="w-[40px] h-[40px] rounded-full bg-gray-600 dark:bg-neutral-900 absolute flex items-center justify-center top-[1rem] right-[1rem] cursor-pointer">
        <ArrowBackIosNewIcon onClick={() => setIsOpen(false)} className="mr-0.5" style={{ color: 'white' }} />
      </div>
      <div className="flex flex-row gap-4 items-center pl-8 w-full">
        <Image src={'/pfp-smiling.jpg'} alt="" height={60} width={60} className={styles.profileImage} />
        <span className="text-sans text-gray-700 dark:text-gray-300 text-lg">Felipe Gorostiaga</span>
      </div>
      <div className="w-full bg-gray-300 dark:bg-neutral-900 h-0.5 my-8"></div>
      <div className="flex flex-col w-full">
        {links.map((link: ILink) => {
          let onClick;
          if (link.multilevel) {
            onClick = () => setIsGalleryOpen(prev => !prev);
          } else {
            onClick = () => setIsOpen(false);
          }
          return <DrawerItem key={link.name}
                             route={link.route}
                             name={link.name}
                             icon={link.icon}
                             multilevel={link.multilevel}
                             multilevelOpen={isGalleryOpen}
                             subItems={link.subItems}
                             onClick={onClick}
                             selected={link.selected} />;
        })}
      </div>
    </div>
  );
};

export default SideDrawer;
