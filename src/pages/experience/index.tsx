import Head from 'next/head';
import Experience from '../../components/Experience/Experience';

export default function ExperiencePage() {
  return (
    <>
      <Head>
        <title>Experience | Felipe Gorostiaga</title>
        <meta name="Experience" content="Felipe's portfolio website" />
      </Head>
      <div className="h-full w-full flex items-center justify-center dark:bg-black">
        <Experience />
      </div>
    </>
  );
}
