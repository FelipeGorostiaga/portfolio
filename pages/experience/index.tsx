import Head from 'next/head';
import Experience from '../../components/Experience/Experience';

export default function ExperiencePage() {
  return (
    <>
      <Head>
        <title>Experience | Felipe Gorostiaga</title>
        <meta name="Portfolio" content="Felipe's portfolio website" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <div className="h-full w-full flex items-center justify-center bg-white dark:bg-black">
        <Experience />
      </div>
    </>
  );
}
