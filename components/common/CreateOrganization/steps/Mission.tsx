import React from 'react';

//components
import Title from '../components/Title';
import TextArea from '@components/common/TextArea/TextArea';
import {Button} from '@components/common/Button/Button';

//libraries
import {useFormContext} from 'react-hook-form';

//interfaces
import {StepProps} from '@models/stepProps';

const Mission = ({onSubmit}: StepProps) => {
  const formMethods = useFormContext();
  const {register} = formMethods;

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    onSubmit('true');
  };

  return (
    <>
      <Title border={false}>What’s your organization’s mission?</Title>
      <form onSubmit={handleOnSubmit} className="flex h-full flex-col">
        <div className="h-14 w-full grow overflow-y-scroll px-4 py-2">
          <TextArea
            placeholder="Your organization’s mission"
            className="my-3"
            rows={4}
            register={register('mission')}
          />
        </div>
        <footer className="w-full flex-none border-t border-grayLineBased pt-6 pb-28 sm:pb-10 sm:pt-4">
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

export default Mission;
