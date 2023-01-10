import "../styles/globals.css";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";

export default function App({ Component, pageProps }) {
  <Head>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
    />
  </Head>;
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
