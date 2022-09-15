import StatusCard from './StatusCard';
import NetworkCard from './NetworkCard';
import ProjectsCard from './ProjectsCard';
import ProfileCard from 'layout/screen/ProfileCard/ProfileCard';
import OrganizationCard from './OrganizationCard';

import useUser from 'hooks/useUser/useUser';

const SideBar = () => {
  const {user, currentIdentity} = useUser();

  return (
    <div className="hidden w-80 md:flex" aria-label="Sidebar">
      <div className="space-y-4 overflow-y-auto bg-gray-50">
        <ProfileCard
          content={user?.mission}
          name={currentIdentity?.type === 'users' ? user?.username : user?.name}
          avatar={
            currentIdentity?.type === 'users'
              ? user?.avatar?.url
              : user?.image?.url
          }
          following={user?.following}
          followers={user?.followers}
        />
        <StatusCard status={user?.status} />
        {currentIdentity?.type === 'users' ? (
          <NetworkCard />
        ) : (
          <OrganizationCard />
        )}
        <ProjectsCard
          isOrganization={currentIdentity?.type === 'organizations'}
        />
      </div>
    </div>
  );
};

export default SideBar;
