import { Contract } from "ethers";
import { getTokenContract } from "./token";

interface TokenMap {
    [tokenName: string]:  number
}

export const tokenMap = <TokenMap>{
    usdc_test: 0
}

export async function validateTokenExists( signedContract: Contract, 
    targetToken: string ) {

        const { tokenAddress } = getTokenContract(targetToken);
        const tokenIndex = tokenMap[targetToken];
        let result: boolean;

        try {
            const resultAddress = await signedContract.getToken(tokenIndex);
            if (resultAddress === tokenAddress) {
                result = true;
            } else {
                result = false;
            };
        } catch (e) {
            console.error(e);
            result = false;
        };
        return { result, tokenIndex };
    };