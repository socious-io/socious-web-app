import Image from 'next/image';
import {useState} from 'react';

import sociousLogo from 'asset/icons/logo-color.svg';
import {Button} from '@components/common';
import {Checkbox} from '@components/common';
import {StepProps} from '@models/stepProps';
import {TERM_URL, PRIVACY_URL} from 'utils/api';

const SignupStep4 = ({onSubmit}: StepProps) => {
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
      className="flex grow flex-col justify-between pl-0 pr-10 sm:grow-0 sm:pl-10  "
    >
      <div className="flex h-[28rem] flex-col">
        <Image
          src={sociousLogo}
          width="104.03"
          height="136.59"
          alt="socious logo"
        />

        <h1 className="font-helmet my-6 text-center">Welcome to Socious</h1>
        <div className="my-6 flex items-start justify-start text-base">
          <Checkbox
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            withAlignStart
            label={
              <>
                By signing up, I agree to the
                <Button
                  variant="link"
                  className="px-1"
                  onClick={handleSeeTerms}
                >
                  Terms of Service
                </Button>
                and
                <Button
                  variant="link"
                  className="px-1 pt-0"
                  onClick={handleSeePolicy}
                >
                  Privacy Policy
                </Button>
              </>
            }
          />
        </div>
      </div>
      <div className="-mx-16 divide-x border-t-2 border-b-grayLineBased pl-10 sm:h-48 sm:pl-0 ">
        <Button
          className="m-auto mt-4 mb-12 flex w-full max-w-xs items-center justify-center align-middle sm:mb-auto"
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

export default SignupStep4;
