import { providers, BigNumber } from "ethers";
import { Donate } from "../@types/contracts/Donate";

interface TokenMap {
    [tokenName: string]: number
}

export const tokenMap = <TokenMap>{
    usdc_test: 0
}

export function getDonateContract() {
    const contractAddress = "0x99B0f41941C34A98482C6621DeEF2381D7fa5f4c";
    const contractAbi = require("../asset/abis/Donate.json");
    return { contractAddress, contractAbi };
}

export async function funcAddToken(
    signedContract: Donate,
    targetToken: string) 
    {
        try {
            const txResponse: providers.TransactionResponse = await signedContract.addTokens(targetToken);
            const txReceipt: providers.TransactionReceipt = await txResponse.wait();
            console.log(`Token ${targetToken} addded with ${txReceipt.confirmations} confirmations.\n`);
        } catch (e) {
            console.error(e);
        }
};

export async function funcDonate(
    signedContract: Donate,
    projectId: number, 
    targetAddress: string, 
    ammount: BigNumber,
    tokenIndex: number) 
    {
        try {
            const txResponse: providers.TransactionResponse = await signedContract.donate(
                    projectId, targetAddress, 
                    ammount, tokenIndex,
                    { gasLimit: 10_000_000 }
                );
            const txReceipt: providers.TransactionReceipt = await txResponse.wait();
            console.log(`Donation to Organization with address ${targetAddress}\
            for the ammount of ${ammount} was successful with ${txReceipt.confirmations} confirmations.\n`)
        } catch (e) {
                console.error(e);
            };
};

export async function funcGetHistory(signedContract: Donate,
    targetAddress: string, userType: string) {
    let output;
    try {
        if (userType === "organization") {
            output = await signedContract.getRecievedDonations(targetAddress);
            return output;
        } else if (userType == "individual") {
            output =  await signedContract.getSentDonations(targetAddress);
            return output;
        } else {
            throw TypeError(`${userType} is not a valid 'type'...\n`)
        }
    } catch (e) {
        console.error(e);
    }
};

export async function funcGetFee(signedContract: Donate) {
    return signedContract.getFee();
};