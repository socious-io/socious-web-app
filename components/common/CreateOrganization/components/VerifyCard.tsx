import React from 'react';
import Image from 'next/image';

//interfaces
interface Props {
  item: {text: string; icon: string; title: string; id: number};
}
const VerifyCard: React.FC<Props> = ({item}) => {
  const {id, icon, title, text} = item;

  return (
    <>
      <div className="flex  items-start pl-4 pr-6">
        <div
          className={`relative flex h-10 w-10 items-center justify-center rounded-full  border-2 border-primary ${
            id === 1 ? 'bg-primary' : 'bg-white'
          } `}
        >
          <Image src={icon} alt="socious logo" width={20} height={20} />
        </div>
        <div
          className={`-ml-5 w-11/12  pl-10 ${
            title !== 'Verified!' && 'border-l-2 border-primary'
          }`}
        >
          <p className="text-lg  font-bold sm:text-base">{title}</p>
          <p className=" mb-6 pt-2 text-base text-graySubtitle sm:text-sm ">
            {text}
          </p>
        </div>
      </div>
    </>
  );
};

export default VerifyCard;
