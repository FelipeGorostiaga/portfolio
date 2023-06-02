import Head from 'next/head';
import Snake from '@components/Games/Snake/Snake';
import useBreakpoints from '~/hooks/useBreakpoints';

export default function SnakePage() {
  const { sm } = useBreakpoints();
  return (
    <>
      <Head>
        <title>Snake | Felipe Gorostiaga</title>
        <meta name="Snake" content="The Snake Game"/>
      </Head>
      <div
        className="h-full w-full flex items-start justify-center bg-white pt-6 pb-12 dark:bg-black">
        {sm?   <div className="pt-10 text-base font-semibold text-slate-800 dark:text-neutral-300 text-center">Game not available for mobile devices</div> : <Snake /> }
      </div>
    </>
  );
}
