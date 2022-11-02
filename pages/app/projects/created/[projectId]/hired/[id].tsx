import HiredContent from '@components/common/Project/created/hiredContent';
import SideBar from '@components/common/Project/SideBar/SideBar';
import {TApplicant} from '@models/applicant';
import {GeneralLayout} from 'layout';
import {useRouter} from 'next/router';
import {GridLoader} from 'react-spinners';
import useSWR from 'swr';
import {get} from 'utils/request';

const Hire = () => {
  const router = useRouter();
  const {projectId, id} = router.query;
  const {
    data: applicantData,
    error: applicantError,
    mutate: mutateApplicant,
  } = useSWR<TApplicant>(projectId && id ? `/applicants/${id}` : null, get);

  console.log('ApplicantData: : ', applicantError);
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
    <GeneralLayout hasDetailNavbar detailNavbarTitle={applicantData.user?.name}>
      <SideBar selectBar={'HIRE'} projectId={projectId as string} />
      <HiredContent
        applicant={
          applicantData?.status === 'HIRED' ? applicantData : undefined
        }
        mutateApplicant={mutateApplicant}
      />
    </GeneralLayout>
  );
};

export default Hire;
