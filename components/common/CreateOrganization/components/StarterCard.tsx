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
      <div className="flex py-5 pl-4 pr-6 items-center">
        <div className="flex border border-1 border-grayLineBased bg-white w-10 h-10  rounded-full items-center justify-center ">
          <Image src={icon} alt="socious logo" width={20} height={20} />
        </div>
        <p className="pl-4 w-11/12 sm:text-sm text-base text-GrayBlack01 ">{text}</p>
      </div>
    </>
  );
};

export default StarterCard;
