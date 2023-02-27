import styles from './BackgroundImage.module.scss';


interface BackgroundImageProps {
  height: string | number;
  width: string | number;
}

const BackgroundImage = () => {

  return (
    <div className={styles.person}>
      <div className={styles.personContainer}>
        <img src={'/water.jpg'} className={styles.circleImg} alt=""/>
        <img src={'/pfp-no-background.png'} className={styles.personImg} alt="profile picture"/>
      </div>
    </div>
  );
};

export default BackgroundImage;

