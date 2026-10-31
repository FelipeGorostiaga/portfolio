import { type AppType } from 'next/app';
import { ThemeProvider } from '~/hooks/useTheme';
import '~/styles/globals.css';

const MyApp: AppType = ({ Component, pageProps }) => (
  <ThemeProvider>
    <Component {...pageProps} />
  </ThemeProvider>
);

export default MyApp;
