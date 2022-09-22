/*
 * this components is for showing steps of create organization
 */

import React from 'react';

//icons
import {ChevronLeftIcon} from '@heroicons/react/24/outline';

//interfaces
interface Props {
  step: number;
  onPress: () => void;
  skip: boolean;
}
//show skip in carousel send skip={true}

const Carousel: React.FC<Props> = ({step, skip = false, onPress}) => {
  return (
    <div className="relative flex h-20 items-center justify-center border-b border-grayLineBased py-4 sm:h-16">
      <ChevronLeftIcon
        onClick={onPress}
        className="absolute left-4 h-8 w-8 stroke-1.5 text-black hover:text-primary sm:h-6 sm:w-6"
      />
      {/* show 6 circle */}
      {[1, 2, 3, 4, 5, 6].map((stepNumber) => (
        <span
          key={stepNumber}
          className={`mx-1 h-4 w-4 cursor-pointer rounded-3xl border border-grayLineBased transition-all duration-300 sm:h-3 sm:w-3 ${
            step === stepNumber && 'bg-primary'
          }`}
        />
      ))}
      {skip && (
        <p className="absolute right-8 font-medium text-primary">Skip</p>
      )}
    </div>
  );
};

export default Carousel;
