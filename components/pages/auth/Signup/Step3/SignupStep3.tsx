import {useState, useCallback} from 'react';
import {Button} from '@components/common';

import {StepWithResend} from '@models/stepProps';
import {ExclamationCircleIcon} from '@heroicons/react/24/solid';
import Link from 'next/link';
import CodeFields from '@components/common/CodeFields/CodeFields';
import {useFormContext} from 'react-hook-form';

interface SignupStep3Props extends StepWithResend {
  goBack: () => void;
}

const SignupStep3 = ({onSubmit, onResendCode, goBack}: SignupStep3Props) => {
  const [code, setCode] = useState<string | null>(null);
  const {
    formState: {errors},
    watch,
    clearErrors,
  } = useFormContext();

  const email = watch('email');
  const [blockVerify, setBlockVerify] = useState<boolean>(true);

  const handleBlockVerify = useCallback(
    (state: boolean) => setBlockVerify(state),
    [],
  );

  const handleCodeChange = useCallback(
    (newCode: string) => {
      setCode(newCode);
      if (errors?.['code']?.message) clearErrors('code');
    },
    [clearErrors, errors],
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
        <h1 className="font-helmet">Please check your email</h1>
        <p className="text-base">We’ve sent a code to {email}</p>
        <CodeFields sendCode={handleCodeChange} setBlock={handleBlockVerify} />
        {errors && errors['code']?.message && (
          <p className="text-error">
            <>
              <ExclamationCircleIcon className="inline h-5 w-5" />{' '}
              {errors['code']?.message}
            </>
          </p>
        )}
        <p className="text-base text-graySubtitle">
          Didn't receive a code?{' '}
          <span
            className="cursor-pointer px-2 text-primary underline underline-offset-2"
            onClick={onResendCode}
          >
            Click to resend
          </span>
        </p>
      </div>

      <div className="-mx-16 divide-x border-t-2 border-b-grayLineBased pb-12 sm:pb-5">
        <Button
          className="m-auto mt-4  flex w-full max-w-xs items-center justify-center align-middle "
          type="submit"
          size="lg"
          variant="fill"
          value="Submit"
          disabled={blockVerify}
        >
          Verify email
        </Button>
        <Button
          className="m-auto mt-2  flex w-full max-w-xs items-center justify-center align-middle "
          type="submit"
          size="lg"
          variant="outline"
          value="Submit"
          onClick={goBack}
        >
          Back
        </Button>
        <div className="mt-4 block flex justify-center gap-2">
          <span>Already a member?</span>
          <span className="text-primary">
            <Link href="/app/auth/login">Sign in</Link>
          </span>
        </div>
      </div>
    </form>
  );
};

export default SignupStep3;
