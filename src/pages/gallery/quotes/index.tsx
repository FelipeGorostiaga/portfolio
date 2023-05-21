import Head from 'next/head';
import Quotes from '../../../components/Gallery/Quotes/Quotes';

export default function QuotesPage() {
  return (
    <>
      <Head>
        <title>Quotes | Felipe Gorostiaga</title>
        <meta name="Portfolio" content="Felipe's portfolio website" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <div className="h-full w-full flex items-start justify-center dark:bg-black">
        <Quotes />
      </div>
    </>
  );
}
