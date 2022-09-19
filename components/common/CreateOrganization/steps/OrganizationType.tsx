import React from 'react';
import {ORGANIZATION_TYPE} from '../constants';

import Title from '../components/Title';
import {CheckCircleIcon} from '@heroicons/react/24/outline';
const OrganizationType = () => {
  return (
    <>
      <Title>What type of organization?</Title>
      <div className="h-full overflow-y-scroll">
        <div className="px-4 py-2">
          {ORGANIZATION_TYPE.map((item) => {
            return (
              <button className="flex w-full items-center justify-between px-4 transition-all duration-300 focus:bg-secondary focus:pl-5 focus:text-white focus:rounded-2xl">
                <p className="lowercase py-2 w-fit text-left text-lg sm:text-base">{item}</p>
                <CheckCircleIcon className="h-6 w-6 ml-2 text-white stroke-1.5 " />
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default OrganizationType;
