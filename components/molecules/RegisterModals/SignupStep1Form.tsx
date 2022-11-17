import {Button, InputFiled} from '@components/common';
import {StepProps} from '@models/stepProps';
import React from 'react';
import {useFormContext} from 'react-hook-form';
import {useRegisterContext} from './RegisterContext';

const SignupStep1Form = ({onSubmit}: StepProps) => {
  const {formState, register, handleSubmit} = useFormContext();
  const {setRegisterContext} = useRegisterContext();

  return (
    <div className="py-16 px-6 sm:px-[72px]">
      <h1 className="mb-2 text-2xl font-semibold">Join Socious</h1>
      <p className="mb-10 text-graySubtitle ">Create an account and start</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex grow flex-col justify-between sm:grow-0"
      >
        <div className="flex grow flex-col space-y-4">
          <p>Enter your email address</p>
          <InputFiled
            type="email"
            placeholder="Email"
            register={register('email')}
            errorMessage={formState?.errors?.['email']?.message}
            inputType="borderBottom"
            className="py-2 pl-0"
          />
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

export default SignupStep1Form;
