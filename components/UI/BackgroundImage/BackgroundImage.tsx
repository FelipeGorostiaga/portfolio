import styles from './BackgroundImage.module.scss';
import { useTheme } from '../../../contexts/ThemeContext';
import Image from 'next/image';

const BackgroundImage = () => {
  const { isDark } = useTheme();
  const backgroundImg = isDark? '/mountains.jpg' : '/snow.jpg';

  return (
    <div className={styles.person}>
      <div className={styles.personContainer}>
        <Image src={backgroundImg} className={styles.circleImg} alt="" width={192} height={192}/>
        <Image src={'/pfp-no-background.png'} className={styles.personImg} alt="profile picture" width={192} height={192}/>
      </div>
    </div>
  );
};

export default BackgroundImage;

