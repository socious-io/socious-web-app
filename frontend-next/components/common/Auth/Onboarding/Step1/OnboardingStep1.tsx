import {Button} from '@components/common';
import Image from 'next/image';
import {useCallback, useState} from 'react';
import logoCompony from 'asset/icons/logo-color.svg';
import {StepProps} from '@models/stepProps';
import {TERM_URL, PRIVACY_URL} from 'utils/api';

const OnboardingStep1 = ({onSubmit}: StepProps) => {

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    onSubmit('true');
  };

  const handleSeeTerms = useCallback(() => {
    // TODO detect current language
    window.open(TERM_URL('en_US'));
  }, [])

  const handleSeePolicy = useCallback(() => {
    // TODO detect current language
    window.open(PRIVACY_URL('en_US'));
  }, [])

  return (
    <form
      onSubmit={handleOnSubmit}
      className="flex flex-col justify-between  px-10    "
    >
      <div className="flex flex-col h-[28rem]">
        {' '}
        <Image
          src={logoCompony}
          width="104.03"
          height="136.59"
          alt="socious logo"
        />
        <h1 className="font-helmet text-center my-6 ">Welcome to Socious</h1>
        <p className="text-base text-center my-6 text-graySubtitle">
          To continue, please agree to our terms of service and privacy policy
          <Button variant="link" onClick={handleSeeTerms} className="px-1">
            {' '}
            terms of service{' '}
          </Button>
          and
          <Button variant="link" onClick={handleSeePolicy} className="px-1">
            {' '}
            privacy policy{' '}
          </Button>
        </p>
      </div>

      <div className="h-48  border-t-2 border-b-grayLineBased divide-x -mx-16 ">
        <Button
          className="max-w-xs w-full  m-auto flex items-center justify-center align-middle mt-4 "
          type="submit"
          size="lg"
          variant="fill"
          value="Submit"
        >
          I agree
        </Button>
      </div>
    </form>
  );
};

export default OnboardingStep1;
