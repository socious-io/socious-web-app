import {Radio, Button} from '@components/common';
import {StepProps} from '@models/stepProps';
import {useFormContext} from 'react-hook-form';
const OnboardingStep6 = ({onSubmit}: StepProps) => {
  const formMethods = useFormContext();
  const {handleSubmit, formState, register} = formMethods;
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-between  px-10 grow sm:grow-0"
    >
      <div className="flex flex-col h-[28rem]">
        {' '}
        <h1 className="font-helmet ">Are you available for projects?</h1>
        <p className="text-base text-graySubtitle">
          Connect with other like-minded individuals and organizations around
          you
        </p>
        <div className="flex flex-col my-6">
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

      <div className="sm:h-48  border-t-2 border-b-grayLineBased divide-x -mx-16 ">
        <Button
          className="max-w-xs w-full  m-auto flex items-center justify-center align-middle mt-4 "
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
