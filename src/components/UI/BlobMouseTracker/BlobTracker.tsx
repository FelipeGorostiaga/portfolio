import styles from './BlobTracker.module.scss';
import { useCallback, useEffect, useRef } from 'react';
import { useTheme } from '~/contexts/ThemeContext';

const BlobTracker = () => {
  const { isDark } = useTheme();
  const blobRef = useRef(null);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    const { clientX, clientY } = event;
    const wHeight = window.innerHeight;
    const wWidth = window.innerWidth;
    const widthOff = wWidth - clientX;
    const heightOff = wHeight - clientY;
    let left = clientX;
    let top = clientY;

    if (widthOff <= 100) {
      left = window.innerWidth - 100;
    }

    if (heightOff <= 82) {
      top = window.innerHeight - 82;
    }

    if (blobRef.current) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      blobRef?.current?.animate({
        left: `${left}px`,
        top: `${top}px`,
      }, { duration: 3000, fill: 'forwards' });
    }
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

/*  if (!isDark) {
    return null;
  }*/

  return (
    <div className={`${styles.blob} ${isDark ? styles.blobDark : styles.blobLight}`} ref={blobRef}></div>
  );
};

export default BlobTracker;
