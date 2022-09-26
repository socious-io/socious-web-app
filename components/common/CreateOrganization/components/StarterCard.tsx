import React from 'react';
import Image from 'next/image';

//interfaces
interface Props {
  text: string;
  icon: string;
}

const StarterCard: React.FC<Props> = ({text, icon}) => {
  return (
    <>
      <div className="flex items-center py-5 pl-4 pr-6">
        <div className="border-1 flex h-10 w-10 items-center justify-center rounded-full border border-grayLineBased bg-white">
          <Image src={icon} alt="socious logo" width={20} height={20} />
        </div>
        <p className="text-GrayBlack01 w-11/12 pl-4 text-base sm:text-sm">
          {text}
        </p>
      </div>
    </>
  );
};

export default StarterCard;
