import StatusCard from './StatusCard';
import NetworkCard from './NetworkCard';
import ProjectsCard from './ProjectsCard';
import ProfileCard from 'layout/screen/ProfileCard/ProfileCard';
import OrganizationCard from './OrganizationCard';

import useUser from 'hooks/useUser/useUser';

const SideBar = () => {
  const {user, currentIdentity} = useUser();

  return (
    <div className="w-80" aria-label="Sidebar">
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
      </div>
    </div>
  );
};

export default SideBar;
