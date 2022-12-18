import Link from 'next/link';
import React, {useMemo} from 'react';
import Image from 'next/dist/client/image';
import {KeyIcon} from '@heroicons/react/24/outline';
import ClipboardIcon from 'asset/icons/clipboard.svg';
import DeleteUserIcon from 'asset/icons/delete-user.svg';
import {useUser} from '@hooks';
import {twMerge} from 'tailwind-merge';

const SettingCard = () => {
  const {identities} = useUser();
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
        {!userLoggedOut && (
          <>
            <li className="flex items-center space-x-4">
              <Link href="/app/auth/changepassword">
                <label className="flex cursor-pointer items-center space-x-4">
                  <KeyIcon className="h-5" />
                  <p>Change password</p>
                </label>
              </Link>
            </li>
            <li className="flex items-center space-x-4">
              <Link href="/app/delete-user/request">
                <label className="flex cursor-pointer items-center space-x-4">
                  <Image
                    src={DeleteUserIcon}
                    alt="delete user"
                    width="20px"
                    height="20px"
                  />
                  <p>Delete Account</p>
                </label>
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default SettingCard;
