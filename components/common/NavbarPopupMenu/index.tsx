import Link from 'next/link';
import Router from 'next/router';
import React, {useMemo, useRef} from 'react';
import {twMerge} from 'tailwind-merge';

// Ui Packages
import {Popover} from '@headlessui/react';
import {XMarkIcon} from '@heroicons/react/24/solid';
import {
  ArrowRightOnRectangleIcon,
  KeyIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

// Components
import Avatar from '../Avatar/Avatar';
import SideBar from '../Feed/SideBar';
import SettingCard from './SettingCard';
import SwitchToCard from './SwitchToCard';

// hooks
import {useUser} from '@hooks';

// Actions
import {logout} from '@api/auth/actions';
import {changeIdentity} from '@api/identity/actions';
import {getOrganization} from '@api/organizations/actions';

// Types
import {LoginIdentity} from '@models/identity';
import {removeAllListeners} from 'process';

const NavbarPopupMenu = () => {
  const {identities, currentIdentity, mutateIdentities, mutateUser} = useUser({
    redirect: false,
  });

  const popOverRef = useRef<HTMLButtonElement | null>(null);

  const userLoggedOut = useMemo(() => identities === null, [identities]);

  const onSwitchIdentity = async (identity: LoginIdentity) => {
    try {
      await changeIdentity(identity.id);
      mutateIdentities();
      mutateUser();
      if (identity.type === 'organizations') {
        await getOrganization(identity.id);
      }
    } catch (error) {
      console.error(error);
    }
    Router.push('/app');
  };

  const onLogout = async () => {
    const res = await logout();
    mutateIdentities();
    mutateUser();
    if (res) Router.push('/app');
  };

  const isUser = currentIdentity?.type === 'users' ? true : false;

  return (
    <>
      {/* MOBILE MENU */}
      <div
        className={twMerge(
          'space-between flex items-center space-x-3 border-0 sm:ml-4 md:ml-0',
          // !userLoggedOut ? 'block md:hidden' : 'hidden',
        )}
      >
        <Popover className="md:relative">
          <Popover.Button ref={popOverRef}>
            <Avatar
              size="m"
              type={currentIdentity?.type}
              src={
                currentIdentity?.type === 'users'
                  ? currentIdentity?.meta?.avatar
                  : currentIdentity?.meta?.image
              }
            />
          </Popover.Button>

          <Popover.Panel
            as="div"
            className="md:min-h-auto absolute top-0 left-0 z-10 w-screen bg-offWhite md:top-auto md:right-0 md:left-auto md:min-w-[10rem] md:max-w-[12rem] md:overflow-hidden md:rounded-2xl md:border"
          >
            {/* Main Menu */}
            <div className="hide-scrollbar relative h-screen space-y-2 divide-y divide-offsetColor overflow-y-scroll pt-12 md:h-auto md:pt-0">
              {/* Close Button for now */}
              <div
                tabIndex={0}
                className="absolute top-10 right-8 cursor-pointer text-error md:hidden"
                onClick={() => popOverRef.current?.click()}
              >
                <XMarkIcon className="w-6" />
              </div>
              <SideBar selectBar="MOBILE" />
              {/* <PaymentCard /> */}
              {identities && identities.length > 1 ? (
                <SwitchToCard
                  onSwitchIdentity={onSwitchIdentity}
                  identities={identities}
                />
              ) : (
                !userLoggedOut && (
                  <span className="hidden !border-0 sm:block">
                    <Link href="/app/organization/+new">
                      <div className="cursor-pointer p-4 text-left text-sm hover:bg-primary hover:text-offWhite">
                        Create Organization
                      </div>
                    </Link>
                  </span>
                )
              )}

              <SettingCard />

              {/* Logged Based Info */}
              {userLoggedOut ? (
                <ul className="!mt-0 list-none divide-y divide-offsetColor sm:!border-0">
                  <Link href="/app/auth/signup">
                    <li className="flex cursor-pointer items-center space-x-4 whitespace-nowrap p-4 hover:bg-primary hover:text-offWhite">
                      <UserCircleIcon className="h-5" />
                      <p>Sign up</p>
                    </li>
                  </Link>
                  <Link href="/app/auth/login">
                    <li className="flex cursor-pointer items-center space-x-4 whitespace-nowrap p-4 hover:bg-primary hover:text-offWhite">
                      <ArrowRightOnRectangleIcon className="h-5" />
                      <p>Login</p>
                    </li>
                  </Link>
                </ul>
              ) : (
                <div className="flex hidden cursor-pointer items-center gap-4 p-2 md:block">
                  <Link href="/app/auth/changepassword">
                    <label className="flex cursor-pointer items-center space-x-4">
                      <KeyIcon className="h-6" />
                      <p>Change password</p>
                    </label>
                  </Link>
                </div>
              )}
              {!userLoggedOut && (
                <div
                  className="flex cursor-pointer items-center gap-4 p-4 text-error"
                  onClick={onLogout}
                >
                  <ArrowRightOnRectangleIcon className="h-6" />
                  Log out
                </div>
              )}
            </div>
          </Popover.Panel>
        </Popover>
      </div>
    </>
  );
};
import {
  deletePushNotifToken,
  unsubscribeToPushNotifs,
} from 'core/pushNotification';

export default NavbarPopupMenu;
