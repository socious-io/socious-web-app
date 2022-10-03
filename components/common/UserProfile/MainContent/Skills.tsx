/*
 * skills of user component
 */

import React from 'react';
import {getText} from '@socious/data';

// components
import Chip from './Chip';
import Title from './Title';

//interfaces
interface Props {
  skills: string[];
}
const Skills: React.FC<Props> = ({skills}) => {
  return (
    <div className="border-t border-grayLineBased p-4  ">
      <Title>Skills</Title>
      <div className="flex w-4/6 flex-wrap gap-2 ">
        {skills &&
          skills.map((item: string) => {
            return (
              <Chip key={item} name={getText('en', `SKILL.${item}`) || item} />
            );
          })}
      </div>
    </div>
  );
};

export default Skills;
