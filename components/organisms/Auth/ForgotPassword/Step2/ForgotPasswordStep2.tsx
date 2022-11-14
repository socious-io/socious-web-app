import {useState, useRef, useEffect, useCallback} from 'react';
import {Button, TextInput} from '@components/common';

import Timer from '@components/common/Timer/Timer';
import {StepWithResendAndError} from '@models/stepProps';
import {ExclamationCircleIcon} from '@heroicons/react/24/solid';
import CodeFields from '@components/common/CodeFields/CodeFields';

const ForgotPasswordStep2 = ({
  onSubmit,
  onResendCode,
  error,
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
      className="flex grow flex-col justify-between pl-0 pr-10 sm:grow-0 sm:pl-10"
    >
      <div className="flex h-[28rem] flex-col">
        {' '}
        <h1 className="font-helmet">Making sure it’s you</h1>
        <p className="text-base">
          A message with a verification code has been sent to your email. Enter
          the code to continue.
        </p>
        <CodeFields sendCode={handleCodeChange} setBlock={handleBlockVerify} />
        {error && (
          <p className="text-error">
            <ExclamationCircleIcon className="inline h-5 w-5" /> {error}
          </p>
        )}
      </div>

      <div className="-mx-16 divide-x border-t-2 border-b-grayLineBased pl-10 pb-12 sm:h-48 sm:pl-0">
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
      </div>
    </form>
  );
};

export default ForgotPasswordStep2;
