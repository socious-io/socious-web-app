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
    <span className="mr-2 rounded-full bg-secondarySLight py-2 px-4 text-sm capitalize text-secondary">
      {name}
    </span>
  );
};

export default Chip;
