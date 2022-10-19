import React from 'react';
import WalletIcon from 'asset/icons/wallet.svg';
import PaymentReceivedIcon from 'asset/icons/payment-received.svg';
import Image from 'next/dist/client/image';
import Link from 'next/link';
import {HeartIcon} from '@heroicons/react/24/outline';

const PaymentCard = () => {
  return (
    <div
      className={'space-y-4 border-grayLineBased bg-background bg-offWhite p-4'}
    >
      <label className="text-primary">Payments</label>
      <ul className="list-none space-y-4">
        <li className="flex items-center space-x-4">
          <Link href={'/app/wallet'}>
            <label className="flex items-center space-x-4">
              <Image
                src={WalletIcon}
                alt="Wallet - SVG"
                width="20px"
                height="20px"
              />
              <label>Connect wallet</label>
            </label>
          </Link>
        </li>
        <li className="flex items-center space-x-4">
          <Link href={'/app/payment-received'}>
            <label className="flex items-center space-x-4">
              <Image
                src={PaymentReceivedIcon}
                alt="Wallet - SVG"
                width="20px"
                height="20px"
              />
              <label>Payments received</label>
            </label>
          </Link>
        </li>
        <li className="flex items-center space-x-4">
          <Link href={'/app/donations'}>
            <label className="flex items-center space-x-4">
              <HeartIcon className="h-5" />
              <label>My donations</label>
            </label>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default PaymentCard;
