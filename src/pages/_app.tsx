import { type AppType } from 'next/app';
import ThemeProviderCustom, { useTheme } from '../contexts/ThemeContext';
import Navbar from '../components/Layout/Navbar/Navbar';
import SideDrawerProvider from '../contexts/SideDrawerContext';
import Footer from '../components/Layout/Footer/Footer';
import '~/styles/globals.css';
import { createTheme, ThemeProvider } from '@mui/material';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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

const queryClient = new QueryClient();

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProviderCustom>
        <>
          <Toaster position="top-center" />
          <MainLayout Component={Component} pageProps={pageProps} />
        </>
      </ThemeProviderCustom>
    </QueryClientProvider>
  );
};

const MainLayout = ({ Component, pageProps }: any) => {
  const { isDark } = useTheme();
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <div
        className={`main-grid dark:bg-gradient-to-b dark:from-black dark:to-[#020714] ${
          isDark ? '' : 'radialBg'
        }`}
      >
        <SideDrawerProvider>
          <Navbar />
        </SideDrawerProvider>
        <Component {...pageProps} />
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default MyApp;
