import Head from 'next/head';
import { site } from '~/content/site';

type SeoProps = {
  title: string;
  description: string;
  path: string;
  /** For pages search engines shouldn't list (the 404): no canonical URL, noindex. */
  noindex?: boolean;
};

export default function Seo({ title, description, path, noindex = false }: SeoProps) {
  const url = `${site.url}${path}`;
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex ? (
        <meta name="robots" content="noindex" />
      ) : (
        <>
          <link rel="canonical" href={url} />
          <meta property="og:url" content={url} />
        </>
      )}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${site.url}/felipe-portrait.jpg`} />
      <meta name="twitter:card" content="summary" />
    </Head>
  );
}
