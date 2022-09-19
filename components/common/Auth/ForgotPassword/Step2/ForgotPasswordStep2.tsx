import {useState, useRef, useEffect} from 'react';
import {Button, TextInput} from '@components/common';

import Timer from '@components/common/Timer/Timer';
import {StepWithResendAndError} from '@models/stepProps';
import {ExclamationCircleIcon} from '@heroicons/react/24/solid';

const ForgotPasswordStep2 = ({
  onSubmit,
  onResendCode,
  error,
}: StepWithResendAndError) => {
  const [code, setCode] = useState<any>([null, null, null, null]);

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
      codeInputRef.current.children[codeIndex + 1].children[0].select();
  };

  const codeInputRef: any = useRef(null);
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
