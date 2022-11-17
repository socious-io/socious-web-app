import {StepProps} from '@models/stepProps';
import {EyeIcon, EyeSlashIcon} from '@heroicons/react/24/outline';
import {Button, InputFiled} from '@components/common';
import {useFormContext} from 'react-hook-form';
import {useRegisterContext} from './RegisterContext';
import {useEffect, useMemo} from 'react';
import {rxHasLowerCase, rxHasNumber, rxHasUpperCase} from 'utils/regex';
import {twMerge} from 'tailwind-merge';
import {useToggle, useUser} from '@hooks';
import Link from 'next/link';

const SignupStep3Form = ({onSubmit}: StepProps) => {
  const {user} = useUser();
  const {
    state: passwordShown,
    handlers: {toggle: onTogglePassword},
  } = useToggle();

  const {formState, register, watch, handleSubmit, setValue} = useFormContext();
  const {setRegisterContext} = useRegisterContext();
  const password = watch('password');

  useEffect(() => {
    if (user) setValue('username', user.username);
  }, [setValue, user]);

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
    <div className="px-6 pt-16 pb-14 sm:px-[72px]">
      <h1 className="m-0 text-2xl font-semibold">Join Socious</h1>
      <p className="mb-10 text-graySubtitle ">Complete your profile</p>
      <form className="flex grow flex-col justify-between sm:grow-0">
        <div className="flex grow flex-col space-y-4">
          <div>
            <p className="m-0 p-0">Your First Name</p>
            <InputFiled
              type="text"
              placeholder="First name"
              register={register('firstName')}
              errorMessage={formState?.errors?.['firstName']?.message}
              required
              className="py-1 pl-0"
              inputType="borderBottom"
            />
          </div>
          <div>
            <p className="m-0 p-0">Your Last Name</p>
            <InputFiled
              type="text"
              placeholder="Last name"
              register={register('lastName')}
              errorMessage={formState?.errors?.['lastName']?.message}
              required
              className="py-1 pl-0"
              inputType="borderBottom"
            />
          </div>
          <div>
            <p className="m-0 p-0">Choose a password</p>
            <InputFiled
              type={passwordShown ? 'text' : 'password'}
              placeholder="Password"
              className="py-2 pl-0"
              register={register('password')}
              errorMessage={formState?.errors?.['password']?.message}
              required
              inputType="borderBottom"
              suffixContent={
                passwordShown ? (
                  <span className="-mt-6 block" onClick={onTogglePassword}>
                    <EyeIcon className="h-5 w-5 cursor-pointer" />
                  </span>
                ) : (
                  <span className="-mt-6 block" onClick={onTogglePassword}>
                    <EyeSlashIcon className="h-5 w-5 cursor-pointer" />
                  </span>
                )
              }
            />
            <div className="grid w-full grid-cols-4  gap-3 py-5 sm:py-3 md:py-5 2xl:py-3">
              <div
                className={twMerge(
                  'flex flex-col  border-t-4 border-t-success py-3',
                  !isValidPasswordLength && 'border-opacity-40',
                )}
              >
                <p className="flex flex-col text-sm">
                  <span>・8</span>
                  <span>characters </span>
                </p>
              </div>
              <div
                className={twMerge(
                  'flex flex-col border-t-4 border-t-success py-3',
                  !isValidPasswordHasNumber && 'border-opacity-40',
                )}
              >
                <p className="flex flex-col text-sm">
                  <span>・1</span>
                  <span>number </span>
                </p>
              </div>
              <div
                className={twMerge(
                  'flex flex-col  border-t-4 border-t-success py-3',
                  !isValidPasswordHasUpCase && 'border-opacity-40',
                )}
              >
                <p className="flex flex-col text-sm">
                  <span>・1</span>
                  <span>uppercase </span>
                </p>
              </div>
              <div
                className={twMerge(
                  'flex flex-col border-t-4 border-t-success py-3',
                  !isValidPasswordHasLowCase && 'border-opacity-40',
                )}
              >
                <p className="flex flex-col text-sm">
                  <span>・1</span>
                  <span>lowercase </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="-mx-14 space-y-4 px-4 pt-14">
          <p className="mx-10 text-center">
            By signing up, you agree to Socious’{' '}
            <Link href="https://socious.io/user-agreement/">
              <a
                target="_blank"
                className="cursor-pointer whitespace-nowrap text-primary"
              >
                Terms of Service
              </a>
            </Link>{' '}
            and{' '}
            <Link href="https://socious.io/privacy-policy/">
              <a
                target="_blank"
                className="cursor-pointer whitespace-nowrap text-primary"
              >
                Privacy Policy
              </a>
            </Link>
          </p>
          <Button
            className="m-auto flex w-full max-w-xs items-center justify-center align-middle"
            type="submit"
            size="lg"
            variant="fill"
            value="Submit"
            onClick={handleSubmit(onSubmit)}
          >
            Join
          </Button>
          <div className="!my-0 flex items-center justify-center py-0 align-middle">
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

export default SignupStep3Form;
