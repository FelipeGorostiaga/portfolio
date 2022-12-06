import Head from 'next/head';
import Home from '../components/Home/Home';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Portfolio | Felipe Gorostiaga</title>
        <meta name="Portfolio" content="Felipe's portfolio website" />
        <link rel="icon" href="/rasengan.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;900&display=swap"
              rel="stylesheet" />
      </Head>
      <Home />
    </>
  );
}
