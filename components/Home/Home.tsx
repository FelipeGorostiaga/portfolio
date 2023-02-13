import Image from 'next/image';
import styles from './Home.module.scss';

const Home = () => {
  return (
    <main className="bg-gray-50 w-full pt-36 dark:bg-black h-screen">
      <div className="w-100 max-w-5xl mx-auto">
        <div className="flex flex-row gap-20 items-center justify-between">
          <div className="flex flex-col gap-1">
            <div
              className={`${styles.animatedWording} animatedWording text-transparent leading-tight font-sans font-semibold text-6xl`}>
              Felipe Gorostiaga
            </div>
            <div className="text-gray-600 font-sans font-regular text-xl dark:text-gray-300">Sr. Software Engineer at
              Banco Galicia
            </div>
          </div>
          <Image className="object-cover rounded-2xl shadow-2xl" src={'/pfp.jpg'} height={190} width={190}
                 alt="profile picture" />
        </div>
        <div className="w-full h-0.5 bg-gray-200 mt-10 dark:bg-gray-400"></div>
        <p
          className="font-sans italic font-extralight text-xl text-center mt-12 text-gray-600 dark:text-gray-300">&quot;He
          who has a why to live for can
          bear almost any how&quot;</p>
        <p
          className="mt-12 font-sans text-xl font-light m-0 text-center break-normal px-6 text-gray-800 dark:text-gray-300">
          I am a Software Engineer born in Buenos Aires, Argentina. I am a technology enthusiast that is constantly
          learning about the world
          with the purpose of gaining new knowledge to create products and services that serve and inspire humankind. To
          create is the most noble act one can achieve, specially if something truly beautiful and useful is made. That
          is my purpose.
        </p>
      </div>
    </main>
  );
};

export default Home;
