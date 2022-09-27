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

type TLayoutType = {
  isHomePage?: boolean;
  backGroundStyle?: CSSProperties;
};
const HomeLayout: FC<PropsWithChildren<TLayoutType>> = ({
  children,
  isHomePage = false,
  backGroundStyle,
}) => {
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
        className={`flex h-52 w-full items-center rounded-b-sm   bg-cover bg-center sm:bg-primary md:flex md:h-16 md:bg-none lg:h-16 ${
          isHomePage ? `bg-[url('/images/socious_feed.png')]` : 'bg-none'
        }`}
      >
        <nav className="h-full w-full items-center bg-black  bg-opacity-25  sm:bg-opacity-0 md:flex  md:h-16 md:bg-none lg:h-16 ">
          <div className="container mx-auto max-w-5xl">
            <div className="flex flex-col items-center justify-center sm:flex-row">
              <div className="flex-row-2 ml-4 mr-4 mt-14 flex items-center justify-items-center md:ml-0 md:mt-0">
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
                    <Link href="/">
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
              <div className="mt-6 w-full px-4 sm:hidden">
                <h1 className="text-4xl text-white">Your Feed</h1>
                <p className="mt-2 text-base font-normal text-neutralGray ">
                  See what is happening in your network
                </p>
              </div>
              <div className="hidden w-4/6 items-center justify-end space-x-6 md:flex">
                <div className="space-x-4">
                  <Link href="/app" passHref>
                    <span className="text-sm text-white">Home</span>
                  </Link>
                  <Link href="/app/network" passHref>
                    <span className="text-sm text-white">Network</span>
                  </Link>
                  <Link href="/app/chat" passHref>
                    <span className="text-sm text-white">Chats</span>
                  </Link>
                  <Link href="/app/notifications" passHref>
                    <span className="text-sm text-white">Notifications</span>
                  </Link>
                  <Link href="/app/projects" passHref>
                    <span className="text-sm text-white">Projects</span>
                  </Link>
                </div>
                <div className="space-between flex items-center space-x-3">
                  <Dropdown
                    display={
                      <Avatar size="m" src={currentIdentity?.meta?.avatar} />
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
      <div
        className={`m-auto flex px-4 sm:px-0 ${styles.layoutBase}`}
        style={backGroundStyle}
      >
        {children}
      </div>
    </div>
  );
};
export default HomeLayout;
