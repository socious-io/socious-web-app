/*
 * header of user profile component
 */

import React from 'react';
import Image from 'next/image';

//components
import Button from '@components/common/Button/Button';
import MoreButton from './MoreButton';
import Avatar from '@components/common/Avatar/Avatar';

const Header = () => {
  // backgground image not exist svg
  const bg_icon = require('../../../../asset/icons/bg-image.svg');

  return (
    <div className="w-4/6 text-right ">
      <div className="flex item-center justify-center relative bg-primaryDark h-32 rounded-t-xl">
        <Image src={bg_icon} alt="socious logo" width={24} height={24} />
        <Avatar size="xxl" className="absolute top-24 left-4" />
      </div>
      <div className="flex h-12 flex-row justify-end pr-4 gap-4 mt-6">
        <Button>connect</Button>
        <MoreButton />
      </div>
    </div>
  );
};

export default Header;
