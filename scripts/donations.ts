import * as ethers from "ethers";

export function getDonateContract() {
    const contractAddress = "0xE1bF07E88D873E943755595E5401DCB222eF4725"
    const contractAbi = require("../asset/abis/Donate.json");
    return { contractAddress, contractAbi };
}

export async function funcDonate(signedContract: ethers.Contract,
    projectId: number, targetAddress: string,
    ammount: number, userAddress: string) {
    try {
        await signedContract.donate(projectId, targetAddress, 
            { from: userAddress, value: ammount }
            );
        console.log(`Donation to Organization with address ${targetAddress}\
        for the ammount of ${ammount} was successful.\n`)
        } catch (e) {
            console.error(e);
        }
};

export async function funcGetHistory(signedContract: ethers.Contract,
    targetAddress: string, userType: string) {
    let output;
    try {
        if (userType === "organization") {
            output = await signedContract.getRecievedDonations(targetAddress);
            return output;
        } else if (userType == "individual") {
            output = await signedContract.getSentDonations(targetAddress);
            return output;
        } else {
            throw TypeError(`${userType} is not a valid 'type'...\n`)
        }
    } catch (e) {
        console.error(e);
    }
};

export async function funcGetFee(signedContract: ethers.Contract) {
    return signedContract.getFee();
};