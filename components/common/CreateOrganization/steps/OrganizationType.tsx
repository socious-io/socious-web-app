import React from 'react';
import Title from '../components/Title';
import {CheckCircleIcon} from '@heroicons/react/24/outline';
import Data, {getText} from '@socious/data';
import Button from '@components/common/Button/Button';
import {StepProps} from '@models/stepProps';
const items = Object.keys(Data.OrganizationType);
const OrganizationType = ({onSubmit}: StepProps) => {

  const handleOnSubmit = (e: any) => {
    
    e.preventDefault();
    onSubmit('true');
  };
  return (
    <>
      <Title>What type of organization?</Title>
      <form className="h-full overflow-y-scroll">
        <div className="px-4 py-2">
          {items.map((item) => {
            return (
              <button className="flex w-full items-center justify-between px-4 transition-all duration-300 focus:bg-secondary focus:pl-5 focus:text-white focus:rounded-2xl">
                <p className="lowercase py-2 w-fit text-left text-lg sm:text-base">{item}</p>
                <CheckCircleIcon className="h-6 w-6 ml-2 text-white stroke-1.5 " />
              </button>
            );
          })}
        </div>
      </form>
      <footer className="flex pt-6 pb-28 sm:pb-10 sm:pt-4 justify-center border-grayLineBased border-t">
          <Button
            type="submit"
            className="w-8/12 flex justify-center py-1.5 font-medium"
          >
            continue
          </Button>
        </footer>
    </>
  );
};

export default OrganizationType;
