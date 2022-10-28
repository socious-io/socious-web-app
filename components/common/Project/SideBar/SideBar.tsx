import {ChevronLeftIcon} from '@heroicons/react/24/outline';
import {Project} from '@models/project';
import useUser from 'hooks/useUser/useUser';
import router from 'next/router';
import ApplicantsContent from './ApplicantsContent';
import HiredContent from './HireContent';
import ProjectCard from './ProjectCard';

interface Props {
  selectBar: string;
  data?: Project;
  projectId?: string;
}
const SideBar = ({selectBar, data}: Props) => {
  const {user} = useUser();

  if (!data) {
    return <></>;
  }

  return (
    <div className="hidden w-80 md:flex" aria-label="Sidebar">
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
        <div className="cursor-pointer space-y-4 overflow-y-auto bg-gray-50">
          <ProjectCard username={user?.username} projectDetail={data} />
        </div>
        {selectBar == 'APPLICANT' && <ApplicantsContent projectId={data.id} />}
        {selectBar == 'HIRE' && <HiredContent projectId={data.id} />}
      </div>
    </div>
  );
};

export default SideBar;
