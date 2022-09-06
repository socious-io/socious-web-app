import {InputFiled, Button} from '@components/common';
import {StepProps} from '@models/stepProps';
import {useFormContext} from 'react-hook-form';
import {useEffect, useState} from "react";
import { errors } from 'ethers';

interface CustomErrorStepProps extends StepProps {
  error: string,
}

const SignupStep2 = ({onSubmit, error}: CustomErrorStepProps) => {
  const formMethods = useFormContext();

  const {handleSubmit,setError, formState, register} = formMethods;
  
  useEffect(() => {
    setError("email", { type: "userExists", message: error})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-between px-10   "
    >
      <div className="flex flex-col h-[28rem]">
        <h1 className="font-helmet">How do we contact you?</h1>
        <InputFiled
          label="Email"
          type="email"
          placeholder="Email"
          register={register('email')}
          errorMessage={formState?.errors?.['email']?.message}
          required
          className="my-6"
        />
      </div>
      <div className="h-48  border-t-2 border-b-grayLineBased divide-x -mx-16 ">
        <Button
          className="max-w-xs w-full  m-auto flex items-center justify-center align-middle mt-4 "
          type="submit"
          size="lg"
          variant="fill"
          value="Submit"
          //disabled={!!formState?.errors}
        >
          Continue
        </Button>
      </div>
    </form>
  );
};

export default SignupStep2;
