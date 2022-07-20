import { WagmiConfig, createClient } from "wagmi";
import type { AppProps } from "next/app";
import Layout from "../layout/Wrapper/Wrapper";
import { connector, provider } from "../components/wallet/connector";
import "../asset/css/global.css";
import "../styles/index.css";
import "../styles/App.css";

const client = createClient({
  autoConnect: true,
  connectors: [ connector ],
  provider
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Layout>
        <WagmiConfig client={client}>
          <Component {...pageProps} />
          </WagmiConfig>
      </Layout>
    </>
  );
}

export default MyApp;
