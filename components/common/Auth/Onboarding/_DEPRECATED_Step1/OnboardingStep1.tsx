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
  }, []);

  const handleSeePolicy = useCallback(() => {
    // TODO detect current language
    window.open(PRIVACY_URL('en_US'));
  }, []);

  return (
    <form
      onSubmit={handleOnSubmit}
      className="ml-10 flex grow flex-col justify-between pl-0 pr-10 sm:ml-0 sm:pl-10"
    >
      <div className="flex grow flex-col items-center justify-center">
        {' '}
        <Image
          src={logoCompony}
          width="104.03"
          height="136.59"
          alt="socious logo"
        />
        <h1 className="font-helmet my-6 text-center ">Welcome to Socious</h1>
        <p className="mb-6 text-center text-base text-graySubtitle">
          To continue, please agree to our terms of service and privacy policy
          <Button
            variant="link"
            onClick={handleSeeTerms}
            className="m-0 px-1 py-0"
          >
            {' '}
            terms of service{' '}
          </Button>
          and
          <Button
            variant="link"
            onClick={handleSeePolicy}
            className="m-0 px-1 py-0"
          >
            {' '}
            privacy policy{' '}
          </Button>
        </p>
      </div>

      <div className="-mx-16  divide-x border-t-2 border-b-grayLineBased pb-12">
        <Button
          className="m-auto mt-4  flex w-full max-w-xs items-center justify-center align-middle "
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
