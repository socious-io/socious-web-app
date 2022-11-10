import useSWR from 'swr';
import {GridLoader} from 'react-spinners';
import {useRouter} from 'next/router';

// components
import {GeneralLayout} from 'layout';
import SideBar from '@components/common/Project/SideBar/SideBar';
import ApplicantsContent from '@components/common/Project/created/ApplicantsContent';

// Utils/services
import {get} from 'utils/request';

// Types
import {TApplicant} from '@models/applicant';
import {Project} from '@models/project';

const Applicant = () => {
  const router = useRouter();
  const {projectId, aid} = router.query;
  const {
    data: applicantData,
    error: applicantError,
    mutate: mutateApplicant,
  } = useSWR<TApplicant>(projectId && aid ? `/applicants/${aid}` : null, get);

  const {data: project} = useSWR<Project>(
    projectId ? `/projects/${projectId}` : null,
    get,
  );

  if (!applicantData && !applicantError)
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <GridLoader color="#36d7b7" />
      </div>
    );

  // 404 || 500 || Invalid Post, redirect to home
  if (
    applicantError?.response?.status === 404 ||
    applicantError?.response?.status === 500 ||
    // '"value" must be a valid GUID' || 'Not matched'
    applicantError?.response?.status === 400
  ) {
    router.push('/app/projects/created');
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <GridLoader color="#36d7b7" />
        <h3 className="pt-4">Invalid Project. Returning back.</h3>
      </div>
    );
  }

  if (!applicantData) return <></>;

  return (
    <GeneralLayout hasNavbar>
      <SideBar selectBar="APPLICANT" data={project} />
      <ApplicantsContent
        applicant={applicantData}
        mutateApplicant={mutateApplicant}
      />
    </GeneralLayout>
  );
};

export default Applicant;
