import {TextArea, Button} from '@components/common';
import {StepProps} from '@models/stepProps';
import {useFormContext} from 'react-hook-form';
const OnboardingStep8 = ({onSubmit}: StepProps) => {
  const formMethods = useFormContext();
  const {handleSubmit, formState, register, watch} = formMethods;

  const bio = watch('bio');
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-between  px-10    "
    >
      <div className="flex flex-col h-[28rem]">
        {' '}
        <h1 className="font-helmet ">Tell us about who you are</h1>
        <p className="text-base text-graySubtitle">
          Highlight who you are in 160 characters or less
        </p>
        <div>
          <TextArea
            placeholder="Write bio"
            register={register('bio')}
            errorMessage={formState?.errors?.['bio']?.message}
            containerClassName="basis-4/5 mt-5"
            className="border-2 border-grayLineBased "
            rows={10}
          />
          <span className="text-sm text-graySubtitle">
            {' '}
            {`${bio?.length || 0} /160`}
          </span>
        </div>
      </div>

      <div className="h-48  border-t-2 border-b-grayLineBased divide-x -mx-16 ">
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

export default OnboardingStep8;
