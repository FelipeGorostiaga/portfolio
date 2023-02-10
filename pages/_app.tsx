import '../styles/globals.css';
import type { AppProps } from 'next/app';
import ThemeProvider from '../contexts/ThemeContext';
import Navbar from '../components/Layout/Navbar/Navbar';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <>
        <Navbar/>
        <Component {...pageProps} />
      </>
    </ThemeProvider>
);
}
