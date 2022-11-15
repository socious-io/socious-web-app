import {Button} from '@components/common';
import {useState} from 'react';
import {StepProps} from '@models/stepProps';
const SignupStep4 = ({onSubmit}: StepProps) => {
  const [seeConditions, setSeeConditions] = useState<boolean>(false);
  const handleSeeConditions = () => {
    setSeeConditions(true);
  };

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    onSubmit('true');
  };
  return (
    <form
      onSubmit={handleOnSubmit}
      className="flex flex-col justify-between px-10   "
    >
      <div className="flex h-[28rem] flex-col">
        <h1 className="font-helmet">Review our policy</h1>
        <p className="my-6 flex flex-wrap text-base">
          Some rules are in place to help maintain a friendly and collaborative
          marketplace, please review our
          <Button variant="link" onClick={handleSeeConditions}>
            terms & conditions
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
          disabled={!seeConditions}
        >
          Continue
        </Button>
      </div>
    </form>
  );
};

export default SignupStep4;
