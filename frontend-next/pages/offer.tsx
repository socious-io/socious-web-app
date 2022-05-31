import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { ethers } from "ethers";
import abi from "../abis/Escrow.json";
import { getAddress } from "../utils/storage";
import Button from "../components/common/Button/Button";

const Offer: NextPage = () => {
  const [hasResponse, setHasResponse] = useState(null);

  const sendSuccessOffer = (data: string) => {
    console.log("success offer", hasResponse);
    window?.ReactNativeWebView?.postMessage(data);
  };

  const sendOffer = async () => {
    if (window.ethereum) {
      const contractAddress = "0xA3561De6Ebf7954eF118bc438DD348aB75989639";
      const contractABI = abi.abi;
      const provider = new ethers.providers.JsonRpcProvider(
        "https://rinkeby.infura.io/v3/889b5884688e4db589d44dbd47a7f15b"
      );
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        provider
      );
      console.log(getAddress("address"));
      setHasResponse(await contract.getNoImpactContFee());
    }
    sendSuccessOffer("offered");
  };

  useEffect(() => {
    if (hasResponse) {
      sendSuccessOffer("offered");
    }
  }, [hasResponse]);

  return (
    <Button
      size="lg"
      variant="fill"
      className="w-full justify-center font-bold rounded-full px-10"
      onClick={sendOffer}
    >
      Send offer
    </Button>
  );
};

export default Offer;
