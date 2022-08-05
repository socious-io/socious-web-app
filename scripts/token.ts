import { providers, BigNumber, utils } from "ethers";
import { ERC20 } from "../@types/contracts/ERC20";

interface TokensDict {
    [tokenName: string]: string
};

export function getTokenContract(tokenName: string) {
    const availableTokens = <TokensDict>{  
        ["usdc_test"]: "0xC12F6Ee5c853393105f29EF0310e61e6B494a70F"
    };
    const tokenAddress: string = availableTokens[tokenName];
    const contractAbi = require("../asset/abis/ERC20.json");
    return { tokenAddress, contractAbi };
};

export async function funcApprove(signedContract: ERC20,
    targetAddress: string,
    ammount: BigNumber) {
        try {
            const txResponse: providers.TransactionResponse = await signedContract.approve(
                targetAddress, ammount
            );
            const txReceipt: providers.TransactionReceipt = await txResponse.wait();
            console.log(`${ammount} tokens has been approved to ${targetAddress}\
                with ${txReceipt.confirmations} confirmations`);
        } catch (e) {
            console.error(e);
        };
    };

export async function funcGetDecimals(signedContract: ERC20) {
    try {
        return await signedContract.decimals();
    } catch (e) {
        console.error(e);
    }
};

export async function funcGetBalance(signedContract: ERC20,
    targetAddress: string) {
        try {
            const balance = utils.formatEther(await signedContract.balanceOf(targetAddress));
            console.log(`The balance of ${targetAddress} for the token ${signedContract.address} \
                is: ${balance}`);
            return balance;
        } catch (e) {
            console.error(e);
        };
    };
