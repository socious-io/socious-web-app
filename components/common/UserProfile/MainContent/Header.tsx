/*
 * header of user profile component
 */

import React, {useState} from 'react';
import Image from 'next/image';

//components
import Button from '@components/common/Button/Button';
import MoreButton from './MoreButton';
import Avatar from '@components/common/Avatar/Avatar';
import {followUser, unfollowUser} from '@api/network/action';
import {KeyedMutator} from 'swr';

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
  own_user?: boolean;
  following: boolean;
  id: string;
  mutate: KeyedMutator<any>;
}

const Header: React.FC<Props> = ({
  cover_image,
  avatar,
  status,
  own_user = false,
  following,
  id,
  mutate,
}) => {
  const [disabled, setDisabled] = useState(false);

  // backgground image not exist svg
  const bg_icon = require('../../../../asset/icons/bg-image.svg');

  const followHandler = async () => {
    setDisabled(true);
    try {
      const res = await followUser(id);
      mutate();
    } catch (e) {}
    setDisabled(false);
  };
  const unfollowHandler = async () => {
    setDisabled(true);
    try {
      const res = await unfollowUser(id);
      mutate();
      console.log(res);
    } catch (e) {}
    setDisabled(false);
  };

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
        {!own_user && following ? (
          <Button
            onClick={unfollowHandler}
            disabled={disabled}
            variant={'outline'}
          >
            Following
          </Button>
        ) : !own_user && !following ? (
          <Button onClick={followHandler} disabled={disabled}>
            Connect
          </Button>
        ) : null}

        <MoreButton />
      </div>
    </div>
  );
};

export default Header;
