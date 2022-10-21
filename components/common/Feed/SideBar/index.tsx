import StatusCard from './StatusCard';
import NetworkCard from './NetworkCard';
import ProjectsCard from './ProjectsCard';
import ProfileCard from 'layout/screen/ProfileCard/ProfileCard';
import OrganizationCard from './OrganizationCard';
import {ChevronLeftIcon} from '@heroicons/react/24/outline';
import useUser from 'hooks/useUser/useUser';
import router from 'next/router';
import {twMerge} from 'tailwind-merge';

interface Props {
  selectBar?: 'PROJECT_BACKBAR' | 'DEFAULT' | 'MOBILE' | 'PROJECT_DETAIL';
}
const SideBar = ({selectBar = 'DEFAULT'}: Props) => {
  const {user, currentIdentity} = useUser({redirect: false});
  const isUser = currentIdentity?.type === 'users' ? true : false;

  if (!currentIdentity) return <></>;
  console.log('USER :---: ', user);

  return (
    <div
      className={twMerge(
        'hidden w-80 md:flex',
        selectBar === 'MOBILE' &&
          'flex w-full !border-0 border-offWhite md:hidden',
      )}
      aria-label="Sidebar"
    >
      <div
        className={`${
          selectBar != 'PROJECT_BACKBAR' && 'flex w-full'
        } space-y-4 overflow-y-auto bg-gray-50`}
      >
        {(selectBar == 'PROJECT_BACKBAR' || selectBar == 'PROJECT_DETAIL') && (
          <div className="flex flex-row rounded-2xl border  border-grayLineBased bg-white py-4 pr-20 ">
            <ChevronLeftIcon className="mr-5 w-6" />
            <span className="w-70" onClick={() => router.back()}>
              {selectBar == 'PROJECT_BACKBAR' ? (
                <p className=" font-semibold ">Project</p>
              ) : (
                <p className=" font-semibold ">Recommended for you</p>
              )}
            </span>
          </div>
        )}

        {selectBar != 'PROJECT_BACKBAR' && (
          <div
            className={twMerge(
              'flex w-full flex-col space-y-4 bg-gray-50',
              selectBar === 'MOBILE' && 'space-y-2 divide-y divide-offsetColor',
            )}
          >
            <ProfileCard
              type={selectBar === 'MOBILE' ? 'MOBILE' : 'DEFAULT'}
              content={user?.mission}
              name={
                currentIdentity?.type === 'users'
                  ? currentIdentity?.meta?.name
                  : user?.name
              }
              avatar={
                currentIdentity?.type === 'users'
                  ? user?.avatar?.url
                  : user?.image?.url
              }
              following={user?.followings}
              followers={user?.followers}
              username={
                currentIdentity?.type === 'users'
                  ? user?.username
                  : user?.shortname
              }
              isUser={isUser}
            />
            {selectBar != 'PROJECT_DETAIL' && (
              <div
                className={twMerge(
                  'space-y-4',
                  selectBar === 'MOBILE' &&
                    'space-y-2 divide-y divide-offsetColor',
                )}
              >
                {currentIdentity?.type === 'users' ? (
                  // <NetworkCard
                  //   type={selectBar === 'MOBILE' ? 'MOBILE' : 'DEFAULT'}
                  //   username={user?.username}
                  // />
                  <></>
                ) : (
                  <OrganizationCard
                    type={selectBar === 'MOBILE' ? 'MOBILE' : 'DEFAULT'}
                    username={user?.shortname}
                  />
                )}
                <ProjectsCard
                  type={selectBar === 'MOBILE' ? 'MOBILE' : 'DEFAULT'}
                  isOrganization={currentIdentity?.type === 'organizations'}
                  username={user?.username}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBar;
