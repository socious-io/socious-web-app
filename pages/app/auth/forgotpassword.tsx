import type {NextPage} from 'next';
import {useRouter} from 'next/router';
import {useEffect, useReducer, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {joiResolver} from '@hookform/resolvers/joi';
import {ChevronLeftIcon} from '@heroicons/react/24/outline';
import {AxiosError} from 'axios';
import {toast} from 'react-toastify';

import {Button, Modal} from '@components/common';
import ForgotPasswordStep1 from '@components/common/Auth/ForgotPassword/Step1/ForgotPasswordStep1';
import ForgotPasswordStep2 from '@components/common/Auth/ForgotPassword/Step2/ForgotPasswordStep2';
import ForgotPasswordStep3 from '@components/common/Auth/ForgotPassword/Step3/ForgotPasswordStep3';
import {
  schemaForgotPasswordStep1,
  schemaForgotPasswordStep3,
} from '@api/auth/validation';

import {PreAuthLayout} from 'layout';
import {
  forgetPassword,
  confirmOTP,
  directChangePassword,
} from '@api/auth/actions';
import {DefaultErrorMessage, ErrorMessage} from 'utils/request';
import {ForgotError} from '@models/forgotPassword';
import {useUser} from 'hooks';

const schemaStep = {
  1: schemaForgotPasswordStep1,
  3: schemaForgotPasswordStep3,
};

const reducer = (
  state: ForgotError,
  action: {type: string; error: string | ErrorMessage},
) => {
  if (action.error == undefined) return state;

  if (typeof action.error == 'string') {
    if (action.type === 'EMAIL') {
      return {...state, emailCheckError: action.error};
    } else if (action.type === 'OTP') {
      return {...state, otpError: action.error};
    }
  } else if (action.type === 'DEFAULT') {
    return {...state, defaultMessage: action.error};
  }

  return state;
};

const ForgotPassword: NextPage = () => {
  const router = useRouter();
  const [step, setStep] = useState<number>(1);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [errorMessages, dispatch] = useReducer(reducer, {
    emailCheckError: '',
    otpError: '',
    defaultMessage: DefaultErrorMessage,
  });
  const {user, mutateUser} = useUser({redirect: false});

  useEffect(() => {
    if (user && user.password_expired) {
      setStep(3);
    }
  }, [user]);

  const formMethodsStep1 = useForm({
    resolver: joiResolver(schemaStep[1]),
  });

  const formMethodsStep3 = useForm({
    resolver: joiResolver(schemaStep[3]),
  });

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const handleForgotPasswordRequest = async () => {
    const email = formMethodsStep1.getValues('email');

    // Keeping errors clean for next check
    dispatch({type: 'EMAIL', error: ''});
    try {
      await forgetPassword(email);
      setStep(step + 1);
    } catch (e) {
      const error = e as AxiosError<any>;
      if (error.isAxiosError) {
        if (error.response?.data?.error === 'Not matched') {
          dispatch({type: 'EMAIL', error: 'Email does not exist!'});
          return;
        }
      }
      handleToggleModal();
    }
  };

  const handleConfirmOTPRequest = async (code: string) => {
    const email = formMethodsStep1.getValues('email');

    dispatch({type: 'OTP', error: ''});
    try {
      await confirmOTP(email, code);
      if (step === 2) {
        setStep(step + 1);
      } else {
        handleToggleModal();
      }
    } catch (e) {
      const error = e as AxiosError<any>;
      if (error.isAxiosError) {
        if (error.response?.data?.error === 'Not matched') {
          dispatch({type: 'OTP', error: 'Incorrect verification code.'});
          return;
        }
      }
      handleToggleModal();
    }
  };

  const handleDirectChangePasswordRequest = async () => {
    const password = formMethodsStep3.getValues('newPassword');

    try {
      await directChangePassword(password);
    } catch (error: any) {
      handleToggleModal();
      return;
    }
    toast.success('You changed your password', {autoClose: false});
    await mutateUser();
    router.push('/app');
  };

  const handleResendCode = async (onClickReset: () => void) => {
    const email = formMethodsStep1.getValues('email');

    try {
      await forgetPassword(email);
      onClickReset();
    } catch (error: any) {
      handleToggleModal();
    }
  };

  const handleSubmit = (data: any) => {
    if (step === 1) {
      handleForgotPasswordRequest();
    } else if (step === 2) {
      handleConfirmOTPRequest(data);
    } else if (step === 3) {
      handleDirectChangePasswordRequest();
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  return (
    <PreAuthLayout>
      <div className="mx-auto flex min-h-screen w-screen flex-col items-stretch border border-grayLineBased bg-background px-6 pt-12 sm:my-auto sm:block sm:h-[45rem] sm:min-h-0 sm:max-w-xl sm:rounded-3xl sm:pt-7">
        <div className="relative flex h-20 justify-center">
          <Modal isOpen={showModal} onClose={handleToggleModal}>
            <Modal.Title>
              <h2 className="text-center text-error">
                {errorMessages.defaultMessage.title}
              </h2>
            </Modal.Title>
            <Modal.Description>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  {errorMessages.defaultMessage.message}
                </p>
              </div>
            </Modal.Description>
            <div className="mt-4">
              <Button
                className="m-auto mt-4  flex w-full max-w-xs items-center justify-center align-middle "
                type="submit"
                size="lg"
                variant="fill"
                value="Submit"
                onClick={handleToggleModal}
                //disabled={!!formState?.errors}
              >
                Close
              </Button>
            </div>
          </Modal>

          {step != 1 && (
            <span
              className="absolute left-0 cursor-pointer"
              title="Back"
              onClick={handleBack}
            >
              <ChevronLeftIcon className="h-5 w-5 cursor-pointer" />
            </span>
          )}
        </div>
        <FormProvider {...formMethodsStep1}>
          {step === 1 && (
            <ForgotPasswordStep1
              onSubmit={handleSubmit}
              error={errorMessages.emailCheckError}
            />
          )}
        </FormProvider>

        {step === 2 && (
          <ForgotPasswordStep2
            onSubmit={handleSubmit}
            onResendCode={handleResendCode}
            error={errorMessages.otpError}
          />
        )}

        <FormProvider {...formMethodsStep3}>
          {step === 3 && <ForgotPasswordStep3 onSubmit={handleSubmit} />}
        </FormProvider>
      </div>
    </PreAuthLayout>
  );
};

export default ForgotPassword;
