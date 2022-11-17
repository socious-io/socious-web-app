import {Button, TextInput} from '@components/common';
import CodeFields from '@components/common/CodeFields/CodeFields';
import {ExclamationCircleIcon} from '@heroicons/react/24/solid';
import {StepProps} from '@models/stepProps';
import Link from 'next/link';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useFormContext} from 'react-hook-form';
import {useRegisterContext} from './RegisterContext';

type SignupStep2FormProps = StepProps & {
  resendCode: () => void;
};

const SignupStep2Form = ({onSubmit, resendCode}: SignupStep2FormProps) => {
  const {setRegisterContext} = useRegisterContext();
  const {
    formState: {errors},
    watch,
    clearErrors,
  } = useFormContext();
  const email = watch('email');

  const [code, setCode] = useState<string | null>(null);

  const [blockVerify, setBlockVerify] = useState<boolean>(true);

  const handleBlockVerify = useCallback(
    (state: boolean) => setBlockVerify(state),
    [],
  );

  const handleCodeChange = useCallback(
    (newCode: string) => {
      setCode(newCode);
      if (errors['code']?.message) clearErrors('code');
    },
    [clearErrors, errors],
  );

  const handleSubmitCheckCode = (e: any) => {
    e.preventDefault();
    onSubmit(code);
  };

  return (
    <div className="px-6 pt-16 pb-14 sm:px-[72px]">
      <h1 className="m-0 text-2xl font-semibold">Please check your email</h1>
      <p className="mb-10 text-graySubtitle ">We’ve sent a code to {email}.</p>
      <form
        onSubmit={handleSubmitCheckCode}
        className="flex grow flex-col justify-between sm:grow-0"
      >
        <div className="flex grow flex-col space-y-4">
          <CodeFields
            sendCode={handleCodeChange}
            setBlock={handleBlockVerify}
          />
          {errors && errors['code']?.message && (
            <p className="text-error">
              <>
                <ExclamationCircleIcon className="inline h-5 w-5" />{' '}
                {errors['code']?.message}
              </>
            </p>
          )}
          <p className="text-graySubtitle">
            Didn’t receive a code?
            <Button
              variant="link"
              onClick={() => resendCode()}
              className="underline"
            >
              Click to resend
            </Button>
          </p>
        </div>
        <div className="-mx-14 space-y-4 px-4 pt-12">
          <Button
            className="m-auto mt-4  flex w-full max-w-xs items-center justify-center align-middle"
            type="submit"
            size="lg"
            variant="fill"
            value="Submit"
            disabled={blockVerify || !!errors['code']?.message}
          >
            Verify email
          </Button>
          <div className="flex items-center justify-center align-middle">
            Already a member?
            <Button
              size="md"
              variant="link"
              onClick={() => setRegisterContext({state: 'LOGIN', step: 1})}
            >
              Sign in
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignupStep2Form;
