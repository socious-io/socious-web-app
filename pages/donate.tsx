import { useState } from "react";
import type { NextPage } from "next";
import { Contract, utils } from "ethers";
import { useAccount, useProvider, useSigner } from "wagmi";
import { Button } from "@components/common";
import { getDonateContract, funcDonate, funcGetFee, funcGetHistory } from "../scripts";
import { Donate } from "../@types/contracts/Donate";

const Donation: NextPage = () => {
  const { address, isConnected } = useAccount();
  const { contractAddress, contractAbi } = getDonateContract();
  let contract: Donate;
  if (isConnected) {
    const { data: signer } = useSigner({
        onSettled(data, error) {
          console.log('Settled', data, error)
        },
      });
    contract = new Contract(contractAddress, contractAbi, signer) as Donate;
    } else {
      const provider = useProvider();
      contract = new Contract(contractAddress, contractAbi, provider) as Donate;
    };

  /* We are expecting the implementation to read this data from React-Native */
  const [orgAdrs, setOrgAdrs] = useState("");
  const [projectId, setProjectId] = useState(0);
  const [ammount, setAmmount] = useState(0);
  const [userType, setUserType] = useState("individual");

  const makeDonation = async () => {
    if (isConnected) {
      await funcDonate(contract, projectId, orgAdrs, utils.parseUnits(`${ammount}`, "gwei"));
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
