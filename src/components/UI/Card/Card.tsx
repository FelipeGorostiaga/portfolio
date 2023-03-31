import { ReactElement } from 'react';
import styles from './Card.module.scss';

interface CardProps {
  className?: string;
  children: ReactElement | string;
}

const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div className={`${styles.card} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
