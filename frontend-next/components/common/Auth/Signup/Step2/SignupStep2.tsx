import {InputFiled, Button} from '@components/common';
import {StepProps} from '@models/stepProps';
import {useFormContext} from 'react-hook-form';

interface CustomErrorStepProps extends StepProps {
  error: null | string,
}

const SignupStep2 = ({onSubmit, error}: CustomErrorStepProps) => {
  const formMethods = useFormContext();
  const {handleSubmit, formState, register} = formMethods;
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
        {error && <span className='text-red-500 font-mono'>{error}</span>}
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
