import { utils, Wallet } from "ethers";
import { ethers } from "hardhat"; 

// Helper method for fetching environment variables from .env
function getEnvVariable(key: string, defaultValue?: string): string {
    if (process.env[key]) {
        return process.env[key] ?? "";
    }
    if (!defaultValue) {
        throw new Error(`${key} is not defined and no default value was provided`);
    }
    return defaultValue;
}

// Helper method for fetching a connection provider to the Ethereum network
function getProvider() {
    let network = getEnvVariable("NETWORK", "goerli");
    return ethers.getDefaultProvider(network, {
        alchemy: getEnvVariable(`ALCHEMY_${network.toUpperCase()}`),
    });
}

function getPrivateKey() {
    const inputKey: string = getEnvVariable("PRIVATE_KEY");
    let privateKey;
    if (utils.isHexString(inputKey)) {
        privateKey = inputKey;
    }
    else {
        privateKey = "0x" + inputKey
    }
    return new utils.SigningKey(privateKey);
}

// Helper method for fetching a wallet account using an environment variable for the PK
export function getAccount() {
    return new Wallet(getPrivateKey(), getProvider());
}

export function getContract(contractName: string, hre: any) {
    const account = getAccount();
    return hre.ethers.getContractAt(contractName, getEnvVariable(`${contractName}`), account)
};
