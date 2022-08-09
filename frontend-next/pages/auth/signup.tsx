import type {NextPage} from 'next';
import {useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {joiResolver} from '@hookform/resolvers/joi';

import {Button, Modal} from '@components/common';

import SignupStep1 from '@components/common/Auth/Signup/Step1/SignupStep1';
import SignupStep2 from '@components/common/Auth/Signup/Step2/SignupStep2';
import SignupStep3 from '@components/common/Auth/Signup/Step3/SignupStep3';
import SignupStep4 from '@components/common/Auth/Signup/Step4/SignupStep4';
import SignupStep5 from '@components/common/Auth/Signup/Step5/SignupStep5';

import {twMerge} from 'tailwind-merge';
import {ChevronLeftIcon} from '@heroicons/react/outline';
import {
  schemaSignupStep1,
  schemaSignupStep2,
  schemaSignupStep3,
} from '@api/auth/validation';
import useAuth from 'services/useAuth';

const schemaStep = {
  1: schemaSignupStep1,
  2: schemaSignupStep2,
  3: schemaSignupStep3,
};

const Signup: NextPage = () => {
  const [step, setStep] = useState<number>(1);

  const [showModal, setShowModal] = useState<boolean>(false);

  const formMethodsStep1 = useForm({
    resolver: joiResolver(schemaStep[1]),
  });
  const formMethodsStep2 = useForm({
    resolver: joiResolver(schemaStep[2]),
  });
  const formMethodsStep3 = useForm({
    resolver: joiResolver(schemaStep[3]),
  });

  const handleSubmit = (data: any) => {
    if (step === 4) {
      handleSignupRequest();
    } else {
      setStep(step + 1);
    }
  };
  const handleBack = () => {
    setStep(step - 1);
  };

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const handleSignupRequest = () => {
    const firstName = formMethodsStep1.getValues('firstName');
    const lastName = formMethodsStep1.getValues('lastName');
    const email = formMethodsStep1.getValues('email');
    const password = formMethodsStep1.getValues('password');
    const username = 'test';

    const user = {firstName, lastName, email, password, username};

    // signup(user).then(() => {
    //   handleToggleModal();
    // });
    alert('Signup');
    handleToggleModal();
  };

  return (
    <div className="max-w-xl h-[45rem] m-auto  bg-background rounded-3xl py-7 px-6 border border-grayLineBased ">
      <div className="flex  justify-center  h-20 relative">
        {![1, 4].includes(step) && (
          <span
            className="cursor-pointer absolute left-0"
            title="Back"
            onClick={handleBack}
          >
            <ChevronLeftIcon className="w-5 h-5 cursor-pointer" />
          </span>
        )}
        <div className="flex h-20 pt-1">
          {[1, 2, 3].includes(step) &&
            [1, 2, 3].map((stepNumber) => (
              <div key={`stepper-${stepNumber}`} className="flex">
                <span
                  className={twMerge(
                    'w-3 h-3 mx-1 cursor-pointer rounded-3xl  border border-grayLineBased ',
                    stepNumber === step && 'bg-primary',
                  )}
                />
              </div>
            ))}
        </div>
      </div>
      <FormProvider {...formMethodsStep1}>
        {step === 1 && <SignupStep1 onSubmit={handleSubmit} />}
      </FormProvider>
      <FormProvider {...formMethodsStep2}>
        {step === 2 && <SignupStep2 onSubmit={handleSubmit} />}
      </FormProvider>
      <FormProvider {...formMethodsStep3}>
        {step === 3 && <SignupStep3 onSubmit={handleSubmit} />}
      </FormProvider>
      {step === 4 && <SignupStep5 onSubmit={handleSubmit} />}

      {/*step === 5 && <SignupStep5 onSubmit={handleSubmit} />*/}

      <Modal isOpen={showModal} onClose={handleToggleModal}>
        <Modal.Title>Title</Modal.Title>
        <Modal.Description>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit de.
            </p>
          </div>
        </Modal.Description>
        <div className="mt-4">
          <Button
            className="max-w-xs w-full  m-auto flex items-center justify-center align-middle mt-4 "
            type="submit"
            size="lg"
            variant="fill"
            value="Submit"
            //disabled={!!formState[step]?.errors}
          >
            Ok
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Signup;
