import React, {useState, useMemo} from 'react';

//components
import Title from '../components/Title';
import Button from '@components/common/Button/Button';

//icons
import {CheckCircleIcon} from '@heroicons/react/24/outline';

//interfaces
import {StepProps} from '@models/stepProps';

//libraries
import {useFormContext} from 'react-hook-form';

//organization constant data
import Data, {getText} from '@socious/data';
const items = Object.keys(Data.OrganizationType);

const OrganizationType = ({onSubmit}: StepProps) => {
  const formMethods = useFormContext();
  const {setValue,formState: { errors },handleSubmit} = formMethods;

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    onSubmit('true');
  };

  //the English human version data of social causes
  const localItems = useMemo(
    () => {
      const sorted = items.map((id) => ({
        id,
        name: getText('en', `ORGTYPE.${id}`),
      }));
      sorted.sort((a, b) => (a.name > b.name ? 1 : -1));
      return sorted;
    },
    [
      // todo: language
    ],
  );
  
  console.log('localItems', localItems);
  console.log('errorss',errors?.['type'])
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
                  setValue('type', item);
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
            //disabled={!!formState?.errors}
          >
            continue
          </Button>
        </footer>
      </form>
    </>
  );
};

export default OrganizationType;
