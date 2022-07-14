import { Signer } from "ethers";
import fs from "fs";

export function getAbi(contractName: string) {
    const appRoot = require("app-root-path");
    try {
        const data = fs.readFileSync(`${appRoot}/asset/abis/${contractName}.json`);
        const parsed = JSON.parse(data as any);
        return parsed['abi'];
    } catch (err) {
        return {};
    }   
};

export function getAddress(inputSigner: Signer) {
    const address = await inputSigner.getAddress();
    return address;
}