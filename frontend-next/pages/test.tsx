import type { NextPage } from "next";
import { useEffect, useRef } from "react";
import { ethers } from "ethers";
import abi from "../abis/Escrow.json";
import { getAddress } from "../utils/storage";

const Test: NextPage = () => {
  const noImpactContFee = useRef(null);

  const getData = async () => {
    if (window.ethereum) {
      const contractAddress = "0xA3561De6Ebf7954eF118bc438DD348aB75989639";
      const contractABI = abi.abi;
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        provider
      );
      console.log(contract);
      const owner = contract.owner();
      console.log(owner);
      noImpactContFee.current = await contract.getNoImpactContFee();
      console.log("this", noImpactContFee.current);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div id="calendar">
      <div className="wrapper">
        <p>{getAddress("address")}</p>
      </div>
    </div>
  );
};

export default Test;
