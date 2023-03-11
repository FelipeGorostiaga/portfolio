import '../styles/globals.css';
import type { AppProps } from 'next/app';
import ThemeProvider from '../contexts/ThemeContext';
import Navbar from '../components/Layout/Navbar/Navbar';
import SideDrawerProvider from '../contexts/SideDrawerContext';
import Footer from '../components/Layout/Footer/Footer';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <main className="bg-white dark:bg-black main-grid">
        <SideDrawerProvider>
          <Navbar />
        </SideDrawerProvider>
        <Component {...pageProps} />
        <Footer />
      </main>
    </ThemeProvider>
  );
}
