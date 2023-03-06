import { cva } from 'class-variance-authority';

type InputType = 'text' | 'number' | 'email' | 'phone' | 'password';
type InputSize = 'fullWidth' | 'small';

export interface ButtonProps {
  label?: string;
  type?: InputType;
  size?: InputSize;
  className?: string;
  placeholder?: string;
  error?: boolean;
  errorMessage?: string;
}

const labelStyles = cva(
  'text-base font-sans font-normal text-neutral-900 dark:text-gray-300 leading-snug ',
  {
    variants: {
      error: {
        true: 'text-red-400',
        false: '',
      },
    },
    defaultVariants: {
      error: false,
    },
  },
);

const inputStyles = cva(
  'px-3 py-2 text-sans font-normal text-lg text-neutral-700 rounded-lg font-base font-sans border-2 ' +
  'focus-outline-none cursor-pointer bg-gray-300 dark:bg-darkgray focus:outline-none dark:placeholder-neutral-500 ' +
  'caret-blue-400 focus:border-2 focus:border-blue-600',
  {
    variants: {
      error: {
        true: 'border border-red-400',
        false: '',
      },
      size: {
        fullWidth: 'w-full',
        small: 'w-[377px]',
      },
    },
    defaultVariants: {
      error: false,
      size: 'fullWidth',
    },
  },
);

const Input = ({
                 label,
                 type = 'text',
                 size = 'fullWidth',
                 className,
                 placeholder = '',
                 error = false,
                 errorMessage,
               }: ButtonProps) => {
  return (
    <div className="flex flex-col items-start gap-0.5 justify-start">
      {label && <label className={labelStyles({ error })}>{label}</label>}
      <div className="w-full flex flex-col items-start">
        <input className={`${inputStyles({ size, error })} ${className || ''}`} placeholder={placeholder} type={type} />
        {error && <p className="text-sm text-red-400">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Input;
