import { useAccount, useConnect, useDisconnect } from 'wagmi'
import type { NextPage } from "next";
import { connector } from "@components/wallet/connector";
import Button from "@components/common/Button/Button";

const Connect: NextPage = () => {
  const { isConnected } = useAccount();
  const { connect } = useConnect({
    connector: connector,
  });
  const { disconnect } = useDisconnect();

  return !isConnected ? (
    <>
      <div className="h-screen py-8 px-4 bg-whiteGray">
        <div className="bg-white rounded-lg p-5 my-5 space-y-4">
          <Button
            size="md"
            variant="outline"
            className="w-full justify-center font-bold"
            onClick={() => connect()}
          > Connect
          </Button>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="h-screen py-8 px-4 bg-whiteGray">
        <div className="bg-white rounded-lg p-5 my-5 space-y-4">
          <Button
            size="md"
            variant="outline"
            className="w-full justify-center font-bold"
            onClick={() => disconnect()}
          > Disconnect
          </Button>
        </div>
      </div>
    </>
  );
};

export default Connect;
