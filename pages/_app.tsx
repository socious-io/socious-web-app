import { WagmiConfig, createClient, configureChains, Chain } from "wagmi";
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import type { AppProps } from "next/app";
import Layout from "layout/Wrapper/Wrapper";
import "../asset/css/global.css";
import "../styles/index.css";
import "../styles/App.css";

const milkomedaTest: Chain = { 
  id: 200101, 
  name: "Milkomeda Cardano Testnet",
  network: "Milkomeda Cardano Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "milkTADA",
    symbol: "milkTADA",
  },
  rpcUrls: {
    default: "https://rpc-devnet-cardano-evm.c1.milkomeda.com",
  },
  blockExplorers: {
    default: { name: "BlockScout", url: "https://explorer-devnet-cardano-evm.c1.milkomeda.com" }
  },
  testnet: true,
};

const milkomedaMain: Chain = { 
  id: 2001, 
  name: "Milkomeda Cardano (C1)",
  network: "Milkomeda Cardano (C1)",
  nativeCurrency: {
    decimals: 18,
    name: "milkADA",
    symbol: "milkADA",
  },
  rpcUrls: {
    default: "https://rpc-mainnet-cardano-evm.c1.milkomeda.com",
  },
  blockExplorers: {
    default: { name: "BlockScout", url: "https://explorer-mainnet-cardano-evm.c1.milkomeda.com" }
  },
  testnet: false,
};

const { provider } = configureChains([milkomedaTest, milkomedaMain], 
  [jsonRpcProvider({ 
    rpc: (chain) => { 
      return { http: chain.rpcUrls.default } }
   })]
);

const client = createClient({provider});

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
