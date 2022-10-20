import Link from 'next/link';
import React, {useMemo} from 'react';
import Image from 'next/dist/client/image';
import {GlobeAsiaAustraliaIcon, KeyIcon} from '@heroicons/react/24/outline';
import ClipboardIcon from 'asset/icons/clipboard.svg';
import BlackEditIcon from 'asset/icons/edit-black.svg';
// import DeleteUserIcon from 'asset/icons/delete-user.svg';
// import BlockUserIcon from 'asset/icons/block-user.svg';

import {useUser} from '@hooks';
import {twMerge} from 'tailwind-merge';

const SettingCard = () => {
  const {currentIdentity, identities} = useUser();
  const userLoggedOut = useMemo(() => identities === null, [identities]);

  return (
    <div
      className={twMerge(
        'space-y-4 bg-offWhite p-4 md:hidden',
        userLoggedOut && '!border-0',
      )}
    >
      <label className="text-primary">Settings</label>
      <ul className="list-none space-y-4">
        {identities && identities.length === 1 && (
          <li className="flex items-center space-x-4">
            <Link href="/app/organization/+new">
              <label className="cursor-pointer">Create Organization</label>
            </Link>
          </li>
        )}
        {!userLoggedOut && (
          <li className="flex items-center space-x-4">
            <Link
              href={
                currentIdentity?.type === 'users'
                  ? `/app/user/${currentIdentity?.meta?.username}`
                  : `/app/organization/${currentIdentity?.meta?.shortname}`
              }
            >
              <label className="flex cursor-pointer items-center space-x-4">
                <Image
                  src={BlackEditIcon}
                  alt="edit profile"
                  width="20px"
                  height="20px"
                />
                <p>Edit profile</p>
              </label>
            </Link>
          </li>
        )}
        <li className="flex items-center space-x-4">
          <Link href={'https://socious.io/privacy-policy/'} target="_blank">
            <label className="flex cursor-pointer items-center space-x-4">
              <Image
                src={ClipboardIcon}
                alt="Privacy policy"
                width="20px"
                height="20px"
              />
              <p>Privacy policy</p>
            </label>
          </Link>
        </li>
        <li className="flex items-center space-x-4">
          <Link href={'https://socious.io/user-agreement/'} target="_blank">
            <label className="flex cursor-pointer items-center space-x-4">
              <Image
                src={ClipboardIcon}
                alt="user agreement"
                width="20px"
                height="20px"
              />
              <p>Terms & conditions</p>
            </label>
          </Link>
        </li>
        {/* FEATURE NOT IMPLEMENTED YET */}
        {/* <li className="flex items-center space-x-4">
          <label className="flex items-start space-x-4">
            <GlobeAsiaAustraliaIcon className="h-5" />
            <div>
              Switch language
              <div className="cursor-pointer text-primary">English</div>
            </div>
          </label>
        </li> */}

        {/* REMOVE AFTER IMPLEMENTING SOMETHING ELSE */}
        {/* <li className="flex items-center space-x-4">
          <Link href={'https://socious.io/user-agreement/'} target="_blank">
            <label className="flex cursor-pointer items-center space-x-4">
              <Image
                src={BlockUserIcon}
                alt="Block User Icon"
                width="20px"
                height="20px"
              />
              <p>Blocking account</p>
            </label>
          </Link>
        </li>
        <li className="flex items-center space-x-4">
          <Link href={'https://socious.io/user-agreement/'} target="_blank">
            <label className="flex cursor-pointer items-center space-x-4">
              <Image
                src={DeleteUserIcon}
                alt="Delete User Icon"
                width="20px"
                height="20px"
              />
              <p>Delete account</p>
            </label>
          </Link>
        </li> */}
        {!userLoggedOut && (
          <li className="flex items-center space-x-4">
            <Link href="/app/auth/changepassword">
              <label className="flex cursor-pointer items-center space-x-4">
                <KeyIcon className="h-5" />
                <p>Change password</p>
              </label>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default SettingCard;
