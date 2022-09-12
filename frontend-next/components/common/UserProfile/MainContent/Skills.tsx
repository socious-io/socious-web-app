/*
 * skills of user component
 */

import React from 'react';

// components
import Chip from './Chip';
import Title from './Title';

const Skills: React.FC<any> = ({data}) => {
  const {skills} = data;
  return (
    <div className="p-4 border-t border-grayLineBased">
      <Title>Skills</Title>
      <div className="flex w-4/6 flex-wrap gap-2 ">
        {skills.map((item: string) => {
          return <Chip name={item} />;
        })}
      </div>
    </div>
  );
};

export default Skills;
