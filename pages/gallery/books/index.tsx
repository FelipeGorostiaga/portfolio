import Head from 'next/head';
import Books from '../../../components/Gallery/Books/Books';

export default function BooksPage() {
  return (
    <>
      <Head>
        <title>Books | Felipe Gorostiaga</title>
        <meta name="Portfolio" content="Felipe's portfolio website" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <div className="h-full w-full flex items-start justify-center pt-20 pb-20 bg-white dark:bg-black">
        <Books />
      </div>
    </>
  );
}
