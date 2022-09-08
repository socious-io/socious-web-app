/*
 * chip component
 */
import React from 'react';

// props interface
export interface ChipProps {
  name: string;
}

const Chip: React.FC<ChipProps> = ({name}) => {
  return (
    <span className="capitalize text-secondary bg-secondarySLight mr-2 py-2 px-4 rounded-full">
      {name}
    </span>
  );
};

export default Chip;
