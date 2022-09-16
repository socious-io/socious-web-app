import {InputFiled, Button} from '@components/common';
import {StepProps} from '@models/stepProps';
import {useFormContext} from 'react-hook-form';

const SignupStep2 = ({onSubmit}: StepProps) => {
  const formMethods = useFormContext();

  const {handleSubmit, setError, formState, register} = formMethods;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-between pl-0 sm:pl-10 pr-10 grow sm:grow-0 "
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
      <div className="sm:h-48 pl-10 sm:pl-0 border-t-2 border-b-grayLineBased divide-x -mx-16 ">
        <Button
          className="max-w-xs w-full m-auto flex items-center justify-center align-middle mt-4  mb-12 sm:mb-auto"
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
