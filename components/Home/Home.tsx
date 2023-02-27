import styles from './Home.module.scss';
import useBreakpoints from '../../hooks/useBreakpoints';
import BlobTracker from '../UI/BlobMouseTracker/BlobTracker';
import BackgroundImage from '../UI/BackgroundImage/BackgroundImage';

// Image className="object-cover shadow-2xl aspect-square rounded-full" src={'/pfp.jpg'} height={imgSize} width={imgSize} alt="profile picture" />
// const imgSize = xs? 130 : (md? 160 : 200);

const Home = () => {
  const { md } = useBreakpoints();
  return (
    <>
      <div className="w-full max-w-5xl mx-auto pt-12 pb-16 flex flex-col md:pt-36 md:pb-24 z-10">
        <div
          className="flex flex-col-reverse gap-8 items-center justify-between md:flex-row md:gap-14 md:justify-center lg:gap-20">
          <div className="flex flex-col gap-1 xs:gap-2 items-center md:items-start justify-center px-6">
            <div className={`${styles.animatedWording} font-sans font-semibold text-4xl md:text-5xl lg:text-6xl`}>
              Felipe Gorostiaga
            </div>
            <div className="text-gray-600 text-center font-sans font-regular dark:text-gray-300 md:text-xl">
              Sr. Software Engineer at Banco Galicia
            </div>
          </div>
          <BackgroundImage />
        </div>
        <div className="w-[80%] h-0.5 bg-gray-200 my-8 dark:bg-gray-400 m-auto md:my-12"></div>
        <p className="font-sans italic font-light text-lg text-center text-gray-600 dark:text-gray-300 m-0 px-6 xs:px-10 sm:px-16 md:text-xl lg:text-2xl relative
      before:content-[open-quote] before:text-2xl sm:before:text-5xl before:font-serif before:text-blue-400 dark:before:text-blue-600
      after:content-[close-quote] after:text-2xl sm:after:text-5xl after:font-serif after:text-blue-400 dark:after:text-blue-600">
          He
          who has a why to live for can
          bear almost any how
        </p>
        <p
          className="font-sans text-base mt-12 font-light m-0 text-center break-normal px-6 xs:px-10 sm:px-16 text-neutral-900 dark:text-gray-300 md:text-xl md:px-32">
          I am a Software Engineer born in Buenos Aires, Argentina. I am a technology enthusiast that is constantly
          learning about the world
          with the purpose of gaining new knowledge to create products and services that serve and inspire humankind. To
          create is the most noble act one can achieve, specially if something truly beautiful and useful is made. That
          is my purpose.
        </p>
      </div>
      {!md && <BlobTracker />}
    </>
  );
};

export default Home;
