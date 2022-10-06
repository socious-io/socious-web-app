import {Cog8ToothIcon as CogIcon} from '@heroicons/react/24/outline';
import {ReactComponent as Logo} from '../../asset/icons/logo.svg';
import {useContext} from 'react';
import Link from 'next/link';
import {Avatar} from '../../components/common/Avatar/Avatar';
import {TextInput} from '../../components/common/TextInput/TextInput';
import {FC, PropsWithChildren, CSSProperties} from 'react';
const imgSrc = require('../../asset/icons/Base.svg');
const imgLikeSrc = require('../../asset/icons/likes.svg');
import Image from 'next/image';
import {Dropdown} from '@components/common';
import {useUser} from '@hooks';
import {changeIdentity} from '@api/identity/actions';
import {LoginIdentity} from '@models/identity';
import {getOrganization} from '@api/organizations/actions';
import {logout} from '@api/auth/actions';
import Router from 'next/router';
import styles from './index.module.scss';
import {ChevronLeftIcon} from '@heroicons/react/24/outline';
import {useRouter} from 'next/router';
type TLayoutType = {
  hasNavbar?: boolean;
  style?: CSSProperties;
  hasDetailNavbar?: boolean;
  detailNavbarTitle?: string;
};
type TNavbarItem = {
  label: string;
  route: string;
};
export const NavbarItem: FC<TNavbarItem> = ({label, route}) => {
  return (
    <Link href={route} passHref>
      <span className="cursor-pointer text-sm text-white">{label}</span>
    </Link>
  );
};
const GeneralLayout: FC<PropsWithChildren<TLayoutType>> = ({
  children,
  hasNavbar = false,
  style,
  hasDetailNavbar,
  detailNavbarTitle,
}) => {
  const route = useRouter();
  const {currentIdentity, identities, mutateIdentities, mutateUser} = useUser({
    redirect: false,
  });

  const onSwitchIdentity = async (identity: LoginIdentity) => {
    try {
      await changeIdentity(identity.id);
      mutateIdentities();
      if (identity.type === 'organizations') {
        await getOrganization(identity.id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onLogout = async () => {
    const res = await logout();
    mutateIdentities();
    mutateUser();
    if (res) Router.push('/app');
  };

  return (
    <div className="flex w-full flex-col">
      <div
        className={`flex  w-full items-center rounded-b-sm   bg-cover bg-center sm:bg-primary md:flex md:h-16 md:bg-none lg:h-16 ${
          hasNavbar
            ? `h-52 bg-[url('/images/socious_feed.png')]`
            : 'h-0 bg-none'
        }`}
      >
        <nav className="h-full w-full items-center bg-black  bg-opacity-25  sm:bg-opacity-0 md:flex  md:h-16 md:bg-none lg:h-16 ">
          <div className="container mx-auto max-w-5xl">
            <div className="flex flex-col items-center justify-center sm:flex-row">
              <div
                className={`flex-row-2 ml-4 mr-4 mt-14  items-center justify-items-center sm:flex md:ml-0 md:mt-0 ${
                  hasNavbar ? 'flex' : 'hidden'
                }`}
              >
                <div className="flex flex-wrap content-around">
                  <div className="items-center rounded-full ">
                    <div className="relative  h-8 w-8  ">
                      <Link href="/">
                        <a>
                          <Image
                            src={imgSrc}
                            className="fill-warning"
                            alt="socious logo"
                            layout="fill" // required
                            width={32}
                            height={32}
                          />
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="space-between ml-2 mr-2 flex items-center ">
                  <TextInput className="w-72 rounded-full py-1.5" />
                </div>
                <div className="items-center ">
                  <div className="relative h-6 w-6 md:hidden">
                    <Link href="/app/chat">
                      <a>
                        <Image
                          src={imgLikeSrc}
                          className="fill-warning"
                          alt="likes"
                          layout="fill" // required
                        />
                      </a>
                    </Link>
                  </div>
                </div>
              </div>

              {hasNavbar && (
                <div className="mt-6 w-full px-4 sm:hidden">
                  <h1 className="text-4xl text-white">Your Feed</h1>
                  <p className="mt-2 text-base font-normal text-neutralGray ">
                    See what is happening in your network
                  </p>
                </div>
              )}
              <div className="hidden w-4/6 items-center justify-end space-x-6 md:flex">
                <div className="space-x-4 ">
                  <NavbarItem label="Home" route="/app" />
                  <NavbarItem label="Network" route="/app/network" />
                  <NavbarItem label="Chats" route="/app/chat" />
                  <NavbarItem
                    label="Notifications"
                    route="/app/notifications"
                  />
                  <NavbarItem label="Projects" route="/app/projects" />
                </div>
                <div className="space-between flex items-center space-x-3">
                  <Dropdown
                    display={
                      <Avatar
                        size="m"
                        type={currentIdentity?.type}
                        src={
                          currentIdentity?.type === 'users'
                            ? currentIdentity?.meta?.avatar
                            : currentIdentity?.meta?.image
                        }
                      />
                    }
                  >
                    {identities &&
                      identities.length > 0 &&
                      identities.map(
                        (identity: LoginIdentity) =>
                          !identity.current && (
                            <div
                              key={identity?.meta?.id}
                              className="my-4 flex w-52 cursor-pointer flex-row items-center p-4 hover:bg-primary hover:text-offWhite"
                              onClick={() => onSwitchIdentity(identity)}
                            >
                              <div className="w-1/4">
                                <Avatar
                                  size="m"
                                  type={identity.type}
                                  src={
                                    identity.type === 'users'
                                      ? identity?.meta?.avatar
                                      : identity?.meta?.image
                                  }
                                />
                              </div>
                              <div className="w-3/4">
                                {identity?.meta?.name}
                              </div>
                            </div>
                          ),
                      )}
                    <div className="cursor-pointer p-4" onClick={onLogout}>
                      <b>LOGOUT</b>
                    </div>
                  </Dropdown>
                  <CogIcon className="h-6  text-white" />
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
      {hasDetailNavbar && (
        <div className="flex w-full flex-col pt-14 sm:hidden">
          <div className=" flex items-center justify-between px-4 pb-3.5">
            <span className="flex " onClick={() => route.back()}>
              <ChevronLeftIcon className="w-5" />
            </span>
            <h3 className="mr-5 w-full text-center font-sans text-xl font-semibold">
              {detailNavbarTitle || 'Post'}
            </h3>
          </div>
        </div>
      )}
      <div
        className={`m-auto flex ${
          hasNavbar ? 'mt-10 px-4' : 'sm:mt-10'
        } sm:px-0 ${styles.layoutBase}`}
        style={style}
      >
        <div className="flex w-full md:space-x-6">{children}</div>
      </div>
    </div>
  );
};
export default GeneralLayout;
