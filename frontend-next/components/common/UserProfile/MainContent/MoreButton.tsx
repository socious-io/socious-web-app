/*
 * more vertical button
 */

import React from 'react';
import Image from 'next/image';

const MoreButton = () => {
  // more svg address
  const more = require('../../../../asset/icons/more.svg');

  return (
    <div className="flex border-2 border-grayLineBased border-red w-12 h-12  rounded-full items-center justify-center ">
      <Image src={more} alt="socious logo" width={24} height={24} />
    </div>
  );
};

export default MoreButton;
