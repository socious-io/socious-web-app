import React from 'react';
import Title from '../components/Title';
import InputFiled from '@components/common/InputFiled/InputFiled';
import Button from '@components/common/Button/Button';
import {StepProps} from '@models/stepProps';
import FormTitle from '../components/FormTitle';
import TextArea from '@components/common/TextArea/TextArea';

const BasicInfo = ({onSubmit}: StepProps) => {
  
  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    onSubmit('true');
  };
  return (
    <>
      <Title>Organization profile</Title>
      <form onSubmit={handleOnSubmit} className="flex h-full flex-col">
        <div className="h-14  w-full grow overflow-y-scroll px-4  py-2">
          <FormTitle>Basic info</FormTitle>
          <InputFiled
            label="Organization name"
            type="text"
            placeholder="Organization name"
            className="mt-3 mb-8"
            required
          />
          <TextArea
            label="Bio"
            placeholder="Your organization’s bio"
            className="mt-3 mb-8"
            required
            rows={3}
          /> 
          <FormTitle>Contact</FormTitle>
          <InputFiled
            label="Organization email"
            type="text"
            placeholder="Organization email"
            className="mt-3 mb-8"
            required
          />
          <InputFiled
            label="Country"
            type="text"
            placeholder="Country"
            className="mt-3 mb-8"
            required
          />
          <InputFiled
            label="City"
            type="text"
            placeholder="City"
            className="mt-3 mb-8"
            required
          />
          <InputFiled
            label="Address"
            type="text"
            placeholder="Address"
            className="mt-3 mb-8"
            required
          />
          <InputFiled
            label="Website"
            type="text"
            placeholder="Website"
            className="mt-3 mb-8"
            required
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

export default BasicInfo;
