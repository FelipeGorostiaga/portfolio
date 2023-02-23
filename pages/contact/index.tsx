import Head from 'next/head';
import HackerText from '../../components/UI/HackerText/HackerText';

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact | Felipe Gorostiaga</title>
        <meta name="Portfolio" content="Felipe's portfolio website" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <div className="h-full w-full flex items-center justify-center">
        <HackerText className="text-black dark:text-gray-50 text-5xl">HACKER EFFECT</HackerText>
      </div>
    </>
  );
}
