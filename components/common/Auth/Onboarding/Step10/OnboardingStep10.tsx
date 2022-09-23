import {Button} from '@components/common';
import {BellIcon} from '@heroicons/react/24/outline';
import {StepProps} from '@models/stepProps';
import Link from 'next/link';
const OnboardingStep10 = ({onSubmit}: StepProps) => {
  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    onSubmit('true');
  };

  return (
    <form
      onSubmit={handleOnSubmit}
      className="flex grow flex-col justify-between px-10 sm:grow-0"
    >
      <div className="flex h-[28rem] flex-col">
        {' '}
        <BellIcon className="mx-auto h-16 w-16 rounded-full border-2 border-white bg-background fill-white " />
        <div className="flex flex-col justify-between      ">
          {' '}
          <h1 className="mx-auto text-white">Allow notifications</h1>
          <p className="mx-auto py-5 text-base text-grayDisableButton">
            Stay up to date with messages, recommendations and posts
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center border-b-grayLineBased pb-12 sm:h-48 ">
        <Button
          className="mt-4 flex   w-full max-w-xs items-center justify-center align-middle "
          type="submit"
          size="lg"
          variant="outline"
          value="Submit"
        >
          Allow notifications
        </Button>
        <Link href={'/app'} passHref>
          <a className="block">
            <Button
              className="flex w-full  max-w-xs items-center justify-center align-middle text-white"
              size="lg"
              variant="link"
            >
              I’ll do it later
            </Button>
          </a>
        </Link>
      </div>
    </form>
  );
};

export default OnboardingStep10;
