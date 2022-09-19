import React, {useCallback, useEffect} from 'react';
import {twMerge} from 'tailwind-merge';
import {useState} from 'react';
import {Button} from 'components/common';
import Image from 'next/image';
import MakeImpact from './../../../asset/images/make-impact.svg';
import FocusImpact from './../../../asset/images/focus-impact.svg';
import ConnectContributors from './../../../asset/images/connect-contributors.svg';
import Router from 'next/router';

const StartScreen = () => {
  const [step, setStep] = useState<number>(1);

  const toSignUp = useCallback(() => {
    Router.push('/app/auth/signup');
  }, []);

  const toLogin = useCallback(() => {
    Router.push('/app/auth/login');
  }, []);

  useEffect(() => {
    const interval = setInterval(
      () => setStep(() => (step === 3 ? 1 : step + 1)),
      5000,
    );
    return () => clearInterval(interval);
  }, [step]);

  return (
    <div className="mx-auto flex min-h-screen w-screen flex-col items-stretch border border-grayLineBased bg-background px-6 sm:my-auto sm:h-[45rem] sm:min-h-0 sm:max-w-xl sm:rounded-3xl sm:px-12">
      {step === 1 && (
        <div className="mb-9 flex h-[28rem] grow flex-col px-4">
          <div className="pt-12 pb-4">
            <h1 className="font-semibold">Make a social impact</h1>
            <p className="py-2 text-base text-graySubtitle ">
              Find projects that align with your passion to solve social issues
            </p>
          </div>
          <div className="mx-auto mt-auto h-[296px] w-[296px] rounded-2xl">
            <Image
              alt="Make a social impact"
              src={MakeImpact}
              width="296px"
              height="296px"
            />
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="mb-9 flex h-[28rem] grow flex-col px-4">
          <div className="pt-12 pb-4">
            <h1 className="font-semibold">Connect with contributors</h1>
            <p className="py-2 text-base text-graySubtitle ">
              Hire professionals that add values and contribute to the culture
            </p>
          </div>
          <div className="mx-auto mt-auto h-[296px] w-[296px] rounded-2xl">
            <Image
              alt="Make a social impact"
              src={ConnectContributors}
              width="296px"
              height="296px"
            />
          </div>
        </div>
      )}
      {step === 3 && (
        <div className="mb-9 flex h-[28rem] grow flex-col px-4">
          <div className="pt-12 pb-4">
            <h1 className="font-semibold">Social Impact Focus</h1>
            <p className="py-2 text-base text-graySubtitle ">
              A marketplace specifies to realizing positive global change
            </p>
          </div>
          <div className="mx-auto mt-auto h-[296px] w-[296px] rounded-2xl">
            <Image
              alt="Make a social impact"
              src={FocusImpact}
              width="296px"
              height="296px"
            />
          </div>
        </div>
      )}

      <div className="my-4 flex justify-center">
        {[1, 2, 3].map((stepNumber) => (
          <span
            key={`stepper-${stepNumber}`}
            onClick={() => setStep(stepNumber)}
            className={twMerge(
              'mx-1 h-3 w-3 cursor-pointer rounded-3xl  border border-grayLineBased ',
              stepNumber === step && 'bg-primary',
            )}
          />
        ))}
      </div>
      <div className="mt-16 mb-12 space-y-4 px-4 sm:mx-6">
        <Button className="mx-auto block w-10/12" onClick={toSignUp}>
          <span className="mx-auto">Join now</span>
        </Button>
        <Button
          className="mx-auto block w-10/12"
          variant="outline"
          onClick={toLogin}
        >
          <span className="mx-auto">Sign in</span>
        </Button>
      </div>
    </div>
  );
};

export default StartScreen;
