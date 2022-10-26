import styles from './Home.module.scss';
import Image from "next/image";
import Navbar from "../Layout/Navbar/Navbar";

const Home = () => {
  return (
    <main className={styles.container}>
      <Navbar />
      <section className={styles.imgContainer}>
        <div className={styles.imgWrapper}>
          <Image src='/rasengan.png' alt='Profile picture' width={400} height={400} className={styles.pfp}/>
          <Image src='/argentina.jpg' alt='Argentina flag' width={50} height={40} className={styles.arg}/>
        </div>
      </section>
      <section className={styles.introduction}>
        <span>Felipe Gorostiaga | Software Engineer</span>
      </section>
    </main>
  );
}

export default Home;
