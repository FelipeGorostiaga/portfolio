import Head from 'next/head';
import Home from '../components/Home/Home';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Portfolio | Felipe Gorostiaga</title>
        <meta name="Portfolio" content="Felipe's portfolio website" />
        <meta property="og:url" content="www.felipegorostiaga.com" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Felipe's Website"
        />
        <meta
          property="og:description"
          content="Felipe Gorostiaga | Portfolio Website"
        />
        <meta property="og:image" content="/logo.png" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Home />
    </>
  );
}
