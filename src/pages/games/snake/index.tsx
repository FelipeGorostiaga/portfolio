import Head from 'next/head';
import Snake from '@components/Games/Snake/Snake';

export default function SnakePage() {
  return (
    <>
      <Head>
        <title>Snake | Felipe Gorostiaga</title>
        <meta name="Snake" content="The Snake Game"/>
      </Head>
      <div
        className="h-full w-full flex items-start justify-center bg-white pt-8 pb-6 sm:pb-14 sm:pt-20 dark:bg-black">
        <Snake />
      </div>
    </>
  );
}
