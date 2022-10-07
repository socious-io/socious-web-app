import {Cog8ToothIcon as CogIcon} from '@heroicons/react/24/outline';
import {ReactComponent as Logo} from '../../asset/icons/logo.svg';
import {useContext} from 'react';
import Link from 'next/link';
import {Avatar} from '../../components/common/Avatar/Avatar';
import {TextInput} from '../../components/common/TextInput/TextInput';
import {FC, PropsWithChildren, CSSProperties} from 'react';
const imgSrc = require('../../asset/icons/logo.svg');
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

  console.log('CURRENT USER', currentIdentity);
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
  // placeholder for hasNavBar
  const placeHolder = true;

  return (
    <div className="flex w-full flex-col">
      <div
        className={`flex  w-full items-center rounded-b-sm bg-primary md:flex md:h-16 md:bg-none lg:h-16 ${
          // ? `h-52 bg-[url('/images/socious_feed.png')]`
          placeHolder ? `h-44 flex-col` : 'h-16 bg-none'
        }`}
      >
        <nav className="flex h-14 min-h-[54px] w-full items-center justify-center bg-black bg-opacity-25 sm:bg-opacity-0 md:h-16 md:justify-start md:bg-none lg:h-16 ">
          <div className="container mx-6 w-full max-w-5xl sm:mx-2 md:mx-auto">
            <div className="flex w-full items-center justify-center gap-x-4 sm:gap-0">
              <div
                className={`flex-row-2 flex items-center justify-items-center sm:mx-4 md:ml-0 ${
                  // placeHolder ? 'flex' : 'hidden'
                  ''
                } w-full gap-x-4 sm:gap-0
                `}
              >
                <div className="flex flex-wrap content-around">
                  <div className="items-center rounded-full ">
                    <div className="relative  h-8 w-8 ">
                      <Link href="/app">
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
                <div className="space-between flex grow items-center sm:mx-2">
                  <TextInput
                    className="h-8 w-full max-w-[18rem] rounded-full py-1.5"
                    containerClassName="w-full"
                    height={'32px'}
                  />
                </div>
              </div>

              <div className="flex w-auto items-center justify-center md:w-4/6 md:space-x-6">
                <div className="hidden space-x-4 md:flex">
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
                    displayClass="w-8 h-8"
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
                </div>
              </div>
            </div>
          </div>
        </nav>
        {placeHolder && (
          <div className="h-full w-full bg-home-image bg-cover bg-center px-4 pt-9 md:hidden">
            <h1 className="text-4xl text-white">Your Feed</h1>
            <p className="mt-2 text-base font-normal text-neutralGray ">
              See what is happening in your network
            </p>
          </div>
        )}
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
          placeHolder ? 'mt-10 px-4' : 'sm:mt-10'
        } sm:px-0 ${styles.layoutBase}`}
        style={style}
      >
        <div className="flex w-full md:space-x-6">{children}</div>
      </div>
    </div>
  );
};
export default GeneralLayout;
