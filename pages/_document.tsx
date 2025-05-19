import { Html, Head, Main, NextScript } from "next/document";

// import { GeistSans } from "geist/font/sans";
// import { GeistMono } from "geist/font/mono";

const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function Document() {
  return (
    <Html
      lang="en"
      className={cx(
        "text-black bg-white dark:text-white dark:bg-black"
        // GeistSans.variable,
        // GeistMono.variable
      )}
    >
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="antialiased max-w-xl mx-4 mt-8 lg:mx-auto">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
