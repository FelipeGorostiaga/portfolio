import Head from 'next/head';
import Contact from '../../components/Contact/Contact';

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact | Felipe Gorostiaga</title>
        <meta name="Portfolio" content="Felipe's portfolio website" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <div className="h-full w-full flex items-center lg:items-start justify-center pb-3">
        <Contact />
      </div>
    </>
  );
}
