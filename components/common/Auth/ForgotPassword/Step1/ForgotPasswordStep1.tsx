import {Button, InputFiled} from '@components/common';
import {StepWithError} from '@models/stepProps';
import {useFormContext} from 'react-hook-form';
import { useEffect, memo, useState } from 'react';

const ForgotPasswordStep1 = ({onSubmit, error}: StepWithError) => {
  const formMethods = useFormContext();
  const {handleSubmit,setError, formState, register} = formMethods;

  useEffect(() => {
    setError("email", { type: "userExists", message: error})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-between pl-0 sm:pl-10 pr-10 grow sm:grow-0"
    >
      <div className="flex flex-col h-[28rem]">
        <h1 className="font-helmet">Forget your password?</h1>
        <InputFiled
          label="Email"
          type="email"
          placeholder="Email"
          register={register('email')}
          // errorMessage={errorMessage}
          errorMessage={formState?.errors?.['email']?.message}
          required
          className="my-6"
        />
      </div>

      <div className="sm:h-48 pl-10 sm:pl-0 border-t-2 border-b-grayLineBased divide-x -mx-16 pb-12">
        <Button
          className="max-w-xs w-full  m-auto flex items-center justify-center align-middle mt-4 "
          type="submit"
          size="lg"
          variant="fill"
          value="Submit"
          //disabled={!!formState?.errors}
        >
          Get a verification code
        </Button>
      </div>
    </form>
  );
};

export default memo(ForgotPasswordStep1);
