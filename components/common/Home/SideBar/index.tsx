import StatusCard from './StatusCard';
import NetworkCard from './NetworkCard';
import ProjectsCard from './ProjectsCard';
import ProfileCard from 'layout/screen/ProfileCard/ProfileCard';
import OrganizationCard from './OrganizationCard';
import {ChevronLeftIcon} from '@heroicons/react/24/outline';
import useUser from 'hooks/useUser/useUser';

interface Props {
    selectBar: string;
}
const SideBar = ({selectBar}: Props) => {
  const {user, currentIdentity} = useUser();

  return (
    <div className="hidden w-80 md:flex" aria-label="Sidebar">
      <div className="space-y-4 overflow-y-auto bg-gray-50">
          {selectBar == 'BACKBAR' ? (
              <div className="flex flex-row rounded-2xl border  border-grayLineBased bg-white py-4 pr-20 ">
                  <ChevronLeftIcon className="mr-5 w-6" />
                  <button className="w-70" onClick={() => {}}>
                      <p className=" font-semibold ">Project</p>
                  </button>
              </div>
          ) : (
              <div className="space-y-4 overflow-y-auto bg-gray-50">
        <ProfileCard
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
          following={user?.following}
          followers={user?.followers}
          username={user?.username}
        />
        {/* TODO: Uncomment after status is fixed */}
        {/* <StatusCard status={user?.status} /> */}
        {currentIdentity?.type === 'users' ? (
          <NetworkCard username={user?.username} />
        ) : (
          <OrganizationCard />
        )}
        <ProjectsCard
          isOrganization={currentIdentity?.type === 'organizations'}
          username={user?.username}
        />
              </div>)}
      </div>
    </div>
  );
};

export default SideBar;
