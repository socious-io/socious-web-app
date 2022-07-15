import { providers, BigNumber } from "ethers";
import { Escrow } from "../@types/contracts/Escrow";

export function getEscrowContract() {
    const contractAddress = "0xDF8864AAdcf77f7706dEbAcB214634Bb816c90aE";
    const contractAbi = require("../asset/abis/Escrow.json");
    return { contractAddress, contractAbi };
};

export async function funcNewEscrow(signedContract: Escrow,
    contAddress: string, projectId: number, 
    orgType: number, ammount: BigNumber) {
        try {
            const txResponse: providers.TransactionResponse = await signedContract.newEscrow(
                contAddress, projectId, orgType, {
                    value: ammount, gasLimit: 10_000_000
                }
            );
            const txReceipt: providers.TransactionReceipt = await txResponse.wait();
            console.log(`Escrow between parties: Organization - ${await signedContract.signer.getAddress()}\
            and Contributor - ${contAddress} was successful with ${txReceipt.confirmations}\
            confirmations\n`)
            } catch (e) {
                console.error(e);
            }
};

export async function funcGetfees(signedContract: Escrow, 
    userType: string, orientation: string) {
        try {
            let output: BigNumber;
            if (userType === 'individual' && orientation === 'impact') {
                output = await signedContract.getImpactContFee();
                return output;
            } else if (userType === 'individual' && orientation === 'noImpact') {
                output = await signedContract.getNoImpactContFee();
                return output;
            } else if (userType === 'organization' && orientation === 'impact') {
                output = await signedContract.getImpactOrgFee();
                return output;
            } else if (userType === 'organization' && orientation === 'noImpact') {
                output = await signedContract.getNoImpactOrgFee();
                return output;
            } else {
                throw TypeError(`The type(s) provided is/are not valid...\n`)
            }
        } catch (e) {
            console.error(e);
        }
};

export async function funcTransferFunds(signedContract: Escrow, 
    contAddress: string, projectId: number, ammount: BigNumber) {
        try {
            const txResponse: providers.TransactionResponse = await signedContract.transferFunds(contAddress, projectId, ammount);
            const txReceipt = await txResponse.wait();
            console.log(`Escrow has been completed. Funds for ${ammount} in value has been trasfer\
            to contributor with address ${contAddress} with ${txReceipt.confirmations} confirmations\n`);
        } catch(e) {
            console.error(e);
        }
};

/* This function is not to be used by the Front-end but by Socious for 
Escrow Resolutions */
export async function funcEscrowDecision(signedContract: Escrow, decision: number,
    contAddress: string, orgAddress: string, projectId: number, ammount: BigNumber) {
    try{
        const txResponse: providers.TransactionResponse = await signedContract.escrowDecision(
            decision, contAddress, orgAddress, projectId, ammount
        );
        await txResponse.wait();
        signedContract.on("DecisionNotification", (author, _oldValue, newValue, _event) => {
            console.log(`Transaction signed by ${author}\n\
            Completed with ${newValue}`);
        })
    } catch(e) {
        console.error(e)
    }
}