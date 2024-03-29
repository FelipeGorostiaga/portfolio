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
      <div className="h-full min-w-full flex items-start justify-center pt-8 md:pt-12 lg:pt-16 pb-10 dark:bg-black">
        <Books />
      </div>
    </>
  );
}
