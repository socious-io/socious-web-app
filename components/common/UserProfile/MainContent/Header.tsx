/*
 * header of user profile component
 */

import React from 'react';
import Image from 'next/image';

//components
import Button from '@components/common/Button/Button';
import MoreButton from './MoreButton';
import Avatar from '@components/common/Avatar/Avatar';

interface Props {
  cover_image: null | {
    created_at: string;
    filename: string;
    id: string;
    identity_id: string;
    url: string;
  };
  avatar: null | {
    created_at: string;
    filename: string;
    id: string;
    identity_id: string;
    url: string;
  };
  status: 'user' | 'organization';
}

const Header: React.FC<Props> = ({cover_image, avatar, status}) => {
  // backgground image not exist svg
  const bg_icon = require('../../../../asset/icons/bg-image.svg');

  return (
    <div className="mb-4 text-right ">
      <div className="item-center relative flex h-32 justify-center bg-primaryDark md:rounded-t-xl">
        {cover_image ? (
          <Image
            src={cover_image?.url}
            alt="socious logo"
            layout="fill"
            className="md:rounded-t-xl"
          />
        ) : (
          <Image src={bg_icon} alt="socious logo" width={24} height={24} />
        )}
        <Avatar
          src={avatar?.url}
          size="xxl"
          className="absolute top-24 left-4"
          type={status === 'organization' ? 1 : 0}
        />
      </div>
      <div className="mt-6 flex h-12 flex-row justify-end gap-4 pr-4">
        <Button>connect</Button>
        <MoreButton />
      </div>
    </div>
  );
};

export default Header;
