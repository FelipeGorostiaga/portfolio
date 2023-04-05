import styles from './GlowCard.module.scss';
import { type ReactElement } from 'react';

interface CardProps {
  className?: string;
  children: string | ReactElement;
}

const GlowCard = ({ children, className = '' }: CardProps) => {
  return (
    <div className={`${styles.card} ${className}`}>{children}</div>
  );
}

export default GlowCard;
