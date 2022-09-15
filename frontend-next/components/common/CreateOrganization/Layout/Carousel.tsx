import React, {useState} from 'react';
//icons
import {ChevronLeftIcon} from '@heroicons/react/outline';
const Carousel = () => {
  const [step, setStep] = useState<number>(7);
  const back = () => {
    if (step > 1) {
      setStep((step) => step - 1);
    }
  };
  return (
    <div className=" flex h-12 justify-center items-center border-b relative border-grayLineBased mt-2">
      <ChevronLeftIcon
        onClick={back}
        className="h-6 w-6 text-black stroke-1.5 absolute left-6 hover:text-primary"
      />

      {[1, 2, 3, 4, 5, 6, 7].map((stepNumber) => (
        <span
          className={`w-3 h-3 mx-1 cursor-pointer rounded-3xl transition-all duration-300 border border-grayLineBased ${
            step === stepNumber && 'bg-primary'
          }`}
        />
      ))}
    </div>
  );
};

export default Carousel;
