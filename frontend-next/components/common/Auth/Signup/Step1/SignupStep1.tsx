import {InputFiled, Button} from '@components/common';
import {StepProps} from '@models/stepProps';
import {useFormContext} from 'react-hook-form';

const SignupStep1 = ({onSubmit}: StepProps) => {
  const formMethods = useFormContext();
  const {handleSubmit, formState, register} = formMethods;
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-between px-10 grow sm:grow-0  "
    >
      <div className="flex flex-col h-[28rem]">
        <h1 className="font-helmet ">What should we call you?</h1>
        <InputFiled
          label="First name"
          type="text"
          placeholder="First name"
          register={register('firstName')}
          errorMessage={formState?.errors?.['firstName']?.message}
          required
          className="my-6"
        />

        <InputFiled
          label="Last name"
          type="text"
          placeholder="Last name"
          register={register('lastName')}
          errorMessage={formState?.errors?.['lastName']?.message}
          required
          className="my-6"
        />
      </div>
      <div className="sm:h-48 border-t-2 border-b-grayLineBased divide-x -mx-16 ">
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

export default SignupStep1;
