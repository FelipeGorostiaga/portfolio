import { type AppType } from 'next/app';
import ThemeProvider from '../contexts/ThemeContext';
import Navbar from '../components/Layout/Navbar/Navbar';
import SideDrawerProvider from '../contexts/SideDrawerContext';
import Footer from '../components/Layout/Footer/Footer';
import { SessionProvider } from 'next-auth/react';
import { type Session } from 'next-auth';
import { api } from '~/utils/api';
import '~/styles/globals.css';

const MyApp: AppType<{ session: Session | null }> = ({
                                                       Component,
                                                       pageProps: { session, ...pageProps },
                                                     }) => {
  return (
    <SessionProvider session={session}>
      <ThemeProvider>
        <main
          className="bg-gradient-to-b from-white via-white to-[#dce2fa] dark:from-black dark:to-[#020714] main-grid">
          <SideDrawerProvider>
            <Navbar />
          </SideDrawerProvider>
          <Component {...pageProps} />
          <Footer />
        </main>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
