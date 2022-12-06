import styles from './Home.module.scss';
import Image from 'next/image';
import Navbar from '../Layout/Navbar/Navbar';

const Home = () => {
  return (
    <main className={styles.container}>
      <Navbar />
      <section className={styles.imgContainer}>
        <div className={styles.imgWrapper}>
          <Image src="/pfp.jpg" alt="Profile picture" width={200} height={200} className={styles.pfp} />
          {/* <Image src="/argentina.jpg" alt="Argentina flag" width={45} height={36} className={styles.arg} />*/}
        </div>
      </section>
      <div className={styles.intro}>
        <div className={styles.name}>Felipe Gorostiaga</div>
        <div className={styles.career}>Software Engineer and Fullstack Developer</div>
      </div>
    </main>
  );
};

export default Home;
