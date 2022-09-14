/*
 * skills of user component
 */

import React from 'react';

// components
import Chip from './Chip';
import Title from './Title';

//interfaces
interface Props {
  skills: string[];
}
const Skills: React.FC<Props> = ({skills}) => {
  return (
    <div className="p-4 border-y border-grayLineBased mb-20 ">
      <Title>Skills</Title>
      <div className="flex w-4/6 flex-wrap gap-2 ">
        {skills &&
          skills.map((item: string) => {
            return <Chip key={item} name={item} />;
          })}
      </div>
    </div>
  );
};

export default Skills;
