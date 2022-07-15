import { useState } from "react";
import type { NextPage } from "next";
import { Signer, Contract, utils, ethers, BigNumber } from "ethers";
import { useAccount, useSigner, useProvider } from "wagmi";
import { Button } from "@components/common";
import { getEscrowContract, funcNewEscrow, funcGetfees, 
  funcTransferFunds } from "scripts/escrow";
import { Escrow } from "../@types/contracts/Escrow";

const Payment: NextPage = () => {
  const { address, isConnected } = useAccount();
  const { contractAddress, contractAbi } = getEscrowContract();
  let contract: Escrow;
  if (isConnected) {
    const { data } = useSigner(
      {
        onError(error) {
          console.log('Error', error)
    }});
    contract = new Contract(contractAddress, contractAbi, data as Signer) as Escrow;
  } else {
    const provider = useProvider();
    contract = new Contract(contractAddress, contractAbi, provider) as Escrow;
  };
  /* We are expecting the implementation to read this data from React-Native */
  const [contAdrs, setContAdrs] = useState("");
  const [projectId, setProjectId] = useState(0);
  const [ammount, setAmmount] = useState(0);
  const [orgType, setOrgType] = useState(0);

  const getFess = async () => {
    let result: ethers.BigNumber[] = new Array<BigNumber>;
    result.push(await funcGetfees(contract, 'individual', 'impact') as BigNumber);
    result.push(await funcGetfees(contract, 'individual', 'noImpact') as BigNumber);
    result.push(await funcGetfees(contract, 'organization', 'impact') as BigNumber);
    result.push(await funcGetfees(contract, 'organization', 'noImpact') as BigNumber);
    /* Here goes the publishing of data to React-Native */
    console.log(result);
  }

  const createEscrow = async () => {
    if (isConnected) {
      await funcNewEscrow(contract, contAdrs, projectId, orgType, 
        utils.parseUnits(`${ammount}`, "gwei"));
    } else {
      console.log("Wallet is not connected");
    }
  }

  const endEscrow =async () => {
    if (isConnected) {
      await funcTransferFunds(contract, contAdrs, projectId, 
        utils.parseUnits(`${ammount}`, "gwei"));
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
