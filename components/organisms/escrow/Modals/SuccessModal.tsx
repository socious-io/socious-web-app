import {Button} from '@components/common';
import Image from 'next/future/image';
import React, {useCallback} from 'react';
import {useFormContext} from 'react-hook-form';
import masterCard from 'asset/images/creditCard/mastercard.svg';
import jcb from 'asset/images/creditCard/jcb.svg';
import visa from 'asset/images/creditCard/visa.svg';
import amex from 'asset/images/creditCard/amex.svg';
import generic from 'asset/images/creditCard/generic.svg';

const cardsWithRegex = [
  {
    regex: '^3[47]\\d{0,13}',
    cardtype: 'amex',
  },
  {
    regex: '^(5[1-5]\\d{0,2}|22[2-9]\\d{0,1}|2[3-7]\\d{0,2})\\d{0,12}',
    cardtype: 'mastercard',
  },
  {
    regex: '^(?:35\\d{0,2})\\d{0,12}',
    cardtype: 'jcb',
  },
  {
    regex: '^4\\d{0,15}',
    cardtype: 'visa',
  },
];

const SuccessModal = ({submit}: {submit: () => void}) => {
  const formMethods = useFormContext;
  const {
    formState: {isSubmitting},
    handleSubmit,
    getValues,
  } = formMethods();
  const cardNumber = getValues('card_number');

  const getCardIcon = useCallback(() => {
    let cardType = 'generic';
    for (const type of cardsWithRegex) {
      const regex = new RegExp(type.regex);
      if (regex.test(cardNumber)) cardType = type.cardtype;
    }

    return (
      <div className="flex h-8 w-auto items-center">
        <Image
          src={
            cardType === 'amex'
              ? amex
              : cardType === 'visa'
              ? visa
              : cardType === 'mastercard'
              ? masterCard
              : cardType === 'jcb'
              ? jcb
              : generic
          }
          alt={`${cardType} Icon`}
          width="100"
          height="100"
          className="h-8 w-auto"
        />
      </div>
    );
  }, [cardNumber]);
  return (
    <form
      className="hide-scrollbar flex flex-1 flex-col overflow-y-scroll"
      onSubmit={handleSubmit(submit)}
    >
      <div className="h-[20rem] grow overflow-y-auto p-4">
        <div className="borde-grayLineBased flex items-center justify-between rounded-2xl border bg-white p-6">
          {getCardIcon()}
          <div className="font-semibold text-primary">
            Card ending - {cardNumber.slice(-4)}
          </div>
        </div>
      </div>
      <div className=" bottom-0 divide-x border-t-2 border-grayLineBased bg-white p-4 pb-12 sm:sticky sm:pb-4">
        <Button
          className="ml-auto flex w-full items-center justify-center align-middle sm:w-auto sm:max-w-xs sm:px-6"
          type="submit"
          disabled={isSubmitting}
          variant="fill"
          value="Submit"
        >
          Continue
        </Button>
      </div>
    </form>
  );
};

export default SuccessModal;
