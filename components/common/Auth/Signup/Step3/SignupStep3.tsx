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
      className="flex flex-col justify-between pl-0 sm:pl-10 pr-10 grow sm:grow-0  "
    >
      <div className="flex flex-col h-[28rem]">
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
                <EyeIcon className="w-5 h-5 cursor-pointer" />
              </span>
            ) : (
              <span onClick={onTogglePassword}>
                <EyeSlashIcon className="w-5 h-5 cursor-pointer" />
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
        <div className="grid grid-cols-2 gap-3  py-5 w-full">
          <div
            className={twMerge(
              'flex flex-col  border-t-4 py-3 border-t-success',
              !isValidPasswordLength && 'border-opacity-40',
            )}
          >
            <p className="text-sm">・8 characters </p>
          </div>
          <div
            className={twMerge(
              'flex flex-col border-t-4 py-3 border-t-success',
              !isValidPasswordHasNumber && 'border-opacity-40',
            )}
          >
            <p className="text-sm">・1 number </p>
          </div>
        </div>
      </div>
      <div className="sm:h-48 pl-10 sm:pl-0 border-t-2 border-b-grayLineBased divide-x -mx-16 ">
        <Button
          className="max-w-xs w-full  m-auto flex items-center justify-center align-middle mt-4  mb-12 sm:mb-auto"
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
