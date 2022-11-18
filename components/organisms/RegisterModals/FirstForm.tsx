import {Button} from '@components/common';
import React from 'react';
import {useRegisterContext} from './RegisterContext';

const FirstForm = () => {
  const {setRegisterContext} = useRegisterContext();

  return (
    <div className="px-10 pt-16 pb-14 sm:px-[104px]">
      <h1 className="mb-2 text-2xl font-semibold">Sign in to Socious</h1>
      <p className="mb-20 text-graySubtitle ">
        To continue, please sign in or register
      </p>
      <div className="flex grow flex-col justify-between sm:grow-0">
        <Button
          className="m-auto mt-4  flex w-full max-w-xs items-center justify-center align-middle"
          type="submit"
          size="lg"
          variant="fill"
          value="Submit"
          onClick={() => setRegisterContext({state: 'SIGNUP', step: 1})}
        >
          Join now
        </Button>
        <Button
          className="m-auto mt-4  flex w-full max-w-xs items-center justify-center align-middle"
          type="submit"
          size="lg"
          variant="outline"
          value="Submit"
          onClick={() => setRegisterContext({state: 'LOGIN', step: 1})}
        >
          Sign in
        </Button>
      </div>
    </div>
  );
};

export default FirstForm;
