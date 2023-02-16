import styles from './SideDrawer.module.scss';
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import AppsIcon from '@mui/icons-material/Apps';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Image from 'next/image';
import TerminalIcon from '@mui/icons-material/Terminal';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useSideDrawer } from '../../../../../contexts/SideDrawerContext';


const SideDrawer = () => {
  const { setIsOpen } = useSideDrawer();

  return (
    <div className={styles.container}>
      <div className="w-[40px] h-[40px] rounded-full bg-neutral-900 absolute flex items-center justify-center top-[1rem] right-[1rem] cursor-pointer">
        <ArrowBackIosNewIcon onClick={() => setIsOpen(false)} className={styles.arrowIcon} style={{ color: 'white' }}/>
      </div>
      <div className="flex flex-row gap-4 items-center pl-8 w-full">
        <Image src={'/pfp.jpg'} alt="" height={60} width={60} className={styles.profileImage} />
        <span className="text-sans text-gray-300 text-lg">Felipe Gorostiaga</span>
      </div>
      <div className="w-full bg-neutral-900 h-0.5 my-8"></div>
      <div className="flex flex-col pl-8 gap-8">
        <Link href={'/'} className="flex flex-row gap-3 items-center justify-start cursor-pointer">
          <HomeIcon fontSize="medium" style={{ color: 'white' }} />
          <span className={`text-sans text-gray-100 text-lg ${styles.linkSelected}`}>Home</span>
        </Link>
        <Link href={'/gallery'} className="flex flex-row gap-3 items-center justify-start cursor-pointer">
          <CategoryIcon fontSize="medium" style={{ color: 'white' }} />
          <span className="text-sans text-gray-200 text-lg">Gallery</span>
        </Link>
        <Link href={'/games'} className="flex flex-row gap-3 items-center justify-start cursor-pointer">
          <AppsIcon fontSize="medium" style={{ color: 'white' }} />
          <span className="text-sans text-gray-200 text-lg">Games</span>
        </Link>
        <Link href={'/contact'} className="flex flex-row gap-3 items-center justify-start cursor-pointer">
          <AccountCircleIcon fontSize="medium" style={{ color: 'white' }} />
          <span className="text-sans text-gray-100 text-lg">Contact</span>
        </Link>
        <Link href={'/experience'} className="flex flex-row gap-3 items-center justify-start cursor-pointer">
          <TerminalIcon fontSize="medium" style={{ color: 'white' }} />
          <span className="text-sans text-gray-100 text-lg">Experience</span>
        </Link>
      </div>
    </div>
  );
};

export default SideDrawer;
