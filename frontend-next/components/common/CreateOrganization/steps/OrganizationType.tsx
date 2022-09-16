import React from 'react';
import {ORGANIZATION_TYPE} from '../constants';

import Title from '../components/Title';

const OrganizationType = () => {
  return (
    <>
      <Title>What type of organization?</Title>
      <div className="h-full overflow-y-scroll">
        <div className="pl-6 py-2">
          {ORGANIZATION_TYPE.map((item) => {
            return <p className="lowercase py-1.5">{item}</p>;
          })}
        </div>
      </div>
    </>
  );
};

export default OrganizationType;
