import styles from './SideDrawer.module.scss';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import AppsIcon from '@mui/icons-material/Apps';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Image from 'next/image';
import TerminalIcon from '@mui/icons-material/Terminal';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useSideDrawer } from '../../../../../contexts/SideDrawerContext';
import DrawerItem from './DrawerItem';
import { useCallback } from 'react';
import { useRouter } from 'next/router';

interface ILink {
  route: string;
  name: string;
  icon: any;
}

const links: ILink[] = [
  {
    route: '/',
    name: 'Home',
    icon: <HomeIcon fontSize="medium" style={{ color: 'white' }} />,
  },
  {
    route: '/gallery',
    name: 'Gallery',
    icon: <CategoryIcon fontSize="medium" style={{ color: 'white' }} />,
  },
  {
    route: '/games',
    name: 'Games',
    icon: <AppsIcon fontSize="medium" style={{ color: 'white' }} />,
  },
  {
    route: '/experience',
    name: 'Experience',
    icon: <TerminalIcon fontSize="medium" style={{ color: 'white' }} />,
  },
  {
    route: '/contact',
    name: 'Contact',
    icon: <AccountCircleIcon fontSize="medium" style={{ color: 'white' }} />,
  },
];


const SideDrawer = () => {
  const { setIsOpen } = useSideDrawer();
  const { pathname } = useRouter();

  const isSelected = useCallback((route: string): boolean => {
    return route === pathname;
  }, [pathname]);

  return (
    <div className={styles.container}>
      <div
        className="w-[40px] h-[40px] rounded-full bg-neutral-900 absolute flex items-center justify-center top-[1rem] right-[1rem] cursor-pointer">
        <ArrowBackIosNewIcon onClick={() => setIsOpen(false)} className={styles.arrowIcon} style={{ color: 'white' }} />
      </div>
      <div className="flex flex-row gap-4 items-center pl-8 w-full">
        <Image src={'/pfp.jpg'} alt="" height={60} width={60} className={styles.profileImage} />
        <span className="text-sans text-gray-300 text-lg">Felipe Gorostiaga</span>
      </div>
      <div className="w-full bg-neutral-900 h-0.5 my-8"></div>
      <div className="flex flex-col pl-8 gap-8">
        {links.map((link: ILink) => {
          return <DrawerItem key={link.name}
                             route={link.route}
                             name={link.name}
                             icon={link.icon}
                             onClick={() => setIsOpen(false)} selected={isSelected(link.route)} />;
        })}
      </div>
    </div>
  );
};

export default SideDrawer;
