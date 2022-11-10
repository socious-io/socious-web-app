import {
  FC,
  PropsWithChildren,
  CSSProperties,
  KeyboardEventHandler,
  useCallback,
  useMemo,
} from 'react';
import {useRouter} from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import {twMerge} from 'tailwind-merge';
import {useMediaQuery} from 'react-responsive';
import {ChevronLeftIcon} from '@heroicons/react/24/outline';
import ChatIcon from '@components/common/Icons/ChatIcon';
import ProjectIcon from '@components/common/Icons/ProjectIcon';
import FeedIcon from '@components/common/Icons/FeedIcon';
import NotificationIcon from '@components/common/Icons/NotificationIcon';
import NavbarPopupMenu from '@components/common/NavbarPopupMenu';
import {SearchBar} from '@components/common';
import imgSrc from '../../asset/icons/logo.svg';
import feedImg from 'asset/images/socious_feed.png';
import projectImg from 'asset/images/socious_project.png';
import {useUser} from '@hooks';
import styles from './index.module.scss';

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
};

type TNavbarItem = {
  label: string;
  route: string;
  icon: React.ReactElement;
  isActive: boolean;
};

export const NavbarItem: FC<TNavbarItem> = ({label, route, icon, isActive}) => {
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

// Main Default Layout
const GeneralLayout: FC<PropsWithChildren<TLayoutType>> = ({
  children,
  hasNavbar = false,
  style,
  hasDetailNavbar,
  detailNavbarTitle,
}) => {
  const router = useRouter();
  const {identities} = useUser({
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

  const userLoggedOut = useMemo(() => identities === null, [identities]);

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

  const goToSearchPage: KeyboardEventHandler<HTMLInputElement> = (e) => {
    const keyword = e.currentTarget.value.trim();
    if (e.key === 'Enter' && keyword) {
      const type = getSearchType();
      router.push(`/app/search/?type=${type}&keywords=${keyword}`);
    }
  };

  const getSearchType = () => {
    const currentPath = router.pathname.split('/')?.[2];
    const {type} = router.query;
    switch (currentPath) {
      case 'projects':
        return 'projects';
      case 'feed':
      case 'post':
        return 'posts';
      case 'search':
        if (type) return type;
      default:
        return 'users';
    }
  };

  return (
    <div className="flex h-full w-full flex-col">
      <div
        className={`flex w-full items-center rounded-b-sm bg-primary md:flex md:h-16 lg:h-16 ${
          // ? `h-52 bg-[url('/images/socious_feed.png')]`
          needsBanner ? `h-44 flex-col` : 'h-16 bg-none'
        }`}
      >
        <nav className="fixed top-0 z-50 flex h-28 min-h-[54px] w-full items-end justify-center bg-primary pb-4 md:h-16 md:justify-start lg:h-16 ">
          <div className="container mx-6 w-full max-w-5xl sm:mx-2 md:mx-auto">
            <div className="flex w-full items-center justify-center gap-x-4 sm:gap-0">
              <div
                className={`flex-row-2 flex w-full items-center justify-items-center gap-x-4 sm:mx-4 sm:gap-0 md:ml-0 md:w-auto
                `}
              >
                <div className="flex flex-wrap content-around">
                  <div className="items-center rounded-full ">
                    <div className="relative h-8 w-8 ">
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
                  <SearchBar
                    type="text"
                    placeholder="Search"
                    onKeyDown={goToSearchPage}
                    className="w-full"
                    defaultValue={router.query.keywords}
                  />
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
                {/* DROP */}
                <NavbarPopupMenu />
              </div>
            </div>
          </div>
        </nav>
        {needsBanner && (
          <div
            className="mt-[54px] h-full w-full bg-cover bg-center px-4 pt-9 bg-blend-overlay md:mt-12 md:hidden"
            style={{backgroundImage: `url(${bannerType[needsBanner].img})`}}
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
        className={`m-auto mb-14 flex md:mb-0 lg:mb-0 lg:mt-12 ${
          needsBanner ? 'mt-10 px-4' : 'sm:mt-10'
        } sm:px-0 ${styles.layoutBase}`}
        style={style}
      >
        <div className="relative flex w-full md:space-x-6">{children}</div>
      </div>
    </div>
  );
};
export default GeneralLayout;
