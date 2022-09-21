
import React from 'react';
import Title from '../components/Title';
import {StepProps} from '@models/stepProps';;
import TextArea from '@components/common/TextArea/TextArea';
import { Button } from '@components/common/Button/Button';
const Culture = ({onSubmit}: StepProps) => {
  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    onSubmit('true');
  };
  return (
    <>
      <Title border={false}>Tell us about your organization’s culture.</Title>
      <form onSubmit={handleOnSubmit} className="flex h-full flex-col">
        <div className="h-14  w-full grow overflow-y-scroll px-4  py-2">
          
          <TextArea
            
            placeholder="Your organization’s culture"
            className="my-3"
           
            rows={3}
          />
        
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

export default Culture;