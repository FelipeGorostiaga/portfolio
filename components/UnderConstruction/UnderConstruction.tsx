import Image from 'next/image';
import useBreakpoints from '../../hooks/useBreakpoints';


const UnderConstruction = () => {
  const { xs } = useBreakpoints();
  return (
    <div className="flex flex-col items-start bg-transparent px-8 md:px-4">
      <h3 className="text-neutral-800 text-xl md:text-2xl lg:text-3xl">Page under construction</h3>
      <p className="text-neutral-800 text-sm sm:text-base ">Sorry for the inconvenience, it will be ready soon...</p>
      <Image src='/construction-animation.gif' height={xs? 200 : 300} width={xs? 200: 300} alt="Under construction" className="self-center"/>
    </div>
  );
}

export default UnderConstruction;
