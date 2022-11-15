import {useState, useRef, useEffect, useCallback} from 'react';
import {Button, TextInput} from '@components/common';

import Timer from '@components/common/Timer/Timer';
import {StepWithResendAndError} from '@models/stepProps';
import {ExclamationCircleIcon} from '@heroicons/react/24/solid';
import Link from 'next/link';
import CodeFields from '@components/common/CodeFields/CodeFields';

const ForgotPasswordStep2 = ({
  onSubmit,
  onResendCode,
  error,
  email,
}: StepWithResendAndError) => {
  const [code, setCode] = useState<string | null>(null);

  const [blockVerify, setBlockVerify] = useState<boolean>(true);

  const handleBlockVerify = useCallback(
    (state: boolean) => setBlockVerify(state),
    [],
  );

  const handleCodeChange = useCallback(
    (newCode: string) => setCode(newCode),
    [],
  );

  const handleSubmitCheckCode = (e: any) => {
    e.preventDefault();
    onSubmit(code);
  };

  return (
    <form
      onSubmit={handleSubmitCheckCode}
      className="flex grow flex-col justify-between pl-0 sm:pr-10 sm:pl-10"
    >
      <div className="flex max-h-[28rem] grow flex-col">
        {email ? (
          <>
            <h1 className="font-helmet">Please check your email</h1>
            <p className="text-base">We’ve sent a code to {email}</p>
          </>
        ) : (
          <>
            <h1 className="font-helmet">Making sure it’s you</h1>
            <p className="text-base">
              A message with a verification code has been sent to your email.
              Enter the code to continue.
            </p>
          </>
        )}
        <CodeFields sendCode={handleCodeChange} setBlock={handleBlockVerify} />
        {error && (
          <p className="text-error">
            <ExclamationCircleIcon className="inline h-5 w-5" /> {error}
          </p>
        )}
        {email && (
          <p className="text-base text-graySubtitle">
            Didn’t received a code?{' '}
            <span
              className="cursor-pointer px-2 text-primary underline underline-offset-2"
              onClick={onResendCode}
            >
              Click to resend
            </span>
          </p>
        )}
      </div>

      <div className="-mx-16 divide-x border-t-2 border-b-grayLineBased pb-12 sm:pb-5">
        {email ? (
          <>
            <Button
              className="m-auto mt-4  flex w-full max-w-xs items-center justify-center align-middle "
              type="submit"
              size="lg"
              variant="fill"
              value="Submit"
              disabled={blockVerify}
              //disabled={!!formState[step]?.errors}
            >
              Verify email
            </Button>
            <Button
              className="m-auto mt-2  flex w-full max-w-xs items-center justify-center align-middle "
              type="submit"
              size="lg"
              variant="outline"
              value="Submit"
            >
              Back
            </Button>
            <div className="mt-4 block flex justify-center gap-2">
              <span>Already a member?</span>
              <span className="text-primary">
                <Link href="/app/auth/login">Sign in</Link>
              </span>
            </div>
          </>
        ) : (
          <>
            <Button
              className="m-auto mt-4  flex w-full max-w-xs items-center justify-center align-middle "
              type="submit"
              size="lg"
              variant="fill"
              value="Submit"
              disabled={blockVerify}
              //disabled={!!formState[step]?.errors}
            >
              Verify
            </Button>
            <div className="flex items-center justify-center align-middle">
              <Timer>
                {(onClickReset: any, disabled: any) => (
                  <div className="info flex">
                    <Button
                      variant="link"
                      size="lg"
                      onClick={() => onResendCode(onClickReset)}
                      disabled={disabled}
                    >
                      Resend the verification code
                    </Button>
                  </div>
                )}
              </Timer>
            </div>
          </>
        )}
      </div>
    </form>
  );
};

export default ForgotPasswordStep2;
