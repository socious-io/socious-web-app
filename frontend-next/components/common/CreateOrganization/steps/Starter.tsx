import React from 'react';
import Image from 'next/image';
import {ChevronLeftIcon} from '@heroicons/react/outline';
const Starter = () => {
  return (
    <>
    <div className='w-full h-56 relative '>
      <Image
        src={require('../../../../asset/images/TopHeader.png')}
        layout="fill"
        className='sm:rounded-t-3xl'
      />
      <ChevronLeftIcon
       
        className="h-6 w-6 text-white stroke-1.5 absolute left-2 top-12 hover:text-primary"
      />
    </div>
    <div className="h-full overflow-y-scroll"></div>
    </>
  );
};

export default Starter;
