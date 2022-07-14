import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { DotsHorizontalIcon } from "@heroicons/react/solid";
import type { NextPage } from "next";
import { connector } from "../components/wallet/connector";
import Button from "../components/common/Button/Button";

const Connect: NextPage = () => {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: connector,
  });
  const { disconnect } = useDisconnect();

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
            onClick={() => connect()}
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
          <p className="text-primary text-base font-semibold">
            {`${address?.substring(0, 17)}...${address?.substring(
              address?.length - 5
            )}`}
          </p>
          <div className="p-2 rounded-full bg-borderGray" onClick={disconnect}>
            <DotsHorizontalIcon className="text-primary w-5 h-5 " />
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
