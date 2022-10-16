import {ChevronLeftIcon} from '@heroicons/react/24/outline';
import {TApplicantsByStatus, TApplicantsResponse} from '@models/applicant';
import useUser from 'hooks/useUser/useUser';
import router from 'next/router';
import {useMemo} from 'react';
import useSWR from 'swr';
import {get} from 'utils/request';
import ApplicantsContent from './ApplicantsContent';
import HiredContent from './HireContent';
import ProjectCard from './ProjectCard';

interface Props {
  selectBar: string;
  projectId?: string;
}
const SideBar = ({selectBar, projectId}: Props) => {
  const {user, currentIdentity} = useUser();

  const {data: applicantsData, error: applicantsError} =
    useSWR<TApplicantsResponse>(
      projectId ? `/projects/${projectId}/applicants` : null,
      get,
    );

  const flattenApplicantsObj: TApplicantsByStatus = useMemo(() => {
    const flattenApplicants = applicantsData?.items ?? [];

    return flattenApplicants?.reduce(
      (obj, currentValue) => {
        if (!obj[currentValue['status'] ?? 'ERROR']) {
          obj[currentValue['status'] ?? 'ERROR'] = [];
        }
        obj[currentValue['status'] ?? 'ERROR'].push(currentValue);
        return obj;
      },
      {
        PENDING: [],
        REJECTED: [],
        OFFERED: [],
      },
    );
  }, [applicantsData]);

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
        {projectId && (
          <div className="cursor-pointer space-y-4 overflow-y-auto bg-gray-50">
            <ProjectCard
              isOrganization={currentIdentity?.type === 'organizations'}
              username={user?.username}
              projectId={projectId}
            />
          </div>
        )}
        {selectBar == 'APPLICANT' && (
          <ApplicantsContent
            flattenApplicantsObj={flattenApplicantsObj ?? []}
          />
        )}
        {selectBar == 'HIRE' && (
          <HiredContent
            hiredApplicants={flattenApplicantsObj?.['HIRED'] ?? []}
          />
        )}
      </div>
    </div>
  );
};

export default SideBar;
