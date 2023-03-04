import { cva } from 'class-variance-authority';

type InputType = 'text' | 'number' | 'select' | 'area';
type InputSize = 'fullWidth' | 'small';

export interface ButtonProps {
  label?: string;
  type?: InputType;
  size?: InputSize;
  className?: string;
}

const inputStyles = cva(
  'px-4 py-2 rounded font-base font-sans focus-outline-none cursor-pointer bg-gray-300 dark:bg-gray-black',
  {
    variants: {
      type: {
        text: '',
        select: '',
        area: '',
        number: '',
      },
      size: {
        fullWidth: 'w-full',
        small: 'w-[377px]',
      },
    },
    defaultVariants: {
      type: 'text',
    },
  },
);

const BaseInput = ({ label, type = 'text', size = 'fullWidth', className }: ButtonProps) => {
  return (
    <div className="flex flex-col gap-1 items-start justify-start">
      {label && <label className="">{label}</label>}
      <input className={`${inputStyles({ type, size })} ${className || ''}`} />
    </div>
  );
};

export default BaseInput;
