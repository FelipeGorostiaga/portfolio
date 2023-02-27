import Head from 'next/head';
import BackgroundImage from '../../components/UI/BackgroundImage/BackgroundImage';

export default function ExperiencePage() {
  return (
    <>
      <Head>
        <title>Experience | Felipe Gorostiaga</title>
        <meta name="Portfolio" content="Felipe's portfolio website" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <div className="h-full w-full flex items-center justify-center">
        <BackgroundImage />
      </div>
    </>
  );
}
