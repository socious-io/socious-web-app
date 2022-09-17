import {InputFiled, Button} from '@components/common';
import {useState, useMemo, useCallback} from 'react';
import {rxHasNumber} from 'utils/regex';
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
    () => password && password.length >= 7,
    [password],
  );

  const isValidPasswordHasNumber = useMemo<boolean>(
    () => password && rxHasNumber.test(password),
    [password],
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex grow flex-col justify-between pl-0 pr-10 sm:grow-0 sm:pl-10  "
    >
      <div className="flex h-[28rem] flex-col">
        <h1 className="font-helmet">Set your password</h1>
        <InputFiled
          label="Password"
          type={passwordShown ? 'text' : 'password'}
          placeholder="Password"
          register={register('password')}
          errorMessage={formState?.errors?.['password']?.message}
          required
          className="my-6"
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
          className="my-6"
          register={register('confirmPassword')}
          errorMessage={formState?.errors?.['confirmPassword']?.message}
          required
        />
        <div className="grid w-full grid-cols-2  gap-3 py-5">
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
        </div>
      </div>
      <div className="-mx-16 divide-x border-t-2 border-b-grayLineBased pl-10 sm:h-48 sm:pl-0 ">
        <Button
          className="m-auto mt-4  mb-12 flex w-full max-w-xs items-center justify-center  align-middle sm:mb-auto"
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
