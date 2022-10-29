import {useRouter} from 'next/router';
import {GridLoader} from 'react-spinners';
import useSWR from 'swr';

// Components
import {GeneralLayout} from 'layout';
import SideBar from '@components/common/Project/SideBar/SideBar';
import ApplicantsContent from '@components/common/Project/created/ApplicantsContent';

// Utils/hooks
import {get} from 'utils/request';
import {useUser} from '@hooks';

// Types
import {TApplicantsResponse} from '@models/applicant';
import ProjectMobileTop from '@components/common/Project/ProjectMobileTop/ProjectMobileTop';
import ApplicantsList from '@components/common/Project/SideBar/ApplicantsContent';
import {Project} from '@models/project';

const Applicants = () => {
  const router = useRouter();
  const {projectId} = router.query;
  const {currentIdentity} = useUser();
  const {data: project, error: projectError} = useSWR<Project>(
    projectId ? `/projects/${projectId}` : null,
    get,
  );
  const {
    data: applicantsData,
    error: applicantsError,
    mutate: mutateApplicant,
  } = useSWR<TApplicantsResponse>(
    project?.id ? `/projects/${project?.id}/applicants` : null,
    get,
  );

  if ((!applicantsData && !applicantsError) || (!project && !projectError))
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
    <>
      <GeneralLayout hasNavbar>
        <SideBar selectBar={'APPLICANT'} projectId={projectId as string} />
        {/* MOBILE LIST */}
        <div className="w-full pb-4 md:hidden">
          <ProjectMobileTop
            selectedTab="APPLICANTS"
            projectId={
              applicantsData?.items?.[0]?.project_id ?? (projectId as string)
            }
            owner={project?.identity_id === currentIdentity?.id}
          />
          <div className="w-full pb-4 md:hidden">
            <ApplicantsList
              projectId={
                applicantsData?.items?.[0]?.project_id ?? (projectId as string)
              }
            />
          </div>
        </div>

        {/* DESKTOP VIEW */}
        <div className="hidden w-full md:block">
          {applicantsData && applicantsData.items?.length > 0 ? (
            <ApplicantsContent
              applicant={
                applicantsData?.items?.find((x) => x.status === 'PENDING') ??
                applicantsData?.items?.[0]
              }
              mutateApplicant={() => mutateApplicant()}
            />
          ) : (
            <h2 className="h-20 w-full rounded-2xl border bg-white p-4 text-center">
              No applicants
            </h2>
          )}
        </div>
      </GeneralLayout>
    </>
  );
};

export default Applicants;
