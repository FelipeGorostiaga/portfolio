import Head from 'next/head';
import Contact from '../../components/Contact/Contact';

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact | Felipe Gorostiaga</title>
        <meta name="Contact" content="Felipe's portfolio website" />
      </Head>
      <div className="h-full w-full flex items-center lg:items-start justify-center">
        <Contact />
      </div>
    </>
  );
}
