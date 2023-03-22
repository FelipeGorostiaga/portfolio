import '../styles/globals.css';
import type { AppProps } from 'next/app';
import ThemeProvider from '../contexts/ThemeContext';
import Navbar from '../components/Layout/Navbar/Navbar';
import SideDrawerProvider from '../contexts/SideDrawerContext';
import Footer from '../components/Layout/Footer/Footer';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <main className="bg-gradient-to-b from-white via-white to-[#dce2fa] dark:from-black dark:to-[#020714] main-grid">
        <SideDrawerProvider>
          <Navbar />
        </SideDrawerProvider>
        <Component {...pageProps} />
        <Footer />
      </main>
    </ThemeProvider>
  );
}
