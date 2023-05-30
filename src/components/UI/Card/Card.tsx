import { type ReactElement } from 'react';
import styles from './Card.module.scss';
import Link from 'next/link';

interface CardProps {
  className?: string;
  href?: string;
  children: ReactElement | string;
}

const Card = ({ children, className = '', href }: CardProps) => {
  if (href) {
    return (
      <Link href={href} className={`${styles.card} ${className}`}>
        {children}
      </Link>
    );
  }
  return (
    <div className={`${styles.card} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
