import {TextArea, Button} from '@components/common';
import {StepProps} from '@models/stepProps';
import {useFormContext} from 'react-hook-form';
const OnboardingStep7 = ({onSubmit}: StepProps) => {
  const formMethods = useFormContext();
  const {handleSubmit, formState, register, watch} = formMethods;

  const bio = watch('bio');
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex grow flex-col justify-between pl-0 pr-10 sm:pl-10"
    >
      <div className="flex grow flex-col">
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

export default OnboardingStep7;
