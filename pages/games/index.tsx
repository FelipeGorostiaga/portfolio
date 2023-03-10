import Head from 'next/head';
import UnderConstruction from '../../components/UnderConstruction/UnderConstruction';

export default function GamesPage() {
  return (
    <>
      <Head>
        <title>Games | Felipe Gorostiaga</title>
        <meta name="Games" content="Felipe's portfolio website" />
      </Head>
      <div className="h-full w-full flex items-start justify-center pt-20 md:pt-40">
        <UnderConstruction />
      </div>
    </>
  );
}
