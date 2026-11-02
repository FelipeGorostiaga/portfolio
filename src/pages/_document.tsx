import { Head, Html, Main, NextScript } from 'next/document';
import { THEME_SCRIPT } from '~/lib/theme';

const FONTS_URL =
  'https://fonts.googleapis.com/css2?family=Geist:wght@300..800&family=Geist+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&display=swap';

export default function Document() {
  return (
    <Html lang="en" className="dark">
      <Head>
        {/* Must run before first paint so the stored theme never flashes. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={FONTS_URL} />
        {/* The fg_ tile, see docs/design/LOGO.md. */}
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#060807" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
