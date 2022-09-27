import {InputFiled, Button} from '@components/common';
import {useState, useMemo, useCallback} from 'react';
import {rxHasLowerCase, rxHasNumber, rxHasUpperCase} from 'utils/regex';
import {EyeIcon, EyeSlashIcon} from '@heroicons/react/24/outline';
import {twMerge} from 'tailwind-merge';
import {StepProps} from '@models/stepProps';
import {useFormContext} from 'react-hook-form';

const SignupStep3 = ({onSubmit}: StepProps) => {
  const formMethods = useFormContext();
  const {handleSubmit, formState, register, watch} = formMethods;
  const [passwordShown, setPasswordShown] = useState<boolean>(false);

  const onTogglePassword = useCallback(() => {
    setPasswordShown((v) => !v);
  }, []);

  const password = watch('password');

  const isValidPasswordLength = useMemo<boolean>(
    () => password && password.length >= 8,
    [password],
  );

  const isValidPasswordHasNumber = useMemo<boolean>(
    () => password && rxHasNumber.test(password),
    [password],
  );
  const isValidPasswordHasUpCase = useMemo<boolean>(
    () => password && rxHasUpperCase.test(password),
    [password],
  );
  const isValidPasswordHasLowCase = useMemo<boolean>(
    () => password && rxHasLowerCase.test(password),
    [password],
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex grow flex-col justify-between pl-0 pr-10 sm:pl-10  "
    >
      <div className="sm:min-h[28rem] flex grow flex-col">
        <h1 className="font-helmet">Set your password</h1>
        <InputFiled
          label="Password"
          type={passwordShown ? 'text' : 'password'}
          placeholder="Password"
          register={register('password')}
          errorMessage={formState?.errors?.['password']?.message}
          required
          inputType="borderBottom"
          className="my-4 sm:my-3 md:my-6 2xl:my-4"
          suffixContent={
            passwordShown ? (
              <span onClick={onTogglePassword}>
                <EyeIcon className="h-5 w-5 cursor-pointer" />
              </span>
            ) : (
              <span onClick={onTogglePassword}>
                <EyeSlashIcon className="h-5 w-5 cursor-pointer" />
              </span>
            )
          }
        />
        <InputFiled
          label="Confirm password"
          type="password"
          placeholder="Confirm password"
          className="my-4 sm:my-3 md:my-6 2xl:my-4"
          register={register('confirmPassword')}
          errorMessage={formState?.errors?.['confirmPassword']?.message}
          required
          inputType="borderBottom"
        />
        <div className="grid w-full grid-cols-4  gap-3 py-5 sm:py-3 md:py-5 2xl:py-3">
          <div
            className={twMerge(
              'flex flex-col  border-t-4 border-t-success py-3',
              !isValidPasswordLength && 'border-opacity-40',
            )}
          >
            <p className="text-sm">・8 characters </p>
          </div>
          <div
            className={twMerge(
              'flex flex-col border-t-4 border-t-success py-3',
              !isValidPasswordHasNumber && 'border-opacity-40',
            )}
          >
            <p className="text-sm">・1 number </p>
          </div>
          <div
            className={twMerge(
              'flex flex-col  border-t-4 border-t-success py-3',
              !isValidPasswordHasUpCase && 'border-opacity-40',
            )}
          >
            <p className="text-sm">・1 uppercase </p>
          </div>
          <div
            className={twMerge(
              'flex flex-col border-t-4 border-t-success py-3',
              !isValidPasswordHasLowCase && 'border-opacity-40',
            )}
          >
            <p className="text-sm">・1 lowercase </p>
          </div>
        </div>
      </div>
      <div className="sm:min-h-48 -mx-16 divide-x border-t-2 border-b-grayLineBased pl-10 pb-12 sm:pl-0">
        <Button
          className="m-auto mt-4 flex w-full max-w-xs items-center justify-center  align-middle sm:mb-auto"
          type="submit"
          size="lg"
          variant="fill"
          value="Submit"
        >
          Continue
        </Button>
      </div>
    </form>
  );
};

export default SignupStep3;
