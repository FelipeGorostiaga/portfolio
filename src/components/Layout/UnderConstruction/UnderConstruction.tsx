import Image from 'next/image';
import useBreakpoints from '~/hooks/useBreakpoints';
import { useTheme } from '~/contexts/ThemeContext';

const UnderConstruction = () => {
  const { xs } = useBreakpoints();
  const { isDark } = useTheme();
  return (
    <div className="flex flex-col items-start bg-transparent px-8 md:px-4">
      <h3 className="text-neutral-800 text-xl md:text-2xl lg:text-3xl dark:text-white">Page under construction</h3>
      <p className="text-neutral-800 text-sm sm:text-base dark:text-gray-50">Sorry for the inconvenience, it will be ready soon...</p>
      <Image src={isDark? '/construction-animation-dark.gif' : '/construction-animation.gif'} height={xs? 200 : 300} width={xs? 200: 300} alt="Under construction" className="self-center"/>
    </div>
  );
}

export default UnderConstruction;
