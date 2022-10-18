import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Avatar } from '../../components/common/Avatar/Avatar';
import { TextInput } from '../../components/common/TextInput/TextInput';
import { FC, PropsWithChildren, CSSProperties } from 'react';
import imgSrc from '../../asset/icons/logo.svg';
import { Dropdown } from '@components/common';
import { useUser } from '@hooks';
import Image from 'next/image';
import { changeIdentity } from '@api/identity/actions';
import { LoginIdentity } from '@models/identity';
import { getOrganization } from '@api/organizations/actions';
import { logout } from '@api/auth/actions';
import Router from 'next/router';
import styles from './index.module.scss';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { twMerge } from 'tailwind-merge';
import feedImg from 'asset/images/socious_feed.png';
import projectImg from 'asset/images/socious_project.png';
import { useMediaQuery } from 'react-responsive';
import ProjectIcon from '@components/common/Icons/ProjectIcon';
import FeedIcon from '@components/common/Icons/FeedIcon';
import NetworkIcon from '@components/common/Icons/NetworkIcon';
import NotificationIcon from '@components/common/Icons/NotificationIcon';
import ChatIcon from '@components/common/Icons/ChatIcon';
import MobileMenuItems from '@components/common/MobileMenuItems/MobileMenuItems';

const bannerType = {
  feed: {
    title: 'Your Feed',
    subTitle: 'See what is happening in your network',
    img: feedImg,
  },
  project: {
    title: 'Your Projects',
    subTitle: 'Manage and create projects',
    img: projectImg,
  },
  network: {
    title: 'Network',
    subTitle: 'Connect with skilled professionals',
    img: projectImg,
  },
};

type TLayoutType = {
  hasNavbar?: boolean;
  style?: CSSProperties;
  hasDetailNavbar?: boolean;
  detailNavbarTitle?: string;
  editProfile?: () => void;
};

type TNavbarItem = {
  label: string;
  route: string;
  icon: React.ReactElement;
  isActive: boolean;
};
export const NavbarItem: FC<TNavbarItem> = ({ label, route, icon, isActive }) => {
  return (
    <Link href={route} passHref>
      <a className="flex flex-col items-center">
        <div className="h-6 w-6">{icon}</div>
        <span
          className={twMerge(
            'cursor-pointer text-xs text-grayDisableButton hover:text-primary md:text-sm md:hover:text-white',
            isActive && 'font-semibold text-primary md:text-white',
          )}
        >
          {label}
        </span>
      </a>
    </Link>
  );
};

const GeneralLayout: FC<PropsWithChildren<TLayoutType>> = ({
  children,
  hasNavbar = false,
  style,
  hasDetailNavbar,
  detailNavbarTitle,
  editProfile
}) => {
  const router = useRouter();
  const { currentIdentity, identities, mutateIdentities, mutateUser } = useUser({
    redirect: false,
  });

  const isBottomNav = useMediaQuery({
    query: '(max-width: 768px)',
  });

  const isActiveTab = useCallback(
    (label: string) => {
      switch (label) {
        case 'Projects':
          return router.pathname.startsWith('/app/projects');
        case 'Notifications':
          return router.pathname.startsWith('/app/notifications');
        case 'Network':
          return router.pathname.startsWith('/app/network');
        case 'Chat':
          return router.pathname.startsWith('/app/chat');
        case 'Feeds':
          return (
            router.pathname === '/app/feed' ||
            router.pathname.startsWith('/app/post')
          );
        default:
          return false;
      }
    },
    [router],
  );

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
  };

  const userLoggedOut = useMemo(() => identities === null, [identities]);

  const onLogout = async () => {
    const res = await logout();
    mutateIdentities();
    mutateUser();
    if (res) Router.push('/app');
  };

  // Check if they need banner
  const needsBanner = useMemo<'feed' | 'network' | 'project' | null>(() => {
    switch (router?.pathname) {
      case '/app/feed':
        return 'feed';
      case '/app/network':
        return 'network';
      case '/app/projects':
        return 'project';
      default:
        return null;
    }
  }, [router?.pathname]);

  const [mobileState, setMobileState] = useState(false);

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setMobileState(true);
    } else {
      setMobileState(false);
    }
  }

  return (
    <div className="flex w-full flex-col">
      <div
        className={`flex w-full items-center rounded-b-sm bg-primary md:flex md:h-16 lg:h-16 ${
          // ? `h-52 bg-[url('/images/socious_feed.png')]`
          needsBanner ? `h-44 flex-col` : 'h-16 bg-none'
          }`}
      >
        <nav className="fixed top-0 z-10 flex h-14 min-h-[54px] w-full items-center justify-center bg-primary md:h-16 md:justify-start lg:h-16 ">
          <div className="container mx-6 w-full max-w-5xl sm:mx-2 md:mx-auto">
            <div className="flex w-full items-center justify-center gap-x-4 sm:gap-0">
              <div
                className={`flex-row-2 flex w-full items-center justify-items-center gap-x-4 sm:mx-4 sm:gap-0 md:ml-0 md:w-auto
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
                <div className="space-between flex grow items-center sm:mx-2 md:min-w-[18rem] md:grow-0">
                  {/* Uncomment for SearchBar */}
                  {/* <TextInput
                    className="h-8 w-full rounded-full py-1.5"
                    containerClassName="w-full max-w-[18rem]"
                    height={'32px'}
                  /> */}
                </div>
              </div>

              <div className="flex w-auto items-center justify-center md:w-4/6 md:grow">
                <div className="fixed left-0 bottom-0 flex w-full grow justify-evenly space-x-4 border-t border-[#B2B2B2] bg-white py-2 md:relative md:w-auto md:border-t-0 md:bg-transparent md:py-0">
                  {/* Acting as a spacer div */}
                  <div className="hidden md:block"></div>
                  <NavbarItem
                    label="Projects"
                    route="/app/projects"
                    icon={
                      <ProjectIcon
                        className={
                          (isActiveTab('Projects') &&
                            'fill-primary md:fill-white') ||
                          undefined
                        }
                        strokeColor={
                          isActiveTab('Projects')
                            ? isBottomNav
                              ? 'white'
                              : '#2F4786'
                            : undefined
                        }
                      />
                    }
                    isActive={isActiveTab('Projects')}
                  />
                  {/* TODO: Uncomment for Network */}
                  {/* <NavbarItem
                    label="Network"
                    route="/app/network"
                    icon={
                      <NetworkIcon
                        className={
                          isActiveTab('Network')
                            ? isBottomNav
                              ? 'white'
                              : '#2F4786'
                            : undefined
                        }
                        strokeColor={
                              isActiveTab('Network')
                                ? 'transparent'
                                : undefined
                            }
                      />
                    }
                    isActive={isActiveTab('Network')}
                  /> */}
                  <NavbarItem
                    label="Feeds"
                    route="/app/feed"
                    icon={
                      <FeedIcon
                        className={
                          (isActiveTab('Feeds') &&
                            'fill-primary md:fill-white') ||
                          undefined
                        }
                        strokeColor={
                          isActiveTab('Feeds')
                            ? isBottomNav
                              ? 'white'
                              : '#2F4786'
                            : undefined
                        }
                      />
                    }
                    isActive={isActiveTab('Feeds')}
                  />
                  {!userLoggedOut && (
                    <>
                      <NavbarItem
                        label="Chat"
                        route="/app/chat"
                        icon={
                          <ChatIcon
                            className={
                              (isActiveTab('Chat') &&
                                'fill-primary md:fill-white') ||
                              undefined
                            }
                            strokeColor={
                              isActiveTab('Chat')
                                ? isBottomNav
                                  ? 'white'
                                  : '#2F4786'
                                : undefined
                            }
                          />
                        }
                        isActive={isActiveTab('Chat')}
                      />
                      <NavbarItem
                        label="Notifications"
                        route="/app/notifications"
                        icon={
                          <NotificationIcon
                            className={
                              (isActiveTab('Notifications') &&
                                'fill-primary md:fill-white') ||
                              undefined
                            }
                            strokeColor={
                              isActiveTab('Notifications')
                                ? isBottomNav
                                  ? 'white'
                                  : '#2F4786'
                                : undefined
                            }
                          />
                        }
                        isActive={isActiveTab('Notifications')}
                      />
                    </>
                  )}
                </div>
                <div className="space-between flex items-center space-x-3 sm:ml-4 md:ml-0">
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
                    mobileState={mobileState}
                    handleResize={handleResize}
                  >
                    {mobileState ?
                      <MobileMenuItems editProfile={editProfile} onLogout={onLogout} />
                      :
                      <React.Fragment>
                        {identities && identities.length > 0 && (
                          <>
                            {identities.map(
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
                            <Link href="/app/organization/+new">
                              <div className="cursor-pointer p-4 text-left text-sm hover:bg-primary hover:text-offWhite">
                                Create Organization
                              </div>
                            </Link>
                          </>
                        )}

                        {!userLoggedOut ? (
                          <>
                            <Link href="/app/auth/changepassword">
                              <div className="cursor-pointer p-4 text-left text-sm hover:bg-primary hover:text-offWhite">
                                Change Password
                              </div>
                            </Link>
                            <div
                              className="cursor-pointer p-4 text-left hover:bg-primary hover:text-offWhite"
                              onClick={onLogout}
                            >
                              <span className="w-full text-sm">Log out</span>
                            </div>
                          </>
                        ) : (
                          <>
                            <div
                              className="cursor-pointer whitespace-nowrap p-4 text-center text-sm hover:bg-primary hover:text-offWhite"
                              onClick={() => router.push('/app/auth/signup')}
                            >
                              Sign up
                            </div>
                            <div
                              className="cursor-pointer whitespace-nowrap p-4 text-center text-sm hover:bg-primary hover:text-offWhite"
                              onClick={() => router.push('/app/auth/login')}
                            >
                              Login
                            </div>
                          </>
                        )}
                      </React.Fragment>
                    }
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
        </nav>
        {needsBanner && (
          <div
            className="mt-[54px] h-full w-full bg-cover bg-center px-4 pt-9 bg-blend-overlay md:mt-12 md:hidden"
            style={{ backgroundImage: `url(${bannerType[needsBanner].img})` }}
          >
            <h1 className="text-4xl text-white">
              {bannerType[needsBanner].title}
            </h1>
            <p className="mt-2 text-base font-normal text-neutralGray ">
              {bannerType[needsBanner].subTitle}
            </p>
          </div>
        )}
      </div>
      {hasDetailNavbar && (
        <div className="flex w-full flex-col pt-14 sm:hidden">
          <div className=" flex items-center justify-between px-4 pb-3.5">
            <span className="flex " onClick={() => router.back()}>
              <ChevronLeftIcon className="w-5" />
            </span>
            <h3 className="mr-5 w-full text-center font-sans text-xl font-semibold">
              {detailNavbarTitle || 'Post'}
            </h3>
          </div>
        </div>
      )}
      <div
        className={`m-auto mb-14 flex md:mb-0 lg:mb-0 lg:mt-12 ${needsBanner ? 'mt-10 px-4' : 'sm:mt-10'
          } sm:px-0 ${styles.layoutBase}`}
        style={style}
      >
        <div className="flex w-full md:space-x-6">{children}</div>
      </div>
    </div>
  );
};
export default GeneralLayout;
