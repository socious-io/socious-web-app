import React, {useState} from 'react';
//icons
import {ChevronLeftIcon} from '@heroicons/react/24/outline';
interface Props {
  step: number;
  onPress: () => void;
}
const Carousel: React.FC<Props> = ({step, onPress}) => {
  return (
    <div className=" flex sm:h-16 h-20 justify-center items-center border-b relative border-grayLineBased py-4">
      <ChevronLeftIcon
        onClick={onPress}
        className="sm:h-6 sm:w-6 h-8 w-8 text-black stroke-1.5 absolute left-4 hover:text-primary"
      />

      {[1, 2, 3, 4, 5, 6].map((stepNumber) => (
        <span
          className={`sm:h-3 sm:w-3 h-4 w-4 mx-1 cursor-pointer rounded-3xl transition-all duration-300 border border-grayLineBased ${
            step === stepNumber && 'bg-primary'
          }`}
        />
      ))}
    </div>
  );
};

export default Carousel;
