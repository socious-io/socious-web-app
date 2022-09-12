/*
 * Social Causes component of profile
 */

import React from 'react';

// components
import Chip from './Chip';
import Title from './Title';

const SocialCauses: React.FC<any> = ({data}) => {
 
  const {social_causes} = data;

  return (
    <div className="p-4">
      <Title>Social causes</Title>
      <div className="flex w-4/6 flex-wrap gap-2 ">
        {social_causes?.map((item: string) => {
          return <Chip name={item} />;
        })}
      </div>
    </div>
  );
};

export default SocialCauses;
