import type {NextPage} from 'next';
import Router from "next/router";
import {useCallback, useEffect, useMemo, useReducer, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {joiResolver} from '@hookform/resolvers/joi';

import {Button, Modal} from '@components/common';

import {ChevronLeftIcon} from '@heroicons/react/outline';

import ForgotPasswordStep1 from '@components/common/Auth/ForgotPassword/Step1/ForgotPasswordStep1';
import ForgotPasswordStep2 from '@components/common/Auth/ForgotPassword/Step2/ForgotPasswordStep2';
import ForgotPasswordStep3 from '@components/common/Auth/ForgotPassword/Step3/ForgotPasswordStep3';
import {
  schemaForgotPasswordStep1,
  schemaForgotPasswordStep3,
} from '@api/auth/validation';

import { forgetPassword, confirmOTP, directChangePassword } from '@api/auth/actions';
import { FetchError } from 'utils/request';
import { ForgotError } from '@models/forgotPassword'
import useUser from 'services/useUser';

const schemaStep = {
  1: schemaForgotPasswordStep1,
  3: schemaForgotPasswordStep3,
};

const reducer = (state: ForgotError, action: { type: string, error: string}) => {
  if (action.error == undefined) return state

  switch (action.type) {
    case "EMAIL":
      return { ...state, emailCheckError: action.error}
    case "OTP":
      return { ...state, otpError: action.error}
    default:
      return { ...state, defaultMessage: action.error}
  }
}

const ForgotPassword: NextPage = () => {
  const [step, setStep] = useState<number>(1);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [errorMessages, dispatch] = useReducer(reducer, {emailCheckError: "", otpError: "", defaultMessage: ""});
  const {user} = useUser({onAuthError: false});
  
  useEffect(() => {
    if (user && user.password_expired) {
      setStep(3);
    }
  }, [user])

  const formMethodsStep1 = useForm({
    resolver: joiResolver(schemaStep[1]),
  });

  const formMethodsStep3 = useForm({
    resolver: joiResolver(schemaStep[3]),
  });

  const handleSubmit = (data: any) => {
    if (step === 1) {
      handleForgotPasswordRequest();
    } else if (step === 2) {
      handleConfirmOTPRequest(data);
    } else if (step === 3) {
      handleDirectChangePasswordRequest();
    }
  };

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const handleForgotPasswordRequest = async () => {
    const email = formMethodsStep1.getValues('email');
    
    // Keeping errors clean for next check
    dispatch({ type: "EMAIL", error: ""})
    try {
      await forgetPassword(email);
      setStep(step + 1);
    } catch(error: any) {
      if (error instanceof FetchError) {
        if (error.data.error === "not matched") {
          dispatch({ type: "EMAIL", error: "Email does not exist!"});
        } else {
          dispatch({ type: "DEFAULT", error: (error.data.error || error.data.message)});
        }
      }
    }
  };

  const handleConfirmOTPRequest = async (code: string) => {
    const email = formMethodsStep1.getValues('email');

    try {
      await confirmOTP(email, code)
      if (step === 2) {
        setStep(step + 1);
      } else {
        handleToggleModal();
      }
    } catch (error: any) {
      if (error instanceof FetchError) {
        dispatch({ type: "OTP", error: (error.data.error || error.data.message)});
      }
    }
  };

  const handleDirectChangePasswordRequest = async () => {
    const password = formMethodsStep3.getValues('newPassword');

    try {
      await directChangePassword(password);
      Router.push("/auth/login");
    } catch (error: any) {
      if (error instanceof FetchError) {
        dispatch({ type: "DEFAULT", error: (error.data.error || error.data.message)});
        handleToggleModal();
      }
    }
  };

  const handleResendCode = async (onClickReset: () => void) => {
    const email = formMethodsStep1.getValues('email');
    
    try {
      await forgetPassword(email)
      onClickReset()
    } catch(error: any) {
      if (error instanceof FetchError) {
        dispatch({ type: "DEFAULT", error: (error.data.error || error.data.message)});
        handleToggleModal();
      }
    }
  }

  const handleBack = () => {
    setStep(step - 1);
  };

  return (
    <div className="max-w-xl h-[45rem] m-auto  bg-background rounded-3xl py-7 px-6 border border-grayLineBased ">
      <div className="flex  justify-center  h-20 relative">
        <Modal isOpen={showModal} onClose={handleToggleModal}>
          <Modal.Title>
            <h2 className="text-error text-center">
              {errorMessages.defaultMessage || "Sorry, something went wrong"}
            </h2>
          </Modal.Title>
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
              onClick={handleToggleModal}
              //disabled={!!formState?.errors}
            >
              Close
            </Button>
          </div>
        </Modal>

        {(step != 1) && (
          <span
            className="cursor-pointer absolute left-0"
            title="Back"
            onClick={handleBack}
          >
            <ChevronLeftIcon className="w-5 h-5 cursor-pointer" />
          </span>
        )}
      </div>
      <FormProvider {...formMethodsStep1}>
        {step === 1 && <ForgotPasswordStep1 onSubmit={handleSubmit} error={errorMessages.emailCheckError} />}
      </FormProvider>

      {(step === 2) && (
        <ForgotPasswordStep2 onSubmit={handleSubmit} onResendCode={handleResendCode} error={errorMessages.otpError} />
      )}

      <FormProvider {...formMethodsStep3}>
        {step === 3 && <ForgotPasswordStep3 onSubmit={handleSubmit} />}
      </FormProvider>
    </div>
  );
};

export default ForgotPassword;
