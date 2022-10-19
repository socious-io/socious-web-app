import Link from 'next/link';
import React from 'react';
import Image from 'next/dist/client/image';
import {GlobeAsiaAustraliaIcon} from '@heroicons/react/24/outline';
import ClipboardIcon from 'asset/icons/clipboard.svg';
import BlackEditIcon from 'asset/icons/edit-black.svg';
import DeleteUserIcon from 'asset/icons/delete-user.svg';
import BlockUserIcon from 'asset/icons/block-user.svg';

import {useUser} from '@hooks';

const SettingCard = () => {
  const {currentIdentity} = useUser();
  return (
    <div className={'space-y-4 bg-offWhite p-4'}>
      <label className="text-primary">Settings</label>
      <ul className="list-none space-y-4">
        <li className="flex items-center space-x-4">
          <Link
            href={
              currentIdentity?.type === 'users'
                ? `/app/user/${currentIdentity?.meta?.username}`
                : `/app/organization/${currentIdentity?.meta?.shortname}`
            }
          >
            <label className="flex items-center space-x-4">
              <Image
                src={BlackEditIcon}
                alt="Wallet - SVG"
                width="20px"
                height="20px"
              />
              <label>Edit profile</label>
            </label>
          </Link>
        </li>
        <li className="flex items-center space-x-4">
          <Link href={'https://socious.io/privacy-policy/'} target="_blank">
            <label className="flex items-center space-x-4">
              <Image
                src={ClipboardIcon}
                alt="Wallet - SVG"
                width="20px"
                height="20px"
              />
              <label>Privacy policy</label>
            </label>
          </Link>
        </li>
        <li className="flex items-center space-x-4">
          <Link href={'https://socious.io/user-agreement/'} target="_blank">
            <label className="flex items-center space-x-4">
              <Image
                src={ClipboardIcon}
                alt="Wallet - SVG"
                width="20px"
                height="20px"
              />
              <label>Terms & conditions</label>
            </label>
          </Link>
        </li>
        <li className="flex items-center space-x-4">
          <label className="flex items-start space-x-4">
            <GlobeAsiaAustraliaIcon className="h-5" />
            <div>
              Switch language
              <div className="cursor-pointer text-primary">English</div>
            </div>
          </label>
        </li>
        {/* Blocking account */}
        <li className="flex items-center space-x-4">
          <Link href={'https://socious.io/user-agreement/'} target="_blank">
            <label className="flex items-center space-x-4">
              <Image
                src={BlockUserIcon}
                alt="Wallet - SVG"
                width="20px"
                height="20px"
              />
              <label>Blocking account</label>
            </label>
          </Link>
        </li>
        <li className="flex items-center space-x-4">
          <Link href={'https://socious.io/user-agreement/'} target="_blank">
            <label className="flex items-center space-x-4">
              <Image
                src={DeleteUserIcon}
                alt="Wallet - SVG"
                width="20px"
                height="20px"
              />
              <label>Delete account</label>
            </label>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SettingCard;
