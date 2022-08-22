import Image from 'next/image';
import {useState} from 'react';

import sociousLogo from 'asset/icons/logo-color.svg';
import {Button} from '@components/common';
import {Checkbox} from '@components/common';
import {StepProps} from '@models/stepProps';
import {TERM_URL, PRIVACY_URL} from 'utils/api';

const SignupStep5 = ({ onSubmit }: StepProps) => {
  const [sawPolicy, setSawPolicy] = useState<boolean>(false);
  const [sawTerms, setSawTerms] = useState<boolean>(false);

  const handleSeeTerms = () => {
    // TODO detect current language
    window.open(TERM_URL('en_US'));
    setSawTerms(true);
  };
  const handleSeePolicy = () => {
    // TODO detect current language
    window.open(PRIVACY_URL('en_US'));
    setSawPolicy(true);
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
        <p className="text-base text-center my-6">
          To continue, please agree to our
        </p>
        <div className="mx-auto">
          <Checkbox
            checked={!!sawTerms}
            label={
                    <Button variant="link" onClick={handleSeeTerms}>
                      terms of service
                    </Button>
                  }
            onChange={(e) => setSawTerms(e.target.checked)}
          />
          <Checkbox
            checked={!!sawPolicy}
            label={
                    <Button variant="link" onClick={handleSeePolicy}>
                      privacy policy
                    </Button>
                  }
            onChange={(e) => setSawPolicy(e.target.checked)}
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
          disabled={!(sawPolicy && sawTerms)}
        >
          Continue
        </Button>
      </div>
    </form>
  );
};

export default SignupStep5;
