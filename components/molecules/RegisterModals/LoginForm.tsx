import {EyeIcon, EyeSlashIcon} from '@heroicons/react/24/outline';
import Link from 'next/link';
import {Button, InputFiled} from '@components/common';
import {useToggle} from '@hooks';
import {useRegisterContext} from './RegisterContext';
import {useFormContext} from 'react-hook-form';
import {StepProps} from '@models/stepProps';

const LoginForm = ({onSubmit}: StepProps) => {
  const {
    state: passwordShown,
    handlers: {toggle: onTogglePassword},
  } = useToggle();

  const {setRegisterContext} = useRegisterContext();

  const {formState, register, handleSubmit} = useFormContext();
  return (
    <div className="py-16 px-6 sm:px-[72px]">
      <h1 className="mb-10 text-2xl font-semibold">Sign in to Socious</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex grow flex-col justify-between sm:grow-0"
      >
        <div className="flex grow flex-col space-y-4">
          <InputFiled
            label="Email"
            type="email"
            placeholder="Email"
            register={register('email')}
            errorMessage={formState?.errors?.['email']?.message}
            inputType="borderBottom"
            className="py-2 pl-0"
          />
          <InputFiled
            label="Password"
            type={passwordShown ? 'text' : 'password'}
            placeholder="Password"
            register={register('password')}
            errorMessage={formState?.errors?.['password']?.message}
            inputType="borderBottom"
            className="py-2 pl-0"
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
          <div>
            <Link passHref href="/app/auth/forgotpassword">
              <Button className="float-right m-0 p-0" size="lg" variant="link">
                Forgot your password?
              </Button>
            </Link>
          </div>
        </div>
        <div className="-mx-14 space-y-4 p-4 pt-12">
          <Button
            className="m-auto mt-4  flex w-full max-w-xs items-center justify-center align-middle"
            type="submit"
            size="lg"
            variant="fill"
            value="Submit"
          >
            Continue
          </Button>
          <div className="flex items-center justify-center align-middle">
            Not a member?
            <Button
              size="md"
              variant="link"
              onClick={() => setRegisterContext({state: 'SIGNUP', step: 1})}
            >
              Sign up
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
