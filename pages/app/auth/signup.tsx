import type {NextPage} from 'next';
import {useCallback, useState} from 'react';
import {useRouter} from 'next/router';
import {FormProvider, useForm} from 'react-hook-form';
import {joiResolver} from '@hookform/resolvers/joi';
import {twMerge} from 'tailwind-merge';
import {ChevronLeftIcon} from '@heroicons/react/24/outline';
import {AxiosError} from 'axios';
import {PreAuthLayout} from 'layout';
import {Button, Modal} from '@components/common';
import {DefaultErrorMessage, ErrorMessage} from 'utils/request';

import ForgotPasswordStep2 from '@components/organisms/Auth/ForgotPassword/Step2/ForgotPasswordStep2';
import SignupStep1 from '@components/organisms/Auth/Signup/Step1/SignupStep1';
import SignupStep2 from '@components/organisms/Auth/Signup/Step2/SignupStep2';
import SignupStep3 from '@components/organisms/Auth/Signup/Step3/SignupStep3';
import SignupStep4 from '@components/organisms/Auth/Signup/Step4/SignupStep4';

import {
  schemaSignupStep1,
  schemaSignupStep2,
  schemaSignupStep3,
} from '@api/auth/validation';
import {signup, checkEmailExist, sendOTP, confirmOTP} from '@api/auth/actions';

const Signup: NextPage = () => {
  const router = useRouter();

  const [step, setStep] = useState<number>(1);

  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);

  const [errorMessage, setError] = useState<ErrorMessage>();
  const [otpError, setOtpError] = useState<string>('');

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
              message: 'This email is already registered.',
            });
          } else {
            setStep(step + 1);
          }
        })
        .catch((e) => {
          setError(DefaultErrorMessage);
          handleErrorToggle();
        });
      handleSendCode().catch((e) => {
        setError(DefaultErrorMessage);
        handleErrorToggle();
      });
    } else {
      setStep(step + 1);
    }
  };
  const handleBack = useCallback(() => {
    setStep(step - 1);
  }, [step]);

  const handleSuccessToggle = useCallback(() => {
    if (showSuccess) router.replace('/app/auth/login');
    setShowSuccess(!showSuccess);
  }, [router, showSuccess]);

  const handleErrorToggle = useCallback(
    () => setShowError((showError) => !showError),
    [],
  );

  const handleSendCode = useCallback(async () => {
    const email = formMethodsStep2.getValues('email');
    console.log('EMAIL :--: ', email);
    try {
      await sendOTP(email);
    } catch (error: any) {
      console.log('ERROR :--: ', error);
    }
  }, [formMethodsStep2]);

  const handleConfirmOTPRequest = async (code: string) => {
    const email = formMethodsStep2.getValues('email');
    setOtpError('');
    try {
      await confirmOTP(email, code);
      if (step === 2) {
        setStep(step + 1);
      }
    } catch (e) {
      const error = e as AxiosError<any>;
      if (error.isAxiosError) {
        if (error.response?.data?.error === 'Not matched') {
          setOtpError('Incorrect verification code.');
          return;
        }
      }
    }
  };

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
    <PreAuthLayout>
      <div className="mx-auto flex min-h-screen w-screen flex-col items-stretch border border-grayLineBased bg-background px-6 pt-12 sm:my-auto sm:h-[45rem] sm:min-h-0 sm:max-w-xl sm:rounded-3xl sm:py-7">
        <div className="relative  flex  h-20 justify-center">
          {![1, 4].includes(step) && (
            <span
              className="absolute left-0 cursor-pointer"
              title="Back"
              onClick={handleBack}
            >
              <ChevronLeftIcon className="h-5 w-5 cursor-pointer" />
            </span>
          )}
          <div className="flex h-20 pt-1 ">
            {[1, 2, 3].includes(step) &&
              [1, 2, 3].map((stepNumber) => (
                <div key={`stepper-${stepNumber}`} className="flex">
                  <span
                    className={twMerge(
                      'mx-1 h-3 w-3 cursor-pointer rounded-3xl  border border-grayLineBased ',
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
        {step === 3 && (
          <ForgotPasswordStep2
            onSubmit={handleSubmit}
            onResendCode={handleSendCode}
            error={otpError}
            email={formMethodsStep2.getValues('email')}
          />
        )}
        <FormProvider {...formMethodsStep3}>
          {step === 4 && <SignupStep3 onSubmit={handleSubmit} />}
        </FormProvider>
        {step === 5 && <SignupStep4 onSubmit={handleSubmit} />}

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
              className="m-auto mt-4 flex w-full max-w-xs items-center justify-center align-middle "
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
            <h2 className="text-center text-error">{errorMessage?.title}</h2>
          </Modal.Title>
          <Modal.Description>
            <div className="mt-2">
              <p className="text-sm text-gray-500">{errorMessage?.message}</p>
            </div>
          </Modal.Description>
          <div className="mt-4">
            <Button
              className="m-auto mt-4  flex w-full max-w-xs items-center justify-center align-middle "
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
    </PreAuthLayout>
  );
};

export default Signup;
