import {Button, TextInput} from '@components/common';
import {ExclamationCircleIcon} from '@heroicons/react/24/solid';
import {StepProps} from '@models/stepProps';
import Link from 'next/link';
import React, {useEffect, useRef, useState} from 'react';
import {useRegisterContext} from './RegisterContext';

type SignupStep2FormProps = StepProps & {
  resendCode: () => void;
};

const SignupStep2Form = ({onSubmit, resendCode}: SignupStep2FormProps) => {
  const {setRegisterContext} = useRegisterContext();
  const [code, setCode] = useState<any>([null, null, null, null]);
  const codeInputRef = useRef<any>(null);
  const [blockVerify, setBlockVerify] = useState<boolean>(true);

  useEffect(
    () => setBlockVerify(() => code.includes(null) || code.includes('')),
    [code],
  );

  const handleSubmitCheckCode = (e: any) => {
    e.preventDefault();
    onSubmit(code?.join(''));
  };

  const handleCodeInputChange = (e: any, codeIndex: number) => {
    setCode(
      code?.map((codeItem: any, indexCodeItem: number) =>
        indexCodeItem === codeIndex
          ? e.target.value !== ''
            ? Math.max(0, parseInt(e.target.value)).toString().slice(0, 1)
            : null
          : code[indexCodeItem],
      ),
    );

    codeIndex !== 3 &&
      e.target.value !== '' &&
      codeInputRef.current?.children[codeIndex + 1].children[0].select();
  };

  return (
    <div className="py-16 px-6 sm:px-[72px]">
      <h1 className="m-0 text-2xl font-semibold">Please check your email</h1>
      <p className="mb-10 text-graySubtitle ">
        We’ve sent a code to info@socious.io
      </p>
      <form
        onSubmit={handleSubmitCheckCode}
        className="flex grow flex-col justify-between sm:grow-0"
      >
        <div className="flex grow flex-col space-y-4">
          <div
            className="codes mx-auto flex  flex-row justify-center space-x-3 pt-10 pb-5"
            ref={codeInputRef}
          >
            {[0, 1, 2, 3].map((codeIndex) => (
              <TextInput
                key={`opt-code-${codeIndex}`}
                value={code[codeIndex]}
                onChange={(e) => handleCodeInputChange(e, codeIndex)}
                type="number"
                maxLength={1}
                className="h-16 w-16 border-2 border-grayLineBased text-center "
              />
            ))}
          </div>
          {/* {error && (
            <p className="text-error">
              <ExclamationCircleIcon className="inline h-5 w-5" /> {error}
            </p>
          )} */}
          <p className="text-graySubtitle">
            Didn’t received a code?
            <Button variant="link" onClick={() => resendCode()}>
              Click to resend
            </Button>
          </p>
        </div>
        <div className="-mx-14 space-y-4 p-4 pt-12">
          <Button
            className="m-auto mt-4  flex w-full max-w-xs items-center justify-center align-middle"
            type="submit"
            size="lg"
            variant="fill"
            value="Submit"
            disabled={blockVerify}
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
