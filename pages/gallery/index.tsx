import Head from 'next/head';
import UnderConstruction from '../../components/UnderConstruction/UnderConstruction';

export default function GalleryPage() {
  return (
    <>
      <Head>
        <title>Gallery | Felipe Gorostiaga</title>
        <meta name="Portfolio" content="Felipe's portfolio website" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <div className="h-full w-full flex items-start justify-center pt-20 md:pt-40 dark:bg-black">
        <UnderConstruction />
      </div>
    </>
  );
}
