import { providers, BigNumber } from "ethers";
import { Donate } from "../@types/contracts/Donate";

export function getDonateContract() {
    const contractAddress = "0xeb20711725A61A75E660A046beBe5E19d45b422B";
    const contractAbi = require("../asset/abis/Donate.json");
    return { contractAddress, contractAbi };
}

export async function funcDonate(signedContract: Donate,
    projectId: number, targetAddress: string, ammount: BigNumber) {
    try {
        const txResponse: providers.TransactionResponse = await signedContract.donate(projectId, targetAddress, 
            { value: ammount, gasLimit: 10_000_000 }
            );
        const txReceipt: providers.TransactionReceipt = await txResponse.wait();
        console.log(`Donation to Organization with address ${targetAddress}\
        for the ammount of ${ammount} was successful with ${txReceipt.confirmations} confirmations.\n`)
        } catch (e) {
            console.error(e);
        }
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