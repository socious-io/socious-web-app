import {InputFiled, Button} from '@components/common';
import {useState, useMemo, useCallback} from 'react';
import {EyeIcon, EyeSlashIcon} from '@heroicons/react/24/outline';
import {twMerge} from 'tailwind-merge';
import {rxHasNumber} from 'utils/regex';
import {StepProps} from '@models/stepProps';
import {useFormContext} from 'react-hook-form';
const ForgotPasswordStep3 = ({onSubmit}: StepProps) => {
  const formMethods = useFormContext();
  const {handleSubmit, formState, register, watch} = formMethods;

  const [newPasswordShown, setNewPasswordShown] = useState<boolean>(false);

  const onToggleNewPassword = useCallback(() => {
    setNewPasswordShown((v) => !v);
  }, []);

  const newPassword = watch('newPassword');

  const isValidPasswordLength = useMemo<boolean>(
    () => newPassword && newPassword.length >= 7,
    [newPassword],
  );

  const isValidPasswordHasNumber = useMemo<boolean>(
    () => newPassword && rxHasNumber.test(newPassword),
    [newPassword],
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex grow flex-col justify-between pl-0 pr-10 sm:grow-0 sm:pl-10"
    >
      <div className="flex h-[28rem] flex-col">
        {' '}
        <h1 className="font-helmet">Reset your password </h1>
        <InputFiled
          label="New password"
          type={newPasswordShown ? 'text' : 'password'}
          placeholder="New password"
          register={register('newPassword')}
          errorMessage={formState?.errors?.['newPassword']?.message}
          required
          className="my-6"
          suffixContent={
            newPasswordShown ? (
              <span onClick={onToggleNewPassword}>
                <EyeIcon className="h-5 w-5 cursor-pointer" />
              </span>
            ) : (
              <span onClick={onToggleNewPassword}>
                <EyeSlashIcon className="h-5 w-5 cursor-pointer" />
              </span>
            )
          }
          autoComplete="on"
        />
        <InputFiled
          label="Confirm new password"
          type="password"
          placeholder="Confirm new password"
          register={register('confirmNewPassword')}
          errorMessage={formState?.errors?.['confirmNewPassword']?.message}
          required
          className="my-6"
          autoComplete="on"
        />
        <div className="grid w-full grid-cols-2  gap-3 py-5">
          <div
            className={twMerge(
              'flex flex-col  border-t-4 border-t-success py-3',
              !isValidPasswordLength && 'border-opacity-40',
            )}
          >
            <p className="text-sm">・7 characters </p>
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
      <div className="-mx-16 divide-x border-t-2 border-b-grayLineBased pl-10 pb-12 sm:h-48 sm:pl-0">
        <Button
          className="m-auto mt-4  flex w-full max-w-xs items-center justify-center align-middle "
          type="submit"
          size="lg"
          variant="fill"
          value="Submit"
          //disabled={!!formState?.errors}
        >
          Change your password
        </Button>
      </div>
    </form>
  );
};

export default ForgotPasswordStep3;
