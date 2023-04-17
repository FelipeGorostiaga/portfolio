import { type NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import useBreakpoints from '~/hooks/useBreakpoints';

const NotFoundPage: NextPage = () => {
  const { md } = useBreakpoints();
  return (
    <>
      <Head>
        <title>404 | Felipe Gorostiaga</title>
        <link rel="icon" href="/logo.png" />
        <meta name="title" content="404 | Felipe Gorostiaga" />
      </Head>
      <div
        className="h-full w-full flex flex-col items-center justify-start pt-32 px-4 md:pt-0 md:px-0 md:justify-center gap-1 md:gap-3">
        <Image
          className="rounded-xl object-fill aspect-square dark:border-2 dark:border-neutral-400"
          alt="logo"
          src={'/logo.png'}
          width={!md ? 100 : 60}
          height={!md ? 100 : 60}
        />
        <div className="text-2xl md:text-3xl text-neutral-600 font-bold text-center dark:text-neutral-200">404 Page not
          found
        </div>
        <div className="text-sm md:text-base text-neutral-500 text-center dark:text-neutral-400">The requested page
          doesn&apos;t exist
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
