import {ChevronLeftIcon} from '@heroicons/react/24/outline';
import useUser from 'hooks/useUser/useUser';
import router from 'next/router';
import ApplicantsContent from './ApplicantsContent';
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
        <div className="flex flex-row rounded-2xl border  border-grayLineBased bg-white py-4  ">
          <ChevronLeftIcon className=" w-6" />
          <span onClick={() => router.back()}>
            <p className=" font-semibold ">Recommended for you</p>
          </span>
        </div>

        <div className="space-y-4 overflow-y-auto bg-gray-50">
          <ProjectCard
            isOrganization={currentIdentity?.type === 'organizations'}
            username={user?.username}
          />{' '}
        </div>

        {selectBar == 'APPLICANT' && <ApplicantsContent />}
        {selectBar == 'HIRE' && <HiredContent />}
      </div>
    </div>
  );
};

export default SideBar;
