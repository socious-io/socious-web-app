/*
 * header of user profile component
 */

import React, {useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {WebLinker} from 'ssi-auth-lib';
// components
import Button from '@components/common/Button/Button';
import Avatar from '@components/common/Avatar/Avatar';
import {Modal} from '@components/common';

// Icon
import MessageIcon from 'asset/icons/message.svg';
import {reportUser, blockUser} from '@api/user/actions';
// actions
import {followUser, unfollowUser} from '@api/network/action';

// interfaces
import {KeyedMutator} from 'swr';
import {useUser} from '@hooks';

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
  mutualConnection: boolean;
  status: 'users' | 'organizations';
  own_user?: boolean;
  following: boolean;
  id: string;
  identities_mutate: KeyedMutator<any>;
  profile_mutate: KeyedMutator<any>;
  loggedIn: boolean;
  editProfile?: () => void;
  reported: boolean;
  impactPoints: number;
}

const Header: React.FC<Props> = ({
  cover_image,
  avatar,
  status,
  own_user = false,
  mutualConnection = false,
  following,
  id,
  identities_mutate,
  profile_mutate,
  loggedIn,
  editProfile,
  reported,
  impactPoints,
}) => {
  const [disabled, setDisabled] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [reportedBut, setReportedBut] = useState<boolean>(reported);

  const {currentIdentity} = useUser();

  const report = async () => {
    if (reported) {
      return;
    }
    try {
      await reportUser(id);
    } catch (err) {
      console.log(err);
    }
    setReportedBut(true);
  };
  const block = async () => {
    try {
      await blockUser(id);
    } catch (err) {
      console.log(err);
    }
    window.location.reload();
  };

  // backgground image not exist svg
  const bg_icon = require('../../../../asset/icons/bg-image.svg');

  //follow user function
  const followHandler = async () => {
    setDisabled(true);
    try {
      const res = await followUser(id);
      identities_mutate(); //refresh identities api
      profile_mutate(); //refresh profile(user or organization) api
    } catch (e) {}
    setDisabled(false);
  };

  //unfollow user function
  const unfollowHandler = async () => {
    setDisabled(true);
    try {
      const res = await unfollowUser(id);
      identities_mutate(); //refresh identities api
      profile_mutate(); //refresh profile(user or organization) api
      handleToggleModal();
    } catch (e) {}
    setDisabled(false);
  };

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const showQR = () => {
    const el = document.getElementById('app-web-link') as HTMLDivElement;
    WebLinker.start(
      el,
      {
        serviceDid: '8DXffTYfukQsk3NZZP3ypS',
        interactionId: '1',
        instanceId: '6374a508515f5a539afd400c',
      },
      [
        {
          credentialId: '8DXffTYfukQsk3NZZP3ypS:3:CL:266:tag',
          attributes: [
            {name: 'Socious User ID', value: id},
            {
              name: 'Credential Issue Date',
              value: `${new Date().getTime()}`,
            },
          ],
        },
      ],
    );
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
          type={status}
        />
      </div>
      <div className="mt-6 flex h-12 flex-row items-center justify-end gap-4 pr-4">
        {/* Chat Icon */}
        {loggedIn &&
          !own_user &&
          (currentIdentity?.type === 'organizations' ||
            (currentIdentity?.type === 'users' && mutualConnection)) && (
            <Link href={`/app/chat/create/${id}`}>
              <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-grayLineBased">
                <Image
                  src={MessageIcon}
                  alt="Logo - SVG"
                  width="20px"
                  height="20px"
                  className="p-2"
                />
              </div>
            </Link>
          )}
        {loggedIn && !own_user && (
          <div>
            <Button
              onClick={async () => await report()}
              disabled={reportedBut}
              variant={'outline'}
            >
              Report
            </Button>
            <Button
              onClick={async () => await block()}
              variant={'outline'}
              className="hover:bg-error hover:text-offWhite"
            >
              Block
            </Button>
          </div>
        )}

        {/* show connect or following button */}
        {loggedIn && !own_user && following ? (
          <Button
            onClick={handleToggleModal}
            disabled={disabled}
            variant={'outline'}
          >
            Following
          </Button>
        ) : loggedIn && !own_user && !following ? (
          <Button onClick={followHandler} disabled={disabled}>
            {status === 'users' ? 'Connect' : 'Follow'}
          </Button>
        ) : null}

        {/* show edit profile button just for own user */}
        {loggedIn && own_user && (
          <Button onClick={() => editProfile && editProfile()}>
            Edit profile
          </Button>
        )}

        {loggedIn && own_user && impactPoints > 0 && (
          <Button onClick={showQR}>Claim Impact Points</Button>
        )}
        <div id="app-web-link"></div>
      </div>

      {/* show modal before unfollow */}
      <Modal isOpen={showModal} onClose={handleToggleModal}>
        <Modal.Title>
          <div className="flex flex-col py-6">
            <Avatar
              src={avatar?.url}
              size="xl"
              rounded={false}
              className=" mx-auto "
              type={status}
            />
            <div className="pb-4 pt-8">
              <p className="font-worksans text-center text-lg font-semibold text-black">
                Do you want to unfollow this account?
              </p>
            </div>
          </div>
        </Modal.Title>
        <div className="flex gap-x-12 px-4">
          <Button
            className="m-auto mt-4  flex w-full max-w-xs items-center justify-center align-middle "
            type="submit"
            size="lg"
            variant="fill"
            value="Submit"
            onClick={unfollowHandler}
          >
            Yes
          </Button>
          <Button
            className="m-auto mt-4  flex w-full max-w-xs items-center justify-center align-middle "
            type="submit"
            size="lg"
            variant="outline"
            value="Submit"
            onClick={handleToggleModal}
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Header;
