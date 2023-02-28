import { cva } from 'class-variance-authority';

interface ButtonProps {
  children: any;
  intent: 'primary' | 'secondary' | 'danger';
  fullWidth?: boolean;
  onClick: () => void;
  className?: string;
}

const buttonStyles = cva(
  'flex items-center justify-center px-4 py-2 rounded font-base font-sans focus-outline-none cursor-pointer',
  {
    variants: {
      intent: {
        primary: 'bg-blue-600 text-gray-200 hover:bg-blue-700',
        secondary: 'bg-transparent text-neutral-800 text-black dark:text-gray-200 dark:hover:text-white border-blue-600 border-2 hover:border-blue-700 ',
        danger: 'bg-red-600 text-gray-100 hover:bg-red-700',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-[377px]',
      },
    },
    defaultVariants: {
      intent: 'primary',
    },
  },
);

const Button = ({ intent, fullWidth = false, onClick, children, className = '' }: ButtonProps) => {
  return <button className={`${buttonStyles({ intent, fullWidth })} ${className}`} onClick={onClick}>{children}</button>;
};

export default Button;
