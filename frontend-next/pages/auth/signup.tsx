import type {NextPage} from 'next';
import {useState} from 'react';
import {useRouter} from 'next/router';
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
import {signup, checkEmailExist} from '@api/auth/actions';
import { rejects } from 'assert';

const Signup: NextPage = () => {
  const router = useRouter();

  const [step, setStep] = useState<number>(1);

  const [showModal, setShowModal] = useState<boolean>(false);

  const [errorMessage, setError] = useState<string>("");

  const formMethodsStep1 = useForm({
    resolver: joiResolver(schemaSignupStep1),
  });
  const formMethodsStep2 = useForm({
    resolver: joiResolver(schemaSignupStep2),
  });
  const formMethodsStep3 = useForm({
    resolver: joiResolver(schemaSignupStep3),
  });

  const handleSubmit = (data: any) => {
    if (step === 4) {
      handleSignupRequest();
    } else if (step === 2) {
      const email = formMethodsStep2.getValues('email');
      checkEmailExist(email)
        .then((response) => {
          if (response.email) {
            setError("This email is already registered.")
          } else {
            setStep(step + 1)
          }
        })
    }
    else  {
      setStep(step + 1);
    }
  };
  const handleBack = () => {
    setStep(step - 1);
  };

  const handleToggleModal = () => {
    if (showModal) router.replace('/auth/login');
    setShowModal(!showModal);
  };

  const handleSignupRequest = async () => {
    const firstName = formMethodsStep1.getValues('firstName');
    const lastName = formMethodsStep1.getValues('lastName');
    const email = formMethodsStep2.getValues('email');
    const password = formMethodsStep3.getValues('password');

    // TODO handle errors
    try {
      await signup(firstName, lastName, email, password);
      handleToggleModal();
    } catch(error: any) {
      setError(error.data.error || error.data.message);
      setStep(2)
    }

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
        {step === 1 && <SignupStep1 onSubmit={handleSubmit}/>}
      </FormProvider>
      <FormProvider {...formMethodsStep2}>
        {step === 2 && <SignupStep2 onSubmit={handleSubmit} error={errorMessage} />}
      </FormProvider>
      <FormProvider {...formMethodsStep3}>
        {step === 3 && <SignupStep3 onSubmit={handleSubmit} />}
      </FormProvider>
      {step === 4 && <SignupStep5 onSubmit={handleSubmit} />}

      {/*step === 5 && <SignupStep5 onSubmit={handleSubmit} />*/}

      <Modal isOpen={showModal} onClose={handleToggleModal}>
        <Modal.Title>Signup successful</Modal.Title>
        <Modal.Description>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Thank you for joining Socious. You can now log in.
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
            onClick={handleToggleModal}
          >
            Ok
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Signup;
