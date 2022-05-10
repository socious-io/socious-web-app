import type { NextPage } from "next";
import { useState } from "react";
import { DotsHorizontalIcon } from "@heroicons/react/solid";
import Button from "../components/common/Button/Button";
import Image from "next/image";
import metamask from "../asset/images/metamask@3x.png";

const Connect: NextPage = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  return !isConnected ? (
    <>
      <div className="h-screen py-8 px-4 bg-whiteGray">
        <p className="text-primary text-xl text-center font-semibold">
          There is no wallet connect to your account.
        </p>
        <div className="bg-white rounded-lg p-5 my-5 space-y-4">
          <Button
            size="md"
            variant="outline"
            className="w-full justify-center font-bold"
            onClick={() => setIsConnected(true)}
          >
            Wallet connect
          </Button>

          <div>
            <p>
              All payments in Socious are done with cryptocurrencies. By
              connecting a wallet, you agree to Socious terms & conditions.
            </p>
          </div>
          <div>
            <p>To learn more about payments, visit our FAQ.</p>
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="h-screen py-8 px-4 bg-whiteGray space-y-5">
        <div className="bg-white rounded-lg flex items-center justify-between p-3">
          <Image
            src={metamask}
            alt="Picture of the author"
            width={24}
            height={24}
          />
          <p className="text-primary font-semibold">
            9vGthvcbjklju7hk9...yUk55
          </p>
          <div
            className="p-2 rounded-full bg-borderGray"
            onClick={() => {
              console.log("click");
            }}
          >
            <DotsHorizontalIcon className="text-white w-5 h-5" />
          </div>
        </div>
        <p className="text-primary text-xl text-center font-semibold">
          You&apos;ve successfuly connected your wallet.
        </p>
      </div>
    </>
  );
};

export default Connect;
