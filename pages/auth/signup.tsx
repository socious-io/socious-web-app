import type {NextPage} from 'next';
import {useCallback, useState} from 'react';
import {useRouter} from 'next/router';
import {FormProvider, useForm} from 'react-hook-form';
import {joiResolver} from '@hookform/resolvers/joi';
import {twMerge} from 'tailwind-merge';
import {ChevronLeftIcon} from '@heroicons/react/24/outline';
import {AxiosError} from 'axios';

import {Button, Modal} from '@components/common';
import {DefaultErrorMessage, ErrorMessage} from 'utils/request';

import SignupStep1 from '@components/common/Auth/Signup/Step1/SignupStep1';
import SignupStep2 from '@components/common/Auth/Signup/Step2/SignupStep2';
import SignupStep3 from '@components/common/Auth/Signup/Step3/SignupStep3';
import SignupStep4 from '@components/common/Auth/Signup/Step4/SignupStep4';

import {
  schemaSignupStep1,
  schemaSignupStep2,
  schemaSignupStep3,
} from '@api/auth/validation';
import {signup, checkEmailExist} from '@api/auth/actions';

const Signup: NextPage = () => {
  const router = useRouter();

  const [step, setStep] = useState<number>(1);

  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);

  const [errorMessage, setError] = useState<ErrorMessage>();

  const formMethodsStep1 = useForm({
    resolver: joiResolver(schemaSignupStep1),
  });
  const formMethodsStep2 = useForm({
    resolver: joiResolver(schemaSignupStep2),
  });

  const {setError: setEmailError} = formMethodsStep2;

  const formMethodsStep3 = useForm({
    resolver: joiResolver(schemaSignupStep3),
  });

  const handleSubmit = (data: any) => {
    if (step === 4) {
      handleSignupRequest();
    } else if (step === 2) {
      const email = formMethodsStep2.getValues('email');
      checkEmailExist(email)
        .then((response: any) => {
          if (response.email) {
            setEmailError('email', {
              type: 'userExists',
              message: 'This email is already registered',
            });
          } else {
            setStep(step + 1);
          }
        })
        .catch((e) => {
          setError(DefaultErrorMessage);
          handleErrorToggle();
        });
    } else {
      setStep(step + 1);
    }
  };
  const handleBack = useCallback(() => {
    setStep(step - 1);
  }, []);

  const handleSuccessToggle = useCallback(() => {
    if (showSuccess) router.replace('/auth/login');
    setShowSuccess(!showSuccess);
  }, [showSuccess]);

  const handleErrorToggle = useCallback(
    () => setShowError(!showError),
    [showError],
  );

  const handleSignupRequest = async () => {
    const firstName = formMethodsStep1.getValues('firstName');
    const lastName = formMethodsStep1.getValues('lastName');
    const email = formMethodsStep2.getValues('email');
    const password = formMethodsStep3.getValues('password');

    try {
      await signup(firstName, lastName, email, password);
      handleSuccessToggle();
    } catch (e) {
      setError(DefaultErrorMessage);
      handleErrorToggle();
    }
  };

  return (
    <div className="w-screen sm:max-w-xl min-h-screen sm:min-h-0 sm:h-[45rem] flex flex-col items-stretch mx-auto sm:my-auto bg-background sm:rounded-3xl pt-12 sm:py-7 px-6 border border-grayLineBased">
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
        <div className="flex h-20 pt-1 ">
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
      {step === 4 && <SignupStep4 onSubmit={handleSubmit} />}

      <Modal isOpen={showSuccess} onClose={handleSuccessToggle}>
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
            className="max-w-xs w-full m-auto flex items-center justify-center align-middle mt-4 "
            type="submit"
            size="lg"
            variant="fill"
            value="Submit"
            onClick={handleSuccessToggle}
          >
            Close
          </Button>
        </div>
      </Modal>

      {/* Error Modal */}
      <Modal isOpen={showError} onClose={handleErrorToggle}>
        <Modal.Title>
          <h2 className="text-error text-center">{errorMessage?.title}</h2>
        </Modal.Title>
        <Modal.Description>
          <div className="mt-2">
            <p className="text-sm text-gray-500">{errorMessage?.message}</p>
          </div>
        </Modal.Description>
        <div className="mt-4">
          <Button
            className="max-w-xs w-full  m-auto flex items-center justify-center align-middle mt-4 "
            type="submit"
            size="lg"
            variant="fill"
            value="Submit"
            onClick={handleErrorToggle}
          >
            Close
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Signup;
