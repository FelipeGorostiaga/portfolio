import Head from 'next/head';
import Skills from '../../components/Skills/Skills';

export default function SkillsPage() {
  return (
    <>
      <Head>
        <title>Skills | Felipe Gorostiaga</title>
        <meta name="Portfolio" content="Felipe's portfolio website" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <div className="h-full w-full flex items-center justify-center bg-white dark:bg-black">
        <Skills />
      </div>
    </>
  );
}
