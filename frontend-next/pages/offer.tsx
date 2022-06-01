import type { NextPage } from "next";
import { useState, CSSProperties } from "react";
import { ethers } from "ethers";
import abi from "../abis/Escrow.json";
import { getData } from "../utils/storage";
import ClipLoader from "react-spinners/ClipLoader";
import Button from "../components/common/Button/Button";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "#FCFCFC",
};

const Offer = () => {
  const [loading, setLoading] = useState<boolean | undefined>(false);

  const sendSuccessOffer = async (data: string) => {
    window?.ReactNativeWebView?.postMessage(data);
  };

  const sendOffer = async () => {
    try {
      setLoading(true);
      const contractAddress = "0xA3561De6Ebf7954eF118bc438DD348aB75989639";
      const contractABI = abi.abi;
      const provider = new ethers.providers.JsonRpcProvider(
        "https://rinkeby.infura.io/v3/889b5884688e4db589d44dbd47a7f15b"
      );
      //const provider = new ethers.providers.Web3Provider(window?.ethereum);

      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        provider
      );
      console.log(contract);
      const pageAddress = getData("address");
      const projectId = getData("project_id");

      //alert(pageAddress);
      let _escrow = await contract.newEscrow(
        "0x02993657D1DA5913Cf3c15671C71348207BB0870",
        "3",
        "1"
      );
      let escrow = await _escrow.toString();

      if (escrow) {
        await sendSuccessOffer("offered");
      } else {
        await sendSuccessOffer("failed");
      }
      setLoading(false);
    } catch (error) {
      await sendSuccessOffer("failed");
    }
  };

  return (
    <Button
      size="lg"
      variant="fill"
      className="w-full justify-center font-bold rounded-full px-10"
      onClick={sendOffer}
      disabled={loading}
    >
      {loading ? (
        <ClipLoader color={"#FCFCFC"} loading={true} css={override} size={23} />
      ) : (
        "Send offer"
      )}
    </Button>
  );
};

export default Offer;
