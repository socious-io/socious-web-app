import {confirmOTP, login, register, sendOTP} from '@api/auth/actions';
import {
  schemaLogin,
  schemaSignupCompact,
  schemaSignupStep2,
} from '@api/auth/validation';
import {Modal} from '@components/common';
import {joiResolver} from '@hookform/resolvers/joi';
import {useUser} from '@hooks';
import {AxiosError} from 'axios';
import React, {useCallback} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {toast} from 'react-toastify';
import LoginForm from './LoginForm';
import {useRegisterContext} from './RegisterContext';
import SignupStep1Form from './SignupStep1Form';
import SignupStep3Form from './SignupStep3Form';
import SignupStep2Form from './SignupStep2Form';

type RegisterModalProps = {
  show: boolean;
  onClose: () => void;
};

const RegisterModal = ({show, onClose}: RegisterModalProps) => {
  const {registerContext, setRegisterContext} = useRegisterContext();
  const {mutateIdentities} = useUser({redirect: false});

  const loginMethods = useForm({resolver: joiResolver(schemaLogin)});
  const emailMethods = useForm({resolver: joiResolver(schemaSignupStep2)});
  const compactMethods = useForm({resolver: joiResolver(schemaSignupCompact)});

  const {state, step} = registerContext;
  const forceClose = useCallback(() => {
    setRegisterContext({state: 'LOGIN', step: 1});
    onClose();
  }, [onClose, setRegisterContext]);

  const loginUser = useCallback(
    async ({email, password}: {email: string; password: string}) => {
      try {
        await login(email, password);
        mutateIdentities();
        forceClose();
      } catch (error) {
        const data: any = (error as AxiosError).response?.data;
        if (data) {
          if (data.error === 'Not matched')
            toast.error('Email or password is incorrect');
          else
            toast.error(`Couldn't save data: ${data.error || 'error'}`, {
              autoClose: false,
            });
        }
      }
    },
    [forceClose, mutateIdentities],
  );

  const registerWithEmail = useCallback(async () => {
    const email = emailMethods.getValues('email');
    try {
      await register(email);
    } catch (error: any) {
      if (error.isAxiosError && error.response.data)
        toast.error(error.response?.data?.error);
      return;
    }
    setRegisterContext({...registerContext, step: 2});
  }, [emailMethods, registerContext, setRegisterContext]);

  const handleConfirmOTPRequest = useCallback(
    async (code: string) => {
      const email = emailMethods.getValues('email');

      try {
        await confirmOTP(email, code);
        setRegisterContext({...registerContext, step: 3});
      } catch (e) {
        const error = e as AxiosError<any>;
        if (error.isAxiosError) {
          if (error.response?.data?.error === 'Not matched') {
            emailMethods.setError(
              'code',
              {
                type: 'value',
                message: 'Incorrect verification code.',
              },
              {shouldFocus: false},
            );
          } else {
            toast.error(error.response?.data?.error);
          }
        }
      }
    },
    [emailMethods, registerContext, setRegisterContext],
  );

  const handleSendOTP = useCallback(async () => {
    const email = emailMethods.getValues('email');
    try {
      await sendOTP(email);
    } catch (error: any) {
      if (error.isAxiosError && error.response.data)
        toast.error(error.response?.data?.error);
    }
  }, [emailMethods]);

  const handleNameAndPassword = useCallback(() => {
    const firstName = compactMethods.getValues('firstName');
    const lastName = compactMethods.getValues('lastName');
    const password = compactMethods.getValues('password');
  }, [compactMethods]);

  const submitSignup = useCallback(
    async (data?: any) => {
      if (step === 1) registerWithEmail();
      else if (step === 2) handleConfirmOTPRequest(data);
      else if (step === 3) handleNameAndPassword();
    },
    [handleConfirmOTPRequest, handleNameAndPassword, step],
  );

  return (
    <Modal
      isOpen={show}
      onClose={forceClose}
      className="-m-4 mt-16 flex w-screen max-w-2xl flex-col self-end rounded-b-none p-0 sm:m-0 sm:w-full sm:max-w-lg sm:self-auto sm:rounded-2xl sm:pt-0"
    >
      {state === 'LOGIN' ? (
        <FormProvider {...loginMethods}>
          <LoginForm onSubmit={loginUser} />
        </FormProvider>
      ) : step === 1 ? (
        <FormProvider {...emailMethods}>
          <SignupStep1Form onSubmit={submitSignup} />
        </FormProvider>
      ) : step === 2 ? (
        <FormProvider {...emailMethods}>
          <SignupStep2Form onSubmit={submitSignup} resendCode={handleSendOTP} />
        </FormProvider>
      ) : (
        <FormProvider {...compactMethods}>
          <SignupStep3Form onSubmit={submitSignup} />
        </FormProvider>
      )}
    </Modal>
  );
};

export default RegisterModal;
