/*
 * Social Causes component of profile
 */

import React from 'react';
import {getText} from '@socious/data';

// components
import Chip from './Chip';
import Title from './Title';

//interfaces
interface Props {
    social_causes: string[];
    title: string;
}

const ArraySegmentBox: React.FC<Props> = ({title,social_causes}) => {
  return (
    <div className="p-4">
      <Title>{title}</Title>
      <div className="flex w-4/6 flex-wrap gap-2 ">
        {social_causes &&
          social_causes?.map((item: string) => {
            return (
              <Chip
                key={item}
                name={getText('en', `PASSION.${item}`) || item}
              />
            );
          })}
      </div>
    </div>
  );
};

export default ArraySegmentBox;
