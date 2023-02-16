import styles from './SideDrawer.module.scss';
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import AppsIcon from '@mui/icons-material/Apps';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Image from 'next/image';
import TerminalIcon from '@mui/icons-material/Terminal';


const SideDrawer = () => {
  return (
    <div className={styles.container}>
      <div className="flex flex-row gap-2 items-center">
        <Image src={'/pfp.jpg'} alt='' height={60} width={60} className={styles.profileImage}/>
        <span className="text-sans text-gray-300 text-lg">Felipe Gorostiaga</span>
      </div>
      <Link href={'/'} className="flex flex-row gap-3 items-center justify-start cursor-pointer">
        <HomeIcon fontSize="large" style={{ color: 'white' }} />
        <span className={`text-sans text-gray-100 text-xl ${styles.linkSelected}`}>Home</span>
      </Link>
      <Link href={'/gallery'} className="flex flex-row gap-3 items-center justify-start cursor-pointer">
        <CategoryIcon fontSize="large" style={{ color: 'white' }} />
        <span className="text-sans text-gray-200 text-xl">Gallery</span>
      </Link>
      <Link href={'/games'} className="flex flex-row gap-3 items-center justify-start cursor-pointer">
        <AppsIcon fontSize="large" style={{ color: 'white' }} />
        <span className="text-sans text-gray-100 text-xl">Games</span>
      </Link>
      <Link href={'/contact'} className="flex flex-row gap-3 items-center justify-start cursor-pointer">
        <AccountCircleIcon fontSize="large" style={{ color: 'white' }} />
        <span className="text-sans text-gray-100 text-xl">Contact</span>
      </Link>
      <Link href={'/experience'} className="flex flex-row gap-3 items-center justify-start cursor-pointer">
        <TerminalIcon fontSize="large" style={{ color: 'white' }} />
        <span className="text-sans text-gray-100 text-xl">Experience</span>
      </Link>
    </div>
  );
};

export default SideDrawer;
