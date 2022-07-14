import { useState } from "react";
import type { NextPage } from "next";
import { Signer } from "ethers";
import { useAccount, useSigner } from "wagmi";
import { Button } from "@components/common";
import { getDonateContract, funcDonate, funcGetFee, funcGetHistory } from "../scripts";

const Offer: NextPage = () => {
  const { data } = useSigner(
    {
      onError(error) {
        console.log('Error', error)
  }});
  const contract = getDonateContract().connect(data as Signer);
  const { address, isConnected } = useAccount();
  /* We are expecting the implementation to read this data from React-Native */
  const [contAdrs, setcontAdrs] = useState("");
  const [projectId, setProjectId] = useState(0);
  const [ammount, setAmmount] = useState(0);
  const [userType, setUserType] = useState("individual");

  const makeDonation = async () => {
    if (isConnected) {
      await funcDonate(contract, projectId, contAdrs, ammount, address as string);
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
    const result = await funcGetFee(contract);
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

export default Offer;
