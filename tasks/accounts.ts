// import type { Wallet } from "ethers";

// import { task } from "hardhat/config";
// import { utils } from "ethers"
// import { getAccount, getProvider } from "../scripts/utils";

// task("accounts", "Prints the list of accounts")
//     .setAction(async (_, _hre) => {
//         const signer: Wallet = getAccount();
//         let account = signer.address;
//         const provider = getProvider();
//         let balance = await provider.getBalance(account);

//         console.log(`Address: ${account}\nBalance: ${utils.formatEther(balance)} MILKTADA`);
//     });
export {};
