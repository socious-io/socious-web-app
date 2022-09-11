/*
 * skills of user component
 */

import React from 'react';

// components
import Chip from './Chip';
import Title from './Title';

const Skills = () => {
  return (
    <div className="p-4 border-t border-grayLineBased">
      <Title>Skills</Title>
      <div className="flex w-4/6 flex-wrap gap-2 ">
        <Chip name="Bloomberg Terminal" />
        <Chip name="Sustainable Finance" />
        <Chip name="Investment Banking" />
        <Chip name="Impact Investing" />
        <Chip name="Financial Analysis" />
      </div>
    </div>
  );
};

export default Skills;
