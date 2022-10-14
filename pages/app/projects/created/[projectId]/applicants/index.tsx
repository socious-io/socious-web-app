import ApplicantsContent from '@components/common/Project/created/ApplicantsContent';

import SideBar from '@components/common/Project/SideBar/SideBar';
import {TApplicantsResponse} from '@models/applicant';
import {GeneralLayout} from 'layout';
import {useRouter} from 'next/router';
import {GridLoader} from 'react-spinners';
import useSWR from 'swr';
import {get} from 'utils/request';
const Applicant = () => {
  const router = useRouter();
  const {projectId} = router.query;
  const {data: applicantsData, error: applicantsError} =
    useSWR<TApplicantsResponse>(
      projectId ? `/projects/${projectId}/applicants?limit=1` : null,
      get,
    );

  if (!applicantsData && !applicantsError)
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <GridLoader color="#36d7b7" />
      </div>
    );

  // 404 || 500 || Invalid Post, redirect to home
  if (
    applicantsError?.response?.status === 404 ||
    applicantsError?.response?.status === 500 ||
    // '"value" must be a valid GUID' || 'Not matched'
    applicantsError?.response?.status === 400
  ) {
    router.push('/app/projects/created');
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <GridLoader color="#36d7b7" />
        <h3 className="pt-4">Invalid Project. Returning back.</h3>
      </div>
    );
  }

  return (
    <GeneralLayout hasNavbar>
      <SideBar selectBar={'APPLICANT'} />
      <ApplicantsContent applicant={applicantsData?.items?.[0]} />
    </GeneralLayout>
  );
};

export default Applicant;
