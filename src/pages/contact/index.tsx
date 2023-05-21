import Head from 'next/head';
import Contact from '../../components/Contact/Contact';

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact | Felipe Gorostiaga</title>
        <meta name="Contact" content="Felipe's portfolio website" />
      </Head>
      <div className="h-full w-full flex items-start sm:items-center bg-gray-200 dark:bg-[#050505] sm:dark:bg-black md:bg-transparent justify-center py-3 md:py-8">
        <Contact />
      </div>
    </>
  );
}
