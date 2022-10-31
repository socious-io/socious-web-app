import {useRouter} from 'next/router';
import {GridLoader} from 'react-spinners';
import useSWR from 'swr';

// Components
import {GeneralLayout} from 'layout';
import SideBar from '@components/common/Project/SideBar/SideBar';

// Utils/services
import {get} from 'utils/request';

// Types
import ApplicantsContent from '@components/common/Project/SideBar/ApplicantsContent';
import {Project} from '@models/project';
import {useUser} from '@hooks';

const Applicants = () => {
  const router = useRouter();
  const {projectId} = router.query;
  const {currentIdentity} = useUser();

  const {data: project, error} = useSWR<Project>(
    projectId ? `/projects/${projectId}` : null,
    get,
  );
  // 404 || 500 || Invalid Proejct, redirect to home
  if (
    error?.response?.status === 404 ||
    error?.response?.status === 500 ||
    // '"value" must be a valid GUID' || 'Not matched'
    error?.response?.status === 400
  ) {
    router.back();
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <GridLoader color="#36d7b7" />
        <h3 className="pt-4">Invalid Project. Returning back.</h3>
      </div>
    );
  }

  // If not owner
  if (project?.identity_id !== currentIdentity?.id) {
    router.back();
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <GridLoader color="#36d7b7" />
        <h3 className="pt-4">Access Denied.</h3>
      </div>
    );
  }

  return (
    <GeneralLayout
      hasNavbar
      hasDetailNavbar
      detailNavbarTitle={project?.title ?? 'Project Title'}
    >
      <SideBar selectBar={'APPLICANT'} projectId={projectId as string} />
      {/* <Applications projectId={projectId as string} /> */}
      <ApplicantsContent projectId={projectId as string} type="FULL" />
    </GeneralLayout>
  );
};

export default Applicants;
