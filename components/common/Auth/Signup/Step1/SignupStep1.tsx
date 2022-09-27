import {InputFiled, Button} from '@components/common';
import {StepProps} from '@models/stepProps';
import {useFormContext} from 'react-hook-form';

const SignupStep1 = ({onSubmit}: StepProps) => {
  const formMethods = useFormContext();
  const {handleSubmit, formState, register} = formMethods;
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex grow flex-col justify-between pl-0 pr-10 sm:grow-0 sm:pl-10"
    >
      <div className="flex h-[28rem] flex-col">
        <h1 className="font-helmet ">What should we call you?</h1>
        <InputFiled
          label="First name"
          type="text"
          placeholder="First name"
          register={register('firstName')}
          errorMessage={formState?.errors?.['firstName']?.message}
          required
          className="my-6"
          inputType="borderBottom"
        />

        <InputFiled
          label="Last name"
          type="text"
          placeholder="Last name"
          register={register('lastName')}
          errorMessage={formState?.errors?.['lastName']?.message}
          required
          className="my-6"
          inputType="borderBottom"
        />
      </div>
      <div className="-mx-16 divide-x border-t-2 border-b-grayLineBased pl-10 sm:h-48 sm:pl-0 ">
        <Button
          className="m-auto mt-4 mb-12 flex w-full max-w-xs items-center justify-center  align-middle sm:mb-auto"
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
