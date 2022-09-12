import React, { useCallback, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { useState } from "react";
import { Button } from "components/common";
import Image from 'next/image';
import MakeImpact from './../../../asset/images/make-impact.svg';
import FocusImpact from './../../../asset/images/focus-impact.svg';
import ConnectContributors from './../../../asset/images/connect-contributors.svg';
import Router from 'next/router';

const StartScreen = () => {
  const [step, setStep] = useState<number>(1);

  const toSignUp = useCallback(() => {
    Router.push('/auth/signup');
  }, []);

  const toLogin = useCallback(() => {
    Router.push('/auth/login');
  }, []);

  useEffect(() => {
    const interval = setInterval(
      () => (setStep(() => step === 3 ? 1 : step + 1 ))
      , 5000);
    return () => clearInterval(interval);
  }, [step])

  return (
    <div className="max-w-xl min-h-[40rem] mx-auto bg-background  rounded-none md:rounded-3xl pb-7 px-6 border border-grayLineBased -my-10 md:my-0">
      {
        step === 1 && 
        <div className="h-[28rem] px-4 flex flex-col mb-9">
          <div className="pt-12 pb-4">
            <h1 className="font-semibold">Make a social impact</h1>
            <p className="text-base py-2 text-graySubtitle ">Find projects that align with your passion to solve social issues</p>
          </div>
          <div className='w-[296px] h-[296px] mx-auto mt-auto rounded-2xl'>
            <Image
              alt='Make a social impact'
              src={MakeImpact}
              width="296px"
              height="296px"
            />
          </div>
        </div>
      }
      {
        step === 2 && 
        <div className="h-[28rem] px-4 flex flex-col mb-9">
          <div className="pt-12 pb-4">
            <h1 className="font-semibold">Connect with contributors</h1>
            <p className="text-base py-2 text-graySubtitle ">Hire professionals that add values and contribute to the culture</p>
          </div>
          <div className='w-[296px] h-[296px] mx-auto mt-auto rounded-2xl'>
            <Image
              alt='Make a social impact'
              src={ConnectContributors}
              width="296px"
              height="296px"
            />
          </div>
        </div>
      }
      {
        step === 3 && 
        <div className="h-[28rem] px-4 flex flex-col mb-9">
          <div className="pt-12 pb-4">
            <h1 className="font-semibold">Social Impact Focus</h1>
            <p className="text-base py-2 text-graySubtitle ">A marketplace specifies to realizing positive global change</p>
          </div>
          <div className='w-[296px] h-[296px] mx-auto mt-auto rounded-2xl'>
            <Image
              alt='Make a social impact'
              src={FocusImpact}
              width="296px"
              height="296px"
            />
          </div>
        </div>
      }
      
      <div className="flex justify-center my-4">
        {[1, 2, 3].map((stepNumber) => (
          <span
            key={`stepper-${stepNumber}`}
            onClick={() => setStep(stepNumber)}
            className={twMerge(
              'w-3 h-3 mx-1 cursor-pointer rounded-3xl  border border-grayLineBased ',
              stepNumber === step && 'bg-primary'
            )}
          />
        ))}
      </div>
      <div className='space-y-4 px-4 mx-10 mt-16'>
        <Button
          className='block w-10/12 mx-auto'
          onClick={toSignUp}
        >
          <span
            className='mx-auto'
          >
            Join now
          </span>
        </Button>
        <Button
          className='block w-10/12 mx-auto'
          variant='outline'
          onClick={toLogin}
        >
          <span
            className='mx-auto'
          >
            Sign in
          </span>
        </Button>
      </div>
    </div>
  );
};

export default StartScreen;
