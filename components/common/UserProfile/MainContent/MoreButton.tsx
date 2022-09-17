/*
 * more vertical button
 */

import React from 'react';
import Image from 'next/image';

const MoreButton = () => {
  // more svg address
  const more = require('../../../../asset/icons/more.svg');

  return (
    <div className="border-1 flex h-12 w-12  items-center justify-center  rounded-full border border-grayLineBased ">
      <Image src={more} alt="socious logo" width={24} height={24} />
    </div>
  );
};

export default MoreButton;
