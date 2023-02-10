import Head from 'next/head';

export default function GalleryPage() {
  return (
    <>
      <Head>
        <title>Gallery | Felipe Gorostiaga</title>
        <meta name="Portfolio" content="Felipe's portfolio website" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <p className="font-sans text-lg text-black">Gallery</p>
    </>
  );
}
