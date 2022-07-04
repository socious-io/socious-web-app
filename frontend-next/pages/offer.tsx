import * as React from "react";
import type { NextPage } from "next";
import { useState, CSSProperties } from "react";
import { ethers } from "ethers";
import abi from "../abis/Escrow.json";
import { getData } from "../utils/storage";
import ClipLoader from "react-spinners/ClipLoader";
import { Button, Checkbox, Avatar, Chip } from "@components/common";
import { useToggle } from "hooks";

import WalletIcon from "../asset/icons/wallet.svg";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "#FCFCFC",
};

const Offer = () => {
  const [loading, setLoading] = useState<boolean | undefined>(false);
  const [toggleState, { toggle }] = useToggle();

  const sendSuccessOffer = async (data: string) => {
    window?.ReactNativeWebView?.postMessage(data);
  };

  const sendOffer = async () => {
    try {
      setLoading(true);
      if (typeof window.ethereum !== "undefined") {
        const contractAddress = "0xA3561De6Ebf7954eF118bc438DD348aB75989639";
        const contractABI = abi.abi;
        // const provider = new ethers.providers.JsonRpcProvider(
        //   "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
        // );

        const provider = new ethers.providers.Web3Provider(window?.ethereum);
        const signer = provider.getSigner();
        //const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);
        // const createNewEscrow = async () => {
        //   ethObject()
        //   try {
        //     if (ethereum) {
        //       const { _contributorAddress, _projectId, _orgType, value } = formData;
        //       const provider = new ethers.providers.Web3Provider(ethereum);
        //       const signer = provider.getSigner();
        //       const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);
        //       //const parsedAmount = ethers.utils.parseEther(amount);
        //       console.log("no error yet", _contributorAddress, _projectId, _orgType)
        //       console.log(transactionsContract)
        //       const fee = await transactionsContract.getImpactContFee()
        //       const parsedAmount = fee.toNumber();
        //       console.log(parsedAmount)
        //       const _newEscrow = await transactionsContract.newEscrow(_contributorAddress, _projectId, _orgType, {value: value});
        //       console.log(_newEscrow)
        //       console.log("error")
        //const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        console.log(contract);
        const pageAddress = getData("address");
        const projectId = getData("project_id");

        //alert(pageAddress);
        //let _escrow = await contract.getImpactOrgFee();
        let _escrow = await contract.newEscrow(
          "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          "3",
          "1",
          { value: "10000000000" }
        );

        //console.log(_escrow);
        //let escrow = await _escrow.toString();
        console.log("Response---> ", _escrow);

        if (escrow) {
          await sendSuccessOffer("offered");
        } else {
          await sendSuccessOffer("failed");
        }
        setLoading(false);
      }
    } catch (error) {
      await sendSuccessOffer("failed");
    }
  };

  return (
    <>
      <Button
        size="lg"
        variant="fill"
        className="w-full justify-center font-bold rounded-full px-10"
        onClick={sendOffer}
        disabled={loading}
      >
        {loading ? (
          <ClipLoader
            color={"#FCFCFC"}
            loading={true}
            css={override}
            size={23}
          />
        ) : (
          <>
            <WalletIcon fill="#e12" />
            <p>Send Offer</p>
          </>
        )}
      </Button>

      <Checkbox checked={toggleState} onChange={toggle} />

      <h4 className="text-primary">OOOO{toggleState.toString()}</h4>
      <Avatar size="xl" type={1} />

      <Chip
        content="Demo"
        containerClassName="bg-offWhite"
        contentClassName="text-secondary"
        size="m"
      />
    </>
  );
};

export default Offer;
