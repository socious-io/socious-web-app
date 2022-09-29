import {Radio, Button} from '@components/common';
import {StepProps} from '@models/stepProps';
import {useFormContext} from 'react-hook-form';

const OnboardingStep5 = ({onSubmit}: StepProps) => {
  const formMethods = useFormContext();
  const {handleSubmit, formState, register} = formMethods;
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex grow flex-col justify-between pl-0 pr-10 sm:pl-10"
    >
      <div className="flex grow flex-col">
        {' '}
        <h1 className="font-helmet">Are you available for projects?</h1>
        <p className="text-base text-graySubtitle">
          Connect with other like-minded individuals and organizations around
          you
        </p>
        <div className="my-10 flex flex-col space-y-5">
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

      <div className="-mx-16 divide-x border-t-2 border-b-grayLineBased pl-10 sm:pl-0">
        <Button
          className="m-auto mt-4 mb-12 flex w-full max-w-xs items-center justify-center align-middle "
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

export default OnboardingStep5;
