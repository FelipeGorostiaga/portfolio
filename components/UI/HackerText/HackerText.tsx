import styles from './HackerText.module.scss';
import { useEffect, useState } from 'react';
import { letters } from '../../../utils/constants/strings';

interface TextProps {
  children: string;
  className: string;
}

const HackerText = ({ children, className }: TextProps) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [shownText, setShownText] = useState<string>(children);

  useEffect(() => {
    function hackerEffect() {
      let iterations = 0;
      const interval = setInterval(() => {
        const randomWord = children.split('')
          .map((letter, index) => {
            if (index < iterations) {
              return children.charAt(index);
            }
            return letters[Math.floor(Math.random() * 26)];
          })
          .join('');
        setShownText(randomWord);

        if (iterations >= children.length) {
          console.log('Cleared interval');
          clearInterval(interval);
          console.log(interval);
        }

        iterations += 1 / 3;
      }, 30);
    }

    if (isHovered) {
      hackerEffect();
    }
  }, [children, isHovered]);

  return (
    <span onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
          className={`${styles.hackerText} ${className} font-mono`}>
      {shownText}
    </span>
  );
};

export default HackerText;
