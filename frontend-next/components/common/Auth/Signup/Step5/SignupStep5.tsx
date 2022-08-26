import Image from 'next/image';
import {useState} from 'react';

import sociousLogo from 'asset/icons/logo-color.svg';
import {Button} from '@components/common';
import {Checkbox} from '@components/common';
import {StepProps} from '@models/stepProps';
import {TERM_URL, PRIVACY_URL} from 'utils/api';

const SignupStep5 = ({ onSubmit }: StepProps) => {
  const [agreed, setAgreed] = useState<boolean>(false);

  const handleSeeTerms = () => {
    // TODO detect current language
    window.open(TERM_URL('en_US'));
  };

  const handleSeePolicy = () => {
    // TODO detect current language
    window.open(PRIVACY_URL('en_US'));
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
      <div className="flex flex-col h-[28rem]">
        <Image
          src={sociousLogo}
          width="104.03"
          height="136.59"
          alt="socious logo"
        />

        <h1 className="font-helmet text-center my-6">Welcome to Socious</h1>
        <div className="text-base flex items-start justify-start my-6">
          <Checkbox
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            withAlignStart
            label={
              <>
                By signing up, I agree to the
                <Button variant="link" className="px-1" onClick={handleSeeTerms}>
                  Terms of Service
                </Button>
                and
                <Button variant="link" className="px-1 pt-0" onClick={handleSeePolicy}>
                  Privacy Policy
                </Button>
              </>
            }
          />
        </div>
      </div>
      <div className="h-48  border-t-2 border-b-grayLineBased divide-x -mx-16 ">
        <Button
          className="max-w-xs w-full  m-auto flex items-center justify-center align-middle mt-4 "
          type="submit"
          size="lg"
          variant="fill"
          value="Submit"
          disabled={!agreed}
        >
          Continue
        </Button>
      </div>
    </form>
  );
};

export default SignupStep5;
