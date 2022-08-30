import { useState } from "react";
import type { NextPage } from "next";
import { Contract, utils, ethers, BigNumber, Signer } from "ethers";
import { useAccount, useSigner, useProvider } from "wagmi";
import { Button } from "../components/common";
import { getEscrowContract, funcNewEscrow, 
  funcGetfees, getTokenContract, 
  funcApprove, validateTokenExists, 
  funcWithdrawFunds } from "scripts";
import { Escrow, ERC20 } from "../@types/contracts";

const Payment: NextPage = () => {
  const { address, isConnected } = useAccount();
  const { contractAddress, contractAbi } = getEscrowContract();
  let contract: Escrow;
  let tokenContract: ERC20;

  const [targetCoin, setTargetCoin] = useState("usdc_test");
  const { tokenAddress, contractAbi: tokenAbi } = getTokenContract(targetCoin);

  const provider = useProvider();
  const { data: signer } = useSigner({
    onSettled(data, error) {
      console.log('Settled', data, error)
    },
  });

  contract = new Contract(contractAddress, contractAbi, provider) as Escrow;
  tokenContract = new Contract(tokenAddress, tokenAbi, provider) as ERC20;

  if (isConnected) {
    contract.connect(signer as Signer);
    tokenContract.connect(signer as Signer);
  };

  /* We are expecting the implementation to read this data from React-Native */
  const [contAdrs, setContAdrs] = useState("");
  const [projectId, setProjectId] = useState(0);
  const [ammount, setAmmount] = useState(utils.parseUnits(`${0}`, 6));
  const [orgType, setOrgType] = useState(1); // 1 Is for Non-impact and 2 is for Impact

  const getFess = async () => {
    let result: string[] = new Array<string>;
    result.push(utils.formatEther(await funcGetfees(contract, 'individual', 'impact') as BigNumber));
    result.push(utils.formatEther(await funcGetfees(contract, 'individual', 'noImpact') as BigNumber));
    result.push(utils.formatEther(await funcGetfees(contract, 'organization', 'impact') as BigNumber));
    result.push(utils.formatEther(await funcGetfees(contract, 'organization', 'noImpact') as BigNumber));
    /* Here goes the publishing of data to React-Native */
    console.log(result);
  }

  const createEscrow = async () => {
    const { result: validToken, tokenIndex } = await validateTokenExists(contract, targetCoin);
    if (isConnected && validToken) {

      await funcApprove(tokenContract, contract.address, ammount);
      await funcNewEscrow(contract, contAdrs, projectId, orgType, ammount, tokenIndex);

    } else {
      console.log("Wallet is not connected");
    }
  }

  const endEscrow = async () => {
    const { result: validToken, tokenIndex } = await validateTokenExists(contract, targetCoin);
    if (isConnected && validToken) {

      await funcWithdrawFunds(contract, contAdrs, projectId, ammount, tokenIndex);

    } else {
      console.log("Wallet is not connected");
    }
  }

  return !(isConnected) ? (
    <div className="h-screen py-8 px-4 bg-whiteGray">
      <div className="bg-white rounded-lg p-5 my-5 space-y-4">
        <Button onClick={getFess}>Get Fees</Button>
      </div>
    </div>
  ): (
    <div className="h-screen py-8 px-4 bg-whiteGray">
      <div className="bg-white rounded-lg p-5 my-5 space-y-4">
        <Button onClick={getFess}>Get Fees</Button>
      </div>
      <div className="bg-white rounded-lg p-5 my-5 space-y-4">
        <Button onClick={createEscrow}>Accept Offer</Button>
      </div>
      <div className="bg-white rounded-lg p-5 my-5 space-y-4">
        <Button onClick={endEscrow}>End Offer</Button>
      </div>
    </div>
  );
};

export default Payment;
