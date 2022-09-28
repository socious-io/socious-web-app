import {Button} from '@components/common';
import {StepProps} from '@models/stepProps';
const OnboardingStep2 = ({onSubmit}: StepProps) => {
  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    onSubmit('true');
  };

  return (
    <form
      onSubmit={handleOnSubmit}
      className="ml-10 flex grow flex-col justify-between pl-0 pr-10 sm:ml-0 sm:pl-10"
    >
      <div className="flex grow flex-col items-center justify-center">
        {' '}
        <h1 className="font-helmet text-center">Congratulations</h1>
        <p className="py-2 text-center text-base text-graySubtitle ">
          You’ve successfully created an account
        </p>
      </div>

      <div className="-mx-16 divide-x border-t-2 border-b-grayLineBased">
        <Button
          className="m-auto mt-4 mb-12 flex w-full max-w-xs items-center justify-center align-middle "
          type="submit"
          size="lg"
          variant="fill"
          value="Submit"
        >
          Complete your profile
        </Button>
      </div>
    </form>
  );
};

export default OnboardingStep2;
