import type {NextPage} from 'next';
import {DotsHorizontalIcon} from '@heroicons/react/solid';
import Button from '../components/common/Button/Button';
// import metamask from "../asset/images/metamask@3x.png";
import {useWeb3React} from '@web3-react/core';
import {walletconnect} from '../components/wallet/connector';
import {useCallback, useEffect, useRef, useState} from 'react';
import {deleteData, setData} from '../utils/storage';

const Connect: NextPage = () => {
  const {active, account, activate, deactivate} = useWeb3React();
  const connect = useCallback(async () => {
    try {
      await activate(walletconnect);
    } catch (ex) {
      console.log(ex);
    }
  }, [activate]);

  const disconnect = useCallback(async () => {
    try {
      deactivate();
      deleteData('address');
      sendDataToApp('disconnected');
    } catch (ex) {
      console.log(ex);
    }
  }, [deactivate]);

  const sendDataToApp = (data: string) => {
    //window?.ReactNativeWebView?.postMessage(data);
  };

  const handleReceivedMessage = (message: any) => {
    setData('project_id', message.data);
  };

  useEffect(() => {
    if (typeof window !== undefined) {
      window?.addEventListener('message', handleReceivedMessage);

      return () => {
        window?.removeEventListener('message', handleReceivedMessage);
      };
    }
  }, []);

  useEffect(() => {
    if (account || active) {
      setData('address', account ?? '');
      sendDataToApp('connected');
    }
  }, [account, active]);

  return !active ? (
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
            onClick={connect}
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
            {`${account?.substring(0, 17)}...${account?.substring(
              account?.length - 5,
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
