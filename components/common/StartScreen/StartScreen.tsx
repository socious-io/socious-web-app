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
  const [step, setStep] = useState<number>(3);

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
    <div className="mx-auto flex h-screen w-screen flex-col items-stretch border border-grayLineBased bg-background px-6 sm:my-auto sm:h-auto sm:max-h-[45rem] sm:max-w-xl sm:rounded-3xl sm:px-12">
      <div className="grow">
        {step === 1 && (
          <div className="flex grow flex-col sm:max-h-[28rem]">
            <div className="pt-12 pb-4 sm:px-6">
              <h1 className="font-semibold">Make a social impact</h1>
              <p className="py-2 text-base text-graySubtitle ">
                Find projects that align with your passion to solve social
                issues
              </p>
            </div>
            <div className="mx-auto h-[296px] w-[327px] rounded-2xl sm:w-[296px]">
              <Image
                layout="responsive"
                alt="Make a social impact"
                src={MakeImpact}
                width="100"
                height="100"
              />
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="flex grow flex-col sm:max-h-[28rem]">
            <div className="pt-12 pb-4 sm:px-6">
              <h1 className="font-semibold">Connect with contributors</h1>
              <p className="py-2 text-base text-graySubtitle ">
                Hire professionals that add values and contribute to the culture
              </p>
            </div>
            <div className="mx-auto h-[296px] w-[296px] rounded-2xl sm:w-[296px]">
              <Image
                layout="responsive"
                alt="Make a social impact"
                src={ConnectContributors}
                width="100"
                height="100"
              />
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="flex grow flex-col sm:max-h-[28rem]">
            <div className="pt-12 pb-4 sm:px-6">
              <h1 className="font-semibold">Social Impact Focus</h1>
              <p className="py-2 text-base text-graySubtitle ">
                A marketplace specifies to realizing positive global change
              </p>
            </div>
            <div className="mx-auto h-[296px] w-[327px] rounded-2xl sm:w-[296px]">
              <Image
                layout="responsive"
                alt="Make a social impact"
                src={FocusImpact}
                width="100"
                height="100"
              />
            </div>
          </div>
        )}

        <div className="mb-auto mt-7 flex justify-center sm:mt-9">
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
      </div>
      <div className="mb-12 space-y-4 px-4 sm:mx-6 sm:mt-16">
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
