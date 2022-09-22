import React from 'react';

//components
import Title from '../components/Title';
import Button from '@components/common/Button/Button';

//icons
import {CheckCircleIcon} from '@heroicons/react/24/outline';

//interfaces
import Data from '@socious/data';

//organization constant data
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
      <form onSubmit={handleOnSubmit} className="flex h-full flex-col">
        <div className="h-14 w-full grow overflow-y-scroll px-4 py-2">
          {items.map((item) => {
            return (
              <button
                key={item}
                onClick={(e) => {
                  e.preventDefault();
                }}
                className="flex w-full items-center justify-between px-4 transition-all duration-300 focus:rounded-2xl focus:bg-secondary focus:pl-5 focus:text-white"
              >
                <p className="w-fit py-2 text-left text-lg lowercase sm:text-base">
                  {item}
                </p>
                <CheckCircleIcon className="ml-2 h-6 w-6 stroke-1.5 text-white" />
              </button>
            );
          })}
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

export default OrganizationType;
