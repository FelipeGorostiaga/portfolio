import Head from 'next/head';
import Movies from '../../../components/Gallery/Movies/Movies';

export default function MoviesPage() {
  return (
    <>
      <Head>
        <title>Movies | Felipe Gorostiaga</title>
        <meta name="Portfolio" content="Felipe's portfolio website" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <div className="h-full w-full flex items-start justify-center dark:bg-black">
        <Movies />
      </div>
    </>
  );
}
