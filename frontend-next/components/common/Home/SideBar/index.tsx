import StatusCard from './StatusCard';
import NetworkCard from './NetworkCard';
import ProjectsCard from './ProjectsCard';
import ProfileCard from 'layout/screen/ProfileCard/ProfileCard';

const SideBar = () => {
  return (
    <div className="w-80" aria-label="Sidebar">
      <div className="space-y-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <ProfileCard />
        <StatusCard status="None"/>
        <NetworkCard />
        <ProjectsCard />
      </div>
    </div>
  );
};

export default SideBar;