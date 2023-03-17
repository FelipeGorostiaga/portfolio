import { IPill } from '@ui/Pill/type';

const Pill = ({ label, color, className, ...rest }: IPill) => {
  return (
    <div className={`px-6 py-4 text-base text-white font-medium bg-[${color}] ${className ?? ''}`} {...rest}>{label}</div>
  );
};

export default Pill;
