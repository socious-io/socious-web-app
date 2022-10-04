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
  items: string[];
  title: string;
  isRow?: boolean;
}

const ProjectItem: React.FC<Props> = ({title, items, isRow = false}) => {
  return (
    <div className="p-4">
      <Title>{title}</Title>
      {isRow ? (
        <div className="flex w-4/6 flex-col gap-2 ">
          {items &&
            items?.map((item: string) => {
              return <div key={item}>{item}</div>;
            })}
        </div>
      ) : (
        <div className="flex w-4/6 flex-wrap gap-2 ">
          {items &&
            items?.map((item: string) => {
              return (
                <Chip
                  key={item}
                  name={getText('en', `PASSION.${item}`) || item}
                />
              );
            })}
        </div>
      )}
    </div>
  );
};

export default ProjectItem;
