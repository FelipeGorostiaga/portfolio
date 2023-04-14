import Image from 'next/image';
import useBreakpoints from '~/hooks/useBreakpoints';
import { useTheme } from '~/contexts/ThemeContext';

const UnderConstruction = () => {
  const { xs } = useBreakpoints();
  const { isDark } = useTheme();
  return (
    <div className="flex flex-col items-start bg-transparent px-8 md:px-4">
      <h3
        className="text-slate-700 text-center font-bold text-xl md:text-3xl lg:text-4xl dark:text-slate-200 z-10 w-full">Under
        construction...</h3>
      <Image src={isDark ? '/construction-animation-dark.gif' : '/construction-animation.gif'} height={xs ? 200 : 300}
             width={xs ? 200 : 300} alt="Under construction"
             className="self-center -mt-8 sm:-mt-12" />
    </div>
  );
};

export default UnderConstruction;
