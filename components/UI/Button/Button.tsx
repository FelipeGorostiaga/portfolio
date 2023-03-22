import { cva } from 'class-variance-authority';
import { MouseEventHandler, ReactNode } from 'react';

export type ButtonSize = 'small' | 'medium' | 'large' | 'fullWidth' | 'content' | 'pill';
export type ButtonIntent = 'primary' | 'secondary' | 'danger';
export type ButtonType = 'button' | 'submit' | 'reset';

interface ButtonProps {
  children: ReactNode;
  intent: ButtonIntent;
  size: ButtonSize;
  type?: ButtonType;
  onClick: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

const buttonStyles = cva(
  'flex items-center justify-center px-4 py-2 rounded text-sm md:text-base font-sans focus-outline-none cursor-pointer',
  {
    variants: {
      intent: {
        primary: 'bg-blue-600 text-gray-200 hover:bg-blue-700 focus:bg-blue-700',
        secondary: 'bg-transparent text-blue-600 dark:text-gray-200 dark:hover:text-white border-blue-600 border-2 hover:border-blue-700 hover:text-blue-700 dark:bg-transparent',
        danger: 'bg-red-600 text-gray-100 hover:bg-red-700',
      },
      size: {
        fullWidth: 'w-full',
        large: 'w-[377px]',
        medium: 'w-[320px]',
        small: 'w-[244px]',
        content: '',
        pill: 'rounded-[37px]',
      },
    },
    defaultVariants: {
      intent: 'primary',
    },
  },
);

const Button = ({ type = 'button', intent, size = 'medium', onClick, children, className = '' }: ButtonProps) => {
  return <button type={type}
                 className={`${buttonStyles({ intent, size })} ${className}`}
                 onClick={onClick}>{children}</button>;
};

export default Button;
