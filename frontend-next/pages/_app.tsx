import "../asset/css/global.css";
import "../styles/index.css";
import "../styles/App.css";
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";

import type { AppProps } from "next/app";
import Head from "next/head";
import { WalletProvider } from "../context/useWalletContext";

function getLibrary(provider: any) {
  return new Web3(provider);
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <WalletProvider>
        <Head>
          <title>Socious</title>
          <meta name="description" content="Socious" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
            rel="stylesheet"
          />
        </Head>
        <Web3ReactProvider getLibrary={getLibrary}>
          <Component {...pageProps} />
        </Web3ReactProvider>
      </WalletProvider>
    </>
  );
}

export default MyApp;
