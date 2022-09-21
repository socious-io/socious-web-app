import React from 'react';
import Title from '../components/Title';
import {StepProps} from '@models/stepProps';
import TextArea from '@components/common/TextArea/TextArea';
import {Button} from '@components/common/Button/Button';
const CreateSuccessfully = ({onSubmit}: StepProps) => {
  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    onSubmit('true');
  };
  return (
    <>
      <form onSubmit={handleOnSubmit} className="flex h-full flex-col">
        <div className="  w-full grow ">
          <div className="mx-auto mt-20 h-56 w-56 rounded-xl bg-clearWhite" />
          <Title
            description="You have successfully created a page for Green Peace!"
            border={false}
            textAlign="text-center"
          >
            Organization created
          </Title>
        </div>
        <footer className="w-full flex-none border-t border-grayLineBased pt-6 pb-28  sm:pb-10 sm:pt-4">
          <Button
            type="submit"
            className="mx-auto flex w-8/12 justify-center py-1.5 font-medium"
          >
            continue
          </Button>
        </footer>
      </form>
    </>
  );
};

export default CreateSuccessfully;
