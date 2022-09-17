// import type { HardhatRuntimeEnvironment } from "hardhat/types";

// import { utils, Wallet, providers } from "ethers";
// import fs from "fs";

// export function getEnvVariable(key: string, defaultValue?: string): string {
//     if (process.env[key]) {
//         return process.env[key] ?? "";
//     }
//     if (!defaultValue) {
//         throw new Error(`${key} is not defined and no default value was provided`);
//     }
//     return defaultValue;
// };

// export function getProvider() {
//     let network: string = getEnvVariable(`${getEnvVariable("NETWORK", "MILKOMEDAT")}_URL`);
//     return new providers.JsonRpcProvider(network);
// };

// function getPrivateKey() {
//     const inputKey: string = getEnvVariable(`${getEnvVariable("NETWORK")}_PK`);
//     let privateKey;
//     if (utils.isHexString(inputKey)) {
//         privateKey = inputKey;
//     }
//     else {
//         privateKey = "0x" + inputKey
//     }
//     return new utils.SigningKey(privateKey);
// }

// export function getAccount() {
//     return new Wallet(getPrivateKey(), getProvider());
// };

// export function getContract(contractName: string, hre: HardhatRuntimeEnvironment) {
//     const account = getAccount();
//     return hre.ethers.getContractAt(contractName, getEnvVariable(`${contractName}`), account)
// };

// export function loadJsonFile(file: string) {
//     const appRoot = require("app-root-path");
//     try {
//         const data = fs.readFileSync(`${appRoot}${file[0] === "/" ? file : "/" + file}`);
//         return JSON.parse(data as any);
//     } catch (err) {
//         return {};
//     }
// };

// export function writeJsonFile(args: {path: string; data: Object | ((arg: Object) => void)}) {
//     const appRoot = require("app-root-path");
//     const prevData = loadJsonFile(args.path);
//     const parsedData = JSON.stringify(
//         typeof args.data === "function"
//             ? { ...args.data(prevData) }
//             : { ...prevData, ...args.data },
//         null,
//         2
//     );
//     console.log("Writting", appRoot + args.path);
//     fs.writeFileSync(appRoot + args.path, parsedData);
//     console.log(`Generated ${appRoot}${args.path}`);
// };
export {};
