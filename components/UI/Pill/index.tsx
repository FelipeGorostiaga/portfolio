import { IPill } from '@ui/Pill/type';

const Pill = ({ label, className, ...rest }: IPill) => {
  return (
    <div className={`px-6 py-2 ${className ?? ''}`} {...rest}>{label}</div>
  );
};

export default Pill;
