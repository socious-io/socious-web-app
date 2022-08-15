import {Button, InputFiled} from '@components/common';
import {StepProps} from '@models/stepProps';
import {useFormContext} from 'react-hook-form';
const ForgotPasswordStep1 = ({onSubmit}: StepProps) => {
  const formMethods = useFormContext();
  const {handleSubmit, formState, register} = formMethods;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-between   px-10    "
    >
      <div className="flex flex-col h-[28rem]">
        <h1 className="font-helmet">Forget your password?</h1>
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

      <div className="h-48  border-t-2 border-b-grayLineBased divide-x -mx-16">
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

export default ForgotPasswordStep1;
