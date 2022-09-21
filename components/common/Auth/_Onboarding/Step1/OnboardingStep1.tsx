import {Button} from '@components/common';
import Image from 'next/image';
import {useState} from 'react';
import logoCompony from 'asset/icons/logo-color.svg';
import {StepProps} from '@models/stepProps';
const OnboardingStep1 = ({onSubmit}: StepProps) => {
  const [seePolicy, setSePolicy] = useState<boolean>(false);

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    onSubmit('true');
  };

  const handleSeePolicy = () => {
    setSePolicy(true);
  };
  return (
    <form
      onSubmit={handleOnSubmit}
      className="flex flex-col justify-between  px-10    "
    >
      <div className="flex h-[28rem] flex-col">
        {' '}
        <Image
          src={logoCompony}
          width="104.03"
          height="136.59"
          alt="socious logo"
        />
        <h1 className="font-helmet my-6 text-center ">Welcome to Socious</h1>
        <p className="my-6 text-center text-base text-graySubtitle">
          To continue, please agree to our terms of service and privacy policy
          <Button variant="link" onClick={handleSeePolicy}>
            {' '}
            terms of service and privacy policy{' '}
          </Button>
        </p>
      </div>

      <div className="-mx-16  h-48 divide-x border-t-2 border-b-grayLineBased ">
        <Button
          className="m-auto mt-4  flex w-full max-w-xs items-center justify-center align-middle "
          type="submit"
          size="lg"
          variant="fill"
          value="Submit"
          disabled={!seePolicy}
        >
          I agree
        </Button>
      </div>
    </form>
  );
};

export default OnboardingStep1;
