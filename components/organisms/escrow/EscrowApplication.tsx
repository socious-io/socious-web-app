import {Button, Combobox} from '@components/common';
import Link from 'next/link';
import {useMemo, useState} from 'react';
import Router from 'next/router';
import {getAllISOCodes} from 'iso-country-currency';

import {useToggle} from '@hooks';
import EscrowCard from './EscrowCard';
import {CreditCardIcon} from '@heroicons/react/24/outline';
import CreditCardModal from './Modals/CreditCardModal';
import Image from 'next/future/image';

const EscrowApplication = () => {
  const {state: addState, handlers: addHandlers} = useToggle();
  const isoCountries = useMemo(
    () =>
      getAllISOCodes()?.map((d) => ({
        name: d?.currency,
        symbol: d.symbol,
        id: d?.iso,
      })),
    [],
  );
  const [isoCountry, setIsoCountry] = useState<{
    name: string;
    symbol: string;
    id: string;
  }>();

  const flagFromIso = useMemo(
    () =>
      isoCountry ? (
        <div className="h-8 w-8 ">
          <Image
            src={`https://countryflagsapi.com/svg/${isoCountry?.id}`}
            alt={`${isoCountry?.id} flag`}
            width="100"
            height="100"
            className="h-8 w-8 rounded-full object-cover"
          />
        </div>
      ) : null,
    [isoCountry],
  );

  return (
    <div className="w-full">
      <div className="mb-8 hidden items-center rounded-2xl border border-grayLineBased bg-white px-4 py-6 md:flex">
        <p className="text-xl font-semibold">Escrow payment</p>
      </div>
      <div className="space-y-4 px-4">
        <EscrowCard />
        <div className="space-y-4 rounded-2xl  border border-b-grayLineBased bg-white px-4 py-6">
          <h1 className="text-base font-semibold">Input amount</h1>
          <div className="flex w-full items-center justify-between rounded-2xl bg-offWhite p-3">
            <div className="flex items-center gap-2">
              {flagFromIso}
              <Combobox
                items={isoCountries}
                onSelected={(data) => setIsoCountry(data)}
                className="w-28"
              />
            </div>
            <div className="text-4xl">
              <span className="text-xl sm:text-4xl">{isoCountry?.symbol}</span>
              100
            </div>
          </div>
        </div>
        <div className="space-y-4 rounded-2xl border border-b-grayLineBased bg-white p-6">
          <h1 className="text-base font-semibold">Input amount</h1>
          <div className="space-y-3">
            <div className="flex w-full items-center justify-between">
              <span>Total assignement</span>
              <span>$0</span>
            </div>
            <div className="flex w-full items-center justify-between">
              <span>Socious commission</span>
              <span>$0</span>
            </div>
          </div>
          <div className="flex w-full items-center justify-between border-t border-grayLineBased pt-5">
            <span>Total</span>
            <span className="text-xl">$0</span>
          </div>
        </div>
        <div className="space-y-4 rounded-2xl border border-b-grayLineBased bg-white px-4 py-6">
          <h1 className="text-base font-semibold">Payment method</h1>
          <div className="space-y-2">
            {/* <Button
              className="flex w-full items-center justify-center gap-2"
              variant="outline"
            >
              <span className="font-semibold text-primary">Connect Wallet</span>
            </Button> */}
            <Button
              className="flex w-full items-center justify-center gap-2"
              variant="outline"
              onClick={addHandlers.on}
            >
              <CreditCardIcon className="w-5 text-black" />
              <span className="font-semibold text-primary">
                Add Credit Card
              </span>
            </Button>
            <p>
              Payments in Socious are done with cryptocurrencies or credit card.
              By connecting a wallet or credit card, you agree to Socious’{' '}
              <Link href="https://socious.io/user-agreement/">
                <span className="cursor-pointer text-primary">
                  terms & conditions.
                </span>
              </Link>
            </p>
            <p>
              To learn more about payments,{' '}
              <Link href={''}>
                <span className="cursor-pointer text-primary">
                  visit our FAQ.
                </span>
              </Link>
            </p>
          </div>
        </div>
        <div className="-mx-4 flex flex-col items-center space-y-4 border-t bg-white p-4 pb-10 sm:items-end sm:border-0 sm:bg-offWhite sm:pt-0">
          <Button
            disabled={true}
            className="flex w-full max-w-xs justify-center sm:w-auto sm:px-6"
          >
            Proceed with payment
          </Button>
          <Button
            variant="link"
            onClick={() => Router.back()}
            className="flex w-full justify-center sm:hidden sm:w-auto sm:px-6"
          >
            Cancel
          </Button>
        </div>
      </div>
      <CreditCardModal openState={addState} closeModal={addHandlers.off} />
    </div>
  );
};

export default EscrowApplication;
