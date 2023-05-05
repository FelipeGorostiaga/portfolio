import Head from 'next/head';
import Games from '~/components/Games/Games';

export default function GamesPage() {
  return (
    <>
      <Head>
        <title>Games | Felipe Gorostiaga</title>
        <meta name="Games" content="Felipe's portfolio website" />
      </Head>
      <div className="h-full w-full flex items-start justify-center py-8 md:pt-20 dark:bg-black">
       <Games />
      </div>
    </>
  );
}
