import '../styles/globals.css';
import type { AppProps } from 'next/app';
import ThemeProvider from '../contexts/ThemeContext';
import Navbar from '../components/Layout/Navbar/Navbar';
import SideDrawerProvider from '../contexts/SideDrawerContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <div className="bg-gray-50 dark:bg-black min-h-screen">
        <SideDrawerProvider>
          <Navbar />
        </SideDrawerProvider>
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}
