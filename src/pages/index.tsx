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
        <meta property="og:image" content="/favicon.ico" />
        <meta name="viewport" content="minimum-scale=1" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      </Head>
      <Home />
    </>
  );
}
