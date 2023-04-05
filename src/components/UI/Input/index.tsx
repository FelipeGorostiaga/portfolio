import { cva } from 'class-variance-authority';
import { type BaseProps } from '~/utils/interfaces/baseProps.interface';
import { type ChangeEvent } from 'react';

type InputType = 'text' | 'number' | 'email' | 'phone' | 'password';
type InputSize = 'fullWidth' | 'small';

export interface ButtonProps extends BaseProps {
  label?: string;
  type?: InputType;
  size?: InputSize;
  className?: string;
  containerClassName?: string;
  error?: boolean;
  errorMessage?: string;
  multiline?: boolean;
  value: string | number | readonly string[] | undefined;
  onChange: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void | undefined;
  onBlur?: (e: any) => void;
  rows?: number;
}

const labelStyles = cva(
  'text-xs sm:text-sm md:text-base font-sans font-normal text-neutral-900 dark:text-neutral-400 leading-snug ',
  {
    variants: {
      error: {
        true: 'text-red-400 dark:text-red-500',
        false: '',
      },
    },
    defaultVariants: {
      error: false,
    },
  },
);

const inputStyles = cva(
  'px-3 py-2 text-sans font-normal text-sm sm:text-base lg:text-lg text-neutral-800 dark:text-neutral-300 rounded-lg font-sans border-2 dark:border-neutral-900 ' +
  'focus-outline-none cursor-pointer bg-gray-300 dark:bg-black focus:outline-none dark:placeholder-neutral-500 ' +
  'caret-blue-400 focus:border-2 focus:border-blue-600 dark:focus:border-blue-600',
  {
    variants: {
      error: {
        true: 'border border-red-400 dark:border-red-500 focus:border-red-400 dark:focus:border-red-500',
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
                 value,
                 onChange,
                 onBlur,
                 label,
                 type = 'text',
                 size = 'fullWidth',
                 className = '',
                 error = false,
                 errorMessage,
                 containerClassName = '',
                 multiline = false,
                 rows = 1,
                 ...props
               }: ButtonProps) => {

  return (
    <div className={`flex flex-col items-start gap-0.5 justify-start ${containerClassName}`}>
      {label && <label className={labelStyles({ error })}>{label}</label>}
      <div className="w-full flex flex-col items-start">
        {
          multiline ?
            (
              <div className="w-full">
                <textarea value={value}
                          onChange={onChange}
                          onBlur={onBlur}
                          className={`${inputStyles({ size, error })} ${className}`}
                          rows={rows}
                          {...props} />
                <span></span>
              </div>
            ) :
            <input value={value}
                   onChange={onChange}
                   onBlur={onBlur}
                   className={`${inputStyles({ size, error })} ${className}`}
                   type={type}
                   {...props} />
        }
        {error && <p className="text-sm text-red-400">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Input;
