import type {NextPage} from 'next';
import {
  BriefcaseIcon,
  ClockIcon,
  EllipsisHorizontalIcon,
} from '@heroicons/react/24/outline';
import Button from '../components/common/Button/Button';
// import Image from "next/image";
import metamask from '../asset/images/metamask@3x.png';
import {useWeb3React} from '@web3-react/core';
import {injected} from '../components/wallet/connector';

const Payment: NextPage = () => {
  const {active, account, library, connector, activate, deactivate} =
    useWeb3React();

  const disconnect = async () => {
    try {
      deactivate();
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <>
      <div className="h-screen py-8 px-4 bg-whiteGray">
        <div className="bg-white rounded-lg p-5 my-5 space-y-4 border border-borderGray">
          <p className="font-bold">Project title</p>
          <div className="flex flex-row items-start space-x-3">
            <div className="w-10 h-10 bg-whiteGray rounded-full" />
            <div>
              <p>Name</p>
              <p>Text</p>
            </div>
          </div>
          <p>March 1 - Present</p>
          <div className="flex flex-row items-center bg-borderGray p-4 rounded-md space-x-4">
            <div className="flex flex-row items-center space-x-2">
              <BriefcaseIcon className="w-5 h-5" />
              <p>Fixed</p>
            </div>
            <h1>|</h1>
            <div className="flex flex-row items-center space-x-2">
              <ClockIcon className="w-5 h-5" />
              <p>30 hrs</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-5 my-5 space-y-4 border border-borderGray">
          <p className="font-bold">Payment summary</p>
          <div className="flex flex-row items-center justify-between">
            <p>Total assignment</p>
            <p>$100,000</p>
          </div>
          <div className="flex flex-row items-center justify-between">
            <p>Socious commision</p>
            <p>$1,000</p>
          </div>
          <hr />
          <div className="flex flex-row items-center justify-between">
            <p>Total</p>
            <p>$101,000</p>
          </div>
        </div>
        <div className="bg-white rounded-lg my-5 space-y-4 border border-borderGray">
          <div className="bg-white rounded-lg flex items-center justify-between p-3">
            {/* <Image src={metamask} alt="Metamask" width={24} height={24} /> */}
            <p className="text-primary text-base font-semibold">
              {`${account?.substring(0, 17)}...${account?.substring(
                account.length - 5,
              )}`}
            </p>
            <div
              className="p-2 rounded-full bg-borderGray"
              onClick={disconnect}
            >
              <EllipsisHorizontalIcon className="text-primary w-5 h-5 " />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
