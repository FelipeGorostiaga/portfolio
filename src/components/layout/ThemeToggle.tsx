import { useTheme } from '~/hooks/useTheme';
import { MoonIcon, SunIcon } from './icons';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  // Both icons render; CSS shows the right one so server and client markup match.
  return (
    <button
      type="button"
      className={styles.button}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={(event) => toggle(event.currentTarget)}
    >
      <SunIcon className="icon-sun" />
      <MoonIcon className="icon-moon" />
    </button>
  );
}
