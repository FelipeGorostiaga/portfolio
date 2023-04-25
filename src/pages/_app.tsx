import { type AppType } from 'next/app';
import ThemeProviderCustom, { useTheme } from '../contexts/ThemeContext';
import Navbar from '../components/Layout/Navbar/Navbar';
import SideDrawerProvider from '../contexts/SideDrawerContext';
import Footer from '../components/Layout/Footer/Footer';
import { SessionProvider } from 'next-auth/react';
import { type Session } from 'next-auth';
import { api } from '~/utils/api';
import '~/styles/globals.css';
import { createTheme, ThemeProvider } from '@mui/material';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const MyApp: AppType<{ session: Session | null }> = ({
                                                       Component,
                                                       pageProps: { session, ...pageProps },
                                                     }) => {
  return (
    <SessionProvider session={session}>
      <ThemeProviderCustom>
        <MainLayout Component={Component} pageProps={pageProps} />
      </ThemeProviderCustom>
    </SessionProvider>
  );
};

const MainLayout = ({ Component, pageProps }: any) => {
  const { isDark } = useTheme();
  return (
    <ThemeProvider theme={isDark? darkTheme : lightTheme} >
      <div
        className={`dark:bg-gradient-to-b dark:from-black dark:to-[#020714] main-grid ${isDark ? '' : 'radialBg'}`}>
        <SideDrawerProvider>
          <Navbar />
        </SideDrawerProvider>
        <Component {...pageProps} />
        <Footer />
      </div>
    </ThemeProvider>

  );
};

export default api.withTRPC(MyApp);
