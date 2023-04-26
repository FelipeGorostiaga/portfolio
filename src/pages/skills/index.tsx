import Head from 'next/head';
import Skills from '../../components/Skills/Skills';

export default function SkillsPage() {
  return (
    <>
      <Head>
        <title>Skills | Felipe Gorostiaga</title>
        <meta name="Skills" content="Felipe's portfolio website" />
      </Head>
      <div className="h-full w-full flex items-center justify-center dark:bg-black">
        <Skills />
      </div>
    </>
  );
}
