import Head from "next/head";

export const SEO = ({
  title,
  description,
  slug,
  imgUrl,
}: {
  title: string;
  description?: string;
  slug?: string;
  imgUrl?: string;
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="author" content="yunjeoming" />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`https://${slug}`} />
      <meta property="og:image" content={imgUrl} />
      <meta property="og:image:alt" content={`윤로그 이미지`} />
      <meta property="og:locale" content="ko_KR" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imgUrl} />
      <meta name="twitter:image:alt" content={`윤로그 이미지`} />
    </Head>
  );
};
