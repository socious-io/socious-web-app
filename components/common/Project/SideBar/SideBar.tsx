import {ChevronLeftIcon} from '@heroicons/react/24/outline';

import useUser from 'hooks/useUser/useUser';
import router from 'next/router';
import ApplicantsList from './ApplicantsContent';
import HiredContent from './HireContent';
import ProjectCard from './ProjectCard';

interface Props {
  selectBar: string;
  projectId?: string;
}
const SideBar = ({selectBar, projectId}: Props) => {
  const {user, currentIdentity} = useUser();

  return (
    <div className="hidden w-96 md:flex" aria-label="Sidebar">
      <div className="w-full space-y-4 overflow-y-auto bg-gray-50">
        <div
          onClick={() => router.back()}
          className="flex cursor-pointer flex-row rounded-2xl border border-grayLineBased bg-white px-2 py-4  "
        >
          <ChevronLeftIcon className=" w-6" />
          <span className="ml-2 w-full">
            <p className=" font-semibold ">Projects</p>
          </span>
        </div>
        {projectId && (
          <div className="cursor-pointer space-y-4 overflow-y-auto bg-gray-50">
            <ProjectCard
              isOrganization={currentIdentity?.type === 'organizations'}
              username={user?.username}
              projectId={projectId}
            />
          </div>
        )}
        {selectBar == 'APPLICANT' && projectId && (
          <ApplicantsList projectId={projectId} />
        )}
        {selectBar == 'HIRE' && projectId && (
          <HiredContent projectId={projectId} />
        )}
      </div>
    </div>
  );
};

export default SideBar;
