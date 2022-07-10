import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-ethers';
import '@typechain/hardhat';

import dotenv from "dotenv";

import { HardhatUserConfig } from 'hardhat/config';


dotenv.config()

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.4",
        settings: {
          optimizer: {
            enabled: true,
            runs: 50,
            },
          },
        },
      ],
  },
  defaultNetwork: "goerli",
  networks: {
    goerli: {
      url: `${process.env.GOERLI_URL}`,
      accounts: process.env.GOERLI_PRIVATE_KEY !== undefined ? [process.env.GOERLI_PRIVATE_KEY] : []
    },
    milkomedaTest: {
      url: 'https://rpc-devnet-cardano-evm.c1.milkomeda.com',
      chainId: 200101,
      accounts: process.env.MILKOMEDA_TESTNET_PRIVATE_KEY !== undefined ? [process.env.MILKOMEDA_TESTNET_PRIVATE_KEY] : []
    }
  },
  mocha: {
    timeout: 60000,
  },
  paths: {
    artifacts: "./artifacts",
    cache: "./cache",
    sources: "./contracts",
    tests: "./test",
  },
  typechain: {
    outDir: "./typechain",
    target: "ethers-v5"
  }
};

export default config;
