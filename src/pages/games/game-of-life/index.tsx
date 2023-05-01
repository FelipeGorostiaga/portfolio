import Head from 'next/head';
import GameOfLife from '~/components/Games/GameOfLife/GameOfLife';

export default function GameOfLifePage() {
  return (
    <>
      <Head>
        <title>Game of Life | Felipe Gorostiaga</title>
        <meta name="Game of Life" content="Conway's Game of Life" />
      </Head>
      <div className="h-full w-full flex items-start justify-center bg-white pt-8 pb-6 sm:pb-14 sm:pt-20 dark:bg-black">
        <GameOfLife />
      </div>
    </>
  );
}
