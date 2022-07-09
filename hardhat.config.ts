import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-ethers';
import 'hardhat-deploy-ethers';
import 'hardhat-deploy';
import '@symfoni/hardhat-react';
import 'hardhat-typechain';
import '@typechain/ethers-v5';
import * as dotenv from "dotenv";

import { HardhatUserConfig } from 'hardhat/config';


dotenv.config()

const config: HardhatUserConfig = {
  react: {
    providerPriority: ["web3modal", "hardhat"],
  },
  typechain: {
    "outDir": "./frontend-next/hardhat/typechain",
    "target": "ethers-v5"
  },
  defaultNetwork: "goerli",
  networks: {
    goerli: {
      url: `${process.env.ALCHEMY_URL}`,
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : []
    },
  },
  paths: {
    artifacts: "./artifacts",
    cache: "./cache",
    sources: "./contracts",
    tests: "./test",
    react: "./frontend-next/hardhat"
  },
  mocha: {
    timeout: 60000,
  },
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
  };

export default config;
