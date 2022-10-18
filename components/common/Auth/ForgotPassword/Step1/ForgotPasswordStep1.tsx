import {Button, InputFiled} from '@components/common';
import {StepWithError} from '@models/stepProps';
import {useFormContext} from 'react-hook-form';
import {useEffect, memo, useState} from 'react';

const ForgotPasswordStep1 = ({onSubmit, error}: StepWithError) => {
  const formMethods = useFormContext();
  const {handleSubmit, setError, formState, register} = formMethods;

  useEffect(() => {
    setError('email', {type: 'userExists', message: error});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex grow flex-col justify-between pl-0 pr-10 sm:grow-0 sm:pl-10"
    >
      <div className="flex h-[28rem] flex-col">
        <h1 className="font-helmet">Forget your password?</h1>
        <InputFiled
          label="Email"
          type="email"
          placeholder="Email"
          register={register('email')}
          errorMessage={formState?.errors?.['email']?.message}
          required
          className="my-6"
          inputType="borderBottom"
        />
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
          Get a verification code
        </Button>
      </div>
    </form>
  );
};

export default memo(ForgotPasswordStep1);
