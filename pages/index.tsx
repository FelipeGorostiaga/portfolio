import Head from 'next/head';
import Home from '../components/Home/Home';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Portfolio | Felipe Gorostiaga</title>
        <meta name="Portfolio" content="Felipe's portfolio website" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Home />
    </>
  );
}
