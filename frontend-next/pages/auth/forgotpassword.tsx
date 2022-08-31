import type {NextPage} from 'next';
import {useState} from 'react';
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
} from '../../api/auth/validation';
import useAuth from 'services/useAuth';
import useUser from 'services/useUser';

const schemaStep = {
  1: schemaForgotPasswordStep1,
  3: schemaForgotPasswordStep3,
};

const ForgotPassword: NextPage = () => {
  const [step, setStep] = useState<number>(1);
  const [showModal, setShowModal] = useState<boolean>(false);

  const {forgetPassword, confirmOTP} = useAuth();
  const {directChangePassword} = useUser();
  const formMethodsStep1 = useForm({
    resolver: joiResolver(schemaStep[1]),
  });

  const formMethodsStep3 = useForm({
    resolver: joiResolver(schemaStep[3]),
  });

  const handleSubmit = (data: any) => {
    if (step === 1) {
      handleForgotPasswordRequest();
    } else if (step === 2 || step === 4) {
      handleConfirmOTPRequest(data);
    } else if (step === 3) {
      handleDirectChangePasswordRequest();
    } else {
      setStep(step + 1);
    }
  };

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const handleForgotPasswordRequest = () => {
    const email = formMethodsStep1.getValues('email');

    const user = {email};

    forgetPassword(user).then(() => {
      setStep(step + 1);
    });
  };

  const handleConfirmOTPRequest = (code: any) => {
    const email = formMethodsStep1.getValues('email');

    const user = {email, code};

    confirmOTP(user).then(() => {
      if (step === 2) {
        setStep(step + 1);
      } else {
        handleToggleModal();
      }
    });
  };
  const handleDirectChangePasswordRequest = () => {
    const password = formMethodsStep3.getValues('newPassword');

    const user = {password};

    directChangePassword(user).then(() => {
      setStep(step + 1);
    });
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  return (
    <div className="max-w-xl h-[45rem] m-auto  bg-background rounded-3xl py-7 px-6 border border-grayLineBased ">
      <div className="flex  justify-center  h-20 relative">
        <Modal isOpen={showModal} onClose={handleToggleModal}>
          <Modal.Title>
            <h2 className="text-error text-center">
              Sorry, something went wrong
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

        <span
          className="cursor-pointer absolute left-0"
          title="Back"
          onClick={handleBack}
        >
          <ChevronLeftIcon className="w-5 h-5 cursor-pointer" />
        </span>
      </div>
      <FormProvider {...formMethodsStep1}>
        {step === 1 && <ForgotPasswordStep1 onSubmit={handleSubmit} />}
      </FormProvider>

      {(step === 2 || step === 4) && (
        <ForgotPasswordStep2 onSubmit={handleSubmit} />
      )}

      <FormProvider {...formMethodsStep3}>
        {step === 3 && <ForgotPasswordStep3 onSubmit={handleSubmit} />}
      </FormProvider>
    </div>
  );
};

export default ForgotPassword;
