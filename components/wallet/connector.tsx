import { configureChains, Chain } from "wagmi";
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

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

export const { chains, provider } = configureChains([milkomedaTest, milkomedaMain], 
    [jsonRpcProvider({ 
      rpc: (chain) => { 
        return { http: chain.rpcUrls.default } },
      static: true
    }),
    ]
  );

export const connector = new WalletConnectConnector({
    chains,
    options: { qrcode: true } 
});
