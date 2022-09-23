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
  const {setValue, watch} = formMethods;
  const type_organization = watch('type');

  //list of organization type
  const localItems = useMemo(
    () => {
      const sorted = items.map((id) => ({
        id,
        name: getText('en', `ORGTYPE.${id}`),
      }));
      return sorted;
    },
    [
      // todo: language
    ],
  );

  return (
    <>
      <Title>What type of organization?</Title>
      <form onSubmit={onSubmit} className="flex h-full flex-col">
        <div className="h-14 w-full grow overflow-y-scroll px-4 py-2">
          {localItems.map((item) => {
            return (
              <button
                key={item.id}
                name="type"
                onClick={(e) => {
                  e.preventDefault();
                  setValue('type', item.id);
                }}
                className="flex w-full items-center justify-between px-4 transition-all duration-300 focus:rounded-2xl focus:bg-secondary focus:pl-5 focus:text-white"
              >
                <p className="w-fit py-2 text-left text-lg lowercase sm:text-base">
                  {item.name}
                </p>
                <CheckCircleIcon className="ml-2 h-6 w-6 stroke-1.5 text-white" />
              </button>
            );
          })}
        </div>
        <footer className="w-full flex-none border-t border-grayLineBased pt-6 pb-28 sm:pb-10 sm:pt-4">
          <Button
            type="submit"
            value="submit"
            className="mx-auto flex w-8/12 justify-center py-1.5 font-medium"
            disabled={!type_organization}
          >
            continue
          </Button>
        </footer>
      </form>
    </>
  );
};

export default OrganizationType;
