import {ChevronLeftIcon} from '@heroicons/react/24/outline';
import useUser from 'hooks/useUser/useUser';
import router from 'next/router';
import HiredContent from './HireContent';
import ProjectCard from './ProjectCard';

interface Props {
  selectBar: string;
}
const SideBar = ({selectBar}: Props) => {
  const {user, currentIdentity} = useUser();

  return (
    <div className="hidden md:flex md:w-[375px]" aria-label="Sidebar">
      <div className="space-y-4 overflow-y-auto bg-gray-50">
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
          <div className="space-y-4 overflow-y-auto bg-gray-50">
            <ProjectCard
              isOrganization={currentIdentity?.type === 'organizations'}
              username={user?.username}
            />{' '}
          </div>
        )}
        <HiredContent />
      </div>
    </div>
  );
};

export default SideBar;
