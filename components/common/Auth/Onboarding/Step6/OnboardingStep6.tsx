import {Radio, Button} from '@components/common';
import {StepProps} from '@models/stepProps';
import {useFormContext} from 'react-hook-form';
const OnboardingStep6 = ({onSubmit}: StepProps) => {
  const formMethods = useFormContext();
  const {handleSubmit, formState, register} = formMethods;
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-between  px-10    "
    >
      <div className="flex h-[28rem] flex-col">
        {' '}
        <h1 className="font-helmet ">Are you available for projects?</h1>
        <p className="text-base text-graySubtitle">
          Connect with other like-minded individuals and organizations around
          you
        </p>
        <div className="my-6 flex flex-col">
          <Radio
            label="Yes"
            value="true"
            register={register('availableProject')}
            errorMessage={formState?.errors?.['availableProject']?.message}
          />
          <Radio
            label="No"
            value="false"
            register={register('availableProject')}
            errorMessage={formState?.errors?.['availableProject']?.message}
          />
        </div>
      </div>

      <div className="-mx-16  h-48 divide-x border-t-2 border-b-grayLineBased ">
        <Button
          className="m-auto mt-4  flex w-full max-w-xs items-center justify-center align-middle "
          type="submit"
          size="lg"
          variant="fill"
          value="Submit"
        >
          Continue
        </Button>
      </div>
    </form>
  );
};

export default OnboardingStep6;
