import styles from './Navbar.module.scss';

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.items}>
        <li className={styles.navItem}>
          <a href={'#'}>HOME</a>
        </li>
        <li className={styles.navItem}>
          <a href={'#'}>PROJECTS</a>
        </li>
        <li className={styles.navItem}>
          <a href={'#'}>CONTACT</a>
        </li>
        <li className={styles.navItem}>
          <a href={'#'}>GAMES</a>
        </li>
        <li className={styles.navItem}>
          <a href={'#'}>ABOUT ME</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
