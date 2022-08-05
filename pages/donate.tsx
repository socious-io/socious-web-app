import { useState } from "react";
import type { NextPage } from "next";
import { Contract, utils, Signer } from "ethers";
import { useAccount, useProvider, useSigner } from "wagmi";
import { Button } from "@components/common";
import { getDonateContract, funcDonate, 
  funcGetFee, funcGetHistory,
  getTokenContract, funcApprove,
  validateTokenExists } from "../scripts";
import { Donate, IERC20 } from "../@types/contracts/";

const Donation: NextPage = () => {
  const { address, isConnected } = useAccount();
  const { contractAddress, contractAbi } = getDonateContract();
  let contract: Donate;
  let tokenContract: IERC20;

  const [targetCoin, setTargetCoin] = useState("usdc_test");
  const { tokenAddress, contractAbi: tokenAbi } = getTokenContract(targetCoin);

  if (isConnected) {
    const { data: signer } = useSigner({
        onSettled(data, error) {
          console.log('Settled', data, error)
        },
      });
    contract = new Contract(contractAddress, contractAbi, signer as Signer) as Donate;
    tokenContract = new Contract(tokenAddress, tokenAbi, signer as Signer) as IERC20;
    } else {
      const provider = useProvider();
      contract = new Contract(contractAddress, contractAbi, provider) as Donate;
      tokenContract = new Contract(tokenAddress, tokenAbi, provider) as IERC20;
    };

  /* We are expecting the implementation to read this data from React-Native */
  const [orgAdrs, setOrgAdrs] = useState("");
  const [projectId, setProjectId] = useState(0);
  const [ammount, setAmmount] = useState(utils.parseUnits(`${0}`, "ether"));
  const [userType, setUserType] = useState("individual");

  const makeDonation = async () => {
    const { result: validToken, tokenIndex } = await validateTokenExists(contract, targetCoin);
    if (isConnected && validToken) {
      await funcApprove(tokenContract, contract.address, ammount);
      await funcDonate(contract, projectId, 
        orgAdrs, ammount, 
        tokenIndex);
    } else {
      console.log('Wallet is not connected');
    }
  };

  const getHistory = async () => {
    if (isConnected) {
      const result = await funcGetHistory(contract, address as string, userType);
      /* Here goes the publishing of data to React-Native */
      console.log(result); // Just for testing
    } else {
      console.log('Wallet is not connected');
    }
  }

  const getFee = async () => {
    /* Feel free to modify the output units based on your UI preferences */
    const result = utils.formatUnits(await funcGetFee(contract), "gwei");
    /* Here goes the publishing of data to React-Native */
    console.log(result) // Just for testing
  }

  return isConnected ? (
    <div className="h-screen py-8 px-4 bg-whiteGray">
      <div className="bg-white rounded-lg p-5 my-5 space-y-4">
        <Button onClick={makeDonation}>Make Donation</Button>
      </div>
      <div className="bg-white rounded-lg p-5 my-5 space-y-4">
        <Button onClick={getHistory}>Show History</Button>
      </div>
      <div className="bg-white rounded-lg p-5 my-5 space-y-4">
        <Button onClick={getFee}>Show Socious Fee</Button>
      </div>
    </div>
  ): (
    <div className="h-screen py-8 px-4 bg-whiteGray">
      <div className="bg-white rounded-lg p-5 my-5 space-y-4">
        <Button onClick={getHistory}>Show History</Button>
      </div>
      <div className="bg-white rounded-lg p-5 my-5 space-y-4">
        <Button onClick={getFee}>Show Socious Fee</Button>
      </div>
    </div>
  );
};

export default Donation;
