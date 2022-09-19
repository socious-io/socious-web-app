import {InputFiled, Button} from '@components/common';
import {StepProps} from '@models/stepProps';
import {useFormContext} from 'react-hook-form';

const SignupStep2 = ({onSubmit}: StepProps) => {
  const formMethods = useFormContext();

  const {handleSubmit, setError, formState, register} = formMethods;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex grow flex-col justify-between pl-0 pr-10 sm:grow-0 sm:pl-10 "
    >
      <div className="flex h-[28rem] flex-col">
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

export default SignupStep2;
