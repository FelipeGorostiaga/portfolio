import styles from './Home.module.scss';
import Button, { type ButtonSize } from '@ui/Button/Button';
import BlobTracker from '@ui/BlobMouseTracker/BlobTracker';
import { useRouter } from 'next/router';
import useBreakpoints from '~/hooks/useBreakpoints';
import Image from 'next/image';

const Home = () => {
  const { sm, md } = useBreakpoints();
  const router = useRouter();
  const contactButtonSize: ButtonSize = sm ? 'fullWidth' : md ? 'small' : 'medium';
  const projectsButtonSize: ButtonSize = sm ? 'fullWidth' : 'medium';

  return (
    <>
      <div
        className="h-full w-full max-w-4xl mx-auto py-8 flex flex-col px-6 md:px-12 lg:px-0 z-10 justify-start md:justify-center">
        <div
          className="flex flex-col-reverse items-center justify-between md:flex-row md:justify-start gap-4 xs:gap-8 md:gap-14 lg:gap-24 2xl:gap-40">
          <div className="flex flex-col gap-1 xs:gap-2 items-center md:items-start justify-center">
            <div className={`${styles.animatedWording} font-sans font-bold text-3xl md:text-5xl lg:text-5xl`}>
              FELIPE GOROSTIAGA
            </div>
            <div
              className={`${styles.animatedSubtitle} text-gray-600 text-center font-sans font-regular dark:text-gray-300 md:text-xl`}>
              Software Engineer & Fullstack Developer
            </div>
          </div>
          <Image src={'/pfp-smiling.jpg'}
                 alt="profile image"
                 height={sm ? 180 : 250}
                 width={sm ? 180 : 250}
                 className={styles.pfp} />
        </div>
        <div className="w-full h-0.5 bg-neutral-400 sm:bg-neutral-300 my-8 dark:bg-gray-400 m-auto md:my-12"></div>
        <p
          className="font-sans text-base font-normal m-0 break-normal text-gray-600 dark:text-gray-300 md:text-large">
          I am an innovative engineer and passionate technology enthusiast, constantly seeking to expand my knowledge
          and understanding of the world. I harness this driving force to create exceptional products and services that
          not only serve humanity but also empower individuals to
          unleash their full potential. The act of creation, for me, is a noble endeavor, where the pursuit of knowledge
          and the desire to make a lasting impact converge in the most profound and transformative ways, that is my
          purpose.
        </p>
        <div className="flex items-center flex-wrap justify-start w-full gap-3 md:gap-7 mt-12">
          <Button intent="primary" size={contactButtonSize}  href='/contact'>Contact
            me</Button>
          <Button intent="secondary" size={projectsButtonSize} href='/experience'>See my
            work experience</Button>
        </div>
      </div>
      {!md && <BlobTracker />}
    </>
  );
};

export default Home;
