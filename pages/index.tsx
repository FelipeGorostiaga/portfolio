import Head from 'next/head'
import Home from "../components/Home/Home";
import Navbar from "../components/Layout/Navbar/Navbar";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Portfolio | Felipe Gorostiaga</title>
        <meta name="Portfolio" content="Felipe's portfolio website"/>
        <link rel="icon" href="/rasengan.png"/>
      </Head>
      <Home/>
    </>
  );
}
