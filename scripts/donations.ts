import type { Result } from "@ethersproject/abi";
import { getProvider, getContract, loadJsonFile } from "../utils";
import { Donate } from "../typechain/contracts/Donate"

const contractAddress: string = loadJsonFile('addresses/Donate-milkomedat.json')['contractName'];
const donations = <Donate>getContract('Donate', contractAddress, 'Donations');
donations.connect(getProvider());

export async function funcDonate(projectId: number, targetAddress: string, 
    userAddress: string, ammount: number) {
    try {
        await donations.donate(projectId, targetAddress, 
            { from: userAddress, value: ammount }
            );
        console.log(`Donation to Organization with address ${targetAddress}\
        for the ammount of ${ammount} was successful.\n`)
        } catch (e) {
            console.error(e);
        }
};

export async function getHistory(targetAddress: string, userType: string) {
    let output: Result;
    try {
        if (userType === "organization") {
            output = await donations.getRecievedDonations(targetAddress);
            return output;
        } else if (userType == "individual") {
            output = await donations.getSentDonations(targetAddress);
            return output;
        } else {
            throw TypeError(`${userType} is not a valid 'type'...\n`)
        }
    } catch (e) {
        console.error(e);
    }
};

export async function funcGetFee() {
    return donations.getFee();
};

export default donations;